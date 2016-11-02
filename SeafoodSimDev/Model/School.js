// <reference path = "../../TSSeafoodSimDev/externals/wrappers.d.ts"/>
var School = (function () {
    function School(p_size, p_position) {
        this.m_ages = [];
        this.m_recruitTotal = 0;
        this.m_natDeath = 0;
        this.m_yield = 0;
        //this.m_scenario = p_scenario;
        this.m_position = p_position;
        //this.m_msy = p_msy;        
    }
    School.prototype.getType = function () {
        return this.m_type;
    };
    School.prototype.getRecruitTotal = function () {
        return this.m_recruitTotal;
    };
    School.prototype.getNatDeathTotal = function () {
        return this.m_natDeath;
    };
    School.prototype.getBiomass = function () {
        var b = 0;
        for (var _i = 0, _a = this.m_ages; _i < _a.length; _i++) {
            var age = _a[_i];
            b += age;
        }
        return b;
    };
    School.prototype.getMsy = function () {
        return this.m_msy;
    };
    School.prototype.setMsy = function (p_msy) {
        this.m_msy = p_msy;
    };
    School.prototype.getMey = function () {
        return this.m_tac;
    };
    School.prototype.setMey = function (p_mey) {
        this.m_tac = p_mey;
    };
    School.prototype.getSize = function () {
        var size = 0;
        this.m_ages.forEach(function (n) {
            size += n;
        });
        return size;
    };
    School.prototype.getPosition = function () {
        return this.m_position;
    };
    School.prototype.getAges = function () {
        return this.m_ages;
    };
    School.prototype.ageAndRecruit = function (p_map) {
        var t = this.m_ages[this.m_ages.length - 1];
        this.m_natDeath += this.m_ages[this.m_ages.length - 1];
        this.age();
        this.recruit(p_map);
    };
    School.prototype.age = function () {
        var school = this;
        this.m_size -= this.m_ages[this.m_maxAge - 1];
        for (var i = this.m_maxAge - 1; i > 0; i--) {
            this.m_ages[i] = this.m_ages[i - 1];
        }
        this.m_ages[0] = 0;
    };
    School.prototype.getMaxAge = function () {
        return this.m_maxAge;
    };
    //Spawning stock biomass, the biomass older than 2 years
    School.prototype.getSsb = function () {
        var ssb = 0;
        for (var i = 2; i < this.m_ages.length; i++) {
            ssb += this.m_ages[i];
        }
        return ssb;
    };
    return School;
}());
//# sourceMappingURL=School.js.map