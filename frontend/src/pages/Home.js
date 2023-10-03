import React, { useState, useEffect } from "react";
import Axios from 'axios';
import SearchBar from '../components/searchBar';
import Sticky from 'react-stickynode';
import Sidebar from "../components/sideBar";
import '../App.css';
function Home() {
  var authenticated = localStorage.getItem("auth");
  const [ListSortie, setListSortie] = useState([]);
  const [inputText, setInputText] = useState("");
  const fieldsSortie = [
    { name: "NSortie", type: "text", id: "NSortie" },
    { name: "DateSortie", type: "text", id: "DateSortie" },
    { name: "NAP", type: "text", id: "NAP" },
  ];
  var userType = JSON.parse(localStorage.getItem("User")).Type;
  //Retrieves text from search bar and get data based on NAP entered
  const handleChange = (e) => {
    var upperCase = e.target.value.toUpperCase();
    setInputText(upperCase);
    if (upperCase === "") {
      setListSortie([]);
      RecupSortie();
    } else {
      RecupSortieNS(inputText);
    }
  };

  //Retrieve AP based on NAP
  const RecupSortieNS = (value) => {
    Axios.get("http://localhost:8080/api/sorties/withNS", {
      params: {
        NSortie: value,
      },
      headers: {
        "Accept": "application/json, text/plain, /",
        "Content-Type": "multipart/form-data"
      }
    }).then((response) => {
      setListSortie([]);
      setListSortie(response.data);
    });
  };
  //Retrieve all AP
  const RecupSortie = () => {
    Axios.get("http://localhost:8080/api/aps/VueGlobal", {
      headers: {
        "Accept": "application/json, text/plain, /",
        "Content-Type": "multipart/form-data"
      }
    }).then((response) => {
      setListSortie([]);
      setListSortie(response.data);
    });
  };
  useEffect(() => {
  }, []);
  return (
    <div>
      <Sticky>
      {authenticated ? <Sidebar /> : <></>}
      </Sticky>
      <div className="div">
        <div className="table-wrapper">
          <div> <SearchBar value={inputText} handleChange={handleChange} /></div>
        </div>
      </div>
    </div>
  )
}
export default Home;
/*<td>{row.NImputation}</td>
 <th>N°Imputation</th>
            <th>Magasin</th>
            <th>Unite Com</th>
                <td>{row.Magasin}</td>
                <td>{row.UniteCOM}</td>
                <td>{row.Prjt}</td>
                <h1 className="Header">Liste des Mouvements</h1>
      <table className="table">
        <thead>
          <tr>
            <th>N°AP</th>
            <th className="expand" >Libelle</th>
            <th>Projet</th>
           
            <th>Projet</th>
          </tr>
        </thead>
        <tbody>
          {ListSortie.map((row, idx) => {
            return (
              <tr key={idx}>
                <td>{row.NAP}</td>
                <td className="expand">{row.Libelle}</td>
                <td>
                  <span className={`label label-${row.Statut}`}>
                    {row.Prjt}
                  </span>
                </td>  
              </tr>
            );
          })}
        </tbody>
      </table>
                */