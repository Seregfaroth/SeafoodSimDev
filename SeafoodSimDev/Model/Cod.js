var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="School.ts"/>
// <reference path = "../../TSSeafoodSimDev/externals/wrappers.d.ts"/>
var Cod = (function (_super) {
    __extends(Cod, _super);
    function Cod(p_size, p_position, p_ages) {
        _super.call(this, p_size, p_position);
        this.m_scenario = Scenario.getInstance();
        this.m_origin = p_position;
        this.m_maxAge = this.m_scenario.getCodSchoolMaxAge();
        this.m_type = "cod";
        this.m_growthRate = 0.35;
        for (var i = 0; i < this.m_maxAge; i++) {
            this.m_ages.push(0);
        }
        if (!p_ages) {
            for (var i = 0; i < p_size; i++) {
                var age = Math.floor(Math.random() * this.m_maxAge);
                this.m_ages[age] += 1;
            }
        }
        else {
            this.m_ages = p_ages;
        }
        this.m_size = p_size;
    }
    Cod.prototype.getOrigin = function () {
        return this.m_origin;
    };
    //Move with a probability of 25% in a random direction
    Cod.prototype.move = function (p_map) {
        //console.log("Original position: " + JSON.stringify(this.m_position));
        var move = Math.random() < 0.05;
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
    //Recruitment using a logistic population growth model
    Cod.prototype.recruit = function (p_map) {
        var currentTile = p_map.getTile(this.m_position);
        var recruitment = 0;
        //for each of the fishGroups in CarryingCapacity get the carrying Capacity 
        for (var _i = 0, _a = currentTile.getCarryingCapacity().m_fishGroups; _i < _a.length; _i++) {
            var group = _a[_i];
            var cc = currentTile.getCarryingCapacity().getCapacityGroupNumbers(group.m_name);
            //var sbb = p_map.getSsbOf(this.getType(), this.m_position);      
            var ssb = this.getSsb();
            var fraction = p_map.getBiosmassFractionOf(this.getType(), this.m_position);
            if (cc != 0 && fraction != 0) {
                recruitment += this.m_growthRate * ssb * (1 - ssb / (cc * fraction));
            }
        }
        this.m_ages[0] = recruitment; //Add new fish
        this.m_size += recruitment; //Update size
        this.m_recruitTotal += recruitment; //Update total recruitment
        //if ((<Ocean>p_map.getTile(this.m_position)).getFishCapacity() > p_map.getNoOfFishInTile(this.m_position)) {
        //    //Only recruit if the tile is not full
        //    //var noOfNewFish: number = Math.floor(Math.random() * this.m_scenario.getRecrutingPercentage()*this.getSize());
        //    var noOfNewFish: number = Math.floor(0.5 * this.m_scenario.getRecrutingPercentage() * this.getSize());
        //    this.m_ages[0] = noOfNewFish;
        //    this.m_size += noOfNewFish;
        //    this.m_recruitTotal += noOfNewFish;
        //}
    };
    return Cod;
}(School));
//# sourceMappingURL=Cod.js.map