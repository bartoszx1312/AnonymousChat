import { useState } from 'react';

export default function UsernamePrompt({ onSubmit }) {
    const [username, setUsername] = useState('');

    const handleSetUsername = () => {
        if (username.trim()) {
            onSubmit(username);
        } else {
            alert('Please enter a valid username');
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex gap-2">
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username..."
                    className="flex-1 rounded-md border border-gray-300 p-2 focus:outline-none focus:border-blue-500"
                />
                <button
                    onClick={handleSetUsername}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                >
                    Set Username
                </button>
            </div>
        </div>
    );
}
