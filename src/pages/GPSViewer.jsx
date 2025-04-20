


import React from 'react';
import { List, Segment, Button, Header, Label, Divider, Statistic} from 'semantic-ui-react';
import '../App.scss';

const GPSViewer = () => {
  const student = "Your Name";

  // TODO

  return (
    <div className="CenteredLayout">
      <Segment>
        <div className="VerticalColumn">
        <Header as="h2">{student}</Header>
          <Statistic>
            <Statistic.Value>XXX</Statistic.Value>
            <Statistic.Label>Latitude</Statistic.Label>
          </Statistic>
          <br/>
          <Statistic>
            <Statistic.Value>XXX</Statistic.Value>
            <Statistic.Label>Longitude</Statistic.Label>
          </Statistic>
        </div>



        <Header as="h3" dividing>Logged Points</Header>
        <p> No logs </p>
        <List>
          <List.Item>
              <List.Content floated='right'>XXX</List.Content>
              <List.Content>Latitude</List.Content>
              <List.Content floated='right'>XXX</List.Content>
              <List.Content>Longitude</List.Content>
          </List.Item>
        </List>


        
        <Divider></Divider>
        <Button primary fluid> 
          <span className="badge-button">LOG</span>
          <Label circular color='blue' as='a'>0</Label>
        </Button>
      </Segment>
    </div>
  );
};
  
export default GPSViewer;