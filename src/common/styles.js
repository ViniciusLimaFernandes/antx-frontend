import { css } from 'styled-components'

/* Viewport */
export const breakpoint = 992
export const mediaQueries = {
    mobile: `@media screen and (max-width: ${breakpoint - .1}px)`,
    desktop: `@media screen and (min-width: ${breakpoint}px)`,
}

/* Colors */
export const white = '#FFFFFF'
export const black = '#000000'
export const gray = '#3F3F3F'
export const trash_green = '#2ECC71'
export const trash_green2 = '#27AE60CC'
export const trash_red = '#E74C3C'
export const trash_red2 = '#C0392BCC'
export const trash_yellow = '#F9CA24'
export const trash_yellow2 = '#F1C40FCC'
export const red = '#E23E36'
export const yellow = '#F3D42E'
export const blue = '#2975B3'
export const green = '#27AE60'

export const colors = {
    white,
    black,
    trash_green,
    trash_green2,
    trash_red,
    trash_red2,
    trash_yellow,
    trash_yellow2,
    red,
    yellow,
    blue,
    green
}

/* Texts */
export const title = css`
    font-weight: bold;
    color: ${black};
    font-size: 30px;
    text-transform: uppercase;
`