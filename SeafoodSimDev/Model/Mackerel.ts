/// <reference path="School.ts"/>
// <reference path = "../../TSSeafoodSimDev/externals/wrappers.d.ts"/>
class Mackerel extends School {

    public constructor(p_size: number, p_msy: number, p_position: Point2) {
        super(p_size, p_msy, p_position);
        this.m_maxAge = 18;// OBS Ship also uses this value. It is hardcoded there at the moment
        for (var i = 0; i < this.m_maxAge; i++) {
            this.m_ages.push(0);
        }
        for (var i = 0; i < p_size; i++) {
            var age: number = Math.floor(Math.random() * this.m_maxAge);
            this.m_ages[age] += 1;
        }

    }
    public move(): void {

    }

    protected recruit(p_map: Map): void {
        var tmp = (<Ocean>p_map.getTile(this.m_position)).getFishCapacity();
        var tmp2 = this.getSize();
        if ((<Ocean>p_map.getTile(this.m_position)).getFishCapacity() > this.getSize()) {
            //Only recruit if the tile is not full
            var noOfNewFish: number = Math.random() * this.getSize();
            this.m_ages[0] = noOfNewFish;
        }
    }
}