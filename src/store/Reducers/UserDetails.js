
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    userUID : null
}

const userSlice = createSlice({

    initialState,
    name:"userDetails",
    reducers:{
        setUID:(state,action)=>{
            console.log(action,"inside redux")
            state.userUID = action.payload;
        }
    }

})

export default userSlice.reducer;
export  const{setUID} = userSlice.actions;