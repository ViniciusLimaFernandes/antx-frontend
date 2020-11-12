import { Container } from 'react-bootstrap'
import Styled from 'styled-components'
import Background from 'assets/images/webbackground.png'

export default Styled(Container)`
    background-image: url(${Background});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: bottom;
`