'use strict'
import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import { DynamoDB } from 'aws-sdk'


const dynamoDb = new DynamoDB.DocumentClient()

export const deleteProductHandler: APIGatewayProxyHandler = async (event, _context) => {

  console.log("Received update request:", event.path);

  const pid = event.pathParameters.pid;

  const params = {
    TableName: process.env.PRODUCTS_TABLE,
    Key: {
      pid,
    }
  };

  try {
    const product = await (await dynamoDb.get(params).promise()).Item;  

    if(!product) {
      return {
        statusCode: 404,
        body: JSON.stringify({message: `Product not found with id: ${pid}`}, null, 2),
      }; 
    }

    await dynamoDb.delete(params).promise();  

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "success"
      }, null, 2),
    };
  } catch(err) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: `Unable to delete product: ${err}`
      }, null, 2),
    };
  }

}
