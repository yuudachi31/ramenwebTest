import Head from 'next/head';
import { useContext, useEffect, useState, useRef } from "react";
import { Layout, Menu, Breadcrumb, Drawer, Button, Select, Input } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import PostsHeader from "../components/PostsHeader.js"
import PostsContent from "../components/PostsContent.js"
const { SubMenu } = Menu;
const { Option } = Select;
const { TextArea } = Input;
const { Header, Content, Footer, Sider } = Layout;
import { getProducts } from "../api";
import moment from 'moment'
import postsJson from "../json/posts.json"
import { postNewArticle } from "../actions"
import { StoreContext } from "../store"
import { set } from 'js-cookie';



const Example = ({ data }) => <img className="imgTest" src={data} />


const PostCreatePostDrawer = () => {
  useEffect(() => {

    // const fetchData = async () => {
    //   console.log(2)
    //   const jsonProducts = await getProducts("/posts");

    //   if(jsonProducts){
    //     console.log('getStaticProps = ')
    //     console.log(jsonProducts)
    //   }
    // }
    // fetchData()



  }, []);
  const { state: { userSignin: {
    loading,
    userInfo,
    remember,
    error

  } }, dispatch } = useContext(StoreContext);
  const btnRef = useRef(null);
  const [visible, setVisible] = useState(false)
  const [imagedata, setImagedata] = useState('')
  //
  const [pauseLogin, setPauseLogin] = useState(false)
  const [taglist, setTaglist] = useState([])
  const [tagOnChange, setTagOnChange] = useState("")
  const [fileExist, setFileExist] = useState(false)
  const [posttext, setPosttext] = useState("")
  //
  const [postRN, setPostRN] = useState("")
  //
  const [postArea, setPostArea] = useState("北部")
  //
  const [postCity, setPostCity] = useState("台北")
  const [selectedArea, setSelectedArea] = useState("北部")
  //

  // console.log(postsJson)
  const inputChange = (e) => {
    console.log("ss")
    handleFileSelect(e)
    //image
  }
  const onRNChange = e => {
    console.log('Change:', e.target.value);
    setPostRN(e.target.value)
    console.log(postRN)
  };
  const onTextChange = e => {
    console.log('Change:', e.target.value);
    setPosttext(e.target.value)
  };
  const onTagchange = e => {
    console.log('Change:', e.target.value);
    var tag = e.target.value
    setTagOnChange(tag)

  };
  function addtag() {
    console.log(tagOnChange)
    const tagExist = taglist.find((x) => x === tagOnChange);
    if (tagExist) {
      console.log("已經有了")
      alert("標籤已經存在")
    } 
    else if (tagOnChange.length>10){
      console.log("好長")
      alert("標籤不能超過10個字")
    }else if (taglist.length>5){
      
      alert("標籤不能超過6個")
    }
    else if (tagOnChange) {
      setTaglist([...taglist, tagOnChange])
      setTagOnChange(null)
    }
    else {
      console.log("蝦")
    }
  }
  const removeTag = tag => {
    // e.target.getAttribute("name")
    // console.log('Change:', e.target.name);
    // const btnvalue = btnRef.current.name; 
    // var tagindex = taglist.indexOf(tag);
    // console.log(taglist)
    // taglist.splice(tagindex, 1)

    setTaglist(taglist.filter(item => item !== tag));

    // setTaglist(taglist)
    console.log("a")
  };




  function handleAreaChange(value) {
    console.log(`selected ${value}`);
    setPostCity(null)
    setPostArea(value)
    setSelectedArea(value)
  }
  function handleCityChange(value) {
    console.log(`selected ${value}`);
    setPostCity(value)
  }

  function handleFileSelect(evt) {
    var file = evt.target.files[0];
    var reader = new FileReader();
    var AllowImgFileSize = 2100000;
    // console.log(file.name)
    if (file) {
      setFileExist(true)
      var files = file.name.split('.')
      var name = files[files.length - 1]
      var type = ['gif', 'png', 'jpg', 'svg', 'jpeg']
      console.log("upload")

      //判断图片格式
      if (type.indexOf(name) === -1) {
        message.info(`不支持.${name}格式`)
        return
      }
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
           console.log(reader.result)
          setImagedata(reader.result)
        }
      }
    }
  }
  function drawerOpen() {
    if (userInfo) {
      setVisible(true)
    } else {
      alert("請先登入或註冊")
    }
  }
  function Postsubmit() {

    if (userInfo&&postArea.length&&postCity.length&&imagedata.length>0&&postRN.length>0) {
      let time = moment().format('YYYY-MM-DD HH:mm:ss')
      let postInfo = {
        "user": userInfo.displayName,
        "uid": userInfo.uid,
        "date": time,
        "area": postArea,
        "city": postCity,
        "image": imagedata,
        "restaurant": postRN,
        "text": posttext,
        "tags": taglist,
        "comments": []
      }


      setVisible(false)
      console.log(userInfo)
      postNewArticle(dispatch, postInfo)
      setTaglist([])
      setImagedata("")

    } else {
      console.log("no way")
      alert("請上傳一張照片、選擇地區及城市及填寫店名才能發佈新貼文!")
    }
  }


  return (


    <Drawer
      className="post-drawer"
      placement="right"
      closable={false}
      onClose={() => { setVisible(false) }}
      visible={visible}
      getContainer={false}
      style={{ position: 'fixed', zIndex: 90 }}
    >
      <div className="cp-drawer-rwd rwd-open-drawer-btn" onClick={drawerOpen}>
      <img src="/images/new-post.png" ></img>
      </div>
      {/* <div className="create-post-drawer-cont1"> */}
      {visible?(null):( <div className="create-post-drawer-open-btn" onClick={drawerOpen}>
      <img src="/images/new-post.png" ></img>
      </div>
        )}
     


      {visible ? (
        <div className="create-post-drawer-elm-cont">
          <div className="post-imgUploader-cont all-h">
            <div className="imgUploader-window">
              {fileExist ? (<Example data={imagedata} />) : (null)}
            </div>
            <div className="imgUploader-file">
              <input onChange={inputChange} className="imgUploader-file2" type="file" accept="image/*" capture="camera" id="64input"></input>
              <div className="imgUploader-file-text">選擇圖片</div>
            </div>
            {/* ----------------------------------------RWD--------------------------- */}
<div className="cp-drawer-rwd">

            <div className="area-and-city-cont">
              <div className="area-selector">
                <Select defaultValue="北部" style={{ fontSize: 22 }} onChange={handleAreaChange}>
                  <Option style={{ fontSize: 22, marginBottom: 5 }} value="北部">北部</Option>
                  <Option style={{ fontSize: 22, marginBottom: 5 }} value="中部">中部</Option>
                  <Option style={{ fontSize: 22, marginBottom: 5 }} value="南部" > 南部</Option>
                  <Option style={{ fontSize: 22, marginBottom: 5 }} value="東部">東部</Option>
                </Select>
              </div>
              <div className="city-selector">
                <Select defaultValue="城市" style={{ fontSize: 22 }} onChange={handleCityChange}>
                  {selectedArea === "北部" ?
                    (<><Option style={{ fontSize: 22, marginBottom: 5 }} value="基隆">基隆</Option>
                      <Option style={{ fontSize: 22, marginBottom: 5 }} value="台北">台北</Option>
                      <Option style={{ fontSize: 22, marginBottom: 5 }} value="新北">新北</Option>
                      <Option style={{ fontSize: 22, marginBottom: 5 }} value="桃園">桃園</Option>
                      <Option style={{ fontSize: 22, marginBottom: 5 }} value="新竹">新竹</Option>
                    </>) :
                    selectedArea === "中部" ?
                      (<><Option style={{ fontSize: 22, marginBottom: 5 }} value="苗栗">苗栗</Option>
                        <Option style={{ fontSize: 22, marginBottom: 5 }} value="台中">台中</Option>
                        <Option style={{ fontSize: 22, marginBottom: 5 }} value="彰化">彰化</Option>
                        <Option style={{ fontSize: 22, marginBottom: 5 }} value="南投">南投</Option>
                        <Option style={{ fontSize: 22, marginBottom: 5 }} value="雲林">雲林</Option>
                      </>) :
                      selectedArea === "南部" ?
                        (<> <Option style={{ fontSize: 22, marginBottom: 5 }} value="嘉義">嘉義</Option>
                          <Option style={{ fontSize: 22, marginBottom: 5 }} value="台南">台南</Option>
                          <Option style={{ fontSize: 22, marginBottom: 5 }} value="高雄">高雄</Option>
                          <Option style={{ fontSize: 22, marginBottom: 5 }} value="屏東">屏東</Option>
                        </>) :
                        selectedArea === "東部" ?
                          (<><Option style={{ fontSize: 22, marginBottom: 5 }} value="台東">台東</Option>
                            <Option style={{ fontSize: 22, marginBottom: 5 }} value="花蓮">花蓮</Option>
                            <Option style={{ fontSize: 22, marginBottom: 5 }} value="宜蘭">宜蘭</Option>
                          </>) : (null)
                  }





                </Select>
              </div>
            </div>
            <div className="c-post-restaurant-name ">
              <Input placeholder="輸入拉麵店" onChange={onRNChange} />
            </div>
            <div className="post-text-input">

              <TextArea  placeholder="輸入文字" onChange={onTextChange} />

            </div>
          
          <div className="addTag ">
              <div className="taginput">
                <Input placeholder="標籤" onChange={onTagchange} value={tagOnChange} />
                <div className="addTag-btn" onClick={addtag}>+</div>
              </div>
              <div className="addTag-tags">
                {
                  taglist.map(tag => (
                    <div key={tag} className="addTag-eachtag">
                      <div ref={btnRef} className="tag-remove-btn" name={tag} onClick={() => {
                        removeTag(tag);
                      }}>X</div>
                      <div className="addtag-tag-text">{tag}</div>

                    </div>
                  ))
                }
              </div>
              
            </div>
<div className="cancel-and-submit-cont">
  <div className="cp-cancel-submit-btn" onClick={() => { setVisible(false) }}>取消</div>
  <div className="cp-cancel-submit-btn" onClick={Postsubmit}>發佈</div>
</div>



            </div>   
          </div>
          <div className="post-infoUploader-cont all-h">
            <div className="area-and-city-cont">
              <div className="area-selector">
                <Select defaultValue="北部" style={{ fontSize: 22 }} onChange={handleAreaChange}>
                  <Option style={{ fontSize: 22, marginBottom: 5 }} value="北部">北部</Option>
                  <Option style={{ fontSize: 22, marginBottom: 5 }} value="中部">中部</Option>
                  <Option style={{ fontSize: 22, marginBottom: 5 }} value="南部" > 南部</Option>
                  <Option style={{ fontSize: 22, marginBottom: 5 }} value="東部">東部</Option>
                </Select>
              </div>
              <div className="city-selector">
                <Select defaultValue="城市" style={{ fontSize: 22 }} onChange={handleCityChange}>
                  {selectedArea === "北部" ?
                    (<><Option style={{ fontSize: 22, marginBottom: 5 }} value="基隆">基隆</Option>
                      <Option style={{ fontSize: 22, marginBottom: 5 }} value="台北">台北</Option>
                      <Option style={{ fontSize: 22, marginBottom: 5 }} value="新北">新北</Option>
                      <Option style={{ fontSize: 22, marginBottom: 5 }} value="桃園">桃園</Option>
                      <Option style={{ fontSize: 22, marginBottom: 5 }} value="新竹">新竹</Option>
                    </>) :
                    selectedArea === "中部" ?
                      (<><Option style={{ fontSize: 22, marginBottom: 5 }} value="苗栗">苗栗</Option>
                        <Option style={{ fontSize: 22, marginBottom: 5 }} value="台中">台中</Option>
                        <Option style={{ fontSize: 22, marginBottom: 5 }} value="彰化">彰化</Option>
                        <Option style={{ fontSize: 22, marginBottom: 5 }} value="南投">南投</Option>
                        <Option style={{ fontSize: 22, marginBottom: 5 }} value="雲林">雲林</Option>
                      </>) :
                      selectedArea === "南部" ?
                        (<> <Option style={{ fontSize: 22, marginBottom: 5 }} value="嘉義">嘉義</Option>
                          <Option style={{ fontSize: 22, marginBottom: 5 }} value="台南">台南</Option>
                          <Option style={{ fontSize: 22, marginBottom: 5 }} value="高雄">高雄</Option>
                          <Option style={{ fontSize: 22, marginBottom: 5 }} value="屏東">屏東</Option>
                        </>) :
                        selectedArea === "東部" ?
                          (<><Option style={{ fontSize: 22, marginBottom: 5 }} value="台東">台東</Option>
                            <Option style={{ fontSize: 22, marginBottom: 5 }} value="花蓮">花蓮</Option>
                            <Option style={{ fontSize: 22, marginBottom: 5 }} value="宜蘭">宜蘭</Option>
                          </>) : (null)
                  }





                </Select>
              </div>
            </div>
            <div className="c-post-restaurant-name">
              <Input placeholder="輸入拉麵店" onChange={onRNChange} />
            </div>
            <div className="post-text-input">

              <TextArea placeholder="輸入文字" onChange={onTextChange} />

            </div>
          </div>
          <div className="posts-submit-btn-cont all-h">
            <div className="addTag">
              <div className="taginput">
                <Input placeholder="標籤" onChange={onTagchange} value={tagOnChange} />
                <div className="addTag-btn" onClick={addtag}>+</div>
              </div>
              <div className="addTag-tags">
                {
                  taglist.map(tag => (
                    <div key={tag} className="addTag-eachtag">
                      <div ref={btnRef} className="tag-remove-btn" name={tag} onClick={() => {
                        removeTag(tag);
                      }}>X</div>
                      <div className="addtag-tag-text">{tag}</div>

                    </div>
                  ))
                }
              </div>
            </div>
            <div className="posts-submit-btn" onClick={Postsubmit}>發佈</div>
          </div>
        </div>
      ) : (null)}
    </Drawer>


  )
}




export default PostCreatePostDrawer
