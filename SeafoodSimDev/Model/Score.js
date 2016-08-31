var Score = (function () {
    function Score() {
        this.m_mininumSchool = 10;
        this.m_minimumScore = -100000;
        this.m_maximumScore = 9999999;
        this.m_financialScore = 0;
        this.m_environmentalScore = 0;
        this.m_socialScore = 0;
    }
    Score.prototype.getSocialScore = function () {
        return this.m_socialScore;
    };
    Score.prototype.getEnvironmentalScore = function () {
        return this.m_environmentalScore;
    };
    Score.prototype.getFinancialScore = function () {
        return this.m_financialScore;
    };
    Score.prototype.updateScore = function (p_map, p_gov) {
        var score = this;
        //Financial score
        p_map.getLandingSites().forEach(function (ls) {
            score.m_financialScore -= ls.getRunningCost();
            var tmp = ls.tax(p_gov.getTaxingRate());
            var tmp2 = ls.getRunningCost();
            score.m_financialScore += ls.tax(p_gov.getTaxingRate());
        });
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
    };
    return Score;
}());
//# sourceMappingURL=Score.js.map