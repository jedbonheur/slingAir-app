import React, {useState} from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";


const Signup = () => {
   const [error, setErrors] = useState(false)
   const history = useHistory()
  const register = (e) => {
      e.preventDefault();
      const registerParams = {
      username : e.target.username.value,
      email : e.target.email.value,
      password : e.target.password.value,
      }
      console.log(registerParams)
    fetch('/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registerParams),
    }).then(res=> res.json())
    .then((response) => {
        if(response.status === 401) {
        return setErrors(response.message)
        }
        if(response.status === 200) {
          return history.push('/login')
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
  
  return (
   <>
    <Wrapper>
     <div className="Signup-area">
        {
          error && (
              <div className="error-message">{error}</div>
            )
          }
        <form id="Signup-part" className="registerPlan" onSubmit={register} >
          <input type="text" required id="username" name="username" placeholder="username" />
          <input type="text" required id="email" name="email" placeholder="Email" />
          <input type="password" required id="password" name="password" placeholder="Password" />
          <button type="submit"  id="registerSubmit"  value="Submit">Sign Up</button>
        </form>
      </div>
    </Wrapper>
   </>
 )
}

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;

  .registerPlan {
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
  }
  .error-message {
      text-align: center;
      color: #aa001e;
      font-family: 'Kosugi',Arial,Helvetica,sans-serif;
      font-size: 20px;
      margin-bottom: 6px;
      text-transform: capitalize
    }
`

export default Signup;