import React, { Component } from "react";
import "./Optin.css";
import { ExternalLink } from 'react-external-link';

class Optin extends Component {

  render() {
    return (
      <div className="optin">
        <p>Want to be the first to know when we launch?</p>
        <ExternalLink href="https://forms.gle/1UYUdZTyszGYhGJm9">
        <button className="optin-btn">
          <a href="https://forms.gle/1UYUdZTyszGYhGJm9" target="_blank" >
           
          </a>
          Click Me
        </button>
        </ExternalLink>
        <div id="modal">
          <div className="wrapper">
            <h3>Enter Your Email</h3>
            <div className="clearfix">
              <div className="col-8" />
              <div className="col-3" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Optin;