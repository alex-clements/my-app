import React from 'react'

export default class TestCard extends React.Component {
  render() {
    var path = "/".concat("",this.props.pathName)
    return (
      <a className="blue ui card" href={path}>
        <div class="image">
          <img src={this.props.imageSource} />
        </div>
        <div className="content">
          <div className="header">{this.props.title}</div>
          <div className="meta">
            <span className="category">{this.props.category}</span>
          </div>
          <div className="description">
            <p>{this.props.content}</p>
          </div>
        </div>
      </a>);
  }
};
