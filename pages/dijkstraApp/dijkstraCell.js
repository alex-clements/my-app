import React from 'react'
import styles from '../../styles/Home.module.css'

export class DijkstraCell extends React.Component {
  constructor(props) {
    super(props);
    this.handleEvent = this.handleEvent.bind(this);
    this.handleClick = this.handleClick.bind(this);
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
      <td id={this.props.id} data-row={this.props.row} data-col={this.props.col} className={this.props.initClass} onMouseOver={this.handleEvent} onClick={this.handleClick}>
      </td>
    );
  }
};
