import { useContext } from "react";
import { useRouter } from 'next/router'
import { Row, Col, Spin } from "antd";
import { StoreContext } from "../store";
import PostAreaList from "/components/PostAreaList"
import HomeNav from "/components/HomeNav"
import PostsEachCity from "./PostsEachCity"
import { areaClicked,getAllPostAct } from "../actions"
export default function PostsEachArea(props) {
  const { state: { area: {
    northClick,
    westClick,
    eastClick,
    southClick
  } }, dispatch } = useContext(StoreContext);
  const router = useRouter()
  const { eachArea } = props
  //   const onClickHeader = () => {
  //     setPage(dispatch, "/",  "NORDIC NEST Shopping Cart");
  //     router.push("/");
  //   };
  const areaOnClick = () => {
    console.log(eachArea)
    areaClicked(dispatch, eachArea)
    getAllPostAct(dispatch)
  };
  const cityOnClick = () => {


  }
  return (
    <div className="post-each-area">
      <img
        // style={{ width: '100%' }}
        src="/images/hover-img.png"
        className={northClick && eachArea.area == "北部" || westClick && eachArea.area == "中部" || southClick && eachArea.area == "南部" || eastClick && eachArea.area == "東部" ?
          "area-slected-img area-slected-img-off" : "area-slected-img area-slected-img-on"
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
          )}
      </div>
    </div>
  );
}