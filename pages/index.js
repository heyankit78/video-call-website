import { useSocket } from "@/context/socket";
import { useEffect } from "react";

export default function Home() {
  const socket = useSocket();
  // console.log("socket",socket);
  
  useEffect(()=>{
    socket?.on('connect',()=>{
      console.log(socket.id);
    })
  },[socket])
  return (
    <div>Hi</div>
  );
}
