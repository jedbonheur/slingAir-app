import React, {useContext} from "react";
import styled from "styled-components";
import { NavLink, useHistory } from "react-router-dom";
import slingairLogo from "../assets/logo_text.png";
import {reactLocalStorage} from 'reactjs-localstorage';
import {AppContext} from "../AppContext"
 

const Header = () => {
  const history = useHistory()
  const {
     userStatus,
     setUserStatus,
     user,
     setUserName
    } = useContext(AppContext)

  // logout 

  const logout = (e) => {
    e.preventDefault();
    // logout
    fetch('/logout').then(res=> res.json())
      .then((response) => {
        setUserStatus('loggedout')
        setUserName('')
        reactLocalStorage.remove('user');
        if(response.status === 403) {
        return history.push('/login')
        }
        if(response.status === 200) {
          return history.push('/login')
        }
      }).catch(err => {
        console.log(err)
      })
  }
  
  // goToSignUp

  const goToSignUp = (e) => {
    e.preventDefault()
    history.push('/register')
  }


 return (
   <>
  <Wrapper>
    <Logo>
      <h1>Sling Airlines</h1>
    </Logo>
    <Nav>
      {/* TODO: only show links if the user has a reservation already */}
      <>
        <StyledNavLink to="/view-reservation">Reservation</StyledNavLink>
       {user.username && (
        <StyledNavLink to="/profile">{user.username}</StyledNavLink>
       )} 
       {userStatus === 'loggedin' && (
        <button className="btn-logout" onClick={logout}>Logout</button>
       )} 
       {userStatus === 'loggedout' && (
        <button className="btn-logout" onClick={goToSignUp}>Sign up</button>
       )} 
      </>
    </Nav>
  </Wrapper>
  </>
 )
 }
const Wrapper = styled.header`
  display: flex;
  justify-content: space-between;
  background: var(--color-alabama-crimson);
  height: 110px;
  padding: var(--padding-page) 18px;
  .btn-logout {
    background: var(--color-selective-yellow);
    border: 1px solid transparent;
    border-radius: 4px;
    color: var(--color-alabama-crimson);
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: var(--font-heading);
    font-size: 18px;
    height: 42px;
    margin: 0 0 0 8px;
    padding: 0 14px;
    width: 100%;
    text-decoration: none;
    transition: all ease 400ms;
    &:hover {
    background: var(--color-alabama-crimson);
    color: var(--color-selective-yellow);
    border-color: var(--color-selective-yellow);
     cursor: pointer;
  }
`;
const Logo = styled.div`
  background-image: url(${slingairLogo});
  background-repeat: no-repeat;
  background-position: left center, right center;
  background-size: contain;
  overflow: hidden;
  text-indent: -1000px;
  height: 60px;
  width: 550px;
`;
const Nav = styled.nav`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
const StyledNavLink = styled(NavLink)`
  background: var(--color-selective-yellow);
  border: 1px solid transparent;
  border-radius: 4px;
  color: var(--color-alabama-crimson);
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: var(--font-heading);
  font-size: 18px;
  height: 42px;
  margin: 0 0 0 8px;
  padding: 0 14px;
  width: 100%;
  text-decoration: none;
  transition: all ease 400ms;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  &:hover {
    background: var(--color-alabama-crimson);
    color: var(--color-selective-yellow);
    border-color: var(--color-selective-yellow);
  }
  
}
`;

export default Header;
