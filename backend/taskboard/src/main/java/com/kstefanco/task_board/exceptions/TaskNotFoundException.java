package com.kstefanco.task_board.exceptions;

public class TaskNotFoundException extends RuntimeException{
    public TaskNotFoundException(Long id) {
        super("Task with id " + id + " not found");
    }
}
