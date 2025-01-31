package com.kstefanco.task_board.service;

import com.kstefanco.task_board.entity.Project;
import com.kstefanco.task_board.exceptions.ProjectNotFoundException;
import com.kstefanco.task_board.exceptions.TaskNotFoundException;
import com.kstefanco.task_board.entity.Task;
import com.kstefanco.task_board.entity.TaskState;
import com.kstefanco.task_board.repository.ProjectRepository;
import com.kstefanco.task_board.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

    private final TaskRepository taskRepository;
    private final ProjectRepository projectRepository;

    public TaskService(TaskRepository taskRepository, ProjectRepository projectRepository){
        this.taskRepository = taskRepository;
        this.projectRepository = projectRepository;
    }

    public Task createTask(Long projectId, Task task){
        Project project = projectRepository.findById(projectId).orElseThrow(() -> new ProjectNotFoundException(projectId));

        task.setProject(project);

        return taskRepository.save(task);
    }

    public void deleteTask(Long taskId){
        taskRepository.deleteById(taskId);
    }

    public List<Task> getAllTasks(){
        return taskRepository.findAll();
    }

    public List<Task> getAllTasksForProject(Long projectId){
        return taskRepository.findByProjectId(projectId);
    }

    public List<Task> getOpenTasksForProject(Long projectId){
        return taskRepository.findByProjectIdAndTaskState(projectId, TaskState.OPEN);
    }

    public List<Task> getInProgressTasksForProject(Long projectId){
        return taskRepository.findByProjectIdAndTaskState(projectId, TaskState.IN_PROGRESS);
    }

    public List<Task> getDoneTasksForProject(Long projectId){
        return taskRepository.findByProjectIdAndTaskState(projectId, TaskState.DONE);
    }

    public Task changeTaskState(Long taskId, TaskState newState){
        Task task = taskRepository.findById(taskId).orElseThrow(() -> new TaskNotFoundException(taskId));
        task.setTaskState(newState);
        return taskRepository.save(task);
    }

    public Task updateTask(Long projectId, Long taskId, Task updatedTask){
        Task task = taskRepository.findById(taskId).orElseThrow(() -> new TaskNotFoundException(taskId));

        Project project = projectRepository.findById(projectId).orElseThrow(() -> new ProjectNotFoundException(projectId));

        if(!task.getProject().getId().equals(projectId)){
            throw new IllegalArgumentException("Task does not belong to the specified project");
        }

        if(updatedTask.getName() != null){
            task.setName(updatedTask.getName());
        }

        if(updatedTask.getDescription() != null){
            task.setDescription(updatedTask.getDescription());
        }

        if(updatedTask.getTaskState() != null){
            task.setTaskState(updatedTask.getTaskState());
        }

        return taskRepository.save(task);
    }

    public Task getTaskById(Long taskId){
        return taskRepository.findById(taskId).orElseThrow(() -> new TaskNotFoundException(taskId));
    }

}
