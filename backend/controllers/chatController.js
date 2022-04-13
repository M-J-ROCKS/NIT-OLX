const Chat = require('../models/chatModel');
const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');

const accessChat = asyncHandler(async (req, res) => {
    const { sellerId,receiverId } = req.body;
    console.log(sellerId)
    let room_alloted=""
    if(sellerId>receiverId)
    {
        room_alloted=sellerId+" "+receiverId
    }
    else{
        room_alloted=receiverId+" "+sellerId
    }
    console.log('Room Alloted is:-',room_alloted)

    const room_given=await Chat.findOne({room_id:room_alloted})
    if(room_given)
    {
        console.log("heelo:",room_given)
        res.json({
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
              },
            room_id:room_given.room_id,
            messages:room_given.messages,
        })

    }
    else{
        const room_to_be_alloted=await Chat.create({
            room_id:room_alloted,
        })
        if(room_to_be_alloted)
        {
            res.json({
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                  },
                room_id:room_to_be_alloted.room_id,
                messages:room_to_be_alloted.messages,
            })

        }
        else{
            throw new Error("Room not Alloted");
        }
    }
});

const updateChat=asyncHandler(async(req,res)=>{
    const {room_id,messages}=req.body
    const available = await Chat.findOne({room_id});
    if (available) {
        available.room_id = room_id || available.room_id;
        available.messages = messages || available.messages;
        console.log('Room-id:',available)
        const updatedUser = await available.save();
        res.json({
            room_id:updatedUser.room_id,
            messages:updatedUser.messages,
        });
    }

})
module.exports = { updateChat,accessChat};