import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser : null , 
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        signIn:(state , action) => {
            state.currentUser = action.payload;
        },
        signOut: (state , action) =>{
            state.error = action.payload;
        },
        
    }
});

export const {signIn , signOut} = userSlice.actions;

export default userSlice.reducer;