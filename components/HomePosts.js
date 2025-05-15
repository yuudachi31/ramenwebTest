import { useContext } from "react";
import { useRouter } from 'next/router'
import { Row, Col, Spin } from "antd";
import { StoreContext } from "../store";
import Image from 'next/image'
import { gsap } from 'gsap'
export default function HomePosts({ title }) {
  const { dispatch } = useContext(StoreContext);
  const router = useRouter()

  //   const onClickHeader = () => {
  //     setPage(dispatch, "/",  "NORDIC NEST Shopping Cart");
  //     router.push("/");
  //   };

  return (
    <div className="home-posts">
      <div className="home-post-demo">
        <img src="/images/home-noodle.png" className="home-noodle-img" />
        <div className="home-post-div">
            <img src="/images/ramenimg_3.jpg"></img>
        </div>
        <div className="home-nuudle-bowl">          
          <img src="/images/home-noodle-bowl.png" className="home-noodle-bowl-img" />
        </div>
      </div>
    </div>
  );
}