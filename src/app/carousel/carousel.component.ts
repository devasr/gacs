import { Component, OnInit } from '@angular/core';

import { Image } from './image.interface';

@Component({
  selector: 'app-css-carousel',
  templateUrl: './carousel.component.html',
  styles: [
    `
.carousel{
    overflow:hidden;
    height:243px;
    width:100%;
}
.slides{
    list-style:none;
    position:relative;
    width:500%; /* Number of panes * 100% */
    overflow:hidden; /* Clear floats */
        /* Slide effect Animations*/
    -moz-animation:carousel 30s infinite;
    -webkit-animation:carousel 30s infinite;
    animation:carousel 30s infinite;
    margin-bottom:0px;
}
.slides > li{
    position:relative;
    float:left;
    width: 20%; /* 100 / number of panes */
}
.carousel img{
    display:block;
    width:100%;
    max-width:100%;
}

.carousel h2{
    margin-bottom: 0;
    font-size:1em;

    position:absolute;
    right:0px;
    bottom:0px;
    left:0px;
    text-align:center;
    color:#fff;
    background-color:rgba(0,0,0,0.75);
    text-transform: uppercase;
}

@keyframes carousel{
    0%    { left:-0%; }
    11%   { left:-0%; }
    12.0% { left:-100%; }
    23.0% { left:-100%; }
    20%   { left:-200%; }
    36%   { left:-200%; }
    37.'% { left:-300%; }
    48.'% { left:-300%; }
    50%   { left:-400%; }
    61%   { left:-400%; }
    62.'% { left:-300%; }
    73.'% { left:-300%; }
    75%   { left:-200%; }
    86%   { left:-200%; }
    87.'% { left:-100%; }
    98.'% { left:-100%; }
    100%  { left:-0%; }
}
  `
  ]
})
export class CarouselComponent {
  public images = [
    {
      title: 'We are covered',
      url:
        'https://raw.githubusercontent.com/christiannwamba/angular2-carousel-component/master/images/covered.jpg'
    },
    {
      title: 'Generation Gap',
      url:
        'https://raw.githubusercontent.com/christiannwamba/angular2-carousel-component/master/images/generation.jpg'
    },
    {
      title: 'Potter Me',
      url:
        'https://raw.githubusercontent.com/christiannwamba/angular2-carousel-component/master/images/potter.jpg'
    },
    {
      title: 'Pre-School Kids',
      url:
        'https://raw.githubusercontent.com/christiannwamba/angular2-carousel-component/master/images/preschool.jpg'
    },
    {
      title: 'Young Peter Cech',
      url:
        'https://raw.githubusercontent.com/christiannwamba/angular2-carousel-component/master/images/soccer.jpg'
    }
  ];
}
