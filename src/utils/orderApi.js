const BASE_URL = "/api/orders/";
import tokenService from "./tokenService";

export function placeOrder(data) { 

    //needs customer id, items, address (from customer), restaurant, status
    return fetch(BASE_URL, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        Authorization: "Bearer " + tokenService.getToken(),
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.ok) return response.json();
      return response.json().then((res) => {
        console.log(res, " <- this is the response in placeOrder");
        throw new Error("Something went wrong in place order");
      });
    });
}
