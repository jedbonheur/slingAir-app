import React,{useState, useContext} from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom"
import {reactLocalStorage} from 'reactjs-localstorage';
import {AppContext} from "../AppContext"


const Login = () => {
 const [error, setErrors] = useState(false)
 const history = useHistory()
 const {
   setUserStatus,
   setUserName
   } = useContext(AppContext)
 const login = (e) => {
  e.preventDefault();
  const loginParams = {
   email : e.target.email.value,
   password : e.target.password.value,
  }
  fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginParams),
  }).then(res=> res.json())
    .then((response) => {
      if(response.status === 401) {
       return setErrors(response.message)
      }
      if(response.status === 200) {
        setUserStatus('loggedin')
      console.log(response.user)
        reactLocalStorage.setObject('user',response.user);
        setUserName(reactLocalStorage.getObject('user'))
        return history.push('/')
      }
    }).catch(err => {
      console.log(err)
    })
 }
  
  return (
  <Wrapper>
     <div className="login-area">
          {
          error && (
              <div className="error-message">{error}</div>
            )
          }
        <form id="login-part" className="login-part" onSubmit={login} >
          <input type="text" required id="email" name="email" placeholder="Email" />
          <input type="password" required id="password" name="password" placeholder="Password" />
          <button type="submit"  id="submitlogin"  value="submit">Login</button>
        </form>
      </div>
  </Wrapper>
)}

const Wrapper = styled.div`

    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;

.login-part {
    display: flex;
    flex-direction: column;
    gap: 5px 0px;
}
button {
    background: #aa001e;
    border: none;
    &:hover {
    background: var(--color-alabama-crimson);
    color: var(--color-selective-yellow);
    border-color: var(--color-selective-yellow);
     cursor: pointer;
  }
}.error-message {
    text-align: center;
    color: #aa001e;
    font-family: 'Kosugi',Arial,Helvetica,sans-serif;
    font-size: 20px;
    margin-bottom: 6px;
    text-transform: capitalize;


}

`

export default Login;
