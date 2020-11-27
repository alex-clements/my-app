import React from 'react'
import Link from 'next/link'

export default class TestCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isLoading: true}
  }

  componentDidMount() {
    this.setState({isLoading: false})
  }

  render() {
    var path = "/".concat("",this.props.pathName)
    if (this.state.isLoading) {
      return (
        <div class="ui active centered inline loader"></div>
      );
    }
    else {
      return (
        <Link href={path}>
          <a className="blue ui card" >
            <div className="image">
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
          </a>
        </Link>);
    }

  }
};
