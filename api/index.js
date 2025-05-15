import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import jsonInfo from "../json/jsonInfo.json";
import products from "../json/products.json";
import postsJson from "../json/posts.json"
import knowledgeJson from "../json/knowledge.json";
import ramenPosition from "../json/ramenPosition.json"
import set from "date-fns/set";

// INITIALIZE FIREBASE
// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APPID,
//   // measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENTID
// };
const firebaseConfig = {
  apiKey: "AIzaSyDNoNyZswwkU7q1cHRfqJ5AvXT3pdRabu4",
  authDomain: "react-final-e8ba5.firebaseapp.com",
  databaseURL:"https://react-final-e8ba5-default-rtdb.firebaseio.com",
  projectId: "react-final-e8ba5",
  storageBucket: "react-final-e8ba5.firebasestorage.app",
  messagingSenderId:  "988355603528", 
  appId: "1:988355603528:web:d7d10972c12d4d962f7c7d"
  // measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENTID
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}else {
  firebase.app(); // if already initialized, use that one
}
// REFERENCE PRODUCTS
const productsCollectionRef = firebase.firestore().collection("products");
const productsDocRef = productsCollectionRef.doc("json");
const allProductsCollectionRef = productsDocRef.collection("allProducts");
const allOrdersCollectionRef = firebase.firestore().collection("allOrders");

// KNOWLEDGE 
const allKnowledgeCollectionRef = firebase.firestore().collection("allKnowledge");
//POSTS
const allPostsCollectionRef = firebase.firestore().collection("allPosts");
// USERBOOKMARKERS
const allUserBookMarkers = firebase.firestore().collection("allUsers");
//REFERENCE AUTH
const auth = firebase.auth();

export const getProductById = async (productId) => {
  // REFERENCE PRODUCTS COLLECTION
  const doc = await allProductsCollectionRef.doc(productId).get();
  return doc.data()
}

export const getProducts = async (url) => {
  const collection = jsonInfo.find(element => element.url === url);
  const collectionName = collection.name || "allProducts";
  let jsonProducts = [];

  // QUERY PRODUCTS
  let querySnapshot;
  if (collectionName === "allProducts")
    querySnapshot = await allProductsCollectionRef.get();
  else
    querySnapshot = await allProductsCollectionRef.where("category", "==", collectionName).get();
  querySnapshot.forEach((doc) => {
    jsonProducts.push(doc.data());
  });
  return jsonProducts;
}

export const feedProducts = () => {
  products.forEach((product) => {
    const docRef = allProductsCollectionRef.doc();
    const id = docRef.id;
    const user = auth.currentUser._id;

    // Store Data for Aggregation Queries
    docRef.set({
      ...product,
      user,
      id
    });
  })
}
//use
export const signInWithEmailPassword = async (email, password) => {
  const user= await auth.signInWithEmailAndPassword(email, password);
  // const user=auth.currentUser
  console.log(user.user.uid)
  return user
}
//use
export const registerWithEmailPassword = async (email, password, displayName) => {
  await auth.createUserWithEmailAndPassword(email, password);
  const user = auth.currentUser;
  await user.updateProfile({ displayName })
  return user;
}

export const updateUserInfoApi = async (email, password, displayName) => {
  const user = auth.currentUser;
  if(displayName)
    await user.updateProfile({ displayName });
  if(email)
    await user.updateEmail(String(email));
  if(password)
    await user.updatePassword(password);
  return user;
}

export const createOrderApi = async (order) => {
  const user = auth.currentUser.uid;
  const orderRef = await allOrdersCollectionRef.doc();
  const id = orderRef.id;
  // Store Data for Aggregation Queries
  await orderRef.set({
    ...order,
    id,
    user
  });
  return { ...order, id };
}

export const getOrderById = async (orderId) => {
  const doc = await allOrdersCollectionRef.doc(orderId).get();
  return doc.data()
}

export const getOrderByUser = async () => {
  const user = auth.currentUser.uid;
  let jsonOrders = [];

  // QUERY Orders
  const querySnapshot = await allOrdersCollectionRef.where("user", "==", user).get();
  querySnapshot.forEach((doc) => {
    jsonOrders.push(doc.data());
  });
  return jsonOrders;
}
//use
export const signOut = () => {
  auth.signOut();
}
//use
export const checkLoginApi = () => {
  const user = auth.currentUser;
  if(!user) return false;
  return user.uid?  true : false;
}

//ramen


export const feedknowledge = () => {
  knowledgeJson.forEach((item) => {
    const docRef = allKnowledgeCollectionRef.doc();
    const id = docRef.id;

    // Store Data for Aggregation Queries
    docRef.set({
      ...item,
      id,
    });
  })
}

export const feedPosts = () => {
  console.log("feeding")
  
  postsJson.allPosts.forEach((item) => {
    const docRef = allPostsCollectionRef.doc();
    const id = docRef.id;

    // Store Data for Aggregation Queries
    docRef.set({
      ...item,
      id,
    });
  })
}
export const createNewPost = (userinfo) => {
  console.log("feeding")
  const docRef = allPostsCollectionRef.doc();
  const id = docRef.id;
  docRef.set({
    ...userinfo,
    id,
  });
  
}

export const getAllPosts = async () => {
  // REFERENCE PRODUCTS COLLECTION
  let aaa=[]

  const doca = await allPostsCollectionRef.get();
  
  doca.forEach((doc) => {
    
    aaa.push(doc.data());
  });

   return aaa
}

export const removePost = async (postId) => {
  let currentPosts = [];

  allPostsCollectionRef.doc(postId).delete();
  const posts = await allPostsCollectionRef.get();
  posts.forEach((doc) => {
    currentPosts.push(doc.data());
  });
  return currentPosts;
}

//knowledge
export const getKnowledgeContent = async (url) => {
  const collection = knowledgeJson.find(element => element.url === url);
  const collectionSect = collection.sect;
  let jsonProducts=[]
  // QUERY PRODUCTS
  let querySnapshot;
  querySnapshot = await allKnowledgeCollectionRef.where("sect", "==", collectionSect).get();
  querySnapshot.forEach((doc) => {
    jsonProducts.push(doc.data());
  });
  return jsonProducts[0];
}


export const changeDocTest = ()=>{
   allPostsCollectionRef.doc("YwvbpnrXXKEalnp7irUZ").set({
    ...postsJson.allPosts[0],
    text:"aaa"
   })
}

//userBookMarker
export const createUserBookMarkers = () => {
  const user = auth.currentUser.uid;
  const docRef = allUserBookMarkers.doc(user);
  const emptyBookMarker = []
  // Store Data for Aggregation Queries
  docRef.set({
    bookMarkers: emptyBookMarker,
  });
  return emptyBookMarker
}
export const addToBookmark=async(postID)=>{
 
  let bookmarkers=[]
  const user = auth.currentUser.uid;
  let querySnapshot = await allUserBookMarkers.doc(user).get() ;
  bookmarkers=querySnapshot.data().bookMarkers
  // querySnapshot.forEach((doc) => {
  //   bookmarkers.push(doc.data());
  // });
//  console.log(bookmarkers)
let addORNot=bookmarkers.find((value)=>value===postID)
if(addORNot){
  console.log("should remove")
  let newarray =bookmarkers.filter(item => item !== postID)
  await allUserBookMarkers.doc(user).set({
    ...querySnapshot.data(),bookMarkers:[...newarray]
  })

}else{
bookmarkers.push(postID)
console.log(bookmarkers)
await allUserBookMarkers.doc(user).set({
  ...querySnapshot.data(),bookMarkers:[...bookmarkers]
})
return bookmarkers
}
}

export const getBookmarkerArray = async()=>{
  
  if(auth.currentUser){
  const user = auth.currentUser.uid;
  let querySnapshot = await allUserBookMarkers.doc(user).get() ;
  return querySnapshot.data().bookMarkers
  }else{
    return []
  }
}


// {
//   let Posts = [];
//   const querySnapshot =await allPostsCollectionRef.where("id", "==", postId).get()
//   querySnapshot.forEach((doc) => {
//     Posts.push(doc.data());
//   });
// let oldarray=Posts[0].comments
// oldarray.push(comment)
// let newarray=oldarray
// console.log({
//   ...Posts[0],comments:{
//     ...newarray
//   }
// }













// get posts by map infomation
export const getPostsByMapInfo = async (id) => {
  const collection = ramenPosition.find(element => element.id === id);
  const collectionName = collection.name;
  let Posts = [];

  // QUERY PRODUCTS
  let querySnapshot;
  querySnapshot = await allPostsCollectionRef.where("restaurant", "==", collectionName).get();
  querySnapshot.forEach((doc) => {
    Posts.push(doc.data());
  });
  return Posts;
}

// get my posts bu user uid
export const getMyPostsByUserId = async  () => {
  const userId = auth.currentUser.uid;
  let myPosts = [];

  // QUERY Orders
  const querySnapshot = await allPostsCollectionRef.where("uid", "==", userId).get();
  querySnapshot.forEach((doc) => {
    myPosts.push(doc.data());
  });
  return myPosts;
}

export const getCollectionPostsByUserId = async () => {
  let collectionPosts = [];
  const markersId = await allUserBookMarkers.doc(auth.currentUser.uid).get();

  let post;
  markersId.data().bookMarkers.forEach( async (bookmarker) => {
    post = await allPostsCollectionRef.doc(bookmarker).get();
    console.log(post.data())
    collectionPosts.push(post.data());
  })
  return collectionPosts;
}

export const getCommentsLength = async (postId)=>{
  let myPosts = [];
  const querySnapshot =await allPostsCollectionRef.where("id", "==", postId).get()
  // console.log(querySnapshot)
  querySnapshot.forEach((doc) => {
    myPosts.push(doc.data());
    console.log(doc)
  });
  // console.log(myPosts[0].comments.length)
  return myPosts[0].comments.length
  
}

export const addComment = async(postId,comment)=>{
  let Posts = [];
  const querySnapshot =await allPostsCollectionRef.where("id", "==", postId).get()
  querySnapshot.forEach((doc) => {
    Posts.push(doc.data());
  });
let oldarray=Posts[0].comments
oldarray.push(comment)
let newarray=oldarray
// console.log({
//   ...Posts[0],comments:{
//     ...newarray
//   }

// })
  await allPostsCollectionRef.doc(postId).set({
    ...Posts[0],comments:[
      ...newarray
    ]
    
  
  })
  return newarray
}
export const countNum =async ()=>{
  function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
await timeout(3000)

 
}