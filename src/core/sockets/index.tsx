// import { createContext, useContext, useEffect } from "react";
// import { io } from "socket.io-client";

// type SocketContextType = {
//   isConnected: boolean;
//   connect: () => void;
//   disconnect: () => void;
//   onConnect: (callback: () => void) => void;
//   onDisconnect: (callback: () => void) => void;
//   onNewMessage: (callback: (data: any) => void) => void;
//   onMessageRead: (callback: (data: any) => void) => void;
//   emitSendMessage: (data: any) => void;
//   emitReadChat: (data: any) => void;
//   onlineUsers: (callback: (data: any) => void) => void;
// };

// export const socketContext = createContext<SocketContextType | undefined>(
//   undefined
// );

// export const useSocket = () => {
//   const context = useContext(socketContext);

//   if (!context) {
//     throw new Error("useSocket must be used within a ChatsProvider");
//   }

//   return context;
// };

// const ChatsProvider = ({ children, url, requireAuth, token }) => {
//   const socket = io(url, {
//     auth: requireAuth && {
//       token,
//     },
//   });

//   const connect = () => {
//     socket?.connect();
//   };

//   const disconnect = () => {
//     socket?.disconnect();
//   };

//   const emit = (event: string, data) => {
//     socket?.emit(event, data);
//   };

//   const onConnect = (callback: () => void) => {
//     socket?.on("connect", callback);
//   };

//   const onDisconnect = (callback: () => void) => {
//     socket?.on("disconnect", callback);
//   };

//   const onNewMessage = (callback: (data: any) => void) => {
//     socket?.on("new-message", callback);
//   };

//   const onMessageRead = (callback: (data: any) => void) => {
//     socket?.on("message-read", callback);
//   };

//   const onlineUsers = (callback: (data: any) => void) => {
//     socket?.on("online", callback);
//   };

//   const emitSendMessage = (data: any) => {
//     emit("send-message", data);
//   };

//   const emitReadChat = (data: any) => {
//     emit("read-chat", data);
//   };

//   useEffect(() => {
//     onConnect(() => {
//       console.log("Connected to chat server");
//     });

//     connect();

//     return () => {
//       console.log("Disconnecting from server");

//       disconnect();
//     };
//   }, [socket]);

//   return (
//     <socketContext.Provider
//       value={{
//         isConnected: socket.connected,
//         connect,
//         disconnect,
//         onConnect,
//         onDisconnect,
//         onNewMessage,
//         onMessageRead,
//         emitSendMessage,
//         emitReadChat,
//         onlineUsers,
//       }}
//     >
//       {children}
//     </socketContext.Provider>
//   );
// };

// export default ChatsProvider;
