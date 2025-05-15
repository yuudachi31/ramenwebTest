import { useState, useContext } from "react";
import { Drawer } from "antd";
import { StoreContext } from "../store";
import { setMyPostsPage, setCollectionPostsPage } from "../actions";

import ProfileNavItem from "./ProfileNavItem";

export default function ProfileNavBar({isMobile, onMobileClick}) {
    const { state, dispatch } = useContext(StoreContext);

    const [isOnTouch, setIsOnTouch] = useState(false);
    const handleCloseDrawer = () => setIsOnTouch(false);

    const handleMyPageClick = () => {
        isMobile? onMobileClick() : null;
        setMyPostsPage(dispatch);
        console.log(state.profilePage.posts)
    }

    const handleCollectionPageClick = () => {
        isMobile? onMobileClick() : null;
        setCollectionPostsPage(dispatch);
        console.log(state.profilePage.posts)
    }

    return (
        <div>
            <div className="profile-nav-bar collapse-mobile">
                <ProfileNavItem
                    onClick={handleMyPageClick}
                    to="/profile/myPosts"
                    className="profile-nav-item"
                    activeClassName="profile-nav-item--active"
                >
                    我的文章
                </ProfileNavItem>
                <ProfileNavItem
                    onClick={handleCollectionPageClick}
                    to="/profile/collectionPosts"
                    className="profile-nav-item"
                    activeClassName="profile-nav-item--active"
                >
                    收藏文章
                </ProfileNavItem>
                <ProfileNavItem
                    to="/"
                    className="profile-nav-item"
                    activeClassName="profile-nav-item--active"
                    logOut={true}
                >
                    登出
                </ProfileNavItem>
            </div>
        </div>
    );
}