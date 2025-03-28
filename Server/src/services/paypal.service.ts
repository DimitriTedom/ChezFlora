import paypal from "../Helpers/paypal";

export const createPayPalPayment = (cartItems: any[], totalAmount: number) => {
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

export const executePayPalPayment = (paymentId: string, payerId: string) => {
    return new Promise((resolve, reject) => {
        paypal.payment.execute(paymentId, { payer_id: payerId }, (error, payment) => {
            if (error) {
                reject(error);
            } else {
                resolve(payment);
            }
        });
    });
};
