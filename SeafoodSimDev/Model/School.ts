// <reference path = "../../TSSeafoodSimDev/externals/wrappers.d.ts"/>
abstract class School {
    protected m_scenario: Scenario;
    protected m_maxAge: number;
    protected m_position: Point2;
    protected m_type: string;
    protected m_ages: number[] = [];
    protected m_msy: number;
    protected m_tac: number;
    protected m_recruitTotal: number = 0;
    protected m_prepareRecruitment: number = 0;
    protected m_natDeath: number = 0;
    protected m_yield: number = 0;
    protected m_size: number;
    protected m_growthRate: number;
    protected m_origin: Point2;
    protected m_originSize: number;

    public constructor(p_size: number, p_position: Point2) {
        this.m_scenario = Scenario.getInstance();
        this.m_position = p_position;
        this.m_origin = p_position;
        this.m_originSize = p_size/2;
        //this.m_msy = p_msy;        
    }
    public getOriginSize() {
        return this.m_originSize;
    }
    public getType(): string {
        return this.m_type;
    }

    public getOrigin(): Point2 {
        return this.m_origin;
    }
    public getRecruitTotal(): number {
        return this.m_recruitTotal;
    }
    public resetRecruitTotal() {
        this.m_recruitTotal = 0;
    }
    public getPrepareRecruit(): number {
        return this.m_prepareRecruitment;
    }
    public getNatDeathTotal(): number {
        return this.m_natDeath;
    }

    public getBiomass(): number {
        var b: number = 0;
        for (var age of this.m_ages) {
            b += age;
        }
        return b;
    }

    public getMsy(): number {
        return this.m_msy;
    }

    public setMsy(p_msy: number) {
        this.m_msy = p_msy;
    }

    public getMey(): number {
        return this.m_tac;
    }

    public setMey(p_mey: number) {
        this.m_tac = p_mey;
    }

    public getSize(p_onlyOld?: boolean): number {
        var size: number = 0;
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
    }

    public getPosition(): Point2 {
        return this.m_position;
    }

    public getAges(): number[] {
        return this.m_ages;
    }
    

    //public ageAndRecruit(p_map: Map): void {
    //    var t = this.m_ages[this.m_ages.length - 1];
    //    this.m_natDeath += this.m_ages[this.m_ages.length-1];
    //    this.age();
    //    this.recruit(p_map);
    //}

    public age(): void {
        var school: School = this;
        this.m_size -= this.m_ages[this.m_maxAge - 1];
        for (var i = this.m_maxAge-1; i >0; i--) {
            this.m_ages[i] = this.m_ages[i - 1];
        }
        this.m_ages[0] = this.m_prepareRecruitment;
        this.m_size += this.m_prepareRecruitment; //Update size
    }
    public getMaxAge(): number {
        return this.m_maxAge;
    }
    //Spawning stock biomass, the biomass older than 2 years
    public getSsb(): number {
        var ssb: number = 0;
        for (var i = 2; i < this.m_ages.length; i++) {
            ssb += this.m_ages[i];
        }
        return ssb;
    }
    //Move with a probability of 25% in a random direction
    public move(p_map: Map): void {
        //console.log("Original position: " + JSON.stringify(this.m_position));
        var move: boolean = Math.random() < 0;
        if (this.m_scenario.getMovingRadius() !== 0) {
            if (move) {

                var newPoint: Point2;
                //While loop runs until an ocean tile has been found
                do {
                    var direction: number = Math.floor((Math.random() * 4));
                    switch (direction) {
                        case 0:
                            if (this.m_position.row === p_map.getGrid().length - 1) {
                                newPoint = new Point2(0, this.m_position.col);
                            }
                            else {
                                newPoint = new Point2(this.m_position.row + 1, this.m_position.col)
                            }
                            break;
                        case 1:
                            if (this.m_position.col === 0) {
                                newPoint = new Point2(this.m_position.row, p_map.getGrid()[0].length - 1)
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
    }
    public abstract recruit(p_map: Map): void;
    //protected abstract applyRecruit(p_map: Map): void;
    //protected abstract recruit2(p_map: Map, cc: number, gr: number): void;
}