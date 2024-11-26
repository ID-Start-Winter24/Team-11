// src/Chat.js
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (input.trim() === '') return;

    const userMessage = { sender: 'user', text: input };
    setMessages([...messages, userMessage]);

    try {
      const response = await axios.post('http://localhost:5000/chat', {
        message: input,
      });

      console.log('Antwort vom Server:', response.data.response); // Debugging

      const botMessage = { sender: 'bot', text: response.data.response };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Fehler beim Senden der Nachricht:', error);
      const errorMessage = error.response?.data?.error || 'Ein Fehler ist aufgetreten.';
      const botMessage = { sender: 'bot', text: errorMessage };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    }

    setInput('');
  };

  return (
      <div style={styles.container}>
      <header style={styles.header}>
        <h1>Mein Chatbot</h1>
      </header>
      <div className="chat-window" style={styles.chatWindow}>
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              ...styles.message,
              ...(msg.sender === 'user' ? styles.userMessage : styles.botMessage),
            }}
          >
            <p>{msg.text}</p>
          </div>
        ))}
      </div>
      <div style={styles.inputContainer}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          style={styles.input}
          placeholder="Gib eine Nachricht ein..."
        />
        <button onClick={sendMessage} style={styles.button}>Senden</button>
      </div>
    </div>
  );
}

// Einfache Inline-Styles für bessere Sichtbarkeit
const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      maxWidth: '1000px',
      margin: '0 auto',
      border: '1px solid #ccc',
      borderRadius: '8px',
      overflow: 'hidden',
      fontFamily: 'Arial, sans-serif',
    },
    header: {
      backgroundColor: '#4C8DAA',
      color: 'white',
      padding: '15px',
      textAlign: 'center',
    },
  chatWindow: {
    border: '1px solid #ccc',
    padding: '10px',
    height: '400',
    overflowY: 'scroll',
    marginBottom: '10px',
  },
  message: {
    padding: '5px 10px',
    borderRadius: '10px',
    margin: '5px 0',
    maxWidth: '80%',
  },
  userMessage: {
    backgroundColor: '#DCF8C6',
    alignSelf: 'flex-end',
    marginLeft: 'auto',
  },
  botMessage: {
    backgroundColor: '#F1F0F0',
    alignSelf: 'flex-start',
    marginRight: 'auto',
  },
  inputContainer: {
    display: 'flex',
  },
  input: {
    flex: 1,
    padding: '10px',
    fontSize: '16px',
  },
  button: {
    padding: '10px',
    fontSize: '16px',
  },
};

export default Chat;
