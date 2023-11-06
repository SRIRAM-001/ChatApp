import { firebaseConfig } from "./config";
import { database } from "./config";
import firebase from "firebase/compat/app";

export const addUser = async (phoneno, userId) => {
  try {
    
    
    const userRef = database.ref('users/' + userId);

    
    return await userRef.update({
      phoneNumber: phoneno,
      userId: userId,
    });
  } catch (error) {
    return error;
  }
};

export const getAlluser = async() =>{
  try{
    console.log("inside get users")
    const uuid = firebase.auth().currentUser.uid;
    console.log('uuid', uuid);
    
    const usersRef = database.ref('users/');
    const dataSnapshot = await usersRef.once('value');
    const users = dataSnapshot.val();
    console.log(users)
    //return users ? Object.values(users) : [];

    const usersData = dataSnapshot.val();
    //console.log(usersData)
    const usersArray = Object.values(usersData);
    return users;

   
  
  }catch(error){
    return "error";
  }

}
