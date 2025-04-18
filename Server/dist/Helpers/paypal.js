"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const paypal_rest_sdk_1 = __importDefault(require("paypal-rest-sdk"));
const env_1 = require("../core/config/env");
paypal_rest_sdk_1.default.configure({
    mode: env_1.envs.PAYPAL_MODE,
    client_id: env_1.envs.PAYPAL_CLIENT_ID,
    client_secret: env_1.envs.PAYPAL_CLIENT_SECRET
});
exports.default = paypal_rest_sdk_1.default;
//# sourceMappingURL=paypal.js.map