// <reference path = "declarations/gooogle.visualization.d.ts"/>
class EndScreen {
    private m_scenario: Scenario;
    private m_model: Model;
    private m_endDialogDiv: HTMLElement;
    private m_simIndex: number = -1;
    private m_endStats;

    private m_scoreColumnChart:  google.visualization.ColumnChart[] = [];
    private m_environChart:      google.visualization.ScatterChart[] = [];
    private m_scoreChart:        google.visualization.ScatterChart[] = [];
    private m_socialChart:       google.visualization.ScatterChart[] = [];
    private m_financialChart:    google.visualization.ScatterChart[] = [];

    constructor() {
        //this.m_model = p_model;
        this.m_scenario = Scenario.getInstance();
        this.m_endDialogDiv = document.createElement("div");
        $('body').append(this.m_endDialogDiv);
        this.m_endDialogDiv.id = "endDialogDiv";

        //Create desciption div
        var descDiv: HTMLDivElement = document.createElement("div");
        descDiv.id = "descDiv";
        descDiv.classList.add("desc");
        $("#endDialogDiv").append(descDiv);
            
        $("#endDialogDiv").dialog({
            minWidth: 1050,
            minHeight: 700,
            buttons: {
                Continue: function () {
                    $(this).dialog('close');
                }
                //maxWidth: 1250,
                //maxHeight: 1000,           
                //overflow: scroll
            }
        }); 
              
    }
    public hide() {
        $("#endDialogDiv").dialog("close");
    }
    public show() {
        $("#endDialogDiv").dialog("open");
    }

    public updateDesc = (p_time: number): void => {
        var welcomeText: string
        if (p_time < this.m_scenario.getDefaultNoDays()) {
            $("#endDialogDiv").dialog({
                title: 'Interval Screen',
                buttons: {
                    Continue: function () {
                        $(this).dialog('close');
                    }
                },
                close: function () {
                    $("#endDialogDiv").dialog("close")
                }
            });
            var words: string[] = ["first", "second", "third"];
            var round: number = p_time / this.m_scenario.getStatFreq();
            var timeLeft: number = this.m_scenario.getDefaultNoDays() - p_time;
            var breaksLeft: number = (timeLeft / this.m_scenario.getStatFreq()) - 1;
            if (round < 4) {
                welcomeText = "This is your " + words[round - 1] + " break. ";
            }
            else {
                welcomeText = "This is your break number " + round + " . ";
            }
            welcomeText += "You are given statistics for the simulation so far ";
            if (this.m_simIndex > 0) {
                welcomeText += "as well as previous simulations you have run. The simulations are labeled in such a manner that the newest one has the lowest index.";
                welcomeText += " You have the option to change some of the settings before continuing.";
            }
            else {
                welcomeText += "and you have the option to change some of the settings before continuing.";
            }
            welcomeText += "You have " + timeLeft + " days and " + breaksLeft;
            if (breaksLeft != 1) {
                welcomeText += " breaks left."
            }
            else {
                welcomeText += " break left.";
            }
        }
        else {
           
            welcomeText = "The simulation is now over. Below you will find an overview of the statistics from this simulation";
            if (this.m_simIndex > 0) {
                welcomeText += " as well as previous simulations you have run";
            }
            welcomeText += ".";
        }
        $("#descDiv").text(welcomeText);
    }

    public addSimulation(p_endStats: EndScreenStats, p_model: Model) {
        this.m_model = p_model;
        this.m_endStats = p_endStats;
        this.m_simIndex++;
        var simDiv: HTMLElement = document.createElement("div");
        this.m_endDialogDiv.appendChild(simDiv);
        simDiv.id = "simulation" + this.m_simIndex;
        simDiv.style.display = "inline-block";
        simDiv.style.verticalAlign = "top";
        simDiv.style.width = "45%";
        //accordion header
        var header: HTMLElement = document.createElement("h3");
        simDiv.appendChild(header);
        header.innerHTML = simDiv.id;
        //accordion content
        var content: HTMLElement = document.createElement("div");
        simDiv.appendChild(content);
        this.buildHTMLStructure(content);
        $("#" + simDiv.id).accordion({ collapsible: true, heightStyle: "content" });
        this.drawCharts(p_model, p_endStats);
        $("#endDialogDiv").show();
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
    }
    public getOverAllScoreSucces(): boolean {
        if (this.m_model.getGovernment().getScore().getOverallScore() < this.m_model.getScenario().getAllScore())
            return false;
        else
            return true;
    }
    public closeEndScreen() {
        $("#endDialogDiv").hide();
    }
    private buildHTMLStructure(p_div: HTMLElement) {
        //var endAccordionDiv1: HTMLElement = document.createElement("div");
        //this.m_endDialogDiv.appendChild(endAccordionDiv1);
        //endAccordionDiv1.id = "endAccordionDiv1";

        //var headerDiv: HTMLDivElement = document.createElement("div");
        //endAccordionDiv.appendChild(headerDiv);
        //headerDiv.innerHTML = "EndScreen";
        //headerDiv.classList.add("header");
        var headerType: string = "h5";
        var msyProjectionDiv: HTMLElement = document.createElement("div");
        p_div.appendChild(msyProjectionDiv);
        msyProjectionDiv.id = "msy" + this.m_simIndex;
        msyProjectionDiv.innerHTML = "msy Cod: " + "</br>" + " msy Mackerel: ";
        
        var endGameStatusDiv: HTMLDivElement = document.createElement("div");       //accordion
        p_div.appendChild(endGameStatusDiv);
        var h3gs: HTMLElement = document.createElement(headerType);                 //header
        h3gs.innerHTML = "GameStatus";
        endGameStatusDiv.appendChild(h3gs);
        endGameStatusDiv.id = 'endGameStatusDiv' + this.m_simIndex;
        var endGameStatusGoalContent: HTMLDivElement = document.createElement("div");
        endGameStatusDiv.appendChild(endGameStatusGoalContent);
        endGameStatusGoalContent.id = "content" + this.m_simIndex;

        var endGameStatusColumn: HTMLDivElement = document.createElement("div");    //content
        endGameStatusGoalContent.appendChild(endGameStatusColumn);
        endGameStatusColumn.id = "egStatus" + this.m_simIndex;
        endGameStatusColumn.style.border = '3px solid black';
        endGameStatusColumn.style.cssFloat = 'right';
        endGameStatusColumn.style.margin = '30px';
        
        var endGameStatusGoalDiv: HTMLDivElement = document.createElement("div");
        endGameStatusGoalContent.appendChild(endGameStatusGoalDiv);
        endGameStatusGoalDiv.id = 'endGameStatusGoalDiv' + this.m_simIndex;
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
            endGameStatusGoalDiv.innerHTML += "<br>All the scenario goals must be achieved for it to be a succes<br>Please try again";
        }

        var endAccordionDiv2: HTMLElement = document.createElement("div");
        p_div.appendChild(endAccordionDiv2);
        endAccordionDiv2.id = "endAccordionDiv2" + this.m_simIndex;
        var h3sco: HTMLElement = document.createElement(headerType);
        h3sco.innerHTML = "Score Progression";
        endAccordionDiv2.appendChild(h3sco);
        var scoreChartDiv: HTMLDivElement = document.createElement("div");
        endAccordionDiv2.appendChild(scoreChartDiv);
        scoreChartDiv.id = 'scoreChartDiv' + this.m_simIndex;

        var endAccordionDiv3: HTMLElement = document.createElement("div");
        p_div.appendChild(endAccordionDiv3);
        endAccordionDiv3.id = "endAccordionDiv3" + this.m_simIndex;
        var h3env: HTMLElement = document.createElement(headerType);
        h3env.innerHTML = "Environmental Indicators";
        endAccordionDiv3.appendChild(h3env);
        var environChartDiv: HTMLDivElement = document.createElement("div");
        endAccordionDiv3.appendChild(environChartDiv);
        environChartDiv.id = 'environChartDiv' + this.m_simIndex;

        var endAccordionDiv4: HTMLElement = document.createElement("div");
        p_div.appendChild(endAccordionDiv4);
        endAccordionDiv4.id = "endAccordionDiv4" + this.m_simIndex;
        var h3soc: HTMLElement = document.createElement(headerType);
        h3soc.innerHTML = "Social Indicators";
        endAccordionDiv4.appendChild(h3soc);
        var socialChartDiv: HTMLDivElement = document.createElement("div");
        endAccordionDiv4.appendChild(socialChartDiv);
        socialChartDiv.id = 'socialChartDiv' + this.m_simIndex;

        var endAccordionDiv5: HTMLElement = document.createElement("div");
        p_div.appendChild(endAccordionDiv5);
        endAccordionDiv5.id = "endAccordionDiv5" + this.m_simIndex;
        var h3fin: HTMLElement = document.createElement(headerType);
        h3fin.innerHTML = "Economic Indicators";
        endAccordionDiv5.appendChild(h3fin);
        var financialChartDiv: HTMLDivElement = document.createElement("div");
        endAccordionDiv5.appendChild(financialChartDiv);
        financialChartDiv.id = 'financialChartDiv' + this.m_simIndex;

        this.m_scoreColumnChart[this.m_simIndex] = new google.visualization.ColumnChart(document.getElementById(endGameStatusGoalContent.id));
        this.m_environChart[this.m_simIndex] = new google.visualization.ScatterChart(document.getElementById(environChartDiv.id));
        this.m_scoreChart[this.m_simIndex] = new google.visualization.ScatterChart(document.getElementById(scoreChartDiv.id));
        this.m_socialChart[this.m_simIndex] = new google.visualization.ScatterChart(document.getElementById(socialChartDiv.id));
        this.m_financialChart[this.m_simIndex] = new google.visualization.ScatterChart(document.getElementById(financialChartDiv.id));

        $("#endGameStatusDiv" + this.m_simIndex).accordion({ collapsible: true, active: false, heightStyle: "content" });
        $("#endAccordionDiv2" + this.m_simIndex).accordion({ collapsible: true, active: true, heightStyle: "content" });
        $("#endAccordionDiv3" + this.m_simIndex).accordion({ collapsible: true, active: false, heightStyle: "content" });
        $("#endAccordionDiv4" + this.m_simIndex).accordion({ collapsible: true, active: false, heightStyle: "content" });
        $("#endAccordionDiv5" + this.m_simIndex).accordion({ collapsible: true, active: false, heightStyle: "content" });
    }
    //private buildGameStatusAccordion() {

    //}
    public drawCharts(p_model, p_endStats) {        
        var scoreColumnChartData = google.visualization.arrayToDataTable(p_model.getGovernment().getScore().getScoreColumnChartArray());
        var scoreChartData = google.visualization.arrayToDataTable(p_endStats.getScoreVizArray());
        var environChartData = google.visualization.arrayToDataTable(p_endStats.getEnvironmentalVizArray());
        var socialChartData = google.visualization.arrayToDataTable(p_endStats.getSocialVizArray());
        var financialChartData = google.visualization.arrayToDataTable(p_endStats.getFinancialVizArray());
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
            chartArea: { left: '25%', top: '15%', width: '50%', height: '65%' },
            //colors: ['#0057e7', '#32b835', '#d62d20', '#ffa700'],
            lineWidth: 1,
            //explorer: {},
            height: 200,
            width: 600,
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
            //colors: ['#227c24', '#279029', '#2da42f', '#32b835', '#3ac93d'],

            chartArea: { left: '25%', top: '15%', width: '50%', height: '65%' },
            lineWidth: 1,
            //explorer: {},
            height: 200,
            width: 600
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
            chartArea: { left: '25%', top: '15%', width: '50%', height: '65%' },
            //colors: ['#AD7900', '#E39F00', '#FFB300', '##FFC235', '#FFD166'],
            lineWidth: 1,
            //explorer: {},
            height: 200,
            width: 600
        }
        var financialChartOptions = {
            hAxis: {
                //title: 'Slidervalue', minValue: this.m_pwlDataArray[1][0], maxValue: this.m_pwlDataArray[this.m_pwlDataArray.length - 1][0]
                title: 'days', minValue: 0, maxValue: 100
            },
            vAxis: {
                title: ''
            },
            title: 'Economic Indicators',
            chartArea: { left: '25%', top: '15%', width: '50%', height: '65%' },
            lineWidth: 1,
            //explorer: {},
            height: 200,
            width: 600
        }
        //this.m_scoreColumnChart[this.m_simIndex].draw(scoreColumnChartData, scoreColumnChartOptions);
        this.m_scoreChart[this.m_simIndex].draw(scoreChartData, scoreChartOptions);
        this.m_environChart[this.m_simIndex].draw(environChartData, environChartOptions);
        this.m_socialChart[this.m_simIndex].draw(socialChartData, socialChartOptions);
        this.m_financialChart[this.m_simIndex].draw(financialChartData, financialChartOptions);
    }
    public updateMsy(p_model: Model) {
        var t = p_model.getMap().getCarryingCapacityBySpeciesTotal(Cod);
        var t2 = p_model.getMap().getCarryingCapacityBySpeciesTotal(Mackerel);
        
        $("#msy" + this.m_simIndex).html("MsyCod: " + Math.round(p_model.getMap().getCarryingCapacityBySpeciesTotal(Cod))/2 + "</br> MsyMac: " + Math.round(p_model.getMap().getCarryingCapacityBySpeciesTotal(Mackerel))/2);
    }
}

//var footerDiv: HTMLElement = document.createElement("div");
        //footerDiv.id = "footerDiv";
        //endDialogDiv.appendChild(footerDiv);

        //var prevButton: HTMLButtonElement = document.createElement("button");
        //footerDiv.appendChild(prevButton);
        //prevButton.innerHTML = "Prev";

        //var prevButtonInput: HTMLInputElement = document.createElement("input");
        //footerDiv.appendChild(prevButtonInput);
        //prevButtonInput.type = "submit";
        ////prevButtonInput.value = "Prev";

        //var nextButton: HTMLButtonElement = document.createElement("button");
        //footerDiv.appendChild(nextButton);
        //nextButton.innerHTML = "Next";


        //var nextButtonInput: HTMLInputElement = document.createElement("input");
        //footerDiv.appendChild(nextButtonInput);
        //nextButtonInput.type = "submit";
        ////prevButtonInput.value = "Prev";

        //var t = p_endStats.getBiomassPrTimeUnit();


        //var endAccordionDiv: HTMLDivElement = document.createElement("div");

        //$("#endAccordionDiv").multiOpenAccordion();
        //$("#prevButton").button();

        //$("#nextButton").button();