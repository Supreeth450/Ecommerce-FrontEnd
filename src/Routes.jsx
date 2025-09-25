import React from "react";
import {Routes,Route} from "react-router-dom";
import RegistrationPage from "./Registration";
import LoginPage from "./Login";
import CustomerHomePage from "./CustomerHome";
import CartPage from "./CartPage";
import Profile from "./ProfileInfo";
import Orders from "./OrderPage";
import AdminLogin from "./AdminLogin"; 
import AdminDashboard from "./AdminDashboard";

const  AppRoutes = () => {
    return(
<Routes>
    <Route path="/" element={<RegistrationPage/>}/>
    <Route path="/login" element={<LoginPage/>}/>
     <Route path="/customerhome" element={<CustomerHomePage/>}/>
     <Route path="/cartPage" element={<CartPage/>}/>
     <Route path="/profilePage" element={<Profile/>}/>
     <Route path="/orderPage" element={<Orders/>}/>
     <Route path="/admin" element={<AdminLogin />} />
      <Route path="/admindashboard" element={<AdminDashboard />} />
      
</Routes>
    );
};

export default AppRoutes;