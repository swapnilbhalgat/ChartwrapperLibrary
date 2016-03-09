/**
 * Created by swapnil on 1/27/16.
 */


var chartwrapperLibrary = {

    dateKeyValPair : {
        "1": "Jan",
        "2": "Feb",
        "3": "Mar",
        "4": "Apr",
        "5": "May",
        "6": "June",
        "7": "July",
        "8": "Aug",
        "9": "Sept",
        "10": "Oct",
        "11": "Nov",
        "12": "Dec"
    },

    drawBar:function(Chartid,details,legend){

        var ctx = $("#"+Chartid).get(0).getContext("2d");
        // This will get the first returned node in the jQuery collection.
        var myLineChart = new Chart(ctx).Bar(details.data, details.options);
        document.getElementById(legend).innerHTML = myLineChart.generateLegend();

    },
    drawLine:function(Chartid,details,legend){

        var ctx = $("#"+Chartid).get(0).getContext("2d");
        // This will get the first returned node in the jQuery collection.
        var myLineChart = new Chart(ctx).Line(details.data, details.options);
        document.getElementById(legend).innerHTML = myLineChart.generateLegend();

    },


    initInventory:function(inventoryChart,legend){
        var inventory={
            url:"https://realestateanalytics.voitrix.com/marketstatistics/inventory",
            options : {
                responsive: true,
                pointDotRadius: 5,
                bezierCurve: false,
                scaleShowVerticalLines: false,
                scaleGridLineColor: 'rgba(0,0,0,.05)',
                legendTemplate: "<div class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><span style=\"margin-right: 10px;\"><span style=\"background-color:<%=datasets[i].strokeColor%>; color:<%=datasets[i].strokeColor%>;\">__</span> <%if(datasets[i].label){%><%=datasets[i].label%><%}%></span><%}%></div>"
            },

            dateLabels :[],

            data : {
                labels: [],
                datasets: [
                    {
                        fillColor: "rgba(75, 189, 129, 0.54)",
                        strokeColor: "#4bbd81",
                        highlightFill: "rgba(75, 189, 129, 0.75)",
                        highlightStroke: "rgba(75, 189, 129, 0.75)"
                    },
                    {
                        fillColor: "rgba(151,187,205,0.2)",
                        strokeColor: "rgba(151,187,205,1)",
                        highlightFill: "rgba(151,187,205,0.7)",
                        highlightStroke: "rgba(151,187,205,1)"
                    }

                ]
            }

        };

        $(document).ready(function () {
            //$(".button-collapse").sideNav();
            $.get(inventory.url,function(results){
                var resultData = JSON.parse(results);

                inventory.data.datasets[0].label = "ActiveListings";
                inventory.data.datasets[1].label = "NewListings";

                resultData.Dates.reverse()
                    .forEach(function(data,index){
                        inventory.dateLabels.push(chartwrapperLibrary.dateKeyValPair[parseInt(data)] + ' \'' + data.slice(-2));
                    });
                inventory.data.labels = inventory.dateLabels;

                inventory.data.datasets[0].data = resultData.ActiveListings.reverse();
                inventory.data.datasets[1].data = resultData.NewListings.reverse();

                chartwrapperLibrary.drawBar(inventoryChart,inventory,legend);



            });
        });
    },


    initPrice : function(priceChart,legend) {
        var price = {

            url:"https://realestateanalytics.voitrix.com/marketstatistics/price",

            options : {
                responsive: true,
                pointDotRadius: 5,
                bezierCurve: false,
                multiTooltipTemplate:  function(label){return  '$' + label.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");},
                scaleLabel:
                    function(label){return  '$' + label.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");},
                scaleShowVerticalLines: false,
                scaleGridLineColor: 'rgba(0,0,0,.05)',
                legendTemplate: "<div class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><span style=\"margin-right: 10px;\"><span style=\"background-color:<%=datasets[i].strokeColor%>; color:<%=datasets[i].strokeColor%>;\">__</span> <%if(datasets[i].label){%><%=datasets[i].label%><%}%></span><%}%></div>"
            },

            dateLabels :[],

            data : {
                labels: [],
                datasets: [
                    {
                        fillColor: "rgba(220,220,220,0.2)",
                        strokeColor: "rgba(220,220,220,1)",
                        pointColor: "rgba(220,220,220,1)",
                        pointStrokeColor: "#fff",
                        pointHighlightFill: "#fff",
                        pointHighlightStroke: "rgba(220,220,220,1)",
                    },
                    {
                        fillColor: "rgba(151,187,205,0.2)",
                        strokeColor: "rgba(151,187,205,1)",
                        pointColor: "rgba(151,187,205,1)",
                        pointStrokeColor: "#fff",
                        pointHighlightFill: "#fff",
                        pointHighlightStroke: "rgba(151,187,205,1)",
                    },
                    {
                        fillColor: "rgba(220,194,194,0.2)",
                        strokeColor: "rgba(220,194,194,1)",
                        pointColor: "rgba(220,194,194,1)",
                        pointStrokeColor: "#fff",
                        pointHighlightFill: "#fff",
                        pointHighlightStroke: "rgba(220,220,220,1)",
                    },
                    {
                        fillColor: "rgba(151,151,151,0.2)",
                        strokeColor: "rgba(151,151,151,1)",
                        pointColor: "rgba(151,151,151,1)",
                        pointStrokeColor: "#fff",
                        pointHighlightFill: "#fff",
                        pointHighlightStroke: "rgba(151,187,205,1)",
                    }
                ]
            }
        };

        $(document).ready(function () {
            //$(".button-collapse").sideNav();
            $.get(price.url, function (results) {
                var resultData = JSON.parse(results);

                price.data.datasets[0].label = "Avg. List Price";
                price.data.datasets[1].label = "Med. List Price";
                price.data.datasets[2].label = "New Avg. List Price";
                price.data.datasets[3].label = "New Med. List Price";

                resultData.Dates.reverse()
                    .forEach(function (data, index) {
                        price.dateLabels.push(chartwrapperLibrary.dateKeyValPair[parseInt(data)] + ' \'' + data.slice(-2));
                    });



                price.data.labels = price.dateLabels;

                price.data.datasets[0].data = resultData.ActiveAverageListPrice.reverse();
                price.data.datasets[1].data = resultData.ActiveMedianListPrice.reverse();
                price.data.datasets[2].data = resultData.NewAverageListPrice.reverse();
                price.data.datasets[3].data = resultData.NewMedianListPrice.reverse();

                chartwrapperLibrary.drawLine(priceChart,price,legend);
            });
        });

    },

    initDaysOnMarket:function(daysOnMarketChart,legend){

        var daysOnMarket = {
            url:"https://realestateanalytics.voitrix.com/marketstatistics/dom",
            options : {
                responsive: true,
                pointDotRadius: 5,
                bezierCurve: true,
                scaleShowVerticalLines: false,
                scaleGridLineColor: 'rgba(0,0,0,.05)',
                legendTemplate : "<div class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><span style=\"margin-right: 10px;\"><span style=\"background-color:<%=datasets[i].strokeColor%>; color:<%=datasets[i].strokeColor%>;\">__</span> <%if(datasets[i].label){%><%=datasets[i].label%><%}%></span><%}%></div>"
            },

            dateLabels : [],

            data : {
                labels:[],
                datasets:[
                    {
                        fillColor: "rgba(220,220,220,0.2)",
                        strokeColor: "rgba(220,220,220,1)",
                        pointColor: "rgba(220,220,220,1)",
                        pointStrokeColor: "#fff",
                        pointHighlightFill: "#fff",
                        pointHighlightStroke: "rgba(220,220,220,1)",
                    }
                ]
            }
        };


        $(document).ready(function () {
            //$(".button-collapse").sideNav();
            $.get(daysOnMarket.url,function(results){
                var resultData = JSON.parse(results);

                daysOnMarket.data.datasets[0].label = "Average Days on Market";


                resultData.Dates.reverse()
                    .forEach(function(data,index){
                        daysOnMarket.dateLabels.push(chartwrapperLibrary.dateKeyValPair[parseInt(data)] + ' \'' + data.slice(-2));
                    });
                daysOnMarket.data.labels = daysOnMarket.dateLabels;

                daysOnMarket.data.datasets[0].data = resultData.AverageDom.reverse();


                chartwrapperLibrary.drawLine(daysOnMarketChart,daysOnMarket,legend);
            });
        });


    },
    initVolume:function(volumeChart,legend){

        var volume ={
            url:"https://realestateanalytics.voitrix.com/marketstatistics/volume",

            options : {
                responsive: true,
                multiTooltipTemplate:  function(label){return  '$' + label.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");},
                scaleLabel:
                    function(label){return  '$' + label.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");},
                pointDotRadius: 10,
                bezierCurve: true,
                scaleShowVerticalLines: false,
                scaleGridLineColor: 'rgba(0,0,0,.05)',
                legendTemplate : "<div class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><span style=\"margin-right: 10px;\"><span style=\"background-color:<%=datasets[i].strokeColor%>; color:<%=datasets[i].strokeColor%>;\">__</span> <%if(datasets[i].label){%><%=datasets[i].label%><%}%></span><%}%></div>"
            },

            dateLabels : [],

            data : {
                labels:[],
                datasets:[
                    {
                        fillColor: "rgba(75, 189, 129, 0.54)",
                        strokeColor: "#4bbd81",
                        highlightFill: "rgba(75, 189, 129, 0.75)",
                        highlightStroke: "rgba(75, 189, 129, 0.75)"
                    },
                    {
                        fillColor: "rgba(151,187,205,0.2)",
                        strokeColor: "rgba(151,187,205,1)",
                        highlightFill: "rgba(151,187,205,0.7)",
                        highlightStroke: "rgba(151,187,205,1)"
                    }
                ]
            }
        };


        $(document).ready(function () {
            //$(".button-collapse").sideNav();
            $.get(volume.url,function(results){
                var resultData = JSON.parse(results);

                volume.data.datasets[0].label = "ActiveListVolume";
                volume.data.datasets[1].label = "NewListVolume";

                resultData.Dates.reverse()
                    .forEach(function(data,index){
                        volume.dateLabels.push(chartwrapperLibrary.dateKeyValPair[parseInt(data)] + ' \'' + data.slice(-2));
                    });
                volume.data.labels = volume.dateLabels;

                volume.data.datasets[0].data = resultData.ActiveListVolume.reverse();
                volume.data.datasets[1].data = resultData.NewListVolume.reverse();

                chartwrapperLibrary.drawBar(volumeChart,volume,legend);
            });
        });


    }

}

