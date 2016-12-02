import React, { Component, PropTypes } from 'react';
import PagePicker from './PagePicker';
import '../../css/controls.css';

// Toolbar icons
const zoomIn = require('open-iconic/svg/zoom-in.svg')
const zoomOut = require('open-iconic/svg/zoom-out.svg')
const reset = require('open-iconic/svg/home.svg')
const fullscreen = require('open-iconic/svg/fullscreen-enter.svg')
const prevPage = require('open-iconic/svg/arrow-thick-left.svg')
const nextPage = require('open-iconic/svg/arrow-thick-right.svg')

class ToolBar extends Component {

  render() {
    return (
      <div className="osd-controls">
        <div className="zoom-controls">
          <ul>
            <li><a id="zoom-in"><img className="icon" src={zoomIn} alt="zoom in icon"></img></a></li>
            <li><a id="zoom-out"><img className="icon" src={zoomOut} alt="zoom in icon"></img></a></li>
            <li><a id="reset"><img className="icon" src={reset} alt="zoom in icon"></img></a></li>
            <li><a id="fullscreen"><img className="icon" src={fullscreen} alt="zoom in icon"></img></a></li>
          </ul>
        </div>

        <PagePicker
          page={this.props.page}
          onChange={this.props.changeFunction}
          onSubmit={this.props.pagingFunction} />

        <div className="page-controls">
          <ul>
            <li><a id="prev-page"><img className="icon" src={prevPage} alt="zoom in icon"></img></a></li>
            <li><a id="next-page"><img className="icon" src={nextPage} alt="zoom in icon"></img></a></li>
          </ul>
        </div>
      </div>
    );
  }

}

ToolBar.propTypes = {
  changeFunction: PropTypes.func.isRequired,
  pagingFunction: PropTypes.func.isRequired
}

export default ToolBar;
