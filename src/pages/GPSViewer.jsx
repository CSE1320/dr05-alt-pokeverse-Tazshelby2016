import React, { useEffect, useState } from 'react';
import { List, Segment, Button, Header, Label, Divider, Statistic} from 'semantic-ui-react';
import '../App.scss';

const GetCoord = (geoLoc=[], geoLocSetter, geoWatchPos) => {
  geoLocSetter(geoLoc.concat(geoWatchPos));
  return;
}

//Number Formatting
const FormatNumber = (number=0) =>{
  return parseFloat(number).toFixed(2);
}

const GPSLog = ({locList}=[]) => {
  const noList = (<p> No logs </p>);
  const list = locList.map((location, index) => <GPSLogItem lat={location.latitude} long={location.longitude} index={index} />);
  const combList = (<List>{list}</List>);
  return (locList.length > 0)?(combList):(noList);
}

const GPSLogItem = ({lat=0,long=0, index}) => {
  return(
    <List.Item key={index}>
      <List.Content floated='right'>{FormatNumber(lat)}</List.Content>
      <List.Content>Latitude</List.Content>
      <List.Content floated='right'>{FormatNumber(long)}</List.Content>
      <List.Content>Longitude</List.Content>
    </List.Item>    
  );
}

const GPSViewer = () => {
  const student = "Bryan Badgero";

  // Stores all locations
  const [geoLocs, setGeoLocs] = useState([]);
  const [currentLocs, setCurrentLocs] = useState([]);




  useEffect(
    () =>{
      if("geolocation" in navigator)
      {
        const geoSuccess = (position) => {
          setCurrentLocs(position.coords);
          return;
        }
        const geoOptions = {
          highAccuracy: false,
          lifetime: 30000,
          timeout: 3000,
        }
        const WatchID = (navigator.geolocation.watchPosition(geoSuccess, null, geoOptions));
      }
    }, [setCurrentLocs]
  );
  // TODO

  return (
    <div className="CenteredLayout">
      <Segment>
        <div className="VerticalColumn">
        <Header as="h2">{student}</Header>
          <Statistic>
            <Statistic.Value>{FormatNumber(currentLocs.latitude)}</Statistic.Value>
            <Statistic.Label>Latitude</Statistic.Label>
          </Statistic>
          <br/>
          <Statistic>
            <Statistic.Value>{FormatNumber(currentLocs.longitude)}</Statistic.Value>
            <Statistic.Label>Longitude</Statistic.Label>
          </Statistic>
        </div>



        <Header as="h3" dividing>Logged Points</Header>
        
        <GPSLog locList={geoLocs}/>


        
        <Divider></Divider>
        <Button primary fluid onClick={()=>GetCoord(geoLocs, setGeoLocs, currentLocs)}> 
          <span className="badge-button">LOG</span>
          <Label circular color='blue' as='a'>0</Label>
        </Button>
      </Segment>
    </div>
  );
};
  
export default GPSViewer;