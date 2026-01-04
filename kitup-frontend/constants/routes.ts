const BASE_URL = "http://localhost:3000";


const REGISTER = `${BASE_URL}/api/auth/register`;
const LOGIN = `${BASE_URL}/api/auth/login`;
const LOGOUT = `${BASE_URL}/api/auth/logout`;

//Products
const GET_CLUBS =  `${BASE_URL}/api/products/clubs`
const GET_CLUBS_BY_ID =  `${BASE_URL}/api/products/clubs/:id`
const GET_JERSEYS =  `${BASE_URL}/api/products/jerseys`


//cart 
const ADD_TO_CART = `${BASE_URL}/api/carts/add`;
const GET_CART = `${BASE_URL}/api/carts`;
const REMOVE_FROM_CART = `${BASE_URL}/api/carts/remove`;
const CLEAR_FROM_CART = `${BASE_URL}/api/carts/clear`;
const UPDATE_CART = `${BASE_URL}/api/carts/update`;
