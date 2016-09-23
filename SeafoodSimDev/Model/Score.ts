/// <reference path="../Controller/Configuration.ts"/>

class Score {
    private m_scenario: Scenario;
    private m_financialScore: number;
    private m_socialScore: number;
    private m_environmentalScore: number;
    private m_overallScore: number;
    private m_mininumSchool: number = 10;
    //private m_minimumScore: number = -100000;
    //private m_maximumScore: number = 9999999;
    private financial: number[] = []; //List of the financial ownings every day the last year

    public constructor(p_scenario: Scenario) {
        this.m_scenario = p_scenario;
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
            if (t > 1000) {
                score.m_environmentalScore += 1000;
            }
            else {
                score.m_environmentalScore += t;
            }
        });

        //Make sure score stays inside a specific range
        this.m_environmentalScore = this.normalize(this.m_environmentalScore, 0, this.m_scenario.getEnvironmentalMaxScore(), 1000);
        this.m_socialScore = this.normalize(this.m_socialScore, 0, this.m_scenario.getSocialMaxScore(), 1000);
        this.m_financialScore = this.normalize(this.m_financialScore, 0, this.m_scenario.getFinancialMaxScore(), 1000);
        /*
        this.m_environmentalScore = Math.max(this.m_minimumScore, Math.min(this.m_maximumScore, this.m_environmentalScore));
        this.m_financialScore = Math.max(this.m_minimumScore, Math.min(this.m_maximumScore, this.m_financialScore));
        this.m_socialScore = Math.max(this.m_minimumScore, Math.min(this.m_maximumScore, this.m_socialScore));*/

        this.m_overallScore = this.m_environmentalScore / 3 + this.m_financialScore / 3 + this.m_socialScore / 3;
    }
    private normalize(p_value: number, p_min: number, p_max: number, p_score: number) {
        return ((p_value - p_min) / (p_max - p_min)) * p_score;
    }

    public getScoreColumnChartArray(): any[] {
        var ret: any[] = [[]];
        //ret = [
        //    ['ScoreType', 'CurrentScore', { role: 'style' }, { role: 'annotation' }, 'GoalScore', { role: 'style' }, { role: 'annotation' }],
        //    ['Financial', this.m_financialScore, 'color: #0057e7', 'Current', this.m_scenario.getfinGoal(), 'color: #0045b8', 'goal'],
        //    ['Environmental', this.m_environmentalScore, 'color: #008744', 'Current', this.m_scenario.getEcoGoal(), 'color: #006c36', 'goal'],
        //    ['Social', this.m_socialScore, 'color: #d62d20', 'Current', this.m_scenario.getSocGoal(), 'color: #ab2419', 'goal'],
        //    ['Overall', this.m_overallScore, 'color: #ffa700', 'Current', this.m_scenario.getAllScore(), 'color: #cc8500', 'goal'],
        //];
        var i:number = 1;
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
    }
}