/// <reference path="School.ts"/>
// <reference path = "../../TSSeafoodSimDev/externals/wrappers.d.ts"/>
class Cod extends School{

    public constructor(p_size: number, p_position: Point2, p_ages?: number[]) {
        super(p_size, p_position);
        this.m_maxAge = this.m_scenario.getCodSchoolMaxAge();
        this.m_type = "Cod";
        this.m_growthRate = 0.75;
        for (var i = 0; i < this.m_maxAge; i++) {
            this.m_ages.push(0);
        }
        if (!p_ages) {
            for (var i = 0; i < p_size; i++) {
                var age: number = Math.floor(Math.random() * this.m_maxAge);
                this.m_ages[age] += 1;
            }
        }
        else {
            this.m_ages = p_ages;
        }
        this.m_size = p_size;
    }
    
   
    

    //Recruitment using a logistic population growth model
    public recruit(p_map: Map): void {
        var currentTile = <Ocean>p_map.getTile(this.m_position);
        this.m_prepareRecruitment = 0;
        var ccTot = 0;
        //for each of the fishGroups in CarryingCapacity get the carrying Capacity 
        for (var group of currentTile.getCarryingCapacity().m_fishGroups) {
            var cc = currentTile.getCarryingCapacity().getCapacityGroupNumbers(group.m_name);
            //var sbb = p_map.getSsbOf(this.getType(), this.m_position);      
            
            var fraction = p_map.getBiosmassFractionOf(Cod, group, this.m_position);
            if (true /*cc != 0 && fraction != 0 */) {
                ccTot += cc * fraction;
                //console.log("Cod recrut: " + this.m_growthRate * ssb * (1 - ssb / (cc * fraction)));
                //console.log("Cod recrut: " + this.m_growthRate * ssb * (1 - ssb / (cc * fraction)) + "  ssb: " + ssb + "  cc*frac: " + cc * fraction);
                //this.m_prepareRecruitment += this.m_growthRate * ssb * (1 - ssb / (cc * fraction));
                
            }                      
        }
        var ssb = this.getSsb();
        var size = this.getSize();
        //console.log("Cod recrut: " + this.m_growthRate * size * (1 - size / ccTot) + "  size: " + size + "  ccTot: " + ccTot);
        this.m_prepareRecruitment += this.m_growthRate * size * (1 - size / ccTot);

        //this.m_ages[0] = recruitment;//Add new fish
        //this.m_size += this.m_prepareRecruitment; //Update size
        this.m_recruitTotal += this.m_prepareRecruitment;//Update total recruitment

        //if ((<Ocean>p_map.getTile(this.m_position)).getFishCapacity() > p_map.getNoOfFishInTile(this.m_position)) {
        //    //Only recruit if the tile is not full
        //    //var noOfNewFish: number = Math.floor(Math.random() * this.m_scenario.getRecrutingPercentage()*this.getSize());
        //    var noOfNewFish: number = Math.floor(0.5 * this.m_scenario.getRecrutingPercentage() * this.getSize());
        //    this.m_ages[0] = noOfNewFish;
        //    this.m_size += noOfNewFish;
        //    this.m_recruitTotal += noOfNewFish;
        //}
    }

}