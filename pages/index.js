import Head from 'next/head';
import { useContext, useEffect } from "react";
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import HomeHeader from "../components/HomeHeader.js"
import HomeContent from "../components/HomeConent.js"
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;
import { getProducts } from "../api";
import {getAllPostAct} from "../actions"

import { StoreContext } from "../store"


export default function Home() {

  // useEffect(() => {

  //   const jsonProducts = getProducts("/posts");
  
  //   if(jsonProducts){
  //     console.log('getStaticProps = ')
  //     console.log(jsonProducts[0])
  //   }
  // }, []);
  return (
    <Layout>
      <Head>
        <title>Home Page</title>
      </Head>
      <Layout className="home-layout-1">
        <Header className="sethomeHeader">
          <HomeHeader />
        </Header>
        <Layout className="container home-layout-2">
          <Content style={{ padding: '0 50px' }} >
            <HomeContent />

          </Content>
        </Layout>
     
      </Layout>
    </Layout>
  )
}
export const getStaticProps = async () => {
  const jsonProducts = await getProducts("/posts");

  if(jsonProducts){
    console.log('getStaticProps = ')
    console.log(jsonProducts[0])
    return {
      props: {jsonProducts},
    };
  }
}