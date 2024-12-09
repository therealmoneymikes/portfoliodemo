import React, { ReactNode, FC } from 'react'
import NextLink, { LinkProps } from "next/link"
import {Link as RadixLink} from "@radix-ui/themes"


//if you want to extend the className prop to include an area of class name values
type NextLinkComponent = Omit<LinkProps, "className"> & {
  className?: string | string[] | undefined,
  children?: ReactNode
}

//Use the Normal Props interface
interface Props {
   children: ReactNode
   className?: string
   href: string
}

//if you prefer the normal custom component here you are

export const CustomLinkNormal = ({href, children, className}: Props) => {
  return (
    <NextLink href={href} className={className} passHref legacyBehavior>
      <RadixLink>{children}</RadixLink>
    </NextLink>
  )
}

export const CustomLink: FC<NextLinkComponent> = ({href, className, children, ...props}) => {
  const combinedClassnames = Array.isArray(className) ? className.join(" ") : className
  return (
    // Because Radix Link is a tag at its core
    //To pass it correcly we need to set legacyBehavior
    <NextLink {...props} className={combinedClassnames} href={href} passHref legacyBehavior>
        <RadixLink>{children}</RadixLink>
    </NextLink>
  )
}


// export {CustomLinkNormal as Link} use it you need to simply your code,
//just remeber the name will clash with the Link components from NextJs and RadixUI
