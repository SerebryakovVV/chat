import { useState, useEffect } from 'react'
import Messages from './Messages';
import { socket } from './socket';


function App() {
  	const [name, setName] = useState("");
	const [room, setRoom] = useState("");
  	const [isMenu, setIsMenu] = useState(true);

  	const joinRoom = () => {
		socket.emit("join", {name, room});
		setIsMenu(false);
  	}
  
  	return (
    <>
      	{isMenu ? 
		<div className='bg-zinc-200 w-screen h-screen flex items-center justify-center'>
			<div className='shadow-xl border border-black rounded-md w-96 bg-white flex flex-col items-center'>
				<input 	
				className='border border-black rounded-md w-3/4 mt-10 mb-10 p-1'
				type="text"
				value={name}
				placeholder="Name" 
				onChange={(e)=>setName(e.target.value)}/>
				<input 
				className='border border-black rounded-md w-3/4 mb-10 p-1'
				type="text" 
				value={room} 
				placeholder="Room"
				onChange={(e)=>setRoom(e.target.value)}/>
				<button 
				className='mb-5 px-2 py-1 rounded-md bg-white hover:bg-blue-300 border-2 border-blue-300'
				onClick={joinRoom}>Join</button>
			</div>
      	</div> 
      	: 
        <Messages socket={socket} room={room} user={name} setIsMenu={setIsMenu}/>
    	}
    </>
  )
}

export default App
