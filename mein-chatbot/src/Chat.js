// src/Chat.js
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './Chat.css'; // Importiere die CSS-Datei
import arrowIcon from './assets/img/arrow_upward_alt.svg';
import studini from './assets/img/studini.png';

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
    <div className="body">
      <div className="container">
        <header className="header">
          <div className="header-img-container"><img className="header-img" src={studini} alt="Senden" /></div>
            <h1>Studini hilft dir!</h1>
        </header>
        <div className="chat-window">
            {messages.map((msg, index) => (
                <div
                    key={index}
                    className={`message ${msg.sender === 'user' ? 'user-message' : 'bot-message'}`}
                >
                    <p>{msg.text}</p>
                </div>
            ))}
        </div>
        <div className="input-container">
          <div className="input-img-container"><img className="input-img" src={studini} alt="Senden" /></div>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                className="input"
                placeholder="Beginne hier zu tippen..."
            />
            <button onClick={sendMessage} className="button"><img src={arrowIcon} alt="Senden" /></button>
        </div>
      </div>
        <footer className="footer">
            <p>&copy; 2024 Studini-Inc. Alle Rechte vorbehalten. Build 0.2.1</p>
        </footer>
    </div>
);
}



export default Chat;
