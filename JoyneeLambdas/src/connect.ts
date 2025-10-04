
import { DynamoDBClient } from "@aws-sdk/client-dynamodb"
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb"
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

        // 1) Identify the user
        const userId = parseUserId(event);
        if (!userId) {
            return {
                statusCode: 401,
                body: 'Unauthorized',
            };
        }

        console.log("attempting to connect user ", userId)

        // 2) Write to ConnectionsTable
        const command = new PutCommand({
            TableName: process.env.CONNECTIONS_TABLE,
            Item: {
                userId: userId,
                connectionId: connectionId,
            },
        });

        console.log("adding record ", command)

        await docClient.send(command);

        // 3) Return a success response
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Connected successfully',
                connectionId,
            }),
        };
    } catch (err: any) {
        console.error('onConnect error:', err);
        return {
            statusCode: 500,
            body: 'Failed to connect',
        };
    }
}

function parseUserId(event: APIGatewayEvent): string | null {
    return event.requestContext.authorizer?.userId || null;
}
