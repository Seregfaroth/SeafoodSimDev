class IntervalStats {
    private m_scenario: Scenario;

    constructor(p_endStats: EndScreenStats, p_model: Model) {
        this.m_scenario = Scenario.getInstance();

        var intervalStatsDialog: HTMLDivElement = document.createElement("div");
        $('body').append(intervalStatsDialog);
        intervalStatsDialog.id = "intervalStats";

        var descDiv: HTMLDivElement = document.createElement("div");
        intervalStatsDialog.appendChild(descDiv);
        descDiv.id = "intervalStatsDesc";

        var endAccordionDiv2: HTMLElement = document.createElement("div");
        intervalStatsDialog.appendChild(endAccordionDiv2);
        endAccordionDiv2.id = "endAccordionDiv2";
        var h3sco: HTMLHeadingElement = document.createElement("h3");
        h3sco.innerHTML = "Score Progression";
        endAccordionDiv2.appendChild(h3sco);
        var scoreChartDiv: HTMLDivElement = document.createElement("div");
        //endAccordionDiv2.appendChild(scoreChartDiv);
        scoreChartDiv.id = 'scoreChartDiv';

        //the horizontal accordion
        var aDiv: HTMLElement = document.createElement("div");

        var horizUl: HTMLElement = document.createElement("ul");
        endAccordionDiv2.appendChild(horizUl);
        horizUl.classList.add("accordion");
        horizUl.classList.add("accordion--basic");
        //horizUl.classList.add("accordion--vertical");
        horizUl.classList.add("accordion--horizontal");
        //horizUl.setAttribute("data-direction", "vertical");
        horizUl.setAttribute("data-direction", "horizontal");
        horizUl.setAttribute("data-multiple", "true");
        horizUl.setAttribute("data-initial-index", "0");
        horizUl.setAttribute("data-event", "click");
        var horizLi: HTMLElement = document.createElement("li");
        horizUl.appendChild(horizLi);
        horizLi.classList.add("accordion__panel");
        var horizLiHeader: HTMLElement = document.createElement("span");
        horizLi.appendChild(horizLiHeader);
        horizLiHeader.classList.add("accordion__heading");
        horizLiHeader.innerHTML = "scection1 <i class='-icon -icon--right'></i>";
        var horizLiContent: HTMLElement = document.createElement("div");
        //horizLi.appendChild(horizLiContent);
        horizLi.appendChild(scoreChartDiv);
        scoreChartDiv.classList.add("accordion__expander");
        scoreChartDiv.innerHTML = "Conrtent1";

        //horizLiContent.classList.add("accordion__expander");
        //horizLiContent.innerHTML = "Conrtent1";
        //$(".-accordion").asAccordion({
        //    namespace: "-accordion",
        //    direction: "vertical"

        //});
        //$(".accordion").asAccordion({ namespace: "accordion", direction: "vertical" });
        $("#endAccordionDiv2").accordion({ collapsible: true, heightStyle: "content"}); 
        var scoreChart: google.visualization.ScatterChart = new google.visualization.ScatterChart(document.getElementById(scoreChartDiv.id));
        var scoreChartData = google.visualization.arrayToDataTable(p_endStats.getScoreVizArray()); 
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
        scoreChart.draw(scoreChartData, scoreChartOptions);     
    }

    public update = (p_time: number): void => {
        var words: string[] = ["first", "second", "third"];
        var round: number = p_time / this.m_scenario.getStatFreq();
        var timeLeft: number = this.m_scenario.getDefaultNoDays() - p_time;
        var breaksLeft: number = (timeLeft / this.m_scenario.getStatFreq()) - 1;
        var welcomeText: string
        if (round < 4) {
            welcomeText = "This is your " + words[round-1] + " break. ";
        }
        else {
            welcomeText = "This is your break number " + round + " . ";
        }
        welcomeText += "You are given statistics over the simulation so far and you have the option to change some of the settings before continuing.";
        welcomeText += "You have " + timeLeft + " days and " + breaksLeft;
        if (breaksLeft != 1) {
                welcomeText += " breaks left."
        }
        else {
            welcomeText += " break left.";
        }

        $("#intervalStatsDesc").text(welcomeText);
    }


}