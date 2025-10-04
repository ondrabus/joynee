
import { DynamoDBClient } from "@aws-sdk/client-dynamodb"
import { DeleteCommand, DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb"
import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda"

const ddbClient = new DynamoDBClient({})
const docClient = DynamoDBDocumentClient.from(ddbClient)

export const handler = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
    try {
        const connectionId = event?.requestContext?.connectionId;
        if (!connectionId) {
            return {
                statusCode: 400,
                body: 'Missing connectionId in the request context',
            };
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

        console.log("attempting to delete connection ", connectionId)

        // Delete the connection record from ConnectionsTable
        // Key is { userId, connectionId }
        const command = new DeleteCommand({
            TableName: process.env.CONNECTIONS_TABLE,
            Key: {
                connectionId: connectionId,
                userId: userId,
            },
        })
        
        await docClient.send(command)

        // Return success
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Disconnected',
            }),
        };
    } catch (error) {
        console.error("Error in onDisconnect:", error);
        return { statusCode: 500, body: "Internal server error." };
    }
};