import * as FontAwesome5 from "react-icons/fa";
import * as FontAwesome6 from "react-icons/fa6";
import * as FontAwesomeMd from "react-icons/md";
import * as FontAwesomeIm from "react-icons/im";

const Input = ({
  icon,
  id,
  type,
  placeholder,
  onChange = null,
  onKeyDown = null,
  value = "",
  required = true,
}) => {
  const Icon = icon ? FontAwesome5[icon] || FontAwesome6[icon] || FontAwesomeIm[icon] || FontAwesomeMd[icon] : null;

  if (icon && !Icon) {
    console.error(`Icon "${icon}" not found in react-icons/fa`);
    return null;
  }

  return (
    <div className="relative">
      {Icon && (
        <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
          <Icon className="text-blue-950" />
        </div>
      )}
      <input
        id={id}
        type={type}
        onChange={onChange}
        onKeyDown={onKeyDown}
        value={value}
        className="bg-blue-100 text-blue-950 text-sm font-semibold rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 "
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
};

export default Input;
