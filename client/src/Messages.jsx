import React from 'react'
import { useState, useEffect } from 'react'

export default function Messages({socket, room, user, setIsMenu}) {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("")

    useEffect(()=>{
        socket.on("receive", (data)=>{
            setMessages((m)=>[...m, data]);
        })
        return () => {
            socket.off('receive'); 
          };
    }), [socket];

    const send = () => {
        if (newMessage.length > 0) {
            let min = new Date(Date.now()).getMinutes()
            if (min < 10) {min = "0" + min}
            const time = new Date(Date.now()).getHours() + ":" +  min;
            const data = {
                message:newMessage, 
                room, 
                user, 
                time
            }
            socket.emit("send", data);
            setMessages((m)=>[...m, data]);
            setNewMessage("");
        }
    }

    const leave = () => {
        socket.emit("leave", room);
        setIsMenu(true);
    }

    return (
        <div className='relative flex flex-col w-screen h-screen bg-zinc-200 pb-11'>
            <div className='overflow-y-auto flex-1 flex flex-col'>
            {messages.map((m)=>{
            return(
                    <div className={` ${m.user == user ? "bg-blue-200" : "bg-white"}  inline-block max-w-96   ml-5 my-3 p-3 rounded-md shadow-md`}>
                        <div className='font-bold mb-2'>{m.user}</div>
                        <div className='text-xl break-words'>{m.message}</div>
                        <div className='text-right text-xs'>{m.time}</div>
                    </div>
                );
            })}
            </div>
            <div className='absolute bottom-0 h-12 w-full bg-white flex items-center'>
                <button 
                className='border-2 border-red-300 rounded-md px-2 m-1 hover:bg-red-300'
                onClick={leave}>Leave</button>
                <input 
                    className='flex-1 mx-4 px-2 h-10'
                    type="text" 
                    placeholder='Message' 
                    value={newMessage} 
                    onChange={e=>setNewMessage(e.target.value)}/>
                <button 
                className='border-2 border-blue-300 rounded-md px-2 m-1 hover:bg-blue-300'
                onClick={send}>Send</button>
            </div>
        </div>
    )
}