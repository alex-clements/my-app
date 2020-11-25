import React from 'react'
import styles from '../../styles/Home.module.css'
import Link from 'next/link'

export default class NavBar extends React.Component {
  render() {
    return (
      <div className="ui attached stackable menu inverted">
      <div className='ui container'>
        <Link href="/"><a className='item'>Home</a></Link>
        <Link href="/algorithms"><a className='item'>Algorithms</a></Link>
      </div>
      </div>
    );
  }
};
