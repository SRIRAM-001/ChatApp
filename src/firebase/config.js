


import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/database';


export const firebaseConfig = {
  apiKey: "AIzaSyCe5sj8sO2H6rhMoIuqHmDa4j3gSpVSgq0",
  authDomain: "quietconvo-921a2.firebaseapp.com",
  projectId: "quietconvo-921a2",
  storageBucket: "quietconvo-921a2.appspot.com",
  messagingSenderId: "270871127255",
  appId: "1:270871127255:web:578d5b7b167d06bd793c92",
  measurementId: "G-59T51CJLVT"
};

let app;
if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}

export const database = firebase.database();
