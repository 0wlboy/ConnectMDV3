const Label = ({ children, htmlFor, className }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`block mb-2 text-sm font-bold text-blue-950 ${className}`}
    >
      {children}
    </label>

  )
}

export default Label;