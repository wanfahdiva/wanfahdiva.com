type YouTubeProps = {
  id: string
}

export const YouTube = ({ id }: YouTubeProps) => {
  return (
    <div>
      <iframe
        src={`https://www.youtube.com/embed/${id}`}
        allow='autoplay; encrypted-media'
        title='Embedded YouTube video'
        className='h-96 w-full'
      />
    </div>
  )
}
