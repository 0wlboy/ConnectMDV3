
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

return (
  <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
    <div className="relative top-20 mx-auto p-5 border w-full max-w-md lg:max-w-2xl shadow-lg rounded-md bg-white">
      <div className="flex justify-end items-center">
        <button
          onClick={onClose}
          className="text-2xl text-gray-500 hover:text-gray-700 cursor-pointer"
        >
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
