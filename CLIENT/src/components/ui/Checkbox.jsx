const Checkbox = ({id, label, checked, onChange }) => {
  return (
    <div className="flex items-center mb-4">
      <div className="flex items-center h-5">
        <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="w-4 h-4 text-blue-600 bg-gray-100 border-blue-950 rounded focus:ring-blue-500 focus:ring-2 cursor-pointer" 
      />
      </div>
      
      <label htmlFor={id} className="ml-2 text-sm font-semibold text-blue-950">
        {label}
      </label>
    </div>
  ); 
}

export default Checkbox;