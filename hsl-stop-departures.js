var stopId = 'H2061';                       // HSL stop number (e.g. H1197) or stop id (e.g. HSL:1030119). How to find your stop number or id: https://github.com/olaviinha/HSL-Stop-Departures
var secondaryLines = ['75', '77'];          // Optional: lines that are less relevant but you still want to include them in the list. You can style them grayer, smaller or whatevs.
var excludeLines = ['65'];                  // Optional: lines that are not displayed in the list at all.
var listContainer = '.coming';              // Element in which the departure list is placed.

var walkTime = 3;                           // Remove this many minutes from the scheduled departure time, i.e. countdown to "get your ass moving" time instead of scheduled vehicle departure time.
var getReady = 10;                          // Add .ready-set class when "get your ass moving" time in less than N minutes.
var prettyNow = 'Nyt';                      // Pretty way of saying "0 minutes", e.g. "Now".

var displayDelay = true;                    // Display message if displayed departure time differs from scheduled departure time (bus is late).
var lateFromSchedule = 'min myöhässä aikataulusta.' // Message to display if above is true: "N minutes late from schedule."
var checkEvery = 10;                        // Update list every N seconds.

var timeFormat = 'HH:mm:ss';
var queryUrl = 'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql';
var updateInterval = {'mins': 5000, 'list': checkEvery*1000, 'icons':  500};

var listInitialized = false;
var stop, name;
var rnd = Math.floor((Math.random() * 1000000) + 1);

moment.updateLocale('en', {
    relativeTime : {
        future: "%s",
        s  : prettyNow,
        ss : prettyNow,
        m:  '1 min',
        mm: '%d <span class="unit">min</span>',
        h:  '1 h',
        hh: '%d h',
    }
});

function getStopId(stopNumber){
    var sId;
    $.ajax(queryUrl, {
        data: `{
            stops(name: "`+stopNumber+`") {
              gtfsId
            }
          }`,
        contentType: 'application/graphql',
        type: 'POST',
        async: false,
        success: function(data){
            sId = data.data.stops[0].gtfsId;
        } 
    });
    return sId;
}

function soonerThan(diz, mins) {
    if( (parseInt(diz) < mins && !diz.includes('h')) || diz == prettyNow || diz.includes('ago')) {
        return true;
    }
    return false;
}

function updateMins() {
    var firstWent = false;
    $(listContainer).find('.bus').each(function(i){
        $(this).removeClass('too-late next');
        $(this).next().removeClass('too-late next');
        var untilGo = moment($(this).find('.actual').html(), timeFormat).subtract(walkTime, 'minutes').fromNow();
        var untilStop = moment($(this).find('.actual').html(), timeFormat).fromNow();
        var late = parseInt(untilStop) - parseInt(moment($(this).find('.scheduled').html(), timeFormat).fromNow());
        var passed = false;
        if(untilGo.includes('ago')){
            $(this).remove();
        }
        if(soonerThan(untilGo, getReady)){
            $(this).find('.until .icon').removeClass('go').addClass('ready-set');
        }
        if(soonerThan(untilGo, walkTime) || untilGo.includes('Nyt')){
            $(this).find('.until .icon').removeClass('ready-set').addClass('go');
        }
        if(i == 0 && passed == false){
            $(this).addClass('next');
        }
        if(i > 0 && passed==true){
            $(this).addClass('next');
            passed = false;
        }
        $(this).find('.until .mins').html(untilGo);
        $(this).find('.at-stop .stop-mins').html(untilStop);
        if(displayDelay == true){
            $(this).find('.at-stop .late').html('<span class="hsl-warn"></span> '+late+' '+lateFromSchedule);
            if(late > 0){
                $(this).find('.late').removeClass('hidden');
            }
        }
    });
}

function updateList(stop, el){
    $.ajax(queryUrl, {
        data: `{
            stop(id: "`+stopId+`") {
              name
              code
              stoptimesWithoutPatterns(numberOfDepartures: 30) {
                scheduledArrival
                realtimeArrival
                arrivalDelay
                scheduledDeparture
                realtimeDeparture
                departureDelay
                realtime
                realtimeState
                serviceDay
                headsign
                trip {
                  route {
                    shortName
                    longName
                  }
                }
              }
            }
        }`,
        async: false,
        contentType: 'application/graphql',
        type: 'POST',
    }).done(function(data){
        stop = data.data.stop;
        name = stop.name;
        $(el).html('');
        stop.stoptimesWithoutPatterns.forEach(function(bus, i){
            var line = bus.trip.route.shortName;
            line = line.replace(/N/, '<span class="night">N</span>');
            var scheduled = moment.unix(bus.serviceDay+bus.scheduledDeparture).format(timeFormat);
            var actual = moment.unix(bus.serviceDay+bus.realtimeDeparture).format(timeFormat);
            if(!excludeLines.includes(line)){
                var busRow = $('.templates .bus').clone();
                busRow.addClass('n'+i);
                if(secondaryLines.includes(line)){
                    busRow.addClass('secondary');
                }
                busRow.find('.line').html(line);
                busRow.find('.at-stop .actual').text(actual);
                busRow.find('.at-stop .scheduled').text(scheduled);
                $(el).append(busRow);
            }
        });
        updateMins();
        if(listInitialized == false){
            initMins();
            listInitialized = true;
        }
    });
}

function animateIcons() {
    $('.ready-set .waiting').each(function(){        
        if($(this).attr('src') == 'arch.svg.php?p=st'){
            $(this).attr('src', 'arch.svg.php?p=in');
        } else if ($(this).attr('src') == 'arch.svg.php?p=in') {
            $(this).attr('src', 'arch.svg.php?p=mid');
        } else if ($(this).attr('src') == 'arch.svg.php?p=mid') {
            $(this).attr('src', 'arch.svg.php?p=out');
        } else {
            $(this).attr('src', 'arch.svg.php?p=st');
        }
    });
}

function initMins() {
    setInterval(function(){
        updateMins();
    }, updateInterval['mins']);
}

function initList(stop, el) {
    updateList(stop, el);
    setInterval(function(){
        updateList(stop, el);
    }, updateInterval['list']);
}

function initIcons() {
    setInterval(function(){
        animateIcons();
    }, updateInterval['icons']);
}

function initDemoBox() {
    $('#stopname').html('// '+name);
    $('#stopCode').keyup(function(){
        var val = $(this).val();
        console.log(val.length, val);
        if(val.length <= 5){
            if(!val.includes('HSL:')){
                stopId = getStopId(val);
            }
            initList(stopId, listContainer);
            $('#stopname').html('// '+name);
        }
    })
}

$(document).ready(function(){
    if(!stopId.includes('HSL:')){
        stopId = getStopId(stopId);
    }
    initList(stopId, listContainer);
    initIcons();

    initDemoBox();
});
