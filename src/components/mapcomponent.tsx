import React, {
  useEffect, useRef, useState,
} from 'react';
import 'ol/ol.css';
import {
  Map, MapBrowserEvent, Overlay, View,
} from 'ol';
import TileLayer from 'ol/layer/Tile';
import VectorTileLayer from 'ol/layer/VectorTile';
import VectorTileSource, { Options as VectorTileOptions } from 'ol/source/VectorTile';
import OLWMTS, { optionsFromCapabilities } from 'ol/source/WMTS';
import WMTSCapabilities from 'ol/format/WMTSCapabilities';
import { transform } from 'ol/proj';
import { Fill, Stroke, Style } from 'ol/style';
import CircleStyle from 'ol/style/Circle';
import MVT from 'ol/format/MVT';

import OverlayPositioning from 'ol/OverlayPositioning';
import { Basemaps, Tileset } from '../types';

interface MapProps {
  basemaps: Basemaps,
  tilesets: Tileset[]
}

const mapStyles = {
  polyStyle: new Style({
    stroke: new Stroke({
      color: 'orange',
      width: 1,
    }),
    fill: new Fill({
      color: 'rgba(20,20,20,0.9',
    }),
  }),
  pointStyle: new Style({
    image: new CircleStyle({
      radius: 5,
      fill: new Fill({
        color: '#666666',
      }),
      stroke: new Stroke({
        color: '#ffffff',
        width: 1,
      }),
    }),
  }),
};

const createVectorTileSource = (tileset: Tileset):VectorTileSource => {
  const options: VectorTileOptions = {
    attributions: tileset.attribution,
    format: new MVT(),
    maxZoom: tileset.maxzoom,
    minZoom: tileset.minzoom,
    url: tileset.tiles[0],
  };
  return new VectorTileSource(options);
};

function MapComponent({ basemaps, tilesets }: MapProps) {
  const [olMap, setOlMap] = useState<Map>();
  const WMTSLayers = basemaps.WMTS;
  const [activeTileLayer, setActiveTileLayer] = useState<Tileset>();
  const mapContainerStyle = { height: '100%', width: '100%' };
  const [popup, setPopup] = useState<Overlay>();

  const mapRef = useRef(null);
  const popupRef = useRef<HTMLDivElement>(null);

  // const olMap = new Map({
  useEffect(() => {
    setOlMap(new Map({
      target: undefined,
      controls: [],
      view: new View({
        center: [2478699.953232, 8501593.815476],
        zoom: 14,
      }),
    }));
  }, []);

  useEffect(() => {
    if (olMap) {
      olMap?.setTarget(mapRef.current!);
      setPopup(new Overlay({
        element: popupRef.current!,
        autoPan: true,
        autoPanAnimation: {
          duration: 250,
        },
        positioning: OverlayPositioning.CENTER_CENTER,
      }));
    }
    return () => olMap?.setTarget(undefined);
  }, [olMap]);

  useEffect(() => {
    if (!olMap || !popup) return;
    if (!olMap.getOverlays().getLength()) olMap.addOverlay(popup);
  }, [olMap, popup]);

  useEffect(() => {
    if (!olMap || !popup) return;
    olMap.on('click', (evt: MapBrowserEvent) => {
      popup.setPosition(evt.coordinate);
      if (popupRef.current === null) return;
      popupRef.current.innerHTML = '<h1>feature</h1>';
    });
  }, [olMap, popup]);

  // Set initial WMTS basemap and VectorTileLayer
  useEffect(() => {
    if (!olMap) return;
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
        olMap.addLayer(new TileLayer({
          source: new OLWMTS(options),
          zIndex: -1,
        }));
      });

    const defaultLayer = tilesets[0];
    setActiveTileLayer(defaultLayer);
    const vectorTileSource = createVectorTileSource(defaultLayer);
    const vectorLayer = new VectorTileLayer({
      source: vectorTileSource,
      style: mapStyles.pointStyle,
    });
    olMap.addLayer(vectorLayer);
    const layerCenter = transform(
      [defaultLayer.center[0], defaultLayer.center[1]],
      'EPSG:4326', 'EPSG:3857',
    );
    const updatedView = new View({
      center: layerCenter,
      zoom: defaultLayer.center[2],
    });
    olMap.setView(updatedView);
  }, [olMap, WMTSLayers, tilesets]);

  return (
    <div style={mapContainerStyle}>
      <div style={mapContainerStyle} ref={mapRef} />
      <div
        ref={popupRef}
        style={{
          width: '30px', height: '30px', border: '1px solid red', backgroundColor: '#0FF', zIndex: 9999,
        }}
      />
    </div>
  );
}

export default MapComponent;
