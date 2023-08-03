export const H3 = ({ children }: { children?: any }) => {
  return (
    <h3 id={children?.props?.href.replace('#', '')}>
      {children?.props?.children}
    </h3>
  )
}
