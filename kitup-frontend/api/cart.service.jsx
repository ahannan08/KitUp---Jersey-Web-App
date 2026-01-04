import {ADD_TO_CART, GET_CART, REMOVE_FROM_CART, CLEAR_FROM_CART, UPDATE_CART} from "./cart.routes.js";

export const  cartService = { 

    addToCart:async(jerseyId, quantity, size) => {
        const response = await fetch(ADD_TO_CART, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ jerseyId, quantity, size }),
        });
        const data = await response.json();
        return data;
      },

      removeFromCart: async (jerseyId, size) => {
        const response = await fetch(REMOVE_FROM_CART, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ jerseyId, size }),
        });
        const data = await response.json();
        return data;
      },

      getCart: async () => {
        const response = await fetch(GET_CART, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        return data;
      },

      clearCart: async () => {
        const response = await fetch(CLEAR_FROM_CART, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        return data;
      },

      updateCart: async (jerseyId, quantity, size) => {
        const response = await fetch(UPDATE_CART, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ jerseyId, quantity, size }),
        });
        const data = await response.json();
        return data;
      }
}