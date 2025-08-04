export default function Textarea(id, rows = "4", styles="text-sm", onChange , placeholder = "Escribe tu descripcion") {
  return (
    <textarea
      id={id}
      rows={rows}
      onChange =  {onChange}
      className={` ${styles}  block p-2.5 w-full  bg-blue-50 text-blue-950 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 `}
      placeholder={placeholder}
    ></textarea>
  );
}
