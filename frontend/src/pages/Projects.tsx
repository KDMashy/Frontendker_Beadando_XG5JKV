import React, { ChangeEvent, useState } from 'react';
import Project, { IProject } from '../components/Project';
import Fox from '../res/fox.png';
import '../styles/Main.css';

function Projects() {
  const [projectList, setProjectList] = useState<IProject[]>([]);
  const [name, setName] = useState<string>("");
  const [user, setUser] = useState<string>("");
  const [language, setLanguage] = useState<string>("");
  const [githuburl, setGithuburl] = useState<string>("");

  const handleChange = (evt: ChangeEvent<HTMLInputElement>): void => {
    if (evt.target.name === "projectName"){
      setName(evt.target.value);
    } else if (evt.target.name === "projectOwner"){
      setUser(evt.target.value);
    } else if (evt.target.name === "projectLanguage"){
      setLanguage(evt.target.value);
    } else {
      setGithuburl(evt.target.value)
    }
  };

  const addProject = (): void => {
    const newProject = {
      projectName: name,
      projectOwner: user,
      projectLanguage: language,
      projectUrl: githuburl
    };
    setProjectList([...projectList, newProject]);
    setName("");
    setUser("");
    setLanguage("");
    setGithuburl("");
  };

  return (
    <div className='site'>
      <div className='maincontent'>
        <div className='defaultContainer'>
          <h1>Project registering on this site</h1>
          <input 
            type='text'
            placeholder='Project name'
            name='projectName'
            value={name}
            onChange={handleChange} />
          <input 
            type='text'
            placeholder='Project Owner'
            name='projectOwner'
            value={user}
            onChange={handleChange}/>
          <input 
            type='text'
            placeholder='Project Language'
            name='projectLanguage'
            value={language}
            onChange={handleChange}/>
          <input 
            type='text'
            placeholder='Project GitHub'
            name='projectUrl'
            value={githuburl}
            onChange={handleChange}/>
          <button id='projectCreate' onClick={addProject}> Register Project </button>
        </div>
        <div className="projectsContainer">
          <h2>Projects</h2>
          {projectList.map((project: IProject, key: number) => {
            return <Project key={key} project={project} />;
          })}
        </div>
      </div>
    </div>
  )
}

export default Projects