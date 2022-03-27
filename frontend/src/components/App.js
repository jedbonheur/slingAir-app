import React,{useState, useEffect, useContext} from "react";
import styled from "styled-components";
import {Switch, Route, useHistory } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import SeatSelect from "./SeatSelect";
import Confirmation from "./Confirmation";
import GlobalStyles from "./GlobalStyles";
import Login from "./Login"
import SignUp from "./SignUp"
import AuthenticatingLoader from './AuthenticatingLoader'
import {AppContext} from "../AppContext"


const App = () => {
  const [isSignedin,setSignedIn ] = useState(false)
  const [authStatus, setAuth] = useState(false)
  const history = useHistory()
  const {
   setUserStatus,
   } = useContext(AppContext)
  useEffect(() => {
    fetch('/loggedin')
    .then(res=> res.json())
    .then((response) => {
     if(response.status === 200) {
        setAuth(true)
        setSignedIn(true)
        setUserStatus('loggedin')
      }
     if(response.status === 401) {
       setAuth(true)
       setUserStatus('loggedout')
       return history.push('/login')
      }
    }).catch(err => {
      console.log(err)
    })
  },[]);
 
  if(!authStatus){
    return <AuthenticatingLoader/>
  }
  return (
    <>
      <GlobalStyles />
      <Header isSignedin={isSignedin} />
      <Main>
        <Switch>
          <Route exact path="/">
            <SeatSelect />
          </Route>
          <Route exact path="/confirmed">
            <Confirmation />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/register">
            <SignUp />
          </Route>
          <Route path="">404: Oops!</Route>
        </Switch>
        <Footer />
      </Main>
    </>
  );
};

const Main = styled.div`
  background: var(--color-orange);
  display: flex;
  flex-direction: column;
  height: calc(100vh - 110px);
`;

export default App;
