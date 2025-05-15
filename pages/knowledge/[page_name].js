import Head from 'next/head';
import { useContext, useEffect } from "react";
import { Layout, Menu, Breadcrumb } from 'antd';
import NoSearchHeader from "../../components/NoSearchHeader";
import KnowledgeContent from "../../components/KnowledgeContent"
import { setKnowledgePage } from "../../actions";
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;


import { StoreContext } from "../../store"


export default function Knowledge() {

  const { state: { knowledgePage: { article } }, dispatch } = useContext(StoreContext);

  useEffect(() => {
    const url = window.location.pathname;
    setKnowledgePage(dispatch, url)
  }, []);// eslint-disable-line react-hooks/exhaustive-deps  

  return (
    <Layout>
      <Head>
        <title>knowledge</title>
      </Head>
      <Layout className="home-layout-1">
        <Header className="sethomeHeader">
          <NoSearchHeader />
        </Header>
        <Layout className="container ">
          <Content className={`knowledge-layout knowledge-layout-${article.name}`}>
            <KnowledgeContent />
          </Content>
        </Layout>
        <Footer style={{ textAlign: 'center', background: '#3D0C08' }}></Footer>
      </Layout>
    </Layout>
  )
}