import { Link } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import EditModal from './EditModal';
import axios from 'axios';


function Project ({ id, name, desc, isCompleted }) {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const openEditModal= () => {
      setIsEditModalOpen(true);
    }

    const closeEditModal = () => {
      setIsEditModalOpen(false);
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

    const updateProject = (projectName, projectDesc, isCompleted) => {
        const updatedProject = { name: projectName, description: projectDesc , completed: isCompleted};
        axios.put(`http://localhost:8080/api/projects/${id}`,updatedProject)
        .then(response => { console.log(`Project updated`)})
        .catch((error) => {console.error('Error updating project:',error)});
        closeEditModal();
    }

    const deleteProject = () => {
        axios.delete(`http://localhost:8080/api/projects/${id}`)
        .then(response => { console.log(`Deleted project with name: ${name}`)})
        .catch((error) => {console.error('Error deleting project:',error)});
    }

    return(
        <div className='project'>
            <Link to={`/project/${id}`} className="project-link">
                <div className='project-name'> &gt; {name} </div>
                <div className='project-desc'> {desc} </div>
                <div className='task-state'>
                    <div className='open-tasks'> </div>
                    <div className='in-progress-tasks'> </div>
                    <div className='done-tasks'> </div>
                </div>
            </Link>
            <div className="task-actions-menu" onClick={toggleMenu} ref={menuRef}>
                <span className="material-symbols-outlined">more_vert</span>

                {isMenuOpen && (
                  <div className="dropdown-menu">
                    <button onClick={openEditModal}>
                      Edit
                    </button>
                    <button onClick={deleteProject}>
                      Delete
                    </button>
                  </div>
                )}
            </div>
            {isEditModalOpen && ( <EditModal handleClick={updateProject} closeModal={closeEditModal} oldName={name} oldDesc={desc} type={"project"} projectState={isCompleted} /> )}
        </div>
    );
}


export default Project