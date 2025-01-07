import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './Chat.css'; // Import CSS file for styling
import arrowIcon from './assets/img/arrow_upward_alt.svg';
import studini from './assets/img/studini.png';
import studyfox from './assets/img/StudyFox.svg';
import ReactDOM from 'react-dom';

function Chat() {
  // State variables to manage messages, input, and theme
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  // Function to toggle theme
  const toggleTheme = () => {
    setIsDarkTheme((prevTheme) => !prevTheme);
  };

  // Function to send a message
  const sendMessage = async () => {
    if (input.trim() === '') return; // Do nothing if input is empty

    const userMessage = { sender: 'user', text: input };
    setMessages([...messages, userMessage]); // Add user message to state

    try {
      // Send user message to the server
      const response = await axios.post('https://team-11-p90t.onrender.com:5000', {
        message: input,
      });

      console.log('Antwort vom Server:', response.data.response); // Debugging

      const botMessage = { sender: 'bot', text: response.data.response };
      setMessages((prevMessages) => [...prevMessages, botMessage]); // Add bot response to state
    } catch (error) {
      console.error('Fehler beim Senden der Nachricht:', error);
      const errorMessage = error.response?.data?.error || 'Ein Fehler ist aufgetreten.';
      const botMessage = { sender: 'bot', text: errorMessage };
      setMessages((prevMessages) => [...prevMessages, botMessage]); // Add error message to state
    }

    setInput(''); // Clear input field
  };

  return (
    <div className={`body ${isDarkTheme ? 'dark-theme' : 'light-theme'}`}>
      <div className="container">
        <header className="header">
        <button onClick={toggleTheme} className="theme-button">
          {isDarkTheme ? 'Studini' : 'Studyfox'}
        </button>
          <div className="header-img-container"><img className="header-img" src={/*studini*/studyfox} alt="Senden" /></div>
            <h1>StudyFox hilft dir!</h1>
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
          <div className="input-img-container"><img className="input-img" src={/*studini*/studyfox} alt="Senden" /></div>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                className="input"
                placeholder="Beginne hier zu tippen..."
            />
            <button onClick={sendMessage} className="button"><img src={arrowIcon} alt="Senden" /></button>
        </div>
      </div>
        <footer className="footer">
            <p>&copy; 2025 StudyFox-Inc. Alle Rechte vorbehalten. Build 0.2.1</p>
        </footer>
    </div>
);
}

export default Chat;
