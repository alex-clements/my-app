import React from 'react'
import DijkstraCell from './dijkstraCell.js'

export default class DijkstraTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {table: this.props.tableData, selectMethod: 'walls', startLocation: null, endLocation: null, pathPresent: this.props.pathPresent}
    this.handleCellChange = this.handleCellChange.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.onRunButton = this.onRunButton.bind(this);
    this.onStartButton = this.onStartButton.bind(this);
    this.onEndButton = this.onEndButton.bind(this);
    this.onWallsButton = this.onWallsButton.bind(this);
  }

  componentWillMount() {
    var tableRows = [];
    var tableRows2 = [];
    var rowValues = [];
    var i;
    var j;
    var myString;
    for (i=0;i<20;i++) {
      for (j=0; j<40; j++) {
        myString = i.toString().padStart(2,"0") + j.toString().padStart(2,"0")
        rowValues.push({id: myString, row: i, col: j, initClass: ''});
      };
      tableRows.push(rowValues);
      tableRows2.push(rowValues);
      rowValues = [];
    };
    this.setState({table: tableRows, tableInit: tableRows});
  }

  handleCellChange(e, row, col) {
    var table2 = this.state.table;
    var startLocation = this.state.startLocation;
    var endLocation = this.state.endLocation;
    if (e == 'start') {
      if (startLocation == null) {
        this.setState({startLocation: [row,col]});
      }
      else {
        var startLocationRow = this.state.startLocation[0];
        var startLocationCol = this.state.startLocation[1];
        table2[startLocationRow][startLocationCol]['initClass'] = '';
        this.setState({startLocation: [row, col]});
      };
    };
    if (e == 'end') {
      if (endLocation == null) {
        this.setState({endLocation: [row,col]});
      }
      else {
        var endLocationRow = this.state.endLocation[0];
        var endLocationCol = this.state.endLocation[1];
        table2[endLocationRow][endLocationCol]['initClass'] = '';
        this.setState({endLocation: [row, col]});
      };
    };
    table2[row][col]['initClass'] = e
    this.setState({table: table2});
  }

  handleClear() {
    var tableRows = [];
    var rowValues = [];
    var i;
    var j;
    var myString;
    for (i=0;i<20;i++) {
      for (j=0; j<40; j++) {
        myString = i.toString().padStart(2,"0") + j.toString().padStart(2,"0")
        rowValues.push({id: myString, row: i, col: j, initClass: ''});
      };
      tableRows.push(rowValues);
      rowValues = [];
    };
    this.setState({table: tableRows, startLocation: null, endLocation: null});
  }

  onRunButton() {
    this.props.onRunButton([this.state.table, this.state.startLocation, this.state.endLocation]);
  }

  onStartButton() {
    this.setState({selectMethod: 'start'});
  }

  onEndButton() {
    this.setState({selectMethod: 'end'});
  }

  onWallsButton() {
    this.setState({selectMethod: 'walls'});
  }

  render() {
    var table = this.state.table.map((row, index) =>
    <tr key={index}>
      {row.map((id) => <DijkstraCell selectMethod={this.state.selectMethod} id={id.id} key={id.id} row={id.row} col={id.col} initClass={id.initClass} onCellUpdate={this.handleCellChange} />)}
    </tr>);

    return (
      <div>
      <div className='ui center aligned container'>
        <button className="ui button" onClick={this.onStartButton}>Set Start</button>
        <button className="ui button" onClick={this.onEndButton}>Set End</button>
        <button className="ui button" onClick={this.onWallsButton}>Draw Walls</button>
        <button className="ui primary button" onClick={this.onRunButton}>Run</button>
        <button className="ui button" value="clear" onClick={this.handleClear}>Clear</button>


    </div>
      <div className='ui horizonal divider'></div>
      <table className='ui celled table'>
        <tbody>
            { table }
        </tbody>
      </table>
    </div>
    );
  }

};
