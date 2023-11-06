
import { database } from "./config"

export const sendMessage = async(currentUid,reciptentUid,message) =>{

    try{
        return await database.ref("messages/"+currentUid)
            .child(reciptentUid)
            .push({
                currentUid:currentUid,
                reciptentUid:reciptentUid,
                message : message,
            })
    }
    catch(error){
        return error
    }

}

export const ReceiveMessage = async(currentUid,reciptentUid,message) =>{

    try{
        return await database.ref("messages/"+reciptentUid)
            .child(currentUid)
            .push({
                currentUid:currentUid,
                reciptentUid:reciptentUid,
                message : message,
            })
    }
    catch(error){
        return error
    }

}

// export const accessMessage = async(currentUid,reciptentUid)=>{
//     try{
//          await database.ref('messages/').child(currentUid).child(reciptentUid).on("value",(snapshot)=>{
//             let message = [];
//             snapshot.forEach((data)=>{
//                 message.push({
//                     sendBy:data.val().message.sender,
//                     receiveBy:data.val().message.receiveBy,
//                     message:data.val().message.message
//                 })

//             })

//             return  message.reverse();
//         })

//     }catch(error){

//         return error
       
//     }
// }
export const accessMessage = async (currentUid, recipientUid) => {
    try {
        const snapshot = await database
            .ref('messages/'+currentUid)
            .child(recipientUid)
            
            .once('value');

        const messageArray = [];
        console.log(snapshot);
        snapshot.forEach((data) => {
            const messageData = data.val();
            messageArray.push({
                sendBy: messageData.currentUid,
                receiveBy: messageData.reciptentUid,
                message: messageData.message,
            });
        });
        console.log(messageArray,"meess")

        return messageArray.reverse();
    } catch (error) {
        throw error; // Re-throw the error to be caught and handled where this function is called
    }
};

