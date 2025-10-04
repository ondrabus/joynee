import { CognitoJwtVerifier } from "aws-jwt-verify";
import { APIGatewayRequestAuthorizerHandler } from "aws-lambda";

const UserPoolId = process.env.USER_POOL_ID!;
const AppClientId = process.env.APP_CLIENT_ID!;

export const handler: APIGatewayRequestAuthorizerHandler = async (event, context) => {
  try {
    let encodedToken: string | undefined
    
    if (event?.headers && (event.headers?.Authorization || event.headers?.authorization)){
      const authHeader = (event.headers?.Authorization || event.headers?.authorization || "")
      encodedToken = authHeader.replace("Bearer ", "")
    } else {
      encodedToken = event.queryStringParameters?.idToken || ""
    }

    if (!encodedToken){ 
      console.log("Token was not found")
      return denyAllPolicy()
    }
    
    const verifier = CognitoJwtVerifier.create({
      userPoolId: UserPoolId,
      tokenUse: "id",
      clientId: AppClientId,
    });

    const payload = await verifier.verify(encodedToken)
    console.log("Token is valid. Payload:", payload)
    console.log("Event", event)
    
    return allowPolicy(event.methodArn, payload)
  } catch (error: any) {
    console.log(error.message)
    return denyAllPolicy()
  }
};

const denyAllPolicy = () => {
  return {
    principalId: "*",
    policyDocument: {
      Version: "2012-10-17",
      Statement: [
        {
          Action: "*",
          Effect: "Deny",
          Resource: "*",
        } as const,
      ],
    },
  };
};

const allowPolicy = (methodArn: string, idToken: any) => {
  return {
    principalId: idToken.sub,
    policyDocument: {
      Version: "2012-10-17",
      Statement: [
        {
          Action: "execute-api:Invoke",
          Effect: "Allow",
          Resource: methodArn,
        } as const,
      ],
    },
    context: {
      // set userId in the context
      userId: idToken.sub,
    },
  };
};