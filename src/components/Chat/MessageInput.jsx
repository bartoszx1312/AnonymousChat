import { useState, useRef, useEffect } from 'react';
import EmojiPicker from 'emoji-picker-react';

export default function MessageInput({ onSend, username, setTypingUsers }) {
    const [newMessage, setNewMessage] = useState('');
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const typingTimeoutRef = useRef(null);

    const handleTyping = (e) => {
        setNewMessage(e.target.value);
        
        if (!isTyping) {
            setIsTyping(true);
            localStorage.setItem('typingUser', username);
        }

        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }

        typingTimeoutRef.current = setTimeout(() => {
            setIsTyping(false);
            localStorage.removeItem('typingUser');
        }, 2000);
    };

    useEffect(() => {
        const handleStorageChange = (e) => {
            if (e.key === 'typingUser' && e.newValue && e.newValue !== username) {
                setTypingUsers(prev => new Set(prev).add(e.newValue));
            } else if (e.key === 'typingUser' && !e.newValue) {
                setTypingUsers(prev => {
                    const newSet = new Set(prev);
                    newSet.delete(e.oldValue);
                    return newSet;
                });
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, [username, setTypingUsers]);

    const handleSend = () => {
        if (newMessage.trim()) {
            onSend(newMessage);
            setNewMessage('');
            setIsTyping(false);
            localStorage.removeItem('typingUser');
            if (typingTimeoutRef.current) {
                clearTimeout(typingTimeoutRef.current);
            }
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="border-t p-4">
            <div className="relative flex gap-2">
                <textarea
                    value={newMessage}
                    onChange={handleTyping}
                    onKeyPress={handleKeyPress}
                    placeholder="Type a message..."
                    className="flex-1 resize-none rounded-md border border-gray-300 p-2 focus:outline-none focus:border-blue-500"
                    rows="1"
                />
                <button
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    className="px-3 py-2 text-gray-500 hover:text-gray-700"
                    type="button"
                >
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="24" 
                        height="24" 
                        viewBox="0 0 24 24" 
                        fill="currentColor"
                        className="text-gray-600"
                    >
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-6c.78 2.34 2.72 4 5 4s4.22-1.66 5-4H7zm8-4c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1zm-6 0c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1z"/>
                    </svg>
                </button>
                <button 
                    onClick={handleSend} 
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                >
                    Send
                </button>
                
                {showEmojiPicker && (
                    <div className="absolute bottom-full right-0 mb-2">
                        <EmojiPicker
                            onEmojiClick={(emojiObject) => {
                                setNewMessage(prev => prev + emojiObject.emoji);
                                setShowEmojiPicker(false);
                            }}
                            width={300}
                            height={400}
                            theme="light"
                            emojiStyle="apple"
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
