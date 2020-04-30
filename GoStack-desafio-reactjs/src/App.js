import React, {useState, useEffect} from "react";
import api from './services/api';

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);
  const [title, setTitle] = useState('');
  const [adress, setAdress] = useState('');


  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const data = {
      title,
      adress,
      techs:[]
    }

    const response = await api.post('repositories', data);

    setRepositories([...repositories, response.data]);

  }

  async function handleRemoveRepository(id) {
    console.log(id);
    await api.delete(`repositories/${id}`);

    setRepositories(repositories.filter(repo => repo.id !== id));

  }

  return (
    <div>
      <div className="form-container">
        <div className="input-container">
          <input 
          type="text"
          value={title} 
          placeholder="Titulo"
          onChange={e => setTitle(e.target.value)}       
          />
          <input 
          type="text"
          value={adress}
          placeholder="Endereço"
          onChange={e => setAdress(e.target.value)}
          />
        </div>
        <button class="input-button" onClick={() => handleAddRepository()}>Adicionar</button>
      </div>
        <ul data-testid="repository-list">  
            {repositories.map(repository => (
              <div className="repo-container">
                <li key={repository.id}>
                  <p>{repository.title}</p>
                  <button onClick={() => handleRemoveRepository(repository.id)}>Remover</button>
                </li>
              </div>
            ))}           
        </ul>
      
    </div>
  );
}

export default App;
