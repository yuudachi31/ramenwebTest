import { useContext,useEffect,useState } from "react";
import { useRouter } from 'next/router'
import { Row, Col, Spin } from "antd";
import { StoreContext } from "../store";
import PostAreaList from "/components/PostAreaList"
import HomeNav from "/components/HomeNav"
import PostsEachCity from "./PostsEachCity"
import { areaClicked } from "../actions"
import PostCard from "./PostCard"
import moment from 'moment'
import {feedPosts,getAllPosts,changeDocTest} from '../api/index'
import {getAllPostAct} from '../actions'




export default function PostsList({postsJson,postsListState}) {
  const { state: {
    
    area: {northClick,westClick,eastClick,southClick} ,
  requestPostsPage:{
    loading
  }
  },
  
  dispatch } = useContext(StoreContext);
  const router = useRouter()
  const[visiblePosts,setVisiblePosts]=useState(10)
  // console.log("postsJson=")
  // console.log(postsJson.allPosts)

  //   const onClickHeader = () => {
  //     setPage(dispatch, "/",  "NORDIC NEST Shopping Cart");
  //     router.push("/");
  //   };
  useEffect(() => {
     EffectGetPost()
  
  }, []);
  const feedOnClick = () => {
    feedPosts()
    
  };
  console.log(postsListState)
  console.log(postsListState[117])

  const clickGetPost= async()=>{
    let postsdata=await getAllPostAct(dispatch)
console.log(postsdata)
  }
  const EffectGetPost= async()=>{
    let postsdata=await getAllPostAct(dispatch)
console.log(postsdata)
  }
  var data = [moment(postsJson.allPosts[0].date), moment(postsJson.allPosts[1].date), moment(postsJson.allPosts[2].date)]

const result = postsJson.allPosts.sort((b,a) => moment(a.date).diff(moment(b.date)))  // change to b.diff(a) for desc
//images
const imagedata=''
const Example = ({ data }) => <img className="imgTest"src={data} />

const inputChange =(e)=>{
  console.log("ss")
  handleFileSelect(e)
}
// if (hash === '') {
  // No hash found, so render the file upload button.

 
  // document.getElementById("file-upload").addEventListener('change', handleFileSelect, false);
// } else {
//   // A hash was passed in, so let's retrieve and render it.

//   spinner.spin(document.getElementById('spin'));
//   var file = new Firebase(firebaseRef + '/pano/' + hash + '/filePayload');
//   file.once('value', function(snap) {
//     var payload = snap.val();
//     if (payload != null) {
//       document.getElementById("pano").src = payload;
//     } else {
//       $('#body').append("Not found");
//     }
//     spinner.stop();
//   });
// }


// var firebaseRef = 'https://firepano.firebaseio.com/';

console.log(postsListState)

function handleFileSelect(evt) {
  var file = evt.target.files[0];
   var reader = new FileReader();
    var AllowImgFileSize = 2100000;
    console.log(file.name)
    var files = file.name.split('.')
    var name = files[files.length - 1]
    var type = ['gif', 'png', 'jpg', 'svg', 'jpeg']
  console.log("upload")
  
    //判断图片格式
    if (type.indexOf(name) === -1) {
      message.info(`不支持.${name}格式`)
      return
  }
  var imgUrlBase64;
  if (file) {
      //将文件以Data URL形式读入页面
      imgUrlBase64 = reader.readAsDataURL(file);
      reader.onload = function (e) {
        if (AllowImgFileSize !== 0 && AllowImgFileSize < reader.result.length) {
            message.info('上传失败，请上传不大于2M的图片！');
            return;
        } else {
             console.log( reader.result)
        }
    }
}
  // reader.onload = (function(theFile) {
  //   return function(e) {
  //     var filePayload = e.target.result;
  //     // Generate a location that can't be guessed using the file's contents and a random number

  //     var hash = CryptoJS.SHA256(Math.random() + CryptoJS.SHA256(filePayload));
  //     var file = new Firebase(firebaseRef + 'pano/' + hash + '/filePayload');
    
  //     // Set the file payload to Firebase and register an onComplete handler to stop the spinner and show the preview

  //     file.set(filePayload, function() { 
       
  //       document.getElementById("pano").src = e.target.result;
  //       $('#file-upload').hide();
  //       // Update the location bar so the URL can be shared with others

  //        window.location.hash = hash;
  //     });
  //   };
  // })(file);
  // reader.readAsDataURL(file);
}

// console.log(result)
  console.log(moment().format('YYYY-MM-DD HH:mm:ss'))
  
  return (
    <div className="post-list" >


      {/* <div className="inputBG">
      <input className="hidden" type="file" accept="image/*" capture="camera" id="file-upload"></input>
      <img className="pano" id="pano" 
      src={postsListState[117].image}
      />
      </div> */}


       {/* <input onChange={inputChange} className="hidden" type="file" accept="image/*" capture="camera" id="64input"></input>
<div id="value"className=".imgTest"></div>
      <Example data={imagedata} /> */}
      
        {/* <div className="showPostData" onClick={clickGetPost}>
GET
        </div>
        <div className="feedPostData" onClick={feedOnClick}>
FEED
        </div> 
        <div className="changeTest" onClick={()=>{changeDocTest()}}>
change
        </div>  */}
        
        {
loading?(<div className="loading-div post-loadimg-div">
<img src="/images/loading.gif" alt="loading... " />
</div>):(<>{
          postsListState.map((eachPost,index)=>(
            <PostCard key={eachPost.id} eachPost={eachPost} visiblePostsNum={visiblePosts} postIndex={index}></PostCard>
          ))}
          <div className="post-see-more" onClick={()=>{setVisiblePosts(visiblePosts+10);}}><p>看更多貼文</p></div>
      </>
       ) }
{/*     
      <img
          // style={{ width: '100%' }}
          src="/images/hover-img.png"
          className={northClick&&eachArea.area=="北部"||westClick&&eachArea.area=="中部"||southClick&&eachArea.area=="南部"||eastClick&&eachArea.area=="東部"? "area-slected-img area-slected-img-off" :"area-slected-img area-slected-img-on" 
           
          }
          alt="post" 
        />
          <div className="area" onClick={areaOnClick}>
        {eachArea.area}
        <div className="tri"></div>
      </div>
      <div className="citys-cont">
      {
        eachArea.citys.map(eachCity => (
          <PostsEachCity key={eachCity.city} city={eachCity.city} area={eachArea.area}></PostsEachCity>

        )
        )
      }
      </div> */}
     
      
    </div>
  );
}