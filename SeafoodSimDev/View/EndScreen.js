// <reference path = "declarations/gooogle.visualization.d.ts"/>
var EndScreen = (function () {
    function EndScreen(p_endStats, p_model) {
        this.m_model = p_model;
        var endDiv = document.createElement("div");
        $('body').append(endDiv);
        endDiv.id = "endScreen";
        var headerDiv = document.createElement("div");
        endDiv.appendChild(headerDiv);
        headerDiv.innerHTML = "EndScreen";
        //headerDiv.classList.add("header");
        var endGameStatusDiv = document.createElement("div");
        endDiv.appendChild(endGameStatusDiv);
        endGameStatusDiv.id = 'endGameStatusDiv';
        endGameStatusDiv.style.border = '1px solid black';
        endGameStatusDiv.style.cssFloat = 'right';
        //endGameStatusDiv.style.margin = '30px';
        var endGameStatusGoalDiv = document.createElement("div");
        endDiv.appendChild(endGameStatusGoalDiv);
        endGameStatusGoalDiv.id = 'endGameStatusGoalDiv';
        endGameStatusGoalDiv.style.border = '1px solid black';
        //endGameStatusGoalDiv.style.margin = '10px';
        endGameStatusGoalDiv.innerHTML = "";
        if (this.m_model.getScenario().getfinGoal().toString() != "no")
            endGameStatusGoalDiv.innerHTML += "Financial Score Goal: " + this.getFinancialScoreSucces() + "<br>";
        if (this.m_model.getScenario().getEcoGoal().toString() != "no")
            endGameStatusGoalDiv.innerHTML += "Enviromental Score Goal: " + this.getEnvironmentalScoreSucces() + "<br>";
        if (this.m_model.getScenario().getSocGoal().toString() != "no")
            endGameStatusGoalDiv.innerHTML += "Social Score Goal: " + this.getSocialScoreSucces() + "<br>";
        if (this.m_model.getScenario().getAllScore().toString() != "no")
            endGameStatusGoalDiv.innerHTML += "Overall Score Goal: " + this.getOverAllScoreSucces() + "<br>";
        var scoreChartDiv = document.createElement("div");
        endDiv.appendChild(scoreChartDiv);
        scoreChartDiv.id = 'scoreChartDiv';
        var environChartDiv = document.createElement("div");
        endDiv.appendChild(environChartDiv);
        environChartDiv.id = 'environChartDiv';
        var socialChartDiv = document.createElement("div");
        endDiv.appendChild(socialChartDiv);
        socialChartDiv.id = 'socialChartDiv';
        var financialChartDiv = document.createElement("div");
        endDiv.appendChild(financialChartDiv);
        financialChartDiv.id = 'financialChartDiv';
        var t = p_endStats.getBiomassPrTimeUnit();
        var scoreColumnChartOptions = {
            title: "Current and Goal scores",
            width: 600,
            height: 400,
            bar: { groupWidth: "90%" },
            legend: { position: "none" }
        };
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
            colors: ['#0057e7', '#32b835', '#d62d20', '#ffa700'],
            lineWidth: 1,
            explorer: {},
            height: 300,
            width: 500
        };
        var environChartOptions = {
            hAxis: {
                //title: 'Slidervalue', minValue: this.m_pwlDataArray[1][0], maxValue: this.m_pwlDataArray[this.m_pwlDataArray.length - 1][0]
                title: 'days', minValue: 0, maxValue: 100
            },
            vAxis: {
                title: 'Tonnes'
            },
            title: 'Environmental Indicators',
            //colors: ['#00361b', '#005e2f', '#008744', '#4cab7c', '#99cfb4'],
            //colors: ['#008A00', '#00B500', '#00DC00', '#2EDF2E', '#5CE55C'],
            colors: ['#227c24', '#279029', '#2da42f', '#32b835', '#3ac93d'],
            chartArea: { left: '5%', top: '15%', width: '65%', height: '60%' },
            lineWidth: 1,
            explorer: {},
            height: 300,
            width: 500
        };
        var socialChartOptions = {
            hAxis: {
                //title: 'Slidervalue', minValue: this.m_pwlDataArray[1][0], maxValue: this.m_pwlDataArray[this.m_pwlDataArray.length - 1][0]
                title: 'days', minValue: 0, maxValue: 100
            },
            vAxis: {
                title: ''
            },
            title: 'Social Indicators',
            chartArea: { left: '5%', top: '15%', width: '65%', height: '60%' },
            colors: ['#AD7900', '#E39F00', '#FFB300', '##FFC235', '#FFD166'],
            lineWidth: 1,
            explorer: {},
            height: 300,
            width: 500
        };
        var financialChartOptions = {
            hAxis: {
                //title: 'Slidervalue', minValue: this.m_pwlDataArray[1][0], maxValue: this.m_pwlDataArray[this.m_pwlDataArray.length - 1][0]
                title: 'days', minValue: 0, maxValue: 100
            },
            vAxis: {
                title: ''
            },
            title: 'Financial Indicators',
            chartArea: { left: '5%', top: '15%', width: '65%', height: '60%' },
            lineWidth: 1,
            explorer: {},
            height: 300,
            width: 500
        };
        var scoreColumnChart = new google.visualization.ColumnChart(document.getElementById(endGameStatusDiv.id));
        var environChart = new google.visualization.ScatterChart(document.getElementById(environChartDiv.id));
        var scoreChart = new google.visualization.ScatterChart(document.getElementById(scoreChartDiv.id));
        var socialChart = new google.visualization.ScatterChart(document.getElementById(socialChartDiv.id));
        var financialChart = new google.visualization.ScatterChart(document.getElementById(financialChartDiv.id));
        var scoreColumnChartData = google.visualization.arrayToDataTable(p_model.getGovernment().getScore().getScoreColumnChartArray());
        var scoreChartData = google.visualization.arrayToDataTable(p_endStats.getScoreVizArray());
        var environChartData = google.visualization.arrayToDataTable(p_endStats.getEnvironmentalVizArray());
        var socialChartData = google.visualization.arrayToDataTable(p_endStats.getSocialVizArray());
        var financialChartData = google.visualization.arrayToDataTable(p_endStats.getFinancialVizArray());
        scoreColumnChart.draw(scoreColumnChartData, scoreColumnChartOptions);
        scoreChart.draw(scoreChartData, scoreChartOptions);
        environChart.draw(environChartData, environChartOptions);
        socialChart.draw(socialChartData, socialChartOptions);
        financialChart.draw(financialChartData, financialChartOptions);
        $("#endScreen").dialog({
            minWidth: 1050,
            minHeight: 300,
            maxWidth: 1250,
            maxHeight: 600
        });
    }
    EndScreen.prototype.getFinancialScoreSucces = function () {
        if (this.m_model.getGovernment().getScore().getFinancialScore() < this.m_model.getScenario().getfinGoal())
            return "Failed";
        else
            return "Succes";
    };
    EndScreen.prototype.getEnvironmentalScoreSucces = function () {
        if (this.m_model.getGovernment().getScore().getEnvironmentalScore() < this.m_model.getScenario().getEcoGoal())
            return "Failed";
        else
            return "Succes";
    };
    EndScreen.prototype.getSocialScoreSucces = function () {
        if (this.m_model.getGovernment().getScore().getSocialScore() < this.m_model.getScenario().getSocGoal())
            return "Failed";
        else
            return "Succes";
    };
    EndScreen.prototype.getOverAllScoreSucces = function () {
        if (this.m_model.getGovernment().getScore().getOverallScore() < this.m_model.getScenario().getAllScore())
            return "Failed";
        else
            return "Succes";
    };
    return EndScreen;
}());
//# sourceMappingURL=EndScreen.js.map