export const H2 = ({ children }: { children?: any }) => {
  return (
    <h2 id={children?.props?.href.replace('#', '')}>
      {children?.props?.children}
    </h2>
  )
}
