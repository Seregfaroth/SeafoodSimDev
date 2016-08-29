class Score {
    private m_financialScore: number;
    private m_socialScore: number;
    private m_environmentalScore: number;
    private m_mininumSchool: number = 10;
    private m_minimumScore: number = -100000;
    private m_maximumScore: number = 9999999;

    public constructor() {
        this.m_financialScore = 0;
        this.m_environmentalScore = 0;
        this.m_socialScore = 0;
    }

    public getSocialScore(): number {
        return this.m_socialScore;
    }
    public getEnvironmentalScore(): number {
        return this.m_environmentalScore;
    }
    public getFinancialScore(): number {
        return this.m_financialScore;
    }

    public updateScore(p_map: Map, p_gov: Government): void {
        var score: Score = this;
        //Financial score
        p_map.getLandingSites().forEach(function (ls) {
            score.m_financialScore -= ls.getRunningCost();
            score.m_financialScore += ls.tax(p_gov.getTaxingRate());
        });

        p_map.getFuelSites().forEach(function (fs) {
            score.m_financialScore -= fs.getRunningCost();
        });

        //Social score

        //Environmental score
        this.m_environmentalScore = 0;
        p_map.getSchools().forEach(function (s) {
            score.m_environmentalScore += s.getSize() - score.m_mininumSchool;
        });

        //Make sure score stays inside a specific range
        this.m_environmentalScore = Math.max(this.m_minimumScore, Math.min(this.m_maximumScore, this.m_environmentalScore));
        this.m_financialScore = Math.max(this.m_minimumScore, Math.min(this.m_maximumScore, this.m_financialScore));
        this.m_socialScore = Math.max(this.m_minimumScore, Math.min(this.m_maximumScore, this.m_socialScore));


    }
}