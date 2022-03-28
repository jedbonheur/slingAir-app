import React,{useState, useEffect, useContext} from "react";
import styled from "styled-components";
import { useHistory ,useLocation } from "react-router-dom";
import Loader from './Loader'
import {AppContext} from "../AppContext"

const Reservations = () => {
  const [reservations, setReservations] = useState([])
    const {
     user,
    } = useContext(AppContext)
  useEffect(() => {

    fetch(`/my-reservation/${user.userId}`)
    .then(res=> res.json())
    .then(response => {
       setReservations(response.data)
    })
    .catch(err => {
      console.log(err)
    })
  }, [])
  
  console.log('reservations',reservations)

  if(reservations.length <= 0){
   return (
    <LoaderWrapper>
     <Loader />
    </LoaderWrapper>
   )
  }
  return (
    <>
    <Wrapper>
          {
          reservations.length > 0 && (
              <div className="reservation-info">
              <h3>Your flights</h3>
              <table>
               <tr>
                 <th>Reservation Id</th>
                 <th>Flight</th>
                 <th>Seat</th>
                 <th>Given name</th>
                 <th>Surname</th>
                 <th>Email</th>
                 <th>Action</th>
               </tr>
               { reservations.map(reservation => { 
                return (
                 <tr key={reservation._id}>
                  <td>{reservation._id}</td>
                  <td>{reservation.flight}</td>
                  <td>{reservation.seat}</td>
                  <td>{reservation.givenName}</td>
                  <td>{reservation.surName}</td>
                  <td>{reservation.email}</td>
                  <td>
                   <a href="#">Edit</a>
                  </td>
                 </tr>
                )
               })
              }
              </table>
              </div>
            
            )
          }
    </Wrapper>
    </>
  )
};

const LoaderWrapper = styled.div`

    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;

`

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
    padding-bottom: 10px;
    font-family: var(--font-body);
    color: #aa001e;
}

.reservation-info p {
    line-height: 2;
}
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
  border: 2px solid #aa001e;
}

td, th {
  border: 1px solid #795548;
  text-align: left;
  padding: 4px 2px;
}

tr:nth-child(even) {
  background-color: #cf8b13;
}
`;

export default Reservations;
