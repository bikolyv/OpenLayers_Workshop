import './style.css';
import {Map, View} from 'ol';
import GeoJSON from 'ol/format/GeoJSON';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import {Link, DragAndDrop, Modify}  from 'ol/interaction';

const source = new VectorSource();
const layer = new VectorLayer({
  source: source,
});
const map = new Map({
  target: 'map-container',
  view: new View({
    center: [0, 0],
    zoom: 2
  })
});

map.addLayer(layer);
map.addInteraction(
  new DragAndDrop({
    source: source,
    formatConstructors: [GeoJSON],
  })
);
map.addInteraction(
  new Modify({
    source: source,
  })
);
map.addInteraction(new Link());
