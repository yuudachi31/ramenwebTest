import { useEffect, useContext } from "react";
import { useRouter } from 'next/router'

import { StoreContext } from "../store"

export default function UserInfo({onClick, isOnTouch}){
    const { state: { userSignin : { userInfo, remember } } } = useContext(StoreContext);
    const router = useRouter()

    const goToProfile = () => {
       router.push("/profile/myPosts", undefined, { shallow: true });
    };
    useEffect(() => {
        if(remember)
            localStorage.setItem("userInfo", JSON.stringify(userInfo));
        else
            localStorage.removeItem("userInfo");
    }, [userInfo, remember]);

    return (
        <>
            {userInfo?(
                <>
                    <div onClick={goToProfile} className="login-btn">
                        <img
                            src="/images/user-icon-touch.png"
                            className="login-btn-img"
                            alt="post" 
                        />
                    </div>
                </>
            ):(
                <>
                    {isOnTouch?(
                        <span onClick={onClick} className="ham-menu show-mobile">
                            <span className="ham-menu-bar1 ham-menu-bar1--touch"></span>
                            <span className="ham-menu-bar2 ham-menu-bar2--touch"></span>
                            <span className="ham-menu-bar3 ham-menu-bar3--touch"></span>
                        </span>
                    ):(
                        <div onClick={onClick} className="login-btn">
                            <img
                                src="/images/user-btn.png"
                                className="login-btn-img"
                                alt="post" 
                            />
                        </div>
                    )}
                </>
            )}
            
        </>
    );
}