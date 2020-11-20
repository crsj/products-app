'use strict'
import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import { Product } from './models/product';
import { DynamoDB } from 'aws-sdk'

const dynamoDb = new DynamoDB.DocumentClient()

export const updateProductHandler: APIGatewayProxyHandler = async (event, _context) => {

  console.log("Received update request:", event.path);

  const pid = event.pathParameters.pid;

  const {pname, price, description} = JSON.parse(event.body) as Product;

  if(!Number.isInteger(parseFloat(price))) { 

    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "Price should be a number"
      }, null, 2),
    };
  }

  const params = {
    TableName: process.env.PRODUCTS_TABLE,
    Key: {
      pid,
    },
    ExpressionAttributeValues: {
      ':pname': pname,
      ':price': price,
      ':description': description,
      ':updatedAt': new Date().toISOString(),
    },
    UpdateExpression: 'SET pname = :pname, price = :price, description = :description, updatedAt = :updatedAt',
    ReturnValues: 'ALL_NEW',
  };

  const getParams = {
    TableName: process.env.PRODUCTS_TABLE,
    Key: {
      pid,
    }
  };

  try {

    if(!(await dynamoDb.get(getParams).promise()).Item) {
      return {
        statusCode: 404,
        body: JSON.stringify({message: `Product not found with id: ${pid}`}, null, 2),
      }; 
    }
    const product = await dynamoDb.update(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify(product, null, 2),
    };
  } catch(err) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: `Unable to update product: ${err}`
      }, null, 2),
    };
  }
  
}
