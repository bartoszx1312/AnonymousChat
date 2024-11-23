export default function ClearButton({ onClear }) {
    return (
        <div className="flex justify-end">
            <button
                onClick={onClear}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors text-sm"
            >
                Anonymous Clear
            </button>
        </div>
    );
}
