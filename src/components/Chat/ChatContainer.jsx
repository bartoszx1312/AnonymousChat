// src/components/Chat/ChatContainer.jsx
import { useState, useEffect, useRef } from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

export default function ChatContainer({ messages, setMessages, username }) {
    const [typingUsers, setTypingUsers] = useState(new Set());
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, typingUsers]);

    return (
        <div className="bg-gray-100 rounded-lg shadow-md">
            <MessageList 
                messages={messages}
                username={username}
                typingUsers={typingUsers}
                messagesEndRef={messagesEndRef}
            />
            <MessageInput 
                onSend={(text) => {
                    const newMessageObj = { 
                        text, 
                        sender: username,
                        timestamp: new Date().toISOString()
                    };
                    setMessages([...messages, newMessageObj]);
                }}
                username={username}
                setTypingUsers={setTypingUsers}
            />
        </div>
    );
}