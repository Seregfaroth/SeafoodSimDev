// <reference path = "../../TSSeafoodSimDev/externals/wrappers.d.ts"/>
/// <reference path="Fish.ts"/>
abstract class School {
    protected m_position: Point2;
    protected m_fish: Fish[];
    protected m_maxAge: number;
    protected m_typeNumber: number;


    public constructor(p_size: number, p_position: Point2) {
        this.m_position = p_position;
        this.m_fish = [];
    }

    public getSize(): number {
        return this.m_fish.length;
    }

    public getPosition(): Point2 {
        return this.m_position;
    }

    public getFish(): Fish[] {
        return this.m_fish;
    }

    public shuffleFish(): void {
        var i: number;
        var j: number;
        var fishPlaceholder: Fish;
        for (i = this.m_fish.length; i; i--) {
            j = Math.floor(Math.random() * i);
            fishPlaceholder = this.m_fish[i - 1];
            this.m_fish[i - 1] = this.m_fish[j];
            this.m_fish[j] = fishPlaceholder;
        }
    }

    public live(p_map: Map): void {
        this.move(p_map);
        this.age();
        this.recruit(p_map);
    }

    private age(): void {
        var school: School = this;
        this.m_fish.forEach(function (f, index, array) {
            var f: Fish = array[index];
            if (f.getAge() === school.m_maxAge) {
                array.splice(index, 1);
            }
            else {
                f.age();
            }
        });
    }
    public getMaxAge(): number {
        return this.m_maxAge;
    }
    protected abstract recruit(p_map:Map): void
    protected abstract move(p_map: Map): void;
}