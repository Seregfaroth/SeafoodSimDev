// <reference path = "../../TSSeafoodSimDev/externals/wrappers.d.ts"/>
var School = (function () {
    function School(p_size, p_position) {
        this.m_ages = [];
        this.m_recruitTotal = 0;
        this.m_prepareRecruitment = 0;
        this.m_natDeath = 0;
        this.m_yield = 0;
        this.m_scenario = Scenario.getInstance();
        this.m_position = p_position;
        this.m_origin = p_position;
        this.m_originSize = p_size / 2;
        //this.m_msy = p_msy;        
    }
    School.prototype.getOriginSize = function () {
        return this.m_originSize;
    };
    School.prototype.getType = function () {
        return this.m_type;
    };
    School.prototype.getOrigin = function () {
        return this.m_origin;
    };
    School.prototype.getRecruitTotal = function () {
        return this.m_recruitTotal;
    };
    School.prototype.resetRecruitTotal = function () {
        this.m_recruitTotal = 0;
    };
    School.prototype.getPrepareRecruit = function () {
        return this.m_prepareRecruitment;
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
    School.prototype.getSize = function (p_onlyOld) {
        var size = 0;
        if (p_onlyOld) {
            for (var i = Math.ceil(0.3 * this.getMaxAge()); i < this.m_ages.length; i++) {
                size += this.m_ages[i];
            }
        }
        else {
            this.m_ages.forEach(function (n) {
                size += n;
            });
        }
        return size;
    };
    School.prototype.getPosition = function () {
        return this.m_position;
    };
    School.prototype.getAges = function () {
        return this.m_ages;
    };
    //public ageAndRecruit(p_map: Map): void {
    //    var t = this.m_ages[this.m_ages.length - 1];
    //    this.m_natDeath += this.m_ages[this.m_ages.length-1];
    //    this.age();
    //    this.recruit(p_map);
    //}
    School.prototype.age = function () {
        var school = this;
        this.m_size -= this.m_ages[this.m_maxAge - 1];
        for (var i = this.m_maxAge - 1; i > 0; i--) {
            this.m_ages[i] = this.m_ages[i - 1];
        }
        this.m_ages[0] = this.m_prepareRecruitment;
        this.m_size += this.m_prepareRecruitment; //Update size
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
    //Move with a probability of 25% in a random direction
    School.prototype.move = function (p_map) {
        //console.log("Original position: " + JSON.stringify(this.m_position));
        var move = Math.random() < 0;
        if (this.m_scenario.getMovingRadius() !== 0) {
            if (move) {
                var newPoint;
                //While loop runs until an ocean tile has been found
                do {
                    var direction = Math.floor((Math.random() * 4));
                    switch (direction) {
                        case 0:
                            if (this.m_position.row === p_map.getGrid().length - 1) {
                                newPoint = new Point2(0, this.m_position.col);
                            }
                            else {
                                newPoint = new Point2(this.m_position.row + 1, this.m_position.col);
                            }
                            break;
                        case 1:
                            if (this.m_position.col === 0) {
                                newPoint = new Point2(this.m_position.row, p_map.getGrid()[0].length - 1);
                            }
                            else {
                                newPoint = new Point2(this.m_position.row, this.m_position.col - 1);
                            }
                            break;
                        case 2:
                            if (this.m_position.row === 0) {
                                newPoint = new Point2(p_map.getGrid().length - 1, this.m_position.col);
                            }
                            else {
                                newPoint = new Point2(this.m_position.row - 1, this.m_position.col);
                            }
                            break;
                        case 3:
                            if (this.m_position.col === p_map.getGrid()[0].length - 1) {
                                newPoint = new Point2(this.m_position.row, 0);
                            }
                            else {
                                newPoint = new Point2(this.m_position.row, this.m_position.col + 1);
                            }
                            break;
                        default:
                            break;
                    }
                } while (!(p_map.getTile(newPoint) instanceof Ocean) || newPoint.manhattanDistTo(this.m_origin) > this.m_scenario.getMovingRadius());
                this.m_position = newPoint;
            }
        }
        //console.log("new postion: " + JSON.stringify(this.m_position));
    };
    return School;
}());
//# sourceMappingURL=School.js.map