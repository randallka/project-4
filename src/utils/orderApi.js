const BASE_URL = "/api/orders/";
import tokenService from "./tokenService";

export function placeOrder(data) {
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

export function getUserOrders(userId) {
  console.log("getting user orders");
  return fetch(`${BASE_URL}user/${userId}`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + tokenService.getToken(),
    },
  }).then((response) => {
    if (response.ok) return response.json();
    return response.json().then((res) => {
      console.log(res, " <- this is the response in getcustomerOrders");
      throw new Error("Something went wrong in getCustomerOrders");
    });
  });
}

export function getRestaurantOrders(restaurantId) {
  console.log("getting restaurant orders");
  console.log(restaurantId);
  return fetch(`${BASE_URL}restaurant/${restaurantId}`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + tokenService.getToken(),
    },
  }).then((response) => {
    if (response.ok) return response.json();
    return response.json().then((res) => {
      console.log(res, " <- this is the response in getrestaurantOrders");
      throw new Error("Something went wrong in getrestaurantOrders");
    });
  });
}

export function completeOrder(id) {
  return fetch(`${BASE_URL}order/${id}`, {
    method: "PUT",
    headers: {
      Authorization: "Bearer " + tokenService.getToken(),
    },
  }).then((response) => {
    if (response.ok) return response.json();
    return response.json().then((res) => {
      console.log(res, " <- this is the response in completeOrder");
      throw new Error("Something went wrong in completeOrder");
    });
  });
}
