import React, { useState } from 'react';
import {toast} from "react-hot-toast";

const CopyLinkButton = ({ linkToCopy }) => {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopyClick = async () => {
        try {
            await navigator.clipboard.writeText(linkToCopy);
            setIsCopied(true);
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