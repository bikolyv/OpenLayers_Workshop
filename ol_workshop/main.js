import GeoTIFF from 'ol/source/GeoTIFF.js';
import Map from 'ol/Map.js';
import Projection from 'ol/proj/Projection.js';
import TileLayer from 'ol/layer/WebGLTile.js';
import View from 'ol/View.js';
import {getCenter} from 'ol/extent.js';

const source = new GeoTIFF({
  sources: [
    {
      url: 'https://sentinel-cogs.s3.us-west-2.amazonaws.com/sentinel-s2-l2a-cogs/21/H/UB/2021/9/S2B_21HUB_20210915_0_L2A/TCI.tif',
    },
  ],
});

const layer = new TileLayer({
  source: source,
});

new Map({
  target: 'map-container',
  layers: [layer],
  view: source.getView(),
});
