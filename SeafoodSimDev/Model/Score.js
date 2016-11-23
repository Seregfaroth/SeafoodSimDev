var Score = (function () {
    function Score(p_scenario) {
        this.m_mininumSchool = 10;
        //private m_minimumScore: number = -100000;
        //private m_maximumScore: number = 9999999;
        this.financial = []; //List of the financial ownings every day the last year
        this.m_scenario = Scenario.getInstance();
        this.m_financialScore = 0;
        this.m_environmentalScore = 0;
        this.m_socialScore = 0;
        this.m_overallScore = 0;
        for (var i = 0; i < 365; i++) {
            this.financial[i] = 0;
        }
    }
    Score.prototype.getOverallScore = function () {
        return this.m_overallScore;
    };
    Score.prototype.getSocialScore = function () {
        return this.m_socialScore;
    };
    Score.prototype.getEnvironmentalScore = function () {
        return this.m_environmentalScore;
    };
    Score.prototype.getFinancialScore = function () {
        return this.m_financialScore;
    };
    Score.prototype.updateScore = function (p_map, p_gov, p_time) {
        var score = this;
        //Financial score
        var value = 0;
        p_map.getLandingSites().forEach(function (ls) {
            value -= ls.getRunningCost();
            value += ls.tax(p_gov.getTaxingRate());
        });
        var day = p_time % 365;
        var moneyToday = value + this.financial[day > 0 ? day - 1 : 364];
        this.m_financialScore = moneyToday - this.financial[day];
        this.financial[day] = moneyToday;
        p_map.getFuelSites().forEach(function (fs) {
            score.m_financialScore -= fs.getRunningCost();
        });
        //Social score
        this.m_socialScore = 0;
        //p_map.getLandingSites().forEach(function (ls) {           
        //    score.m_socialScore += 10;
        //});
        //p_map.getFuelSites().forEach(function (fs) {
        //    score.m_socialScore += 5;
        //});
        score.m_socialScore += p_map.getNoOfShips() * 8;
        //Environmental score
        this.m_environmentalScore = 0;
        p_map.getSchools().forEach(function (s) {
            var t = s.getSize() - s.getMsy();
            if (t > score.m_scenario.getEnvironmentalScoreMaxIncreasePerTick()) {
                score.m_environmentalScore += score.m_scenario.getEnvironmentalScoreMaxIncreasePerTick();
            }
            else {
                score.m_environmentalScore += t;
            }
        });
        //Make sure score stays inside a specific range
        //this.m_environmentalScore = this.normalize(this.m_environmentalScore, 0, this.m_scenario.getEnvironmentalMaxScore(), 1000) * this.m_scenario.getSubEnvironmentalWeight() / 100;
        //this.m_socialScore = this.normalize(this.m_socialScore, 0, this.m_scenario.getSocialMaxScore(), 1000) * this.m_scenario.getSubSocialWeight() / 100;
        //this.m_financialScore = this.normalize(this.m_financialScore, 0, this.m_scenario.getFinancialMaxScore(), 1000) * this.m_scenario.getSubFinancialWeight() / 100;
        this.m_environmentalScore = this.normalize(this.m_environmentalScore, 0, this.m_scenario.getEnvironmentalMaxScore(), 1000);
        this.m_socialScore = this.normalize(this.m_socialScore, 0, this.m_scenario.getSocialMaxScore(), 1000);
        this.m_financialScore = this.normalize(this.m_financialScore, 0, this.m_scenario.getFinancialMaxScore(), 1000);
        //this.m_environmentalScore = Math.max(this.m_minimumScore, Math.min(this.m_maximumScore, this.m_environmentalScore));
        //this.m_financialScore = Math.max(this.m_minimumScore, Math.min(this.m_maximumScore, this.m_financialScore));
        //this.m_socialScore = Math.max(this.m_minimumScore, Math.min(this.m_maximumScore, this.m_socialScore));
        this.m_overallScore = this.m_environmentalScore / 3 + this.m_financialScore / 3 + this.m_socialScore / 3;
    };
    Score.prototype.normalize = function (p_value, p_min, p_max, p_score) {
        return ((p_value - p_min) / (p_max - p_min)) * p_score;
    };
    Score.prototype.getScoreColumnChartArray = function () {
        var ret = [[]];
        //ret = [
        //    ['ScoreType', 'CurrentScore', { role: 'style' }, { role: 'annotation' }, 'GoalScore', { role: 'style' }, { role: 'annotation' }],
        //    ['Financial', this.m_financialScore, 'color: #0057e7', 'Current', this.m_scenario.getfinGoal(), 'color: #0045b8', 'goal'],
        //    ['Environmental', this.m_environmentalScore, 'color: #008744', 'Current', this.m_scenario.getEcoGoal(), 'color: #006c36', 'goal'],
        //    ['Social', this.m_socialScore, 'color: #d62d20', 'Current', this.m_scenario.getSocGoal(), 'color: #ab2419', 'goal'],
        //    ['Overall', this.m_overallScore, 'color: #ffa700', 'Current', this.m_scenario.getAllScore(), 'color: #cc8500', 'goal'],
        //];
        var i = 1;
        var t5 = this.m_financialScore;
        var t6 = this.m_scenario.getfinGoal();
        ret[0] = ['ScoreType', 'CurrentScore', { role: 'style' }, { role: 'annotation' }, 'GoalScore', { role: 'style' }, { role: 'annotation' }];
        if (this.m_scenario.getfinGoal().toString() != "no")
            ret[i++] = ['Financial', this.m_financialScore, 'color: #0057e7', 'Current', this.m_scenario.getfinGoal(), 'color: #0045b8', 'goal'];
        if (this.m_scenario.getEcoGoal().toString() != "no")
            ret[i++] = ['Environmental', this.m_environmentalScore, 'color: #008744', 'Current', this.m_scenario.getEcoGoal(), 'color: #006c36', 'goal'];
        if (this.m_scenario.getSocGoal().toString() != "no")
            ret[i++] = ['Social', this.m_socialScore, 'color: #d62d20', 'Current', this.m_scenario.getSocGoal(), 'color: #ab2419', 'goal'];
        if (this.m_scenario.getAllScore().toString() != "no")
            ret[i++] = ['Overall', this.m_overallScore, 'color: #ffa700', 'Current', this.m_scenario.getAllScore(), 'color: #cc8500', 'goal'];
        return ret;
    };
    return Score;
}());
//# sourceMappingURL=Score.js.map