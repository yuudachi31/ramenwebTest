import { useContext, useState, useEffect, useRef, useCallback, Fragment } from "react";
import { useRouter } from 'next/router'
import { Row, Col, Spin ,Input, Drawer }from "antd";
import { StoreContext } from "../store";
import Image from 'next/image'
import PostAreaList from "/components/PostAreaList"
import HomeNav from "/components/HomeNav"
import { cityClicked } from "../actions";
import DetectableOverflow from 'react-detectable-overflow';
export default function PostCardComment(props) {
  const { state: { area: {
    northClick, westClick, eastClick, southClick, cityClick
  } }, dispatch } = useContext(StoreContext);
  const router = useRouter()


  const [readtoggle, setReadtoggle] = useState(false)
  const [bookmarkOrNot,setBookmarkOrNot]=useState(false)
  const [value,setValue]=useState('')
  const domRef = useRef(null)
 const{ comment ,index,readmore}=props
  const { TextArea } = Input;

  const sendComment=()=>{

  }

  // const [text, setText] = useState('');
  //       const [hasEllipsis, setHasEllipsis] = useState(false);
  //       const [needMore, setNeedMore] = useState(false);
  //       const domRef = useRef(null);
  //       const heightRef = useRef(0);
  //       const changeHandle = useCallback(e => {
  //           // setText(e.target.value);
  //           setHasEllipsis(true);
  //       }, [eachPost]);
  //       useEffect(() => {
  //           if(hasEllipsis){
  //               const height = parseInt(getComputedStyle(domRef.current).height);
  //               setNeedMore(height < heightRef.current);
  //               console.log(height)
  //           }else{
  //               heightRef.current = parseInt(getComputedStyle(domRef.current).height);
  //               setHasEllipsis(true);
  //               console.log("000")
  //           }
  //       }, [hasEllipsis]);
  //       useEffect(() => {
  //         console.log("87")
  //         changeHandle()
  //     }, [eachPost]);

 

  // console.log(index)


  ;
  const cityOnClick = () => {

    cityClicked(dispatch, city, area)
  };

  return (
    <>
    {
     readmore?(
      <div className="post-card-comment">
      <div className="comment-username">{comment.name}</div>
      <div className="comment-text"> {comment.content}</div>

    </div>
     ):
      index<2?
    (<div className="post-card-comment">
      <div className="comment-username">{comment.name}</div>
      <div className="comment-text"> {comment.content}</div>

    </div>):(null)
    
    }
    </>
  );
}