
import { DynamoDBClient } from "@aws-sdk/client-dynamodb"
import { DynamoDBDocumentClient, QueryCommand, PutCommand, TransactWriteCommand } from "@aws-sdk/lib-dynamodb"
import { APIGatewayEvent, APIGatewayProxyEventV2WithLambdaAuthorizer, APIGatewayProxyResult } from "aws-lambda"
import { v4 as uuidv4 } from "uuid";
import { CognitoUserContext } from "./models/UserContext";

const ddbClient = new DynamoDBClient({})
const docClient = DynamoDBDocumentClient.from(ddbClient)
const APP_USER = "139468e2-6041-7044-edec-56ff2f9ab16d"

export const handler = async (event: APIGatewayProxyEventV2WithLambdaAuthorizer<CognitoUserContext>): Promise<APIGatewayProxyResult> => {
  try {
    const userId = event?.requestContext?.authorizer?.lambda?.userId
    if (!userId){
      return {
        statusCode: 403,
        body: JSON.stringify({
            error: "Unauthorized"
        })
      }
    }
    console.log("identified user ", userId)

    // only app user is allowed for creating conversations
    if (userId != APP_USER){
      return {
        statusCode: 403,
        body: JSON.stringify({
          error: "User not authorized for this operation"
        })
      }
    }
    console.log("user is APP")

    // 1) Parse input (assuming a JSON body like: { "userA": "...", "userB": "...", "challenge": "..." })
    const body = JSON.parse(event.body || "{}");
    const { userA, userB } = body;

    // Basic validation
    if (!userA || !userB) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing userA or userB in request." }),
      };
    }

    // 2) Generate a conversationId (UUID)
    const conversationId = uuidv4()

    // 3) Prepare the DynamoDB items
    // We'll assume a single-table design:
    // ChatTable uses:
    //   PK = "CONVERSATION#<conversationId>"
    //   SK for:
    //      "PARTICIPANT#<userId>"  (type=PARTICIPANT)
    //      "METADATA"              (type=CONVERSATION)
    // GSI1 to list conversations by user:
    //   GSI1PK = "USER#<userId>"
    //   GSI1SK = "CONVERSATION#<conversationId>"

    const pk = `CONVERSATION#${conversationId}`
    const timestamp = new Date().toISOString()
    
    const putParticipantAItemCommand = {
      Put: {
        TableName: process.env.CHAT_TABLE,
        Item: {
            PK: pk,
            SK: `PARTICIPANT#${userA}`,
            type: "CONVERSATION",
            createdAt: timestamp,
        }
      }
    }
    const putParticipantBItemCommand = {
      Put: {
        TableName: process.env.CHAT_TABLE,
        Item: {
            PK: pk,
            SK: `PARTICIPANT#${userB}`,
            type: "CONVERSATION",
            createdAt: timestamp,
        }
      }
    }
    const putMetadataCommand = {
      Put: {
        TableName: process.env.CHAT_TABLE,
        Item: {
            PK: pk,
            SK: "METADATA",
            type: "CONVERSATION",
            createdAt: timestamp,
        }
      }
    }
    const transactWriteCommand = new TransactWriteCommand({
      TransactItems: [
        putParticipantAItemCommand,
        putParticipantBItemCommand,
        putMetadataCommand
      ]
    })

    await docClient.send(transactWriteCommand)
    console.log(`created conversation between ${userA} and ${userB}`)

    // 5) Return the new conversationId
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        conversationId,
        message: "Conversation created successfully",
      }),
    };
  } catch (error: any) {
    console.error("Error creating conversation:", error);
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ error: "Failed to create conversation." }),
    };
  }
};