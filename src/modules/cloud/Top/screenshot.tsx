import React from "react"
import useBaseUrl from "@docusaurus/useBaseUrl"
import styled, { css } from "styled-components"
import useThemeContext from "@theme/hooks/useThemeContext"

const Root = styled.div<{
  width: number
  headHeight: number
  headerButtonsImgPath: string
  isDarkTheme: boolean
}>`
  display: inline-block;
  border-radius: 6px;
  max-width: 100%;

  ${({ isDarkTheme, headHeight, headerButtonsImgPath }) => css`
    padding-top: ${headHeight}px;
    background: #2f313c url(${headerButtonsImgPath}) top left no-repeat;
    background-size: auto ${headHeight}px;
    box-shadow: ${isDarkTheme
      ? `0 15px 20px 0 rgba(0, 0, 0, 0.7);`
      : `0 0 20px 0 rgba(0, 0, 0, 0.6);`};
  `};
`

const Picture = styled.img`
  background-color: rgb(38, 40, 51);
  height: auto;
`

type Props = {
  width: number
  height: number
  src: string
  headHeight?: number
  className?: string
  style?: React.CSSProperties
}

export const Screenshot = ({
  width,
  height,
  src,
  headHeight = 16,
  className,
  style,
}: Props) => {
  const headerButtonsImgPath = useBaseUrl("/img/pages/index/window-header.svg")
  const { isDarkTheme } = useThemeContext()

  return (
    <Root
      style={style}
      className={className}
      width={width}
      headHeight={headHeight}
      headerButtonsImgPath={headerButtonsImgPath}
      isDarkTheme={isDarkTheme}
    >
      <Picture width={width} height={height} src={src} />
    </Root>
  )
}
