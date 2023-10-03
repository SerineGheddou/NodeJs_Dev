import React, { useState, useEffect, useRef } from "react";
import Axios from 'axios';
import { BsFillPencilFill } from "react-icons/bs";
import {AiFillCloseCircle} from "react-icons/ai";
import '../../style/table.css';
import SearchBar from '../../components/searchBar';
import { UpdateBox } from "../../components/updateBox";
import Sticky from 'react-stickynode';
import Sidebar from "../../components/sideBar";
import FileReaderInput from "react-file-reader";

 
export default function ConsulterAP (props) {
const [ListAP, setListAP] = useState([]);
const [inputText, setInputText] = useState(""); 
const [boxOpen, setboxOpen] = useState(false);
const [rowToEdit, setRowToEdit] = useState(null);
const [backgroundColor, setBackgroundColor] = useState(false);
const [backgroundColorB, setBackgroundColorB] = useState(false);
const inputRef = useRef();
const [file,setfile] = useState("");
const fieldsAP = [
  {name:"NAP", type:"text", id:"NAP"},
  {name:"Libelle", type:"text", id:"Libelle"},
  {name:"Statut", type:"text", id:"Statut"},
];

  
const handleButtonOnClick = () => {
    inputRef.current.click();
    
}
const handleonClick = (e) => {
  setfile(e.target.files[0]);
  let string="S:/";
  console.log(string.concat("",e.target.files[0].name));
  Axios.post ("http://localhost:8080/api/aps/import", {
    file: string.concat("",e.target.files[0].name),
    headers:{
      "Accept":"application/json, text/plain, text/csv /",
      "Content-Type": "multipart/form-data"
    }
  }).then((response) => {
    RecupAP();
 });
};
//Retrieves text from search bar and get data based on NAP entered
const handleChange = (e)=>{
  var upperCase = e.target.value.toUpperCase();
  setInputText(upperCase);
  console.log(upperCase);
  if(upperCase ==="") {
    setListAP([]);
    RecupAP();
  } else {
    RecupAPNAP(inputText);
  }
};

//Retrieve AP based on NAP
const RecupAPNAP = (value) => {
  Axios.get("http://localhost:8080/api/aps/withNAP", {
    params : {
      NAP: value, 
    },
    headers:{
      "Accept":"application/json, text/plain,  /",
      "Content-Type": "multipart/form-data"
    }
  }).then((response)=>{
    setListAP([]);
    setListAP(response.data);
  });
};
//Retrieve AP with NAP starting with A or B or C
const RecupAPNAPType = (v1,v2,v3) => {
  Axios.get("http://localhost:8080/api/aps/withType", {
    params : {
      L1:v1,
      L2:v2,
      L3:v3, 
    },
    headers:{
      "Accept":"application/json, text/plain, /",
      "Content-Type": "multipart/form-data"
    }
  }).then((response)=>{
    setListAP([]);
    setListAP(response.data);
  });
};
//Retrieve all AP
const RecupAP = () => {
  Axios.get("http://localhost:8080/api/aps",{
          headers:{
            "Accept":"application/json, text/plain, /",
            "Content-Type": "multipart/form-data"
          }
        }).then((response) => {
          setListAP([]);
          setListAP(response.data);
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
   Axios.put("http://localhost:8080/api/aps/update", {
    NAP:formState["NAP"],
    Libelle: formState["Libelle"],
    Statut: formState["Statut"],
    headers:{
      "Accept":"application/json, text/plain, /",
      "Content-Type": "multipart/form-data"
    }
  }).then((response) => {
    RecupAP();
 });

 };
 const handleonClickButtonSAP = () => {
  setBackgroundColor(!backgroundColor);
  RecupAPNAPType("A","B","C");
};
const handleonClickButtonSIF = () => {
 setBackgroundColorB(!backgroundColorB);
 RecupAPNAPType("R","N","M");
};

const deleteRow = (id) => {
  Axios.put("http://localhost:8080/api/aps/update", {
    NAP: id,
    Statut: "Y",
    headers:{
      "Accept":"application/json, text/plain, /",
      "Content-Type": "multipart/form-data"
    }
  }).then((response) => {
    RecupAP();
 });
};

useEffect(() => {
 RecupAP();
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
      <div className="buttonDiv">
        <button className={backgroundColor ? "Orange":"Blue"} onClick={handleonClickButtonSAP}>Sortie sur AP</button>
        <button className={backgroundColorB ? "Orange":"Blue"} onClick={handleonClickButtonSIF}>Sortie inter filiale</button>
      </div>
      <div className="importdiv">
       <button  className="importbtn" onClick={handleButtonOnClick}>Importer les APs</button>
         <input
          type="file"
          accept="file/csv"
          onChange={(e) => {handleonClick(e)}}
          ref={inputRef}
          style={{ display: 'none' }} // Hide the file input
       />
       
      </div>
      <h1 className="Header">Liste des autorisations programmes</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Centre comptable</th>
            <th>Code AP</th>
            <th>NAP</th>
            <th className="expand">Libelle</th>
            <th>Status</th>
            <th>Montant</th>
            <th>Projet</th>
            <th>DateCreation</th>
            <th>Exercice</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {ListAP.map((row, idx) => {
            const statusText =
              row.Statut.charAt(0).toUpperCase() + row.Statut.slice(1);
            return (
              <tr key={idx}>
                <td>{row.CentreComptable}</td>
                <td>{row.CodeAP}</td>
                <td>{row.NAP}</td>
                <td className="expand">{row.Libelle}</td>
                <td>
                  <span className={`label label-${row.Statut}`}>
                    {statusText}
                  </span>
                </td>
                <td>{row.Montant}</td>
                <td>{row.Prjt}</td>
                <td>{row.DateCreation}</td>
                <td>{row.Exercice}</td>
                <td className="fit">
                  <span className="actions">
                    <AiFillCloseCircle
                      className="delete-btn"
                      onClick={() => deleteRow(row.NAP)}
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
          defaultValue={rowToEdit !== null && ListAP[rowToEdit]}
          fields={fieldsAP}
        />
      )}
    </div>
    </div>
    </div>
  );
};
