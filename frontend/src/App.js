import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import LoginPage from './pages/Login';
import AddUserPage from "./pages/AddNewUser";
import Home from './pages/Home';

import './App.css';
import ConsultEmploye from "./pages/ConsultEmployee";
import AjouterAP from "./pages/AutoProg/AjouterAP";
import ConsulterAP from "./pages/AutoProg/ConsulterAP";
import ConsulterSortie from "./pages/Sortie/ConsultSortie";
import ConsulterArticle from "./pages/Article/ConsultArticle";
import AjouterSortie from "./pages/Sortie/AjouterSortie";
import AjouterArticle from "./pages/Article/AjouterArticle";

function App() {
  var userType=JSON.parse(localStorage.getItem("User")).Type;
  const auth= localStorage.getItem("auth");

  return (
     <BrowserRouter>
        <Routes>
            <Route path="/" element={<LoginPage/>} />
            <Route path="/ap/ajout" element={<AjouterAP/>} />
            <Route path="/ap/consult" element={<ConsulterAP/>} />
            <Route path="/sortie/ajout" element={<AjouterSortie/>} />
            <Route path="/sortie/consult" element={<ConsulterSortie/>} />
            <Route path="/article/ajout" element={<AjouterArticle/>} />
            <Route path="/article/consult" element={<ConsulterArticle/>} />
            <Route path="/employes/consult" element={<ConsultEmploye/>} />
            <Route path="/employes/add" element={<AddUserPage/>} />
            <Route path="/Home" element={<Home/>} />
        </Routes>
      </BrowserRouter>
    
  );
}
export default App;

