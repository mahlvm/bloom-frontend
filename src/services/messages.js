// docs: https://vitejs.dev/guide/env-and-mode.html
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const getAllMessagesByUserId = async (userId, token) => {

    const requestOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    };
    const response = await fetch(`${BACKEND_URL}/messages/user/${userId}`, requestOptions);

    if (response.status === 200) {
        const data = await response.json();
        // console.log("Messages loaded ");
        return data;
    } else {
        const errorResponse = await response.json();
        console.error('Full error response:', errorResponse);
        throw new Error(`Error fetching messages: ${errorResponse}`);
    }
}

export const getMessagesById = async (chat_id, token) => {
    const requestOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`          
        },

    };
    const response = await fetch(`${BACKEND_URL}/messages/${chat_id}`, requestOptions);

    if (response.status === 200) {
        const data = await response.json();
        // console.log("Messages loaded ");
        return data;
    } else {
        const errorResponse = await response.json();
        console.error('Full error response:', errorResponse);
        throw new Error(`Error fetching messages: ${errorResponse}`);
    }
}

export const sendMessage = async (userId, receiverId, receiver_username, sender_username, messageContent, token) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        userId: userId,
        receiverId: receiverId,
        receiver_username:receiver_username,
        sender_username:sender_username,
        content: messageContent,
        }),
    };

    try {
      const response = await fetch(`${BACKEND_URL}/messages`, requestOptions);
      if (response.ok) {
        const data = await response.json();
        // console.log("Message sent: ", data);
        return data;
      } else {
        const errorResponse = await response.json();
        console.error('Error sending message:', errorResponse);
        throw new Error(`Error sending message: ${errorResponse.message}`);
      }
    } catch (error) {
      console.error('Network error when sending message:', error);
      throw new Error(`Network error when sending message: ${error.message}`);
    }
  };



