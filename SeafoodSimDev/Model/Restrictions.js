var Restrictions = (function () {
    function Restrictions() {
        this.m_quotes = {};
        this.m_effortLimits = {};
        this.m_restrictedAreas = [];
        this.m_landingDistrubutions = {};
        this.m_scenario = Scenario.getInstance();
        this.m_noCodOfShips = this.m_scenario.getStartNoCodShips();
    }
    Restrictions.prototype.restrictArea = function (p_tile) {
        this.m_restrictedAreas.push(p_tile);
    };
    Restrictions.prototype.unRestrictArea = function (p_tile) {
        this.m_restrictedAreas.splice(this.m_restrictedAreas.indexOf(p_tile), 1);
    };
    Restrictions.prototype.setQuote = function (p_shipOwner, p_amount) {
        this.m_quotes[p_shipOwner] = p_amount;
    };
    Restrictions.prototype.setEffortLimit = function (p_shipOwner, p_amount) {
        this.m_effortLimits[p_shipOwner] = p_amount;
    };
    Restrictions.prototype.setLandingDistrubution = function (p_site, p_amount) {
        this.m_landingDistrubutions[p_site] = p_amount;
    };
    Restrictions.prototype.getQuotes = function () {
        return this.m_quotes;
    };
    Restrictions.prototype.getEffortLimits = function () {
        return this.m_effortLimits;
    };
    Restrictions.prototype.getRestrictedAreas = function () {
        return this.m_restrictedAreas;
    };
    Restrictions.prototype.getLandingDistrubutions = function () {
        return this.m_landingDistrubutions;
    };
    Restrictions.prototype.setNoCodShips = function (p_n) {
        this.m_noCodOfShips = p_n;
    };
    Restrictions.prototype.getNoCodOfShips = function () {
        return this.m_noCodOfShips;
    };
    Restrictions.prototype.setNoMackerelShips = function (p_n) {
        this.m_noMackerelOfShips = p_n;
    };
    Restrictions.prototype.getNoMackerelOfShips = function () {
        return this.m_noMackerelOfShips;
    };
    Restrictions.prototype.isRestricted = function (p_tile) {
        return this.m_restrictedAreas.indexOf(p_tile) > -1;
    };
    Restrictions.prototype.setTacMackerel = function (p_n) {
        this.m_tacMackerel = p_n;
    };
    Restrictions.prototype.setTacCod = function (p_n) {
        this.m_tacCod = p_n;
    };
    return Restrictions;
}());
//# sourceMappingURL=Restrictions.js.map