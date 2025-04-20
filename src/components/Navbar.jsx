import React, {Component} from "react";
import { Menu } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom';

class Navigation extends Component {
  state = {
      activeItem: 'homepage'
  }
  handleClick = (e, { name }) => {
      this.setState({ activeItem: name })
  }
  render() {
      const { activeItem } = this.state
      return (
          <Menu fixed='top' inverted className="Navigation">
              <Menu.Item
                  as={NavLink} to="/"
                  name='home'
                  active={activeItem === 'home'}
                  onClick={this.handleClick}>
                  Home
              </Menu.Item>
              <Menu.Item
                  as={NavLink} to="/card"
                  name='browse'
                  active={activeItem === 'card'}
                  onClick={this.handleClick}>
                  PokemonCard
              </Menu.Item>
              <Menu.Item
                  as={NavLink} to="/gps"
                  name='search'
                  active={activeItem === 'gps'}
                  onClick={this.handleClick}>
                  GPS Viewer
              </Menu.Item>
              <Menu.Item
                  as={NavLink} to="/pokedex"
                  name='pokedex'
                  active={activeItem === 'pokedex'}
                  onClick={this.handleClick}>
                  Pokedex
              </Menu.Item>
              </Menu>
      )
  }
}
export default Navigation;
