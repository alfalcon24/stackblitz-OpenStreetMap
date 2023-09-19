import 'zone.js/dist/zone';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';

import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { fromLonLat } from 'ol/proj';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';

@Component({
  selector: 'app-open',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  map!: Map;

  longitud = -74.9108989;
  latitud = 10.6480512;

  constructor() {}

  ngOnInit(): void {
    this.initMap();
  }

  initMap() {
    // Configurar la vista del mapa
    const view = new View({
      center: fromLonLat([this.longitud, this.latitud]), // Coordenadas del centro del mapa (longitud y latitud)
      zoom: 14, // Nivel de zoom inicial
    });

    // Crear el mapa
    this.map = new Map({
      target: 'map', // ID del div donde se mostrará el mapa
      layers: [
        new TileLayer({
          source: new OSM(), // Capa base de OpenStreetMap
        }),
      ],
      view: view,
    });

    // Agregar un marcador
    const marker = new Feature({
      geometry: new Point(fromLonLat([this.longitud, this.latitud])), // Coordenadas del marcador (longitud y latitud)
    });

    // Estilo del marcador
    const markerStyle = new Style({
      image: new Icon({
        src: 'https://w7.pngwing.com/pngs/720/531/png-transparent-gps-navigation-systems-computer-icons-global-positioning-system-map-computer-program-map-gps-navigation-systems.png', // URL de la imagen del icono
        scale: 0.5, // Escala de la imagen del icono
      }),
    });

    marker.setStyle(markerStyle);

    // Capa de marcadores
    const markerLayer = new VectorLayer({
      source: new VectorSource({
        features: [marker],
      }),
    });

    this.map.addLayer(markerLayer);
  }
}

bootstrapApplication(MapComponent);
