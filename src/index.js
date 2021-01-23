import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux';
import {store}from './react-redux/store';
import firebase from 'firebase';
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDEkOc54pN9SwJe0wb8c3j3K3mWK8obH8M",
  authDomain: "online-compiler-caa20.firebaseapp.com",
  projectId: "online-compiler-caa20",
  storageBucket: "online-compiler-caa20.appspot.com",
  messagingSenderId: "19019460983",
  appId: "1:19019460983:web:df3af31b328bbb3bec7172",
  measurementId: "G-PLZXQEGW39"
};
const firebaseapp=firebase.initializeApp(firebaseConfig);
const db=firebaseapp.firestore();
const auth=firebaseapp.auth();
const provider= new firebase.auth.GoogleAuthProvider();
export {auth,provider}
export default db;
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <App /></Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
