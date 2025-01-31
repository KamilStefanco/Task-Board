package com.kstefanco.task_board.service;

import com.kstefanco.task_board.entity.Project;
import com.kstefanco.task_board.exceptions.ProjectNotFoundException;
import com.kstefanco.task_board.repository.ProjectRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;

    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    public Project createProject(Project project){
        return projectRepository.save(project);
    }

    public void deleteProject(Long projectId){
        projectRepository.deleteById(projectId);
    }

    public List<Project> getAllProjects(){
        return projectRepository.findAll();
    }

    public Project getProjectById(Long projectId){
        return projectRepository.findById(projectId).orElseThrow(() -> new ProjectNotFoundException(projectId));
    }

    public Project setIsCompletedProject(Long projectId, boolean isCompleted){
        Project project = projectRepository.findById(projectId).orElseThrow(() -> new ProjectNotFoundException(projectId));
        project.setCompleted(isCompleted);
        return projectRepository.save(project);
    }

    public Project updateProject(Long projectId, Project updatedProject){
        Project project = projectRepository.findById(projectId).orElseThrow(() -> new ProjectNotFoundException(projectId));

        if(updatedProject.getName() != null){
            project.setName(updatedProject.getName());
        }

        if(updatedProject.getDescription() != null){
            project.setDescription(updatedProject.getDescription());
        }

        project.setCompleted(updatedProject.isCompleted());

        return projectRepository.save(project);
    }

}
