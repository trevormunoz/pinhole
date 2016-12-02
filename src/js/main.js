import React from 'react';
import { render } from 'react-dom';
import Viewer from './containers/Viewer'

const mountPoint = document.getElementById('viewer');
const manifestLink = 'http://iiif.trophicbezoar.us/manifests/greenbooks_1949.json'

if (mountPoint) {
  render (
    <Viewer manifest={ manifestLink } />,
    mountPoint
  )
}
