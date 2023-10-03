import React, { useState, useEffect } from "react";
import Axios from 'axios';
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import '../../style/table.css';
import SearchBar from '../../components/searchBar';
import { UpdateBox } from "../../components/updateBox";
import Sticky from 'react-stickynode';
import Sidebar from "../../components/sideBar";


 
export default function ConsulterArticle () {
const [ListArticle, setListArticle] = useState([]);
const [inputText, setInputText] = useState(""); 
const [boxOpen, setboxOpen] = useState(false);
const [rowToEdit, setRowToEdit] = useState(null);
const fieldsArticle = [
  {name:"Nomenclature", type:"text", id:"Nomenclature"},
  {name:"Libelle", type:"text", id:"Libelle"},
  {name:"PrixUnitaire", type:"text", id:"PrixUnitaire"},
]

//Retrieves text from search bar and get data based on NAP entered
const handleChange = (e)=>{
  var upperCase = e.target.value.toUpperCase();
  setInputText(upperCase);
  console.log(upperCase);
  if(upperCase ==="") {
    setListArticle([]);
    RecupArticle();
  } else {
    RecupArticleNN(inputText);
  }
};

//Retrieve AP based on NAP
const RecupArticleNN = (value) => {
  Axios.get("http://localhost:8080/api/articles/withNN", {
    params :{
      Nomenclature: value,
    } ,
    headers:{
      "Accept":"application/json, text/plain, /",
      "Content-Type": "multipart/form-data"
    }
  }).then((response)=>{
    setListArticle([]);
    setListArticle(response.data);
  });
};
//Retrieve all Articles
const RecupArticle = () => {
  Axios.get("http://localhost:8080/api/articles/",{
          headers:{
            "Accept":"application/json, text/plain, /",
            "Content-Type": "multipart/form-data"
          }
        }).then((response) => {
          setListArticle([]);
          setListArticle(response.data);
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
  Axios.delete(`http://localhost:8080/api/articles/delete/${id}`, {
    headers:{
      "Accept":"application/json, text/plain, /",
      "Content-Type": "multipart/form-data"
    }
  }).then((response) => {
    RecupArticle();
 });
}
 const onsubmit = (formState) => {
   console.log(formState["NAP"]);
   Axios.put("http://localhost:8080/api/articles/update", {
    Nomenclature: formState["Nomenclature"],
    Libelle: formState["Libelle"],
    PrixUnitaire:formState["PrixUnitaire"],
    headers:{
      "Accept":"application/json, text/plain, /",
      "Content-Type": "multipart/form-data"
    }
  }).then((response) => {
    RecupArticle();
 });

 }

useEffect(() => {
    RecupArticle();
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
      <h1 className="Header">Liste des articles</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Nomenclature</th>
            <th className="expand">Libelle</th>
            <th>PrixUnitaire</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {ListArticle.map((row, idx) => {
            return (
              <tr key={idx}>
                <td>{row.Nomenclature}</td>
                <td className="expand">{row.Libelle}</td>
                <td>
                  <span className={`label label-${row.Statut}`}>
                    {row.PrixUnitaire}
                  </span>
                </td>
                <td className="fit">
                  <span className="actions">
                    <BsFillTrashFill
                      className="delete-btn"
                      onClick={() => deleteRow(row.id)}
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
          defaultValue={rowToEdit !== null && ListArticle[rowToEdit]}
          fields={fieldsArticle}
        />
      )}
    </div>
    </div>
    </div>
  );
};
