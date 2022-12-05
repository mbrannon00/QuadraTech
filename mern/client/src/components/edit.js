import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import Navbar from './navbar.js';
import './create.css';
 
export default function Edit() {
 const [form, setForm] = useState({
   date: Date(),
   name: "",
   birthday: Date(),
   allergies: "",
   counselor: "",
   mentalHealth: "",
   physicalHealth: "",
   records: [],
 });
 const params = useParams();
 const navigate = useNavigate();
 
 useEffect(() => {
    async function fetchData() {
      const id = params.id.toString();
      const response = await fetch(`http://localhost:5000/occupant/${params.id.toString()}`);
  
      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const occupant = await response.json();
      if (!occupant) {
        window.alert(`Record with id ${id} not found`);
        navigate("/");
        return;
      }
  
      setForm(occupant);
    }
  
    fetchData();
  
    return;
  }, [params.id, navigate]);
 
 // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
 
 async function onSubmit(e) {
    e.preventDefault();
    const editedPerson = {
      date: form.date,
      name: form.name,
      birthday: form.birthday,
      allergies: form.allergies,
      mentalHealth: form.mentalHealth,
      physicalHealth: form.physicalHealth,
      counselor: form.counselor,
    };
  
    // This will send a post request to update the data in the database.
    await fetch(`http://localhost:5000/update/${params.id}`, {
      method: "POST",
      body: JSON.stringify(editedPerson),
      headers: {
        'Content-Type': 'application/json'
      },
    });
  
    navigate("/Occupants");
  }
 
 // This following section will display the form that takes input from the user to update the data.
 return (
   <div>
       <Navbar />
       <div className="form">
     <h3>Update Occupant</h3>
     <form onSubmit={onSubmit}>
     <div className="form-group">
         <label htmlFor="date">Date: </label>
         <input
           type="date"
           className="form-control"
           id="date"
           value={form.date}
           onChange={(e) => updateForm({ date: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="name">Name: </label>
         <input
           type="text"
           className="form-control"
           id="name"
           value={form.name}
           onChange={(e) => updateForm({ name: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="birthday">Birthday: </label>
         <input
           type="date"
           className="form-control"
           id="birthday"
           value={form.birthday}
           onChange={(e) => updateForm({ birthday: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="allergies">Allergies: </label>
         <input
           type="text"
           className="form-control"
           id="allergies"
           value={form.allergies}
           onChange={(e) => updateForm({ allergies: e.target.value })}
         />
       </div>
         <div className="form-group">
             <label htmlFor="mentalHealth">Mental Health (1=worst, 10=best)</label>
             <input
                 type="text"
                 className="form-control"
                 id="mental"
                 value={form.mentalHealth}
                 onChange={(e) => updateForm({mentalHealth: e.target.value})}
             />
         </div>
         <div className="form-group">
             <label htmlFor="physicalHealth">Physical Health (1=worst, 10=best)</label>
             <input
                 type="text"
                 className="form-control"
                 id="physical"
                 value={form.physicalHealth}
                 onChange={(e) => updateForm({physicalHealth: e.target.value})}
             />
         </div>
      
       <div className="form-group">
         <div className="form-check form-check-inline">
           <input
             className="form-check-input"
             type="radio"
             name="counselorOptions"
             id="counselorYes"
             value="Yes"
             checked={form.counselor === "Yes"}
             onChange={(e) => updateForm({ counselor: e.target.value })}
           />
           <label htmlFor="counselorYes" className="form-check-label">Yes</label>
         </div>
         <div className="form-check form-check-inline">
           <input
             className="form-check-input"
             type="radio"
             name="counselorOptions"
             id="counselorNo"
             value="No"
             checked={form.counselor === "No"}
             onChange={(e) => updateForm({ counselor: e.target.value })}
           />
           <label htmlFor="counselorNo" className="form-check-label">No</label>
         </div>
       </div>
       <br />
 
       <div className="form-group">
         <input
           type="submit"
           value="Update Occupant"
           className="btn btn-primary"
         />
       </div>
     </form>
     </div>
   </div>
 );
}