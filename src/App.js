import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ReactDOM from "react-dom";
import { LandingPage } from "./pages/LandingPage";
import { AddNewPage } from "./pages/AddNewPage";
import { Home } from "./pages/Home";
import Data from "./data.json";
import { usePagination } from "react-use-pagination";
import "antd/dist/antd.css";
import { Layout, Menu } from "antd";
import { PlusCircleOutlined, StarOutlined, HomeOutlined } from "@ant-design/icons";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const App = () => {
  //layout
  const [collapsed, setCollapsed] = React.useState(false);

  const onCollapse = (collapsed) => {
    setCollapsed({ collapsed });
  };
  // prepare and correct data coming from .json file
  const defaultData = JSON.stringify(Data).replace(/'/g, '"' && "'");
  const correctData = JSON.parse(defaultData);
  const [data, setData] = React.useState(correctData);
  console.log(data);

  //add new Item to data state
  const onSuccess = (newData) => {
    setData((oldData) => [...oldData, newData]);
  };

  return (
    <Router>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item key="1" icon={<HomeOutlined />}>
              Home
              <Link to="/" />
            </Menu.Item>
            <Menu.Item key="2" icon={<StarOutlined />}>
              List
              <Link to="/list" />
            </Menu.Item>
            <Menu.Item key="3" icon={<PlusCircleOutlined />}>
              Add new
              <Link to="/add" />
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header
            className="site-layout-background"
            style={{ padding: 0 }}
          ></Header>
          <Content style={{ margin: "0 16px" }}>
            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: 360 }}
            >
                 <Route
                exact
                path="/"
                component={() => <Home />}
              />
              <Route
                exact
                path="/list"
                component={() => <LandingPage data={data} />}
              />
              <Route
                path="/add"
                component={() => <AddNewPage onSuccess={onSuccess} />}
              />
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            {" "}
            ©2021 Created with ♡ by Edita Gudan
          </Footer>
        </Layout>
      </Layout>
    </Router>
  );
};
ReactDOM.render(<App />, document.getElementById("root"));
