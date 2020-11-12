
import React from 'react'

import BrandLogo from 'assets/images/AntxLogo.png'

import { Navbar, NavItem, Link, Brand, Toggle } from './Navbar.styles'

export default function NavbarComponent () {
  function renderLink (to, label) {
    return (
      <Link activeClassName='active' to={to}>
        <NavItem>{label}</NavItem>
      </Link>
    )
  }
  
  return (
    <Navbar expand='lg'>
      <Brand src={BrandLogo}/>

      <Toggle />
    </Navbar>
  )
}