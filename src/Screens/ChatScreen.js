import { View, Text ,StyleSheet, TextInput ,Image ,ScrollView, TouchableOpacity, FlatList } from 'react-native'
import React ,{useLayoutEffect,useState,useEffect} from 'react'
import Header from './Header'
import {Audio} from 'expo-av'
import voice from '@react-native-voice/voice'


import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ReceiveMessage, sendMessage } from '../firebase/message';
import { accessMessage } from '../firebase/message'
import { useDispatch , useSelector} from 'react-redux'




const ChatScreen = ({navigation,route}) => {

  
  const [contentHeight, setContentHeight] = useState(0);
  const [textValue,setTextValue] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recording, setRecording] = useState(null);
  const [Chats,setChats] = useState('')
  const navigate = useNavigation();

  const [started,setStarted] = useState(false);
  let [result,setResult] = useState("");
  //const currentUserId = useSelector((state)=>state.user.userUID);
  
  const currentUserId = useSelector((state)=>state.user.userUID)
  
  
  
  const {userId} = route.params;
  const senderId = userId
  console.log(userId)
  const {userName} = route.params;

  const startRecord = async() =>{

    await voice.start("en-NZ");
    setStarted(true);

  }

  const stopRecord = async() =>{

    await voice.stop();
    setStarted(false);

  }
  
  
  const sendText = () =>{
    console.log(textValue)
    if(textValue.trim().length>0){
      sendMessage(currentUserId,senderId,textValue)
        .then(()=>{
          setTextValue(textValue);
        })
        .catch((error)=>{
          alert(error)
        })
        ReceiveMessage(currentUserId,senderId,textValue)
        .then(()=>{
          setTextValue('');
        })
        .catch((error)=>{
          alert(error)
        })
    }
  }
  const previousPage = () =>{
    navigation.goBack();
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => <Header title={userName} previousPage={previousPage}/>,
    });
  }, [navigation]);

  // useEffect(async()=>{
  //  const chats =  await  accessMessage(currentUserId,currentUserId);
  //  setChats(chats)
  //  console.log('chats',chats)
  // },[])
  
  useEffect(() => {
  const fetchData = async () => {
    try {
      const chats = await accessMessage(currentUserId, senderId);
      setChats(chats.reverse());
      console.log('chats', chats);
      voice.onSpeechError = onSpeechError;
      voice.onSpeechResults = onSpeechResults;
      
    
    } catch (error) {
      console.error('Error fetching chats:', error);
    }
  };

  fetchData();
}, []);

const onSpeechResults = (result) =>{
      setResult(result);
}

const onSpeechError = (error) =>{
  console.log(error);
}





  const handleContentSizeChange = (event) => {
    const { contentSize } = event.nativeEvent;
    setContentHeight(contentSize.height);
  };

  const startRecording = async() => {

    try{
      isRecording(true)
    const permission = await Audio.requestPermissionsAsync();
    if(permission.status === 'granted'){

      await Audio.setAudioModeAsync({
        allowsRecordingIOS :true,
        playsInSilentModeIOS:true
      })

      const {record } = await Audio.Recording.createAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      

      setRecording(record)

    }
    else{
      alert("Grant permission to microphone ")
    }

  }catch(error){
    console.log(error);
    alert(error);
  }

  }

  const stopRecording = async() => {
    isRecording(false)

    setRecording(undefined);

    await record.stopAndUnLoadAsync();

    let updateRecordings = [...record];

    const {sound,status} = await record.createNewLoadedSoundAsync();
    updateRecordings.push({
      sound:sound,
      duration: getDurationFormatted(status.durationMillis),
      file : recording.getURI()
    })

    setRecording(updateRecordings)
  }

  const getDurationFormatted = (millis) =>{

    const mins = millis/1000/60;
    const minutesDisplay = Math.floor(mins)
    const seconds = Math.round((mins-minutesDisplay)*60)
    const secondDisplay = seconds<10? `0${seconds}` : seconds
    return `${minutesDisplay}:${secondDisplay}`

  }



  

    

  

  

   const maxLines = 4;
  const singleLineHeight = 30; // You may need to adjust this value based on your font size and styles

  // Calculate the number of lines based on content height and threshold
  const numberOfLines = contentHeight <= singleLineHeight ? 1 : Math.min(Math.floor(contentHeight / singleLineHeight), maxLines);

  return (
    <View style={styles.container}>

      {/* <View style={{
              ...styles.senderMessageContainer,
              alignSelf: currentUserId === senderId ? 'flex-end' : 'flex-start',
              backgroundColor : currentUserId === senderId ? 'rgba(105, 101, 251, 0.25)' :  'rgba(0, 0, 0, 0.12)'
            }}>
          <View  style={styles.senderChat} >
            <Text style={styles.senderMessage}>
              hiiiiiiiiiiiiii
            </Text>
          </View>
        </View> */}

      <View>
      {isRecording == true ? (
        <TouchableOpacity onPress={stopRecording} style={{'backgroundColor':'pink'}}>
          <Text>Stop Recording</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={startRecording} style={{'backgroundColor':'pink'}}>
          <Text>Start Recording</Text>
        </TouchableOpacity>
      )}
      {
        started == true?(
          <TouchableOpacity onPress={startRecord}>
              <Text>Start voice</Text>
          </TouchableOpacity>
        ):(
          <TouchableOpacity onPress={stopRecord}>
            <Text>Stop Voice</Text>
          </TouchableOpacity>
        )
      }
      {
        result.map 
      }
     </View>
      { isRecording?
     <View>
      <TouchableOpacity onPress={recording.sound.replayAsync()}><Text>Play</Text></TouchableOpacity>
     </View>:null
      }
      
     <FlatList
      data={Chats}
      renderItem={({ item }) => (
        
         <View style={{
              ...styles.senderMessageContainer,
              alignSelf: currentUserId === item.sendBy ? 'flex-end' : 'flex-start',
              backgroundColor : currentUserId === item.sendBy ? 'rgba(105, 101, 251, 0.25)' :  'rgba(0, 0, 0, 0.12)'
            }}>
          <View  style={styles.senderChat} >
            <Text style={styles.senderMessage}>
              {item.message}
            </Text>
          </View>
        </View>
       
      )}
      keyExtractor={(index) => index.toString()}
    />

    
    
        
        
    

      <View style={styles.chatContainer}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          

        <TextInput 
        style={[styles.chatInput, { height: Math.min(maxLines * singleLineHeight, contentHeight) }]}
         value={textValue}
         onChangeText={setTextValue}
         placeholder='Type here!'
         placeholderTextColor="#7684B0"
         multiline={true}
         numberOfLines={numberOfLines}
         onContentSizeChange={handleContentSizeChange}>

        </TextInput>
        <TouchableOpacity onPress={sendText} style={styles.sendImageContainer}>
        
           <Image source={require('../assets/Vectorsend.png')} style={styles.sendImage} />

        </TouchableOpacity>

        {textValue.length === 0?
        <TouchableOpacity  style={styles.sendImageContainer}  >
        
           <Image source={require('../assets/microphone.png')} style={styles.microphone} />

        </TouchableOpacity>
        :null}
        </ScrollView>

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    backgroundColor:'',
    paddingVertical:20,
    paddingHorizontal:20,
    flex:1
  },
  chatInput:{
    backgroundColor:'rgba(154, 150, 230, 0.3)',
    paddingHorizontal:20,
    paddingVertical:15,
    borderRadius:15,
    paddingRight:20,
    fontSize: 18, 
    flex:1, // Takes as much space as possible in the row
    height: 55, 
    
   
  },
  sendImage:{
    height:25,
    width:30,
    marginLeft:5
    
    
  },
  sendImageContainer:{

    height:50,
    width:50,
    backgroundColor:'rgba(43, 41, 158, 0.8)',
    borderRadius:100,
    marginLeft:10,
    display:'flex',
    alignItems:'center',
    justifyContent:'center'

  },

  chatContainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
    borderRadius: 8,
    position:'absolute',
    bottom:20,
    width:'100%',
    marginHorizontal:20
  },
  scrollContainer:{
    flexGrow:1,
    display:'flex',
    flexDirection:'row',
    justifyContent:'center',
   
  },
 

  
  senderChat: {
    marginVertical: 3,
    width: '80%',
  },
  senderMessageContainer: {
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 6,
    alignSelf: 'flex-start', 
     marginVertical:4,
  },
  senderMessage: {
    fontSize: 16.5,
    color: 'rgba(108, 22, 199, 0.85)',
    flexWrap: 'wrap',
  },
  microphone:{
    height:26,
    width:30,
    marginLeft:0

  }
})

export default ChatScreen

  // senderChat: {
  //   marginVertical: 3,
  //   width: '80%',
  // },
  // senderMessageContainer: {
  //   backgroundColor: 'rgba(105, 101, 251, 0.25)',
  //   borderRadius: 15,
  //   paddingHorizontal: 15,
  //   paddingVertical: 6,
  //   alignSelf: 'flex-start', 
  //    marginVertical:4,
  // },
  // senderMessage: {
  //   fontSize: 16.5,
  //   color: 'rgba(108, 22, 199, 0.85)',
  //   flexWrap: 'wrap',
  // },