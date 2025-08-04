const Links = ({ href, styles = "text-sm" , children, ...props }) => {
  return (
    <a
      href={href}
      className={`${styles} text-blue-600 cursor-pointer hover:underline `}
      {...props}
    >{children}</a>
  )
}

export default Links;