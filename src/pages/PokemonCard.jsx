import React, { useEffect, useState } from 'react';
import { Card, CardContent,CardHeader, CardDescription, Icon, Image, Input, List, ListItem, ListContent, Label} from 'semantic-ui-react'
import '../App.scss';
import axios from 'axios'

const SearchForm = ({poke, pokeSetter})=>{
  return (
  <>
    <Input id="Search" value={poke} onChange={val => pokeSetter(val.target.val)} fluid
    icon={<Icon name='search' inverted circular link />}
    placeholder='Search for Pokemon...'/>
  </>
  );
}


const PokemonCard = ({pokemonID}) => {
  const [data, setData] = useState(null);
  const pokéurl = "https://pokeapi.co/api/v2/pokemon/" + pokemonID;
  useEffect(() =>{
    axios.get(pokéurl)
    .then((response) => {
      console.log(response.data);
      setData(response.data);
    })
    .catch((error)=>{
      console.error(error);
      console.error(pokéurl)
    })
  }, [pokemonID]);
  if (data === null){
    console.error("Returned nothing.");
    return;
  }
  if (data.types === null){
    console.error("Returned no type.");
    return;
  }


  const typeList = data.types.map((type) => <Label>{type.type.name}</Label>);
  const statList = data.stats.map((stat) => <ListItem><ListContent floated='left'>{stat.stat.name}</ListContent><ListContent floated = "right">{stat.base_stat}</ListContent></ListItem>);

  return (
    <Card>
      <Image src={data.sprites.front_default}/>
      <CardContent>
        <CardHeader>
          {data.name}
        </CardHeader>
        <CardDescription>
          <List divided size="large">
            {statList}
          </List>
        </CardDescription>
      </CardContent>
      <CardContent Extra>
      {typeList}
      </CardContent>
    </Card>
    );
}
const PokemonCardPage = () => {
  const [poke, setPoke] = useState(null);
  return (
    <div className="CenteredLayout">
      <div>
        <SearchForm poke={poke} pokeSetter={setPoke}></SearchForm>
        <p>{poke}</p>
        <PokemonCard pokemonID="type-null"></PokemonCard>
      </div>
    </div>
  );
};
  
export default PokemonCardPage;
