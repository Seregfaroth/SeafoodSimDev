var Configuration = (function () {
    function Configuration() {
        var _this = this;
        this.loadConfig = function (p_path, p_callBack) {
            jQuery.getJSON(p_path, function (data) {
                _this.fromJSON(data);
                p_callBack();
            });
        };
    }
    Configuration.prototype.toJSON = function () {
        var ret;
        return ret;
    };
    Configuration.prototype.fromJSON = function (p_object) {
        this.m_prices = p_object.prices;
        this.m_taxingRate = p_object.taxingRate;
        this.m_map = p_object.map;
        this.m_shipOwner = p_object.shipOwner;
        this.m_shipOwnerStartMoney = p_object.shipOwnerStartMoney;
        this.m_shipPrice = p_object.shipPrice;
        this.m_aiBuyShipBalance = p_object.aiShipBuyBalance;
        this.m_aiSellShipBalance = p_object.aiShipSellBalance;
        this.m_schoolsInOnePlace = p_object.schoolsInOnePlace;
        this.m_schoolSize = p_object.schoolSize;
        this.m_schoolMsy = p_object.schoolMsy;
        this.m_financialMaxScore = p_object.financialMaxScore;
        this.m_environmentalMaxScore = p_object.environmentalMaxScore;
        this.m_socialMaxScore = p_object.socialMaxScore;
    };
    return Configuration;
}());
//# sourceMappingURL=Configuration.js.map