/// <reference path="School.ts"/>
// <reference path = "../../TSSeafoodSimDev/externals/wrappers.d.ts"/>
class Mackerel extends School {

    public constructor(p_size: number, p_position: Point2) {
        super(p_size, p_position);
        this.m_maxAge = this.m_scenario.getMackerelSchoolMaxAge();
        this.m_type = "Mackerel";
        this.m_growthRate = 0.30;
        for (var i = 0; i < this.m_maxAge; i++) {
            this.m_ages.push(0);
        }
        for (var i = 0; i < p_size; i++) {
            var age: number = Math.floor(Math.random() * this.m_maxAge);
            this.m_ages[age] += 1;
        }
        this.m_size = p_size;
    }

    public recruit(p_map: Map): void {
        var currentTile = <Ocean>p_map.getTile(this.m_position);
        this.m_prepareRecruitment = 0;
        var ccTot = 0;
        //for each of the fishGroups in CarryingCapacity get the carrying Capacity 
        for (var group of currentTile.getCarryingCapacity().m_fishGroups) {
            var cc = currentTile.getCarryingCapacity().getCapacityGroupNumbers(group.m_name);
            //var sbb = p_map.getSsbOf(this.getType(), this.m_position);      
            var ssb = this.getSsb();
            var size = this.getSize();
            var fraction = p_map.getBiosmassFractionOf(Mackerel, group, this.m_position);
            if (true /*cc != 0 && fraction != 0*/) {
                //console.log("Mac recrut: " + this.m_growthRate * ssb * (1 - ssb / (cc * fraction)) + "  ssb: " + ssb + "  cc*frac: " + cc*fraction);
                //this.m_prepareRecruitment += this.m_growthRate * ssb * (1 - ssb / (cc * fraction));
                ccTot += cc * fraction;
            }     
        }
        var ssb = this.getSsb();
        var size = this.getSize();
        //console.log("Mac recrut: " + this.m_growthRate * size * (1 - size / (ccTot)) + "  size: " + size + "  ccTot: " + ccTot);
        this.m_prepareRecruitment += this.m_growthRate * size * (1 - size / (ccTot));
        //this.m_ages[0] = recruitment;
        //this.m_size += this.m_prepareRecruitment;
        this.m_recruitTotal += this.m_prepareRecruitment;

        //var tmp = (<Ocean>p_map.getTile(this.m_position)).getCarryingCapacity();// getFishCapacity();
        //var tmp2 = this.getSize();
        //if ((<Ocean>p_map.getTile(this.m_position)).getFishCapacity() > this.getSize()) {
        //    //Only recruit if the tile is not full
        //    var noOfNewFish: number = Math.random() * this.getSize();
        //    this.m_ages[0] = noOfNewFish;
        //}
    }
}