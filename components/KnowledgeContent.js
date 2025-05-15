import { useContext } from "react";
import { useRouter } from 'next/router'
import { Row, Col, Spin } from "antd";
import { StoreContext } from "../store";
import KnowledgeNavBar from "./KnowledgeNavBar"
import KnowledgeArticle from "./KnowledgeArticle"


export default function KnowledgeContent() {
  const { dispatch, state } = useContext(StoreContext);
  const router = useRouter()
    const {state: {knowledgePage: { article } } } = useContext(StoreContext)
  //   const onClickHeader = () => {
  //     setPage(dispatch, "/",  "NORDIC NEST Shopping Cart");
  //     router.push("/");
  //   };

  return (
    <div>
        <Row >
            <Col
                className="knowledge-navbar"
                xs={{ span: 24 }}
                sm={{ span: 24 }}          
                md={{ span: 24 }}
                lg={{ span: 4 }}
            >
                <KnowledgeNavBar />
            </Col>
            <Col
                className="knowledge-article"
                xs={{ span: 24 }}
                sm={{ span: 24 }}
                md={{ span: 24 }}
                lg={{ span: 20 }}
            >
                <KnowledgeArticle />
            </Col>
        </Row>
    </div>
  );
}