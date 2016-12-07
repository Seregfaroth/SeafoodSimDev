var CarryingCapacity = (function () {
    function CarryingCapacity(p_fishGroups, p_groupCarryingCapacity) {
        this.m_fishGroups = p_fishGroups;
        this.m_groupCarryingCapacity = p_groupCarryingCapacity;
    }
    CarryingCapacity.prototype.getCapacityGroupNames = function (p_group) {
        var ret;
        for (var _i = 0, _a = this.m_fishGroups; _i < _a.length; _i++) {
            var group = _a[_i];
            if (group.m_name === p_group)
                ret = group;
        }
        if (ret == undefined)
            throw ("Group name does not exist");
        return ret;
    };
    CarryingCapacity.prototype.getCapacityGroupNumbers = function (p_group) {
        var ret = 0;
        var index = 0;
        for (var _i = 0, _a = this.m_fishGroups; _i < _a.length; _i++) {
            var group = _a[_i];
            if (group.m_name === p_group) {
                ret = this.m_groupCarryingCapacity[index];
                break;
            }
            index++;
        }
        return ret;
    };
    return CarryingCapacity;
}());
//# sourceMappingURL=CarryingCapacity.js.map