
import { useState } from 'react';

function Modal({closeModal, handleClick, subject }) {
    const [taskName, setTaskName] = useState('');
    const [taskDesc, setTaskDesc] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();
        if (taskName && taskDesc) {
          handleClick(taskName, taskDesc); 
        }
    };

    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>Add New {subject}</h2>
          <form onSubmit={onSubmit}>
            <div>
              <label>{subject} Title</label>
              <input
                type="text"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                placeholder={`Enter ${subject} title`}
              />
            </div>
            <div>
              <label>{subject} Description</label>
              <textarea
                type="text"
                value={taskDesc}
                onChange={(e) => setTaskDesc(e.target.value)}
                placeholder={`Enter ${subject} description`}
                className='modal-desc'
              />
            </div>
            <button type="submit">Add {subject}</button>
            <button type="button" onClick={closeModal}>Close</button>
          </form>
        </div>
      </div>
    );

}

export default Modal