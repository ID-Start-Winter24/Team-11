import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './Chat.css'; // Import CSS file for styling
import arrowIcon from './assets/img/arrow_upward_alt.svg';
import ReactDOM from 'react-dom';

function Chat() {
  // State variables to manage messages, input, and theme
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [suggestions, setSuggestions] = useState(['Wie kann ich dir helfen?', 'Zeige mir Beispiele!', 'Was kann ich hier machen?']);
  const [showStartPage, setShowStartPage] = useState(true);

  // Ref for autoscrolling
  const chatWindowRef = useRef(null);

  // Scroll to the bottom whenever messages update
  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages]);

  // Function to toggle theme
  const toggleTheme = () => {
    setIsDarkTheme((prevTheme) => !prevTheme);
  };

  // Function to send a message
  const sendMessage = async () => {
    if (input.trim() === '') return; // Do nothing if input is empty

    const userMessage = { sender: 'user', text: input };
    setMessages([...messages, userMessage]); // Add user message to state

    // Hide suggestions after the first message
    if (messages.length === 0) {
      setSuggestions([]);
    }

    try {
      // Send user message to the server
      const response = await axios.post('http://localhost:5000/chat', {
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

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
  };

  if (showStartPage) {
    return (
      <div className="start-page">
        <h1>Willkommen bei StudyBot!</h1>
        <button onClick={() => setShowStartPage(false)} className="start-button">Los geht's</button>
      </div>
    );
  }

  return (
    <div className={`body ${isDarkTheme ? 'dark-theme' : 'light-theme'}`}>
      <div className="container">
        <header className="header">
          <div className="header-img-text">
            <div className="header-img-container"></div>
            <h1>Finde dein Traumstudium!</h1>
          </div>
          <button onClick={toggleTheme} className="theme-button">
            {isDarkTheme ? 'Wechsle zu Studini' : 'Wechsle zu StudyFox'}
          </button>
        </header>
        {suggestions.length > 0 && (
          <div className="suggestions">
            {suggestions.map((suggestion, index) => (
              <button key={index} className="suggestion-button" onClick={() => handleSuggestionClick(suggestion)}>
                {suggestion}
              </button>
            ))}
          </div>
        )}
        <div className="chat-window" ref={chatWindowRef}>
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
          <div className="input-img-container"></div>
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
        <p>&copy; 2025 StudyBot-Inc. Alle Rechte vorbehalten. Build 0.5</p>
      </footer>
    </div>
  );
}

export default Chat;
