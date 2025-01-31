package com.kstefanco.task_board.exceptions;

public class ProjectNotFoundException extends RuntimeException{
    public ProjectNotFoundException(Long id) {
        super("Project with id " + id + " not found");
    }
}
