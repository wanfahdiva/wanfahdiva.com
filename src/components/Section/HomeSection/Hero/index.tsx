import clsx from 'clsx'
import Link from 'next/link'
import { HiDocumentText } from 'react-icons/hi'
import InView from 'react-intersection-observer'

import { ContainerLayout } from '@/components/Layout'
import ButtonLink from '@/components/Links/ButtonLink'

export const SectionHero: React.FC = () => {
  return (
    <ContainerLayout name='hero'>
      <InView triggerOnce rootMargin='-40% 0px'>
        {({ inView, ref }) => (
          <section
            className={clsx(
              'relative mx-7 flex h-[95vh] items-center justify-start md:mx-auto md:h-screen md:max-w-5xl md:py-10',
              inView && 'fade-in-start'
            )}
            ref={ref}
          >
            <div className='mt-3 flex flex-col items-center justify-start space-y-5 md:max-w-4xl'>
              <div className='flex w-full flex-col items-start justify-start'>
                <p className='inline font-medium !text-[#d4d4d4]' data-fade='3'>
                  Hi, my name is
                </p>
                <h1
                  className='text-4xl font-semibold md:text-6xl'
                  data-fade='5'
                >
                  Wanfah Diva.
                </h1>
                <h3
                  className='text-3xl font-semibold !text-[#BEBEBB] md:text-6xl'
                  data-fade='7'
                >
                  I build things for the web.
                </h3>
              </div>
              <div
                className='flex flex-col items-start justify-start space-y-7'
                data-fade='8'
              >
                <div className='w-full md:w-11/12'>
                  <p className='inline text-sm font-medium !text-[#d4d4d4] md:text-base'>
                    I am a Software Engineer with expertise in building Frontend
                    Developments.
                    <br className='hidden md:block' />
                    Presently, my focus lies in building accessible and
                    high-performance web applications at &nbsp;
                  </p>
                  <Link href='https://sawala.tech/' passHref>
                    <a
                      target='_blank'
                      className='text-sm font-semibold underline decoration-neutral-600 decoration-2 underline-offset-2 md:text-base'
                    >
                      PT. Sawala Technology Indonesia.
                    </a>
                  </Link>
                </div>
                <div
                  className='inline-flex items-center space-x-2 md:space-x-5'
                  data-fade='10'
                >
                  <ButtonLink
                    href='https://adinusa.id/media/files/cv/2021/08/11/Cv_compressed.pdf'
                    variant='light'
                    className='inline-flex items-center justify-center space-x-2'
                  >
                    <HiDocumentText />
                    <span className='text-xs font-semibold md:text-sm'>
                      Resume
                    </span>
                  </ButtonLink>
                </div>
              </div>
            </div>
            <div className='c-scrolldown absolute bottom-3 left-1/2 !opacity-40 md:hidden'>
              <div className='c-line'></div>
            </div>
          </section>
        )}
      </InView>
    </ContainerLayout>
  )
}
