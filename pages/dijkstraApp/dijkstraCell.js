import React from 'react'
import styles from '../../styles/Home.module.css'

export default class DijkstraCell extends React.Component {
  constructor(props) {
    super(props);
    this.handleEvent = this.handleEvent.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleTouch = this.handleTouch.bind(this);
  }

  handleEvent(e) {
    if (e.buttons == 1 && this.props.selectMethod == 'walls'){
      this.props.onCellUpdate('wall', this.props.row, this.props.col);
    }
    else if (e.buttons == 1 && this.props.selectMethod == 'start'){
      this.props.onCellUpdate('start', this.props.row, this.props.col);
    }
    else if (e.buttons == 1 && this.props.selectMethod == 'end'){
      this.props.onCellUpdate('end', this.props.row, this.props.col);
    };

  }

  handleTouch(e) {
    var elem = document.elementFromPoint(e.targetTouches[0].clientX, e.targetTouches[0].clientY);
    if (elem) {
      if (elem.nodeName == "TD") {
        var elemRow = parseInt(elem.id.slice(0,2));
        var elemCol = parseInt(elem.id.slice(2,4));
        if (this.props.selectMethod == 'walls'){
          this.props.onCellUpdate('wall', elemRow, elemCol);
        }
        else if (this.props.selectMethod == 'start'){
          this.props.onCellUpdate('start', elemRow, elemCol);
        }
        else if (this.props.selectMethod == 'end'){
          this.props.onCellUpdate('end', elemRow, elemCol);
        };
      };
    }
  }

  handleClick() {
    if (this.props.selectMethod == 'walls') {
      this.props.onCellUpdate('wall', this.props.row, this.props.col);
    }
    else if (this.props.selectMethod == 'start') {
      this.props.onCellUpdate('start', this.props.row, this.props.col);
    }
    else if (this.props.selectMethod == 'end') {
      this.props.onCellUpdate('end', this.props.row, this.props.col);
    }
  }

  render() {
    var path = "/".concat("",this.props.pathName)

    return (
      <td
        style={{padding: ".1em .1em"}}
        id={this.props.id}
        data-row={this.props.row}
        data-col={this.props.col}
        className={this.props.initClass}
        onMouseOver={this.handleEvent}
        onClick={this.handleClick}
        onTouchMove={this.handleTouch}
        onTouchStart={this.handleTouch}>
      </td>
    );
  }
};
