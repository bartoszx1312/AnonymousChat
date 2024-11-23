import Message from './Message';
import TypingIndicator from './TypingIndicator';

export default function MessageList({ messages, username, typingUsers, messagesEndRef }) {
    return (
        <div className="h-96 overflow-y-auto p-4 space-y-2">
            {messages.map((message, index) => (
                <Message 
                    key={index}
                    message={message}
                    isOwnMessage={message.sender === username}
                />
            ))}

            {typingUsers.size > 0 && (
                <TypingIndicator username={Array.from(typingUsers)[0]} />
            )}

            <div ref={messagesEndRef} />
        </div>
    );
}
