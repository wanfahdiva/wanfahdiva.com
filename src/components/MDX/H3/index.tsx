export const H3 = ({ children }: { children?: any }) => {
  return (
    <h3 id={children?.props?.href.replace('#', '')} className='hash-anchor'>
      <a>{children?.props?.children}</a>
    </h3>
  )
}
