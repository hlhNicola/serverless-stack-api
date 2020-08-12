import * as uuid from "uuid"; // generate unique ids, for storing things in DynamoDb
import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";


export const main = handler( async (event, context) => {
// request body is passed in as a JSON encoded string in "event.body"
    const data = JSON.parse(event.body);

    const params = {
        TableName : process.env.TableName,
        Item: {
            userId: event.requestContext.identity.cognitoIdentityId, // user identities are federated through the Congnito Identity Pool, we use the identity id as the user id of the authenticated user
            noteId: uuid.v1(), // a unique uuid
            content: data.content,
            attachment: data.attachment,
            createdAt: Date.now() // current Unix timestamp
        }
    };

    await dynamoDb.put(params);

    return params.Item;
})
