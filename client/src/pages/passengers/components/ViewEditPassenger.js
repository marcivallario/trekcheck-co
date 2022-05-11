import { useState, useEffect } from 'react';
import ViewPassenger from './ViewPassenger';
import EditPassenger from './EditPassenger';


//styles in modal.css

function ViewEditPassenger({ onClose, show, passenger }) {

    
    const [toggleEdit, setToggleEdit] = useState(false);

    if (!show) {
        return null
    }

    if (toggleEdit) {
        return <EditPassenger passenger={passenger} onClose={onClose} setToggleEdit={setToggleEdit}/>
    } else {
        return <ViewPassenger passenger={passenger} onClose={onClose} setToggleEdit={setToggleEdit}/>
    }
}

export default ViewEditPassenger;