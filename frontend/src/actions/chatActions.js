import { FETCH_CHAT_REQUEST, FETCH_CHAT_SUCCESS, FETCH_CHAT_FAIL, FETCH_LOGOUT} from '../constants/chatConstants'
import React from 'react';
import axios from 'axios'

export const fetchChat = (sellerId,receiverId) => async(dispatch)=>{
    try {
        dispatch({type:FETCH_CHAT_REQUEST})
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const { data } = await axios.post('/api/chat', {sellerId,receiverId}, config);
        dispatch({ type: FETCH_CHAT_SUCCESS,payload:data })
        console.log(data);
        localStorage.setItem('chatInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({ type: FETCH_CHAT_FAIL, 
            payload: error.response && error.response.data.message ? error.response.data.message : error.message });
    }
}
