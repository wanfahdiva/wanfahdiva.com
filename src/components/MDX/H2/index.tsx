export const H2 = ({ children }: { children?: any }) => {
  return (
    <h2 id={children?.props?.href.replace('#', '')} className='hash-anchor'>
      <a>{children?.props?.children}</a>
    </h2>
  )
}
