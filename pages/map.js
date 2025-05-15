import Head from 'next/head';
import { useContext, useEffect } from "react";
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import NoSearchHeader from "../components/NoSearchHeader";
import HomeContent from "../components/HomeConent.js"
// import RamenMap from "../components/RamenMap.js"
import dynamic from "next/dynamic";

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;


import { StoreContext } from "../store"


export default function map() {
   
  const MapWithNoSSR = dynamic(() => import("../components/Map"), {
    ssr: false
  });

  return (
    <Layout>
      <Head>
        <title>map</title>
        
        <link href='https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css' rel='stylesheet' />

      </Head>
      <Layout className="home-layout-1">
        <Header className="sethomeHeader">
          <NoSearchHeader />
        </Header>
        <Layout className="container ">
          <Content className="map-layout" style={{position: 'relative', display: "flex", flexDirection: "column" }} >
            <MapWithNoSSR />
          </Content>
        </Layout>
       
      </Layout>
    </Layout>
  )
}