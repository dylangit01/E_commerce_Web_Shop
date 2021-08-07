import Commerce from '@chec/commerce.js';

export const commerce = new Commerce(process.env.REACT_APP_CHEC_PUBLIC_KEY, true);

// Usually creating a fully functional web-shop application, we need a full backend API and routes to fetch the data, creat products, update products and delete products and authentication and so on, but with commerce.js, all those functions and api are provided by commerce.js API.