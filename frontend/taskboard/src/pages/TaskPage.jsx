import Task from '../components/Task';
import { Link, useParams } from 'react-router-dom';
import { useState,useEffect } from 'react';
import Modal from '../components/Modal';
import axios from 'axios';
import {closestCorners, DndContext, useSensor, useSensors, MouseSensor, TouchSensor, KeyboardSensor, PointerSensor, DragOverlay} from "@dnd-kit/core"
import {arrayMove, verticalListSortingStrategy} from "@dnd-kit/sortable"
import TaskColumn from '../components/TaskColumn';
import ErrorBoundary from '../components/ErrorBoundary';

function TaskPage() {

    const { projectId } = useParams();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [tasks, setTasks] = useState([]);

    const [activeId, setActiveId] = useState(null);

    const pointerSensor = useSensor(PointerSensor, {
        activationConstraint: {
          distance: 0.01
        }
      })
      const mouseSensor = useSensor(MouseSensor)
      const touchSensor = useSensor(TouchSensor)
      const keyboardSensor = useSensor(KeyboardSensor)
    
      const sensors = useSensors(
        mouseSensor,
        touchSensor,
        keyboardSensor,
        pointerSensor
    );


    useEffect(() => {
        fetchTasks()
    },[projectId,tasks]);

    const fetchTasks = () => {
        axios.get(`http://localhost:8080/api/projects/${projectId}/tasks`)
          .then((response) => {
            setTasks(response.data)
          })
          .catch((error) => {
            console.error('Error fetching tasks:', error)
          })
    };

    const openModal= () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleAddTask = (taskName, taskDesc) => {
        const newTask = { name: taskName, description: taskDesc }
        axios.post(`http://localhost:8080/api/projects/${projectId}/tasks`, newTask)
          .then((response) => {
            setTasks([...tasks, response.data])
            closeModal()
          })
          .catch((error) => {
            console.error('Error creating task:', error)
        })
    }

    const deleteTask = (taskId, taskName) => {
        const taskToDelete = tasks.find(task => task.id === taskId);
        if (!taskToDelete) {
          console.error(`Task with id ${taskId} not found`);
          return;
        }
    
        axios.delete(`http://localhost:8080/api/projects/${projectId}/tasks/${taskId}`)
          .then(response => {
            console.log(`Deleted task with name: ${taskName}`);
            setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
          })
          .catch((error) => {
            console.error('Error deleting task:', error);
          });
      };


    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (active.id === over.id) return;
      
        const draggedTask = tasks.find((task) => task.id === active.id);
        const overTask = tasks.find((task) => task.id === over.id);
        const dropLocation = over.id;

        // if overTask is not null, means we are dropping on a task
        if(overTask){

            // droping in the same column
            if(draggedTask.taskState === overTask.taskState){ 
                const newTaskIndex = tasks.indexOf(overTask);
                setTasks((tasks) => arrayMove(tasks, getTaskPos(active.id), newTaskIndex));
                return;
            }

            // dropping to a new column (updating taskState)
            draggedTask.taskState = overTask.taskState;
            axios.put(`http://localhost:8080/api/projects/${projectId}/tasks/${draggedTask.id}`,draggedTask)
            .then(response => { console.log(`Task updated`)})
            .catch((error) => {console.error('Error updating task:',error)});

            setTasks((tasks) => {
              return tasks.map((task) => (task.id === active.id ? draggedTask : task));
            });

        }else{
            // dropping into empty column
            draggedTask.taskState = over.id;
            axios.put(`http://localhost:8080/api/projects/${projectId}/tasks/${draggedTask.id}`,draggedTask)
            .then(response => { console.log(`Task updated`)})
            .catch((error) => {console.error('Error updating task:',error)});

            setTasks((tasks) => {
              return tasks.map((task) => (task.id === active.id ? draggedTask : task));
            });
        }

        setActiveId(null);
      
    };
    
    const handleDragOver = (event) => {
        const { active, over } = event;
        const activeTask = tasks.find((task) => task.id === active.id);
        const overTask = tasks.find((task) => task.id === over.id);
        const overIndex = tasks.indexOf(overTask);

        if (overTask) {
            const newTasks = arrayMove(tasks, getTaskPos(active.id), overIndex);
            setTasks(newTasks);
        }
        
    }
    
    const handleDragStart = (event) => {
        setActiveId(event.active.id);
    }

    const getTaskPos= id => tasks.findIndex(task => task.id === id);

    return(
        <>
            <ErrorBoundary>
                <div className="navbar">
                    <div className='title'>Task board</div>
                    <div className='buttons'>
                        <div className='btn new-task' onClick={openModal}> + Add Task</div>
                        <Link to="/" className='btn-link'> <div className='btn back'> &lt; Back</div> </Link>
                    </div>
                </div>

                <DndContext sensors={sensors} collisionDetection={closestCorners} onDragStart={handleDragStart} onDragEnd={handleDragEnd} onDragOver={handleDragOver}>
                    <div className="tasks-container">
                        <TaskColumn type={"open"} tasks={tasks.filter((task) => task.taskState === "OPEN")} projectId={projectId} id={"OPEN"} deleteTask={deleteTask} />

                        <TaskColumn type={"in-progress"} tasks={tasks.filter((task) => task.taskState === "IN_PROGRESS")} projectId={projectId} id={"IN_PROGRESS"} deleteTask={deleteTask} />

                        <TaskColumn type={"done"} tasks={tasks.filter((task) => task.taskState === "DONE")} projectId={projectId} id={"DONE"} deleteTask={deleteTask} />
                    </div>  

                    <DragOverlay>
                        {tasks.find((task) => task.id === activeId) ? (
                        <Task 
                            taskId={activeId} 
                            taskName={tasks.find((task) => task.id === activeId).name || ''}
                            taskDesc={tasks.find((task) => task.id === activeId).description || ''}
                            taskState={tasks.find((task) => task.id === activeId).taskState || ''}
                            projectId={tasks.find((task) => task.id === activeId).projectId || ''}
                        /> 
                        ): null}          
                    </DragOverlay>
                </DndContext>

                {isModalOpen && ( <Modal handleClick={handleAddTask} closeModal={closeModal} subject="Task"/> )}
            </ErrorBoundary>
        </>
    );
}

export default TaskPage