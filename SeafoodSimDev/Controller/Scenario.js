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
        this.m_name = p_json.name;
        this.m_prices = p_json.prices;
        this.m_prices = {};
        this.m_prices[FishType.Cod] = p_json.prices[0].Cod;
        this.m_prices[FishType.Mackerel] = p_json.prices[0].Mackerel;
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
        this.m_defaultNoDays = p_json.defaultNoDays;
        this.m_defaultTickSize = p_json.defaultTickSize;
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
    return Scenario;
}());
//# sourceMappingURL=Scenario.js.map