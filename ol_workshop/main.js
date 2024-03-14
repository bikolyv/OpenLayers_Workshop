import './style.css';
import {Map, View} from 'ol';
import GeoJSON from 'ol/format/GeoJSON';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import {Link, DragAndDrop, Modify, Draw, Snap}  from 'ol/interaction';
import {Style, Fill, Stroke} from 'ol/style';

const source = new VectorSource();

const layer = new VectorLayer({
  source: source,
  style: new Style({
    fill: new Fill({
      color: 'red',
    }),
    stroke: new Stroke({
      color: 'white',
    }),
  }),
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
map.addInteraction(
  new Draw({
    type: 'Polygon',
    source: source,
  })
);
map.addInteraction(
  new Snap({
    source: source,
  })
);
map.addInteraction(new Link());

const clear = document.getElementById('clear');
clear.addEventListener('click', function () {
  source.clear();
});

const format = new GeoJSON({featureProjection: 'EPSG:3857'});
const download = document.getElementById('download');
source.on('change', function () {
  const features = source.getFeatures();
  const json = format.writeFeatures(features);
  download.href = 'data:application/json;charset=utf-8,' + encodeURIComponent(json);
});
