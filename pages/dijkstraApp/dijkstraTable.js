import React from 'react'
import DijkstraCell from './dijkstraCell.js'

export default class DijkstraTable extends React.Component {
  constructor(props) {
    super(props);

    this.handleCellChange = this.handleCellChange.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.onRunButton = this.onRunButton.bind(this);
    this.onStartButton = this.onStartButton.bind(this);
    this.onEndButton = this.onEndButton.bind(this);
    this.onWallsButton = this.onWallsButton.bind(this);
    this.updateGrid = this.updateGrid.bind(this);
    this.createGraph = this.createGraph.bind(this);
    this.runDijkstra = this.runDijkstra.bind(this);
    this.handleRunButton = this.handleRunButton.bind(this);

    var tableRows = [];
    var rowValues = [];
    var i, j, myString
    for (i=0;i<40;i++) {
      for (j=0; j<30; j++) {
        myString = i.toString().padStart(2,"0") + j.toString().padStart(2,"0")
        rowValues.push({id: myString, row: i, col: j, initClass: ''});
      };
      tableRows.push(rowValues);
      rowValues = [];
    };
    this.state = {table: tableRows, tableCopy: [], selectMethod: 'start', startLocation: null, endLocation: null, pathPresent: false}
  }

  handleCellChange(e, row, col) {

    var table2 = this.state.pathPresent ? JSON.parse(JSON.stringify(this.state.tableCopy)) : this.state.table;
    this.state.pathPresent ? this.setState({pathPresent: false}) : null;

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
    for (i=0;i<40;i++) {
      for (j=0; j<30; j++) {
        myString = i.toString().padStart(2,"0") + j.toString().padStart(2,"0")
        rowValues.push({id: myString, row: i, col: j, initClass: ''});
      };
      tableRows.push(rowValues);
      rowValues = [];
    };
    this.setState({table: tableRows, startLocation: null, endLocation: null, pathPresent: false});
  }

  updateGrid(table, shortestPath, visitedArray, startLocation, endLocation, tableCopy) {
    var xCoordinate;
    var yCoordinate;
    var maxIndex = 0;
    var startNode = startLocation[0].toString().padStart(2,"0") + startLocation[1].toString().padStart(2,"0")
    var endNode = endLocation[0].toString().padStart(2,"0") + endLocation[1].toString().padStart(2,"0")

    visitedArray.forEach((pathNode, index) => {
      if(pathNode != startNode && pathNode != endNode) {
        xCoordinate = Number(pathNode.slice(0,2));
        yCoordinate = Number(pathNode.slice(2,4));
        table[xCoordinate][yCoordinate]['initClass'] = 'algoFill';
        setTimeout(function(){
          updateNodes(pathNode,'algoFill');
        }, maxIndex * 1);

      maxIndex += 1;

      };
    });

    maxIndex = maxIndex / 10;

    shortestPath.forEach((pathNode, index) => {
      if(pathNode != startNode && pathNode != endNode) {
        xCoordinate = Number(pathNode.slice(0,2));
        yCoordinate = Number(pathNode.slice(2,4));
        table[xCoordinate][yCoordinate]['initClass'] = 'path';

        setTimeout(function(){
          updateNodes(pathNode,'path');
        }, maxIndex * 10);

      maxIndex += 1;

      };
    });

    setTimeout(() => {
      this.setState({table: table, pathPresent: true, tableCopy: tableCopy})
    }, maxIndex * 10)

    function updateNodes(pathNodeId,classVar) {
      document.getElementById(pathNodeId).className = classVar
    };
  }

  handleRunButton(data) {
      var myGraph = this.createGraph(data[0]);
      var startLocation = data[1] ? data[1][0].toString().padStart(2,"0") + data[1][1].toString().padStart(2,"0") : "0000";
      var endLocation = data[2] ? data[2][0].toString().padStart(2,"0") + data[2][1].toString().padStart(2,"0") : "1939";
      var solution = this.runDijkstra(myGraph,startLocation,endLocation);
      var shortestPath = solution[0];
      var solutionFound = solution[1];
      var visitedArray = solution[2];
      return solutionFound ? [shortestPath,visitedArray] : [null, null]
  }

  runDijkstra(myGraph, startNode, endNode) {

    class PriorityQueue {
      constructor() {
        this.collection = [];
      }
      enqueue(element) {
        if (this.isEmpty()) {
          this.collection.push(element);
        }
        else {
            let added = false;
            for (let i = 1; i <= this.collection.length; i++) {
              if (element[1] < this.collection[i-1][1]) {
                this.collection.splice(i-1,0,element);
                added = true;
                break;
              }
            }
            if (!added) {
              this.collection.push(element);
            }
        }
      }
      dequeue() {
        let value = this.collection.shift();
        return value;
      }
      isEmpty() {
        return (this.collection.length === 0)
      }
    }

    let times = {};
    let backtrace = {};
    let pq = new PriorityQueue();

    times[startNode] = 0;
    myGraph.nodes.forEach(node => {
      if (node !== startNode) {
        times[node] = Infinity
      }
    });

    let visitedArray = [];

    pq.enqueue([startNode, 0]);
    while (!pq.isEmpty()) {
      let shortestStep = pq.dequeue();
      let currentNode = shortestStep[0];
      if (currentNode == endNode) {
        break;
      }
      visitedArray.push(currentNode);
      myGraph.adjacencyList[currentNode].forEach(neighbor => {
        let time = times[currentNode] + neighbor.weight;
        if (time < times[neighbor.node]) {
          times[neighbor.node] = time;
          backtrace[neighbor.node] = currentNode;
          pq.enqueue([neighbor.node, time]);
        }
      });
    }
    let path = [endNode];
    let lastStep = endNode;

    let solutionFound = true;

    while (lastStep !== startNode) {
      path.unshift(backtrace[lastStep])
      lastStep = backtrace[lastStep]
      if (lastStep == undefined) {
        solutionFound = false;
        break;
      }
    }
    return [path, solutionFound, visitedArray];
  }

  createGraph(table) {
    if (!table) {
      table = [[]];
    }

    class Graph {
      constructor() {
        this.nodes = [];
        this.adjacencyList = {};
      }
      addNode(node) {
        this.nodes.push(node);
        this.adjacencyList[node] = [];
      }
      addEdge(node1, node2, weight) {
        this.adjacencyList[node1].push({node:node2, weight: weight});
        this.adjacencyList[node2].push({node:node1, weight: weight});
      }
    }
    var myGraph = new Graph();
    for (var i=0; i<table.length; i++) {
      for (var j=0; j<table[0].length; j++) {
        table[i][j]['initClass'] != 'wall' ? myGraph.addNode(table[i][j]['id']) : null;
      }
    }
    for (var i=0; i<table.length; i++) {
      for (var j=0; j<table[0].length; j++) {
        table[i][j+1] ? table[i][j]['initClass'] != 'wall' && table[i][j+1]['initClass'] != 'wall' ? myGraph.addEdge(table[i][j]['id'],table[i][j+1]['id'],1) : null : null;
        table[i+1] ? table[i][j]['initClass'] != 'wall' && table[i+1][j]['initClass'] != 'wall' ? myGraph.addEdge(table[i][j]['id'],table[i+1][j]['id'],1) : null : null;
        //table[i+1] ? table[i+1][j+1] ? table[i][j]['initClass'] != 'wall' && table[i+1][j+1]['initClass'] != 'wall' ? myGraph.addEdge(table[i][j]['id'],table[i+1][j+1]['id'],1) : null : null : null;
      }
    }
    return myGraph;
  }

  onRunButton() {
    var shortestPath;
    var visitedArray;
    var tableVar = this.state.table.slice();
    var tableCopy = JSON.parse(JSON.stringify(this.state.table));
    [shortestPath, visitedArray] = this.handleRunButton([tableVar, this.state.startLocation, this.state.endLocation]);
    shortestPath ? this.updateGrid(tableVar, shortestPath, visitedArray, this.state.startLocation, this.state.endLocation, tableCopy) : null;
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
      <div className='ui fluid buttons center aligned container'>
        <button className="ui button" onClick={this.onStartButton}>Set Start</button>
        <button className="ui button" onClick={this.onEndButton}>Set End</button>
        <button className="ui button" onClick={this.onWallsButton}>Draw Walls</button>
        <button className="ui primary button" onClick={this.onRunButton}>Run</button>
        <button className="ui button red basic" value="clear" onClick={this.handleClear}>Clear</button>
    </div>
      <div className='ui horizonal divider'></div>
      <table className='ui celled table very compact unstackable'>
        <tbody>
            { table }
        </tbody>
      </table>
    </div>
    );
  }

};
