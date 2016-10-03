// <reference path = "declarations/gooogle.visualization.d.ts"/>
class EndScreen {
    private m_model: Model;

    constructor(p_endStats: EndScreenStats, p_model: Model) {
        this.m_model = p_model;
        var endDiv: HTMLDivElement = document.createElement("div");
        $('body').append(endDiv);
        endDiv.id = "endScreen";

        var headerDiv: HTMLDivElement = document.createElement("div");
        endDiv.appendChild(headerDiv);
        headerDiv.innerHTML = "EndScreen";
        //headerDiv.classList.add("header");

        var endGameStatusDiv: HTMLDivElement = document.createElement("div");
        endDiv.appendChild(endGameStatusDiv);
        endGameStatusDiv.id = 'endGameStatusDiv';
        endGameStatusDiv.style.border = '3px solid black';
        endGameStatusDiv.style.cssFloat = 'right';
        //endGameStatusDiv.style.margin = '30px';

        var endGameStatusGoalDiv: HTMLDivElement = document.createElement("div");
        endDiv.appendChild(endGameStatusGoalDiv);
        endGameStatusGoalDiv.id = 'endGameStatusGoalDiv';
        endGameStatusGoalDiv.style.border = '1px solid green';
        //endGameStatusGoalDiv.style.margin = '10px';
        endGameStatusGoalDiv.style.padding = '5px';
        endGameStatusGoalDiv.innerHTML = "";
        var scenarioSucces: boolean = true;
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
            endGameStatusGoalDiv.innerHTML += "<br>All the scenario goals must be achieved for it to be a succes<br>Please try again" ;
        }


        var scoreChartDiv: HTMLDivElement = document.createElement("div");
        endDiv.appendChild(scoreChartDiv);
        scoreChartDiv.id = 'scoreChartDiv';

        var environChartDiv: HTMLDivElement = document.createElement("div");
        endDiv.appendChild(environChartDiv);
        environChartDiv.id = 'environChartDiv';

        var socialChartDiv: HTMLDivElement = document.createElement("div");
        endDiv.appendChild(socialChartDiv);
        socialChartDiv.id = 'socialChartDiv';

        var financialChartDiv: HTMLDivElement = document.createElement("div");
        endDiv.appendChild(financialChartDiv);
        financialChartDiv.id = 'financialChartDiv';

        var t = p_endStats.getBiomassPrTimeUnit();

        var scoreColumnChartOptions = {
            title: "Current and Goal scores",
            width: 600,
            height: 400,
            bar: { groupWidth: "90%" },
            legend: { position: "none" }
        }
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
            //legend: 'in'
        }
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
        }
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
        }
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
        }

        var scoreColumnChart: google.visualization.ColumnChart = new google.visualization.ColumnChart(document.getElementById(endGameStatusDiv.id));
        var environChart: google.visualization.ScatterChart = new google.visualization.ScatterChart(document.getElementById(environChartDiv.id));
        var scoreChart: google.visualization.ScatterChart = new google.visualization.ScatterChart(document.getElementById(scoreChartDiv.id));
        var socialChart: google.visualization.ScatterChart = new google.visualization.ScatterChart(document.getElementById(socialChartDiv.id));
        var financialChart: google.visualization.ScatterChart = new google.visualization.ScatterChart(document.getElementById(financialChartDiv.id));

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
            maxHeight: 600,
            
            //overflow: scroll
        });
    }
        
    public getFinancialScoreSucces(): boolean {
        var t = this.m_model.getGovernment().getScore().getFinancialScore();
        var tt = this.m_model.getScenario().getfinGoal();
        if (this.m_model.getGovernment().getScore().getFinancialScore() < this.m_model.getScenario().getfinGoal())
            return false;
        else
            return true;
    }
    public getEnvironmentalScoreSucces(): boolean {
        if (this.m_model.getGovernment().getScore().getEnvironmentalScore() < this.m_model.getScenario().getEcoGoal())
            return false;
        else
            return true;
    }
    public getSocialScoreSucces(): boolean {
        if (this.m_model.getGovernment().getScore().getSocialScore() < this.m_model.getScenario().getSocGoal())
            return false;
        else
            return true;
    } public getOverAllScoreSucces(): boolean {
        if (this.m_model.getGovernment().getScore().getOverallScore() < this.m_model.getScenario().getAllScore())
            return false;
        else
            return true;
    }
    public closeEndScreen() {
        $("#endScreen").empty().remove();
    }
}