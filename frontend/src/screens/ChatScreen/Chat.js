import axios from "axios";
import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";

function Chat({ socket, username, room ,messages}) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState(messages);
  // console.log("Hoo : ", messageList)

  const sendMessage = () => {
    if (currentMessage !== ""){
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      let temp=JSON.stringify(messageData)
      console.log(temp)
      setMessageList((list) => [...list, temp]);
      socket.emit("send_message", messageData)
      //console.log('Mannat: ',messageList);
      const chat_update=axios.put("http://localhost:5000/api/chat/update",{
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        room_id:room,
        messages:messageList
      }).then((data)=>{
        // console.log(data)
      }).catch((e)=>{
        console.log('Error in Chat js')
      })
      setCurrentMessage("");
    }
  };

  useEffect(() => {

    socket.on("receive_message", (data) => {
      let temp2=JSON.stringify(data)
      
      setMessageList((list) => [...list, temp2]);
    });
  }, [socket])
  useEffect(()=>{
    
    return ()=>{
      const chat_update=axios.put("http://localhost:5000/api/chat/update",{
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        room_id:room,
        messages:messageList
      }).then((data)=>{
        // console.log(data)
      }).catch((e)=>{
        console.log('Error in Chat js')
      })
    }
  })

  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageList.map((msg) => {
            let messageContent=JSON.parse(msg)
            return (
              <div
                className="message"
                id={username === messageContent.author ? "you" : "other"}
              >
                <div>
                  <div className="message-content">
                    <p>{messageContent.message}</p>
                  </div>
                  <div className="message-meta">
                    <p id="time">{messageContent.time}</p>
                    <p id="author">{messageContent.author}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={currentMessage}
          placeholder="Hey..."
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  );
}

export default Chat;