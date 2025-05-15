import { useContext ,  useEffect} from "react";
import { useRouter } from 'next/router'
import { Row, Col, Spin } from "antd";
import { StoreContext } from "../store";
import PostAreaList from "/components/PostAreaList"
import PostsList from "./PostsList"
import {getAllPostAct} from '../actions'
export default function PostsContent({postsJson}) {
  const { state: {  postsListState }, dispatch } = useContext(StoreContext);
  const router = useRouter()
  useEffect(() => {
    EffectGetPost()
 
 }, []);
 const EffectGetPost= async()=>{
  let postsdata=await getAllPostAct(dispatch)
console.log(postsdata)
}
  //   const onClickHeader = () => {
  //     setPage(dispatch, "/",  "NORDIC NEST Shopping Cart");
  //     router.push("/");
  //   };
 
  return (
    <div className="postContent">
       <div className="post_bg"></div> 
      <Row >

        <Col
          sm={{ span: 5 }}
          xl={{ span: 5 }}
          xxl={{ span: 5 }}
        >
          <PostAreaList ></PostAreaList>


        </Col>
        <Col
          sm={{ span: 14 }}
          xl={{ span: 14 }}
          xxl={{ span: 14 }}
        >
         <PostsList postsJson={postsJson} postsListState={postsListState}></PostsList>
        </Col>
        <Col
          sm={{ span: 0}}
          xl={{ span: 0 }}
          xxl={{ span: 5 }}
        >
          </Col>

      </Row>
    </div>
  );
}