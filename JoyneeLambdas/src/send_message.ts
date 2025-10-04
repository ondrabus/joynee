
import { DynamoDBClient } from "@aws-sdk/client-dynamodb"
import { DynamoDBDocumentClient, GetCommand, PutCommand, QueryCommand } from "@aws-sdk/lib-dynamodb"
import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda"

const ddbClient = new DynamoDBClient({})
const docClient = DynamoDBDocumentClient.from(ddbClient)

import {
    ApiGatewayManagementApiClient,
    PostToConnectionCommand
} from "@aws-sdk/client-apigatewaymanagementapi";

let apigwManagementClient: ApiGatewayManagementApiClient | null = null;

// Helper to initialize or reuse the ApiGatewayManagementApi client
function getApiGwClient(endpoint: string) {
    if (!apigwManagementClient) {
        apigwManagementClient = new ApiGatewayManagementApiClient({
            endpoint
        });
    }
    return apigwManagementClient;
}

export const handler = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
    try {
        const connectionId = event?.requestContext?.connectionId;
        if (!connectionId) {
            return {
                statusCode: 400,
                body: 'Missing connectionId in the request context',
            };
        }

        const body = JSON.parse(event.body || "{}")
        const conversationId = body?.conversationId
        const messageText = body?.text

        // Validate input
        if (!conversationId || !messageText) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: "Missing conversationId or text" })
            }
        }

        const userId = event?.requestContext?.authorizer?.userId
        if (!userId){
          return {
            statusCode: 403,
            body: JSON.stringify({
                error: `No authorized user in this connection ${connectionId}`
            })
          }
        }
        console.log("identified user ", userId)

        // Check that the user is a participant of this conversation
        //    We'll do a simple GetItem: 
        //       PK = "CONVERSATION#{conversationId}"
        //       SK = "PARTICIPANT#{userId}"
        const isUserParticipantInConversationCommand = new GetCommand({
            TableName: process.env.CHAT_TABLE,
            Key: {
                PK: `CONVERSATION#${conversationId}`,
                SK: `PARTICIPANT#${userId}`,
            },
        })
        const isUserParticipantInConversationResponse = await docClient.send(isUserParticipantInConversationCommand)
        if (!isUserParticipantInConversationResponse.Item) {
            return {
                statusCode: 403,
                body: JSON.stringify({
                    error: `User ${userId} is not a participant of conversation ${conversationId}`
                })
            }
        }
        console.log("user is part of the conversation ", conversationId)

        // Write the new message to ChatTable
        const timestamp = Date.now()
        const messageKey = {
            PK: `CONVERSATION#${conversationId}`,
            SK: `MESSAGE#${timestamp}`
        };
        const putMessageCommand = new PutCommand({
            TableName: process.env.CHAT_TABLE,
            Item: {
                ...messageKey,
                type: "MESSAGE",
                senderUserId: userId,
                text: messageText,
                timestamp: timestamp.toString()
            }
        })

        await docClient.send(putMessageCommand)
        console.log("message stored")

        // Notify the other participant(s)
        //    For a 1-1 chat, let's find all participants in the conversation, except the sender.
        const getParticipantCommand = new QueryCommand({
            TableName: process.env.CHAT_TABLE,
            KeyConditionExpression: "PK = :pk AND begins_with(SK, :skprefix)",
            ExpressionAttributeValues: {
                ":pk": `CONVERSATION#${conversationId}`,
                ":skprefix": "PARTICIPANT#",
            },
        })
        const getParticipantResponse = await docClient.send(getParticipantCommand)
        const participants = (getParticipantResponse.Items || []).filter((item) => item.SK != `PARTICIPANT#${userId}`)

        if (!participants || participants.length == 0) {
            // No participants found?
            return {
                statusCode: 200,
                body: JSON.stringify({ message: "Message stored, but no other participants found." })
            };
        }
        console.log("found other participants: ", participants.length)

        // For each participant (sender already excluded), find connection IDs in ConnectionsTable
        const apiGwClient = getApiGwClient(process.env.WEBSOCKET_ENDPOINT || "");

        for (const participantItem of participants) {
            const participantSk = participantItem.SK; // e.g. "PARTICIPANT#userB"
            if (!participantSk) continue;
            const participantUserId = participantSk.replace("PARTICIPANT#", "");

            // Query ConnectionsTable for userB (or userX) to get active connectionIds
            // PK = participantUserId, SK = connectionId

            const getConnectionIdsCommand = new QueryCommand({
                TableName: process.env.CONNECTIONS_TABLE,
                KeyConditionExpression: "userId = :uid",
                ExpressionAttributeValues: {
                    ":uid": participantUserId
                }
            })
            const getConnectionIdsResponse = await docClient.send(getConnectionIdsCommand)
            if (getConnectionIdsResponse.Items) {
                for (const connectionItem of getConnectionIdsResponse.Items) {
                    const connectionId = connectionItem.connectionId
                    if (!connectionId) continue;

                    // Post the message to the other user’s connections
                    try {
                        await apiGwClient.send(
                            new PostToConnectionCommand({
                                ConnectionId: connectionId,
                                Data: Buffer.from(
                                    JSON.stringify({
                                        type: "NEW_MESSAGE",
                                        conversationId,
                                        message: {
                                            senderUserId: userId,
                                            text: messageText,
                                            timestamp
                                        }
                                    }),
                                    "utf-8"
                                )
                            })
                        );
                        console.log(`posted message to connection ${connectionId} of user ${participantUserId}`)
                    } catch (postErr) {
                        console.error(
                            `Failed to post to connection ${connectionId} of user ${participantUserId}:`,
                            postErr
                        );
                        // If it's a "GoneException", that means connection is stale.
                        // You might delete that connection from the table here.
                    }
                }
            } else {
                console.log("no active connections found for user ", participantUserId)
            }
        }

        // 8) Return success
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: "Message sent successfully",
                conversationId,
                timestamp
            })
        };
    } catch (error: any) {
        console.error("sendMessage error:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Internal error sending message." })
        };
    }
};
