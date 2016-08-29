// <reference path = "../../TSSeafoodSimDev/externals/wrappers.d.ts"/>
/// <reference path="Fish.ts"/>
var School = (function () {
    function School(p_size, p_position) {
        this.m_position = p_position;
        this.m_fish = [];
    }
    School.prototype.getSize = function () {
        return this.m_fish.length;
    };
    School.prototype.getPosition = function () {
        return this.m_position;
    };
    School.prototype.getFish = function () {
        return this.m_fish;
    };
    School.prototype.shuffleFish = function () {
        var i;
        var j;
        var fishPlaceholder;
        for (i = this.m_fish.length; i; i--) {
            j = Math.floor(Math.random() * i);
            fishPlaceholder = this.m_fish[i - 1];
            this.m_fish[i - 1] = this.m_fish[j];
            this.m_fish[j] = fishPlaceholder;
        }
    };
    School.prototype.live = function (p_map) {
        this.move(p_map);
        this.age();
        this.recruit(p_map);
    };
    School.prototype.age = function () {
        var school = this;
        this.m_fish.forEach(function (f, index, array) {
            var f = array[index];
            if (f.getAge() === school.m_maxAge) {
                array.splice(index, 1);
            }
            else {
                f.age();
            }
        });
    };
    School.prototype.getMaxAge = function () {
        return this.m_maxAge;
    };
    return School;
}());
//# sourceMappingURL=School.js.map