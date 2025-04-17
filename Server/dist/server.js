"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/server.ts
// Configurations de Middlewares
const express_1 = __importDefault(require("express"));
const compression_1 = __importDefault(require("compression"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const swagger_1 = require("./swagger");
const morgan_1 = __importDefault(require("morgan"));
const constants_1 = require("./core/constants");
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const products_routes_1 = __importDefault(require("./routes/admin/products.routes"));
const products_routes_2 = __importDefault(require("./routes/shop/products.routes"));
const cart_routes_1 = __importDefault(require("./routes/shop/cart.routes"));
const address_routes_1 = __importDefault(require("./routes/shop/address.routes"));
const Order_routes_1 = __importDefault(require("./routes/shop/Order.routes"));
const Orders_routes_1 = __importDefault(require("./routes/admin/Orders.routes"));
const search_routes_1 = __importDefault(require("./routes/shop/search.routes"));
const productReview_routes_1 = __importDefault(require("./routes/shop/productReview.routes"));
const contact_routes_1 = __importDefault(require("./routes/shop/contact.routes"));
const QuoteRequest_routes_1 = __importDefault(require("./routes/shop/QuoteRequest.routes"));
const QuoteRequest_routes_2 = __importDefault(require("./routes/admin/QuoteRequest.routes"));
const user_routes_1 = __importDefault(require("./routes/admin/user.routes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const helmet_1 = __importDefault(require("helmet"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cache-Control', 'Expires', 'Pragma'],
    credentials: true
}));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, compression_1.default)());
// My Routes
app.use('/api/auth', auth_routes_1.default);
app.use((0, helmet_1.default)());
app.use((0, express_rate_limit_1.default)({
    max: constants_1.ONE_HUNDRED,
    windowMs: constants_1.SIXTY,
    message: 'Excess requests from this IP Adresse '
}));
app.use('/api/shop/products', products_routes_2.default);
app.use('/api/admin/products', products_routes_1.default);
app.use('/api/shop/cart', cart_routes_1.default);
app.use('/api/shop/address', address_routes_1.default);
app.use('/api/shop/order', Order_routes_1.default);
app.use('/api/admin/orders', Orders_routes_1.default);
app.use('/api/shop/search', search_routes_1.default);
app.use('/api/shop/review', productReview_routes_1.default);
app.use('/api/shop/contact', contact_routes_1.default);
app.use('/api/shop/quote', QuoteRequest_routes_1.default);
app.use('/api/admin/quotes', QuoteRequest_routes_2.default);
app.use('/api/admin/users', user_routes_1.default);
app.use((0, morgan_1.default)('combined'));
(0, swagger_1.setupSwagger)(app);
exports.default = app;
//# sourceMappingURL=server.js.map