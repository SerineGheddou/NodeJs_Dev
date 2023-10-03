import { useEffect, useState } from "react";
import Axios from 'axios';
import {MdOutput} from 'react-icons/md';
import Sticky from 'react-stickynode';
import Sidebar from "../../components/sideBar";
import '../../style/add.css';
import MagasinList from '../../constants/MagList';
import {UniteCOMList} from '../../constants/UnitCOM';

export default function AjouterSortie() {
    const [NSortie, setNS] = useState("");
    const [DateSortie, setDS] = useState("");
    const [NAP, setNAP] = useState("");
    const [NImputation, setNImp] = useState("");
    const [UnitCom, setUnitcom] = useState("");
    const [Mag, setMag] = useState("");
    const [Prjt, setPrjt] = useState("");
    const [ListAvoirArticle, setListAvoirArticle] = useState([]);
    const [ListArticle, setListArticle] = useState([]);
    const onSubmit = () => {
        CreerSortie();
        AjouterListArticle();
    }
    const CreerSortie = (e) => {
     Axios.post("http://localhost:8080/api/sorties/", {
        NSortie: NSortie,
        DateSortie: DateSortie,
        NAP: NAP,
        NImputation: NImputation,
        UniteCOM: UnitCom,
        Magasin: Mag,
        Prjt:Prjt,
       headers:{
         "Accept":"application/json, text/plain, /",
         "Content-Type": "multipart/form-data"}
      }).then((response) => {
         console.log(response);
      });
    };
    const AjouterListArticle = (e) => {
        console.log(ListAvoirArticle[0]);
        Axios.post("http://localhost:8080/api/avoirarticles", {
          data:ListAvoirArticle,
          headers:{
            "Accept":"application/json, text/plain, /",
            "Content-Type": "multipart/form-data"}
         }).then((response) => {
            console.log(response);
         });
       };
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
        <div className="registration">
          <div className="Add">
            <MdOutput color="#F29227" size="50px"/>
            <h1 className="header">Ajouter un nouveau Mouvement</h1>
          </div>
        <form className="formStyle">
          <div className="PersonalInfo"> 
           <div className="inputLabel">
           <label>Numero du Mouvement</label>
           <input type="text" onChange={(e) => {
                setNS(e.target.value);
              }}></input>
           <br/>
           </div>
           <div className="inputLabel">
           <label>Date du Mouvement</label>
           <input className="date" type="date" onChange={(e) => {
                setDS(e.target.value);
              }}></input>
           <br/>
           </div>
          </div>
          <div className="PersonalInfo">
           <div className="inputLabel">
            <label>Numero de l'AP</label>
            <input 
              type="text"
              onChange={(e) => {
                setNAP(e.target.value);
              }}
            /> <br/>
           </div>
           <div className="inputLabel">
            <label>Numero de l'imputation</label>
            <input 
              type="text"
              onChange={(e) => {
                setNImp(e.target.value);
              }}
            /> <br/>
           </div>
          </div>
          <div className="PersonalInfo">
           <div className="inputLabel">
            <label>Magasin</label>
            <select value={Mag}  onChange={(e)=> {
              setMag(e.target.value);
              }} >
              {  
                UniteCOMList?.map((element)=>
                  <option value={element.NumMag}>
                    {element.Designation}
                  </option>
                )
              }
            </select><br/>
           </div>
           <div className="inputLabel">
            <label>Unite comerciale</label>
            <select value={UnitCom}  onChange={(e)=> {
              setUnitcom(e.target.value);
              }} >
              {  
                UniteCOMList?.map((element)=>
                  <option value={element.NumUnit}>
                    {element.Designation}
                  </option>
                )
              }
            </select> <br/>
          </div>
          </div>
          <label>Projet</label>
          <input type="text" className="input" onChange={(e)=> {
            setPrjt(e.target.value);
          }}/>
          <br/>
          <label>Liste d'articles concernés</label>
          {ListArticle.map((article,index)=>
          {return(
            <div className="checkList">
                <input className="defaultCheckbox" type="checkbox" onChange={(e)=>{
                    ListAvoirArticle.push({"Nomenclature":article.Nomenclature, "NSortie": NSortie});
                }}/>
                <label>{article.Libelle}</label>
            </div>
          );
        }
       )}
           <br/>
         <button className="button" onClick={onSubmit}>Ajouter</button>
        </form>
      </div>
      </div>
      </div>
    )
}