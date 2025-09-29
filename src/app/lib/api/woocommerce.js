// lib/api/woocommerce.js
const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;


const api = new WooCommerceRestApi({
  url: process.env.WOOCOMMERCE_URL,
  consumerKey: process.env.WC_CONSUMER_KEY,
  consumerSecret: process.env.WC_CONSUMER_SECRET,
  version: "wc/v3"
});

export default api;