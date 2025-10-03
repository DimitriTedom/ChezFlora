// src/core/config/env.ts

import 'dotenv/config';
import { get } from 'env-var';
import { z } from 'zod';

// Enhanced environment configuration with validation
export const envs = {
	PORT: get('PORT').required().asPortNumber(),
	API_PREFIX: get('DEFAULT_API_PREFIX').default('/aDtXai8u3sGcYsRgIIPv9Tn6YD0Ipi/v1').asString(),
	NODE_ENV: get('NODE_ENV').default('development').asString(),
	
	// Database Configuration
	MONGO_INITDB_ROOT_USERNAME: get('MONGO_INITDB_ROOT_USERNAME').default('wilfriedtedom').asString(),
	MONGO_INITDB_ROOT_PASSWORD: get('MONGO_INITDB_ROOT_PASSWORD').default('test123').asString(),
	MONGO_DB_NAME: get('MONGO_DB_NAME').default('ChezFlora').asString(),
	
	// JWT Configuration with validation
	JWT_SECRET: get('JWT_SECRET').required().asString(),
	JWT_REFRESH_SECRET: get('JWT_REFRESH_SECRET').default('').asString(),
	JWT_EXPIRES_IN: get('JWT_EXPIRES_IN').default('1h').asString(),
	
	// Email Configuration
	EMAIL_HOST: get('EMAIL_HOST').default('smtp.gmail.com').asString(),
	EMAIL_PORT: get('EMAIL_PORT').default(587).asPortNumber(),
	EMAIL_SECURE: get('EMAIL_SECURE').default('false').asBool(),
	EMAIL_USER: get('EMAIL_USER').required().asString(),
	EMAIL_PASS: get('EMAIL_PASS').required().asString(),
	
	// Cloudinary Configuration
	CLOUDINARY_CLOUD_NAME: get('CLOUDINARY_CLOUD_NAME').default('cloud_name').asString(),
	CLOUDINARY_API_KEY: get('CLOUDINARY_API_KEY').default('api_key').asString(),
	CLOUDINARY_API_SECRET: get('CLOUDINARY_API_SECRET').default('your_api_secret').asString(),
	
	// PayPal Configuration
	PAYPAL_MODE: get('PAYPAL_MODE').default('sandbox').asString(),
	PAYPAL_CLIENT_ID: get('PAYPAL_CLIENT_ID').default('your_client_id').asString(),
	PAYPAL_CLIENT_SECRET: get('PAYPAL_CLIENT_SECRET').default('your_client_secret').asString(),
	
	// Security Configuration
	BCRYPT_SALT_ROUNDS: get('BCRYPT_SALT_ROUNDS').default(12).asIntPositive(),
	RATE_LIMIT_WINDOW_MS: get('RATE_LIMIT_WINDOW_MS').default(900000).asIntPositive(),
	RATE_LIMIT_MAX_REQUESTS: get('RATE_LIMIT_MAX_REQUESTS').default(100).asIntPositive(),
	AUTH_RATE_LIMIT_MAX_REQUESTS: get('AUTH_RATE_LIMIT_MAX_REQUESTS').default(5).asIntPositive(),
	
	// Client Configuration
	CLIENT_BASE_URL: get('CLIENT_BASE_URL').default('http://localhost:5173').asString(),
	
	// Monitoring
	LOG_LEVEL: get('LOG_LEVEL').default('info').asString(),
	ENABLE_REQUEST_LOGGING: get('ENABLE_REQUEST_LOGGING').default('true').asBool(),
};

// Security validation function
export const validateSecurityConfig = (): string[] => {
	const warnings: string[] = [];
	
	// JWT Secret validation
	if (envs.JWT_SECRET.length < 32) {
		warnings.push('JWT_SECRET should be at least 32 characters long');
	}
	
	// Production environment checks
	if (envs.NODE_ENV === 'production') {
		if (envs.CLOUDINARY_API_SECRET === 'your_api_secret') {
			warnings.push('Production: Update CLOUDINARY_API_SECRET from default value');
		}
		if (envs.PAYPAL_CLIENT_SECRET === 'your_client_secret') {
			warnings.push('Production: Update PAYPAL_CLIENT_SECRET from default value');
		}
		if (envs.PAYPAL_MODE !== 'live') {
			warnings.push('Production: Set PAYPAL_MODE to "live" for production');
		}
		if (envs.BCRYPT_SALT_ROUNDS < 12) {
			warnings.push('Production: BCRYPT_SALT_ROUNDS should be at least 12');
		}
	}
	
	// Email configuration validation
	if (!envs.EMAIL_USER.includes('@')) {
		warnings.push('EMAIL_USER should be a valid email address');
	}
	
	return warnings;
};

// Validate configuration on startup
const securityWarnings = validateSecurityConfig();
if (securityWarnings.length > 0) {
	console.log('\n🔒 Security Configuration Warnings:');
	securityWarnings.forEach(warning => console.log(`  - ${warning}`));
	console.log('');
}

// Required environment variables validation
const requiredEnvs = ['JWT_SECRET', 'EMAIL_USER', 'EMAIL_PASS'];
requiredEnvs.forEach(key => {
	if (!process.env[key]) {
		throw new Error(`Missing required environment variable: ${key}`);
	}
});

export const CONNECTION_STRING = `mongodb://${envs.MONGO_INITDB_ROOT_USERNAME}:${envs.MONGO_INITDB_ROOT_PASSWORD}@172.28.0.2:27017/${envs.MONGO_DB_NAME}?authSource=admin`;
