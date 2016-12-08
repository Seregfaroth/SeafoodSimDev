/// <reference path = "Map.ts"/>
/// <reference path = "Government.ts"/>
/// <reference path = "ShipOwner.ts"/>
/// <reference path = "Restrictions.ts"/>
/// <reference path = "EndScreenStats.ts"/>
var Model = (function () {
    function Model() {
        this.m_shipOwners = [];
        this.m_time = 0;
        console.log("constructing model");
        this.m_scenario = Scenario.getInstance();
        var restrictions = new Restrictions();
        this.m_stats = new EndScreenStats();
        this.m_map = new Map(restrictions);
        //this.m_stats = new EndScreenStats(this.m_map);
        this.m_goverment = new Government(restrictions);
        this.m_ai = new AI();
        var j = 0;
        for (var i = 0; i < this.m_scenario.getNoOfShipOwners(); i++) {
            //var startShipPoint: Point2[] = [new Point2(6, 11), new Point2(7, 12)];
            var startShipPoint = [new Point2(1, 1), new Point2(1, 1)];
            do {
            } while (!(this.m_map.getTile(startShipPoint[j]) instanceof Ocean)); //If this is not an ocean tile, find a new tile
            this.createShipOwner(startShipPoint[j++]);
        }
        this.updateStats();
    }
    Model.prototype.getScenario = function () {
        return this.m_scenario;
    };
    Model.prototype.updateStats = function () {
        //console.log("upStats, time: " + this.m_time);
        var biomassCod = 0;
        var biomassMac = 0;
        var biomassOther = 0;
        var recruitCod = 0;
        var recruitMac = 0;
        var recruitOther = 0;
        var natDeath = this.m_map.m_natDeath;
        // updating time
        var statTime = this.getTime() / this.m_scenario.getStatFreq();
        this.m_stats.setTimeAt(statTime, this.getTime());
        //updating biomass and recruitment
        for (var _i = 0, _a = this.getMap().getSchools(); _i < _a.length; _i++) {
            var sc = _a[_i];
            if (sc instanceof Cod) {
                biomassCod += sc.getBiomass();
                recruitCod += sc.getRecruitTotal();
                sc.resetRecruitTotal();
            }
            else if (sc instanceof Mackerel) {
                biomassMac += sc.getBiomass();
                recruitMac += sc.getRecruitTotal();
                sc.resetRecruitTotal();
            }
            else {
                biomassOther += sc.getBiomass();
                recruitOther += sc.getRecruitTotal();
            }
            natDeath += sc.getNatDeathTotal();
        }
        this.m_stats.setBiomassCodPrTimeUnitAt(statTime, biomassCod);
        this.m_stats.setBiomassMacPrTimeUnitAt(statTime, biomassMac);
        this.m_stats.setBiomassOtherPrTimeUnitAt(statTime, biomassOther);
        this.m_stats.setRecruitmentCodPrTimeUnitAt(statTime, recruitCod);
        this.m_stats.setRecruitmentMacPrTimeUnitAt(statTime, recruitMac);
        this.m_stats.setRecruitmentOtherPrTimeUnitAt(statTime, recruitOther);
        this.m_stats.setNatDeathPrTimeUnitAt(statTime, natDeath);
        //var t = this.m_map.getYield();
        //this.m_stats.setYieldPrTimeUnitAt(statTime, this.m_map.getYield());
        //updating economic indicators
        //updating revenue
        var revenueCod = 0;
        var revenueMac = 0;
        var revenueOther = 0;
        for (var _b = 0, _c = this.m_shipOwners; _b < _c.length; _b++) {
            var so = _c[_b];
            revenueCod += so.m_revenueCod;
            revenueMac += so.m_revenueMac;
            revenueOther += so.m_revenueOther;
        }
        this.m_stats.setIncomeCodPrTimeUnitAt(statTime, revenueCod);
        this.m_stats.setIncomeMackerelPrTimeUnitAt(statTime, revenueMac);
        this.m_stats.setIncomeOtherPrTimeUnitAt(statTime, revenueOther);
        //updating invest
        //var invest = this.getMap().getNoOfShips() * this.m_scenario.getShipPrice();
        //this.m_stats.setInvestPrTimeUnitAt(statTime, invest);
        //this.m_map.setYield(0);
        // updating scores
        this.m_stats.setFinancialScorePrTimeUnitAt(statTime, this.m_goverment.getScore().getFinancialScore());
        this.m_stats.setEnvironmentalScorePrTimeUnitAt(statTime, this.m_goverment.getScore().getEnvironmentalScore());
        this.m_stats.setSocialScorePrTimeUnitAt(statTime, this.m_goverment.getScore().getSocialScore());
        this.m_stats.setOverallScorePrTimeUnitAt(statTime, this.m_goverment.getScore().getOverallScore());
        //updating social
        var offshoreCod = this.getMap().getNoOfShips("cod") * this.m_scenario.getNoOfEmployeesPerShip();
        var onshoreCod = this.getMap().getNoOfShips("cod") * this.m_scenario.getNoOfEmployeesOnLandPerShip();
        var offshoreMackerel = this.getMap().getNoOfShips("mackerel") * this.m_scenario.getNoOfEmployeesPerShip();
        var onShoreMackerel = this.getMap().getNoOfShips("mackerel") * this.m_scenario.getNoOfEmployeesOnLandPerShip();
        var offShoreOther = this.getMap().getNoOfShips("other") * this.m_scenario.getNoOfEmployeesPerShip();
        var onShoreOther = this.getMap().getNoOfShips("other") * this.m_scenario.getNoOfEmployeesOnLandPerShip();
        //var onshore = this.getMap().getFuelSites().length * 5 + this.getMap().getLandingSites().length * 10;
        this.m_stats.setEmploymentLandBasedCodPrTimeUnitAt(statTime, onshoreCod);
        this.m_stats.setEmploymentSeaBasedCodPrTimeUnitAt(statTime, offshoreCod);
        this.m_stats.setEmploymentLandBasedMackerelPrTimeUnitAt(statTime, onShoreMackerel);
        this.m_stats.setEmploymentSeaBasedMackerelPrTimeUnitAt(statTime, offshoreMackerel);
        this.m_stats.setEmploymentLandBasedOtherPrTimeUnitAt(statTime, onShoreOther);
        this.m_stats.setEmploymentSeaBasedOtherPrTimeUnitAt(statTime, offShoreOther);
    };
    Model.prototype.getStats = function () {
        return this.m_stats;
    };
    Model.prototype.runMCA = function (p_noOfMoves) {
        var restrictedArea = [false, true];
        var pelargicVessels = [25];
        var demersalVessels = [20];
        var tacCod = [10000, 15000, 20000];
        var tacMac = [10000, 15000, 20000];
        var result = [];
        for (var resArea = 0; resArea < restrictedArea.length; resArea++) {
            result[resArea] = [];
            for (var maxCodIndex = 0; maxCodIndex < pelargicVessels.length; maxCodIndex++) {
                result[resArea][maxCodIndex] = [];
                for (var maxMacIndex = 0; maxMacIndex < demersalVessels.length; maxMacIndex++) {
                    result[resArea][maxCodIndex][maxMacIndex] = [];
                    for (var tacCodIndex = 0; tacCodIndex < tacCod.length; tacCodIndex++) {
                        result[resArea][maxCodIndex][maxMacIndex][tacCodIndex] = [];
                        for (var tacMacIndex = 0; tacMacIndex < tacMac.length; tacMacIndex++) {
                            result[resArea][maxCodIndex][maxMacIndex][tacCodIndex][tacMacIndex] = [];
                            //this.getGovernment().getRestrictions().setNoShips(maxShips[maxIndex]);
                            //this.getGovernment().setTaxingRate(tax[taxIndex] / 100);
                            if (resArea) {
                                for (var _i = 0, _a = this.getMap().getSchools(); _i < _a.length; _i++) {
                                    var s = _a[_i];
                                    this.getGovernment().getRestrictions().restrictArea(this.getMap().getTile(s.getOrigin()));
                                }
                            }
                            else {
                                for (var _b = 0, _c = this.getMap().getSchools(); _b < _c.length; _b++) {
                                    var s = _c[_b];
                                    this.getGovernment().getRestrictions().unRestrictArea(this.getMap().getTile(s.getOrigin()));
                                }
                            }
                            this.getGovernment().getRestrictions().setNoCodShips(pelargicVessels[maxCodIndex]);
                            this.getGovernment().getRestrictions().setNoMackerelShips(demersalVessels[maxMacIndex]);
                            this.getGovernment().getRestrictions().setTacCod(tacCod[tacCodIndex]);
                            this.getGovernment().getRestrictions().setTacMackerel(tacMac[tacMacIndex]);
                            this.updateNoShips();
                            for (var m = 0; m < p_noOfMoves; m++) {
                                if (!(this.m_time % this.m_scenario.getStatFreq()))
                                    this.m_goverment.getScore().updateScore(this, this.m_map, this.m_goverment, this.m_time);
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
                            var index = Math.floor(this.m_scenario.getDefaultNoDays() / this.m_scenario.getStatFreq() - 1);
                            var revenueCod = Math.round(this.m_stats.getIncomeCodPrTimeUnitAt(index));
                            var revenueMac = Math.round(this.m_stats.getIncomeMackerelPrTimeUnitAt(index));
                            var recruitCod = Math.round(this.m_stats.getRecruitmentCodPrTimeUnitAt(index));
                            var recruitMac = Math.round(this.m_stats.getRecruitmentMacPrTimeUnitAt(index));
                            var biomassCod = Math.round(this.m_stats.getBiomassCodPrTimeUnitAt(index));
                            var biomassMac = Math.round(this.m_stats.getBiomassMacPrTimeUnitAt(index));
                            var offshoreCod = Math.round(this.m_stats.getEmploymentSeaBasedCodPrTimeUnitAt(index));
                            var offshoreMac = Math.round(this.m_stats.getEmploymentSeaBasedMackerelPrTimeUnitAt(index));
                            var onshoreCod = Math.round(this.m_stats.getEmploymentLandBasedCodPrTimeUnitAt(index));
                            var onshoreMac = Math.round(this.m_stats.getEmploymentLandBasedMackerelPrTimeUnitAt(index));
                            result[resArea][maxCodIndex][maxMacIndex][tacCodIndex][tacMacIndex] =
                                [revenueCod, revenueMac, recruitCod, recruitMac, biomassCod, biomassMac, offshoreCod, offshoreMac, onshoreCod, onshoreMac];
                            //console.log("Tax: " + tax[taxIndex]);
                            //console.log("Maxships: " + maxShips[maxIndex]);
                            //console.log("income: " + JSON.stringify(this.m_stats.getIncomePrTimeUnit()));
                            console.log("res: " + resArea + " cs: " + pelargicVessels[maxCodIndex] + " ms: " + demersalVessels[maxMacIndex] + " ct: " + tacCod[tacCodIndex] + "mt:" + tacMac[tacMacIndex]);
                            console.log("result: " + result[resArea][maxCodIndex][maxMacIndex][tacCodIndex][tacMacIndex]);
                            console.log("FinScore: " + this.m_stats.getFinancialScorePrTimeUnitAt(index));
                            console.log("EnvScore: " + this.m_stats.getEnvironmentalScorePrTimeUnitAt(index));
                            console.log("SocScore: " + this.m_stats.getSocialScorePrTimeUnitAt(index));
                            this.m_stats = new EndScreenStats();
                            this.m_shipOwners = [];
                            var j = 0;
                            for (var i = 0; i < this.m_scenario.getNoOfShipOwners(); i++) {
                                var startShipPoint = [new Point2(1, 1), new Point2(4, 4)];
                                do {
                                } while (!(this.m_map.getTile(startShipPoint[j]) instanceof Ocean)); //If this is not an ocean tile, find a new tile
                                this.createShipOwner(startShipPoint[j++]);
                            }
                            this.m_time = 0;
                            this.m_ai = new AI();
                            this.m_map = new Map(this.getGovernment().getRestrictions());
                        }
                    }
                }
            }
        }
        $("#mainDiv").html(this.createJSONForMCA_HTML(result, restrictedArea, pelargicVessels, demersalVessels, tacCod, tacCod));
        console.log("Result: " + result);
        //console.log("Score: " + this.m_stats.getFinancialScorePrTimeUnitAt
        //debugger;
    };
    Model.prototype.run = function (p_noOfMoves) {
        if (p_noOfMoves == undefined)
            p_noOfMoves = 1;
        for (var m = 0; m < p_noOfMoves; m++) {
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
            this.m_goverment.getScore().updateScore(this, this.m_map, this.m_goverment, this.m_time);
            if (!(this.m_time % this.m_scenario.getStatFreq()))
                this.updateStats();
        }
    };
    Model.prototype.getShipOwners = function () {
        return this.m_shipOwners;
    };
    Model.prototype.getMap = function () {
        return this.m_map;
    };
    Model.prototype.setMap = function (p_map) {
        this.m_map = p_map;
    };
    Model.prototype.getTime = function () {
        return this.m_time;
    };
    Model.prototype.getGovernment = function () {
        return this.m_goverment;
    };
    Model.prototype.createShipOwner = function (p_startingPoint, p_balance) {
        this.m_shipOwners.push(new ShipOwner(this.m_goverment, p_startingPoint, "shipOwner" + this.m_shipOwners.length, p_balance));
    };
    Model.prototype.createJSONForMCA_HTML = function (p_res, p_resArea, p_codship, p_macship, p_codtac, p_mactac) {
        var ret = "";
        var retObj = [];
        var revenueCod = [];
        var revenueMac = [];
        var recruitCod = [];
        var recruitMac = [];
        var biomassCod = [];
        var biomassMac = [];
        var offShoreCod = [];
        var offShoreMac = [];
        var onShoreCod = [];
        var onShoreMac = [];
        var id = 0;
        var MCAObj;
        var elements = [];
        var connections = [
            {
                "connInput": "elmt2",
                "connOutput": "elmt0",
                "connID": "conn0"
            },
            {
                "connInput": "elmt1",
                "connOutput": "elmt0",
                "connID": "conn1"
            },
            {
                "connInput": "elmt3",
                "connOutput": "elmt0",
                "connID": "conn2"
            },
            {
                "connInput": "elmt14",
                "connOutput": "elmt2",
                "connID": "conn4"
            },
            {
                "connInput": "elmt15",
                "connOutput": "elmt1",
                "connID": "conn5"
            },
            {
                "connInput": "elmt16",
                "connOutput": "elmt1",
                "connID": "conn6"
            },
            {
                "connInput": "elmt17",
                "connOutput": "elmt3",
                "connID": "conn7"
            },
            {
                "connInput": "elmt18",
                "connOutput": "elmt3",
                "connID": "conn8"
            },
            {
                "connInput": "elmt4",
                "connOutput": "elmt14",
                "connID": "conn9"
            },
            {
                "connInput": "elmt5",
                "connOutput": "elmt14",
                "connID": "conn10"
            },
            {
                "connInput": "elmt8",
                "connOutput": "elmt16",
                "connID": "conn11"
            }, {
                "connInput": "elmt9",
                "connOutput": "elmt16",
                "connID": "conn12"
            },
            {
                "connInput": "elmt6",
                "connOutput": "elmt15",
                "connID": "conn13"
            },
            {
                "connInput": "elmt7",
                "connOutput": "elmt15",
                "connID": "conn14"
            },
            {
                "connInput": "elmt12",
                "connOutput": "elmt18",
                "connID": "conn15"
            },
            {
                "connInput": "elmt13",
                "connOutput": "elmt18",
                "connID": "conn16"
            },
            {
                "connInput": "elmt10",
                "connOutput": "elmt17",
                "connID": "conn17"
            },
            {
                "connInput": "elmt11",
                "connOutput": "elmt17",
                "connID": "conn18"
            }
        ];
        for (var resArea = 0; resArea < p_resArea.length; resArea++) {
            for (var maxCodIndex = 0; maxCodIndex < p_codship.length; maxCodIndex++) {
                for (var maxMacIndex = 0; maxMacIndex < p_macship.length; maxMacIndex++) {
                    for (var tacCodIndex = 0; tacCodIndex < p_codtac.length; tacCodIndex++) {
                        for (var tacMacIndex = 0; tacMacIndex < p_mactac.length; tacMacIndex++) {
                            //retObj[id] = {
                            elements[id + 19] = {
                                //"posX": (600 + maxCodIndex * 160 + maxMacIndex * 160),
                                //"posY": ( 100 * tacCodIndex + 100 * tacMacIndex),
                                "posX": 1000 + 200 * resArea,
                                "posY": 100 + (40 * id) * resArea,
                                "elmtID": "elmt" + (id + 1000),
                                "elmtName": "SC " + id /*+ p_ship[maxIndex] + ", " + p_tax[taxIndex] + "% "*/,
                                "elmtDesc": "restricted Area: " + p_resArea[resArea] + "\n Cod vessels: " + p_codship[maxCodIndex] + "\n Mac vessels: " + p_macship[maxMacIndex] + "\n Tac cod: " + p_codtac[tacCodIndex] + "\n Tac mac: " + p_mactac[tacMacIndex],
                                "elmtType": 102,
                                "elmtWghtMthd": 0,
                                "elmtDstType": 1,
                                "elmtDataArr": [],
                                "pwlFlipVertical": false,
                                "pwlFlipHorizontal": false,
                                "elmtData": []
                            };
                            //ret += JSON.stringify(retObj[id]) + ",<br/><br/>" 
                            var t = p_res[resArea][maxCodIndex][maxMacIndex][tacCodIndex][tacMacIndex];
                            var t2 = p_res[resArea][maxCodIndex][maxMacIndex][tacCodIndex];
                            revenueCod[id] = p_res[resArea][maxCodIndex][maxMacIndex][tacCodIndex][tacMacIndex][0];
                            revenueMac[id] = p_res[resArea][maxCodIndex][maxMacIndex][tacCodIndex][tacMacIndex][1];
                            recruitCod[id] = p_res[resArea][maxCodIndex][maxMacIndex][tacCodIndex][tacMacIndex][2];
                            recruitMac[id] = p_res[resArea][maxCodIndex][maxMacIndex][tacCodIndex][tacMacIndex][3];
                            biomassCod[id] = p_res[resArea][maxCodIndex][maxMacIndex][tacCodIndex][tacMacIndex][4];
                            biomassMac[id] = p_res[resArea][maxCodIndex][maxMacIndex][tacCodIndex][tacMacIndex][5];
                            offShoreCod[id] = p_res[resArea][maxCodIndex][maxMacIndex][tacCodIndex][tacMacIndex][6];
                            offShoreMac[id] = p_res[resArea][maxCodIndex][maxMacIndex][tacCodIndex][tacMacIndex][7];
                            onShoreCod[id] = p_res[resArea][maxCodIndex][maxMacIndex][tacCodIndex][tacMacIndex][8];
                            onShoreMac[id] = p_res[resArea][maxCodIndex][maxMacIndex][tacCodIndex][tacMacIndex][9];
                            id++;
                        }
                    }
                }
            }
        }
        var ttt = Math.round(Math.max.apply(Math, revenueCod) * 1.5 / 1000) * 1000;
        var revenueCodObj = {
            "posX": 814.0899812385121,
            "posY": 200,
            "elmtValueFnX": 50,
            "elmtValueFnY": 50,
            "elmtValueFnFlip": 0,
            "elmtID": "elmt4",
            "elmtName": "revenueCod",
            "elmtDesc": "write description here",
            "elmtType": 100,
            "elmtWghtMthd": 2,
            "elmtDstType": 1,
            "elmtDataMin": 0,
            "elmtDataMax": Math.round(Math.max.apply(Math, revenueCod) * 1.5 / 1000) * 1000,
            "elmtDataUnit": "Tons",
            "elmtDataBaseLine": this.getBaseLine(revenueCod),
            "elmtDataArr": revenueCod,
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
        }; //elmt4
        var revenueMacObj = {
            "posX": 812.1378491442404,
            "posY": 240,
            "elmtValueFnX": 50,
            "elmtValueFnY": 50,
            "elmtValueFnFlip": 0,
            "elmtID": "elmt5",
            "elmtName": "revenueMac",
            "elmtDesc": "write description here",
            "elmtType": 100,
            "elmtWghtMthd": 2,
            "elmtDstType": 1,
            //"elmtDataMin": Math.min(...recruitment)-10000,
            "elmtDataMin": 0,
            //"elmtDataMax": Math.max(...recruitment) + 10000,
            "elmtDataMax": Math.round(Math.max.apply(Math, revenueMac) * 1.5 / 1000) * 1000,
            "elmtDataUnit": "Euro",
            "elmtDataBaseLine": this.getBaseLine(revenueMac),
            "elmtDataArr": revenueMac,
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
        }; //elmt5
        var recruitCodObj = {
            "posX": 804.3293207671534,
            "posY": 300,
            "elmtValueFnX": 50,
            "elmtValueFnY": 50,
            "elmtValueFnFlip": 0,
            "elmtID": "elmt6",
            "elmtName": "recruitCod",
            "elmtDesc": "write description here",
            "elmtType": 100,
            "elmtWghtMthd": 2,
            "elmtDstType": 1,
            // "elmtDataMin": Math.min(...income)-10000,
            "elmtDataMin": 200000,
            //"elmtDataMax": Math.max(...income)+10000,
            "elmtDataMax": Math.round(Math.max.apply(Math, recruitCod) * 1.5 / 1000) * 1000,
            "elmtDataUnit": "Tons",
            "elmtDataBaseLine": this.getBaseLine(recruitCod),
            "elmtDataArr": recruitCod,
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
        var recruitMacObj = {
            "posX": 802.3771886728821,
            "posY": 340,
            "elmtValueFnX": 50,
            "elmtValueFnY": 50,
            "elmtValueFnFlip": 0,
            "elmtID": "elmt7",
            "elmtName": "recruitMac",
            "elmtDesc": "write description here",
            "elmtType": 100,
            "elmtWghtMthd": 2,
            "elmtDstType": 1,
            "elmtDataMin": 500000,
            "elmtDataMax": Math.round(Math.max.apply(Math, recruitMac) * 1.5 / 1000) * 1000,
            "elmtDataUnit": "Tons",
            "elmtDataBaseLine": this.getBaseLine(recruitMac),
            "elmtDataArr": recruitMac,
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
        var biomassCodObj = {
            "posX": 814.0899812385121,
            "posY": 400,
            "elmtValueFnX": 50,
            "elmtValueFnY": 50,
            "elmtValueFnFlip": 0,
            "elmtID": "elmt8",
            "elmtName": "biomassCod",
            "elmtDesc": "write description here",
            "elmtType": 100,
            "elmtWghtMthd": 2,
            "elmtDstType": 1,
            "elmtDataMin": 0,
            "elmtDataMax": Math.max.apply(Math, biomassCod) + 100,
            "elmtDataUnit": "Tons",
            "elmtDataBaseLine": this.getBaseLine(biomassCod),
            "elmtDataArr": biomassCod,
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
        var biomassMacObj = {
            "posX": 812.1378491442406,
            "posY": 440,
            "elmtValueFnX": 50,
            "elmtValueFnY": 50,
            "elmtValueFnFlip": 0,
            "elmtID": "elmt9",
            "elmtName": "biomassMac",
            "elmtDesc": "write description here",
            "elmtType": 100,
            "elmtWghtMthd": 2,
            "elmtDstType": 1,
            "elmtDataMin": 0,
            "elmtDataMax": Math.max.apply(Math, biomassMac) + 100,
            "elmtDataUnit": "Tons",
            "elmtDataBaseLine": this.getBaseLine(biomassMac),
            "elmtDataArr": biomassMac,
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
        var offShoreCodObj = {
            "posX": 812.1378491442406,
            "posY": 500,
            "elmtValueFnX": 50,
            "elmtValueFnY": 50,
            "elmtValueFnFlip": 0,
            "elmtID": "elmt10",
            "elmtName": "offShoreCod",
            "elmtDesc": "write description here",
            "elmtType": 100,
            "elmtWghtMthd": 2,
            "elmtDstType": 1,
            "elmtDataMin": 0,
            "elmtDataMax": Math.max.apply(Math, offShoreCod) + 100,
            "elmtDataUnit": "Tons",
            "elmtDataBaseLine": this.getBaseLine(offShoreCod),
            "elmtDataArr": offShoreCod,
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
        var offShoreMacObj = {
            "posX": 812.1378491442406,
            "posY": 540,
            "elmtValueFnX": 50,
            "elmtValueFnY": 50,
            "elmtValueFnFlip": 0,
            "elmtID": "elmt11",
            "elmtName": "offShoreMac",
            "elmtDesc": "write description here",
            "elmtType": 100,
            "elmtWghtMthd": 2,
            "elmtDstType": 1,
            "elmtDataMin": 0,
            "elmtDataMax": Math.max.apply(Math, offShoreMac) + 100,
            "elmtDataUnit": "People",
            "elmtDataBaseLine": this.getBaseLine(offShoreMac),
            "elmtDataArr": offShoreMac,
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
        var onShoreCodObj = {
            "posX": 812.1378491442406,
            "posY": 600,
            "elmtValueFnX": 50,
            "elmtValueFnY": 50,
            "elmtValueFnFlip": 0,
            "elmtID": "elmt12",
            "elmtName": "onShoreCod",
            "elmtDesc": "write description here",
            "elmtType": 100,
            "elmtWghtMthd": 2,
            "elmtDstType": 1,
            "elmtDataMin": 0,
            "elmtDataMax": Math.max.apply(Math, onShoreCod) + 100,
            "elmtDataUnit": "People",
            "elmtDataBaseLine": this.getBaseLine(onShoreCod),
            "elmtDataArr": onShoreCod,
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
        var onShoreMacObj = {
            "posX": 812.1378491442406,
            "posY": 640,
            "elmtValueFnX": 50,
            "elmtValueFnY": 50,
            "elmtValueFnFlip": 0,
            "elmtID": "elmt13",
            "elmtName": "onShoreMac",
            "elmtDesc": "write description here",
            "elmtType": 100,
            "elmtWghtMthd": 2,
            "elmtDstType": 1,
            "elmtDataMin": 0,
            "elmtDataMax": Math.max.apply(Math, onShoreMac) + 100,
            "elmtDataUnit": "People",
            "elmtDataBaseLine": this.getBaseLine(onShoreMac),
            "elmtDataArr": onShoreMac,
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
        var goalObj = {
            "posX": 200,
            "posY": 400,
            "elmtID": "elmt0",
            "elmtName": "Goal",
            "elmtDesc": "write description here",
            "elmtType": 103,
            "elmtWghtMthd": 1,
            "elmtDstType": 1,
            "elmtDataArr": [],
            "pwlFlipVertical": false,
            "pwlFlipHorizontal": false,
            "elmtData": [
                ["conn0", 50],
                ["conn1", 50],
                ["conn2", 50]
            ]
        }; //elmt0
        var environmentalObj = {
            "posX": 400,
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
                ["conn5", 50],
                ["conn6", 50]
            ]
        };
        var financialObj = {
            "posX": 400,
            "posY": 294.1729323308272,
            "elmtID": "elmt2",
            "elmtName": "Economic",
            "elmtDesc": "write description here",
            "elmtType": 101,
            "elmtWghtMthd": 1,
            "elmtDstType": 1,
            "elmtDataArr": [],
            "pwlFlipVertical": false,
            "pwlFlipHorizontal": false,
            "elmtData": [
                ["conn4", 50],
            ]
        }; //elmt2
        var socialObj = {
            "posX": 400,
            "posY": 534.7744360902257,
            "elmtID": "elmt3",
            "elmtName": "Social",
            "elmtDesc": "write description here",
            "elmtType": 101,
            "elmtWghtMthd": 1,
            "elmtDstType": 1,
            "elmtDataArr": [],
            "pwlFlipVertical": false,
            "pwlFlipHorizontal": false,
            "elmtData": [
                ["conn7", 50],
                ["conn8", 50]
            ]
        };
        var revenueObj = {
            "posX": 600,
            "posY": 250,
            "elmtID": "elmt14",
            "elmtName": "Revenue",
            "elmtDesc": "write description here",
            "elmtType": 101,
            "elmtWghtMthd": 1,
            "elmtDstType": 1,
            "elmtDataArr": [],
            "pwlFlipVertical": false,
            "pwlFlipHorizontal": false,
            "elmtData": [
                ["conn9", 50],
                ["conn10", 50]
            ]
        }; //elmt14
        var recruitObj = {
            "posX": 600,
            "posY": 380,
            "elmtID": "elmt15",
            "elmtName": "Recruit",
            "elmtDesc": "write description here",
            "elmtType": 101,
            "elmtWghtMthd": 1,
            "elmtDstType": 1,
            "elmtDataArr": [],
            "pwlFlipVertical": false,
            "pwlFlipHorizontal": false,
            "elmtData": [
                ["conn13", 50],
                ["conn14", 50]
            ]
        };
        var biomassObj = {
            "posX": 600,
            "posY": 430,
            "elmtID": "elmt16",
            "elmtName": "Biomass",
            "elmtDesc": "write description here",
            "elmtType": 101,
            "elmtWghtMthd": 1,
            "elmtDstType": 1,
            "elmtDataArr": [],
            "pwlFlipVertical": false,
            "pwlFlipHorizontal": false,
            "elmtData": [
                ["conn11", 50],
                ["conn12", 50]
            ]
        };
        var offShoreObj = {
            "posX": 600,
            "posY": 500,
            "elmtID": "elmt17",
            "elmtName": "OffShore",
            "elmtDesc": "write description here",
            "elmtType": 101,
            "elmtWghtMthd": 1,
            "elmtDstType": 1,
            "elmtDataArr": [],
            "pwlFlipVertical": false,
            "pwlFlipHorizontal": false,
            "elmtData": [
                ["conn17", 50],
                ["conn18", 50]
            ]
        };
        var onShoreObj = {
            "posX": 600,
            "posY": 560,
            "elmtID": "elmt18",
            "elmtName": "OnShore",
            "elmtDesc": "write description here",
            "elmtType": 101,
            "elmtWghtMthd": 1,
            "elmtDstType": 1,
            "elmtDataArr": [],
            "pwlFlipVertical": false,
            "pwlFlipHorizontal": false,
            "elmtData": [
                ["conn15", 50],
                ["conn16", 50]
            ]
        };
        elements[4] = revenueCodObj;
        elements[5] = revenueMacObj;
        elements[6] = recruitCodObj;
        elements[7] = recruitMacObj;
        elements[8] = biomassCodObj;
        elements[9] = biomassMacObj;
        elements[10] = offShoreCodObj;
        elements[11] = offShoreMacObj;
        elements[12] = onShoreCodObj;
        elements[13] = onShoreMacObj;
        elements[0] = goalObj;
        elements[1] = environmentalObj;
        elements[2] = financialObj;
        elements[3] = socialObj;
        elements[14] = revenueObj;
        elements[15] = recruitObj;
        elements[16] = biomassObj;
        elements[17] = offShoreObj;
        elements[18] = onShoreObj;
        MCAObj = {
            "elements": elements,
            "connections": connections,
            "mdlName": "title",
            "mainObj": "elmt0",
            "dataMat": [],
            "mdlIdent": "temp"
        };
        return JSON.stringify(MCAObj);
    };
    Model.prototype.getBaseLine = function (p_arr) {
        var l = p_arr.length;
        var sum = 0;
        for (var i = 0; i < l; i++) {
            sum += p_arr[i];
        }
        return Math.round(sum / l);
    };
    Model.prototype.startNewInterval = function () {
        this.updateNoShips();
        this.m_ai.startNewInterval();
    };
    Model.prototype.getRandomOceanPos = function () {
        var startRow = Math.round(Math.random() * (this.m_map.getMapHeight() - 2));
        var startCol = Math.round(Math.random() * (this.m_map.getMapHeight() - 2));
        var point = new Point2(startRow, startCol);
        if (!(this.m_map.getTile(point) instanceof Land)) {
            return point;
        }
        var col = startCol + 1; //This is needed for the first check in the first for loop
        for (var row = startRow; row != startRow || col != startCol; row = (row + 1) % this.m_map.getMapHeight()) {
            for (col = startCol + 1; col != startCol; col = (col + 1) % this.m_map.getMapWidth()) {
                point = new Point2(row, col);
                if (!(this.m_map.getTile(point) instanceof Land)) {
                    return point;
                }
            }
        }
        throw new Error("Error! No ocean tile on map");
    };
    //Updates number of ships in map to correspond to restrictions
    Model.prototype.updateNoShips = function () {
        var restrictionNoOfCodShips = this.m_goverment.getRestrictions().getNoCodShips();
        var restrictionNoOfMacShips = this.m_goverment.getRestrictions().getNoMackerelShips();
        var shipOwner = this.m_shipOwners[0]; //OBS assuming only one ship owner
        while (this.m_map.getCodShips().length > restrictionNoOfCodShips) {
            //While there are too many ships
            this.m_map.removeShip(shipOwner.getCodShips()[0]);
            shipOwner.sellShip(shipOwner.getCodShips()[0]);
        }
        while (this.m_map.getCodShips().length < restrictionNoOfCodShips) {
            //While there are too few ships
            this.m_map.addShip(shipOwner.buyShip(FishType.cod, this.getRandomOceanPos()));
        }
        while (this.m_map.getMackerelShips().length > restrictionNoOfMacShips) {
            //While there are too many ships
            this.m_map.removeShip(shipOwner.getMackerelShips()[0]);
            shipOwner.sellShip(shipOwner.getMackerelShips()[0]);
        }
        while (this.m_map.getMackerelShips().length < restrictionNoOfMacShips) {
            //While there are too few ships
            this.m_map.addShip(shipOwner.buyShip(FishType.mackerel, this.getRandomOceanPos()));
        }
    };
    return Model;
}());
//# sourceMappingURL=Model.js.map