# HSL Stop Arrivals

Displays scheduled arrival times of given HSL stop with minute countdowns.

## Features
- Retrieves data in real-time from HSL's Routing API.
- Set certain vehicle numbers as secondary.
- Exclude certain vehicle numbers altogether.
- Include walk time to minute countdowns (count to "get your ass moving" instead of vehicle arrival time).
- Display in advance if vehicle is running late.

### Relevant settings
```
var stopId = 'H2061';                       // HSL stop number (e.g. H1197) or stop id (e.g. HSL:1030119). How to find your stop number or id: https://github.com/olaviinha/HSL-StopArrivals
var secondaryLines = ['75', '77'];          // Optional: lines that are less relevant but you still want to include them in the list. You can style them grayer, smaller or whatevs.
var excludeLines = ['65'];                  // Optional: lines that are not displayed in the list at all.
var listContainer = '.coming';              // Element in which the arrival list is placed.

var walkTime = 3;                           // Remove this many minutes from the scheduled arrival time, i.e. countdown to "get your ass moving" time instead of scheduled vehicle arrival time.
var getReady = 10;                          // Add .ready-set class when "get your ass moving" time in less than N minutes.
```

### How to find your stop number

- HSL App's routes section. Tap on the stop to see its stop number.
- Reittiopas. Click on the stop to see its stop number.
- Stop number is always written somewhere at the stop, so check the stop physically.

### Notes

While PHP is not required for the script to run, there is one PHP file in this repository. This is just an image file that will output a different SVG image depending on URL parameters. You can replace it with any normal image files in the HTML and JS or remove the animated icons altogether. Wrote this script to personal use years ago and I'm too lazy to properly review and refactor it.

## Demo

https://joku.asia/esim/hsl-stop-arrivals
