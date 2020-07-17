import React, {useEffect, useState} from 'react';
import 'ol/ol.css';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import VectorTileLayer from 'ol/layer/VectorTile';
import VectorTileSource, {Options as VectorTileOptions} from 'ol/source/VectorTile';
import OLWMTS, {optionsFromCapabilities} from 'ol/source/WMTS';
import WMTSCapabilities from 'ol/format/WMTSCapabilities';
import {transform} from 'ol/proj';
import {Fill, Stroke, Style} from 'ol/style';
import MVT from 'ol/format/MVT';

import {Basemaps, Tileset} from '../types';

interface MapProps {
  basemaps: Basemaps,
  tilesets: Tileset[]
}

// TODO: Style should be geometry type dependent, current mapStyle does not work for points
const mapStyle = new Style({
  stroke: new Stroke({
    color: 'gray',
    width: 1,
  }),
  fill: new Fill({
    color: 'rgba(20,20,20,0.9',
  }),
});

const createVectorTileSource = (tileset: Tileset):VectorTileSource => {
  const options: VectorTileOptions = {
    attributions: tileset.attribution,
    format: new MVT(),
    maxZoom: tileset.maxzoom,
    minZoom: tileset.minzoom,
    url: tileset.tiles[0],
  };
  const vt = new VectorTileSource(options);
  return vt;
};

function MapComponent({ basemaps, tilesets }: MapProps) {
  const WMTSLayers = basemaps.WMTS;
  const [activeTileLayer, setActiveTileLayer] = useState<Tileset>();
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
          zIndex: -1,
        }));
      });

    const defaultLayer = tilesets[0];
    setActiveTileLayer(defaultLayer);
    const vectorTileSource = createVectorTileSource(defaultLayer);
    const vectorLayer = new VectorTileLayer({
      source: vectorTileSource,
      // style: mapStyle,
    });
    map.addLayer(vectorLayer);
    const layerCenter = transform(
      [defaultLayer.center[0], defaultLayer.center[1]],
      'EPSG:4326', 'EPSG:3857',
    );
    const updatedView = new View({
      center: layerCenter,
      zoom: defaultLayer.center[2],
    });
    map.setView(updatedView);
  }, [map, WMTSLayers, tilesets]);

  return (
    <div style={mapContainerStyle}>
      <div id="map" style={mapContainerStyle} />
    </div>
  );
}

export default MapComponent;
