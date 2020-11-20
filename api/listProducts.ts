import { APIGatewayProxyHandler } from "aws-lambda";
import "source-map-support/register";

import { DynamoDB } from "aws-sdk";

const dynamoDb = new DynamoDB.DocumentClient();
const params = {
  TableName: process.env.PRODUCTS_TABLE,
};

export const listProductsHandler: APIGatewayProxyHandler = async (
  event,
  _context
) => {
  console.log("Received", event.path);

  try {
    const products = await (await dynamoDb.scan(params).promise()).Items;

    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          products,
        },
        null,
        2
      ),
    };

  } catch(err) {
    return {
      statusCode: 500,
      body: JSON.stringify(
        {
          message: `Unable to retrieve products: ${err}`
        },
        null,
        2
      ),
    };
  }


  
};
