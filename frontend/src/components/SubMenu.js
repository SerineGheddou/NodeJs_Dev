import React, {useState} from "react";
import {Link} from "react-router-dom";
import styled from "styled-components";

const SidebarLink = styled(Link)`
  display: flex;
  flex-direction: row;
  color: #e1e9fc;
  justify-content: space-between;
  padding: 20px;
  list-style: none;
  height: 60px;
  text-decoration: none;
  font-size: 18px;
  text-align: center;
  &:hover {
    background: #252831;
    border-left: 4px solid #F29227;
    cursor: pointer;
  }
`;

const SidebarLabel = styled.div`
  margin-left: 5px;
  text-align: center;
`;

const DropdownLink = styled(Link)`
  background: #252831;
  height: 60px;
  padding-left: 3rem;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #f5f5f5;
  font-size: 18px;
 
  &:hover {
    background: #F29227;
    cursor: pointer;
  }
`;

const SubMenu = ({ item }) => {
    const [subnav, setSubNav] = useState(false);
    const showSubnav = () => setSubNav(!subnav);
    var userType = JSON.parse(localStorage.getItem("User")).Type;
    return (
        <>
          <SidebarLink to={item.path}
          onClick={item.subNav && showSubnav}>
                {item.icon}
                <SidebarLabel>{item.title}</SidebarLabel>
                {item.subNav && subnav 
                 ? item.iconOpened: item.subNav
                 ?item.iconClosed
                 :<span/>}
             
          </SidebarLink>
          {subnav && 
           item.subNav.map((item, index) => {
            if (userType ==="admin" ||userType==="admin_dfc"){
              return (
                <DropdownLink to={item.path} key={index}>
                    {item.icon}
                    <SidebarLabel>{item.title}</SidebarLabel>
                </DropdownLink>
             );
            } else if (item.title.includes("Ajouter ")){
              return <></>
            } else {
              return(
                <DropdownLink to={item.path} key={index}>
                   {item.icon}
                   <SidebarLabel>{item.title}</SidebarLabel>
                </DropdownLink>
              );
            }
             
           })
          }
        </>
    );
};

export default SubMenu;
