class Score {
    private m_config: Configuration;
    private m_financialScore: number;
    private m_socialScore: number;
    private m_environmentalScore: number;
    private m_overallScore: number;
    private m_mininumSchool: number = 10;
    private m_minimumScore: number = -100000;
    private m_maximumScore: number = 9999999;
    private financial: number[] = []; //List of the financial ownings every day the last year

    public constructor(p_config: Configuration) {
        this.m_config = p_config;
        this.m_financialScore = 0;
        this.m_environmentalScore = 0;
        this.m_socialScore = 0;
        this.m_overallScore = 0;
        for (var i = 0; i < 365; i++) {
            this.financial[i] = 0;
        }

    }
    public getOverallScore(): number {
        return this.m_overallScore;
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

    public updateScore(p_map: Map, p_gov: Government, p_time: number): void {
        var score: Score = this;
        //Financial score
        var value: number = 0;
        p_map.getLandingSites().forEach(function (ls) {
            value -= ls.getRunningCost();
            value += ls.tax(p_gov.getTaxingRate());
        });
        var day: number = p_time % 365;
        var moneyToday: number = value + this.financial[day > 0 ? day - 1 : 364];
        
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
            var t = s.getSize() - s.getMsy()
            if (t > 100) {
                score.m_environmentalScore += 100;
            }
            else {
                score.m_environmentalScore += t;
            }
        });

        //Make sure score stays inside a specific range
        this.m_environmentalScore = Math.max(this.m_minimumScore, Math.min(this.m_maximumScore, this.m_environmentalScore));
        this.m_financialScore = Math.max(this.m_minimumScore, Math.min(this.m_maximumScore, this.m_financialScore));
        this.m_socialScore = Math.max(this.m_minimumScore, Math.min(this.m_maximumScore, this.m_socialScore));

        this.m_overallScore = this.m_environmentalScore / 3 + this.m_financialScore / 3 + this.m_socialScore / 3;
    }
    private normalize(p_value: number, p_min: number, p_max: number) {
        return ((p_value - p_min) / (p_max - p_min)) * 100;
    }
}