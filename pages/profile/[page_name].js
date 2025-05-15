import { useContext, useEffect } from "react";
import { Layout } from "antd";
import Head from 'next/head'
import ProfileHeader from "../../components/ProfileHeader";
import ProfileContent from "../../components/ProfileContent"
import { setMyPostsPage } from "../../actions";
import { StoreContext } from "../../store"

const { Header, Content, Footer } = Layout;

function Profile() {

  const { state, dispatch } = useContext(StoreContext);
  
  useEffect(() => {
    setMyPostsPage(dispatch)
  }, []);// eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Layout>
      <Head>
        <title>Profile Page</title>
      </Head>
      <Layout className="home-layout-1">
        <Header className="sethomeHeader">
          <ProfileHeader />
        </Header>
        <Layout className="container ">
            <Content className="map-layout" style={{position: 'relative', flexGrow: "1" }} >
                <ProfileContent />
            </Content>
        </Layout>
        <Footer style={{ textAlign: 'center', background: '#3D0C08' }}></Footer>
      </Layout>
    </Layout>
  );
}

export default Profile;