import * as FontAwesome5 from "react-icons/fa";
import * as FontAwesome6 from "react-icons/fa6";
import * as FontAwesomeIm from "react-icons/im";
import * as FontAwesomeMd from "react-icons/md";

const SelectInput = ({ icon, id, options, value, onChange, placeholder }) => {
  const Icon = icon
    ? FontAwesome5[icon] || FontAwesome6[icon] || FontAwesomeIm[icon] || FontAwesomeMd[icon]
    : null;

  if (icon && !Icon) {
    console.error(`Icon "${icon}" not found in react-icons/fa`);
    return null;
  }

  return (
    <>
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
            <Icon className="text-blue-950" />
          </div>
        )}
        <select
          id={id}
          onChange={onChange}
          className="bg-blue-100 border border-gray-300 text-blue-950 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  ps-10 p-2.5"
          placeholder={placeholder}
          value={value}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}

          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default SelectInput;
