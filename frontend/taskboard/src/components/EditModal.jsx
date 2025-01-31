
import { useState } from 'react';

function EditModal({oldName, oldDesc, closeModal, handleClick, oldState, type, projectState}) {
    const [name, setName] = useState(oldName);
    const [desc, setDesc] = useState(oldDesc);
    const [taskState, setTaskState] = useState(oldState);
    const [isCompleted, setIsCompleted] = useState(projectState);

    const handleStateChange = (newState) => {
        setTaskState(newState);
    };

    const toggleCompletion = (event) => {
      event.preventDefault();
      setIsCompleted((prevState) => !prevState);
  };

    const onSubmit = (e) => {
        e.preventDefault();
        if (name && desc) {
          handleClick(name, desc, taskState); 
        }
    };

    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>{type === "task" ? "Edit Task" : "Edit Project"}</h2>
          <form onSubmit={onSubmit}>
            <div>
              <label>New {type === "task" ? "Task" : "Project"} Title</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label>New {type === "task" ? "Task" : "Project"} Description</label>
              <textarea
                type="text"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                className='modal-desc'
              />
            </div>

            <label>Set {type === "task" ? "Task" : "Project"} State</label>

            {type === "task" && (
              <div className="dropdown-edit-menu">
                  <button type="button" onClick={() => handleStateChange("OPEN")} className={taskState === "OPEN" ? "active" : ""}>
                      Open
                  </button>
                  <button type="button" onClick={() => handleStateChange("IN_PROGRESS")} className={taskState === "IN_PROGRESS" ? "active" : ""}>
                      In Progress
                  </button>
                  <button type="button" onClick={() => handleStateChange("DONE")} className={taskState === "DONE" ? "active" : ""}>
                      Done
                  </button>
              </div>
            )}

            {type === "project" && (
              <div className="isCompleted-btn">
                  <button type="checkbox" className={`toggle-completed ${isCompleted ? "completed" : ""}`} onClick={toggleCompletion}>
                  </button>
                    {isCompleted ? "Completed" : "Not Completed"}
              </div>
            )}

            <button type="submit">Edit</button>
            <button type="button" onClick={closeModal}>Close</button>
          </form>
        </div>
      </div>
    );

}

export default EditModal