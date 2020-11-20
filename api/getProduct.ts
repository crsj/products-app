import { APIGatewayProxyHandler } from 'aws-lambda';
import { DynamoDB } from 'aws-sdk';

const dynamoDb = new DynamoDB.DocumentClient();

const getProductHandler: APIGatewayProxyHandler = async (event) => {
  const { pid } = event.pathParameters;

  const params = {
    TableName: process.env.PRODUCTS_TABLE,
    Key: {
      pid,
    },
  };

  try {
    const product = await (await dynamoDb.get(params).promise()).Item;
    return product ? {
      statusCode: 200,
      body: JSON.stringify(product, null, 2),
    } : {
      statusCode: 404,
      body: JSON.stringify({ message: `Product not found with id: ${pid}` }, null, 2),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: `Unable to retrieve product: ${err}`,
      }, null, 2),
    };
  }
};

export default getProductHandler;
