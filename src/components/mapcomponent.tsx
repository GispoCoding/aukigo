import React, {
  useCallback, useEffect, useRef, useState,
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
import { Fill, Style } from 'ol/style';
import CircleStyle from 'ol/style/Circle';
import MVT from 'ol/format/MVT';

import OverlayPositioning from 'ol/OverlayPositioning';
import { FeatureLike } from 'ol/Feature';
import { ThemeProvider } from '@material-ui/styles';
import { boundingExtent, buffer } from 'ol/extent';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Basemaps, GeometryType, Tileset } from '../types';
import MapPopup from './mappopup';
import theme from '../theme';

interface MapProps {
  basemaps: Basemaps,
  tilesets: Tileset[],
  selectedLayerName: string
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const styleFunction = (f: FeatureLike) => {
  if (f.get('name')) {
    let color = '#999999';
    if (f.get('currently_open') === true) {
      color = '#006D77';
    } else if (f.get('currently_open') === false) {
      color = '#EEC79F';
    }

    return new Style({
      image: new CircleStyle({
        radius: 5,
        fill: new Fill({
          color,
        }),
      }),
    });
  }
  return undefined;
};

const selectedStyle = (f: FeatureLike) => {
  const style = styleFunction(f);
  if (style) {
    const image = style!.getImage() as CircleStyle;
    image.setRadius(8);
    return style;
  }
  return undefined;
};

const createVectorTileSource = (tileset: Tileset, layerIndex: number): VectorTileSource => {
  const options: VectorTileOptions = {
    attributions: tileset.attribution,
    format: new MVT(),
    maxZoom: tileset.maxzoom,
    minZoom: tileset.minzoom,
    url: tileset.tiles[layerIndex],
  };
  return new VectorTileSource(options);
};

interface FeatureProperties {
  [key: string]: any,
}

function MapComponent({ basemaps, tilesets, selectedLayerName }: MapProps) {
  const [olMap, setOlMap] = useState<Map>();
  // eslint-disable-next-line
  const mapContainerStyle = {height: '100%', width: '100%'};
  const [popup, setPopup] = useState<Overlay>();
  const [popupFeature, setPopupFeature] = useState<FeatureProperties>({ notInitialized: true });
  const [popupPosition, setPopupPosition] = useState<Array<number>>();

  const mapRef = useRef(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Clear layers that are not included
  const removeOldLayers = useCallback(() => {
    const layerNames: string[] = [...tilesets.map((tileset) => tileset.name),
      ...basemaps.WMTS.map((layer) => layer.name),
      ...basemaps.vectorTile.map((layer) => layer.name)];
    const layersToRemove = olMap!.getLayers().getArray()
      .filter((layer) => !layerNames.includes(layer.get('name')));
    layersToRemove.forEach((layer) => olMap!.removeLayer(layer));
  }, [olMap, tilesets, basemaps]);

  // Create Map
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

  // Set olMap target and create popup Overlay
  useEffect(() => {
    if (olMap) {
      olMap?.setTarget(mapRef.current!);
      setPopup(new Overlay({
        element: popupRef.current!,
        autoPan: true,
        autoPanAnimation: {
          duration: 250,
        },
        // Use larger margin for desktop to avoid popup getting under the logo banner
        autoPanMargin: isMobile ? 20 : 110,
        positioning: OverlayPositioning.BOTTOM_LEFT,
      }));
    }
    window.scrollTo(0, 1);
    return () => olMap?.setTarget(undefined);
  }, [olMap, isMobile]);

  // Add popup Overlay to map
  useEffect(() => {
    if (!olMap || !popup) return;
    olMap.getOverlays().getArray().forEach((overlay) => olMap.removeOverlay(overlay));
    olMap.addOverlay(popup);
    setPopupPosition(undefined);
  }, [olMap, popup, tilesets]);

  // Set Basemap
  useEffect(() => {
    if (!olMap) return;

    removeOldLayers();
    if (basemaps.WMTS.length) {
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
          const layer = new TileLayer({
            source: new OLWMTS(options),
            zIndex: -1,
          });
          layer.set('name', baseLayer.name);
          olMap.addLayer(layer);
        });
    } else {
      // TODO: Add support for vector tile basemaps
    }
  }, [olMap, basemaps, removeOldLayers]);

  // Set Vector layers
  useEffect(() => {
    if (!olMap) return;

    removeOldLayers();

    const names = olMap!.getLayers().getArray()
      .map((layer) => layer.get('name'));

    tilesets.filter((tileset) => !names.includes(tileset.name)).forEach((tileset) => {
      // Add layers
      tileset.vector_layers.forEach((layerName, layerIndex) => {
        const ending: string = `_${layerName.split('_').slice(-1)[0]}`;
        if (ending === GeometryType.Point) {
          const vectorTileSource = createVectorTileSource(tileset, layerIndex);

          const vectorLayer = new VectorTileLayer({
            declutter: true,
            source: vectorTileSource,
            style: styleFunction,
          });

          let selection: string | any[] = [];

          const selLayer = new VectorTileLayer({
            map: olMap,
            source: vectorLayer.getSource(),
            style: (f) => {
              if (selection.includes(f.get('osmid'))) {
                return selectedStyle(f);
              }
              return undefined;
            },
          });

          // Create map click event listener
          olMap.on('click', (evt: MapBrowserEvent) => {
            if (!popup || popupRef.current === null) return;
            let extent = boundingExtent([evt.coordinate]);
            extent = buffer(extent, 10 * olMap.getView().getResolution());
            const features = vectorLayer.getSource().getFeaturesInExtent(extent)
              .filter((f) => f.get('osmid') && f.get('name'));

            // Popup setup
            if (features.length === 0) {
              setPopupPosition(undefined);
              selection = [];
              selLayer.changed();
              return;
            }

            selection = [features[0].get('osmid')]; // features.map((f) => f.get('osmid'));
            selLayer.changed();

            setPopupFeature(features[0].getProperties());
            setPopupPosition(evt.coordinate);
          });

          vectorLayer.set('name', tileset.name);
          selLayer.set('name', tileset.name);
          olMap.addLayer(vectorLayer);
        }
      });
    });
  }, [olMap, tilesets, removeOldLayers, popup]);

  // set popup position
  useEffect(() => {
    if (!popup || popupRef.current === null) return;
    popup.setPosition(popupPosition);
    popupRef.current.hidden = false;
  }, [popup, popupPosition]);

  // hide popup on layer change
  useEffect(() => {
    setPopupPosition(undefined);
  }, [selectedLayerName]);

  // hide popup on close button click
  const onClosePopupClicked = useCallback(() => {
    setPopupPosition(undefined);
  }, []);

  return (
    <div style={mapContainerStyle}>
      <div style={mapContainerStyle} ref={mapRef} />
      <ThemeProvider theme={theme}>
        <div ref={popupRef}>
          <MapPopup
            properties={popupFeature}
            layerName={selectedLayerName}
            onClosePopupClicked={onClosePopupClicked}
          />
        </div>
      </ThemeProvider>
    </div>
  );
}

export default MapComponent;
