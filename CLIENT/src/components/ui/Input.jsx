const Input = ({icon, id, type, placeholder, onChange, required = true }) => {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
        <svg
          className="w-4 h-4 text-blue-950"
          aria-hidden="true"
          xmlns={icon}
          fill="currentColor"
          viewBox="0 0 20 16"
        >
          <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
          <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
        </svg>
      </div>
      <input
        id={id}
        type={type}
        onChange={onChange}
        className="bg-blue-50 text-blue-950 text-sm font-semibold rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 "
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
};

export default Input;
