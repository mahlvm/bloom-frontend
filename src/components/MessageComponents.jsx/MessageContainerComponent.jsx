import React, { useState, useEffect } from "react";
import { Container, Card, Form, Button } from 'react-bootstrap';
import "./MessageComponents.css";
import { getMessagesById, sendMessage } from "../../services/messages";
import io from "socket.io-client";
const socket = io("http://localhost:5001");

function MessageContainer({ messageManager, userDetails }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [roomInfo, setRoomInfo] = useState("");
  const [token, setToken] = useState(window.localStorage.getItem("token"));


  useEffect(() => {
    const fetchData = async () => {
      try {
        if (messageManager.id) {
          const messagesData = await getMessagesById(messageManager.id, token);
          setMessages(messagesData);
        } 
      } catch (err) {
        console.error('Error:', err);
      }
    };
    fetchData();

    if (messageManager.sender_id && messageManager.recipient_id) {
      socket.emit('join', { user_id: messageManager.sender_id, receiver_id: messageManager.recipient_id });

      socket.on('new_messages', (data) => {
        setMessages(data.messages);
      });

      socket.on('joined_room', (data) => {
        setRoomInfo(data.message); 
      });

      return () => {
        socket.off('new_messages');
        socket.off('joined_room');
      };
    }
  }, [messageManager, userDetails]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!messageManager.id) {
      // Call the API to create a new chat, then send the message
      try {
        const newChat = await sendMessage(messageManager.sender_id, messageManager.recipient_id, messageManager.receiver_username, userDetails.username, newMessage, token);
        socket.emit('message', { 
          message: newMessage, 
          chatId: newChat.id,
          sender: userDetails.username, 
          receiver: messageManager.recipient_id,
        });
        setNewMessage(""); 
      } catch (error) {
        console.error('Error creating new chat or sending message:', error);
      }
    } else {
      console.log("HERE NOW")
      try {
        await sendMessage(
          messageManager.sender_id,
          messageManager.recipient_id,
          messageManager.receiver_username,
          userDetails.username,
          newMessage,
          token
        );
        socket.emit('message', { 
          message: newMessage, 
          chatId: messageManager.id, 
          sender: userDetails.username, 
          receiver: messageManager.recipient_id,
        });
        setNewMessage(""); 

      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };
    
  const renderMessage = (messageObj, idx) => {
  
    try {
      const parsedMessage = JSON.parse(messageObj); // Parse the message string into an object
      return (
        <div key={idx} className="message-bubble">
          <strong>{parsedMessage.sender === userDetails?.username ? "You" : parsedMessage.sender}:</strong> {parsedMessage.message}
        </div>
      );
    } catch (e) {
      console.error('Error parsing message:', e);
      return (
        <div key={idx} className="message-bubble">
          {messageObj} 
        </div>
      );
    }
  };

  return (
    <Container className="message-container">
      <div className="message">
        {messages.map((messageObj, index) => (
          <Card key={index} className="message-card">
            <Card.Header>Messages from {messageManager?.receiver_username}</Card.Header>
            <Card.Body>
              {Array.isArray(messageObj.message) ? messageObj.message.map(renderMessage) : renderMessage(messageObj.message)}
            </Card.Body>
          </Card>
        ))}
        <Form onSubmit={handleSendMessage}>
          <div className="input-group mb-3">
            <Form.Control
              type="text"
              placeholder="Write a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="message-input-field"
            />
            <Button variant="primary" type="submit" className="send-button">
              Send
            </Button>
          </div>
        </Form>
      </div>        
    </Container>
  );
}

export default MessageContainer;
