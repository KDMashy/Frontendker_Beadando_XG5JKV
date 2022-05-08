import axios from "axios";
import React from "react";
import Cookies from "universal-cookie";
import '../styles/Main.css'

export interface IProject {
    id?: number,
    projname: string,
    projown: string,
    projlang: string,
    projurl: string
}

interface Props {
    project: IProject,
}

const cookies = new Cookies();
var token = cookies.get('token');
const deleteProject = async (name: string) => {
    await axios.delete(`http://localhost:3069/project/remove/${name}`, {
        headers: {"Authorization": `Bearer ${token}`}
    })
    window.location.replace("http://localhost:3000/projects");
}

const Project = ({ project }: Props) => {
    return (
        <div className="project">
            <div className="content">
                <span>{project.projname}</span>
                <span>{project.projown}</span>
                <span>{project.projlang}</span>
                <a href={project.projurl}> {project.projname} GitHub</a>
                <button className='projectDelete' onClick={() => {
                    deleteProject(project.projname);
                }}> Delete </button>
            </div>
        </div>
    )
}

export default Project