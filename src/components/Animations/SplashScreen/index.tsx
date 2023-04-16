import { useTheme } from 'next-themes'

import clsxm from '@/lib/clsxm'

import { BlackIconScreen, WhiteIconScreen } from '@/components/Icon'
interface SplashScreenProps {
  endedLoading: boolean
}

export const SplashScreen = ({ endedLoading }: SplashScreenProps) => {
  const themes = useTheme()
  return (
    <div
      className={clsxm(
        'flex h-screen w-full items-center justify-center opacity-100 transition-all duration-700 ease-in-out',
        endedLoading && 'opacity-0'
      )}
    >
      <div
        className='example'
        style={{
          border: 'none',
          padding: '0',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        {themes.theme == 'dark' ? <WhiteIconScreen /> : <BlackIconScreen />}
      </div>
    </div>
  )
}
