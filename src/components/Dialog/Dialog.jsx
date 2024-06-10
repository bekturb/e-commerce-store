import React from 'react';
import "./dialog.scss"

const Dialog = ({onDialog, message}) => {
  return (
    <div className='dialog'>
        <div className="dialog__wrapper">
            <h1 className='dialog__main-title'>Confirmation!</h1>
            <h3 className='dialog__title'>{message}</h3>
            <div className='dialog__buttons'>
                <button onClick={() => onDialog(false)} className='dialog__button dialog__button--no'>No</button>
                <button onClick={() => onDialog(true)} className='dialog__button'>Yes</button>
            </div>
        </div>
    </div>
  )
}

export default Dialog