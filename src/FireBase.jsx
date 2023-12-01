//FireBaseとReactの連携を行う

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
//認証に必要なものをインストール
import {getAuth, GoogleAuthProvider} from "firebase/auth";
//fitestoreからgetfirestoreをインストール
import { getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA0cMdS78IN8aBHlR_DiE1QBtGHb6U6vzQ",
  authDomain: "carshare-review-app.firebaseapp.com",
  projectId: "carshare-review-app",
  storageBucket: "carshare-review-app.appspot.com",
  messagingSenderId: "351502473572",
  appId: "1:351502473572:web:e74ff37f8e56d207004271",
  measurementId: "G-NK5B39SD9N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);

//認証用のauthとGoogleProvider
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

//データベースの初期化
 const db = getFirestore(app);


export {analytics, auth, provider, db};