export default function TypingIndicator({ username }) {
    return (
        <div className="flex flex-col items-start">
            <div className="max-w-[70%] rounded-2xl px-4 py-2 bg-white text-gray-800 mr-auto shadow-sm">
                <div className="text-xs opacity-75 mb-1">{username}</div>
                <div className="flex space-x-1">
                    {[0, 1, 2].map((i) => (
                        <span
                            key={i}
                            className="w-2 h-2 bg-gray-400 rounded-full"
                            style={{
                                animation: 'softBounce 1s ease-in-out infinite',
                                animationDelay: `${i * 120}ms`
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
