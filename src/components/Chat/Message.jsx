export default function Message({ message, isOwnMessage }) {
    if (message.isSystemMessage) {
        return (
            <div className="flex flex-col items-center my-4">
                <div className="px-4 py-2 bg-gray-100 text-gray-600 rounded-full text-sm">
                    {message.text}
                </div>
            </div>
        );
    }

    return (
        <div className={`flex flex-col ${isOwnMessage ? 'items-end' : 'items-start'}`}>
            <div className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                isOwnMessage 
                    ? 'bg-blue-500 text-white ml-auto' 
                    : 'bg-white text-gray-800 mr-auto'
            } shadow-sm`}>
                <div className="text-xs opacity-75 mb-1">{message.sender}</div>
                <div>{message.text}</div>
            </div>
        </div>
    );
}
