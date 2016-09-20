class Configuration {
    
    private m_taxingRate: number;
    private m_map: Map;
    private m_shipOwner;
    private m_shipOwnerStartMoney: number;
    private m_shipPrice: number;
    private m_aiBuyShipBalance: number;
    private m_aiSellShipBalance: number;


    private m_fishingPercentage: number;

    private m_financialMaxScore: number;
    private m_environmentalMaxScore: number;
    private m_socialMaxScore: number;


    constructor() {
    }
    toJSON(): Configuration {
        var ret: Configuration;

        return ret;
    }
    fromJSON(p_object: any) {
       
        this.m_taxingRate = p_object.taxingRate;
        this.m_map = p_object.map;
        this.m_shipOwner = p_object.shipOwner;
        this.m_shipOwnerStartMoney = p_object.shipOwnerStartMoney;
        this.m_shipPrice = p_object.shipPrice;
        this.m_aiBuyShipBalance = p_object.aiShipBuyBalance;
        this.m_aiSellShipBalance = p_object.aiShipSellBalance;


        this.m_fishingPercentage = p_object.fishingPercentage;

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

    
    public getTaxingRate(): number {
        return this.m_taxingRate;
    }
    public getMap(): Map {
        return this.m_map;
    }
    public getShipOwner() {
        return this.m_shipOwner;
    }
    public getShipOwnerStartMoney(): number {
        return this.m_shipOwnerStartMoney;
    }
    public getShipPrice(): number {
        return this.m_shipPrice;
    }
    public getAiBuyShipBalance(): number {
        return this.m_aiBuyShipBalance;
    }
    public getAiSellShipBalance(): number {
        return this.m_aiSellShipBalance;
    }
    public getFinancialMaxScore(): number {
        return this.m_financialMaxScore;
    }
    public getEnvironmentalMaxScore(): number {
        return this.m_environmentalMaxScore;
    }
    public getSocialMaxScore(): number {
        return this.m_socialMaxScore;
    }
    public getFishingPercentage(): number {
        return this.m_fishingPercentage;
    }

}

