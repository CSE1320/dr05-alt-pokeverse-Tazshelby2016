
import React, { useEffect, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { Header, Container, List, Item } from 'semantic-ui-react';
import '../App.scss';
import axios from 'axios';


const resolvePokemonAPI = async (id) => {
  const pokéurl = "https://pokeapi.co/api/v2/pokemon/" + id;
  axios.get(pokéurl)
  .then(
    (response) => {
      console.log(response.data);
      return response.data;
    }
  )
  .catch(
    (error)=>{
      console.error(error);
      console.error(pokéurl)
    }
  )
}

const resolveSightings = async() => {
  // TODO
}

const Entry = (latitude="unresolved", image="", name="XXX", distance="XXX", index = -1) => {
  return (
    latitude !== "unresolved" &&

    <Item key={index}>
      <Item.Image src={image} alt={name} />
      <Item.Content>
        <Item.Header>{name}</Item.Header>
        <Item.Description>
          <List>
            <List.Item>Away</List.Item>
            <List.Item>XXXº, XXXº</List.Item>
          </List>
          
          
        </Item.Description>
      </Item.Content>
    </Item>
  )
}

const Pokedex = () => {
  const [origin, setOrigin] = useState({longitude: "unresolved", latitude: "unresolved"});
  const [sightings, setSightings] = useState([]);

  useEffect(
    () =>{
      if("geolocation" in navigator)
      {
        const geoSuccess = (position) => {
          setOrigin({longitude: position.coords.longitude, latitude: position.coords.latitude});
          return;
        }
        const geoOptions = {
          highAccuracy: false,
          lifetime: 30000,
          timeout: 3000,
        }
        const WatchID = (navigator.geolocation.watchPosition(geoSuccess, null, geoOptions));
        console.log("The useless WatchID is", WatchID);
      }
    }, [setOrigin]
  );
  
  useEffect(
    ()=>{
      console.log("Effect Triggered");
      axios.get("https://hybridatelier.uta.edu/api/pokemon_sightings")
      .then(
        (response) => {
          response.data.map(
            ({coord,pokemon,index})=>{
              resolvePokemonAPI(pokemon)
              .then((pokemon_fin)=>{
                  console.log(index, coord, pokemon_fin);
                  setSightings(sightings.concat({coordinate: coord,pokemon: pokemon_fin}));
                }
              )
              .catch(console.error("Failed"))
            }
          );
        }
      )
      .catch(
        (error)=>{
          console.error(error);
          console.error("https://hybridatelier.uta.edu/api/pokemon_sightings")
        }
      )
    }, [origin]
  );

  useEffect(() =>{
    console.log("temp")
    console.log(sightings)
  }, [sightings.pokemon]
  );

  const APIKEY = "AIzaSyBJcm2icY4Izt-A3PpDqDM0210fTtCkdtM"; // will remain active until 5/1/2025

  useEffect(()=>{
    const loader = new Loader({
      apiKey: APIKEY,
      version: "weekly",
      libraries: ["places"]
    });
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
        }
      </Item.Group>
    </Container>


  );
};
{/* <TableCell>

</TableCell> */}
export default Pokedex;