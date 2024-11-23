import { useState, useEffect } from 'react';
import UsernamePrompt from './UsernamePrompt';
import ChatContainer from './ChatContainer';
import ClearButton from './ClearButton';

export default function Chat() {
    const [messages, setMessages] = useState([]);
    const [username, setUsername] = useState('');
    const [showUsernamePrompt, setShowUsernamePrompt] = useState(true);

    useEffect(() => {
        const loadMessages = () => {
            const savedMessages = localStorage.getItem('sharedChatMessages');
            if (savedMessages) {
                try {
                    setMessages(JSON.parse(savedMessages));
                } catch (e) {
                    console.error('Error loading messages:', e);
                    setMessages([]);
                }
            }
        };

        loadMessages();

        window.addEventListener('storage', (e) => {
            if (e.key === 'sharedChatMessages') {
                loadMessages();
            }
        });

        return () => window.removeEventListener('storage', loadMessages);
    }, []);

    useEffect(() => {
        if (messages.length > 0) {
            localStorage.setItem('sharedChatMessages', JSON.stringify(messages));
        }
    }, [messages]);

    useEffect(() => {
        const handleStorageChange = (e) => {
            if (e.key === 'chatCleared') {
                setMessages([{
                    text: 'Chat has been anonymously cleared.',
                    sender: 'System',
                    timestamp: new Date().toISOString(),
                    isSystemMessage: true
                }]);
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    const handleClearChat = () => {
        if (window.confirm('Are you sure you want to clear the entire chat history?')) {
            setMessages([{
                text: 'Chat has been anonymously cleared.',
                sender: 'System',
                timestamp: new Date().toISOString(),
                isSystemMessage: true
            }]);
            localStorage.setItem('sharedChatMessages', JSON.stringify([{
                text: 'Chat has been anonymously cleared.',
                sender: 'System',
                timestamp: new Date().toISOString(),
                isSystemMessage: true
            }]));
            localStorage.setItem('chatCleared', Date.now().toString());
            setTimeout(() => localStorage.removeItem('chatCleared'), 100);
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto p-4 space-y-4">
            <ClearButton onClear={handleClearChat} />
            
            {showUsernamePrompt ? (
                <UsernamePrompt 
                    onSubmit={(name) => {
                        setUsername(name);
                        setShowUsernamePrompt(false);
                    }} 
                />
            ) : (
                <ChatContainer 
                    messages={messages}
                    setMessages={setMessages}
                    username={username}
                />
            )}
        </div>
    );
}
