
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold">Modal Title</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 cursor-pointer">
            &times;
          </button>
        </div>
        <div className="mt-2">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
