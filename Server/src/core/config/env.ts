// src/core/config/env.ts

import 'dotenv/config';
import { get } from 'env-var';

export const envs = {
	PORT: get('PORT').required().asPortNumber(),
	API_PREFIX: get('DEFAULT_API_PREFIX').default('/aDtXai8u3sGcYsRgIIPv9Tn6YD0Ipi/v1').asString(),
	NODE_ENV: get('NODE_ENV').default('development').asString(),
	MONGO_INITDB_ROOT_USERNAME: get('MONGO_INITDB_ROOT_USERNAME').default('wilfriedtedom').asString(),
	MONGO_INITDB_ROOT_PASSWORD: get('MONGO_INITDB_ROOT_PASSWORD').default('test123').asString(),
	MONGO_DB_NAME: get('MONGO_DB_NAME').default('ChezFlora').asString(),
	CLOUDINARY_CLOUD_NAME: get('CLOUDINARY_CLOUD_NAME').default('cloud_name').asString(),
	CLOUDINARY_API_KEY: get('CLOUDINARY_API_KEY').default('api_key').asString(),
	CLOUDINARY_API_SECRET:get('CLOUDINARY_API_SECRET').default('your_api_secret').asString(),
	PAYPAL_MODE:get('PAYPAL_MODE').default('paypal_mode').asString(),
	PAYPAL_CLIENT_ID:get('PAYPAL_CLIENT_ID').default('your_client_id').asString(),
	PAYPAL_CLIENT_SECRET:get('PAYPAL_CLIENT_SECRET').default('your_client_secret').asString(),
};

Object.entries(envs).forEach(([key, value]) => {
	if (!value) {
	  throw new Error(`Missing environment variable: ${key}`);
	}
  });
  
export const CONNECTION_STRING = `mongodb://${envs.MONGO_INITDB_ROOT_USERNAME}:${envs.MONGO_INITDB_ROOT_PASSWORD}@172.28.0.2:27017/${envs.MONGO_DB_NAME}?authSource=admin`;
