import React, { Component, PropTypes } from 'react';
import Spinner from 'react-spinkit';
import manifesto from 'manifesto.js';

import OSD from '../components/OSD';
import '../../css/viewer.css'

class Viewer extends Component {
  constructor(props) {
    super(props);
    this.state = {osdOptions: {}}
  }

  componentDidMount() {
    const manifestPromise = (uri) => new Promise(function(resolve, reject) {
    manifesto.loadManifest(uri).then((manifest) => {
      const m = manifesto.create(manifest);
      if (m.getTotalSequences() === 1) {
        // walk down to get the resources …
        const canvases = m.getSequenceByIndex(0).getCanvases();
        const images = canvases.map( c => { return c.getImages()[0] });
        const resources = images.map( i => {
          // Manifesto parses id out of the annotation but we need the id from the IIIF image service so we have to go into __jsonld
          return `${i.getResource().__jsonld.service['@id']}/info.json`
        });
        resolve(resources);
      } else {
        if (m.getSequences() === []) {
          const statusText = 'There\'s no data here!';
          reject(statusText);
        }
      }
    });
  });

  manifestPromise(this.props.manifest).then((tsArray) => {
    this.setState({
      osdOptions: {
        tileSources: tsArray
      }
    })
  });
  }

  render() {
    const hasTiles = this.state.osdOptions.tileSources;
    return (
      <div className="viewer-instance">
        {hasTiles
          ? <OSD osdOptions={ this.state.osdOptions } />
          : <Spinner spinnerName='cube-grid' noFadeIn />
        }
      </div>
    )
  }
}

Viewer.propTypes = {
  manifest: PropTypes.string.isRequired
}

export default Viewer;
