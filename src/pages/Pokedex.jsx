
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

const srtDist = (a,b)=>{
  return (a.sort-b.sort);
}

const Entry = ({latitude="unresolved",longitude="unresolved", image="", name="XXX", distance="XXX", index = -1, sort = Infinity}) => {
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
  const APIKEY = "AIzaSyBCrMDlZqQhspp4oUGKHiVtx6tmE3Yt74w";
  const loader = new Loader({
    apiKey: APIKEY,
    version: "weekly",
    libraries: ["places"]
  });
  
  const [travelMode, getTravelMode] = useState({});
  const [unitSystem, getUnitSystem] = useState({});
  const [latLng, getLatLng] = useState({});
  
  loader.importLibrary("routes").then(
    ({TravelMode}) =>{
      getTravelMode(TravelMode);
    }
  )
  loader.importLibrary("core").then(
    ({UnitSystem})=>
    {
      getUnitSystem(UnitSystem);
    }
  )
  
  loader.importLibrary("core").then(
    ({LatLng})=>
    {
      getLatLng(LatLng);
    }
  )


  const [origin, setOrigin] = useState({longitude: "unresolved", latitude: "unresolved"});
  const [sightings, setSightings] = useState([]);
  const [sortedSightings, setSortedSightings] = useState([]);
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
                  if((stat === "OK") && (vl !== null) && (vl !== undefined)){
                    console.log("Called Back", vl, stat);
                    if((((vl.rows)[0]).elements)[0].hasOwnProperty("distance")){
                      const distanceText = ((((vl.rows)[0]).elements)[0]).distance.text;
                      const sortNum = ((((vl.rows)[0]).elements)[0]).distance.value;
                      setSightings(s=>s.concat({coordinate: cleanedCoord, distance: distanceText,pokemon: response.data, sort: sortNum}));
                    }
                    else{
                      console.error("Returned value is not a distance.");
                      if((((vl.rows)[0]).elements)[0].hasOwnProperty("status")){
                        console.error("Distance Calculation returned status: ", (((vl.rows)[0]).elements)[0].status);
                      }
                      setSightings(s=>s.concat({coordinate: cleanedCoord, distance: "∞",pokemon: response.data, sort: Infinity}));
                    }
                  }
                  else{
                    console.error("Call Back Failed", vl, stat);
                    setSightings(s=>s.concat({coordinate: cleanedCoord, distance: "∞",pokemon: response.data, sort: Infinity}));
                  }
                }
                // Cannot work externally with constant objects.
                const loader2 = new Loader({
                  apiKey: APIKEY,
                  version: "weekly",
                  libraries: ["places"]
                });
                loader2
                  .importLibrary("routes")
                  .then(({DistanceMatrixService})=>{
                    // GOOGLE MAP API LIBRARY CAN BE ACCESSED HERE
                    const distMat = new DistanceMatrixService();
                    console.log("The returned import is", distMat);
                    const originLatLng = [{lat: parseFloat(origin.latitude), lng: parseFloat(origin.longitude)}];
                    const destLatLng = [{lat: parseFloat(cleanedCoord[0]), lng: parseFloat(cleanedCoord[1])}];
                    distMat.getDistanceMatrix({destinations: destLatLng, origins: originLatLng, travelMode: travelMode.DRIVING, unitSystem: unitSystem.METRIC, avoidHighways: false, avoidTolls: false}, test);
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
    },
    [origin, travelMode.DRIVING, unitSystem.METRIC]
  )

  useEffect(
    ()=>{
      setSortedSightings([]);
      setSortedSightings(sightings.toSorted(srtDist));
    },
    [sightings]
  )
  
  const listItems = sortedSightings.map(({coordinate, distance, pokemon}, index)=><Entry latitude={coordinate[0]} longitude={coordinate[1]} image={pokemon.sprites.front_default} name={pokemon.name} distance={distance} index = {index}></Entry>);
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