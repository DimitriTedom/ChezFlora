import paypal from "paypal-rest-sdk";
import { envs } from '../core/config/env';

paypal.configure({
    mode:envs.PAYPAL_MODE,
    client_id: envs.PAYPAL_CLIENT_ID,
    client_secret:envs.PAYPAL_CLIENT_SECRET
})

export default paypal;
