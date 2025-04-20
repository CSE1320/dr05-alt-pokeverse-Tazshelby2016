
import React, {useState, useEffect} from 'react';
import { Segment, Header, Button, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const Home = () => {

  let base = "https://pokeapi.co/api/v2"
  let pokemon_pt = "pokemon"
  let type_pt = "type"
  let query = 4
  var api = `${base}/${pokemon_pt}/${query}`

  const [data, setData] = useState({})

  useEffect(() => {
    fetch(api)
    .then(response => response.json())
    .then(json => {
      console.log(json);
      return json;
    })
    .then(setData)
    .catch(console.error)
  }, [api]);

  

  return (
    <div className="CenteredLayout">
      <Segment raised stacked color='red'>
        <Header as="h1">Welcome to the Pokeverse!</Header>
  
        <Header as="h1"></Header>
        <Link to="/card">
          <Button primary animated>
            <Button.Content visible>Let's GO!</Button.Content>
            <Button.Content hidden>
              <Icon name='arrow right' />
            </Button.Content>
          </Button>
        </Link>
      </Segment>
    </div>
  );
};
  
export default Home;