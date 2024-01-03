import React from 'react';
import CopyLinkButton from "../../utils/copyLinkButton";
import "./shareByNetworks.scss"

const ShareByNetworks = ({setShowShare}) => {

    const currentPageUrl = window.location.href;
    const shareText = 'Check out this awesome website!';

    const handleClick = (network) => {
        const currentPageUrl = window.location.href;
        const shareText = 'Check out this awesome page!';

        switch (network) {
            case 'facebook':
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentPageUrl)}`);
                break;
            case 'twitter':
                window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(currentPageUrl)}&text=${encodeURIComponent(shareText)}`);
                break;
            case 'whatsapp':
                window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + ' ' + currentPageUrl)}`);
                break;
            case 'telegram':
                window.open(`https://www.instagram.com/share?url=${encodeURIComponent(currentPageUrl)}&text=${encodeURIComponent(shareText)}`);
                break;
            case 'instagram':
                window.open(`https://www.instagram.com/?url=${encodeURIComponent(currentPageUrl)}&caption=${encodeURIComponent(shareText)}`);
                break;
            default:
                break;
        }
    };

    return (
        <div className="share">
            <div className="share__box">
                <span onClick={() => setShowShare(false)} className="share__close">
                    <i className="ri-close-line"></i>
                </span>
                <ul className="social share__social flexitem">
                    <li className="social__item">
                        <button onClick={() => handleClick("twitter")} className="social__link">
                            <i className="ri-twitter-line"></i>
                        </button>
                    </li>
                    <li className="social__item">
                        <button onClick={() => handleClick("facebook")} className="social__link">
                            <i className="ri-facebook-line"></i>
                        </button>
                    </li>
                    <li className="social__item">
                        <button onClick={() => handleClick("instagram")} className="social__link">
                            <i className="ri-instagram-line"></i>
                        </button>
                    </li>
                    <li className="social__item">
                        <button onClick={() => handleClick("telegram")} className="social__link">
                            <i className="ri-telegram-line"></i>
                        </button>
                    </li>
                    <li className="social__item">
                        <button onClick={() => handleClick("whatsapp")} className="social__link">
                            <i className="ri-whatsapp-line"></i>
                        </button>
                    </li>
                </ul>
                <div className="social__copy">
                    <p className="social__copy-text">Copy Link</p>
                    <CopyLinkButton linkToCopy={currentPageUrl}/>
                </div>
            </div>
        </div>
    );
};

export default ShareByNetworks;