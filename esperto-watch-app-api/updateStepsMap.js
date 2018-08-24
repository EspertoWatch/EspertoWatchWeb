import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context, callback) {
  const data = JSON.parse(event.body);

  const getParams = {
    TableName: "StepCount",
    Key: {
      userId: data.userId
    }
  };

  try {
    const result = await dynamoDbLib.call("get", getParams);
    let stepsMap = data.map;
    if (result.Item.totalDailySteps) {
      const prevStepsMap = result.Item.totalDailySteps;
      stepsMap = Object.assign(prevStepsMap, data.map);
    } 

    const params = {
        TableName: "StepCount",
        Key: {
            userId: data.userId
        },
        UpdateExpression: "SET totalDailySteps  = :stepsMap",
        ExpressionAttributeValues: { 
            ":stepsMap": stepsMap ? stepsMap : null
        },
        ReturnValues: "ALL_NEW"
      };

      try {
        const updateResult = await dynamoDbLib.call("update", params);
        callback(null, success({status: "Updated steps map", data: updateResult}));
      } catch (e) {
        callback(null, failure({ status: "Failed to append", userId: data.userId, stepsMap: stepsMap, map: data.map, result: result }));
      }

  } catch (e) {
    callback(null, failure({ status: "Failed to retrieve", userId: data.userId }));
  }
}