import ButtonLink from '@/components/Links/ButtonLink'

export const GetInTouch: React.FC = () => {
  return (
    <div className='mx-auto flex h-screen max-w-6xl items-center justify-center py-5 md:py-10'>
      <div className='flex max-w-xl flex-col items-center justify-center space-y-5'>
        <h1 className='!font-saoldisplay text-4xl font-semibold'>
          Let&apos;s make your Website shine.
        </h1>
        <p className='text-center text-lg'>
          Although I’m not currently looking for any new opportunities, my inbox
          is always open. Whether you have a question or just want to say hi,
          I’ll try my best to get back to you!
        </p>
        <ButtonLink href='maito:wanfahdivaa@gmail.com' variant='light'>
          Say Hello
        </ButtonLink>
      </div>
    </div>
  )
}
