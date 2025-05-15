import { useContext, useState } from "react";
import { useRouter } from 'next/router'
import Link from 'next/link'
import { StoreContext } from "../store";
import { Drawer } from 'antd';
import HamMenu from './HamMenu';
import PostNavBtnWhite from './PostNavBtnWhite';
import UserInfo from './UserInfo'
import LoginCard from './LoginCard';
import RegisterCard from "./RegisterCard";
import ProfileNavBar from "./ProfileNavBar"

export default function ProfileHeader({ title }) {
    const { state:{ profileNavBar: { activeItem } }, dispatch } = useContext(StoreContext);
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

    const [isUserMenuTouch, setIsUserMenuTouch] = useState(false);
    const handleCloseUserMenuDrawer = () => setIsUserMenuTouch(false);

    const returnClick = () => {
        router.push("/", undefined, { shallow: true })
    }

    return (
        <>
            <header className="profileHeader">
                <div className="hide-pc profile-title">
                    <img src="/images/user-menu.png" className="user-menu-img" alt="userMenu" onClick={()=>setIsUserMenuTouch(!isUserMenuTouch)}/>
                    <p className="profile-title-text">{ activeItem === "/profile/myPosts"? `我的文章`:`收藏文章` }</p>
                </div>
                <Link href="/" >
                    <div className="logo hide-mobile">
                        <img src="/images/logo.png" className="header-logo" alt="logo" />
                    </div>
                </Link>

                <div className="login-and-ham">
                    <div className="login hide-mobile">
                        <UserInfo
                            onClick={isRegisterTouch ? () => setIsRegisterTouch(!isRegisterTouch) : () => setIsLoginTouch(!isLoginTouch)}
                            isOnTouch={isLoginTouch || isRegisterTouch}
                        />
                    </div>
                    <div className="hide-mobile profile-ham-div"><HamMenu onClick={() => setIsHamTouch(!isHamTouch)} isOnTouch={isHamTouch} /></div>
                </div>
                <div className="profile-return hide-pc" onClick={returnClick}>
                    <span className="return-btn-1"></span>
                    <span className="return-btn-2"></span>
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
                bodyStyle={{ backgroundColor: "#3D0C08" }}
                headerStyle={{ backgroundColor: "#3D0C08", color: "#fff", border: "none" }}
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
                bodyStyle={{ backgroundColor: "#3D0C08" }}
                headerStyle={{ backgroundColor: "#3D0C08", color: "#fff", border: "none" }}
            >
                <LoginCard onCreateAccount={() => { setIsRegisterTouch(!isRegisterTouch), setIsLoginTouch(!isLoginTouch) }} redirect={redirect} />
            </Drawer>
            <Drawer
                title=" "
                placement={"right"}

                closable={false}
                onClose={handleCloseRegisterDrawer}
                visible={isRegisterTouch}

                width={"100%"}
                zIndex={99}
                bodyStyle={{ backgroundColor: "#3D0C08" }}
                headerStyle={{ backgroundColor: "#3D0C08", color: "#fff", border: "none" }}
            >
                <RegisterCard onReturnLogin={() => { setIsLoginTouch(!isLoginTouch), setIsRegisterTouch(!isRegisterTouch) }} />
            </Drawer>
            {/* moblile user menu */}
            <Drawer
                title=" "
                placement={"left"}
                className="hide-pc user-menu-drawer"
                closable={false}
                onClose={handleCloseUserMenuDrawer}
                visible={isUserMenuTouch}

                width={"100%"}
                zIndex={99}
                bodyStyle={{ backgroundColor: "#3D0C08" }}
                headerStyle={{ backgroundColor: "#3D0C08", color: "#fff", border: "none" }}
            >
                <ProfileNavBar isMobile={true} onMobileClick={()=>setIsUserMenuTouch(false)} />
            </Drawer>
        </>
    );
}