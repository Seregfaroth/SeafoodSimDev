/// <reference path="School.ts"/>
// <reference path = "../../TSSeafoodSimDev/externals/wrappers.d.ts"/>
class Mackerel extends School {

    public constructor(p_size: number, p_position: Point2) {
        super(p_size, p_position);
        this.m_maxAge = this.m_scenario.getMackerelSchoolMaxAge();
        this.m_type = "mac";
        this.m_growthRate = 0.15;
        for (var i = 0; i < this.m_maxAge; i++) {
            this.m_ages.push(0);
        }
        for (var i = 0; i < p_size; i++) {
            var age: number = Math.floor(Math.random() * this.m_maxAge);
            this.m_ages[age] += 1;
        }

    }

    protected recruit(p_map: Map): void {
        var currentTile = <Ocean>p_map.getTile(this.m_position);
        var recruitment = 0;
        //for each of the fishGroups in CarryingCapacity get the carrying Capacity 
        for (var group of currentTile.getCarryingCapacity().m_fishGroups) {
            var cc = currentTile.getCarryingCapacity().getCapacityGroupNumbers(group.m_name);
            //var sbb = p_map.getSsbOf(this.getType(), this.m_position);      
            var ssb = this.getSsb();
            var fraction = p_map.getBiosmassFractionOf(this.getType(), this.m_position);
            if (cc != 0 && fraction != 0) {
                recruitment += this.m_growthRate * ssb * (1 - ssb / (cc * fraction));
            }     
        }
        this.m_ages[0] = recruitment;
        this.m_size += recruitment;
        this.m_recruitTotal += recruitment;

        //var tmp = (<Ocean>p_map.getTile(this.m_position)).getCarryingCapacity();// getFishCapacity();
        //var tmp2 = this.getSize();
        //if ((<Ocean>p_map.getTile(this.m_position)).getFishCapacity() > this.getSize()) {
        //    //Only recruit if the tile is not full
        //    var noOfNewFish: number = Math.random() * this.getSize();
        //    this.m_ages[0] = noOfNewFish;
        //}
    }
}