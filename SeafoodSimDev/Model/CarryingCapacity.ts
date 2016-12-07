class CarryingCapacity {
    public m_fishGroups: FishGroup[];
    public m_groupCarryingCapacity: number[];

    constructor(p_fishGroups: FishGroup[], p_groupCarryingCapacity: number[]) {
        this.m_fishGroups = p_fishGroups;
        this.m_groupCarryingCapacity = p_groupCarryingCapacity;
    }

    getCapacityGroupNames(p_group: string): FishGroup {
        var ret: FishGroup;
        for (var group of this.m_fishGroups) {
            if (group.m_name === p_group)
                ret = group;
        }
        if (ret == undefined) throw ("Group name does not exist");

        return ret;
    }
    getCapacityGroupNumbers(p_group: string) : number{
        var ret: number = 0;
        var index: number = 0;
        for (var group of this.m_fishGroups) {
            if (group.m_name === p_group) {
                ret = this.m_groupCarryingCapacity[index];
                break;
            }
            index++;
        }
        return ret;
    }
}