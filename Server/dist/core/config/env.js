"use strict";
// src/core/config/env.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONNECTION_STRING = exports.envs = void 0;
require("dotenv/config");
const env_var_1 = require("env-var");
exports.envs = {
    PORT: (0, env_var_1.get)('PORT').required().asPortNumber(),
    API_PREFIX: (0, env_var_1.get)('DEFAULT_API_PREFIX').default('/aDtXai8u3sGcYsRgIIPv9Tn6YD0Ipi/v1').asString(),
    NODE_ENV: (0, env_var_1.get)('NODE_ENV').default('development').asString(),
    MONGO_INITDB_ROOT_USERNAME: (0, env_var_1.get)('MONGO_INITDB_ROOT_USERNAME').default('wilfriedtedom').asString(),
    MONGO_INITDB_ROOT_PASSWORD: (0, env_var_1.get)('MONGO_INITDB_ROOT_PASSWORD').default('test123').asString(),
    MONGO_DB_NAME: (0, env_var_1.get)('MONGO_DB_NAME').default('ChezFlora').asString(),
    CLOUDINARY_CLOUD_NAME: (0, env_var_1.get)('CLOUDINARY_CLOUD_NAME').default('cloud_name').asString(),
    CLOUDINARY_API_KEY: (0, env_var_1.get)('CLOUDINARY_API_KEY').default('api_key').asString(),
    CLOUDINARY_API_SECRET: (0, env_var_1.get)('CLOUDINARY_API_SECRET').default('your_api_secret').asString(),
    PAYPAL_MODE: (0, env_var_1.get)('PAYPAL_MODE').default('paypal_mode').asString(),
    PAYPAL_CLIENT_ID: (0, env_var_1.get)('PAYPAL_CLIENT_ID').default('your_client_id').asString(),
    PAYPAL_CLIENT_SECRET: (0, env_var_1.get)('PAYPAL_CLIENT_SECRET').default('your_client_secret').asString(),
};
Object.entries(exports.envs).forEach(([key, value]) => {
    if (!value) {
        throw new Error(`Missing environment variable: ${key}`);
    }
});
exports.CONNECTION_STRING = `mongodb://${exports.envs.MONGO_INITDB_ROOT_USERNAME}:${exports.envs.MONGO_INITDB_ROOT_PASSWORD}@172.28.0.2:27017/${exports.envs.MONGO_DB_NAME}?authSource=admin`;
//# sourceMappingURL=env.js.map