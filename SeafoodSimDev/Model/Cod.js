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