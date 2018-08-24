import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context, callback) {
  const data = JSON.parse(event.body);

  const getParams = {
    TableName: "HeartRate",
    Key: {
      userId: data.userId
    }
  };

  try {
    const result = await dynamoDbLib.call("get", getParams);
    let heartMap = data.map;
    if (result.Item.avgHourlyHR) {
      const prevHeartMap = result.Item.avgHourlyHR;
      heartMap = Object.assign(prevHeartMap, data.map);
    } 

    const params = {
        TableName: "HeartRate",
        Key: {
            userId: data.userId
        },
        UpdateExpression: "SET avgHourlyHR  = :heartMap",
        ExpressionAttributeValues: { 
            ":heartMap": heartMap ? heartMap : null
        },
        ReturnValues: "ALL_NEW"
      };

      try {
        const updateResult = await dynamoDbLib.call("update", params);
        callback(null, success({status: "Updated heart map", data: updateResult}));
      } catch (e) {
        callback(null, failure({ status: "Failed to append", userId: data.userId, heartMap: heartMap, map: data.map, result: result }));
      }

  } catch (e) {
    callback(null, failure({ status: "Failed to retrieve", userId: data.userId }));
  }
}