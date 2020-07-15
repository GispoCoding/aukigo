import React, { useEffect } from 'react';
import 'ol/ol.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OLWMTS, { optionsFromCapabilities } from 'ol/source/WMTS';
import WMTSCapabilities from 'ol/format/WMTSCapabilities';

import { Basemaps } from '../types';

interface MapProps {
  basemaps: Basemaps
}

function MapComponent({ basemaps }: MapProps) {
  const WMTSLayers = basemaps.WMTS;
  const mapContainerStyle = { height: '100%', width: '100%' };

  const map = new Map({
    target: undefined,
    controls: [],
    view: new View({
      center: [2478699.953232, 8501593.815476],
      zoom: 14,
    }),
  });

  useEffect(() => {
    map.setTarget('map');
    const baseLayer = WMTSLayers[0];
    const parser = new WMTSCapabilities();
    fetch(baseLayer.url)
      .then((response) => response.text())
      .then((text) => {
        const result = parser.read(text);
        const options = optionsFromCapabilities(result, {
          layer: baseLayer.layer,
          matrixSet: baseLayer.tile_matrix_set,
        });
        map.addLayer(new TileLayer({
          source: new OLWMTS(options),
        }));
      });
  }, [map, WMTSLayers]);

  return (
    <div style={mapContainerStyle}>
      <div id="map" style={mapContainerStyle} />
    </div>
  );
}

export default MapComponent;
