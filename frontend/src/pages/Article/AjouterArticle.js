import { useState } from "react";
import Axios from 'axios';
import {FaStore} from 'react-icons/fa';
import '../../style/add.css';
import '../../App.css';
import Sticky from 'react-stickynode';
import Sidebar from "../../components/sideBar";


export default function AjouterArticle() {
    const [Nomenclature, setNN] = useState("");
    const [Libelle, setLibelle] = useState("");
    const [PrixUnitaire, setPU] = useState("");
    
    const CreerArticle = (e) => {
     Axios.post("http://localhost:8080/api/articles/", {
        Nomenclature: Nomenclature,
        Libelle: Libelle,
        PrixUnitaire: PrixUnitaire,
       headers:{
         "Accept":"application/json, text/plain, /",
         "Content-Type": "multipart/form-data"}
      }).then((response) => {
         console.log(response);
      });
    };
    var authenticated = localStorage.getItem("auth");

    return (
      <div>
       <Sticky>
           {authenticated ? <Sidebar/>:<></>}
        </Sticky>
      <div className="div">
      <div className="registration">
          <div className="Add">
            <FaStore color="#F29227" size="50px"/>
            <h1 className="header">Ajouter un nouvel article </h1>
          </div>
        <form className="formStyle">
          <div className="PersonalInfo"> 
           <div className="inputLabel">
           <label>Nom en clature</label>
           <input type="text" onChange={(e) => {
                setNN(e.target.value);
              }}></input>
           <br/>
           </div>
           <div className="inputLabel">
           <label>Libelle</label>
           <input className="date" type="text" onChange={(e) => {
                setLibelle(e.target.value);
              }}></input>
           <br/>
           </div>
          </div>
          <label>Prix unitaire</label>
          <input 
              className="input"
              type="text"
              onChange={(e) => {
                setPU(e.target.value);
              }}
          /> <br/>
           <br/>
         <button className="button" onClick={CreerArticle}>Ajouter</button>
        </form>
      </div>
      </div>
      </div>
    )
}