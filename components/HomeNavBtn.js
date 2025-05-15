import { useContext, useState } from "react";
import { useRouter } from 'next/router'
import { Row, Col, Spin } from "antd";
import { StoreContext } from "../store";
import Link from 'next/link'
import Image from 'next/image'

export default function HomeNavBtn(props) {
    const { children, to} = props;
  const { dispatch } = useContext(StoreContext);
  const router = useRouter();
  const [navhover, setNavhover] = useState(0);
  //   const onClickHeader = () => {
  //     setPage(dispatch, "/",  "NORDIC NEST Shopping Cart");
  //     router.push("/");
  //   };
  const onClick = () => {
    console.log("navclick")
  };
  return (
    <div className="home-nav-btn">
      
        <img
          // style={{ width: '100%' }}
          src="/images/hover-img.png"

          className={navhover === 0 ? "hover-img hover-img-no" :
            navhover === 1 ? "hover-img hover-img-posts" :
           ""
          }
          alt="post" 
        />
        <Link href={to} >
          <div
            onMouseEnter={() => setNavhover(1)}
            onMouseLeave={() => setNavhover(0)}
            onClick={onClick}
            className="nav-item nav-item-post nav-top"
          >
                 {children}
          </div>
        </Link>
       
  
    </div>
  );
}