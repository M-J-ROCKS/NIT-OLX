import React, { useEffect } from 'react'
import io from 'socket.io-client'
import { useState } from 'react';
import Chat from './Chat';
import { useSelector } from 'react-redux';
import axios from 'axios';

//To connect client to server
let socket=""

function temp(){
  socket=io.connect("http://127.0.0.1:5000")
}
function ChatScreen({match}) {
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    // console.log(userInfo)
    const username=userInfo.name
    
    const chat = useSelector((state)=>state.fetchChat);
    const {chatInfo}=chat
    let messages=null
    let room=""
    if(chatInfo){
    messages=chatInfo.messages;
    room =chatInfo.room_id;}
    console.log("huioo",messages)
    useEffect(()=>{
      temp();
    },[])
    if(room&&messages) 
    {
      socket.emit("join_room",room)
      // console.log('hiooi',messages)  
      return (
          <Chat socket={socket} username={username} room={room} messages={messages}/>
      )
    }
    else{
      return(
        <div>Wait...</div>
      )
    }
}

export default ChatScreen