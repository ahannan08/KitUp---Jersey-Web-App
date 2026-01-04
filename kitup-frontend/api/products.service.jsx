import { GET_CLUBS, GET_JERSEYS } from "./routes.js";

export const productService = {
  getClubs: async ({ page, limit, league, search }) => {
    const clubs = await fetch(GET_CLUBS, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ page, limit, league, search }),
    });
    const data = await clubs.json();
    return data;
  },

  getJerseys: async ({ page, limit, league, type, clubId, clubName, minPrice, maxPrice, search }) => {
    const jerseys = await fetch(GET_JERSEYS, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ page, limit, league, type, clubId, clubName, minPrice, maxPrice, search }),
    });
    const data = await jerseys.json();
    return data;
  },
};