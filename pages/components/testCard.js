import React from 'react'
import Link from 'next/link'
import styles from '../../styles/Home.module.css'

export default class TestCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var path = "/".concat("",this.props.pathName)
      return (
        <Link href={path}>
          <a className={"blue ui card " + styles.fadeInAnimation} >
            <div className="image">
              <img height="121px" src={this.props.imageSource} />
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
};
