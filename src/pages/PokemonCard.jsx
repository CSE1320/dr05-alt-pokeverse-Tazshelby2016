import React, { useEffect, useState } from 'react';
import { Card, CardContent,CardHeader, CardDescription, Icon, Image, Input, List, ListItem, ListContent, Label} from 'semantic-ui-react'
import '../App.scss';
import axios from 'axios'

const SearchForm = ({pokeSetter})=>{
  const [searchVal, setSearch] = useState("");

  return (
  <>
    <Input id="inptValue" value={searchVal} onChange={val => setSearch(val.target.value)} fluid
    icon={<Icon name='search' inverted circular link onClick={() => pokeSetter(searchVal)} />}
    placeholder='Search for Pokemon...'/>
  </>
  );
}


const PokemonCard = ({pokemonID}) => {
  const [data, setData] = useState(null);
  const pokéurl = "https://pokeapi.co/api/v2/pokemon/" + pokemonID;
  useEffect(
    () =>{
      axios.get(pokéurl)
      .then(
        (response) => {
          console.log(response.data);
          setData(response.data);
        }
      )
      .catch(
        (error)=>{
          console.error(error);
          console.error(pokéurl)
        }
      )
    }, [pokéurl, pokemonID]
  );
  if (data === null){
    console.error("Returned nothing.");
    // This is bad, but I do not remember how to fix.
    return (<Card><CardHeader>Failed To Retrieve Pokemon.</CardHeader></Card>);
  }
  if (data.types === null){
    console.error("Returned no type.");
    // This is bad, but I do not remember how to fix.
    return(<Card><CardHeader>Failed To Retrieve Pokemon.</CardHeader></Card>);
  }
  const typeList = data.types.map((type, index) => <Label key={index}>{type.type.name}</Label>);
  const statList = data.stats.map((stat, index) => <ListItem key={index}><ListContent floated='left'>{stat.stat.name}</ListContent><ListContent floated = "right">{stat.base_stat}</ListContent></ListItem>);

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
  const [poke, setPoke] = useState("bulbasaur");
  return (
    <div className="CenteredLayout">
      <div>
        <SearchForm pokeSetter={setPoke}></SearchForm>
        <PokemonCard pokemonID={poke}></PokemonCard>
      </div>
    </div>
  );
};
  
export default PokemonCardPage;
