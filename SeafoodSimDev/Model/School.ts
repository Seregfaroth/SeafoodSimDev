// <reference path = "../../TSSeafoodSimDev/externals/wrappers.d.ts"/>
/// <reference path="Fish.ts"/>
abstract class School {
    protected m_position: Point2;
    protected m_maxAge: number;
    protected m_type: FishType;
    protected m_ages: number[] = [];

    public constructor(p_size: number, p_position: Point2) {
        this.m_position = p_position;
        
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
    

    public live(p_map: Map): void {
        this.move(p_map);
        this.age();
        this.recruit(p_map);
    }

    private age(): void {
        var school: School = this;
        for (var i = this.m_maxAge-1; i >0; i--) {
            this.m_ages[i] = this.m_ages[i - 1];
        }
        this.m_ages[0] = 0;
    }
    public getMaxAge(): number {
        return this.m_maxAge;
    }
    protected abstract recruit(p_map:Map): void
    protected abstract move(p_map: Map): void;
}