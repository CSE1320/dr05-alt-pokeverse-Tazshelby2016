
import React, { useEffect, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { Header, Container, List, Item } from 'semantic-ui-react';
import '../App.scss';
import axios from 'axios';

const cleanStr = (str = "") =>{
  const removeAt = (str[0] === "@")? str.slice(1):str;
  const splitStr = removeAt.split(",");
  const removeZ = splitStr.slice(0,2);
  return removeZ;
}

const Entry = ({latitude="unresolved",longitude="unresolved", image="", name="XXX", distance="XXX", index = -1}) => {
  return (
    latitude !== "unresolved" &&

    <Item key={index}>
      <Item.Image src={image} alt={name} />
      <Item.Content>
        <Item.Header>{name}</Item.Header>
        <Item.Description>
          <List>
            <List.Item key="0">{distance} Away</List.Item>
            <List.Item key="1">{latitude}º, {longitude}º</List.Item>
          </List>
          
          
        </Item.Description>
      </Item.Content>
    </Item>
  )
}

const Pokedex = () => {
  const [origin, setOrigin] = useState({longitude: "unresolved", latitude: "unresolved"});
  const [sightings, setSightings] = useState([]);
  const [watchIDs, setWatchIDs] = useState([]);

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
        const watchID = (navigator.geolocation.watchPosition(geoSuccess, null, geoOptions));
        setWatchIDs(s=>s.concat(watchID));
      }
    }, [setOrigin]
  );

  // Cleaning up. Probably does this automatically, but this catches it sooner
  useEffect(
    ()=>{
      const oldWatch = watchIDs.splice(0,watchIDs.length - 1)
      if (oldWatch.length > 0){
        console.log("old watchPositions found",oldWatch);
        oldWatch.forEach(
          (wat)=>{
            console.log("Clearing watchPosition ", wat)
            navigator.geolocation.clearWatch(wat);
          }
        )
      }
    },
    [watchIDs]
  )
  const APIKEY = "AIzaSyBCrMDlZqQhspp4oUGKHiVtx6tmE3Yt74w"; // will remain active until 5/1/2025

  useEffect(()=>{
    console.log("origin changed, now", origin);
    setSightings([]);
    axios.get("https://hybridatelier.uta.edu/api/pokemon_sightings")
    .then(
      (response) => {
        console.log("Received Pokemon sightings data", response.data)
        setSightings([]);
        response.data.forEach(
          ({coord,pokemon,index})=>{
            const pokéurl = "https://pokeapi.co/api/v2/pokemon/" + pokemon;
            axios.get(pokéurl)
            .then(
              (response) => {
                console.log("Received pokemon data, ", response.data);
                const cleanedCoord = cleanStr(coord);
                console.log("Now at Maps API");
                const test = (vl, stat) => {
                  if(stat === "OK"){
                    console.log("Called Back", vl.rows.elements, stat);
                    setSightings(s=>s.concat({coordinate: cleanedCoord, distance: "XXX",pokemon: response.data}));
                  }
                  else{
                    console.log("Called Back", vl, stat);
                    setSightings(s=>s.concat({coordinate: cleanedCoord, distance: "XXX",pokemon: response.data}));
                  }
                }
                const loader = new Loader({
                  apiKey: APIKEY,
                  version: "weekly",
                  libraries: ["places"]
                });
                loader
                  .importLibrary("routes")
                  .then(({DistanceMatrixService})=>{
                    loader.importLibrary("routes")
                    .then(({TravelMode}) =>{
                        loader.importLibrary("core")
                        .then(({UnitSystem})=>
                          {
                            loader.importLibrary("core")
                            .then( ({LatLng})=>
                              {
                                // GOOGLE MAP API LIBRARY CAN BE ACCESSED HERE
                                const distMat = new DistanceMatrixService();
                                console.log("The returned import is", distMat);
                                const originLatLng = [{lat: parseFloat(origin.latitude), lng: parseFloat(origin.longitude)}];
                                const destLatLng = [{lat: parseFloat(cleanedCoord[0]), lng: parseFloat(cleanedCoord[1])}];
                                const ret = distMat.getDistanceMatrix({destinations: destLatLng, origins: originLatLng, travelMode: TravelMode.DRIVING, unitSystem: UnitSystem.METRIC, avoidHighways: false, avoidTolls: false}, test);
                                console.log("Potential distance", ret.PromiseResult)
                              }
                            )
                          }
                        )
                      }
                    )
                  })
                  .catch(console.error)
              }
            )
            .catch(
              (error)=>{
                console.error(error);
                console.error(pokéurl)
              }
            )
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
    }, [origin])

  sightings.forEach(
    ({coordinate, distance,pokemon},index)=>{
      console.log("Coordinate: ", coordinate, "Distance", distance, "Pokemon: ", pokemon, "index", index);
    }
  )
  const listItems = sightings.map(({coordinate, distance, pokemon}, index)=><Entry latitude={coordinate[0]} longitude={coordinate[1]} image={pokemon.sprites.front_default} name={pokemon.name} distance={distance} index = {index}></Entry>);
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
      <Header dividing as="h2">Sightings ({sightings.length})</Header>
      <Item.Group>
        {listItems}
      </Item.Group>
    </Container>

  );
};
/*{ <TableCell>

</TableCell> }*/
export default Pokedex;