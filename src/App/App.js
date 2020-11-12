import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Routes from 'routes/Routes'
import GlobalStyle, {FooterText} from './App.style'
import Navbar from 'components/Navbar'

function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Navbar />
        <Routes />
      </Router>
      <FooterText> PI VI - BEC SENAC </FooterText>
    </>
  )
}

export default App
