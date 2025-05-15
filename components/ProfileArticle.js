import React, { useContext, useEffect } from "react";
import { Button } from "antd";
import { StoreContext } from "../store";
import PostCard from "./PostCard";
import { removeMyPost, setMyPostsPage, setCollectionPostsPage } from "../actions"

export default function ProfileArticle() {
    const { state: { profilePage, profileNavBar, requestMyPosts, requestCollectionPosts, requestRemovePosts} , dispatch } = useContext(StoreContext);

    const handlePostDelete = (postId) => {
        removeMyPost(dispatch, postId);
        setMyPostsPage(dispatch);
    }

    return (
        <>
            {profileNavBar.activeItem === "/profile/myPosts" ? (
                <>
                    {requestMyPosts.loading? (
                        <div className="loading-div map-loadimg-div">
                            <img src="/images/loading.gif" alt="loading... " />
                        </div>
                    ):(
                        <div className="profile-post">
                            {profilePage.posts.map((post) => (
                                <div className="each-post" style={{position: "relative"}}>
                                    <PostCard eachPost={post} key={post.id} visiblePostsNum={100} postIndex={0} />
                                    {requestRemovePosts.loading ? (
                                        <Button 
                                            className="delete-post" 
                                            onClick={ () => { handlePostDelete(post.id) } } 
                                            loading
                                        >
                                            <span>刪除貼文</span>
                                        </Button>
                                    ):(
                                        <Button 
                                            className="delete-post" 
                                            onClick={ () => { handlePostDelete(post.id) } } 
                                        >
                                            <span>刪除貼文</span>
                                        </Button>
                                    )}
                                    
                                </div>
                            ))}
                        </div>
                    )}
                </>
            ) : (
                <>
                    {requestCollectionPosts.loading? (
                        <div className="loading-div map-loadimg-div">
                            <img src="/images/loading.gif" alt="loading... " />
                        </div>
                    ):(
                        <div className="profile-post">
                            {profilePage.posts.map( (post) => (
                                <div className="each-post" style={{position: "relative"}} key={post.id}>
                                    <PostCard eachPost={post} key={post.id} visiblePostsNum={100} postIndex={0} />
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}
        </>
    )
}