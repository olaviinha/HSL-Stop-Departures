# HSL Stop Departures

Displays scheduled departure times of – and minute countdowns to – given public transportation stop operated by Helsinki Region Transport (HSL).

## Features
- Retrieves data in real-time from HSL [Routing API](https://digitransit.fi/en/developers/apis/1-routing-api/).
- Generate display from any HSL stop using the stop number (e.g. V1777, H0107).
- Set certain vehicle numbers as secondary (make them smaller, different colour, whatevs).
- Exclude certain vehicle numbers altogether.
- Include walk time in minute countdowns (count to "get your ass moving" instead of "vehicle at stop" time).
- Any delays are automatically counted in the minute countdowns. You may still display an additional message in such occurrances.

### Relevant settings in hsl-stop-departures.js
```
var stopId = 'H2061';                       // HSL stop number (e.g. H1197) or stop id (e.g. HSL:1030119). 
var secondaryLines = ['75', '77'];          // Optional: lines that are less relevant but you still want to include them in the list. You can style them grayer, smaller or whatevs.
var excludeLines = ['65'];                  // Optional: lines that are not displayed in the list at all.
var listContainer = '.coming';              // Element in which the arrival list is placed.

var walkTime = 3;                           // Remove this many minutes from the scheduled departure time, i.e. countdown to "get your ass moving" time instead of scheduled vehicle departure time.
var getReady = 10;                          // Add .ready-set class when "get your ass moving" time in less than N minutes.
```

### How to find your stop number

Stop numbers look something like this: H0107, V1777, E2122, etc.
- HSL App's routes section. Tap on the stop in the map to see its stop number.
- [Reittiopas](https://reittiopas.hsl.fi). Click on the stop in the map to see its stop number.
- Check the stop physically. Stop number is always written somewhere at the stop.

### Notes

While PHP is not required for the script to run, there is one PHP file in this repository. This is just an image file that will output a different SVG image depending on URL parameters. You can replace it with any normal image files in the HTML and JS or remove the animated icons altogether. Wrote this script for personal use years ago and I'm too lazy to properly review and refactor it.

## Demo

https://joku.asia/esim/hsl-stop-departures
