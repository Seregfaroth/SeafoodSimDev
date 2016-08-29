/// <reference path="School.ts"/>
// <reference path = "../../TSSeafoodSimDev/externals/wrappers.d.ts"/>
class Mackerel extends School {

    public constructor(p_size: number, p_position: Point2) {
        super(p_size, p_position);
        this.m_maxAge = 18;
        this.m_typeNumber = 1;
        for (var i = 0; i < p_size; i++) {
            this.m_fish.push(new Fish(this.m_typeNumber, Math.floor(Math.random() * this.m_maxAge)));
        }
    }
    protected move(): void {

    }

    protected recruit(): void {
        var noOfNewFish: number = Math.random() * this.m_fish.length;
        for (var i = 0; i < noOfNewFish; i++) {
            this.m_fish.push(new Fish(this.m_typeNumber));
        }
    }
}