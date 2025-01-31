package com.kstefanco.task_board.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;


import java.time.LocalDate;

@Entity
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank(message = "Task name cannot by blank")
    private String name;
    private String description;
    private LocalDate dateCreated;
    @Enumerated(EnumType.STRING)
    private TaskState taskState;

    @ManyToOne(fetch= FetchType.LAZY)
    @JoinColumn(name="project_id", nullable = false)
    @JsonIgnore
    private Project project;

    public Task(String name, String description) {
        this.name = name;
        this.description = description;
        this.dateCreated = LocalDate.now();
        this.taskState = TaskState.OPEN;
    }

    public Task() {

    }

    @PrePersist
    protected void onCreate() {
        if (this.dateCreated == null) {
            this.dateCreated = LocalDate.now();
        }
        if (this.taskState == null) {
            this.taskState = TaskState.OPEN;
        }
    }

    public Long getId() {
        return id;
    }

    public TaskState getTaskState() {
        return taskState;
    }

    public void setTaskState(TaskState taskState) {
        this.taskState = taskState;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    public Project getProject() {
        return project;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDate getDateCreated() {
        return dateCreated;
    }

    @Override
    public String toString() {
        return "Task [name=" + name + ", description=" + description + ", state=" + taskState + ", dateCreated=" + dateCreated + "]";
    }
}
