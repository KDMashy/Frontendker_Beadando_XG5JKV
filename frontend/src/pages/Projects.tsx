import axios from 'axios';
import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import Project, { IProject } from '../components/Project';
import '../styles/Main.css';

function Projects() {
  const [projectList, setProjectList] = useState<IProject[]>([]);
  const [name, setName] = useState<string>("");
  const [user, setUser] = useState<string>("");
  const [language, setLanguage] = useState<string>("");
  const [githuburl, setGithuburl] = useState<string>("");
  const [logged, setLogged] = useState(false);

  const cookies = new Cookies();
  var token = cookies.get('token');
  var isLoggedIn = cookies.get('loggedin');

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

  var getList: IProject[] = [];
  const getAllProjects = async () => {
    const resp = await axios.get('http://localhost:3069/project/myprojects', {
      headers: {"Authorization": `Bearer ${token}`}
    })
    var opened: string = JSON.stringify(resp.data).replace('[','').replace(']','');
    if (opened.length > 0) {
      var listed: string[] = opened.split('},{');
      listed.forEach(element => {
        if (element.startsWith('{') && element.endsWith('}')){
          getList.push(JSON.parse(`${element}`));
        } else if (element.startsWith('{')){
          getList.push(JSON.parse(`${element}}`));
        } else if(element.endsWith('}')) {
          getList.push(JSON.parse(`{${element}`));
        } else {
          getList.push(JSON.parse(`{${element}}`));
        }
      });
      var listedLength = listed.length;
      if (listedLength != getList.length){
        for(var i = 0; i < (getList.length/2); i++){
          getList.pop();
        }
      }
      setProjectList(getList);
    }
  }

  useEffect(() => {
    if (isLoggedIn === 'true'){
      setLogged(true);
    } else {
      setLogged(false);
    }
    getAllProjects();
  }, [1]);

  const addProject = async () => {
    await axios.post('http://localhost:3069/project/create', {
      projname: name,
      projown: user,
      projlang: language,
      projurl: githuburl
    }, {
      headers: {"Authorization": `Bearer ${token}`}
    })
    window.location.replace("http://localhost:3000/projects");
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
          <button className='projectCreate' onClick={addProject}> Register Project </button>
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