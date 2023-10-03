import React from "react";
import * as FaIcons from "react-icons/fa";
import * as FIcons from "react-icons/fi"
import * as AiIcons from "react-icons/ai";
import * as RiIcons from "react-icons/ri";
import * as CIcons from "react-icons/ci";
import * as MdIcons from "react-icons/md";

export const SidebarDataAdmin = [
    {
        title:"Acceuil",
        path:"/Home",
        icon: <AiIcons.AiFillHome/>,
        iconClosed: <></>,
    },
    {
        title:"Utilisateurs",
        icon: <FIcons.FiUsers/>,
        iconClosed: <RiIcons.RiArrowDropDownLine/>,
        iconOpened: <RiIcons.RiArrowDropUpLine />,

        subNav: [
            {
                title: "Ajouter utilisateur",
                path:"/employes/add",
                icon:<FIcons.FiUserPlus/>
            },
            {
                title: "Consulter utilisateurs",
                path: "/employes/consult",
                icon: <AiIcons.AiOutlineTeam/>,
            },
        ],
    },
    {
        title: "Autorisation programme",
        icon: <FaIcons.FaFileContract/>,
        iconClosed: <RiIcons.RiArrowDropDownLine/>,
        iconOpened: <RiIcons.RiArrowDropUpLine />,

        subNav: [
            {
                title: "Ajouter AP",
                path: "/ap/ajout",
                icon: <MdIcons.MdAdd/>,
            },
            {
                title: "Consulter APs",
                path: "/ap/consult",
                icon: <CIcons.CiCircleList />,
            },
        ],
    },
    {
        title: "Mouvement",
        icon: <MdIcons.MdOutput/>,
        iconClosed: <RiIcons.RiArrowDropDownLine/>,
        iconOpened: <RiIcons.RiArrowDropUpLine />,

        subNav: [
            {
                title: "Ajouter Mouvement",
                path: "/sortie/ajout",
                icon: <MdIcons.MdAdd/>,
            },
            {
                title: "Consulter Mouvements",
                path: "/sortie/consult",
                icon: <CIcons.CiCircleList/>,
            },
        ],
    },
    {
        title: "Article",
        icon: <FaIcons.FaStore/>,
        iconClosed: <RiIcons.RiArrowDropDownLine/>,
        iconOpened: <RiIcons.RiArrowDropUpLine />,

        subNav: [
            {
                title: "Ajouter article",
                path: "/article/ajout",
                icon: <MdIcons.MdAdd/>,
            },
            {
                title: "Consulter articles",
                path: "/article/consult",
                icon: <CIcons.CiCircleList/>,
            },
        ],
    },
    
];

export const SidebarData = [
    {
        title:"Acceuil",
        path:"/Home",
        icon: <AiIcons.AiFillHome/>,
        iconClosed: <></>,
    },
    {
        title: "Autorisation programme",
        icon: <FaIcons.FaFileContract/>,
        iconClosed: <RiIcons.RiArrowDropDownLine/>,
        iconOpened: <RiIcons.RiArrowDropUpLine />,

        subNav: [
            {
                title: "Ajouter AP",
                path: "/ap/ajout",
                icon: <MdIcons.MdAdd/>,
            },
            {
                title: "Consulter APs",
                path: "/ap/consult",
                icon: <CIcons.CiCircleList />,
            },
        ],
    },
    {
        title: "Mouvement",
        icon: <MdIcons.MdOutput/>,
        iconClosed: <RiIcons.RiArrowDropDownLine/>,
        iconOpened: <RiIcons.RiArrowDropUpLine />,

        subNav: [
            {
                title: "Ajouter Mouvement",
                path: "/sortie/ajout",
                icon: <MdIcons.MdAdd/>,
            },
            {
                title: "Consulter Mouvements",
                path: "/sortie/consult",
                icon: <CIcons.CiCircleList/>,
            },
        ],
    },
    {
        title: "Article",
        icon: <FaIcons.FaStore/>,
        iconClosed: <RiIcons.RiArrowDropDownLine/>,
        iconOpened: <RiIcons.RiArrowDropUpLine />,

        subNav: [
            {
                title: "Ajouter article",
                path: "/article/ajout",
                icon: <MdIcons.MdAdd/>,
            },
            {
                title: "Consulter articles",
                path: "/article/consult",
                icon: <CIcons.CiCircleList/>,
            },
        ],
    },
    
];