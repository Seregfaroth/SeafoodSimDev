﻿/// <reference path = "Map.ts"/>
/// <reference path = "Government.ts"/>
/// <reference path = "ShipOwner.ts"/>
/// <reference path = "Restrictions.ts"/>
/// <reference path = "EndScreenStats.ts"/>

class Model {
    private m_scenario: Scenario;
    private m_map: Map;
    private m_shipOwners: ShipOwner[] = [];
    private m_goverment: Government;
    private m_ai: AI;
    private m_time: number = 0;
    private m_stats: EndScreenStats;

    constructor(p_scenario: Scenario) {
        console.log("constructing model");
        var t=p_scenario.getSchoolSizeWeight();
        this.m_scenario = p_scenario;
        var restrictions: Restrictions = new Restrictions(this.m_scenario);
        this.m_stats = new EndScreenStats(this.m_scenario);

        this.m_map = new Map( restrictions, this.m_scenario);
        //this.m_stats = new EndScreenStats(this.m_map);
        this.m_goverment = new Government(restrictions, this.m_scenario);
        this.m_ai = new AI(this.m_scenario);
        var j = 0;
        for (var i = 0; i < p_scenario.getNoOfShipOwners(); i++) {
            var startShipPoint: Point2[] = [new Point2(6, 11), new Point2(7, 12)];
            
            do {
                //startShipPoint = new Point2(Math.round(Math.random() * (this.m_map.getMapHeight() - 1)), Math.round(Math.random() * (this.m_map.getMapWidth() - 1)));
                //startShipPoint[i] = new Point2(6, 11);
            }   while (!(this.m_map.getTile(startShipPoint[j]) instanceof Ocean))//If this is not an ocean tile, find a new tile
            this.createShipOwner(startShipPoint[j++]);
        }
       
        this.updateStats();
    }
    public getScenario(): Scenario {
        return this.m_scenario;
    }

    public updateStats() {
        //console.log("upStats, time: " + this.m_time);
        var biomass = 0;
        var recruit = this.m_map.m_recruit;
        var natDeath = this.m_map.m_natDeath;
        // updating time
        var statTime = this.getTime() / this.m_scenario.getStatFreq();
        this.m_stats.setTimeAt(statTime, this.getTime());
        //updating biomass and recruitment
        for (var sc of this.getMap().getSchools()) {
            biomass += sc.getBiomass();
            recruit += sc.getRecruitTotal();
            natDeath += sc.getNatDeathTotal();
        }
        this.m_stats.setBiomassPrTimeUnitAt(statTime, biomass);
        this.m_stats.setRecruitmentPrTimeUnitAt(statTime, recruit);
        this.m_stats.setNatDeathPrTimeUnitAt(statTime, natDeath);
        var t = this.m_map.getYield();
        this.m_stats.setYieldPrTimeUnitAt(statTime, this.m_map.getYield());

        //updating income
        var income = 0;
        for (var so of this.m_shipOwners) {
            income += so.getTaxPayed();
        }
        
        this.m_stats.setIncomePrTimeUnitAt(statTime, income);
        //updating invest
        var invest = this.getMap().getNoOfShips() * this.m_scenario.getShipPrice();
        this.m_stats.setInvestPrTimeUnitAt(statTime, invest);
        //this.m_map.setYield(0);
        // updating scores
        this.m_stats.setFinancialScorePrTimeUnitAt(statTime, this.m_goverment.getScore().getFinancialScore());
        this.m_stats.setEnvironmentalScorePrTimeUnitAt(statTime, this.m_goverment.getScore().getEnvironmentalScore());
        this.m_stats.setSocialScorePrTimeUnitAt(statTime, this.m_goverment.getScore().getSocialScore());
        this.m_stats.setOverallScorePrTimeUnitAt(statTime, this.m_goverment.getScore().getOverallScore());

        //updating social
        var offshore = this.getMap().getNoOfShips() * this.m_scenario.getNoOfMenPerShip();
        var onshore = this.getMap().getFuelSites().length * 5 + this.getMap().getLandingSites().length * 10;
        this.m_stats.setEmploymentLandBasedPrTimeUnitAt(statTime, onshore);
        this.m_stats.setEmploymentSeaBasedPrTimeUnitAt(statTime, offshore);


    }
    public getStats(): EndScreenStats {
        return this.m_stats;
    }
    public runMCA(p_noOfMoves: number) {
        //var tax: number[] = [10];
        var tax: number[] = [10, 15, 20, 25];
        //var tax: number[] = [10, 15, 20, 30, 40, 50, 60, 70];
        //var maxShips: number[] = [6];
        //var maxShips: number[] = [6, 10, 14];
        var maxShips: number[] = [6, 10, 14, 18, 22];
        //var maxShips: number[] = [10, 20, 30, 40, 50];
        //var maxShips: number[] = [8, 10, 12, 14, 16, 18, 20, 22, 24];
        //var maxShips: number[] = [16];
        var result: number[][][] = [];
        for (var taxIndex = 0; taxIndex < tax.length; taxIndex++) {
            result[taxIndex] = [];
            for (var maxIndex = 0; maxIndex < maxShips.length; maxIndex++) {
                result[taxIndex][maxIndex] = [];
                this.getGovernment().getRestrictions().setMaxShips(maxShips[maxIndex]);
                this.getGovernment().setTaxingRate(tax[taxIndex]/100);
                for (var m = 0; m < p_noOfMoves; m++) {
                    if (!(this.m_time % this.m_scenario.getStatFreq()))
                        this.updateStats();
                    this.m_time++;
                    this.m_map.run();
                    if (!(this.m_time % this.m_scenario.getRecruitAndAgeFreq())) {

                        this.m_map.ageAndRecruit();
                    }
                    for (var i = 0; i < this.m_shipOwners.length; i++) {
                        this.m_ai.run(this.m_shipOwners[i], this.m_map);
                    }
                }
                var index = Math.floor(this.m_scenario.getDefaultNoDays() / this.m_scenario.getStatFreq()-1);
                var bio = this.m_stats.getBiomassPrTimeUnit();
                var biomass = this.m_stats.getBiomassPrTimeUnitAt(index);
                var recruitment = this.m_stats.getRecruitmentPrTimeUnitAt(index);
                var income = this.m_stats.getIncomePrTimeUnitAt(index);
                var invest = this.m_stats.getInvestprTimeUnitAt(index);
                var onShore = this.m_stats.getEmploymentLandBasedPrTimeUnitAt(index);
                var offShore = this.m_stats.getEmploymentSeaBasedPrTimeUnitAt(index);
                result[taxIndex][maxIndex] = [biomass, recruitment, income, invest, onShore, offShore];
                //console.log("Tax: " + tax[taxIndex]);
                //console.log("Maxships: " + maxShips[maxIndex]);
                //console.log("income: " + JSON.stringify(this.m_stats.getIncomePrTimeUnit()));
                console.log("result: " + result[taxIndex][maxIndex]);
                this.m_stats = new EndScreenStats(this.m_scenario);
                this.m_shipOwners = [];
                var j = 0;
                for (var i = 0; i < this.m_scenario.getNoOfShipOwners(); i++) {
                    var startShipPoint: Point2[] = [new Point2(6, 11), new Point2(7, 12)];

                    do {
                        //startShipPoint = new Point2(Math.round(Math.random() * (this.m_map.getMapHeight() - 1)), Math.round(Math.random() * (this.m_map.getMapWidth() - 1)));
                        //startShipPoint[i] = new Point2(6, 11);
                    } while (!(this.m_map.getTile(startShipPoint[j]) instanceof Ocean))//If this is not an ocean tile, find a new tile
                    this.createShipOwner(startShipPoint[j++]);
                }
                this.m_time = 0;
                this.m_ai = new AI(this.m_scenario);
                this.m_map = new Map(this.getGovernment().getRestrictions(), this.m_scenario);               
            }
        }
        $("#mainDiv").html(this.createJSONForMCA_HTML(result, tax, maxShips));
        console.log("Result: " + result);
        //debugger;
    }
     
    public run(p_noOfMoves?: number) {
        if (p_noOfMoves == undefined) p_noOfMoves = 1;
        
        for (var m = 0; m < p_noOfMoves; m++) {
            if (!(this.m_time % this.m_scenario.getStatFreq())) this.updateStats();
            this.m_time++;
            //console.log("running model");

            this.m_map.run();
            var t = this.m_time % this.m_scenario.getRecruitAndAgeFreq();
            if (!(this.m_time % this.m_scenario.getRecruitAndAgeFreq())) {

                this.m_map.ageAndRecruit();
            }
            for (var i = 0; i < this.m_shipOwners.length; i++) {
                this.m_ai.run(this.m_shipOwners[i], this.m_map);
            }

            this.m_goverment.getScore().updateScore(this.m_map, this.m_goverment, this.m_time);
        }
    }
    
    public getShipOwners(): ShipOwner[] {
        return this.m_shipOwners;
    }

    public getMap(): Map {
        return this.m_map;
    }
    public setMap(p_map: Map) {
        this.m_map = p_map;
    }
    public getTime(): number {
        return this.m_time;
    }
    public getGovernment(): Government {
        return this.m_goverment;
    }
    public createShipOwner(p_startingPoint: Point2, p_balance?: number) {
        this.m_shipOwners.push(new ShipOwner(this.m_goverment, p_startingPoint, "shipOwner" + this.m_shipOwners.length, this.m_scenario, p_balance));
    }

    private createJSONForMCA_HTML(p_res: number[][][], p_tax, p_ship): string {
        var ret: string = "";
        var retObj: any[] = [];
        var biomass: number[] = [];
        var recruitment: number[] = [];
        var income: number[] = [];
        var invest: number[] = [];
        var onShore: number[] = [];
        var offShore: number[] = [];
        var id = 0;
        var MCAObj: any;
        var elements: any[] = [];
        var connections: any[] = [
            {
                "connInput": "elmt6",
                "connOutput": "elmt4",
                "connID": "conn12"
            },
            {
                "connInput": "elmt7",
                "connOutput": "elmt4",
                "connID": "conn13"
            },
            {
                "connInput": "elmt8",
                "connOutput": "elmt1",
                "connID": "conn14"
            },
            {
                "connInput": "elmt9",
                "connOutput": "elmt1",
                "connID": "conn15"
            },
            {
                "connInput": "elmt10",
                "connOutput": "elmt5",
                "connID": "conn16"
            },
            {
                "connInput": "elmt11",
                "connOutput": "elmt5",
                "connID": "conn17"
            },
            {
                "connInput": "elmt1",
                "connOutput": "elmt3",
                "connID": "conn18"
            },
            {
                "connInput": "elmt4",
                "connOutput": "elmt3",
                "connID": "conn19"
            },
            {
                "connInput": "elmt5",
                "connOutput": "elmt3",
                "connID": "conn20"
            }
        ];
        for (var taxIndex = 0; taxIndex < p_res.length; taxIndex++) {

            for (var maxIndex = 0; maxIndex < p_res[taxIndex].length; maxIndex++) {
                
                //retObj[id] = {
                elements[id+10]={
                    "posX": (1000 + taxIndex * 160),
                    "posY": (300 + maxIndex*50),
                    "elmtID": "elmt" + (id + 1000),
                    "elmtName": "SC " + p_ship[maxIndex] + ", " + p_tax[taxIndex] + "% ",
                    "elmtDesc": "write description here",
                    "elmtType": 102,
                    "elmtWghtMthd": 0,
                    "elmtDstType": 1,
                    "elmtDataArr": [],
                    "pwlFlipVertical": false,
                    "pwlFlipHorizontal": false,
                    "elmtData": []
                }
                //ret += JSON.stringify(retObj[id]) + ",<br/><br/>" 

                biomass[id] = p_res[taxIndex][maxIndex][0];
                recruitment[id] = p_res[taxIndex][maxIndex][1];
                income[id] = p_res[taxIndex][maxIndex][2];
                invest[id] = p_res[taxIndex][maxIndex][3];
                onShore[id] = p_res[taxIndex][maxIndex][4];
                offShore[id] = p_res[taxIndex][maxIndex][5];
                id++;
            }
        }
        var biomassObj: any = {
            "posX": 814.0899812385121,
            "posY": 391.9172932330827,
            "elmtValueFnX": 50,
            "elmtValueFnY": 50,
            "elmtValueFnFlip": 0,
            "elmtID": "elmt8",
            "elmtName": "Biomass",
            "elmtDesc": "write description here",
            "elmtType": 100,
            "elmtWghtMthd": 2,
            "elmtDstType": 1,
            "elmtDataMin": 0,
            "elmtDataMax": Math.round(Math.max(...biomass)*1.5/1000)*1000,
            "elmtDataUnit": "Tons",
            "elmtDataBaseLine": this.getBaseLine(biomass),
            "elmtDataArr": biomass,
            "pwl": {
                "points": [
                    {
                        "x": 0,
                        "y": 0
                    },
                    {
                        "x": 100,
                        "y": 1
                    }
                ]
            },
            "pwlFlipVertical": false,
            "pwlFlipHorizontal": false,
            "elmtData": []
        };
        var recruitmentObj: any = {
            "posX": 812.1378491442404,
            "posY": 434.5238095238096,
            "elmtValueFnX": 50,
            "elmtValueFnY": 50,
            "elmtValueFnFlip": 0,
            "elmtID": "elmt9",
            "elmtName": "Recruitment",
            "elmtDesc": "write description here",
            "elmtType": 100,
            "elmtWghtMthd": 2,
            "elmtDstType": 1,
            //"elmtDataMin": Math.min(...recruitment)-10000,
            "elmtDataMin": 0,
            //"elmtDataMax": Math.max(...recruitment) + 10000,
            "elmtDataMax": Math.round(Math.max(...recruitment) * 1.5 / 1000) * 1000,
            "elmtDataUnit": "Tons",
            "elmtDataBaseLine": this.getBaseLine(recruitment),
            "elmtDataArr": recruitment,
            "pwl": {
                "points": [
                    {
                        "x": 0,
                        "y": 0
                    },
                    {
                        "x": 100,
                        "y": 1
                    }
                ]
            },
            "pwlFlipVertical": false,
            "pwlFlipHorizontal": false,
            "elmtData": []
        };
        var incomeObj: any = {
            "posX": 804.3293207671534,
            "posY": 236.52882205513788,
            "elmtValueFnX": 50,
            "elmtValueFnY": 50,
            "elmtValueFnFlip": 0,
            "elmtID": "elmt6",
            "elmtName": "Income",
            "elmtDesc": "write description here",
            "elmtType": 100,
            "elmtWghtMthd": 2,
            "elmtDstType": 1,
           // "elmtDataMin": Math.min(...income)-10000,
            "elmtDataMin": 0,
            //"elmtDataMax": Math.max(...income)+10000,
            "elmtDataMax": Math.round(Math.max(...income) * 1.5 / 1000) * 1000,
            "elmtDataUnit": "Euros",
            "elmtDataBaseLine": this.getBaseLine(income),
            "elmtDataArr": income,
            "pwl": {
                "points": [
                    {
                        "x": 0,
                        "y": 0
                    },
                    {
                        "x": 100,
                        "y": 1
                    }
                ]
            },
            "pwlFlipVertical": false,
            "pwlFlipHorizontal": false,
            "elmtData": []
        };
        var investObj: any = {
            "posX": 802.3771886728821,
            "posY": 274.1228070175439,
            "elmtValueFnX": 50,
            "elmtValueFnY": 50,
            "elmtValueFnFlip": 0,
            "elmtID": "elmt7",
            "elmtName": "Investment",
            "elmtDesc": "write description here",
            "elmtType": 100,
            "elmtWghtMthd": 2,
            "elmtDstType": 1,
            "elmtDataMin": 0,
            "elmtDataMax": Math.round(Math.max(...invest) * 1.5 / 1000) * 1000,
            "elmtDataUnit": "Euros",
            "elmtDataBaseLine": this.getBaseLine(invest),
            "elmtDataArr": invest,
            "pwl": {
                "points": [
                    {
                        "x": 0,
                        "y": 0
                    },
                    {
                        "x": 100,
                        "y": 1
                    }
                ]
            },
            "pwlFlipVertical": false,
            "pwlFlipHorizontal": false,
            "elmtData": []
        };
        var onShoreObj: any = {
            "posX": 814.0899812385121,
            "posY": 596.1779448621553,
            "elmtValueFnX": 50,
            "elmtValueFnY": 50,
            "elmtValueFnFlip": 0,
            "elmtID": "elmt11",
            "elmtName": "Onshore",
            "elmtDesc": "write description here",
            "elmtType": 100,
            "elmtWghtMthd": 2,
            "elmtDstType": 1,
            "elmtDataMin": 0,
            "elmtDataMax": Math.max(...onShore) + 100,
            "elmtDataUnit": "People",
            "elmtDataBaseLine": this.getBaseLine(onShore),
            "elmtDataArr": onShore,
            "pwl": {
                "points": [
                    {
                        "x": 0,
                        "y": 0
                    },
                    {
                        "x": 100,
                        "y": 1
                    }
                ]
            },
            "pwlFlipVertical": false,
            "pwlFlipHorizontal": false,
            "elmtData": []
        };
        var offShoreObj: any = {
            "posX": 812.1378491442406,
            "posY": 554.8245614035086,
            "elmtValueFnX": 50,
            "elmtValueFnY": 50,
            "elmtValueFnFlip": 0,
            "elmtID": "elmt10",
            "elmtName": "Offshore",
            "elmtDesc": "write description here",
            "elmtType": 100,
            "elmtWghtMthd": 2,
            "elmtDstType": 1,
            "elmtDataMin": 0,
            "elmtDataMax": Math.max(...offShore)+100,
            "elmtDataUnit": "People",
            "elmtDataBaseLine": this.getBaseLine(offShore),
            "elmtDataArr": offShore,
            "pwl": {
                "points": [
                    {
                        "x": 0,
                        "y": 0
                    },
                    {
                        "x": 100,
                        "y": 1
                    }
                ]
            },
            "pwlFlipVertical": false,
            "pwlFlipHorizontal": false,
            "elmtData": []
        };
        var goalObj: any = {
            "posX": 208.92903201428032,
            "posY": 408.2080200501255,
            "elmtID": "elmt3",
            "elmtName": "Goal",
            "elmtDesc": "write description here",
            "elmtType": 103,
            "elmtWghtMthd": 1,
            "elmtDstType": 1,
            "elmtDataArr": [],
            "pwlFlipVertical": false,
            "pwlFlipHorizontal": false,
            "elmtData": [
                ["conn18", this.m_scenario.getSubEnvironmentalWeight()],
                ["conn19", this.m_scenario.getSubFinancialWeight()],
                ["conn20", this.m_scenario.getSubSocialWeight()]
            ]
        };
        var environmentalObj: any = {
                "posX": 477.2345016653122,
                "posY": 415.7268170426068,
                "elmtID": "elmt1",
                "elmtName": "Environmental",
                "elmtDesc": "write description here",
                "elmtType": 101,
                "elmtWghtMthd": 1,
                "elmtDstType": 1,
                "elmtDataArr": [],
                "pwlFlipVertical": false,
                "pwlFlipHorizontal": false,
                "elmtData": [
                    ["conn14", this.m_scenario.getIndicatorBiomassWeight()],
                    ["conn15", this.m_scenario.getIndicatorRecruitmentWeight()]
                ]
            };
        var financialObj: any = {
                "posX": 462.706204269603,
                "posY": 294.1729323308272,
                "elmtID": "elmt4",
                "elmtName": "Financial",
                "elmtDesc": "write description here",
                "elmtType": 101,
                "elmtWghtMthd": 1,
                "elmtDstType": 1,
                "elmtDataArr": [],
                "pwlFlipVertical": false,
                "pwlFlipHorizontal": false,
                "elmtData": [
                    ["conn12", this.m_scenario.getIndicatorIncomeWeight()],
                    ["conn13", this.m_scenario.getIndicatorInvestmentWeight()]
                ]
            };
        var socialObj: any = {
                "posX": 476.3711289295051,
                "posY": 534.7744360902257,
                "elmtID": "elmt5",
                "elmtName": "Social",
                "elmtDesc": "write description here",
                "elmtType": 101,
                "elmtWghtMthd": 1,
                "elmtDstType": 1,
                "elmtDataArr": [],
                "pwlFlipVertical": false,
                "pwlFlipHorizontal": false,
                "elmtData": [
                    ["conn16", this.m_scenario.getIndicatorOffshoreEmployment()],
                    ["conn17", this.m_scenario.getIndicatorOnshoreEmployment()]
                ]
            };


        elements[4] = biomassObj;
        elements[5] = recruitmentObj;
        elements[6] = incomeObj;
        elements[7] = investObj;
        elements[8] = onShoreObj;
        elements[9] = offShoreObj;
        elements[0] = goalObj;
        elements[1] = environmentalObj;
        elements[2] = financialObj;
        elements[3] = socialObj;

        MCAObj = {
            "elements": elements,
            "connections": connections,
            "mdlName": "title",
            "mainObj": "elmt3",
            "dataMat": [],
            "mdlIdent": "temp"
        }
        return JSON.stringify(MCAObj);
    }
    getBaseLine(p_arr: number[]): number {
        var l:number = p_arr.length;
        var sum:number=0
        for (var i = 0; i < l; i++) {
            sum += p_arr[i];
        }
        return Math.round(sum / l);
    }
    
    
}