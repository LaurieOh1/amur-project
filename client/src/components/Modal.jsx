export default function Modal({ open, onClose, title, children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-sm w-full p-6">
        <h3 className="font-semibold text-lg mb-2">{title}</h3>
        <div className="text-sm text-gray-700">{children}</div>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
        >
          OK
        </button>
      </div>
    </div>
  );
}
