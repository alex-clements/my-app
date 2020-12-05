import React from 'react'
import DijkstraTable from './dijkstraTable.js'

export default class DijkstraApp extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <DijkstraTable />
    );
  }
};
