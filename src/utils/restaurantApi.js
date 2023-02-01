const BASE_URL = "/api/restaurant/";
import tokenService from "./tokenService";

export function create(data) {
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
        " <- this is the response in restaurant create function in your utils folder"
      );
      throw new Error("Something went wrong in create restaurant");
    });
  });
}

export function getRestaurantByOwner(user) { 
    return fetch(`${BASE_URL}/owner/${user._id}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + tokenService.getToken(),
      },
    }).then((responseFromTheServer) => {
      if (responseFromTheServer.ok) return responseFromTheServer.json();
      return responseFromTheServer.json().then((res) => {
        console.log(
          res,
          " <- this is the response in restaurant find by user function in your utils folder"
        );
        throw new Error("Something went wrong in find restaurant");
      });
    });
}
export function getOne(id) { 
    return fetch(`${BASE_URL}/${id}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + tokenService.getToken(),
      },
    }).then((response) => {
      if (response.ok) return response.json();
      return response.json().then((res) => {
        console.log(
          res,
          " <- this is the response in restaurant findOne in your utils folder"
        );
        throw new Error("Something went wrong in find one restaurant");
      });
    });

}
export function edit(id, data) { 
    return fetch(`${BASE_URL}${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        Authorization: "Bearer " + tokenService.getToken(),
        "Content-Type": "application/json",
      },
    }).then((response) => { 
        if (response.ok) return response.json()
        return responseFromTheServer.json().then((res) => {
          console.log(
            res,
            " <- this is the response in restaurant edit"
          );
          throw new Error("Something went wrong in edit restaurant");
        });
    })
}
export async function index() {
	const data = await fetch(BASE_URL, {
	  headers: {
		'Authorization': 'Bearer ' + tokenService.getToken()
	  }
	})
	return data.json()
  }