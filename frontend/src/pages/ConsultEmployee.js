import React, { useState, useEffect } from "react";
import Axios from 'axios';
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import '../style/table.css';
import SearchBar from '../components/searchBar';
import { UpdateBox } from "../components/updateBox";
import Sticky from 'react-stickynode';
import Sidebar from "../components/sideBar";
import '../App.css';
 
export default function ConsultEmploye () {
const [ListEmploye, setListEmploye] = useState([]);
const [inputText, setInputText] = useState(""); 
const [boxOpen, setboxOpen] = useState(false);
const [rowToEdit, setRowToEdit] = useState(null);
const fieldsArticle = [
  {name:"Nom", type:"text", id:"LastName"},
  {name:"Prénom", type:"text", id:"FirstName"},
  {name:"Nom d'utilisateur", type:"text", id:"Username"},
  {name:"Type", type:"text", id:"Type"},
];

//Retrieves text from search bar and get data based on NAP entered
const handleChange = (e)=>{
  var upperCase = e.target.value.toUpperCase();
  setInputText(upperCase);
  console.log(upperCase);
  if(upperCase ==="") {
    setListEmploye([]);
    RecupEmploye();
  } else {
    RecupArticleNom(inputText);
  }
};

//Retrieve AP based on NAP
const RecupArticleNom = (value) => {
  Axios.get("http://localhost:8080/api/users/withNom", {
    params :{
      LastName: value,
    } ,
    headers:{
      "Accept":"application/json, text/plain, /",
      "Content-Type": "multipart/form-data"
    }
  }).then((response)=>{
    setListEmploye([]);
    setListEmploye(response.data);
  });
};
//Retrieve all Articles
const RecupEmploye = () => {
  Axios.get("http://localhost:8080/api/users/",{
          headers:{
            "Accept":"application/json, text/plain, /",
            "Content-Type": "multipart/form-data"
          }
        }).then((response) => {
          setListEmploye([]);
          setListEmploye(response.data);
       });
};
//open edit box and close it function
const closeBox = () => {
 setboxOpen(false);
 setRowToEdit(null);
};
//Edit function
const editRow = (idx) => {
  setboxOpen(true);
  setRowToEdit(idx);
};
const deleteRow = (id) => {
  Axios.delete(`http://localhost:8080/api/users/delete/${id}`, {
    headers:{
      "Accept":"application/json, text/plain, /",
      "Content-Type": "multipart/form-data"
    }
  }).then((response) => {
    RecupEmploye();
 });
};
 const onsubmit = (formState) => {
   Axios.put("http://localhost:8080/api/users/update", {
    id: formState["id"],
    LastName: formState["LastName"],
    FirstName: formState["FirstName"],
    Username:formState["Username"],
    Type:formState["Type"],
    headers:{
      "Accept":"application/json, text/plain, /",
      "Content-Type": "multipart/form-data"
    }
  }).then((response) => {
    RecupEmploye();
 });
 };

useEffect(() => {
    RecupEmploye();
}, []);
var authenticated = localStorage.getItem("auth");
  return (
    <div>
      <Sticky>
           {authenticated ? <Sidebar/>:<></>}
      </Sticky>
    <div className="div">
    <div className="table-wrapper">
      <div> <SearchBar value={inputText} handleChange={handleChange}/></div>
      <h1 className="Header">Liste des employés</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Prenom</th>
            <th className="expand">Nom d'utilisateur</th>
            <th>Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {ListEmploye.map((row, idx) => {
            return (
              <tr key={idx}>
                <td className="fit">{row.LastName}</td>
                <td className="fit">{row.FirstName}</td>
                <td>
                  <span className="fit">
                    {row.Username}
                  </span>
                </td>
                <td className="fit">{row.Type}</td>
                <td className="fit">
                  <span className="actions">
                    <BsFillTrashFill
                      className="delete-btn"
                      onClick={() => {deleteRow(row.id)}}
                    />
                    <BsFillPencilFill
                      className="edit-btn"
                      onClick={() => editRow(idx)}
                    />
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {boxOpen && (
        <UpdateBox
          closeBox={closeBox}
          onSubmit={(formState)=> {return onsubmit(formState);}}
          defaultValue={rowToEdit !== null && ListEmploye[rowToEdit]}
          fields={fieldsArticle}
        />
      )}
    </div>
    </div>
    </div>
  );
};

 