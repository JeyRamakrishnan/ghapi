import logo from './logo.svg';
import { useState, useEffect } from 'react';
import './App.css';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

function App() {
  const [avatar_url, setAvatarURL] = useState();
  const [gitHubUserName, setGitHubUsername] = useState();
  const [repoData, setRepoData] = useState();

  async function repoDataURL() {
    //Get repo data about github user
    await fetch("https://api.github.com/users/JeyRamakrishnan/repos")
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(36, result);
          const list = result.map((item) => (
            <div className="text-center">
              <a target="_blank" href={item.svn_url}>
                {item.name}
              </a>
            </div>
          ));
          setRepoData(list);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  useEffect(() => {
    fetch("https://api.github.com/users/JeyRamakrishnan")
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          setAvatarURL(result.avatar_url);
          setGitHubUsername(result.login);
        },
        (error) => {
          console.log(error);
        }
      );
  }, []);
  return (
    <div className="App w-100 min-vh-100 justify-content-center align-items-center d-flex flex-column">
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={avatar_url} />
        <Card.Body>
          <Card.Title>{gitHubUserName}</Card.Title>
          <Card.Text>
            Some quick example text .
          </Card.Text>
          <Button variant="primary" onClick={repoDataURL}>List my public repos</Button>
        </Card.Body>
      </Card>
      {repoData}
    </div>
  );
}

export default App;
