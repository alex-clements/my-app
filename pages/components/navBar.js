import React from 'react'
import styles from '../../styles/Home.module.css'


export class NavBar extends React.Component {
  render() {
    return (
      <div className="ui attached stackable menu inverted">
      <div className='ui container'>
        <a className='item' href="/">Home</a>
        <a className='item' href="/algorithms">Algorithms</a>
      </div>
      </div>
    );
  }
};
