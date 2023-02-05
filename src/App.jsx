import "./App.css";

import { useState, createContext, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import Load from "./components/Loader/Loader";
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
  const [load, setLoad] = useState(false);
  const [toggle, setToggle] = useState(false)
  useEffect(() => {
    async function getRestaurant() {
      setLoad(true);
      const loggedIn = await userService.getUser();
      if (loggedIn?.isRestaurantOwner) {
        const response = await getRestaurantByOwner(user);
        const data = response.data[0];
        setRestaurant(data);
      }
      setLoad(false);
    }
    getRestaurant();
  }, [user, toggle]);

  function changeRestaurant(data) {
    setRestaurant(data);
  }

  async function handleSignUpOrLogin() {
    try {
      setLoad(true);
      const loggedIn = await userService.getUser();
      setUser(loggedIn);
      setLoad(false);
    } catch (err) {}
  }

  function handleLogout() {
    userService.logout();
    setUser(null);
  }

  if (user) {
    
    if (load) {
      return <Load />;
    }

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
              element={<RestaurantCreatePage setToggle={setToggle} />}
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
