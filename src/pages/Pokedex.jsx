
import React, { useEffect, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { Header, Container, List, Item } from 'semantic-ui-react';
import '../App.scss';


const resolvePokemonAPI = async (id) => {
  // TODO
}

const resolveSightings = async() => {
  // TODO
}

const Pokedex = () => {
  const [origin, setOrigin] = useState({longitude: "unresolved", latitude: "unresolved"})
  
  const APIKEY = "AIzaSyBJcm2icY4Izt-A3PpDqDM0210fTtCkdtM"; // will remain active until 5/1/2023

  const loader = new Loader({
    apiKey: APIKEY,
    version: "weekly",
    libraries: ["places"]
  });

  useEffect(()=>{
    loader
      .load()  
      .then((google)=>{
         // GOOGLE MAP API LIBRARY CAN BE ACCESSED HERE
      })
      .catch(console.error)
    }, [origin])

  return (

    <Container id='pokedex'>
      <Header dividing as="h1"> Pokemon Sighting  </Header>
      <Header dividing as="h2"> Current Position </Header>
        <List>
          <List.Item>
              <List.Content floated='right'>{origin.latitude}</List.Content>
              <List.Content>Latitude</List.Content>
              <List.Content floated='right'>{origin.longitude}</List.Content>
              <List.Content>Longitude</List.Content>
          </List.Item>
        </List>
      <Header dividing as="h2">Sightings (XX)</Header>
      <Item.Group>
        {
          origin.latitude !== "unresolved" &&

              <Item>
                <Item.Image src="" />
                <Item.Content>
                  <Item.Header>XXX</Item.Header>
                  <Item.Description>
                    <List>
                      <List.Item>XXX Away</List.Item>
                      <List.Item>XXXº, XXXº</List.Item>
                    </List>
                    
                    
                  </Item.Description>
                </Item.Content>
              </Item>
        }
      </Item.Group>
    </Container>


  );
};
{/* <TableCell>

</TableCell> */}
export default Pokedex;