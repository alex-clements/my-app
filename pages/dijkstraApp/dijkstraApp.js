import React from 'react'
import {DijkstraTable} from './dijkstraTable.js'

export class DijkstraApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {table: [], pathPresent: false}
    this.handleRunButton = this.handleRunButton.bind(this);
    this.createGraph = this.createGraph.bind(this);
    this.runDijkstra = this.runDijkstra.bind(this);
    this.updateGrid = this.updateGrid.bind(this);
  }

  handleRunButton(data) {
      var myGraph = this.createGraph(data[0]);
      var startLocation = data[1] ? data[1][0].toString().padStart(2,"0") + data[1][1].toString().padStart(2,"0") : "0000";
      var endLocation = data[2] ? data[2][0].toString().padStart(2,"0") + data[2][1].toString().padStart(2,"0") : "1939";
      var shortestPath = this.runDijkstra(myGraph,startLocation,endLocation);
      this.updateGrid(data[0],shortestPath, startLocation, endLocation);
  }

  updateGrid(table, shortestPath, startLocation, endLocation) {
    var xCoordinate;
    var yCoordinate;
    shortestPath.forEach(pathNode => {
      if(pathNode != startLocation && pathNode != endLocation) {
        xCoordinate = Number(pathNode.slice(0,2));
        yCoordinate = Number(pathNode.slice(2,4));
        table[xCoordinate][yCoordinate]['initClass'] = 'path'
        this.setState({table: table, pathPresent: true});
      };
    });
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

    pq.enqueue([startNode, 0]);

    while (!pq.isEmpty()) {
      let shortestStep = pq.dequeue();
      let currentNode = shortestStep[0];

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

    while (lastStep !== startNode) {
      path.unshift(backtrace[lastStep])
      lastStep = backtrace[lastStep]
    }
    return path;
  }

  createGraph(table) {
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
      }
    }
    return myGraph;
  }

  render() {
    return (
      <div>
        <DijkstraTable tableData={this.state.table} onRunButton={this.handleRunButton}/>
      </div>
    );
  }
};
