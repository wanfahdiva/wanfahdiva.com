import { useRouter } from 'next/router'
import tw, { styled } from 'twin.macro'

import clsxm from '@/lib/clsxm'

import { ThemeToggle } from '@/components/ThemeToggle'

import UnstyledLink from '../Links/UnstyledLink'
const Main = styled.header`
  ${tw`sticky top-0 z-50 w-full bg-[#ffffff40] dark:bg-[#20202380]`}
  backdrop-filter:blur(10px);
`
const LinkItem = ({ href, target, children, ...props }: any) => {
  const router = useRouter()
  const active = router?.asPath === href
  return (
    <UnstyledLink
      href={href}
      target={target}
      className={clsxm(
        'p-2',
        active
          ? 'border-b-2 border-unicorn font-bold text-unicorn dark:border-crown dark:text-crown'
          : 'hover:text-unicorn hover:dark:text-crown'
      )}
      {...props}
    >
      {children}
    </UnstyledLink>
  )
}

const Header = () => {
  return (
    <Main>
      <nav className='layout mx-auto flex h-14 max-w-lg items-center justify-between'>
        <div tw='flex space-x-4'>
          <LinkItem href='/'>Home</LinkItem>
          <LinkItem href='/work'>Work</LinkItem>
          <LinkItem href='/post'>Post</LinkItem>
          <LinkItem href='/about'>About</LinkItem>
        </div>
        <ThemeToggle />
      </nav>
    </Main>
  )
}
export default Header
