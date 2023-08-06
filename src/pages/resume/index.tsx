import Seo from '@/components/SEO'

export default function ResumePage() {
  return (
    <>
      <Seo templateTitle='Resume' />
      <div className='h-screen'>
        <embed src='/resume.pdf' width='100%' height='100%' />
      </div>
    </>
  )
}
