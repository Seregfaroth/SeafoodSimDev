// <reference path = "../../TSSeafoodSimDev/externals/wrappers.d.ts"/>
/// <reference path="Fish.ts"/>
var School = (function () {
    function School(p_size, p_msy, p_position) {
        this.m_ages = [];
        this.m_position = p_position;
        this.m_msy = p_msy;
    }
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
        return this.m_mey;
    };
    School.prototype.setMey = function (p_mey) {
        this.m_mey = p_mey;
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
    School.prototype.live = function (p_map) {
        this.move(p_map);
        this.age();
        this.recruit(p_map);
    };
    School.prototype.age = function () {
        var school = this;
        for (var i = this.m_maxAge - 1; i > 0; i--) {
            this.m_ages[i] = this.m_ages[i - 1];
        }
        this.m_ages[0] = 0;
    };
    School.prototype.getMaxAge = function () {
        return this.m_maxAge;
    };
    return School;
}());
//# sourceMappingURL=School.js.map