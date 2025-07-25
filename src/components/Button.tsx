import { ButtonHTMLAttributes, ReactNode } from 'react'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  size?: 'small' | 'medium' | 'large'
  variant?: 'primary' | 'secondary' | 'outline'
}

export const Button = ({ children, className, ...rest }: Props) => {
  return (
    <button className={'btn ' + className} {...rest}>
      {children}
    </button>
  )
}
