// <reference path = "declarations/gooogle.visualization.d.ts"/>
var EndScreen = (function () {
    function EndScreen(p_endStats, p_model) {
        this.m_model = p_model;
        var endDialogDiv = document.createElement("div");
        $('body').append(endDialogDiv);
        endDialogDiv.id = "endDialogDiv";
        var endAccordionDiv1 = document.createElement("div");
        endDialogDiv.appendChild(endAccordionDiv1);
        endAccordionDiv1.id = "endAccordionDiv1";
        //var headerDiv: HTMLDivElement = document.createElement("div");
        //endAccordionDiv.appendChild(headerDiv);
        //headerDiv.innerHTML = "EndScreen";
        //headerDiv.classList.add("header");
        var h3gs = document.createElement("h3");
        h3gs.innerHTML = "GameStatus";
        endAccordionDiv1.appendChild(h3gs);
        var endGameStatusDiv = document.createElement("div");
        endAccordionDiv1.appendChild(endGameStatusDiv);
        var endGameStatusColumn = document.createElement("div");
        endGameStatusDiv.appendChild(endGameStatusColumn);
        endGameStatusDiv.id = 'endGameStatusDiv';
        endGameStatusDiv.style.border = '3px solid black';
        //endGameStatusDiv.style.cssFloat = 'right';
        //endGameStatusDiv.style.margin = '30px';
        var endGameStatusGoalDiv = document.createElement("div");
        endGameStatusDiv.appendChild(endGameStatusGoalDiv);
        endGameStatusGoalDiv.id = 'endGameStatusGoalDiv';
        endGameStatusGoalDiv.style.border = '1px solid green';
        //endGameStatusGoalDiv.style.margin = '10px';
        endGameStatusGoalDiv.style.padding = '5px';
        endGameStatusGoalDiv.innerHTML = "";
        var scenarioSucces = true;
        if (this.m_model.getScenario().getfinGoal().toString() != "no") {
            if (this.getFinancialScoreSucces()) {
                //endGameStatusGoalDiv.innerHTML += "Financial Score Goal: " + this.getFinancialScoreSucces() + "<br>";
                endGameStatusGoalDiv.innerHTML += "Financial Score Goal: " + "succesful" + "<br>";
            }
            else {
                endGameStatusGoalDiv.innerHTML += "Financial Score Goal: " + "unsuccesful" + "<br>";
                scenarioSucces = false;
            }
        }
        if (this.m_model.getScenario().getEcoGoal().toString() != "no") {
            //endGameStatusGoalDiv.innerHTML += "Enviromental Score Goal: " + this.getEnvironmentalScoreSucces() + "<br>";
            if (this.getEnvironmentalScoreSucces()) {
                //endGameStatusGoalDiv.innerHTML += "Financial Score Goal: " + this.getFinancialScoreSucces() + "<br>";
                endGameStatusGoalDiv.innerHTML += "Environmental Score Goal: " + "succesful" + "<br>";
            }
            else {
                endGameStatusGoalDiv.innerHTML += "Environmental Score Goal: " + "unsuccesful" + "<br>";
                scenarioSucces = false;
            }
        }
        if (this.m_model.getScenario().getSocGoal().toString() != "no") {
            //endGameStatusGoalDiv.innerHTML += "Social Score Goal: " + this.getSocialScoreSucces() + "<br>";
            if (this.getSocialScoreSucces()) {
                //endGameStatusGoalDiv.innerHTML += "Financial Score Goal: " + this.getFinancialScoreSucces() + "<br>";
                endGameStatusGoalDiv.innerHTML += "Social Score Goal: " + "succesful" + "<br>";
            }
            else {
                endGameStatusGoalDiv.innerHTML += "Social Score Goal: " + "unsuccesful" + "<br>";
                scenarioSucces = false;
            }
        }
        if (this.m_model.getScenario().getAllScore().toString() != "no") {
            //endGameStatusGoalDiv.innerHTML += "Overall Score Goal: " + this.getOverAllScoreSucces() + "<br>";
            if (this.getOverAllScoreSucces()) {
                //endGameStatusGoalDiv.innerHTML += "Financial Score Goal: " + this.getFinancialScoreSucces() + "<br>";
                endGameStatusGoalDiv.innerHTML += "OverAll Score Goal: " + "succesful" + "<br>";
            }
            else {
                endGameStatusGoalDiv.innerHTML += "OverAll Score Goal: " + "unsuccesful" + "<br>";
                scenarioSucces = false;
            }
        }
        if (scenarioSucces) {
            endGameStatusGoalDiv.innerHTML += "<br>All the scenario goals was achieved, so the scenario was accomplished succesfully";
        }
        else {
            endGameStatusGoalDiv.innerHTML += "<br>All the scenario goals must be achieved for it to be a succes<br>Please try again";
        }
        var endAccordionDiv2 = document.createElement("div");
        endDialogDiv.appendChild(endAccordionDiv2);
        endAccordionDiv2.id = "endAccordionDiv2";
        var h3sco = document.createElement("h3");
        h3sco.innerHTML = "Score Progression";
        endAccordionDiv2.appendChild(h3sco);
        var scoreChartDiv = document.createElement("div");
        endAccordionDiv2.appendChild(scoreChartDiv);
        scoreChartDiv.id = 'scoreChartDiv';
        var endAccordionDiv3 = document.createElement("div");
        endDialogDiv.appendChild(endAccordionDiv3);
        endAccordionDiv3.id = "endAccordionDiv3";
        var h3env = document.createElement("h3");
        h3env.innerHTML = "Environmental Indicators";
        endAccordionDiv3.appendChild(h3env);
        var environChartDiv = document.createElement("div");
        endAccordionDiv3.appendChild(environChartDiv);
        environChartDiv.id = 'environChartDiv';
        var endAccordionDiv4 = document.createElement("div");
        endDialogDiv.appendChild(endAccordionDiv4);
        endAccordionDiv4.id = "endAccordionDiv4";
        var h3soc = document.createElement("h3");
        h3soc.innerHTML = "Social Indicators";
        endAccordionDiv4.appendChild(h3soc);
        var socialChartDiv = document.createElement("div");
        endAccordionDiv4.appendChild(socialChartDiv);
        socialChartDiv.id = 'socialChartDiv';
        var endAccordionDiv5 = document.createElement("div");
        endDialogDiv.appendChild(endAccordionDiv5);
        endAccordionDiv5.id = "endAccordionDiv5";
        var h3fin = document.createElement("h3");
        h3fin.innerHTML = "Financial Indicators";
        endAccordionDiv5.appendChild(h3fin);
        var financialChartDiv = document.createElement("div");
        endAccordionDiv5.appendChild(financialChartDiv);
        financialChartDiv.id = 'financialChartDiv';
        var footerDiv = document.createElement("div");
        footerDiv.id = "footerDiv";
        endDialogDiv.appendChild(footerDiv);
        var prevButton = document.createElement("button");
        footerDiv.appendChild(prevButton);
        prevButton.innerHTML = "Prev";
        //var prevButtonInput: HTMLInputElement = document.createElement("input");
        //footerDiv.appendChild(prevButtonInput);
        //prevButtonInput.type = "submit";
        ////prevButtonInput.value = "Prev";
        var nextButton = document.createElement("button");
        footerDiv.appendChild(nextButton);
        nextButton.innerHTML = "Next";
        //var nextButtonInput: HTMLInputElement = document.createElement("input");
        //footerDiv.appendChild(nextButtonInput);
        //nextButtonInput.type = "submit";
        ////prevButtonInput.value = "Prev";
        var t = p_endStats.getBiomassPrTimeUnit();
        var scoreColumnChartOptions = {
            title: "Current and Goal scores",
            width: 600,
            height: 400,
            bar: { groupWidth: "90%" },
            legend: { position: "none" },
            hAxis: {
                minValue: -2000
            },
            animation: {
                duration: 1500,
                startup: true
            }
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
            width: 500,
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
        //var endAccordionDiv: HTMLDivElement = document.createElement("div");
        $("#endAccordionDiv1").accordion({ collapsible: true });
        $("#endAccordionDiv2").accordion({ collapsible: true, active: false });
        $("#endAccordionDiv3").accordion({ collapsible: true, active: false });
        $("#endAccordionDiv4").accordion({ collapsible: true, active: false });
        $("#endAccordionDiv5").accordion({ collapsible: true, active: false });
        //$("#endAccordionDiv").multiOpenAccordion();
        $("#prevButton").button();
        $("#nextButton").button();
        $("#endDialogDiv").dialog({
            minWidth: 1050,
            minHeight: 300,
            maxWidth: 1250,
            maxHeight: 1000,
        });
    }
    EndScreen.prototype.getFinancialScoreSucces = function () {
        var t = this.m_model.getGovernment().getScore().getFinancialScore();
        var tt = this.m_model.getScenario().getfinGoal();
        if (this.m_model.getGovernment().getScore().getFinancialScore() < this.m_model.getScenario().getfinGoal())
            return false;
        else
            return true;
    };
    EndScreen.prototype.getEnvironmentalScoreSucces = function () {
        if (this.m_model.getGovernment().getScore().getEnvironmentalScore() < this.m_model.getScenario().getEcoGoal())
            return false;
        else
            return true;
    };
    EndScreen.prototype.getSocialScoreSucces = function () {
        if (this.m_model.getGovernment().getScore().getSocialScore() < this.m_model.getScenario().getSocGoal())
            return false;
        else
            return true;
    };
    EndScreen.prototype.getOverAllScoreSucces = function () {
        if (this.m_model.getGovernment().getScore().getOverallScore() < this.m_model.getScenario().getAllScore())
            return false;
        else
            return true;
    };
    EndScreen.prototype.closeEndScreen = function () {
        $("#endDialogDiv").empty().remove();
    };
    return EndScreen;
}());
//# sourceMappingURL=EndScreen.js.map