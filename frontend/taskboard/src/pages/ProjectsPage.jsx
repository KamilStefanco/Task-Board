import Project from '../components/Project';
import '../styles/ProjectsPage.css'
import { useEffect, useState } from 'react';
import Modal from '../components/Modal';
import axios from 'axios';

function ProjectsPage() {

    const [projects, setProjects] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetchProjects();
    }, [])

    const fetchProjects = () =>{
        axios.get('http://localhost:8080/api/projects')
        .then((response) => { setProjects(response.data)})
        .catch((error)=> {console.error('Error fetching tasks:',error)})
    }

    const openModal= () => {
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleAddProject = (projectName, projectDesc) => {
        const newProject = { name: projectName, description: projectDesc};
        axios.post(`http://localhost:8080/api/projects`,newProject)
        .then((response) => { 
            setProjects([...projects, response.data])
            closeModal();
        })
        .catch((error) => {
            console.error('Error creating project:',error)
        });
    };
    

    return(
        <div className="container">
            <div className="navbar">
                <div className='title'>Task board</div>
                <div className='buttons'>
                    <div className='btn new-project' onClick={openModal}>+ Add project</div>
                </div>
            </div>
            <div className='project-title'>Projects</div>

            <div className="project-box">
                {projects.map((project, index) => (
                        <Project key={project.id} id={project.id} name={project.name} desc={project.description} isCompleted={project.completed} />
                    ))}
            </div>

            {isModalOpen && ( <Modal handleClick={handleAddProject} closeModal={closeModal} subject="Project"/> )}
        </div>
    );

}

export default ProjectsPage