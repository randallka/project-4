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
