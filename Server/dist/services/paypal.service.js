"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.executePayPalPayment = exports.createPayPalPayment = void 0;
const paypal_1 = __importDefault(require("../Helpers/paypal"));
const createPayPalPayment = (cartItems, totalAmount) => {
    return {
        intent: "sale",
        payer: {
            payment_method: "paypal",
        },
        redirect_urls: {
            return_url: "http://localhost:5173/shop/paypal-return",
            cancel_url: "http://localhost:5173/shop/paypal-cancel",
        },
        transactions: [
            {
                item_list: {
                    items: cartItems.map((item) => ({
                        name: item.title,
                        sku: item.productId,
                        price: item.price.toFixed(2),
                        currency: "USD",
                        quantity: item.quantity,
                    })),
                },
                amount: {
                    currency: "USD",
                    total: totalAmount.toFixed(2),
                },
                description: "Order Payment",
            },
        ],
    };
};
exports.createPayPalPayment = createPayPalPayment;
const executePayPalPayment = (paymentId, payerId) => {
    return new Promise((resolve, reject) => {
        paypal_1.default.payment.execute(paymentId, { payer_id: payerId }, (error, payment) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(payment);
            }
        });
    });
};
exports.executePayPalPayment = executePayPalPayment;
//# sourceMappingURL=paypal.service.js.map