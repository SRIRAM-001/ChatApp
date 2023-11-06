import { View, Text ,StyleSheet ,StatusBar, TextInput ,TouchableOpacity,KeyboardAvoidingView} from 'react-native'
import React ,{useEffect}  from 'react'
import {LinearGradient} from 'expo-linear-gradient'
import * as Font from 'expo-font';
import {Montserrat_700Bold,Montserrat_400Regular,Montserrat_500Medium,useFonts} from '@expo-google-fonts/montserrat'
import SigninContainer from './SigninContainer';

const Signin = ({navigation}) => {

  console.log(navigation.navigate)
  let [fontsLoaded] = useFonts({
    Montserrat_700Bold,
    Montserrat_400Regular,
    Montserrat_500Medium
  })
  if(!fontsLoaded){
    return(
      <View>
        <Text>Loading</Text>
      </View>
    )
  }else{

  return (

    <View style={styles.container}>
      <StatusBar backgroundColor="white" barStyle="dark-content"/>
      
       

       <LinearGradient
        // Button Linear Gradient
        colors={['rgba(204, 164, 255, 0.7)', '#9CB2FF']}
        style={styles.topContainer}>

           <View style={styles.sloganContainer} >
              <Text style={styles.slogan1}>Speak, Connect, Engage! </Text>
              
        </View>
        
       

        <View style={styles.getStartButton}>
        <TouchableOpacity delayPressIn={50}
        style={styles.customButton}
        onPress={()=>navigation.navigate("SigninContainer")}
        
      >
        <Text style={styles.buttonText}>Get Started</Text>
        
      </TouchableOpacity>
        </View>
        

        

      <View style={styles.topContainer2}></View>
      <View style={styles.bottomTextContainer}>
          <Text style={styles.bottomText}> Say goodbye to touch interactions! With advanced voice assistance,
             navigate the app hands-free. Send messages, make calls, and access features,
              all with simple voice commands.</Text>
        </View>

      <View style={styles.copyright}>
        <Text style={styles.copyrightText}>Copyright&#169;2023QuietConvo</Text>
        </View>
        






        
      </LinearGradient>
      {/* <LinearGradient
        // Button Linear Gradient
        colors={['#5F0A87', '#F1A7F1']}
        style={styles.topContainer2}>
        
      </LinearGradient> */}

      {/* <View style={styles.topContainer2}>

      </View> */}
      
      
        
       
     
      
        
     
    
      </View>
    
    
  )
}
}

const styles = StyleSheet.create({

  container:{
      flex:1,
      
      

  },
  
  topContainer: { 
    flex:1,
    zIndex: 2,
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
 
  
  
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius:8
  },

 

  sloganContainer:{
    color:'#FFF',
    position:'absolute',
    top:290,
    left:20,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 3,

  },
   slogan1:{
    fontSize:28,
    color:'#fff',
    paddingTop:5,
    fontFamily:'Montserrat_400Regular'

  },
  getStartButton:{
    position:'absolute',
    top:410,
    left:35,
    zIndex:4,
    width:'80%'
    
  },
  
  customButton: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    alignSelf:'center',
    justifyContent: 'center',
    width: '80%', 
    zIndex:5
  },
 
 buttonText: {
    color: 'rgba(125, 0, 125, 0.5)',
    fontSize: 20,
    fontWeight: 'bold',
  },
  bottomTextContainer:{
  
    marginTop:750,
    bottom:180,
    
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 3,
  }
  ,
  bottomText:{
    color:'#fff',
    paddingHorizontal:20,
    fontSize:14,
    fontFamily:'Montserrat_400Regular'
  },
  copyright:{
    position:'absolute',
    bottom:60,
    zIndex:3,
    alignSelf:'center',
    justifyContent:'center'

  },
  copyrightText:{
    color:'black',
    fontSize:13,
    fontFamily:'Montserrat_400Regular'
    
  }
  
 

  
})


export default Signin