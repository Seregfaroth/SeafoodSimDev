// <reference path = "../../TSSeafoodSimDev/externals/wrappers.d.ts"/>
/// <reference path="Fish.ts"/>
var School = (function () {
    function School(p_size, p_position) {
        this.m_ages = [];
        this.m_position = p_position;
    }
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