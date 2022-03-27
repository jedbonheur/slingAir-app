import React,{useState, useEffect} from "react";
import styled from "styled-components";
import { useHistory ,useLocation } from "react-router-dom";


import tombstone from "../assets/tombstone.png";

const Confirmation = () => {
  const location = useLocation()
  const history = useHistory()
  const [reservation, setReservation] = useState(false)
  useEffect(() => {
    if(!location.state){

      return history.push('/')
    }
    const id = location.state.id
    fetch(`/view-reservation/${id}`)
    .then(res=> res.json())
    .then(response => {
       setReservation(response.data)
    })
    .catch(err => {
      console.log(err)
    })
  }, [])
   
  console.log(reservation)

  return (
    <>
    <Wrapper>
          {
          reservation && (
            <>
          <div className="reservation-info">
          <h3>Your flight is confirmed</h3>
            <p><strong>Reservation:</strong> {reservation._id}</p>
            <p><strong>Flight:</strong> {reservation.flight}</p>
            <p><strong>Seat:</strong> {reservation.seat}</p>
            <p><strong>Name:</strong> {reservation.givenName} 
              {reservation.surName}
            </p>
            <p><strong>Email:</strong> {reservation.email}</p>
          </div>
            </>
          )
          }
    </Wrapper>
    </>
  )
};

const Wrapper = styled.div`
display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
.reservation-info {
    padding: 20px;
    border: 4px solid #aa001e;
    border-radius: 8px;
}

.reservation-info h3 {
    margin: 10px 0px;
    border-bottom: 2px solid #aa001e;
    padding-bottom: 10px;
    font-family: var(--font-body);
    color: #aa001e;
}

.reservation-info p {
    line-height: 2;
}

`;

export default Confirmation;
