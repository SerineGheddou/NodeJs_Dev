import { useState} from "react";
import { useNavigate } from "react-router-dom"
import Axios from 'axios';
import Header from "../components/Header"
import { loginFields } from "../constants/formFields";
import Input from "../components/Input";
import FormAction from "../components/FormAction";
import '../App.css';

const fields=loginFields;
let fieldsState = {};
fields.forEach(field=>fieldsState[field.id]='');

export default function LoginPage(){
    
    const [loginState,setLoginState]=useState(fieldsState);
    const navigate = useNavigate();

    //Affecter les valeurs respectives
    const handleChange =(e) => {
      setLoginState({...loginState,[e.target.id]:e.target.value});
     };

     //Appel du login 
     const handleSubmit = (event)=>{
      event.preventDefault();
       login();
      
     }
    
     //Appel de l'API
    const login = () => {
        Axios.post("http://localhost:8080/api/users/login",{
          Username : loginState[fields[0].id],
          Password: loginState[fields[1].id],
          headers:{
            "Accept":"application/json, text/plain, /",
            "Content-Type": "multipart/form-data"
          }
        }).then((response) => {
          if (response) {
            localStorage.setItem("User", JSON.stringify(response.data.user));
            localStorage.setItem("auth", response.data.authenticated);
            navigate('/Home');
          }else {
            console.log("Login failed");
          }
       });
       };

    return(
      <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="login">
        <Header/>
        <form className="mt-5 space-y-6 flex flex-col items-center  justify-center">
        <div className="">
            {
                fields.map(field=>
                        <Input
                            key={field.id}
                            handleChange={handleChange}
                            value={loginState[field.id]}
                            labelText={field.labelText}
                            labelFor={field.labelFor}
                            id={field.id}
                            type={field.type}
                            isRequired={field.isRequired}
                            placeholder={field.placeholder}
                    />
                
                )
            }
        </div>
        <FormAction handleSubmit={handleSubmit} text="Se connecter" />
      </form>
          </div>
        </div>
      </div>
    )
}