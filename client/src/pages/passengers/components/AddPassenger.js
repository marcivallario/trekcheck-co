import { useState } from 'react'; 
import { useSelector, useDispatch } from 'react-redux';
import { addPassenger } from '../../../state/slices/passengersSlice';
import "./addpassenger.css"

function AddPassenger({ show, onClose }) {
    const dispatch = useDispatch(); 
    const userId = useSelector(state => state.user.currentUser.id)
    const [ formData, setFormData ] = useState({
        user_id: userId,
        legal_first_name: "",
        legal_last_name: "",
        nickname: "",
        position: "",
        department: "",
        cell: "",
        email: "",
        dob: "",
        state_of_residence: "",
        passport: "",
        license: "",
        tsa_precheck: "",
        global_entry: "",
        seat_assignment_pref: [],
        notes: ""
    })
    const [ errors, setErrors ] = useState(null)
    
    let states = [ 'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY' ];
    const options = states.map((state, index) => {
        return <option key={index} value={state}>{state}</option>
    })

    function handleChange(e) {
        const key = e.target.name;
        const value = e.target.value;
        setFormData({...formData, [key]: value})
    }

    function handlePhoneChange(e) {
        setFormData({...formData, cell: formatPhoneNumber(e.target.value)})
    }


    function formatPhoneNumber(value) {
        if (!value) return value;
        const phoneNumber = value.replace(/[^\d]/g, '');
        const phoneNumberLength = phoneNumber.length;

        if (phoneNumberLength < 4) return phoneNumber;
        if (phoneNumberLength < 7) {
            return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
        }

        return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
            3,
            6
        )}-${phoneNumber.slice(6, 10)}`;

    }

    function handleSeatChange(e) {
        let seatOptions = formData.seat_assignment_pref
        e.target.checked ? seatOptions.push(e.target.value) : seatOptions = seatOptions.filter(o => o !== e.target.value)
        setFormData({...formData, seat_assignment_pref: seatOptions})
    }

    function discardModal() {
        setFormData({
            user_id: userId,
            legal_first_name: "",
            legal_last_name: "",
            nickname: "",
            position: "",
            department: "",
            cell: "",
            email: "",
            dob: "",
            state_of_residence: "",
            passport: "",
            license: "",
            tsa_precheck: "",
            global_entry: "",
            seat_assignment_pref: [],
            notes: ""
        })
        onClose()
    }
    
    function savePassenger() {
        const seatPref = formData.seat_assignment_pref.join()
        fetch('/passengers', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({...formData, seat_assignment_pref: seatPref})
            })
        .then(resp => {
            if (!resp.ok) {
                resp.json().then(resp => setErrors(resp.errors))
            } else {
                resp.json().then(newPassenger => {
                    dispatch(addPassenger(newPassenger))
                    onClose()
                    setFormData({
                        user_id: userId,
                        legal_first_name: "",
                        legal_last_name: "",
                        nickname: "",
                        position: "",
                        department: "",
                        cell: "",
                        email: "",
                        dob: "",
                        state_of_residence: "",
                        passport: "",
                        license: "",
                        tsa_precheck: "",
                        global_entry: "",
                        seat_assignment_pref: [],
                        notes: ""
                    })
                })
            }
        })
    }

    function displayErrors() {
        if (errors) {
            return (
                <div id="passenger-add-error" className="error-container">
                    {errors.map((err, index) => {
                        return <p key={index} className="error">{err}</p>
                    })}
                </div>
            )
        } else {
            return null
        }
    }

    if (!show) {
        return null
    }

    return (
        <div className="modal">
            <div className="modal-content">
                <div className="modal-header">
                    <h3 className="modal-title">Add Passenger</h3>
                </div>
                <div className="modal-body">
                    <form id="add-passenger">
                        <div className="name">
                            <label htmlFor="legal_first_name" className="required">Legal First Name</label>
                            <input name="legal_first_name" type="text" value={formData.legal_first_name} onChange={handleChange}/>
                        </div>
                        
                        <div className="name">
                            <label htmlFor="legal_last_name" className="required">Legal Last Name</label>
                            <input name="legal_last_name" type="text" value={formData.legal_last_name} onChange={handleChange}/>
                        </div>

                        <div className="name">
                            <label htmlFor="nickname">Nickname</label>
                            <input name="nickname" type="text" value={formData.nickname} onChange={handleChange}/>
                        </div>

                        <div className="role">
                            <label htmlFor="position" className="required">Position</label>
                            <input name="position" type="text" value={formData.position} onChange={handleChange}/>
                        </div>

                        <div className="role">
                            <label htmlFor="department" className="required">Department</label>
                            <input name="department" type="text" value={formData.department} onChange={handleChange}/>
                        </div>

                        <div className="contact">
                            <label htmlFor="cell" className="required">Cell</label>
                            <input name="cell" type="text" value={formData.cell} onChange={handlePhoneChange}/>
                        </div>

                        <div className="contact">
                            <label htmlFor="email" className="required">Email</label>
                            <input name="email" type="text" value={formData.email} onChange={handleChange}/>
                        </div>

                        <div className="details">
                            <label htmlFor="dob" className="required">Date of Birth</label>
                            <input name="dob" type="date" min="1900-01-01" max={new Date().toISOString().slice(0, 10)} value={formData.dob} onChange={handleChange}/>
                        </div>

                        <div className="details">
                            <label htmlFor="state_of_residence">State of Residence</label>
                            <select name="state_of_residence" value={formData.state_of_residence} onChange={handleChange}>
                                <option defaultValue value=""></option>
                                {options}
                            </select>
                        </div>

                        <div className="numbers">
                            <label htmlFor="passport">Passport</label>
                            <input name="passport" type="text" value={formData.passport} onChange={handleChange}/>
                        </div>

                        <div className="numbers">
                            <label htmlFor="license">License</label>
                            <input name="license" type="text" value={formData.license} onChange={handleChange}/>
                        </div>

                        <div className="numbers">
                            <label htmlFor="tsa_precheck">TSA Precheck</label>
                            <input name="tsa_precheck" type="text" value={formData.tsa_precheck} onChange={handleChange}/>
                        </div>

                        <div className="numbers">
                            <label htmlFor="global_entry">Global Entry</label>
                            <input name="global_entry" type="text" value={formData.global_entry} onChange={handleChange}/>
                        </div>

                        <div className="seats">
                            <label htmlFor="seat_pref" className="required">Seat Preference</label>
                            <div className="seat-options">
                                <div className="seat-wrapper">
                                    <label className="seat-option" htmlFor="window">Window</label>
                                    <input name="window" type="checkbox" value="Window" onChange={handleSeatChange}/>
                                </div>

                                <div className="seat-wrapper">
                                    <label className="seat-option" htmlFor="middle">Middle</label>
                                    <input name="middle" type="checkbox" value="Middle" onChange={handleSeatChange}/>
                                </div>
                                
                                <div className="seat-wrapper">
                                    <label className="seat-option" htmlFor="aisle">Aisle</label>
                                    <input name="aisle" type="checkbox" value="Aisle" onChange={handleSeatChange}/>
                                </div>
                            </div>
                        </div>

                        <div className="notes">
                            <label htmlFor="notes">Notes</label>
                            <textarea name="notes" value={formData.notes} onChange={handleChange}></textarea>
                        </div>
                        {displayErrors()}
                    </form>
                </div>
                <div className="modal-footer">
                    <button className="modal-button" onClick={discardModal}>Discard</button>
                    <button className="modal-button modal-save" onClick={savePassenger}>Save</button>
                </div>
            </div>
        </div>
    )
}

export default AddPassenger;