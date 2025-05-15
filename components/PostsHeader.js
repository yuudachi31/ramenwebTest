import { useContext, useState } from "react";
import { useRouter } from 'next/router'
import Link from 'next/link'
import { StoreContext } from "../store";
import Image from 'next/image'
import { Input, Drawer,Select } from 'antd';
import HamMenu from './HamMenu';
import PostNavBtnWhite from './PostNavBtnWhite';
import UserInfo from './UserInfo'
import LoginCard from './LoginCard';
import RegisterCard from "./RegisterCard";
import {getAllPostAct,cityClicked}from "../actions"
const { Option } = Select;

export default function PostsHeader({ title }) {
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
  function handleCityChange(value) {
    console.log(`selected ${value}`);
    cityClicked(dispatch, value, "無")
    getAllPostAct(dispatch)
  }
  return (
    <>
      <header className="homeHeader">
        <Link href="/" >
          <div className="logo">
            <img src="/images/logo.png" className="header-logo" alt="logo" />
          </div>
        </Link>
        <div className="inputCont">
          <Input className="postsinput" placeholder="" allowClear onChange={onChange} />
          <div className="search-btn" onClick={postSearch}><img src="./images/search.png"></img></div>
        </div>

<div className="postHeaderselect">
<Select defaultValue="地區" style={{ fontSize: 22 }} onChange={handleCityChange}>
                  <Option style={{ fontSize: 22, marginBottom: 5 }} value="基隆">基隆</Option>
                      <Option style={{ fontSize: 22, marginBottom: 5 }} value="台北">台北</Option>
                      <Option style={{ fontSize: 22, marginBottom: 5 }} value="新北">新北</Option>
                      <Option style={{ fontSize: 22, marginBottom: 5 }} value="桃園">桃園</Option>
                      <Option style={{ fontSize: 22, marginBottom: 5 }} value="新竹">新竹</Option>
                   
                    <Option style={{ fontSize: 22, marginBottom: 5 }} value="苗栗">苗栗</Option>
                        <Option style={{ fontSize: 22, marginBottom: 5 }} value="台中">台中</Option>
                        <Option style={{ fontSize: 22, marginBottom: 5 }} value="彰化">彰化</Option>
                        <Option style={{ fontSize: 22, marginBottom: 5 }} value="南投">南投</Option>
                        <Option style={{ fontSize: 22, marginBottom: 5 }} value="雲林">雲林</Option>
                    
                   <Option style={{ fontSize: 22, marginBottom: 5 }} value="嘉義">嘉義</Option>
                          <Option style={{ fontSize: 22, marginBottom: 5 }} value="台南">台南</Option>
                          <Option style={{ fontSize: 22, marginBottom: 5 }} value="高雄">高雄</Option>
                          <Option style={{ fontSize: 22, marginBottom: 5 }} value="屏東">屏東</Option>
                    
                       <Option style={{ fontSize: 22, marginBottom: 5 }} value="台東">台東</Option>
                            <Option style={{ fontSize: 22, marginBottom: 5 }} value="花蓮">花蓮</Option>
                            <Option style={{ fontSize: 22, marginBottom: 5 }} value="宜蘭">宜蘭</Option>
                </Select>
</div>



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
