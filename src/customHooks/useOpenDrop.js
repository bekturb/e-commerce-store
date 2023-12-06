import React, {useState} from 'react';

const UseOpenDrop = () => {
    const [open, setOpen] = useState("");
    const handleOpenDrop = (openDrop) => {
        if (open === openDrop) {
            setOpen("");
        } else {
            setOpen(openDrop)
        }
    }

    return {handleOpenDrop, open}
};

export default UseOpenDrop;