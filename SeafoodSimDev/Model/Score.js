var Score = (function () {
    function Score() {
        this.m_mininumSchool = 10;
        this.m_minimumScore = -100000;
        this.m_maximumScore = 9999999;
        this.financial = []; //List of the financial ownings every day the last year
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
        p_map.getLandingSites().forEach(function (ls) {
            score.m_socialScore += 10;
        });
        p_map.getFuelSites().forEach(function (fs) {
            score.m_socialScore += 5;
        });
        score.m_socialScore += p_map.getNoOfShips() * 8;
        //Environmental score
        this.m_environmentalScore = 0;
        p_map.getSchools().forEach(function (s) {
            score.m_environmentalScore += s.getSize() - score.m_mininumSchool;
        });
        //Make sure score stays inside a specific range
        this.m_environmentalScore = Math.max(this.m_minimumScore, Math.min(this.m_maximumScore, this.m_environmentalScore));
        this.m_financialScore = Math.max(this.m_minimumScore, Math.min(this.m_maximumScore, this.m_financialScore));
        this.m_socialScore = Math.max(this.m_minimumScore, Math.min(this.m_maximumScore, this.m_socialScore));
        this.m_overallScore = this.m_environmentalScore / 3 + this.m_financialScore / 3 + this.m_socialScore / 3;
    };
    Score.prototype.normalize = function (p_value, p_min, p_max) {
        return ((p_value - p_min) / (p_max - p_min)) * 100;
    };
    return Score;
}());
//# sourceMappingURL=Score.js.map