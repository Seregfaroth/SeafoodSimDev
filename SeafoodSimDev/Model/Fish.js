var Fish = (function () {
    //Types: 0 = cod, 1 = mackerel
    function Fish(p_config, p_type, p_age) {
        this.m_config = p_config;
        this.m_age = 0;
        this.m_type = p_type;
        if (p_age != undefined) {
            this.m_age = p_age;
        }
    }
    Fish.prototype.getType = function () {
        return this.m_type;
    };
    Fish.prototype.getAge = function () {
        return this.m_age;
    };
    Fish.prototype.age = function () {
        this.m_age++;
    };
    return Fish;
}());
//# sourceMappingURL=Fish.js.map