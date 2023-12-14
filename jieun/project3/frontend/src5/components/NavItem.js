import React from 'react';
import "./navigation.css";
import { Link } from "react-router-dom";

export default function NavItem({ name, address,src, offNav }) {

  return (
    <Link to={`${address}`} className="menu__item" onClick={() => offNav()}>
      {src?<img src={src} width="80" style={{margin:"10px"}}/>: <span>{name}</span>}
    </Link>
  );
}
