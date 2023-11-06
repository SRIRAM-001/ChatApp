import { View, Text ,StyleSheet, TextInput ,TouchableOpacity,Alert} from 'react-native'
import React ,{useRef, useState} from 'react'
import {LinearGradient} from 'expo-linear-gradient'
import {Montserrat_700Bold,Montserrat_400Regular,Montserrat_500Medium,useFonts} from '@expo-google-fonts/montserrat'

import {FirebaseRecaptchaVerifierModal} from 'expo-firebase-recaptcha'
import firebase from 'firebase/compat/app'
import { firebaseConfig } from '../firebase/config'
import { addUser } from '../firebase/users'
import { useDispatch } from 'react-redux'
import { setUID } from '../store/Reducers/UserDetails'

const SigninContainer = ({navigation}) => {

  const [showOTPCodeSection , setShowOTPCodeSection] = useState(false)
  const [phoneNo,setPhoneNo] = useState("");
  const [code , setCode ] = useState(null);
  const [currentUserId,setCurrentUserId] = useState(null)
  const [verificationId,setVerificationId] = useState(null);
  const recaptchaVerifier = useRef(null);
  const dispatch = useDispatch();

  let [fontsLoaded] = useFonts({
    Montserrat_700Bold,
    Montserrat_400Regular,
    Montserrat_500Medium
  })

  const sendVerification = () =>{
    
    const phoneProvider = new firebase.auth.PhoneAuthProvider();
    setShowOTPCodeSection(true);
    console.log(showOTPCodeSection,"xx",phoneProvider)

    phoneProvider
        .verifyPhoneNumber(phoneNo,recaptchaVerifier.current)
        .then(setVerificationId)
        .catch((error)=>{
          alert(error)
        })
        
  }

  const confirmationCode =() =>{

    const credential = new firebase.auth.PhoneAuthProvider.credential(
      verificationId,
      code
    );

    firebase.auth().signInWithCredential(credential)
        .then((res)=>{
          const userId  = firebase.auth().currentUser.uid;
          addUser(phoneNo,userId)
          setCurrentUserId(userId)
          
          console.log(userId,phoneNo)
          setCode('');
          navigation.navigate('Home',{userId});
          dispatch(setUID(userId))
        })
        .catch((error) =>{
          alert(error)
        })

    // Alert.alert(
    //   "Signin Successfull engage with chats"
    // )
  }

  console.log(navigation.navigate,phoneNo)
  return (
    
    <View style={styles.container}>
       <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}/>
      <LinearGradient
        // Button Linear Gradient
        colors={['rgba(204, 164, 255, 0.7)', '#9CB2FF']}
        style={styles.topContainer}>
      
        <View style={styles.topContainer2}></View>
  <View style={styles.background}> 
  { !showOTPCodeSection ? (
  <View >
    <Text style={{fontSize:18,textAlign:'center'}}>Enter a 10 digit Mobile Number</Text>
    <TextInput
      onChangeText={setPhoneNo}
      value={phoneNo}
      
      keyboardType="phone-pad"
      autoComplete='tel'
      placeholderTextColor="black"
      style={styles.input}
    />
    <TouchableOpacity style={styles.customButton}
    onPress={() => {
          setShowOTPCodeSection(true)
          sendVerification(); // Assuming this is a function to send verification
        }}>
      <Text style={styles.button}>
        Send OTP
      </Text>
    </TouchableOpacity>
  </View>
) : null}

        
        {showOTPCodeSection ? (
            <View style={styles.OTPContainer}>
              <Text style={{fontSize:18,textAlign:'center'}}>Enter OTP</Text>
              <TextInput
                onChangeText={setCode}
                value={code}
                keyboardType="number-pad"
                autoComplete='tel'
                placeholderTextColor="black"
                style={styles.OTPinput}
              />
              <TouchableOpacity style={styles.OTPcustomButton}>
                <Text style={styles.button}
                  onPress={() => {
                    setShowOTPCodeSection(true);
                    confirmationCode() // Assuming this is a function to send verification
                  }}
                >
                  Verify OTP
                </Text>
              </TouchableOpacity>
              
            </View>
          ) : null}

      </View>
          

        

        

        
      
        </LinearGradient>
       
      
    </View>
    
  )
}

const styles = StyleSheet.create({
  container:{
   flex:1,
   
  },
   topContainer: {
    flex:1,
    zIndex: -1,
    justifyContent:'center',
    alignItems:'center'
  },
  background:{
        padding:20,
        paddingBottom:30,
        width:'80%',
        backgroundColor:'rgba(255,255,255,0.4)',
  },
  
  input:{
    height: 43,
    width:'80%',
    margin: 12,
    fontSize:22,
    borderWidth: 1,
    borderColor:'gray',
    color:'black',
    backgroundColor:'rgba(0,0,0,0.07)',
    padding: 10,
    zIndex:5,
    borderRadius:4,
    paddingLeft:10,
    justifyContent:'center',
    alignItems:'center',
    alignSelf:'center',
    justifyContent: 'center',
    textAlign:'center',
    textAlignVertical:'center'

  },
  
  topContainer2:{
    backgroundColor:'pink',
    height:250,
    width:250,
    borderRadius:200,
    position:'absolute',
    left:-60,
    top:-90,
     
    zIndex: -1,
  },
  customButton: {
    backgroundColor: 'white',
    borderRadius: 7,
    
    padding:7,
    alignItems: 'center',
    alignSelf:'center',
    justifyContent: 'center',
    width: '80%', 
    zIndex:5
  },
  button:{
    
    color: 'rgba(125, 0, 125, 0.5)',
    fontSize: 20,
    fontWeight: 'bold',
 
  },
  OTPinput:{
     height: 43,
    width:'70%',
    margin: 12,
    fontSize:22,
    borderWidth: 1,
    borderColor:'gray',
    color:'black',
    backgroundColor:'rgba(0,0,0,0.07)',
    padding: 10,
    zIndex:5,
    borderRadius:4,
    paddingLeft:10,
    justifyContent:'center',
    alignItems:'center',
    alignSelf:'center',
    justifyContent: 'center',
    textAlign:'center',
    textAlignVertical:'center'

  },
  OTPcustomButton:{
    backgroundColor: 'white',
    borderRadius: 7,
    
    padding:9,
    alignItems: 'center',
    alignSelf:'center',
    justifyContent: 'center',
    width: '70%', 
    zIndex:5
  },
  OTPContainer:{
    
  }
})

export default SigninContainer