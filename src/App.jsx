import "./App.css";

import { useState, createContext, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import Layout from "./pages/Layout/Layout";
import RestaurantHome from "./pages/RestaurantHome/RestaurantHome";
import CustomerHome from "./pages/CustomerHome/CustomerHome";
import SignupPage from "./pages/SignupPage/SignupPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RestaurantCreatePage from "./pages/RestaurantCreatePage/RestaurantCreatePage";
import RestaurantPage from "./pages/RestaurantPage/RestaurantPgae";
import MenuPage from "./pages/MenuPage/MenuPage";
import CartPage from "./pages/CartPage/CartPage";
import OrderPage from "./pages/OrderPage/OrderPage";
import { getRestaurantByOwner } from "./utils/restaurantApi";
import userService from "./utils/userService";

export const UserContext = createContext();
export const RestaurantContext = createContext();

function App() {
  const [user, setUser] = useState(userService.getUser());
  const [restaurant, setRestaurant] = useState();

  useEffect(() => {
    async function getRestaurant() {
      if (user?.isRestaurantOwner) {
        const response = await getRestaurantByOwner(user);
        const data = response.data[0];
        setRestaurant(data);
      }
    }
    getRestaurant();
  }, []);

  function changeRestaurant(data) {
    // possibly refactor? store restaurant in component state for re-rendering
    setRestaurant(data);
  }
  function handleSignUpOrLogin() {
    setUser(userService.getUser());
  }
  function handleLogout() {
    userService.logout();
    setUser(null);
  }
  if (user) {
    return (
      <UserContext.Provider value={user}>
        <RestaurantContext.Provider value={restaurant}>
          <Routes>
            <Route path="/" element={<Layout logout={handleLogout} />}>
              {user.isRestaurantOwner ? (
                <>
                  <Route
                    index
                    element={
                      <RestaurantHome setRestaurant={changeRestaurant} />
                    }
                  />
                  <Route path="/menu/:id" element={<MenuPage />} />
                  <Route path="/orders/:id" element={<OrderPage />} />
                </>
              ) : (
                <>
                  <Route index element={<CustomerHome />} />
                  <Route path="/restaurant/:id" element={<RestaurantPage />} />
                  <Route path="/cart/:id" element={<CartPage />} />
                  <Route path="/orders/:id" element={<OrderPage />} />
                </>
              )}
            </Route>
            <Route
              path="/login"
              element={<LoginPage handleSignUpOrLogin={handleSignUpOrLogin} />}
            />
            <Route
              path="/signup"
              element={<SignupPage handleSignUpOrLogin={handleSignUpOrLogin} />}
            />
            <Route
              path="/signup/restaurant"
              element={<RestaurantCreatePage />}
            />
            <Route path="/*" element={<Navigate to="/login" />} />
          </Routes>
        </RestaurantContext.Provider>
      </UserContext.Provider>
    );
  }
  return (
    <Routes>
      <Route
        path="/login"
        element={<LoginPage handleSignUpOrLogin={handleSignUpOrLogin} />}
      />
      <Route
        path="/signup"
        element={<SignupPage handleSignUpOrLogin={handleSignUpOrLogin} />}
      />
      <Route path="/*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
