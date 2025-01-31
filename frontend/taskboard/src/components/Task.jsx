import { useState, useRef, useEffect } from "react";
import axios from "axios";
import EditModal from "./EditModal";
import { useSortable } from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities"

function Task({ taskName, taskDesc, projectId, taskId, taskState, deleteTask}) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    
    const [disableDnD, setDisableDnD] = useState(false);
    const {attributes, listeners, setNodeRef, transform, transition} = useSortable({id: taskId, disabled: disableDnD});

    const openEditModal= () => {
      setIsEditModalOpen(true);
      setDisableDnD(true);
    }

    const closeEditModal = () => {
      setIsEditModalOpen(false);
      setDisableDnD(false);
    };

    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
          setIsMenuOpen(false);
        }
      };
  
      document.addEventListener("mousedown", handleClickOutside);
      
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [menuRef]);

    const handleDeleteTask = (e) => {
      e.stopPropagation(); 
      setDisableDnD(true); 
      deleteTask(taskId,taskName);
    }

    const updateTask = (taskName, taskDesc, taskState) => {
      const updatedTask = { name: taskName, description: taskDesc , taskState: taskState};
      axios.put(`http://localhost:8080/api/projects/${projectId}/tasks/${taskId}`,updatedTask)
      .then(response => { console.log(`Task updated`)})
      .catch((error) => {console.error('Error updating task:',error)});
      closeEditModal();
    }

    const style = {
      transition,
      transform: CSS.Transform.toString(transform),
    };

    const shortenName = (taskName) => {
      if(taskName.length > 60 ){
        return(taskName.substring(0,59) + "...");
      }else{
        return(taskName);
      }
    }

    const shortenDesc = (taskDesc) => {
      if(taskName.length > 30 && taskDesc.length > 30 ){
        return(taskDesc.substring(0,30) + "...");
      }else if(taskName.length < 30 && taskDesc.length > 60 ){
        return(taskDesc.substring(0,59) + "...");
      }else{
        return(taskDesc);
      }
    }

    return (
      <div ref={setNodeRef} {...attributes} {...listeners} style={style} className="task">
        <div className="task-name">&gt;&gt; {shortenName(taskName)}</div>
        <div className="task-desc">- {shortenDesc(taskDesc)}</div>
        <div className="task-actions-menu" onClick={ toggleMenu} ref={menuRef}>
          <span className="material-symbols-outlined">more_vert</span>

          {isMenuOpen && (
            <div className="dropdown-menu" >
              <button onClick={openEditModal}>
                Edit
              </button>
              <button onClick={handleDeleteTask}>
                Delete
              </button>
            </div>
          )}
        </div>

        {isEditModalOpen && ( 
          <EditModal 
            handleClick={updateTask} 
            closeModal={closeEditModal} 
            oldName={taskName} 
            oldDesc={taskDesc} 
            oldState={taskState} 
            type={"task"} 
            /> )}
      </div>
    );
  }
  
  export default Task;