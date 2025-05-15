import { createContext, useReducer } from "react";
// import useReducerWithThunk from "use-reducer-thunk";
import {
  SET_PAGE_TITLE,
  SET_PAGE_CONTENT,
  SET_NAVBAR_ACTIVEITEM,
  ADD_CART_ITEM,
  REMOVE_CART_ITEM,
  EMPTY_CART,
  SAVE_SHIPPING_ADDRESS,
  SAVE_PAYMENT_METHOD,
  SET_PRODUCT_DETAIL,
  BEGIN_PRODUCTS_FEED,
  SUCCESS_PRODUCTS_FEED,
  FAIL_PRODUCTS_FEED,
  BEGIN_PRODUCTS_REQUEST,
  SUCCESS_PRODUCTS_REQUEST,
  FAIL_PRODUCTS_REQUEST,
  BEGIN_LOGIN_REQUEST,
  SUCCESS_LOGIN_REQUEST,
  FAIL_LOGIN_REQUEST,
  LOGOUT_REQUEST,
  REMEMBER_LOGIN,
  BEGIN_REGISTER_REQUEST,
  SUCCESS_REGISTER_REQUEST,
  FAIL_REGISTER_REQUEST,
  BEGIN_UPDATE_USERINFO,
  SUCCESS_UPDATE_USERINFO,
  FAIL_UPDATE_USERINFO,
  BEGIN_ORDER_CREATE,
  SUCCESS_ORDER_CREATE,
  FAIL_ORDER_CREATE,
  RESET_ORDER,
  BEGIN_ORDER_DETAIL,
  SUCCESS_ORDER_DETAIL,
  FAIL_ORDER_DETAIL,
  AREACLICKED,
  CITYCLICKED,
  SETPOSTLIST,
  SET_KNOWLEDGE_PAGE_CONTENT,
  SET_KNOWLEDGE_NAVBAR_ACTIVEITEM,
  BEGIN_KNOWLEDGE_REQUEST,
  SUCCESS_KNOWLEDGE_REQUEST,
  FAIL_KNOWLEDGE_REQUEST,
  SET_PROFILE_PAGE_CONTENT,
  SET_PROFILE_NAVBAR_ACTIVEITEM,
  BEGIN_MY_POSTS_REQUEST,
  SUCCESS_MY_POSTS_REQUEST,
  FAIL_MY_POSTS_REQUEST,
  BEGIN_COLLECTION_POSTS_REQUEST,
  SUCCESS_COLLECTION_POSTS_REQUEST,
  FAIL_COLLECTION_POSTS_REQUEST,
  BEGIN_USER_BOOKMARKER_CREATE,
  SUCCESS_USER_BOOKMARKER_CREATE,
  FAIL_USER_BOOKMARKER_CREATE,
  POST_NEW_ARTICLE,
  REMOVE_POST,
  BEGIN_REMOVE_POST,
  SUCCESS_REMOVE_POST,
  FAIL_REMOVE_POST,
  BEGIN_MAP_POSTS_REQUEST,
  SUCCESS_MAP_POSTS_REQUEST,
  FAIL_MAP_POSTS_REQUEST,
  GET_BOOKMARKERS_ARRAY,
  BEGIN_POSTSPAGE_REQUEST
} from "../utils/constants";

export const StoreContext = createContext();
let cartItems;
try {
  cartItems = JSON.parse(localStorage.getItem("cartItems"));
  if (!cartItems) cartItems = [];
} catch (e) {
  cartItems = [];
}

let shippingAddress;
try {
  shippingAddress = JSON.parse(localStorage.getItem('shippingAddress'));
} catch (e) {
  shippingAddress = {};
}

let userInfo;
try {
  userInfo = JSON.parse(localStorage.getItem("userInfo"));
} catch (e) {
  userInfo = null;
}

let orderInfo_order;
try {
  orderInfo_order = JSON.parse(localStorage.getItem('orderInfo'));
} catch (e) {
  orderInfo_order = { id: "" };
}

const initialState = {
  allProducts: [],
  page: {
    title: "",
    products: [],
  },
  productDetail: {
    product: {},
    qty: 1,
  },
  navBar: {
    activeItem: "/",
  },
  cart: {
    cartItems,
    shippingAddress,
    paymentMethod: 'Google',
  },
  orderInfo: {
    loading: false,
    order: orderInfo_order,
    success: false,
    error: null,
  },
  orderDetail: {
    loading: true,
    order: { cartItems: [] },
    error: null,
  },
  feedProducts: {
    loading: false,
    error: null,
  },
  requestProducts: {
    loading: false,
    error: null,
  },
  // use
  userSignin: {
    loading: false,
    userInfo,
    remember: true,
    error: "",
  },
  userRegister: {
    loading: false,
    userInfo: null,
    error: "",
  },
  userBookMarker: {
    loading: false,
    bokMarkerInfo: [],
    error: "",
  },
  area:{
    northClick:false,
    westClick:false,
    eastClick:false,
    southClick:false,
    cityClick:"null"
  },
  requestPostsPage:{
    loading:false
  },
  postsListState:[
  //   {
  //   key:"1",
  //   date:"2020-08-08 17:00:17",
  //   area:"北部",
  //   city:"台北",
  //   id:"1",
  //   image:"",
  //   restaurant:"",
  //   text:"",
  //   tags:[""],
  //   comments:[{
  //     name:"",
  //     content:""
  //   },
  // ]
  // },
  // {
  //   key:"1",
  //   date:"2020-08-08 17:00:17",
  //   area:"北部",
  //   city:"台北",
  //   id:"2",
  //   image:"",
  //   restaurant:"",
  //   text:"",
  //   tags:[""],
  //   comments:[{
  //     name:"",
  //     content:""
  //   },
  // ]
  // }
  ],
  bookMarkerArray:[],
  //knowledge page
  knowledgePage: {
    article: { recommend: [], image: [] },
  },
  knowledgeNavBar: {
    activeItem: "/knowledge/iekei",
  },
  requestKnowledge: {
    loading: false,
    error: null,
  },
  //profile page
  profilePage: {
    posts: [],
  },
  profileNavBar: {
    activeItem: "profile/myPosts",
  },
  requestMyPosts: {
    loading: false,
    error: null,
  },
  requestCollectionPosts: {
    loading: false,
    error: null,
  },
  //map page
  requestMapPosts: {
    loading: false,
    allMapPosts: [],
    error: null,
  },
  requestRemovePosts: {
    loading: false,
    error: null,
  }
};

function reducer(state, action) {
  switch (action.type) {
    case SET_PAGE_TITLE:
      return {
        ...state,
        page: {
          ...state.page,
          title: action.payload,
        },
      };
    case SET_PAGE_CONTENT:
      return {
        ...state,
        page: {
          ...state.page,
          ...action.payload,
        },
      };
    case SET_NAVBAR_ACTIVEITEM:
      return {
        ...state,
        navBar: {
          activeItem: action.payload,
        },
      };
    case ADD_CART_ITEM:
      const item = action.payload;
      const product = state.cart.cartItems.find((x) => x.id === item.id);
      if (product) {
        cartItems = state.cart.cartItems.map((x) =>
          x.id === product.id ? item : x
        );
        return { ...state, cart: { ...state.cart, cartItems } };
      }
      cartItems = [...state.cart.cartItems, item];
      return { ...state, cart: { ...state.cart, cartItems } };
    case REMOVE_CART_ITEM:
      cartItems = state.cart.cartItems.filter((x) => x.id !== action.payload);
      return { ...state, cart: { ...state.cart, cartItems } };
    case EMPTY_CART:
      cartItems = [];
      return { ...state, cart: { ...state.cart, cartItems } };
    case SAVE_SHIPPING_ADDRESS:
      console.log('action.payload.shippingAddress = ')
      console.log(action.payload)
      return { ...state, cart: { ...state.cart, shippingAddress: action.payload } };
    case SAVE_PAYMENT_METHOD:
      return { ...state, cart: { ...state.cart, paymentMethod: action.payload } };
    case SET_PRODUCT_DETAIL:
      return {
        ...state,
        productDetail: { ...state.productDetail, ...action.payload },
      };
    case BEGIN_PRODUCTS_REQUEST:
      return {
        ...state,
        requestProducts: { ...state.requestProducts, loading: true },
      };
    case SUCCESS_PRODUCTS_REQUEST:
      return {
        ...state,
        requestProducts: { ...state.requestProducts, loading: false },
      };
    case FAIL_PRODUCTS_REQUEST:
      return {
        ...state,
        requestProducts: {
          ...state.requestProducts,
          loading: false,
          error: action.payload,
        },
      };
    case BEGIN_PRODUCTS_FEED:
      return {
        ...state,
        feedProducts: { ...state.feedProducts, loading: true },
      };
    case SUCCESS_PRODUCTS_FEED:
      return {
        ...state,
        feedProducts: { ...state.feedProducts, loading: false },
      };
    case FAIL_PRODUCTS_FEED:
      return {
        ...state,
        feedProducts: {
          ...state.feedProducts,
          loading: false,
          error: action.payload,
        },
      };
    //use
    case BEGIN_LOGIN_REQUEST:
      return { ...state, userSignin: { ...state.userSignin, loading: true } };
    //use
    case SUCCESS_LOGIN_REQUEST:
      return {
        ...state,
        userSignin: {
          ...state.userSignin,
          loading: false,
          userInfo: action.payload,
          error: "",
        },
      };
    //use
    case FAIL_LOGIN_REQUEST:
      return {
        ...state,
        userSignin: {
          ...state.userSignin,
          loading: false,
          userInfo: null,
          error: action.payload,
        },
      };
    case BEGIN_UPDATE_USERINFO:
      return { ...state, userSignin: { ...state.userSignin, loading: true } };
    case SUCCESS_UPDATE_USERINFO:
      return {
        ...state,
        userSignin: {
          ...state.userSignin,
          loading: false,
          userInfo: action.payload,
          error: "",
        },
      };
    case FAIL_UPDATE_USERINFO:
      return {
        ...state,
        userSignin: {
          ...state.userSignin,
          loading: false,
          error: action.payload,
        },
      };
    //use
    case LOGOUT_REQUEST:
      cartItems = [];
      return {
        ...state,
        userSignin: {
          ...state.userSignin,
          userInfo: null,
        },
      };
    // use
    case REMEMBER_LOGIN:
      return {
        ...state,
        userSignin: {
          ...state.userSignin,
          remember: action.payload,
        },
      };
    case BEGIN_REGISTER_REQUEST:
      return {
        ...state,
        userRegister: { ...state.userRegister, loading: true },
      };
    case SUCCESS_REGISTER_REQUEST:
      return {
        ...state,
        userRegister: {
          ...state.userRegister,
          loading: false,
          userInfo: action.payload,
          error: "",
        },
        userSignin: {
          ...state.userSignin,
          userInfo: action.payload,
        },
      };
    case FAIL_REGISTER_REQUEST:
      return {
        ...state,
        userRegister: {
          ...state.userRegister,
          loading: false,
          userInfo: null,
          error: action.payload,
        },
      };
    case BEGIN_ORDER_CREATE:
      return {
        ...state,
        orderInfo: {
          ...state.orderInfo,
          loading: true,
          success: false,
        }
      };
    case SUCCESS_ORDER_CREATE:
      return {
        ...state,
        orderInfo: {
          ...state.orderInfo,
          loading: false,
          order: action.payload,
          success: true,
          error: null,
        },
      };
    case FAIL_ORDER_CREATE:
      return {
        ...state,
        orderInfo: {
          ...state.orderInfo,
          loading: false,
          order: { id: "" },
          success: false,
          error: action.payload,
        },
      };
    case RESET_ORDER:
      return {
        ...state,
        orderInfo: {
          ...state.orderInfo,
          loading: false,
          order: { id: "" },
          success: false,
        },
      };
    case BEGIN_ORDER_DETAIL:
      return {
        ...state,
        orderDetail: {
          ...state.orderDetail,
          loading: true,
        }
      };
    case SUCCESS_ORDER_DETAIL:
      return {
        ...state,
        orderDetail: {
          ...state.orderDetail,
          loading: false,
          order: action.payload,
        },
      };
    case FAIL_ORDER_DETAIL:
      return {
        ...state,
        orderDetail: {
          ...state.orderDetail,
          loading: false,
          error: action.payload,
        },
      };
      case AREACLICKED:
        let eacharea=action.payload
        if(eacharea.area=="北部"){
        // console.log(212121)
        return{
          ...state,
          area:{
            ...state.area,
            northClick:!state.area.northClick,
            westClick:false,
            southClick:false,
            eastClick:false,
            cityClick:"null"
          }
        }
   //  state.area.northClick=!state.area.northClick
    // console.log( state.area.northClick)
    }
      else if(eacharea.area=="中部"){
        return{
          ...state,
          area:{
            ...state.area,
            northClick:false,
            westClick:!state.area.westClick,
            southClick:false,
            eastClick:false,
            cityClick:"null"
          }
        // state.area.westClick=!state.area.westClick
        // console.log(303030)
      }
    }
      else if(eacharea.area=="南部"){
        return{
          ...state,
          area:{
            ...state.area,
            northClick:false,
            westClick:false,
            southClick:!state.area.southClick,
            eastClick:false,
            cityClick:"null"
          }
        // state.area.southClick=!state.arㄍa.southClick
      }
      }
      else if(eacharea.area=="東部"){
        return{
          ...state,
          area:{
            ...state.area,
            northClick:false,
            westClick:false,
            southClick:false,
            eastClick:!state.area.eastClick,
            cityClick:"null"
          }
          }
      //  state.area.eastClick=!state.area.eastClick
        console.log( state.area.eastClick)
      }
      case CITYCLICKED:
        let cityInfo=action.payload
        console.log(cityInfo)
        return{
          ...state,
          area:{
            ...state.area,
           
            cityClick:cityInfo.city
          }
        }
      case  SETPOSTLIST:
        let sortedPosts =action.payload
        //console.log(sortedPosts)
        // if(state.area.northClick){
        //   if(state.area.cityClick!="null"){
        //     sortedPosts=sortedPosts.filter(post=>post.citys===state.area.cityClick)
        //   }else{
        //  sortedPosts=sortedPosts.filter(post=>post.area==="北部")
        //   }
        // }else if(state.area.westClick){
        //   if(state.area.cityClick!="null"){
        //     sortedPosts=sortedPosts.filter(post=>post.citys===state.area.cityClick)
        //   }else{
        //   sortedPosts=sortedPosts.filter(post=>post.area==="中部")
        //   }
        // }else if(state.area.southClick){
        //   if(state.area.cityClick!="null"){
        //     sortedPosts=sortedPosts.filter(post=>post.citys===state.area.cityClick)
        //   }else{
        //   sortedPosts=sortedPosts.filter(post=>post.area==="南部")
        //   }
        // }else if(state.area.eastClick){
        //   if(state.area.cityClick!="null"){
        //     sortedPosts=sortedPosts.filter(post=>post.citys===state.area.cityClick)
        //   }else{
        //   sortedPosts=sortedPosts.filter(post=>post.area==="東部")
        //   }
        // }
        if(state.area.cityClick=="null"){
        if(state.area.northClick){
          sortedPosts=sortedPosts.filter(post=>post.area==="北部")
        }else if(state.area.westClick){
          sortedPosts=sortedPosts.filter(post=>post.area==="中部")
        }else if(state.area.southClick){
          sortedPosts=sortedPosts.filter(post=>post.area==="南部")
        }else if(state.area.eastClick){
          sortedPosts=sortedPosts.filter(post=>post.area==="東部")
        }
      }else{
        sortedPosts=sortedPosts.filter(post=>post.citys===state.area.cityClick)
      }
        return{
          ...state,
          postsListState:[
            ...sortedPosts
          ],
          requestPostsPage:{
            loading:false
          }
        }
      case BEGIN_POSTSPAGE_REQUEST:
        return{
          ...state,
          requestPostsPage:{
            loading:true
          }
        }
      //knowledge page
      case SET_KNOWLEDGE_PAGE_CONTENT:
        return {
          ...state,
          knowledgePage: {
            article: action.payload,
          }
        };
      case SET_KNOWLEDGE_NAVBAR_ACTIVEITEM:
        return {
          ...state,
          knowledgeNavBar: {
            activeItem: action.payload,
          },
        };
      case BEGIN_KNOWLEDGE_REQUEST:
        return {
          ...state,
          requestKnowledge: { ...state.requestKnowledge, loading: true },
        };
      case SUCCESS_KNOWLEDGE_REQUEST:
        return {
          ...state,
          requestKnowledge: { ...state.requestKnowledge, loading: false },
        };
      case FAIL_KNOWLEDGE_REQUEST:
        return {
          ...state,
          requestKnowledge: {
            ...state.requestKnowledge,
            loading: false,
            error: action.payload,
          },
        };
        // profile page
        case SET_PROFILE_PAGE_CONTENT:
          return {
            ...state,
            profilePage: {
              posts: action.payload,
            },
          };
        case SET_PROFILE_NAVBAR_ACTIVEITEM:
          return {
            ...state,
            profileNavBar: {
              activeItem: action.payload,
            },
          };
        case BEGIN_MY_POSTS_REQUEST:
          return {
            ...state,
            requestMyPosts: { ...state.requestMyPosts, loading: true },
          };
        case SUCCESS_MY_POSTS_REQUEST:
          return {
            ...state,
            requestMyPosts: { ...state.requestMyPosts, loading: false },
          };
        case FAIL_MY_POSTS_REQUEST:
          return {
            ...state,
            requestMyPosts: {
              ...state.requestMyPosts,
              loading: false,
              error: action.payload,
            },
          };
        case BEGIN_COLLECTION_POSTS_REQUEST:
          return {
            ...state,
            requestCollectionPosts: { ...state.requestCollectionPosts, loading: true },
          };
        case SUCCESS_COLLECTION_POSTS_REQUEST:
          return {
            ...state,
            requestCollectionPosts: { ...state.requestCollectionPosts, loading: false },
          };
        case FAIL_COLLECTION_POSTS_REQUEST:
          return {
            ...state,
            requestCollectionPosts: {
              ...state.requestCollectionPosts,
              loading: false,
              error: action.payload,
            },
          };
        case BEGIN_USER_BOOKMARKER_CREATE:
          return {
            ...state,
            userBookMarker: { ...state.userBookMarker, loading: true },
          };
        case SUCCESS_USER_BOOKMARKER_CREATE:
          return {
            ...state,
            userBookMarker: { 
              ...state.userBookMarker, 
              loading: false ,
              bokMarkerInfo: [],
            },
          };
        case FAIL_USER_BOOKMARKER_CREATE:
          return {
            ...state,
            userBookMarker: {
              ...state.userBookMarker,
              loading: false,
              bokMarkerInfo: null,
              error: action.payload,
            },
          };
        case BEGIN_MAP_POSTS_REQUEST:
          return {
            ...state,
            requestMapPosts: { ...state.requestMapPosts, loading: true, }
          }
        case SUCCESS_MAP_POSTS_REQUEST:
          return {
            ...state,
            requestMapPosts: {
              ...state.requestMapPosts,
              loading: false,
              allMapPosts: action.payload,
            }
          }
        case FAIL_MAP_POSTS_REQUEST:
          return {
            ...state,
            requestMapPosts: {
              ...state.requestMapPosts,
              loading: false,
              allMapPosts: [],
              error: action.payload,
            }
          }
        case BEGIN_REMOVE_POST:
          return {
            ...state,
            requestRemovePosts: { ...state.requestRemovePosts, loading: true, }
          }
        case SUCCESS_REMOVE_POST:
          return {
            ...state,
            requestRemovePosts: {
              ...state.requestRemovePosts,
              loading: false,
            }
          }
        case FAIL_REMOVE_POST:
          return {
            ...state,
            requestRemovePosts: {
              ...state.requestRemovePosts,
              loading: false,
              error: action.payload,
            }
          }
        case GET_BOOKMARKERS_ARRAY:
          console.log(action.payload)
          return{
            ...state,bookMarkerArray:[...action.payload]
          }
    default:
      return state;
  }
}

export function StoreProvider(props) {
  // const [state, dispatch] = useReducerWithThunk(
  //   reducer,
  //   initialState,
  //   "example"
  // );
  const [state, dispatch] = useReducer(reducer, initialState)
  const value = { state, dispatch };

  return (
    <StoreContext.Provider value={value}>
      {props.children}
    </StoreContext.Provider>
  );
}
