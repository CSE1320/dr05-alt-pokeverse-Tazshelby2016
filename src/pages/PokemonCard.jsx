import React, { useEffect, useState } from 'react';
import { Card, CardContent,CardHeader, CardDescription, Icon, Image, Input, List, ListItem, Label} from 'semantic-ui-react'
import '../App.scss';

const SearchForm = ()=>{
  return (
  <>
    <Input fluid
    icon={<Icon name='search' inverted circular link />}
    placeholder='Search for Pokemon...'/>
  </>
  );
}


const PokemonCard = ({pokemonID}) => {
  return (
    <Card>
      <Image src="Owl.png"/>
      <CardContent>
        <CardHeader>
          MissingNo
        </CardHeader>
        <CardDescription>
          <List divided>
            <ListItem>
              Hello
            </ListItem>
            <ListItem>
              Hello
            </ListItem>
            <ListItem>
              Hello
            </ListItem>
          </List>
        </CardDescription>
      </CardContent>
      <CardContent Extra>
      <Label>bird</Label>
      </CardContent>
    </Card>
    );
}
const PokemonCardPage = () => {
  return (
    <div className="CenteredLayout">
      <div>
        <SearchForm></SearchForm>
        <PokemonCard></PokemonCard>
      </div>
    </div>
  );
};
  
export default PokemonCardPage;
