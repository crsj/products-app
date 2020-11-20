import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import { createProductHandler } from './createProduct';
import { listProductsHandler } from './listProducts';
import getProductHandler from './getProduct';
import { deleteProductHandler } from './deleteProduct';
import { updateProductHandler } from './updateProduct';
import middy from '@middy/core';
import cors from '@middy/http-cors';

export const hello: APIGatewayProxyHandler = async (event) => ({
  statusCode: 200,
  body: JSON.stringify({
    message: 'Hello World!',
    input: event,
  }, null, 2),
});

const addCors = (handler: APIGatewayProxyHandler) => middy(handler).use(cors({
  origin: "*",
  headers: "X-API-Key, Content-Type"
}));

export const listProducts = addCors(listProductsHandler);
export const createProduct = addCors(createProductHandler);
export const getProduct = addCors(getProductHandler);
export const deleteProduct = addCors(deleteProductHandler);
export const updateProduct = addCors(updateProductHandler);
