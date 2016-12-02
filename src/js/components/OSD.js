import React, { Component, PropTypes } from 'react';
import ToolBar from './ToolBar';
import OpenSeadragon from 'openseadragon'
import defaults from '../utils/osdDefaults';
import '../../css/osd.css'

class OSD extends Component {
  constructor(props) {
    super(props);
    this.initSeaDragon = this.initSeaDragon.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
    this.onPageJumpSubmit = this.onPageJumpSubmit.bind(this);
    this.state = {
      viewer: null,
      page: ''
    }
  }

  initSeaDragon(options) {
    const viewer = new OpenSeadragon(options);
    viewer.addHandler('page', (data) => {
      this.setState({page: data.page})
    })
    this.setState({viewer: viewer})
  }

  componentDidMount() {
    const config = Object.assign(defaults, this.props.osdOptions);
    this.initSeaDragon(config);
  }

  onPageChange(value) {
    this.setState({page: value});
  }

  onPageJumpSubmit(event) {
    const { viewer } = this.state
    event.preventDefault()
    if (!this.state.page) {
      return;
    }
    const pageNum = +this.state.page;
    viewer.goToPage(pageNum)
  }

  render() {
    return (
      <div className="seadragon" id="osd-viewer">
        <ToolBar
          page={ this.state.page }
          changeFunction={this.onPageChange}
          pagingFunction={this.onPageJumpSubmit} />
      </div>
    )
  }
}

OSD.propTypes = {
  osdOptions: PropTypes.object.isRequired
}

export default OSD;
