import { useContext } from "react";
import { useRouter } from 'next/router'
import { Row, Col, Spin } from "antd";
import { StoreContext } from "../store";
import PostAreaList from "/components/PostAreaList"
import HomeNav from "/components/HomeNav"
import { cityClicked,getAllPostAct } from "../actions"
export default function PostsEachCity(props) {
  const { state: { area: {
    northClick,
    westClick,
    eastClick,
    southClick,
    cityClick
  } }, dispatch } = useContext(StoreContext);
  const router = useRouter()
  const { city, area } = props
  //   const onClickHeader = () => {
  //     setPage(dispatch, "/",  "NORDIC NEST Shopping Cart");
  //     router.push("/");
  //   };
  const cityOnClick = () => {

    cityClicked(dispatch, city, area)
    getAllPostAct(dispatch)
  };
  // console.log(city+"在"+area)


  if (area == "北部") {
    return (
      northClick ? (<div className="each-city-cont"><div className={cityClick === city ? "post-each-city-active post-each-city" : "post-each-city"} onClick={cityOnClick} >{city}
      </div>{cityClick === city ? (<div className="city-line-cont"><div className="city-line"></div></div>) : (<div className="city-line-cont"><div className="city-line city-line-off"></div><div className="city-line city-line-off"></div></div>)}</div>) : (<div className="dsp-n"></div>)
    );
  } else if (area == "中部") {
    return (
      westClick ? (<div className="each-city-cont"><div className={cityClick === city ? "post-each-city-active post-each-city" : "post-each-city"} onClick={cityOnClick} >{city}
      </div>{cityClick === city ? (<div className="city-line-cont"><div className="city-line"></div></div>) : (<div className="city-line-cont"><div className="city-line city-line-off"></div><div className="city-line city-line-off"></div></div>)}</div>) : (<div className="dsp-n"></div>)
    );
  } else if (area == "南部") {
    return (
      southClick ? (<div className="each-city-cont"><div className={cityClick === city ? "post-each-city-active post-each-city" : "post-each-city"} onClick={cityOnClick} >{city}
      </div>{cityClick === city ? (<div className="city-line-cont"><div className="city-line"></div></div>) : (<div className="city-line-cont"><div className="city-line city-line-off"></div><div className="city-line city-line-off"></div></div>)}</div>) : (<div className="dsp-n"></div>)
    );
  } else if (area == "東部") {
    return (
      eastClick ? (<div className="each-city-cont"><div className={cityClick === city ? "post-each-city-active post-each-city" : "post-each-city"} onClick={cityOnClick} >{city}
      </div>{cityClick === city ? (<div className="city-line-cont"><div className="city-line"></div></div>) : (<div className="city-line-cont"><div className="city-line city-line-off"></div><div className="city-line city-line-off"></div></div>)}</div>) : (<div className="dsp-n"></div>)
    );
  } else {
    return (<div className="post-each-city">a</div>)
  }



}