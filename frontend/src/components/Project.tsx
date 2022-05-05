import React from "react";
import '../styles/Main.css'

export interface IProject {
    projectName: string,
    projectOwner: string,
    projectLanguage: string,
    projectUrl: string
}

interface Props {
    project: IProject,
}

const Project = ({ project }: Props) => {
    return (
        <div className="project">
            <div className="content">
                <span>{project.projectName}</span>
                <span>{project.projectOwner}</span>
                <span>{project.projectLanguage}</span>
                <a href={project.projectUrl}> {project.projectName} GitHub</a>
                <button name=""> Delete </button>
            </div>
        </div>
    )
}

export default Project