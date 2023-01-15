import { FC, useMemo } from 'react'

import * as Icons from '@/components/Icon'
interface SvgProps {
  iconz: any
}
export const SvgIcon: FC<SvgProps> = ({ iconz }) => {
  const Icon = useMemo(() => {
    return (Icons as any)?.[iconz]
  }, [iconz])
  return <Icon />
}
