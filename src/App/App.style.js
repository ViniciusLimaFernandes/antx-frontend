import styled, { css, createGlobalStyle } from 'styled-components'

const globalStyle = css`
    body{
        background-color: #FF07E5;
    }
`

export const FooterText=styled.p`
    font-weight: bold;
    margin-left: 20px;
    margin-bottom: 0px;
    color: white;
`

export default createGlobalStyle`
    ${globalStyle}
`