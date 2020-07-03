import React, { useEffect } from 'react';
import 'ol/ol.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

const MapComponent = () => {
  const mapContainerStyle = { height: '100%', width: '100%' };

  const map = new Map({ // eslint-disable-line no-new
    target: undefined,
    controls: [],
    layers: [
      new TileLayer({
        source: new OSM(),
      }),
    ],
    view: new View({
      center: [0, 0],
      zoom: 0,
    }),
  });

  useEffect(() => {
    map.setTarget('map');
  }, [map]);

  return (
    <div style={mapContainerStyle}>
      <div id="map" style={mapContainerStyle} />
    </div>
  );
};

export default MapComponent;
