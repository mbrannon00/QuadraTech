import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
 
const Occupant = (props) => (
 <tr>
   <td>{props.occupant.date}</td>
   <td>{props.occupant.name}</td>
   <td>{props.occupant.birthday}</td>
   <td>{props.occupant.allergies}</td>
   <td>{props.occupant.mentalHealth}</td>
   <td>{props.occupant.physicalHealth}</td>
   <td>{props.occupant.counselor}</td>
   <td>
     <Link className="btn btn-link" to={`/edit/${props.occupant._id}`}>Edit</Link> |
     <button className="btn btn-link"
       onClick={() => {
         props.deleteRecord(props.occupants._id);
       }}
     >
       Delete
     </button>
   </td>
 </tr>
);
 
export default function OccupantList() {
 const [occupant, setOccupant] = useState([]);
 
 // This method fetches the records from the database.
 useEffect(() => {
   async function getOccupant() {
     const response = await fetch(`http://localhost:5000/occupants/`);
 
     if (!response.ok) {
       const message = `An error occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     const occupant = await response.json();
     setOccupant(occupant);
   }
 
   getOccupant();
 
   return;
 }, [occupant.length]);
 
 // This method will delete a record
 async function deleteOccupant(id) {
   await fetch(`http://localhost:5000/${id}`, {
     method: "DELETE"
   });
 
   const newOccupant = occupant.filter((el) => el._id !== id);
   setOccupant(newOccupant);
 }
 
 // This method will map out the records on the table
 function occupantList() {
   return occupant.map((occupant) => {
     return (
       <Occupant
         occupant={occupant}
         deleteOccupant={() => deleteOccupant(occupant._id)}
         key={occupant._id}
       />
     );
   });
 }
 
 // This following section will display the table with the records of individuals.
 return (
   <div>
     <h3>Record List</h3>
     <table className="table table-striped" style={{ marginTop: 20 }}>
       <thead>
         <tr>
           <th>Check-In Date</th>
           <th>Name</th>
           <th>Birthday</th>
           <th>Allergies</th>
           <th>Mental Health</th>
           <th>Physical Health</th>
           <th>Counselor?</th>
           <th>Action</th>
         </tr>
       </thead>
       <tbody>{occupantList()}</tbody>
     </table>
   </div>
 );
}
