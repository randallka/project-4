import tokenService from "./tokenService";
const BASE_URL = "/api/items";

export function create(data) {
  
  console.log(data);
  return fetch(BASE_URL, {
    method: "POST",
    body: data,
    headers: {
      Authorization: "Bearer " + tokenService.getToken(),
    },
  }).then((responseFromTheServer) => {
    if (responseFromTheServer.ok) return responseFromTheServer.json();
    return responseFromTheServer.json().then((res) => {
      console.log(
        res,
        " <- this is the response in item create function in your utils folder"
      );
      throw new Error("Something went wrong in create Item");
    });
  });
}

export function edit(id, data) {
  console.log(data, "edit ");
  return fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      Authorization: "Bearer " + tokenService.getToken(),
      "Content-Type": "application/json",
    },
  }).then((response) => {
    console.log(response);
    if (response.ok) return response.json();
    return response.json().then((res) => {
      console.log(res, " <- this is the response in item edit");
      throw new Error("Something went wrong in item edit");
    });
  });
}

export function deleteItem(id) { 
    return fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + tokenService.getToken(),
      },
    }).then((res) => {
      if (res.ok) return res.json();
    });
}