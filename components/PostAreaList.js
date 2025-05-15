import { useContext, useState } from "react";
import { useRouter } from 'next/router'
import { Row, Col, Spin } from "antd";
import { StoreContext } from "../store";
import Link from 'next/link'
import Image from 'next/image'
import PostEachArea from './PostsEachArea'
import Areas from '../json/area.json'
export default function PostAreaList(props) {
  const { children, to } = props;
  const { dispatch } = useContext(StoreContext);
  const router = useRouter();
  const [navhover, setNavhover] = useState(0);
  //   const onClickHeader = () => {
  //     setPage(dispatch, "/",  "NORDIC NEST Shopping Cart");
  //     router.push("/");
  //   };
  const onClick = () => {
    console.log("adfs")
  };
  return (
    <div className="PostAreaList">
      {Areas.allAreas.map(a => (
        <PostEachArea key={a.area} eachArea={a} >

        </PostEachArea>
      ))}




    </div>
  );
}