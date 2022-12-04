import React, {useState} from "react";
import {useNavigate} from "react-router";
import Navbar from '../components/navbar.js';
import './create.css';

export default function Create() {
    const [form, setForm] = useState({
        date: new Date(),
        name: "",
        birthday: new Date(),
        allergies: "",
        mentalHealth: "",
        physicalHealth: "",
        counselor: "",
    });
    const navigate = useNavigate();

    // These methods will update the state properties.
    function updateForm(value) {
        return setForm((prev) => {
            return {...prev, ...value};
        });
    }

    // This function will handle the submission.
    async function onSubmit(e) {
        e.preventDefault();

        // When a post request is sent to the create url, we'll add a new record to the database.
        const newPerson = {...form};

        await fetch("http://localhost:5000/occupants/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newPerson),
        })
            .catch(error => {
                window.alert(error);
                return;
            });

        window.alert('successfully added')
        setForm({date: Date(), name: "", birthday: Date(), allegies: "", mentalHealth: "", physicalHealth: "", counselor: ""});
        navigate("/LoggedInScreen");
    }

    // This following section will display the form that takes the input from the user.
    return (
        <div>
            <Navbar/>
            <div className="form">
                <h3>Add New Occupant</h3>
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label htmlFor="date">Today's Date</label>
                        <input
                            type="date"
                            className="form-control"
                            id="today"
                            value={form.date}
                            onChange={(e) => updateForm({date: e.target.value})}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            value={form.name}
                            onChange={(e) => updateForm({name: e.target.value})}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="date">Birthday</label>
                        <input
                            type="date"
                            className="form-control"
                            id="birthday"
                            value={form.birthday}
                            onChange={(e) => updateForm({birthday: e.target.value})}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="allergies">Allergies</label>
                        <input
                            type="text"
                            className="form-control"
                            id="allergies"
                            value={form.allergies}
                            onChange={(e) => updateForm({allergies: e.target.value})}
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
                        <label htmlFor="counselor">Do they want to talk to a counselor?</label>
                    </div>

                    <div className="form-group">
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="counselorOptions"
                                id="counYes"
                                value="Yes"
                                checked={form.counselor === "Yes"}
                                onChange={(e) => updateForm({counselor: e.target.value})}
                            />
                            <label htmlFor="posYes" className="form-check-label">Yes</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="counselorOptions"
                                id="counNo"
                                value="No"
                                checked={form.counselor === "No"}
                                onChange={(e) => updateForm({counselor: e.target.value})}
                            />
                            <label htmlFor="posNo" className="form-check-label">No</label>
                        </div>
                    </div>
                    <div className="form-group">
                        <input
                            type="submit"
                            value="Submit"
                            className="btn btn-primary"
                        />
                    </div>

                </form>
            </div>
        </div>
    );
} 