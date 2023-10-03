import { useState } from "react";
import Axios from 'axios';
import {FaFileContract} from 'react-icons/fa';
import '../../style/add.css';
import '../../App.css';
import Sticky from 'react-stickynode';
import Sidebar from "../../components/sideBar";


export default function AjouterAP() {
    const [NAP, setNAP] = useState("");
    const [Libelle, setLibelle] = useState("");
    const [Montant, setMontant] = useState("");
    const [CAP, setCAP] = useState("");
    const [CentreComp, setCC] = useState("");
    const [Statut, setStatut] = useState("");
    const [DateCreation, setDC] = useState("");
    const [Projet, setProjet] = useState("");
    const [Exercice, setEX] = useState("");
    
    
    const CreerAP = (e) => {
     Axios.post("http://localhost:8080/api/aps/", {
      NAP: NAP,
      Libelle : Libelle,
      Montant: Montant,
      CAP : CAP,
      CentreComp: CentreComp,
      Statut: Statut,
      DateCreation : DateCreation,
      Projet: Projet,
      Exercice : Exercice,
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
            <FaFileContract color="#F29227" size="50px"/>
            <h1 className="header">Ajouter une nouvelle AP </h1>
          </div>
        <form className="formStyle">
          <div className="PersonalInfo"> 
           <div className="inputLabel">
           <label>Numero d'AP</label>
           <input type="text" onChange={(e) => {
                setNAP(e.target.value);
              }}></input>
           </div>
           <div className="inputLabel">
           <label>Centre comptable</label>
           <input className="date" type="text" onChange={(e) => {
                setCC(e.target.value);
              }}></input>
           </div>
           <div className="inputLabel">
           <label>Code AP</label>
           <input className="date" type="text" onChange={(e) => {
                setCAP(e.target.value);
              }}></input>
           </div>
          </div>
          <br/>
          <div className="inputLabel">
           <label>Libelle</label>
           <input className="input" type="text" onChange={(e) => {
                setLibelle(e.target.value);
              }}></input>
           </div>
          <div className="PersonalInfo"> 
           <div className="inputLabel">
           <label>Montant</label>
           <input 
              className="input"
              type="text"
              onChange={(e) => {
                setMontant(e.target.value);
              }}
          /> 
           </div>
           <div className="inputLabel">
           <label>Statut</label>
           <input 
              className="input"
              type="text"
              onChange={(e) => {
                setStatut(e.target.value);
              }}
          /> 
           </div>
          </div>
          <label>Projet</label>
          <input 
          className="input"
              type="text"
              onChange={(e) => {
                setProjet(e.target.value);
              }}
          /> <br/>
          <label>Date de Creation</label>
          <input 
              className="input"
              type="date"
              onChange={(e) => {
                setDC(e.target.value);
              }}
          /> <br/>
          <label>Exercice</label>
          <input 
              className="input"
              type="text"
              onChange={(e) => {
                setEX(e.target.value);
              }}
          /> <br/>
           <br/>
         <button className="button" onClick={CreerAP}>Ajouter</button>
        </form>
      </div>
      </div>
      </div>
    )
}