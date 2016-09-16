class Configuration {
    private m_prices;
    private m_taxingRate;
    private m_map;
    private m_shipOwner;
    private m_shipOwnerStartMoney;
    private m_shipPrice;
    private m_aiBuyShipBalance;
    private m_aiSellShipBalance;

    private m_schoolsInOnePlace;
    private m_schoolSize;
    private m_schoolMsy;

    private m_financialMaxScore;
    private m_environmentalMaxScore;
    private m_socialMaxScore;

    constructor() {
    }
    toJSON(): Configuration {
        var ret: Configuration;

        return ret;
    }
    fromJSON(p_object: any) {
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


    }
    public loadConfig = (p_path: string, p_callBack: Function) => {
        jQuery.getJSON(p_path, (data) => {
            this.fromJSON(data);
            p_callBack();
        });
    }
}