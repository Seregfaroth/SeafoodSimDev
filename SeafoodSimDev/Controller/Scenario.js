var Scenario = (function () {
    function Scenario() {
        //this.m_name = "no";
    }
    Scenario.prototype.loadScenario = function (p_path, p_callBack) {
        var path = 'scn1.json';
        var scn = this;
        jQuery.getJSON(p_path, function (data) {
            var p = 0;
            console.log("jjson");
            scn.fromJson(data);
            p_callBack();
        }).fail(function (jqxhr, textStatus, error) {
            var err = textStatus + ", " + error;
            var j = jqxhr;
            console.log("Request Failed: " + err);
        });
    };
    Scenario.prototype.fromJson = function (p_json) {
        this.m_noOfShipOwners = p_json.noOfShipOwners;
        this.m_name = p_json.name;
        this.m_prices = p_json.prices;
        this.m_prices = {};
        this.m_prices[FishType.Cod] = p_json.prices.Cod;
        this.m_prices[FishType.Mackerel] = p_json.prices.Mackerel;
        this.m_finGoal = p_json.financialScoreGoal;
        this.m_ecoGoal = p_json.environmentalScoreGoal;
        this.m_socGoal = p_json.socialScoreGoal;
        this.m_allGoal = p_json.overallscoreGoal;
        this.m_description = p_json.description;
        this.m_linkToMCA = p_json.linkToMCA;
        this.m_mapType = p_json.mapType;
        this.m_mapSize = p_json.mapSize;
        this.m_numberOfSchools = p_json.numberOfSchools;
        this.m_oceanFishCapacity = p_json.oceanFishCapacity;
        this.m_schoolsInOnePlace = p_json.schoolsInOnePlace;
        this.m_schoolSize = p_json.schoolSize;
        this.m_schoolMsy = p_json.schoolMsy;
        this.m_schoolMinimum = p_json.schoolMinimum;
        this.m_schoolMaximum = p_json.schoolMaximum;
        this.m_recruitAndAgeFreq = p_json.recruitAndAgeFreq;
        this.m_statFreq = p_json.statFreq;
        this.m_noOfMenPerShip = p_json.noOfMenPerShip;
        this.m_shipPrice = p_json.shipPrice;
        this.m_defaultNoDays = p_json.defaultNoDays;
        this.m_defaultTickSize = p_json.defaultTickSize;
        this.m_taxingRate = p_json.taxingRate;
        this.m_map = p_json.map;
        this.m_shipOwner = p_json.shipOwner;
        this.m_shipOwnerStartMoney = p_json.shipOwnerStartMoney;
        this.m_shipOwnerShipPrice = p_json.shipPrice;
        this.m_aiBuyShipBalance = p_json.aiShipBuyBalance;
        this.m_aiSellShipBalance = p_json.aiShipSellBalance;
        this.m_shipOwnerStartBalance = p_json.shipOwnerStartBalance;
        this.m_subFinancialWeight = p_json.subFinancialWeight;
        this.m_subEnvironmentalWeight = p_json.subEnvironmentalWeight;
        this.m_subSocialWeight = p_json.subSocialWeight;
        this.m_indicatorInvestmentWeight = p_json.indicatorInvestmentWeight;
        this.m_indicatorIncomeWeight = p_json.indicatorIncomeWeight;
        this.m_indicatorBiomassWeight = p_json.indicatorBiomassWeight;
        this.m_indicatorRecruitmentWeight = p_json.indicatorRecruitmentWeight;
        this.m_indicatorOnshoreEmployment = p_json.indicatorOnshoreEmployment;
        this.m_indicatorOffshoreEmployment = p_json.indicatorOffshoreEmployment;
        this.m_fishingPercentage = p_json.fishingPercentage;
        this.m_financialMaxScore = p_json.financialMaxScore;
        this.m_environmentalMaxScore = p_json.environmentalMaxScore;
        this.m_socialMaxScore = p_json.socialMaxScore;
        this.m_financialMinScore = p_json.financialMinScore;
        this.m_environmentalMinScore = p_json.environmentalMinScore;
        this.m_socialMinScore = p_json.socialMinScore;
        this.m_landsiteShipCapacity = p_json.landsiteShipCapacity;
        this.m_landsiteResourceCapacity = p_json.landsiteResourceCapacity;
        this.m_landsiteProcessPerDay = p_json.landsiteProcessPerDay;
        this.m_landsiteRunningCost = p_json.landsiteRunningCost;
        this.m_landsiteNumberOfEmployees = p_json.landsiteNumberOfEmployees;
        this.m_fuelsiteShipCapacity = p_json.fuelsiteShipCapacity;
        this.m_fuelsiteResourceCapacity = p_json.fuelsiteResourceCapacity;
        this.m_fuelsiteProcessPerDay = p_json.fuelsiteProcessPerDay;
        this.m_fuelsiteRunningCost = p_json.fuelsiteRunningCost;
        this.m_fuelsiteFuelPrize = p_json.fuelsiteFuelPrize;
        this.m_fuelsiteNumberOfEmployees = p_json.fuelsiteNumberOfEmployees;
        this.m_environmentalScoreMaxIncreasePerTick = p_json.environmentalScoreMaxIncreasePerTick;
        this.m_codMovingRadius = p_json.codMovingRadius;
        this.m_codRecruitPercent = p_json.codRecruitPercent;
        this.m_codSchoolMaxAge = p_json.codSchoolMaxAge;
        this.m_modelStatFreq = p_json.modelStatFreq;
        this.m_modelRecruitAndAgeFreq = p_json.modelRecruitAndAgeFreq;
        this.m_noOfEmployeesPerShip = p_json.noOfEmployeesPerShip;
        this.m_shipFuelCapacity = p_json.shipFuelCapacity;
        this.m_shipCargoCapacity = p_json.shipCargoCapacity;
        this.m_shipFuelPerMove = p_json.shipFuelPerMove;
        this.m_shipMovesPerTick = p_json.shipMovesPerTick;
        this.m_shipOwnerStartMoney = p_json.shipOwnerStartMoney;
        //this.m_shipOwnerShipPrice = p_json.shipOwnerShipPrice;
        this.m_shipOwnerLicense = p_json.shipOwnerLicense;
    };
    Scenario.prototype.getName = function () {
        return this.m_name;
    };
    Scenario.prototype.getDescription = function () {
        return this.m_description;
    };
    Scenario.prototype.getfinGoal = function () {
        return this.m_finGoal;
    };
    Scenario.prototype.getEcoGoal = function () {
        return this.m_ecoGoal;
    };
    Scenario.prototype.getSocGoal = function () {
        return this.m_socGoal;
    };
    Scenario.prototype.getAllScore = function () {
        return this.m_allGoal;
    };
    Scenario.prototype.getLink = function () {
        return this.m_linkToMCA;
    };
    Scenario.prototype.getMapType = function () {
        return this.m_mapType;
    };
    Scenario.prototype.getMapSize = function () {
        return this.m_mapSize;
    };
    Scenario.prototype.getNumberOfSchools = function () {
        return this.m_numberOfSchools;
    };
    Scenario.prototype.getPrices = function () {
        return this.m_prices;
    };
    Scenario.prototype.getOceanFishCapacity = function () {
        return this.m_oceanFishCapacity;
    };
    Scenario.prototype.getSchoolsInOnePlace = function () {
        return this.m_schoolsInOnePlace;
    };
    Scenario.prototype.getSchoolSize = function () {
        return this.m_schoolSize;
    };
    Scenario.prototype.getSchoolMsy = function () {
        return this.m_schoolMsy;
    };
    Scenario.prototype.getSchoolMinimum = function () {
        return this.m_schoolMinimum;
    };
    Scenario.prototype.getSchoolMaximum = function () {
        return this.m_schoolMaximum;
    };
    Scenario.prototype.getDefaultNoDays = function () {
        return this.m_defaultNoDays;
    };
    Scenario.prototype.getDefaultTicksize = function () {
        return this.m_defaultTickSize;
    };
    Scenario.prototype.getTaxingRate = function () {
        return this.m_taxingRate;
    };
    Scenario.prototype.getMap = function () {
        return this.m_map;
    };
    Scenario.prototype.getShipOwner = function () {
        return this.m_shipOwner;
    };
    Scenario.prototype.getShipPrice = function () {
        return this.m_shipOwnerShipPrice;
    };
    Scenario.prototype.getAiBuyShipBalance = function () {
        return this.m_aiBuyShipBalance;
    };
    Scenario.prototype.getAiSellShipBalance = function () {
        return this.m_aiSellShipBalance;
    };
    Scenario.prototype.getSubFinancialWeight = function () {
        return this.m_subFinancialWeight;
    };
    Scenario.prototype.getSubEnvironmentalWeight = function () {
        return this.m_subEnvironmentalWeight;
    };
    Scenario.prototype.getSubSocialWeight = function () {
        return this.m_subSocialWeight;
    };
    Scenario.prototype.getIndicatorInvestmentWeight = function () {
        return this.m_indicatorInvestmentWeight;
    };
    Scenario.prototype.getIndicatorIncomeWeight = function () {
        return this.m_indicatorIncomeWeight;
    };
    Scenario.prototype.getIndicatorBiomassWeight = function () {
        return this.m_indicatorBiomassWeight;
    };
    Scenario.prototype.getIndicatorRecruitmentWeight = function () {
        return this.m_indicatorRecruitmentWeight;
    };
    Scenario.prototype.getIndicatorOnshoreEmployment = function () {
        return this.m_indicatorOnshoreEmployment;
    };
    Scenario.prototype.getIndicatorOffshoreEmployment = function () {
        return this.m_indicatorOffshoreEmployment;
    };
    Scenario.prototype.getFinancialMaxScore = function () {
        return this.m_financialMaxScore;
    };
    Scenario.prototype.getEnvironmentalMaxScore = function () {
        return this.m_environmentalMaxScore;
    };
    Scenario.prototype.getSocialMaxScore = function () {
        return this.m_socialMaxScore;
    };
    Scenario.prototype.getFishingPercentage = function () {
        return this.m_fishingPercentage;
    };
    Scenario.prototype.getFinancialMinScore = function () {
        return this.m_financialMinScore;
    };
    Scenario.prototype.getEnvironmentalMinScore = function () {
        return this.m_environmentalMinScore;
    };
    Scenario.prototype.getSocialMinScore = function () {
        return this.m_socialMinScore;
    };
    Scenario.prototype.getLandsiteShipCapacity = function () {
        return this.m_landsiteShipCapacity;
    };
    Scenario.prototype.getLandsiteResourceCapacity = function () {
        return this.m_landsiteResourceCapacity;
    };
    Scenario.prototype.getLandsiteProcessPerDay = function () {
        return this.m_landsiteProcessPerDay;
    };
    Scenario.prototype.getLandsiteRunningCost = function () {
        return this.m_landsiteRunningCost;
    };
    Scenario.prototype.getLandsiteNumberOfEmployees = function () {
        return this.m_landsiteNumberOfEmployees;
    };
    Scenario.prototype.getFuelsiteShipCapacity = function () {
        return this.m_fuelsiteShipCapacity;
    };
    Scenario.prototype.getFuelsiteResourceCapacity = function () {
        return this.m_fuelsiteResourceCapacity;
    };
    Scenario.prototype.getFuelsiteProcessPerDay = function () {
        return this.m_fuelsiteProcessPerDay;
    };
    Scenario.prototype.getFuelsiteRunningCost = function () {
        return this.m_fuelsiteRunningCost;
    };
    Scenario.prototype.getFuelsiteFuelPrize = function () {
        return this.m_fuelsiteFuelPrize;
    };
    Scenario.prototype.getFuelsiteNumberOfEmployees = function () {
        return this.m_fuelsiteNumberOfEmployees;
    };
    Scenario.prototype.getEnvironmentalScoreMaxIncreasePerTick = function () {
        return this.m_environmentalScoreMaxIncreasePerTick;
    };
    Scenario.prototype.getCodMovingRadius = function () {
        return this.m_codMovingRadius;
    };
    Scenario.prototype.getCodRecruitPercent = function () {
        return this.m_codRecruitPercent;
    };
    Scenario.prototype.getCodSchoolMaxAge = function () {
        return this.m_codSchoolMaxAge;
    };
    Scenario.prototype.getModelStatFreq = function () {
        return this.m_modelStatFreq;
    };
    Scenario.prototype.getModelRecruitAndAgeFreq = function () {
        return this.m_modelRecruitAndAgeFreq;
    };
    Scenario.prototype.getNoOfEmployeesPerShip = function () {
        return this.m_noOfEmployeesPerShip;
    };
    Scenario.prototype.getShipFuelCapacity = function () {
        return this.m_shipFuelCapacity;
    };
    Scenario.prototype.getShipCargoCapacity = function () {
        return this.m_shipCargoCapacity;
    };
    Scenario.prototype.getShipFuelPerMove = function () {
        return this.m_shipFuelPerMove;
    };
    Scenario.prototype.getShipMovesPerTick = function () {
        return this.m_shipMovesPerTick;
    };
    Scenario.prototype.getShipOwnerStartMoney = function () {
        return this.m_shipOwnerStartMoney;
    };
    Scenario.prototype.getShipOwnerShipPrice = function () {
        return this.m_shipOwnerShipPrice;
    };
    Scenario.prototype.getShipOwnerLicense = function () {
        return this.m_shipOwnerLicense;
    };
    Scenario.prototype.getRecruitAndAgeFreq = function () {
        return this.m_recruitAndAgeFreq;
    };
    Scenario.prototype.getStatFreq = function () {
        return this.m_statFreq;
    };
    Scenario.prototype.getNoOfMenPerShip = function () {
        return this.m_noOfMenPerShip;
    };
    Scenario.prototype.getShipOwnerStartBalance = function () {
        return this.m_shipOwnerStartBalance;
    };
    Scenario.prototype.getNoOfShipOwners = function () {
        return this.m_noOfShipOwners;
    };
    return Scenario;
}());
//# sourceMappingURL=Scenario.js.map