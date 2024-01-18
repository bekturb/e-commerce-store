import React from 'react';
import {toast} from "react-hot-toast";

const CopyLinkButton = ({ linkToCopy }) => {

    const handleCopyClick = async () => {
        try {
            await navigator.clipboard.writeText(linkToCopy);
            toast.success("Copied successfully");
        } catch (err) {
            toast.error('Unable to copy text: ', err);
        }
    };

    return (
        <div>
            <span className="copy-icon" onClick={handleCopyClick}>
                <i className="ri-file-copy-line"></i>
            </span>
        </div>
    );
};

export default CopyLinkButton;