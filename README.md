# HSL Stop Departures

Displays minute countdowns and scheduled departure times of any given public transportation stop operated by Helsinki Region Transport (HSL).

## Features
- Retrieves data in real-time from HSL [Routing API](https://digitransit.fi/en/developers/apis/1-routing-api/).
- Generate display from any HSL stop using the stop number (e.g. V1777, H0107).
- Set certain vehicle numbers as secondary (make them smaller, different colour, whatevs).
- Hide certain vehicle numbers from the departure list altogether.
- Include walk time in minute countdowns (count to "get your ass moving" instead of "vehicle at stop" time).
- Any delays are automatically counted in the minute countdowns. You may still display an additional message in such occurrances.

## Dependencies

- jQuery
- Moment
- Less (demo only)
- Bootstrap (demo only)

All dependencies are included (linked from CDNs) in the demo.

### Relevant settings in hsl-stop-departures.js
```
// HSL stop number (e.g. H1197) or stop id (e.g. HSL:1030119).
var stopId = 'H2061';

// Optional: lines that are less relevant but you still want to include them in the list. You can style them grayer, smaller or whatevs.
var secondaryLines = ['75', '77'];          

// Optional: lines that are not displayed in the list at all.
var excludeLines = ['65'];                  

// Element in which the departure list is placed.
var listContainer = '.coming';              

// Remove this many minutes from the scheduled departure time, i.e. countdown to "get your ass moving" time instead of scheduled vehicle departure time.
var walkTime = 3;                    

// Add .ready-set class when "get your ass moving" time in less than N minutes.
var getReady = 10;                          

// Pretty way of saying "0 minutes", e.g. "Now".
var prettyNow = 'Nyt';                      

// Display message if displayed departure time differs from scheduled departure time (bus is late).
var displayDelay = true;                    

// Message to display if above is true: "N minutes late from schedule."
var lateFromSchedule = 'min myöhässä aikataulusta.' 

// Update list every N seconds.
var checkEvery = 10;                        
```

### How to find your stop number

Stop numbers look something like this: H0107, V1777, E2122, etc.
- HSL App's routes section. Tap on the stop in the map to see its stop number.
- [Reittiopas](https://reittiopas.hsl.fi). Click on the stop in the map to see its stop number.
- Check the stop physically (or _[semiphysically](https://www.google.com/maps/@60.1879716,24.9633115,3a,15y,243.9h,90.45t/data=!3m6!1e1!3m4!1sA_yyz1YsMbycBB6izp6JEA!2e0!7i13312!8i6656))_. Stop number is always written somewhere at the stop.

### Notes

While PHP is not required for the script to run, there is one PHP file in this repository. This is just an image file that will output a different SVG image depending on URL parameters. This is used as an animated icon for the next departures. You can replace it with any icons of your choosing in the HTML and JS (`animateIcons()`) or remove the animated icons altogether. Wrote this script for personal use years ago and I'm too lazy to properly review and refactor it.

## Demo

https://joku.asia/esim/hsl-stop-departures
