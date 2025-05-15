import { Layout } from 'antd';
import Head from 'next/head'
import NoSearchHeader from "../../components/NoSearchHeader"
import Feeder from "../../components/Feeder";

const { Header, Content, Footer } = Layout;

function Feed() {
  return (
    <Layout>
      <Head>
        <title>Feeding Page</title>
      </Head>
      <Layout className="home-layout-1">
        <Header className="sethomeHeader">
          <NoSearchHeader />
        </Header>
        <Content className="container">
          <Feeder />
        </Content>
        <Footer style={{ textAlign: 'center', background: '#3D0C08' }}></Footer>
      </Layout>
    </Layout>
  );
}

export default Feed;