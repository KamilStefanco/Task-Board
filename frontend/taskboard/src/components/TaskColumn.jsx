import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import {  useDroppable } from "@dnd-kit/core";
import Task from "./Task";

function TaskColumn({tasks, type, projectId, id, deleteTask}){

    const taskState = type === "in-progress" ? "IN_PROGRESS" : type.toUpperCase();
    
    const { setNodeRef } = useDroppable({ id });

    return (<>
    
        <SortableContext id={id} items={tasks} strategy={verticalListSortingStrategy}>
                <div className="task-box" ref={setNodeRef}> 
                    <div className={`task-box-type ${type}`}>{type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()}</div>

                    {tasks.filter((task) => task.taskState === taskState).map((task) => (
                        <Task 
                            key={task.id} 
                            taskName={task.name}   
                            taskDesc={task.description} 
                            taskId={task.id} 
                            projectId={projectId} 
                            taskState={task.taskState}
                            deleteTask={deleteTask} />
                    ))}
                </div>
        </SortableContext>
        
    </>
    );
}

export default TaskColumn