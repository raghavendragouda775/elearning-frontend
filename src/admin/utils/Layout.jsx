import React from 'react'
import { Sidebar } from './sidebar';
import "./common.css"

export const Layout = ({children}) => {
  return (
    <div className="dashboard-admin">
      <Sidebar />
      <div className="content">{children}</div>
    </div>
  );
}
