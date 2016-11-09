class IntervalStats {
    private m_scenario: Scenario;

    constructor() {
        this.m_scenario = Scenario.getInstance();

        var intervalStatsDialog: HTMLDivElement = document.createElement("div");
        $('body').append(intervalStatsDialog);
        intervalStatsDialog.id = "intervalStats";

        var descDiv: HTMLDivElement = document.createElement("div");
        intervalStatsDialog.appendChild(descDiv);
        descDiv.id = "intervalStatsDesc";
        
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
            welcomeText = "This is your interval break number " + round + " . ";
        }
        welcomeText += "You are given some statistics over the simulation so far and you have the option to change some of the settings before continuing.";
        if (breaksLeft != 1) {
            welcomeText += "You have " + timeLeft + " days and " + breaksLeft + " breaks left.";
        }
        else {
            welcomeText += "You have " + timeLeft + " days and " + breaksLeft + " break left.";
        }

        $("#intervalStatsDesc").text(welcomeText);
    }


}