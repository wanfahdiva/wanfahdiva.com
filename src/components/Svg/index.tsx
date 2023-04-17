import { useMemo } from 'react'

import * as Icons from '@/components/Icons'
interface SvgProps {
  iconz: any
}
export const SvgIcon = ({ iconz }: SvgProps) => {
  const Icon = useMemo(() => {
    return (Icons as any)?.[iconz]
  }, [iconz])
  return <Icon />
}
