import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import { DynamoDB } from 'aws-sdk';

import * as uuid from 'uuid';

import { Product } from './models/product';

const dynamoDb = new DynamoDB.DocumentClient();

export const createProductHandler: APIGatewayProxyHandler = async (event, _context) => {
  console.log('Received 2', event.path, event.body);

  const { pname, price, description } = JSON.parse(event.body) as Product;

  if (!Number.isInteger(parseFloat(price))) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'Price should be a number',
      }, null, 2),
    };
  }

  const params = {
    TableName: process.env.PRODUCTS_TABLE,
    Item: {
      pid: uuid.v1(),
      pname,
      price,
      description,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  };

  try {
    await dynamoDb.put(params).promise();
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: `Unable to create a product: ${err}`,
      }, null, 2),
    };
  }
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'success',
    }, null, 2),
  };
};
