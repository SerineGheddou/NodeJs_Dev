import { useState } from "react";
import Axios from 'axios';
import {FaUserTie} from 'react-icons/fa';
import Sticky from 'react-stickynode';
import Sidebar from "../components/sideBar";
import '../style/add.css';
import '../App.css';


export default function AddUserPage() {
    const [Nom, setNomReg] = useState("");
    const [Prenom, setPrenomReg] = useState("");
    const [TypeUser, setTypeUserReg] = useState("");
    const [Username, setUsernameReg] = useState("");
    const [Password, setPasswordReg] = useState ("");
    const [confPassword, setconfPasswordReg] = useState ("");
    const register = (e) => {
      e.preventDefault();
      console.log(Nom);
      console.log(Prenom);
      console.log(TypeUser);
     Axios.post("http://localhost:8080/api/users/register", {
       FirstName: Prenom,
       LastName: Nom,
       Type: TypeUser,
       Username: Username,
       Password: Password,
       confPassword: confPassword,
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
            <FaUserTie color="#F29227" size="50px"/>
            <h1 className="header">Ajouter un nouvel employé</h1>
          </div>
        <form className="formStyle">
          <div className="PersonalInfo"> 
           <div className="inputLabel">
           <label>Nom</label>
           <input type="text" onChange={(e) => {
                setNomReg(e.target.value);
              }}></input>
           <br/>
           </div>
           <div className="inputLabel">
           <label>Prénom</label>
           <input type="text" onChange={(e) => {
                setPrenomReg(e.target.value);
              }}></input>
           <br/>
           </div>
          </div>
          <div className="PersonalInfo">
            <div className="inputLabel">
              <label>Nom d'utilisateur</label>
              <input 
                type="text"
                onChange={(e) => {
                  setUsernameReg(e.target.value);
                }}
              /> <br/>
            </div>
            <div className="inputLabel">
             <label>Type</label>
             <select className="select"  value={TypeUser} onChange={(e)=> {
              setTypeUserReg(e.target.value);
              }} >
                <option value="not selected">Choisir</option>
                <option value="admin">Administrateur</option>
                <option value="admin_dfc">Administrateur DFC</option>
                <option value="user_dfc">Utilisateur DFC</option>
                <option value="consult">Simple utilisateur</option>
             </select> 
           <br/>
            </div>
           </div>
          <div className="PersonalInfo">
            <div className="inputLabel">
             <label>mot de passe</label>
             <input 
              type="password"
              onChange={(e)=>{
              setPasswordReg(e.target.value);
              }}
            /><br/>
            </div>
            <div className="inputLabel">
             <label>Confirmer le mot de passe</label>
             <input type="password"
              onChange={(e) => {
                setconfPasswordReg(e.target.value);
               }}
              /><br/>
            </div>
          </div>
         <div className="buttondiv">
          <button className="button" onClick={register}>Register</button>
         </div>
        </form>
      </div>
      </div>
      </div>
    )
}