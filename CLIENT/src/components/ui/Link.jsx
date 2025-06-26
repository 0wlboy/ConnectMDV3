const Links = ({ href, children, ...props }) => {
  return (
    <a
      href={href}
      className="text-sm text-blue-600 cursor-pointer hover:underline "
      {...props}
    >{children}</a>
  )
}

export default Links;