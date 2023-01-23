import { NextLayoutComponentType } from 'next'
import { ReactChild } from 'react'
import { styled } from 'twin.macro'

import { SectionRender } from '@/components/Animations'
import { Animate } from '@/components/Animations/Aos'
import { Layout } from '@/components/Layout/Layout'
import Seo from '@/components/Seo'
import { Timeline } from '@/components/Timeline'

/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */

const HighlightText = styled.p`
  color: transparent !important;
  -webkit-background-clip: text;
  background-clip: text;
  background-image: linear-gradient(
    to bottom right,
    #805ad5 10.51%,
    rgb(15, 166, 233) 98.93%
  );
  display: inline;
  .dark & {
    background-image: linear-gradient(
      to bottom left,
      #dddddd 1.51%,
      #4bcde1 99.93%
    );
  }
`

const HomePage: NextLayoutComponentType = () => {
  return (
    <SectionRender delay={0.1}>
      <main tw='py-5 md:py-10'>
        <div tw='rounded-lg mb-6 p-1.5 text-center backdrop-blur-sm bg-[#ffffff5c] dark:bg-[#ffffff14] flex justify-center items-center'>
          <div tw='relative flex flex-col space-y-8 overflow-x-hidden'>
            <h1 tw='inline'>
              <div tw='relative z-10 inline-grid'>
                <div tw='relative z-10 inline-flex overflow-y-hidden'>
                  {'Hi,| |My| |Name| |Is| |Wanfah| |Diva'
                    .split('|')
                    ?.map((v, i) => (
                      <span
                        key={i}
                        tw='inline-flex font-bold'
                        {...Animate.AOS({
                          type: 'slide-up',
                          delay: 650 + i * 200,
                        })}
                      >
                        {v === ' ' ? (
                          <span tw='inline-flex mx-[.2rem]'>{v}</span>
                        ) : i === 8 ? (
                          <HighlightText>{v}</HighlightText>
                        ) : i === 10 ? (
                          <HighlightText>{v}</HighlightText>
                        ) : (
                          v
                        )}
                      </span>
                    ))}
                </div>
                <div
                  tw='absolute w-[105%] h-0.5 -left-1 lg:-left-3 bg-unicorn dark:bg-crown lg:bottom-1.5 bottom-1'
                  {...Animate.AOS({
                    type: 'slide-right',
                    delay: 1000 + 5 * 250,
                    duration: 800,
                  })}
                />
              </div>
            </h1>
          </div>
        </div>
        <Timeline />
      </main>
    </SectionRender>
  )
}

HomePage.getLayout = function getLayout(page: ReactChild) {
  return (
    <Layout class='px-4'>
      <Seo />
      {page}
    </Layout>
  )
}

export default HomePage
