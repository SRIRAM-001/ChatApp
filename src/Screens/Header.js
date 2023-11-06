import { View, Text,TouchableOpacity ,StyleSheet,Image} from 'react-native'
import React from 'react'

import {LinearGradient} from 'expo-linear-gradient'

const Header = ({title,previousPage}) => {

    // const [fontsLoaded] = useFonts({
       
    // })

  return (
    
       
        <LinearGradient colors={['rgba(204, 164, 255, 0.7)', '#9CB2FF']} style={styles.container}
        start={{ x: 0, y: 0 }} 
        end={{ x: 1, y: 1 }}   
        >
            <TouchableOpacity onPress={previousPage} style={styles.backarrowContainer}>
            <Image source={require('../assets/backarrow2.png')} style={styles.backarrow} />
            </TouchableOpacity>
            <Image source={require('../assets/Vectoravatarwhite.png')} style={styles.avatar}/>
            <Text style={{ fontSize: 20,color:'white' }}>{title}</Text>
            {/* You can add user profile picture here */}
        </LinearGradient>
    
  )
}

const styles= StyleSheet.create({
    container:{
        flexDirection: 'row',
        
        alignItems:'center',
        
        padding: 5,
        paddingVertical:10,
        backgroundColor:'rgba(43, 41, 158, 0.7)',
        color:'white',
        
        
    },
    avatar:{
        height:40,
        width:40,
        marginRight:20,
        marginLeft:4,
        
    },
    backarrow:{
        height:20,
        width:12,
        marginRight:4,
        marginLeft:1,
        
        
    },
    backarrowContainer:{
        padding:10,
        paddingVertical:12,
    }
})

export default Header