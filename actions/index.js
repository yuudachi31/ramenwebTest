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

import {
  getProducts,
  getProductById,
  feedProducts,
  signInWithEmailPassword,
  registerWithEmailPassword,
  signOut,
  updateUserInfoApi,
  createOrderApi,
  getOrderById,
  checkLoginApi,
  feedknowledge,
  getAllPosts,
  getKnowledgeContent,
  createUserBookMarkers,
  getPostsByMapInfo,
  createNewPost,
  removePost,
  getMyPostsByUserId,
  getCollectionPostsByUserId,
  getCommentsLength,
  addComment,
  countNum,
  addToBookmark,
  getBookmarkerArray
  
} from "../api";
import moment from "moment";

export const addCartItem = (dispatch, product, qty) => {
  const item = {
    id: product.id,
    category: product.category,
    name: product.name,
    image: product.image,
    price: product.price,
    countInStock: product.countInStock,
    qty,
  };
  dispatch({
    type: ADD_CART_ITEM,
    payload: item,
  });
};

export const removeCartItem = (dispatch, productId) => {
  dispatch({
    type: REMOVE_CART_ITEM,
    payload: productId,
  });
};

export const saveShippingAddress = (dispatch, shippingAddress) => {
  dispatch({
    type: SAVE_SHIPPING_ADDRESS,
    payload: shippingAddress,
  });
  localStorage.setItem('shippingAddress', JSON.stringify(shippingAddress));
}

export const savePaymentMethod = (dispatch, paymentMethod) => {
  dispatch({
    type: SAVE_PAYMENT_METHOD,
    payload: paymentMethod.paymentMethod,
  });
}

export const feedJSONToFirebase = async (dispatch) => {
  dispatch({ type: BEGIN_PRODUCTS_FEED });
  try {
    await feedProducts();
    dispatch({ type: SUCCESS_PRODUCTS_FEED });
  } catch (error) {
    console.log(error);
    dispatch({ type: FAIL_PRODUCTS_FEED, payload: error });
  }
}

export const setProductDetail = async (dispatch, productId, qty) => {
  dispatch({ type: BEGIN_PRODUCTS_REQUEST });
  try {
    const product = await getProductById(productId);
    if (qty === 0)
      dispatch({
        type: SET_PRODUCT_DETAIL,
        payload: {
          product,
        }
      })
    else
      dispatch({
        type: SET_PRODUCT_DETAIL,
        payload: {
          product,
          qty,
        }
      })
    dispatch({ type: SUCCESS_PRODUCTS_REQUEST });
  } catch (error) {
    console.log(error);
    dispatch({ type: FAIL_PRODUCTS_REQUEST, payload: error });
  }
}

export const setPreRenderPage = (dispatch, title, products) => {
  dispatch({
    type: SET_PAGE_CONTENT,
    payload: { title, products },
  });
}

export const setPage = async (dispatch, url, title) => {
  let products = [];
  dispatch({ type: BEGIN_PRODUCTS_REQUEST });
  dispatch({
    type: SET_PAGE_TITLE,
    payload: title,
  });
  try {
    products = await getProducts(url);
    dispatch({
      type: SET_PAGE_CONTENT,
      payload: { title, products },
    });
    dispatch({
      type: SET_NAVBAR_ACTIVEITEM,
      payload: url,
    });
    dispatch({ type: SUCCESS_PRODUCTS_REQUEST });
  } catch (error) {
    console.log(error);
    dispatch({ type: FAIL_PRODUCTS_REQUEST, payload: error });
  }
}
//use
export const loginToFirebase = async (dispatch, userInfo) => {
  dispatch({ type: BEGIN_LOGIN_REQUEST });
  try {
    const user = await signInWithEmailPassword(userInfo.email, userInfo.password);
    let userinfo={
      ...user.user.providerData[0],
      uid:user.user.uid
    }
    dispatch({
      type: SUCCESS_LOGIN_REQUEST,
      payload: userinfo,
    })
    console.log(userinfo)
    return user;
  } catch (e) {
    dispatch({
      type: FAIL_LOGIN_REQUEST,
      payload: e.message
    })
    console.log(e)
    return null;
  }
}
//use
export const rememberLoginUser = (dispatch, remember) => {
  dispatch({
    type: REMEMBER_LOGIN,
    payload: remember,
  })
}
// use
export const registerToFirebase = async (dispatch, userInfo) => {
  dispatch({ type: BEGIN_REGISTER_REQUEST });
  try {
    const user = await registerWithEmailPassword(userInfo.email, userInfo.password, userInfo.name);
    let userinfo={
      ...user.providerData[0],
      uid:user.uid
    }
    dispatch({
      type: SUCCESS_REGISTER_REQUEST,
      payload: userinfo,
    })
    return user;
  } catch (e) {
    dispatch({
      type: FAIL_REGISTER_REQUEST,
      payload: e.message
    })
    console.log(e)
    return null;
  }
}

export const updateUserInfo = async (dispatch, userInfo) => {
  dispatch({ type: BEGIN_UPDATE_USERINFO });
  try {
    const user = await updateUserInfoApi(
      userInfo.email,
      userInfo.password,
      userInfo.name
    );
    let userinfo={
      ...user.providerData[0],
      uid:user.uid
    }
    dispatch({
      type: SUCCESS_UPDATE_USERINFO,
      payload: userinfo,
    });
  } catch (e) {
    dispatch({
      type: FAIL_UPDATE_USERINFO,
      payload: e.message,
    });
    console.log(e);
  }
};
// use
export const logoutFromFirebase = async (dispatch) => {
  signOut();
  dispatch({ type: LOGOUT_REQUEST });
}

export const createOrder = async (dispatch, cart) => {
  dispatch({ type: BEGIN_ORDER_CREATE });
  try {
    const item = {
      orderItems: cart.cartItems,
      shippingAddress: cart.shippingAddress,
      paymentMethod: cart.paymentMethod,
      itemsPrice: cart.itemsPrice,
      shippingPrice: cart.shippingPrice,
      taxPrice: cart.taxPrice,
      totalPrice: cart.totalPrice,
    };
    const orderInfo = await createOrderApi(item);
    dispatch({
      type: SUCCESS_ORDER_CREATE,
      payload: orderInfo
    });
    dispatch({ type: EMPTY_CART, })
    localStorage.setItem('orderInfo', JSON.stringify(orderInfo));
    localStorage.removeItem("cartItems");
    return orderInfo;
  } catch (error) {
    console.log(error);
    dispatch({ type: FAIL_ORDER_CREATE, payload: error });
    return null;
  }
};

export const requestOrderDetail = async (dispatch, orderId) => {
  await dispatch({ type: BEGIN_ORDER_DETAIL });
  try {
    const order = await getOrderById(orderId);
    if (order)
      dispatch({
        type: SUCCESS_ORDER_DETAIL,
        payload: order
      });
    return order;
  } catch (error) {
    dispatch({
      type: FAIL_ORDER_DETAIL,
      payload: error
    });
    return 'error'
  }
}

export const resetOrder = (dispatch) => {
  dispatch({ type: RESET_ORDER });
}
//use
export const checkLogin = (dispatch) => {
  const isLogin = checkLoginApi();
  if (!isLogin) {
    localStorage.removeItem('orderInfo')
    dispatch({ type: LOGOUT_REQUEST });
  }
  return isLogin;
}

export const areaClicked = (dispatch, eachArea) => {

  dispatch({
    type: AREACLICKED,
    payload: eachArea
  });
}
export const cityClicked = (dispatch, eachcity, eachArea) => {
  // console.log(858585)
  const cityInfo = {
    city: eachcity,
    area: eachArea
  }
  dispatch({
    type: CITYCLICKED,
    payload: cityInfo
  });
}

export const feedKnowledgeJSONToFirebase = async (dispatch) => {
  dispatch({ type: BEGIN_PRODUCTS_FEED });
  try {
    await feedknowledge();
    dispatch({ type: SUCCESS_PRODUCTS_FEED });
  } catch (error) {
    console.log(error);
    dispatch({ type: FAIL_PRODUCTS_FEED, payload: error });
  }
}

export const getAllPostAct = async(dispatch)=>{
  dispatch({type:BEGIN_POSTSPAGE_REQUEST})
  try{
    const posts =await getAllPosts();
  
    const sortedPosts = posts.sort((b,a)=>moment(a.date).diff(moment(b.date)))
    // console.log(sortedPosts)
    dispatch({type: SETPOSTLIST,payload:sortedPosts})
     console.log(sortedPosts)
    // return sortedPosts
    console.log("sssssssssssssssssssssssss")
  }catch(error){
    console.log(error);
  }
}

export const setKnowledgePage = async (dispatch, url) => {
  let knowledge;
  dispatch({ type: BEGIN_KNOWLEDGE_REQUEST });

  try {
    knowledge = await getKnowledgeContent(url);
    dispatch({
      type: SET_KNOWLEDGE_PAGE_CONTENT,
      payload: knowledge,
    });
    console.log(knowledge)
    dispatch({
      type: SET_KNOWLEDGE_NAVBAR_ACTIVEITEM,
      payload: url,
    });
    dispatch({ type: SUCCESS_KNOWLEDGE_REQUEST });
  } catch (error) {
    console.log(error);
    dispatch({ type: FAIL_KNOWLEDGE_REQUEST, payload: error });
  }
}

export const setMyPostsPage = async (dispatch) => {
  let posts;
  dispatch({ type: BEGIN_MY_POSTS_REQUEST });

  try {
    posts = await getMyPostsByUserId();
    console.log(posts)
    dispatch({
      type: SET_PROFILE_PAGE_CONTENT,
      payload: posts,
    });
    dispatch({
      type: SET_PROFILE_NAVBAR_ACTIVEITEM,
      payload: "/profile/myPosts",
    });
    dispatch({ type: SUCCESS_MY_POSTS_REQUEST });
  } catch (error) {
    console.log(error);
    dispatch({ type: FAIL_MY_POSTS_REQUEST, payload: error });
  }
}

export const setCollectionPostsPage = async (dispatch) => {
  let posts = [];
  dispatch({ type: BEGIN_COLLECTION_POSTS_REQUEST });

  try {
    posts = await getCollectionPostsByUserId();
    console.log(posts)
    dispatch({
      type: SET_PROFILE_PAGE_CONTENT,
      payload: posts,
    });
    dispatch({
      type: SET_PROFILE_NAVBAR_ACTIVEITEM,
      payload: "/profile/collectionPosts",
    });
    dispatch({ type: SUCCESS_COLLECTION_POSTS_REQUEST });
  } catch (error) {
    console.log(error);
    dispatch({ type: FAIL_COLLECTION_POSTS_REQUEST, payload: error });
  }
}

export const createBookMarker = async (dispatch) => {
  dispatch({ type: BEGIN_USER_BOOKMARKER_CREATE });
  try {
    const bookMarker = await createUserBookMarkers();
    console.log(bookMarker)
    dispatch({
      type: SUCCESS_USER_BOOKMARKER_CREATE,
      payload: bookMarker,
    })
    return bookMarker;
  } catch (e) {
    dispatch({
      type: FAIL_USER_BOOKMARKER_CREATE,
      payload: e.message
    })
    console.log(e)
    return null;
  }
}

export const setMapPosts = async (dispatch, id) => {
  dispatch({ type: BEGIN_MAP_POSTS_REQUEST });
  try {
    const posts = await getPostsByMapInfo(id);
    console.log(posts);
    dispatch({
      type: SUCCESS_MAP_POSTS_REQUEST,
      payload: posts
    })
  } catch (e) {
    dispatch({
      type: FAIL_MAP_POSTS_REQUEST,
      payload: e.message
    })
    console.log(e)
  }
}

export const postNewArticle = async(dispatch,userinfo)=>{

  console.log(userinfo)
  createNewPost(userinfo)
  const posts =await getAllPosts();
  
  const sortedPosts = posts.sort((b,a)=>moment(a.date).diff(moment(b.date)))
  // console.log(sortedPosts)
  dispatch({type: SETPOSTLIST,payload:sortedPosts})
  // dispatch({
  //   type: POST_NEW_ARTICLE,
  //   payload: newpost
  // })
}

export const removeMyPost = async (dispatch, postId) => {
  dispatch({ type: BEGIN_REMOVE_POST })
  try {
    const posts = await removePost(postId);
    const sortedPosts = posts.sort((b,a)=>moment(a.date).diff(moment(b.date)))

    dispatch({
      type: SETPOSTLIST,
      payload: sortedPosts
    })
    dispatch({
      type: SUCCESS_REMOVE_POST,
    })
  } catch (e) {
    dispatch({
      type: FAIL_REMOVE_POST,
      payload: e.message,
    })
    console.log(e)
  }
  let posts;
  dispatch({ type: BEGIN_MY_POSTS_REQUEST });

  try {
    posts = await getMyPostsByUserId();
    dispatch({
      type: SET_PROFILE_PAGE_CONTENT,
      payload: posts,
    });
    dispatch({
      type: SET_PROFILE_NAVBAR_ACTIVEITEM,
      payload: "/profile/myPosts",
    });
    dispatch({ type: SUCCESS_MY_POSTS_REQUEST });
  } catch (error) {
    console.log(error);
    dispatch({ type: FAIL_MY_POSTS_REQUEST, payload: error });
  }
}

export const sendCommentAct=async(dispatch,username,postId,value)=>{
  try {
  let length = await getCommentsLength(postId)
  let comment={
    key:length,
    name:username,
    content:value
  }

  console.log("Hello8888")
   await addComment(postId,comment)
 
   console.log("Hello9999")
  
  getAllPostWhenComment(dispatch)
}catch (error) {
  console.log(error);
  
}
  
}

export const addToBookmarkAct=async(dispatch,postId)=>{
await addToBookmark(postId)
return true
}

export const getBookmarkerArrayAct=async(dispatch)=>{
  let bookerarray=await getBookmarkerArray()
  console.log(bookerarray)
  dispatch({
    type:GET_BOOKMARKERS_ARRAY,payload:bookerarray
  })
}

export const getAllPostWhenComment = async(dispatch)=>{
 
  try{
    const posts =await getAllPosts();
  
    const sortedPosts = posts.sort((b,a)=>moment(a.date).diff(moment(b.date)))
    // console.log(sortedPosts)
    dispatch({type: SETPOSTLIST,payload:sortedPosts})
     console.log(sortedPosts)
    // return sortedPosts
    console.log("sssssssssssssssssssssssss")
  }catch(error){
    console.log(error);
  }
}
