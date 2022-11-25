import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
 
const Occupant = (props) => (
 <tr>
   <td>{props.occupant.name}</td>
   <td>{props.occupant.allergies}</td>
   <td>{props.occupant.daysInShelter}</td>
   <td>
     <Link className="btn btn-link" to={`/edit/${props.occupant._id}`}>Edit</Link> |
     <button className="btn btn-link"
       onClick={() => {
         props.deleteOccupant(props.occupant._id);
       }}
     >
       Delete
     </button>
   </td>
 </tr>
);
 
export default function OccupantList() {
 const [occupants, setOccupants] = useState([]);
 
 // This method fetches the occupants from the database.
 useEffect(() => {
   async function getOccupants() {
     const response = await fetch(`http://localhost:5000/occupant/`);
 
     if (!response.ok) {
       const message = `An error occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     const occupants = await response.json();
     setOccupants(occupants);
   }
 
   getOccupants();
 
   return;
 }, [occupants.length]);
 
 // This method will delete a occupant
 async function deleteOccupant(id) {
   await fetch(`http://localhost:5000/${id}`, {
     method: "DELETE"
   });
 
   const newOccupants = occupants.filter((el) => el._id !== id);
   setOccupants(newOccupants);
 }
 
 // This method will map out the occupants on the table
 function occupantList() {
   return occupants.map((occupant) => {
     return (
       <Occupant
         occupant={occupant}
         deleteOccupant={() => deleteOccupant(occupant._id)}
         key={occupant._id}
       />
     );
   });
 }
 
 // This following section will display the table with the occupants.
 return (
   <div>
     <h3>Occupant List</h3>
     <table className="table table-striped" style={{ marginTop: 20 }}>
       <thead>
         <tr>
           <th>Name</th>
           <th>Allergies</th>
           <th>DaysInShelter</th>
           <th>Action</th>
         </tr>
       </thead>
       <tbody>{occupantList()}</tbody>
     </table>
   </div>
 );
}
