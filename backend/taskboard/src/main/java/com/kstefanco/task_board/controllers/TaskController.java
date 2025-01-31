package com.kstefanco.task_board.controllers;

import com.kstefanco.task_board.entity.Task;
import com.kstefanco.task_board.service.TaskService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects/{projectId}/tasks")
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping
    public ResponseEntity<List<Task>> getAllTasksByProjectId(@PathVariable Long projectId){
        List<Task> tasks = taskService.getAllTasksForProject(projectId);
        return new ResponseEntity<>(tasks,HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Task> createTask(@PathVariable Long projectId, @Valid @RequestBody Task task){
        Task createdTask = taskService.createTask(projectId,task);
        return new ResponseEntity<>(createdTask,HttpStatus.CREATED);
    }

    @GetMapping("/done")
    public ResponseEntity<List<Task>> getDoneTasksForProject(@PathVariable Long projectId){
        List<Task> tasks = taskService.getDoneTasksForProject(projectId);
        return new ResponseEntity<>(tasks,HttpStatus.OK);
    }

    @GetMapping("/open")
    public ResponseEntity<List<Task>> getOpenTasksForProject(@PathVariable Long projectId){
        List<Task> tasks = taskService.getOpenTasksForProject(projectId);
        return new ResponseEntity<>(tasks,HttpStatus.OK);
    }

    @GetMapping("/in-progress")
    public ResponseEntity<List<Task>> getInProgressTasksForProject(@PathVariable Long projectId){
        List<Task> tasks = taskService.getInProgressTasksForProject(projectId);
        return new ResponseEntity<>(tasks,HttpStatus.OK);
    }

    @GetMapping("/{taskId}")
    public ResponseEntity<Task> getTaskByTaskId(@PathVariable Long taskId){
        Task task = taskService.getTaskById(taskId);
        return new ResponseEntity<>(task,HttpStatus.OK);
    }

    @PutMapping("/{taskId}")
    public ResponseEntity<Task> updateTask(@PathVariable Long projectId, @PathVariable Long taskId, @Valid @RequestBody Task task){
        Task updatedTask = taskService.updateTask(projectId,taskId, task);
        return new ResponseEntity<>(updatedTask,HttpStatus.OK);
    }

    @DeleteMapping("/{taskId}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long taskId){
        taskService.deleteTask(taskId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
