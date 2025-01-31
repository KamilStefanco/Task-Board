package com.kstefanco.task_board.repository;

import com.kstefanco.task_board.entity.Task;
import com.kstefanco.task_board.entity.TaskState;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task,Long> {
    List<Task> findByProjectIdAndTaskState(Long projectId, TaskState state);
    List<Task> findByProjectId(Long projectId);
}
