// <reference path = "../../TSSeafoodSimDev/externals/wrappers.d.ts"/>
abstract class School {
    protected m_scenario: Scenario;
    protected m_position: Point2;
    protected m_maxAge: number;
    protected m_type: FishType;
    protected m_ages: number[] = [];
    protected m_msy: number;
    protected m_mey: number;
    protected m_recruitTotal: number = 0;
    protected m_natDeath: number = 0;
    protected m_yield: number = 0;
    protected m_size: number;

    public constructor(p_size: number, p_msy: number, p_position: Point2, p_scenario: Scenario) {
        this.m_scenario = p_scenario;
        this.m_position = p_position;
        this.m_msy = p_msy;        
    }
    public getRecruitTotal(): number {
        return this.m_recruitTotal;
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
        return this.m_mey;
    }

    public setMey(p_mey: number) {
        this.m_mey = p_mey;
    }

    public getSize(): number {
        var size: number = 0;
        this.m_ages.forEach(function (n) {
            size += n;
        });
        return size;
    }

    public getPosition(): Point2 {
        return this.m_position;
    }

    public getAges(): number[] {
        return this.m_ages;
    }
    

    public ageAndRecruit(p_map: Map): void {
        var t = this.m_ages[this.m_ages.length - 1];
        this.m_natDeath += this.m_ages[this.m_ages.length-1];
        this.age();
        this.recruit(p_map);
    }

    private age(): void {
        var school: School = this;
        this.m_size -= this.m_ages[this.m_maxAge - 1];
        for (var i = this.m_maxAge-1; i >0; i--) {
            this.m_ages[i] = this.m_ages[i - 1];
        }
        this.m_ages[0] = 0;
    }
    public getMaxAge(): number {
        return this.m_maxAge;
    }
    protected abstract recruit(p_map:Map): void
    public abstract move(p_map: Map): void;
}