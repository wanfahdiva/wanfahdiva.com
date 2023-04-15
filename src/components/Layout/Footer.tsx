import Image from 'next/image'
import { useTheme } from 'next-themes'
import tw, { styled } from 'twin.macro'

const ImageWrapper = styled.div`
  ${tw`flex items-center justify-center`}
  &::before {
    content: '';
    flex-grow: 1;
    margin-right: 8px;
    ${tw`border-b-[1px] border-gray-400 dark:border-gray-700`}
  }
  &::after {
    content: '';
    flex-grow: 1;
    margin-left: 8px;
    ${tw`border-b-[1px] border-gray-400 dark:border-gray-700`}
  }
`
const Footer = () => {
  const { theme } = useTheme()

  return (
    <div className='mx-auto max-w-xs py-10 md:max-w-2xl'>
      <ImageWrapper>
        <Image
          src={`/images/${theme == 'light' ? 'black' : 'white'}-logo.png`}
          width={28}
          height={28}
          alt='logo'
        />
      </ImageWrapper>
      <p className='pt-6 text-center text-sm'>
        &copy;{new Date().getFullYear()} Wanfah Diva. All Rights Reserved.
      </p>
    </div>
  )
}
export default Footer
