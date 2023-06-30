import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    value: false,
}

export const otpModal = state => state.otp.value;
export const profileModal = state => state.profile.value;

export const OtpSlice = createSlice({
    name: 'otpModal',
    initialState,
    reducers: {
        otpModalHandler: (state) => {
            state.value = !state.value
        },


    },
})

// Action creators are generated for each case reducer function
export const { otpModalHandler } = OtpSlice.actions

export default OtpSlice.reducer