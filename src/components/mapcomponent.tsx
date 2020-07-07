import React, { useEffect } from 'react';
import 'ol/ol.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import WMTS, { optionsFromCapabilities } from 'ol/source/WMTS';
import WMTSCapabilities from 'ol/format/WMTSCapabilities';

interface WMTSLayer {
  name: string,
  attribution: string,
  url: string,
  layer: string,
  tile_matrix_set: string
}

interface MapBasemaps {
  props: {
    WMTS: WMTSLayer[],
    VectorTile: []
  }
}

function MapComponent({ props: basemaps }: MapBasemaps) {
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
    const baseLayer = basemaps.WMTS[0];
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
          source: new WMTS(options),
        }));
      });
  }, [map, basemaps]);

  return (
    <div style={mapContainerStyle}>
      <div id="map" style={mapContainerStyle} />
    </div>
  );
}

export default MapComponent;
