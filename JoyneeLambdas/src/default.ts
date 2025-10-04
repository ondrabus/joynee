
import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda"

export const handler = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
    return {
        statusCode: 204,
        body: 'No content',
    };
}
