import { useState, createContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";

import LoginPage from "./pages/LoginPage/LoginPage";
import RestaurantCreatePage from "./pages/RestaurantCreatePage/RestaurantCreatePage";
import RestaurantHome from "./pages/RestaurantHome/RestaurantHome";
import CustomerHome from "./pages/CustomerHome/CustomerHome"
import SignupPage from "./pages/SignupPage/SignupPage";
import Header from "./components/Header/Header";
import userService from "./utils/userService";

export const UserContext = createContext();

function App() {
  const [user, setUser] = useState(userService.getUser());
console.log(user)
  function handleSignUpOrLogin() {
    setUser(userService.getUser()); 
  }
  function handleLogout() {
    console.log("being called");
    userService.logout();
    setUser(null);
  }
  if (user) { 
    return (
      <UserContext.Provider value={user}>
        <Header logout={handleLogout} />
        <Routes>
          {user.isRestaurantOwner ? 
          <Route path="/" element={<RestaurantHome />} />
          : <Route path="/" element={<CustomerHome />} />}
          <Route
            path="/login"
            element={<LoginPage handleSignUpOrLogin={handleSignUpOrLogin} />}
          />
          <Route
            path="/signup"
            element={<SignupPage handleSignUpOrLogin={handleSignUpOrLogin} />}
          />
          <Route path="/signup/restaurant" element={<RestaurantCreatePage />} />
          <Route path="/*" element={<Navigate to="/login" />} />
        </Routes>
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
  )
  
}

export default App;
