import React from "react"

import Icon259 from "./logos/icon-259"

interface AppIconProps {
  className?: string
  size?: number
}

export const AppIcon: React.FC<AppIconProps> = ({
  className = "",
  size = 24,
}) => {
  return <Icon259 size={size} className={className} />
}

export default AppIcon
