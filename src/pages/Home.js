import React from "react";
import ReactDOM from "react-dom";
import { Breadcrumb } from "antd";

export function Home( ) {

 

  return (
    <div>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
      </Breadcrumb>

      <div className="Hero">
      <img src={require("../assets/hero.png")}></img>
      </div>
    </div>
  );
}