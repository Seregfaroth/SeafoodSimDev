var Scenario = (function () {
    function Scenario() {
        this.m_name = "no";
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
        this.m_finGoal = p_json.financialScoreGoal;
        this.m_ecoGoal = p_json.environmentalScoreGoal;
        this.m_socGoal = p_json.socialScoreGoal;
        this.m_allGoal = p_json.overallscoreGoal;
        this.m_description = p_json.description;
        this.m_linkToMCA = p_json.linkToMCA;
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
    return Scenario;
}());
//# sourceMappingURL=Scenario.js.map