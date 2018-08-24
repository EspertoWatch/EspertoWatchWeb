import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context, callback) {
    const data = JSON.parse(event.body);

    const params = {
        TableName: "StepCount",
        Key: {
            userId: data.userId
        },
        UpdateExpression: "SET currentSteps  = :currentSteps",
        ExpressionAttributeValues: { 
            ":currentSteps": data.currentVal ? data.currentVal : null
        },
        ReturnValues: "ALL_NEW"
    };

    try {
        const updateResult = await dynamoDbLib.call("update", params);
        callback(null, success({status: "Updated current steps", data: updateResult}));
    } catch (e) {
        callback(null, failure({ status: "Failed to update current steps", userId: data.userId}));
    }
}
