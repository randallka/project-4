import { useState, createContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";

import LoginPage from "./pages/LoginPage/LoginPage";
import RestaurantCreatePage from "./pages/RestaurantCreatePage/RestaurantCreatePage";
import SignupPage from "./pages/SignupPage/SignupPage";

import userService from "./utils/userService";

export const UserContext = createContext();

function App() {
  const [user, setUser] = useState(userService.getUser());

  function handleSignUpOrLogin() {
    setUser(userService.getUser()); 
  }
  function handleLogout() {
    console.log("being called");
    userService.logout();
    setUser(null);
  }
  return (
    <UserContext.Provider value={user}>
      <Routes>
        <Route path="/" element={<h1>Home Pageeeeeeeeeee</h1>} />
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
    </UserContext.Provider>
  );
}

export default App;
