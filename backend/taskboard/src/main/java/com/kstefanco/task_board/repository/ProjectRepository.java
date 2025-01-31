package com.kstefanco.task_board.repository;

import com.kstefanco.task_board.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectRepository extends JpaRepository<Project,Long> {
}
