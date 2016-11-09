var IntervalStats = (function () {
    function IntervalStats() {
        var _this = this;
        this.update = function (p_time) {
            var words = ["first", "second", "third"];
            var round = p_time / _this.m_scenario.getStatFreq();
            var timeLeft = _this.m_scenario.getDefaultNoDays() - p_time;
            var breaksLeft = (timeLeft / _this.m_scenario.getStatFreq()) - 1;
            var welcomeText;
            if (round < 4) {
                welcomeText = "This is your " + words[round - 1] + " break. ";
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
        };
        this.m_scenario = Scenario.getInstance();
        var intervalStatsDialog = document.createElement("div");
        $('body').append(intervalStatsDialog);
        intervalStatsDialog.id = "intervalStats";
        var descDiv = document.createElement("div");
        intervalStatsDialog.appendChild(descDiv);
        descDiv.id = "intervalStatsDesc";
    }
    return IntervalStats;
}());
//# sourceMappingURL=IntervalStats.js.map