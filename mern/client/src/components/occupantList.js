import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
 
const Occupant = (props) => (
 <tr>
   <td>{props.occupant.date}</td>
   <td>{props.occupant.name}</td>
   <td>{props.occupant.birthday}</td>
   <td>{props.occupant.allergies}</td>
   <td>{props.occupant.counselor}</td>
   <td>
     <Link className="btn btn-link" to={`/edit/${props.occupant._id}`}>Edit</Link> |
     <button className="btn btn-link"
       onClick={() => {
<<<<<<< HEAD
<<<<<<< HEAD
         props.deleteOccupant(props.occupant._id);
=======
         props.deleteOccupant(props.occupants._id);
>>>>>>> dc4cac719f607ce941aeacb4389683d850e97f23
=======
         props.deleteOccupant(props.occupant._id);
>>>>>>> 95505f5835a184818231f73bbcc21c4c0773a99d
       }}
     >
       Delete
     </button>
   </td>
 </tr>
);
 
export default function OccupantList() {
 const [occupants, setOccupants] = useState([]);
 
 // This method fetches the records from the database.
 useEffect(() => {
   async function getOccupants() {
     const response = await fetch(`http://localhost:5000/occupants/`);
 
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
 
 // This method will delete a record
 async function deleteOccupant(id) {
   await fetch(`http://localhost:5000/delete`, {
     method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: "{\"id\":" + "\"" + id + "\"}",
   })
 
   const newOccupants = occupants.filter((el) => el._id !== id);
   setOccupants(newOccupants);
 }
 
 // This method will map out the records on the table
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
           <th>Counselor?</th>
           <th>Action</th>
         </tr>
       </thead>
       <tbody>{occupantList()}</tbody>
     </table>
   </div>
 );
}