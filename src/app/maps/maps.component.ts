import { ElementRef, ViewChild } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
// import * as L from 'leaflet';
declare var L: any;

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements OnInit, AfterViewInit {

  @ViewChild('map') mapdiv: ElementRef;
  constructor() { }
  popup: any;
  mymap: any;
  marker: any;

  ngOnInit() { }

  ngAfterViewInit(): void {
    this.mymap = L.map(this.mapdiv.nativeElement, {
      center: [51.5, -0.09],
      zoom: 12
    });
    // https://spatialservices.cfapps.eu10.hana.ondemand.com/mapping/v1/here/tiles/basetile/newest/normal.day/0/0/0/256/png
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: 'pk.eyJ1IjoiZ2F1cmFuZzk2IiwiYSI6ImNrZjZlNzBodDBkdWgycW96ZTZ0YzB2YTIifQ.bszhp87GIsVYip61rBt_lg'
    }).addTo(this.mymap);

    this.marker = L.marker([51.5, -0.09], {
      // icon: '/assets/pin.jpg',
      riseOnHover: true,
      title: 'basic tooltip',
      opacity: 0.8
    }).addTo(this.mymap);

    this.marker.addEventListener('click', this.onMapClick.bind(this));
  }

  onMapClick(event) {
    const that = this;
    this.popup = L.popup().setLatLng([51.505, -0.09])
      .setContent('<p>Hello world!<br />This is a nice popup.</p>')
      .openOn(this.mymap);
  }

}

// L.TileLayer.WMSHeader = L.TileLayer.WMS.extend({
//   initialize: function (url, options, headers, abort) {
//     L.TileLayer.WMS.prototype.initialize.call(this, url, options);
//     this.headers = headers;
//     this.abort = abort;
//   },
//   createTile(coords, done) {
//     const url = this.getTileUrl(coords);
//     const img = document.createElement("img");
//     img.setAttribute("role", "presentation");

//     fetchImage(
//       url,
//       resp => {
//         const reader = new FileReader();
//         reader.onload = () => {
//           img.src = reader.result;
//         };
//         reader.readAsDataURL(resp);
//         done(null, img);
//       },
//       this.headers,
//       this.abort
//     );
//     return img;
//   }
// });

// async function fetchImage(url, callback, headers, abort) {
//   let _headers = {};
//   if (headers) {
//     headers.forEach(h => {
//       _headers[h.header] = h.value;
//     });
//   }
//   const controller = new AbortController();
//   const signal = controller.signal;
//   if (abort) {
//     abort.subscribe(() => {
//       controller.abort();
//     });
//   }
//   const f = await fetch(url, {
//     method: "GET",
//     headers: _headers,
//     mode: "cors",
//     signal: signal
//   });
//   const blob = await f.blob();
//   callback(blob);
}


// L.TileLayer.WMSHeader = L.TileLayer.WMS.extend({
//   initialize: function (url, options, headers, abort) {
//     L.TileLayer.WMS.prototype.initialize.call(this, url, options);
//     this.headers = headers;
//     this.abort = abort;
//   },
//   createTile(coords, done) {
//     const url = this.getTileUrl(coords);
//     const img = document.createElement("img");
//     img.setAttribute("role", "presentation");

//     fetchImage(
//       url,
//       resp => {
//         const reader = new FileReader();
//         reader.onload = () => {
//           img.src = reader.result;
//         };
//         reader.readAsDataURL(resp);
//         done(null, img);
//       },
//       this.headers,
//       this.abort
//     );
//     return img;
//   }
// });

// L.TileLayer.wmsHeader = function (url, options, headers, abort) {
//   return new L.TileLayer.WMSHeader(url, options, headers, abort);
// };
