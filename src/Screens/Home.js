import { View, Text,StyleSheet ,Image,FlatList,TouchableOpacity } from 'react-native'
import React ,{useState,useEffect} from 'react'
import {Montserrat_700Bold,Montserrat_400Regular,Montserrat_500Medium,useFonts} from '@expo-google-fonts/montserrat'
import * as Contacts from 'expo-contacts'
import { getAlluser } from '../firebase/users'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch , useSelector} from 'react-redux'
 


const Home = ({navigation,route}) => {

  
  const [contacts, setContacts] = useState([]);
  const [newContacts, setNewContacts] = useState([])
  const [recognizedText, setRecognizedText] = useState('');
  const [started,setstarted] = useState('')
  const userId = useSelector((state)=>state.user.userUID)

  console.log(userId,"userId in home")
  

  const [registerdContacts , setRegisteredContacts] = useState([]);

  // const {currentUserId} = route.params;

  // console.log(currentUserId,"in home.js")
  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers],
        });
        if (data.length > 0) {
          setContacts(data);
        }
      }
      
      await getUser();

      
      
    
    })();

    

    

    

    
  }, []);

   let [fontsLoaded] = useFonts({
    Montserrat_700Bold,
    Montserrat_400Regular,
    Montserrat_500Medium
  })

  const speechTOTextStart = async () =>{

    await Voice.start('en-NZ');
    setstarted(true);

  }

  const speechTOTextStop = async () =>{

    await Voice.stop();
    setstarted(false);

  }


  
  
  const chatHandler = (userName,userId) =>{
    //console.log("username in handler",userName,userId)
    navigation.navigate('chatScreen',{userName,userId})
    //console.log(userName)
  }

  const getUser =  async() => {

    const users =  await getAlluser();
    //console.log("contacts",contacts[3])
    //console.log(users)
    setRegisteredContacts(users);
    //console.log("registeredContacts",registerdContacts)

  //  const selectedContacts = await contacts.filter((contact) => contact.phoneNumbers[0].number == 9361147619);

   //console.log(contacts[0].phoneNumbers[0].number)
   //console.log(contacts[0]);
   filterContacts();

    //console.log("selectedcontacts", selectedContacts);
  }

  function normalizePhoneNumber(phoneNumber) {
    //console.log(phoneNumber)
  return phoneNumber.replace(/\s+/g, "").replace(/^\+?91/, ""); // Remove whitespace and optional country code
}

  const filterContacts = async( ) =>{

    try{

      registerd = await Object.values(registerdContacts);
      //console.log("registereeed",registerd)
      const namesWithMatchingMobile = [];

      for (const key in registerd) {
  const keys = registerd[key];
  let targetMobileNumber = normalizePhoneNumber(keys.phoneNumber);

  for (const item of contacts) {
    if (item.phoneNumbers && Array.isArray(item.phoneNumbers)) { // Check if phoneNumbers property exists and is an array
      for (const phoneNumber of item.phoneNumbers) {
        if (phoneNumber.number && normalizePhoneNumber(phoneNumber.number) === targetMobileNumber) { // Check if phoneNumber.number exists
          namesWithMatchingMobile.push({
            Name: item.name,
            phoneNumber: targetMobileNumber,
            userId: keys.userId,
          });
          break; // No need to continue checking phone numbers for this item
        }
      }
    }
  }
}


  //console.log("registerd filtered")
  //console.log(namesWithMatchingMobile)
  setNewContacts(namesWithMatchingMobile)
  }
      catch(error){
        console.log("error",error)
      }
  }




  return (

    
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>

          <Image
          source={require('../assets/search3.png')}
          style={styles.search}/>
          <Text style={styles.headerText}>Chats</Text>
           <Image
          source={require('../assets/hamburger.png')}
          style={styles.hamburger}/>

      </View>
      <View>
        <TouchableOpacity onPress={getUser}>
          <Text>GetUsers</Text>
        </TouchableOpacity>
        
        <FlatList/>
      {/* <TouchableOpacity delayPressIn={50} onPress={chatHandler}>
        <View style={styles.chatContainer}>
          <TouchableOpacity delayPressIn={50}>
          <Image source={require('../assets/Vectoravatar2.png')} style={styles.avatar}/>
          </TouchableOpacity>
          <View style={styles.chatTextContainer}>
            <View style={styles.chatRow}>
              <Text style={styles.userName}>Sriram</Text>
              <Text style={styles.date}>28-07-2023</Text>
            </View>
            <View>
              <Text style={styles.lastMessage}>Last meassage from person</Text>
            </View>   
          </View>
        </View>
      </TouchableOpacity> */}
      
        {/* <View style={styles.chatContainer}>
          <Image source={require('../assets/Vectoravatar2.png')} style={styles.avatar}/>
          <View style={styles.chatTextContainer}>
            <View style={styles.chatRow}>
              <Text style={styles.userName}>Sriram</Text>
              <Text style={styles.date}>28-07-2023</Text>
            </View>
            <View>
              <Text style={styles.lastMessage}>Last meassage from person</Text>
            </View>   
          </View>
        </View> */}

        <FlatList
        data={newContacts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          
        <TouchableOpacity delayPressIn={50} onPress={() =>{chatHandler(item.Name,item.userId)}}>
        <View style={styles.chatContainer}>
          <TouchableOpacity delayPressIn={50}>
          <Image source={require('../assets/Vectoravatar2.png')} style={styles.avatar}/>
          </TouchableOpacity>
          <View style={styles.chatTextContainer}>
            <View style={styles.chatRow}>
              <Text style={styles.userName} numberOfLines={1} ellipsizeMode="tail">{item.Name}</Text>
              {/* <Text style={styles.date}>28-07-2023</Text> */}
            </View>
            <View>
              <Text style={styles.lastMessage}>Last meassage</Text>
            </View>   
          </View>
        </View>
      </TouchableOpacity>
        )}
      />


      </View>

    </SafeAreaView>
    
  )
}

const styles = StyleSheet.create({

  container:{
    backgroundColor:'#F1F0FC',
    flex:1,
    zIndex:10,
    padding:20
  },
  header:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginBottom:30
    

  },
  search:{
    height:30,
    width:30
  },
  headerText:{
    fontSize:30,
    color:'#6965FB',
    fontFamily:'Montserrat_400Regular'
  },
  hamburger:{
    width:40,
    height:40
  },
  chatContainer:{
    flexDirection:'row',
    alignItems:'center',
    backgroundColor:'white',
    padding:20,
    borderRadius:20,
    marginBottom:7,
    

  },
  avatar:{
    height:40,
    width:40
  },
  chatRow:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    
    
  },
  chatTextContainer:{
    marginLeft:20,
    marginRight:10,
    flex:1
  },
  userName:{
    color:'#42373B',
    fontSize:18,
    fontWeight:'500',
    marginBottom:8
  },
  date:{
    color:'#7684B0',
    fontSize:12
  },
  lastMessage:{
    color:'#7684B0'
  }

})

export default Home