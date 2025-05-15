import { useContext, useState } from "react";
import { useRouter } from 'next/router'
import Link from 'next/link'
import { StoreContext } from "../store";
import Image from 'next/image'
import { Input, Drawer } from 'antd';
import HamMenu from './HamMenu';
import PostNavBtnWhite from './PostNavBtnWhite';
import UserInfo from './UserInfo'
import LoginCard from './LoginCard';
import RegisterCard from "./RegisterCard";

export default function NoSearchHeader({ title }) {
  const { dispatch } = useContext(StoreContext);
  const router = useRouter()
  const { redirect } = router.query;
  
  const onChange = e => {
    console.log(e);
  };
  const postSearch = () => {
    console.log("Sss");
  }

  const [isHamTouch, setIsHamTouch] = useState(false);
  const handleCloseHamDrawer = () => setIsHamTouch(false);
  const [isLoginTouch, setIsLoginTouch] = useState(false);
  const handleCloseLoginDrawer = () => setIsLoginTouch(false);
  const [isRegisterTouch, setIsRegisterTouch] = useState(false);
  const handleCloseRegisterDrawer = () => setIsRegisterTouch(false);

  return (
    <>
      <header className="homeHeader">
        <Link href="/" >
          <div className="logo">
            <img src="/images/logo.png" className="header-logo" alt="logo" />
          </div>
        </Link>
     
        <div className="login-and-ham">
          <div className="login">      
            <UserInfo 
              onClick={isRegisterTouch ? ()=>setIsRegisterTouch(!isRegisterTouch) : () => setIsLoginTouch(!isLoginTouch)} 
              isOnTouch={isLoginTouch||isRegisterTouch}
            />
          </div>
          <HamMenu onClick={() => setIsHamTouch(!isHamTouch)} isOnTouch={isHamTouch}/>
        </div>
      </header>
      <Drawer 
        title=" "
        placement={"right"}
      
        closable={false}
        onClose={handleCloseHamDrawer}
        visible={isHamTouch}
       
        width={"100%"}
        zIndex={99}
        bodyStyle={{backgroundColor: "#3D0C08"}}
        headerStyle={{backgroundColor: "#3D0C08", color: "#fff", border: "none"}}
      >
        <div className="post-nav-cont">
          <PostNavBtnWhite to="/posts">論壇</PostNavBtnWhite>
          <PostNavBtnWhite to="/map">地圖</PostNavBtnWhite>
          <PostNavBtnWhite to="/knowledge/iekei">科普</PostNavBtnWhite>
        </div>
      </Drawer>
      <Drawer 
        title=" "
        placement={"right"}
      
        closable={true}
        onClose={handleCloseLoginDrawer}
        visible={isLoginTouch}
       
        width={"100%"}
        zIndex={99}
        bodyStyle={{backgroundColor: "#3D0C08"}}
        headerStyle={{backgroundColor: "#3D0C08", color: "#fff", border: "none"}}
      >
        <LoginCard onCreateAccount={()=>{setIsRegisterTouch(!isRegisterTouch) ,setIsLoginTouch(!isLoginTouch)}} redirect={redirect} />
      </Drawer>
      <Drawer 
        title=" "
        placement={"right"}
    
        closable={false}
        onClose={handleCloseRegisterDrawer}
        visible={isRegisterTouch}
    
        width={"100%"}
        zIndex={99}
        bodyStyle={{backgroundColor: "#3D0C08"}}
        headerStyle={{backgroundColor: "#3D0C08", color: "#fff", border: "none"}}
    >
        <RegisterCard  onReturnLogin={()=>{setIsLoginTouch(!isLoginTouch) ,setIsRegisterTouch(!isRegisterTouch)}} />
    </Drawer>
    </>
  );
}
