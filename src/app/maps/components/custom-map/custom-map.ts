import { Component, ElementRef, OnInit, output, viewChild } from '@angular/core';

import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { LatLng } from '../../../types';

mapboxgl.accessToken =
  'pk.eyJ1Ijoiam1mcjEwIiwiYSI6ImNtYzlxcHA4cDFidTIybXBraWQxYmVvOHkifQ.WZkB7-bsv3TTjRgK3MdomQ';

@Component({
  selector: 'custom-map',
  imports: [],
  templateUrl: './custom-map.html',
  styles: `
    .map {
      width: 100vw;
      height: 100vh;
    }
  `,
})
export class CustomMap implements OnInit {
  private mapElement = viewChild<ElementRef<HTMLDivElement>>('map');
  private map: mapboxgl.Map | null = null;
  public center = output<LatLng>();

  ngOnInit(): void {
    if (!this.mapElement()) throw new Error('Map element not found');

    this.map = new mapboxgl.Map({
      container: this.mapElement()!.nativeElement,
      center: [-122.473043, 37.80333], // starting position [lng, lat]. Note that lat must be set between -90 and 90
      zoom: 16, // starting zoom
    });

    this.center.emit({ lat: 37.80333, lng: -122.473043 });
    this.map.on('moveend', () => {
      const currentCenter = this.map!.getCenter();
      this.center.emit({ lat: currentCenter.lat, lng: currentCenter.lng });
    });
  }
}
