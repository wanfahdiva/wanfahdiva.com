// !STARTERCONF You can delete this page
import clsx from 'clsx'
import { useTheme } from 'next-themes'
import { useState } from 'react'

import { Skeleton } from '@/components/Animations/Skeleton'
import Button from '@/components/Buttons/Button'
import { Layout } from '@/components/Layout/Layout'
import ArrowLink from '@/components/Links/ArrowLink'
import ButtonLink from '@/components/Links/ButtonLink'
import PrimaryLink from '@/components/Links/PrimaryLink'
import UnderlineLink from '@/components/Links/UnderlineLink'
import UnstyledLink from '@/components/Links/UnstyledLink'
import NextImage from '@/components/NextImage'
import Seo from '@/components/SEO'

type Color = typeof colorList[number]

export default function ComponentsPage() {
  const { theme } = useTheme()
  const [color, setColor] = useState<Color>('sky')

  const textColor = theme === 'dark' ? 'text-gray-300' : 'text-gray-600'

  return (
    <Layout>
      <Seo
        templateTitle='Components'
        description='Pre-built components with awesome default'
      />

      <main
        className={clsx(
          'py-10',
          theme === 'dark' ? 'text-white' : 'text-black',
          color
        )}
      >
        <ArrowLink direction='left' className='my-2' href='/'>
          Back to Home
        </ArrowLink>

        <section>
          <ol className='mt-8 space-y-6'>
            <li className='space-y-2'>
              <h2 className='text-lg md:text-xl'>Customize Colors</h2>
              <p className={clsx('!mt-1 text-sm', textColor)}>
                You can change primary color to any Tailwind CSS colors. See
                globals.css to change your color.
              </p>
              <div className='grid h-32 grid-cols-4 flex-nowrap gap-1 overflow-auto border-2 border-primary-300 p-4'>
                {colorList.map((c) => (
                  <div
                    className='mb-4 mr-2 flex items-center space-x-3'
                    key={c}
                  >
                    <input
                      type='radio'
                      name={c}
                      value={c}
                      className='focus: h-4 w-4 rounded-md border-primary-300 ring-primary-300 focus:ring-2 dark:border-primary-600 dark:bg-primary-700 dark:focus:bg-primary-300 dark:focus:ring-primary-600'
                      aria-labelledby='country-option-1'
                      aria-describedby='country-option-1'
                      checked={c === color}
                      onChange={(e) => setColor(e.target.value as Color)}
                    />
                    <label className='block text-sm font-medium text-gray-900 dark:text-gray-300'>
                      {c}
                    </label>
                  </div>
                ))}
              </div>
              <div className='flex flex-wrap gap-2 text-xs font-medium'>
                <div className='flex h-10 w-10 items-center justify-center rounded bg-primary-100 text-black'>
                  100
                </div>
                <div className='flex h-10 w-10 items-center justify-center rounded bg-primary-200 text-black'>
                  200
                </div>
                <div className='flex h-10 w-10 items-center justify-center rounded bg-primary-300 text-black'>
                  300
                </div>
                <div className='flex h-10 w-10 items-center justify-center rounded bg-primary-400 text-black'>
                  400
                </div>
                <div className='flex h-10 w-10 items-center justify-center rounded bg-primary-500 text-black'>
                  500
                </div>
                <div className='flex h-10 w-10 items-center justify-center rounded bg-primary-600 text-white'>
                  600
                </div>
                <div className='flex h-10 w-10 items-center justify-center rounded bg-primary-700 text-white'>
                  700
                </div>
                <div className='flex h-10 w-10 items-center justify-center rounded bg-primary-800 text-white'>
                  800
                </div>
                <div className='flex h-10 w-10 items-center justify-center rounded bg-primary-900 text-white'>
                  900
                </div>
              </div>
            </li>
            <li className='space-y-2'>
              <h2 className='text-lg md:text-xl'>UnstyledLink</h2>
              <p className={clsx('!mt-1 text-sm', textColor)}>
                No style applied, differentiate internal and outside links, give
                custom cursor for outside links.
              </p>
              <div className='space-x-2'>
                <UnstyledLink href='/'>Internal Links</UnstyledLink>
                <UnstyledLink href='https://www.wanfahdiva.me/'>
                  Outside Links
                </UnstyledLink>
              </div>
            </li>
            <li className='space-y-2'>
              <h2 className='text-lg md:text-xl'>PrimaryLink</h2>
              <p className={clsx('!mt-1 text-sm', textColor)}>
                Add styling on top of UnstyledLink, giving a primary color to
                the link.
              </p>
              <div className='space-x-2'>
                <PrimaryLink href='/'>Internal Links</PrimaryLink>
                <PrimaryLink href='https://www.wanfahdiva.me/'>
                  Outside Links
                </PrimaryLink>
              </div>
            </li>
            <li className='space-y-2'>
              <h2 className='text-lg md:text-xl'>UnderlineLink</h2>
              <p className={clsx('!mt-1 text-sm', textColor)}>
                Add styling on top of UnstyledLink, giving a dotted and animated
                underline.
              </p>
              <div className='space-x-2'>
                <UnderlineLink href='/'>Internal Links</UnderlineLink>
                <UnderlineLink href='https://www.wanfahdiva.me/'>
                  Outside Links
                </UnderlineLink>
              </div>
            </li>
            <li className='space-y-2'>
              <h2 className='text-lg md:text-xl'>ArrowLink</h2>
              <p className={clsx('!mt-1 text-sm', textColor)}>
                Useful for indicating navigation, I use this quite a lot, so why
                not build a component with some whimsy touch?
              </p>
              <div className='flex flex-wrap items-center gap-4'>
                <ArrowLink href='/' direction='left'>
                  Direction Left
                </ArrowLink>
                <ArrowLink href='/'>Direction Right</ArrowLink>
                <ArrowLink
                  as={UnstyledLink}
                  className='inline-flex items-center'
                  href='/'
                >
                  Polymorphic
                </ArrowLink>
                <ArrowLink
                  as={ButtonLink}
                  variant='light'
                  className='inline-flex items-center'
                  href='/'
                >
                  Polymorphic
                </ArrowLink>
              </div>
            </li>
            <li className='space-y-2'>
              <h2 className='text-lg md:text-xl'>ButtonLink</h2>
              <p className={clsx('!mt-1 text-sm', textColor)}>
                Button styled link with 3 variants.
              </p>
              <div className='flex flex-wrap gap-2'>
                <ButtonLink variant='primary' href='https://www.wanfahdiva.me/'>
                  Primary Variant
                </ButtonLink>
                <ButtonLink
                  variant='outline'
                  isDarkBg={theme === 'dark'}
                  href='https://www.wanfahdiva.me/'
                >
                  Outline Variant
                </ButtonLink>
                <ButtonLink
                  variant='ghost'
                  isDarkBg={theme === 'dark'}
                  href='https://www.wanfahdiva.me/'
                >
                  Ghost Variant
                </ButtonLink>
                <ButtonLink variant='dark' href='https://www.wanfahdiva.me/'>
                  Dark Variant
                </ButtonLink>
                <ButtonLink variant='light' href='https://www.wanfahdiva.me/'>
                  Light Variant
                </ButtonLink>
              </div>
            </li>
            <li className='space-y-2'>
              <h2 className='text-lg md:text-xl'>Button</h2>
              <p className={clsx('!mt-1 text-sm', textColor)}>
                Ordinary button with style.
              </p>
              <div className='flex flex-wrap gap-2'>
                <Button variant='primary'>Primary Variant</Button>
                <Button variant='outline' isDarkBg={theme === 'dark'}>
                  Outline Variant
                </Button>
                <Button variant='ghost' isDarkBg={theme === 'dark'}>
                  Ghost Variant
                </Button>
                <Button variant='dark'>Dark Variant</Button>
                <Button variant='light'>Light Variant</Button>
              </div>
              <div className='flex flex-wrap gap-2'>
                <Button disabled variant='primary'>
                  Disabled
                </Button>
                <Button disabled variant='outline' isDarkBg={theme === 'dark'}>
                  Disabled
                </Button>
                <Button disabled variant='ghost' isDarkBg={theme === 'dark'}>
                  Disabled
                </Button>
                <Button disabled variant='dark'>
                  Disabled
                </Button>
                <Button disabled variant='light'>
                  Disabled
                </Button>
              </div>
              <div className='flex flex-wrap gap-2'>
                <Button isLoading variant='primary'>
                  Disabled
                </Button>
                <Button isLoading variant='outline' isDarkBg={theme === 'dark'}>
                  Disabled
                </Button>
                <Button isLoading variant='ghost' isDarkBg={theme === 'dark'}>
                  Disabled
                </Button>
                <Button isLoading variant='dark'>
                  Disabled
                </Button>
                <Button isLoading variant='light'>
                  Disabled
                </Button>
              </div>
            </li>
            <li className='space-y-2'>
              <h2 className='text-lg md:text-xl'>Custom 404 Page</h2>
              <p className={clsx('!mt-1 text-sm', textColor)}>
                Styled 404 page with some animation.
              </p>
              <div className='flex flex-wrap gap-2'>
                <ButtonLink href='/404'>Visit the 404 page</ButtonLink>
              </div>
            </li>
            <div className='flex flex-col justify-center space-y-3 md:flex-row md:space-x-5'>
              <li className='space-y-2'>
                <h2 className='text-lg md:text-xl'>Next Image</h2>
                <p className={clsx('!mt-1 text-sm', textColor)}>
                  Next Image with default props and skeleton animation
                </p>
                <NextImage
                  className='mt-8'
                  src='/favicon/apple-icon-180x180.png'
                  width='180'
                  height='180'
                  alt='Icon'
                />
              </li>
              <li className='space-y-2'>
                <h2 className='text-lg md:text-xl'>Skeleton</h2>
                <p className={clsx('!mt-1 text-sm', textColor)}>
                  Skeleton with shimmer effect
                </p>
                <Skeleton className='h-[180px] w-[180px] rounded-xl' />
              </li>
            </div>
          </ol>
        </section>
      </main>
    </Layout>
  )
}

const colorList = [
  'rose',
  'pink',
  'fuchsia',
  'purple',
  'violet',
  'indigo',
  'blue',
  'sky',
  'cyan',
  'teal',
  'emerald',
  'green',
  'lime',
  'yellow',
  'amber',
  'orange',
  'red',
  'slate',
  'gray',
  'zinc',
  'neutral',
  'stone',
] as const
