import React,{useState, useEffect,useContext} from "react";
import styled from "styled-components";
import Plane from './Plane'
import {AppContext} from "../../AppContext"
import { useHistory } from "react-router-dom";

const { v4: uuidv4 } = require('uuid')


// fetch flights to selected a plane
// fetch using  useEffect

const SeatSelect = ({}) => {
  const [flights, setFlights] = useState([])
  const [selectedFlight, setSelectedFlight] = useState([])
  const [planeSeats, setPlaneSeats] = useState([])
  const [selectedSeat, setSelectedSeat] = useState([])
  let history = useHistory();
  const {user} = useContext(AppContext)
  

  useEffect(() => {
    fetch('/flights')
    .then(res=> res.json())
    .then(response => {
       setFlights(response.data)
    })
    .catch(err => {
      console.log('error-page')
      console.log(err)
    })
  }, [])



  const flightSelected = (e) => {
     e.preventDefault();
    const flight = e.target.value;
    const thevalue = document.getElementById('flights').value;
    const getPlaneSeats = flights.find(flight => {
      return flight._id === thevalue
    })
    setPlaneSeats(getPlaneSeats.seats)
    setSelectedFlight(flight)
  }
  
 
  const registerPlace = (e) => {
    e.preventDefault();
    const reservationInfoParams = {
    _id: uuidv4(),
    flight: selectedFlight,
    seat: selectedSeat,
    givenName: e.target.fname.value,
    surName: e.target.lname.value,
    email: e.target.email.value,
    userId : user.userId
    }
    fetch('/reservation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reservationInfoParams),
    })
    .then(() => {
      history.push({
      pathname: '/confirmed', 
      state: {
        id: reservationInfoParams._id,
      }
     })
    });
  }


  return (
    <>
    <Wrapper>
      <div className="flightnumber">
        <h2>Flight Number</h2>
        <div className="selectFlight">
         {
             flights && flights.length > 0 && (
              <select className="select-form" defaultValue="default" name="flight" id="flights" onChange={flightSelected}>
                <option value="default" disabled >Select flight</option>
                  {flights.map(flight => 
                      <option className="options" key={flight._id} value={flight._id} >{flight._id}</option>
                  )}
              </select>
             )
           }
        </div>
      </div>
      <h2>Select your seat and Provide your information!</h2>
      <div className="regestration-area">
        <div className="plane-area">
            <Plane setSelectedSeat={setSelectedSeat}  planeSeats={planeSeats}  />
        </div>
        <form id="registerPlan" className="registerPlan" onSubmit={registerPlace} >
          <input type="text" required id="fname" name="fname" placeholder="First Name" />
          <input type="text" required id="lname" name="lname" placeholder="Last Name" />
          <input type="text" required id="email" name="email" placeholder="Email" />
          <button type="submit"  id="registerSubmit"  value="Submit">Confirm</button>
        </form>
      </div>
      </Wrapper>
    </>
  );
};


const Wrapper = styled.section`
.flightnumber {
    display: flex;
    align-items: center;
    gap: 0px 20px;
    background: #7b0c20;
    padding: 2vw;
}

.selectFlight select {
    padding: 9px 18px;
    border: none;
    border-radius: 5px;
}

form.registerPlan {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 7px;
    padding: 20px;
    border: 6px solid #aa001e;
    border-radius: 5px;
}

.registerPlan input {
    width: 100%;
}
.regestration-area {
    display: flex;
    align-items: center;
    justify-content: center;
}
button {
    width: 100%;
    border-radius: 4px;
    margin: 0px;
    border: none;
    display: block;
    background: #aa001e;
  :disabled {
    opacity: 0.2;
}
}
form [type] {
    padding: 0px;
}


`

export default SeatSelect;