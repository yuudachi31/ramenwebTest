import { useContext, useState } from "react";
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Drawer } from 'antd';
import { StoreContext } from "../store";
import Image from 'next/image'
import UserInfo from './UserInfo'
import LoginCard from './LoginCard'
import RegisterCard from "./RegisterCard";

export default function HomeHeader() {
  const { dispatch } = useContext(StoreContext);
  const router = useRouter()

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
        <div className="login">
          <UserInfo 
            onClick={isRegisterTouch ? ()=>setIsRegisterTouch(!isRegisterTouch) : () => setIsLoginTouch(!isLoginTouch)} 
            isOnTouch={isLoginTouch||isRegisterTouch}
          />
        </div>
      </header>
      <Drawer 
        title=" "
        placement={"right"}
      
        closable={false}
        onClose={handleCloseLoginDrawer}
        visible={isLoginTouch}
       
        width={"100%"}
        zIndex={99}
        bodyStyle={{backgroundColor: "#3D0C08"}}
        headerStyle={{backgroundColor: "#3D0C08", color: "#fff", border: "none"}}
      >
        <LoginCard onCreateAccount={()=>{setIsRegisterTouch(!isRegisterTouch) ,setIsLoginTouch(!isLoginTouch)}} />
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
