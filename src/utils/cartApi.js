import tokenService from "./tokenService";
const BASE_URL = "/api/cart/";

export function getCart(userId) { 
    return fetch(`${BASE_URL}${userId}`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + tokenService.getToken(),
    },
  }).then((response) => {
    if (response.ok) return response.json();
    return response.json().then((res) => {
      console.log(res, " <- this is the response in getCart");
      throw new Error("Something went wrong in getCart");
    });
  });
}

export function removeItem(itemId) { 
    return fetch(`${BASE_URL}${itemId}`, {
    method: "PUT",
    headers: {
      Authorization: "Bearer " + tokenService.getToken(),
    },
  }).then((response) => {
    if (response.ok) return response.json();
    return response.json().then((res) => {
      console.log(res, " <- this is the response in removeitem");
      throw new Error("Something went wrong in removeItem");
    });
  });
}


export function addToCart(itemId) { 
    const item = {id: itemId}
    return fetch(BASE_URL, {
    method: "POST",
    body: JSON.stringify(item),
    headers: {
      Authorization: "Bearer " + tokenService.getToken(),
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (response.ok) return response.json();
    return response.json().then((res) => {
      console.log(res, " <- this is the response in addToCart");
      throw new Error("Something went wrong in addToCart");
    });
  });
}

export function emptyCart(id) { 
    console.log("empty cart", id)
    return fetch(`${BASE_URL}${id}/empty`, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + tokenService.getToken(),
      },
    }).then((response) => {
      if (response.ok) return response.json();
      return response.json().then((res) => {
        console.log(res, " <- this is the response in empty cart");
        throw new Error("Something went wrong in empty cart");
      });
    });

}