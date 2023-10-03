import React, { useState, useEffect } from "react";
import Axios from 'axios';
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import '../../style/table.css';
import SearchBar from '../../components/searchBar';
import { UpdateBox } from "../../components/updateBox";
import Sticky from 'react-stickynode';
import Sidebar from "../../components/sideBar";


 
export default function ConsulterSortie () {
const [ListSortie, setListSortie] = useState([]);
const [inputText, setInputText] = useState(""); 
const [boxOpen, setboxOpen] = useState(false);
const [rowToEdit, setRowToEdit] = useState(null);
const fieldsSortie = [
  {name:"NSortie", type:"text", id:"NSortie"},
  {name:"DateSortie", type:"text", id:"DateSortie"},
  {name:"NAP", type:"text", id:"NAP"},
];
var userType=JSON.parse(localStorage.getItem("User")).Type;
//Retrieves text from search bar and get data based on NAP entered
const handleChange = (e)=>{
  var upperCase = e.target.value.toUpperCase();
  setInputText(upperCase);
  if(upperCase ==="") {
    setListSortie([]);
    RecupSortie();
  } else {
    RecupSortieNS(inputText);
  }
};

//Retrieve AP based on NAP
const RecupSortieNS = (value) => {
  Axios.get("http://localhost:8080/api/sorties/withNS", {
    params:{
      NSortie: value, 
    },
    headers:{
      "Accept":"application/json, text/plain, /",
      "Content-Type": "multipart/form-data"
    }
  }).then((response)=>{
    setListSortie([]);
    setListSortie(response.data);
  });
};
//Retrieve all AP
const RecupSortie = () => {
  Axios.get("http://localhost:8080/api/sorties/",{
          headers:{
            "Accept":"application/json, text/plain, /",
            "Content-Type": "multipart/form-data"
          }
        }).then((response) => {
          setListSortie([]);
          setListSortie(response.data);
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
 const onsubmit = (formState) => {
   console.log(formState["NAP"]);
   Axios.put("http://localhost:8080/api/sorties/update", {
    NSortie: formState["NSortie"],
    DateSortie: formState["DateSortie"],
    NAP:formState["NAP"],
    headers:{
      "Accept":"application/json, text/plain, /",
      "Content-Type": "multipart/form-data"
    }
  }).then((response) => {
    RecupSortie();
 });
 };
 const deleteRow = (id) => {
  Axios.delete(`http://localhost:8080/api/sorties/delete/${id}`, {
    headers:{
      "Accept":"application/json, text/plain, /",
      "Content-Type": "multipart/form-data"
    }
  }).then((response) => {
    RecupSortie();
 });
};

useEffect(() => {
 RecupSortie();
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
      <h1 className="Header">Liste des Mouvements</h1>
      <table className="table">
        <thead>
          <tr>
            <th>N°Mouvement</th>
            <th className="expand" >Date Mouvement</th>
            <th>N°AP</th>
            <th>N°Imputation</th>
            <th>Magasin</th>
            <th>Unite Com</th>
            <th>Projet</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {ListSortie.map((row, idx) => {
            return (
              <tr key={idx}>
                <td>{row.NSortie}</td>
                <td className="expand">{row.DateSortie}</td>
                <td>
                  <span className={`label label-${row.Statut}`}>
                    {row.NAP}
                  </span>
                </td>
                <td>{row.NImputation}</td>
                <td>{row.Magasin}</td>
                <td>{row.UniteCOM}</td>
                <td>{row.Prjt}</td>
                <td className="fit">
                  <span className="actions">
                    {userType === "admin_dfc" || userType==="admin" ? 
                    <div style={{display:"flex", flexDirection:"row", justifyContent:"space-around"}}>
                      <BsFillTrashFill
                      className="delete-btn"
                      onClick={() => deleteRow(row.id)}
                    />
                    <BsFillPencilFill
                      className="edit-btn"
                      onClick={() => editRow(idx)}
                    />
                    </div>: <></>
                    }
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
          defaultValue={rowToEdit !== null && ListSortie[rowToEdit]}
          fields={fieldsSortie}
        />
      )}
    </div>
    </div>
    </div>
  );
};
