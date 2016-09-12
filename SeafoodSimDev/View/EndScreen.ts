// <reference path = "declarations/gooogle.visualization.d.ts"/>
class EndScreen {
    constructor(p_endStats: EndScreenStats) {
        var endDiv: HTMLDivElement = document.createElement("div");
        $('body').append(endDiv);
        endDiv.id = "endScreen";

        var headerDiv: HTMLDivElement = document.createElement("div");
        endDiv.appendChild(headerDiv);
        headerDiv.innerHTML = "EndScreen";
        headerDiv.classList.add("header");

        var scoreChartDiv: HTMLDivElement = document.createElement("div");
        endDiv.appendChild(scoreChartDiv);
        scoreChartDiv.id = 'scoreChartDiv';

        var environChartDiv: HTMLDivElement = document.createElement("div");
        endDiv.appendChild(environChartDiv);
        environChartDiv.id = 'environChartDiv';

        var t = p_endStats.getBiomassPrTimeUnit();
        var scoreChartOptions = {
            hAxis: {
                //title: 'Slidervalue', minValue: this.m_pwlDataArray[1][0], maxValue: this.m_pwlDataArray[this.m_pwlDataArray.length - 1][0]
                title: 'days', minValue: 0, maxValue: 100
            },
            vAxis: {
                title: 'Scores'
            },
            title: 'Scores',
            chartArea: { left: '5%', top: '15%', width: '65%', height: '60%' },
            lineWidth: 1,
            explorer: {},
            height: 300,
            width: 500
        }
        var environChartOptions = {
            hAxis: {
                //title: 'Slidervalue', minValue: this.m_pwlDataArray[1][0], maxValue: this.m_pwlDataArray[this.m_pwlDataArray.length - 1][0]
                title: 'days', minValue: 0, maxValue: 100
            },
            vAxis: {
                title: 'Tonnes'
            },
            title: 'Environmental',
            chartArea: { left: '5%', top: '15%', width: '65%', height: '60%' },
            lineWidth: 1,
            explorer: {},
            height: 300,
            width: 500
        }

        var environChart: google.visualization.ScatterChart = new google.visualization.ScatterChart(document.getElementById(environChartDiv.id));
        var scoreChart: google.visualization.ScatterChart = new google.visualization.ScatterChart(document.getElementById(scoreChartDiv.id));
        
        var scoreChartData = google.visualization.arrayToDataTable(p_endStats.getScoreVizArray());
        var environChartData = google.visualization.arrayToDataTable(p_endStats.getEnvironmentalVizArray());
        scoreChart.draw(scoreChartData, scoreChartOptions);
        environChart.draw(environChartData, environChartOptions);

        $("#endScreen").dialog({
            minWidth: 1050,
            minHeight: 700
        });
    }
}