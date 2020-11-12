import styled from 'styled-components'
import { Navbar as BsNavbar, NavItem as BsNavItem, Nav as BsNav } from 'react-bootstrap'
import { NavLink as RRDLink } from 'react-router-dom'

import { mediaQueries, colors } from 'common/styles'

export const Navbar = styled(BsNavbar)`
  padding: 10px 35px;
  box-shadow: -1px 3px 4px #00000022;
  background-color: #3A3A3A;
`

export const Link = styled(RRDLink)`
  &.active {
    background: ${colors.white};
  }
`

export const NavItem = styled(BsNavItem)`
  padding: 5px 15px;
  margin: 5px 0px;
  cursor: pointer;
  transition: .3s ease all;
  border-bottom: 1px solid transparent;
  
  ${mediaQueries.desktop} {
    margin: 0px 15px;
  };
  
  &:hover {
    border-bottom: 1px solid ${colors.black};
  }
`

export const Brand = styled.img`
  width:100px;
  heigth:100px;
`

export const Nav = BsNav
export const Toggle = BsNavbar.Toggle
export const Collapse = BsNavbar.Collapse
