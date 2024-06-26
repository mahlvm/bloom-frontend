import ChatListComponent from "../../components/MessageComponents.jsx/ChatListComponent"
import MessageContainer from "../../components/MessageComponents.jsx/MessageContainerComponent"
import { Container } from 'react-bootstrap';
import './MessagePage.css'
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getuserInformationById } from "../../services/users";
import NavbarComponent from "../../components/Navbar/NavbarComponent";

export const MessagePage = () => {
    const [selectedMessageId, setSelectedMessageId] = useState(null);
    const [userDetails, setUserDetails] = useState(null);
    const [receiverDetails, setreciverDetails] = useState(null)
    const [user_id, setuserID] = useState(window.localStorage.getItem("user_id"));

    // help_offer_user_id passed from StartChatButton
    const location = useLocation();
    const help_offer_user_id = location.state?.help_offer_user_id;
   

    useEffect(() => {
      const fetchUserDetails = async () => {
        try {
          const userData = await getuserInformationById(user_id);
          setUserDetails(userData);
    
          if (help_offer_user_id !== undefined) {
            const receiverMessageData = await getuserInformationById(help_offer_user_id);
            setreciverDetails(receiverMessageData);
          }
        } catch (err) {
          console.error('Error fetching user details:', err);
        }
      };
    
      fetchUserDetails();
    }, [user_id, help_offer_user_id]);
   

    const handleChatSelect = (msg) => {
        setSelectedMessageId(msg);
    };

    return (
      <>
        <NavbarComponent />
        <Container className="message-page-container">
            <ChatListComponent onChatSelect={handleChatSelect} receiverDetails={receiverDetails} senderUserID={help_offer_user_id} userDetails={userDetails} />
            {selectedMessageId && <MessageContainer messageManager={selectedMessageId} userDetails={userDetails} />}
      </Container>
      </>
    )
}