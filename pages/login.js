import { Layout } from "antd";
import { useRouter } from 'next/router'
import Head from 'next/head'
import LoginCard from "../components/LoginCard";

const { Header, Content, Footer } = Layout;

function Login(props) {
//   const router = useRouter()
//   const { redirect } = router.query;

  return (
    <Layout>
      <Head>
        <title>Login Page</title>
      </Head>      
      <Layout className="home-layout-1 bg-dark-gray">
        <Layout className="container home-layout-2 bg-dark-gray">
          <Content style={{ padding: '0 50px' }} >
            <LoginCard />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}

export default Login;