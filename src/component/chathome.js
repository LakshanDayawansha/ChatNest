import React, { useState, useEffect } from 'react';
import MessageList from './messegelist.js';
import MessageInput from './messageinput.js';
import UserList from './userlist.js';
import ReceiverDetails from './receiverdetails.js';
import { auth, firestore } from './firebase.js';
import { collection, getDocs, getDoc, setDoc, doc, addDoc, query, where, orderBy,onSnapshot } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import './chathome.css'

const ChatHome = () => {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]); // Example users
  const [chatSelected, setChatSelected] = useState(false);
  const [chatUser, setChatUser] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [messageListener, setMessageListener] = useState(null);  


  useEffect(() => {
    const fetchUsers = async () => {
      const userCollection = await getDocs(collection(firestore, "users"));
      const userlist = userCollection.docs.map(doc => doc.data());
      setUsers(userlist)
    };



    fetchUsers();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUserId(user.uid);
      } else {
        setCurrentUserId(null);
      }
    });

    return () => unsubscribe();


  }, []);




  useEffect(() => {
    if (chatUser && chatSelected){
      if (messageListener){
        messageListener();
      }

    const chatId = getChatId(currentUserId,chatUser.uid)  
    const messageCollection = collection(firestore, "chats", chatId, "messages");
    const messageQuery = query(messageCollection, orderBy("timestamp", "asc"));
    const unsubscribe = onSnapshot(messageQuery,(snapshot) => {
      const messageList = snapshot.docs.map(doc => doc.data());
      setMessages(messageList);
    });
      
    setMessageListener(() => unsubscribe);

    }
    return () => {
      if (messageListener){
        messageListener();
      }
    };
  },[chatUser,chatSelected,currentUserId])






  useEffect(() => {
    if (currentUserId) {

      console.log('Current user ID:', currentUserId);
    }
  }, [currentUserId]);


  





  useEffect(() => {
    if (chatUser) {
      console.log('Selected chat user:', chatUser);
    }
  }, [chatUser]);






  function removeCurrentUser(arr, userId) {
    return arr.filter(user => user.uid !== userId);
  }







  const addMessage = (message) => {
    setMessages([...messages, message]);
    uploadMessage(message);
  };




  const getChatId = (userId1, userId2) => {
    return [userId1, userId2].sort().join('_')
  }




  const uploadMessage = async (text) => {
    const chatId = getChatId(currentUserId, chatUser.uid);
    const messageCollection = collection(firestore, "chats", chatId, "messages");
    const newMessage = {
      senderId: currentUserId,
      receiverId: chatUser.uid,
      text: text,
      timestamp: new Date()
    };
    await addDoc(messageCollection, newMessage);
  }




  const fetchMessages = async (chatId) => {
    const messageCollection = collection(firestore, "chats", chatId, "messages");
    const messageQuery = query(messageCollection, orderBy("timestamp", "asc"));
    const messageSnapshot = await getDocs(messageQuery);
    const messageList = messageSnapshot.docs.map(doc => doc.data());
    return messageList;
  }





  const handleUserClick = async (user) => {
    setChatUser(user);
    setChatSelected(true);
  }






  return (
    <div className="chat-room">
      <div className="sidebar">
        <UserList users={removeCurrentUser(users, currentUserId)} onUserClick={handleUserClick} />
      </div>
      {chatSelected && (
        <div className="main-content">
          <ReceiverDetails chatUser = {chatUser}/>
          <MessageList messages={messages} currentUserId={currentUserId} />
          <MessageInput addMessage={addMessage}  />
        </div>
      )}
    </div>
  );
};

export default ChatHome;
