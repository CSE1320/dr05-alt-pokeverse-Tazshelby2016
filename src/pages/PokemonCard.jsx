import React, { useEffect, useState } from 'react';
import { Card, Icon, Image, Input, List, Label} from 'semantic-ui-react'
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


const PokemonCard = () => {
  return (
    <Card>
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
