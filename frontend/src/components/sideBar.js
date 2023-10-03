import React from "react";
import styled from "styled-components";
import { SidebarData, SidebarDataAdmin } from "./SidebarData";
import SubMenu from "./SubMenu";
import logo from "../assets/Sonlgaz.png";
import {PopupMenu} from "react-simple-widgets";
import {CgProfile} from "react-icons/cg";
import '../style/navbar.scss';
import '../App.css'

const Nav = styled.div`
 width: 100vw;
 height: 70px;
 display: flex;
 background: white;
`;

const SidebarNav = styled.nav`
  background: #15171c;
  width: 300px;
  height: 100vh;
  display: flex;
  flex-direction: column ;
  position: fixed;
  top: 0;
  justify-content: flex-start;
  transition: 350ms;
  border-radius: 0px 16px 16px 0px;
  
`;
const SidebarWrap = styled.div`
 width: 100%
`;


const Sidebar = (userType) => {
    var userType = JSON.parse(localStorage.getItem("User")).Type;
    var userFirstName = JSON.parse(localStorage.getItem("User")).FirstName;
    var userLastName = JSON.parse(localStorage.getItem("User")).LastName;
    var userUsername = JSON.parse(localStorage.getItem("User")).Username;
    return (
        <div >
            <Nav>
                <div className="navItems">
                    <h1
                        style={{
                            textAlign: "start",
                            marginLeft: "320px",
                            marginRight: "300px",
                            color: "#298ACB",
                            fontSize: "42px",
                        }}
                    >
                        Platforme de suivi des projets
                    </h1>
                    <div id="app">
                        <div className="text-end">
                            <PopupMenu className="pop">
                                <button className="button" >
                                    <div className="iconProf">
                                        <CgProfile style={{
                                            marginRight: "10px"
                                        }}
                                        size="20px"
                                        />
                                        {userType}
                                    </div>
                                </button>
                                <div className="card text-start">
                                    <div className="card-body px-4 py-12">
                                        <div id="circle-avatar" className="text-center mx-auto mb-4">
                                        <CgProfile style={{  
                                        }}
                                        size="100px"
                                      />
                                        </div>

                                        <h5 className="text-center mb-0">{userFirstName} {userLastName}</h5>
                                        <p className="text-center mb-2">{userUsername}</p>

                                        <hr />

                                        <p
                                            className="mb-0"
                                            style={{ color: "#bebebe", fontWeight: "bold", fontSize: 12 }}
                                        >
                                            ROLES
                                        </p>
                                        <p style={{ fontSize: 12 }}>
                                            {userType}
                                        </p>
                                        <hr />
                                        

                                        <div className="d-grid">
                                            <button className="btn btn-secondary">
                                                Logout
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </PopupMenu>
                        </div>
                    </div>
                </div>
            </Nav>
            <SidebarNav >
                <div >
                    <img
                        alt=""
                        className="h-25 w-24 ml-24 mt-10 mb-10 "
                        src={logo}
                    />
                    <SidebarWrap>
                        {userType === "admin" ? SidebarDataAdmin.map((item, index) => {
                            return <SubMenu item={item} key={index} />
                        }) : SidebarData.map((item, index) => {
                                return <SubMenu item={item} key={index} />
                            
                        })
                        }
                    </SidebarWrap>
                </div>
            </SidebarNav>
        </div>
    );
};

export default Sidebar;
