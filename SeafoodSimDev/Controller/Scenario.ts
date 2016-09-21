class Scenario {
    private m_name: string;
    private m_map: Map;

    private m_finGoal: number;
    private m_ecoGoal: number;
    private m_socGoal: number;
    private m_allGoal: number;

    private m_description: string;

    private m_linkToMCA: string;

    private m_mapType: number;
    private m_mapSize: number;
    private m_numberOfSchools: number;
    private m_prices: { [fishType: number]: number };
    private m_oceanFishCapacity: number;
    private m_schoolsInOnePlace: number;
    private m_schoolSize: number;
    private m_schoolMsy;
    private m_schoolMinimum: number;
    private m_schoolMaximum: number;

    private m_defaultNoDays: number;
    private m_defaultTickSize: number;
    constructor() {       
        //this.m_name = "no";
    }
    public loadScenario(p_path: string, p_callBack: Function) {
        var path: string = 'scn1.json';
        var scn: Scenario = this;
        jQuery.getJSON(p_path, function (data) {
            var p = 0;
            console.log("jjson");
            scn.fromJson(data);
            p_callBack();
        }).fail(function (jqxhr, textStatus, error) {
            var err = textStatus + ", " + error;
            var j = jqxhr;
            console.log("Request Failed: " + err);
        });
    }
    public fromJson(p_json: any): void {
        this.m_name = p_json.name;
        this.m_prices = p_json.prices;
        this.m_prices = {};
        this.m_prices[FishType.Cod] = p_json.prices[0].Cod;
        this.m_prices[FishType.Mackerel] = p_json.prices[0].Mackerel;

        this.m_finGoal = p_json.financialScoreGoal;
        this.m_ecoGoal = p_json.environmentalScoreGoal;
        this.m_socGoal = p_json.socialScoreGoal;
        this.m_allGoal = p_json.overallscoreGoal;

        this.m_description = p_json.description;
        this.m_linkToMCA = p_json.linkToMCA;
        this.m_mapType = p_json.mapType;
        this.m_mapSize = p_json.mapSize;
        this.m_numberOfSchools = p_json.numberOfSchools;
        this.m_oceanFishCapacity = p_json.oceanFishCapacity;
        this.m_schoolsInOnePlace = p_json.schoolsInOnePlace;
        this.m_schoolSize = p_json.schoolSize;
        this.m_schoolMsy = p_json.schoolMsy;
        this.m_schoolMinimum = p_json.schoolMinimum;
        this.m_schoolMaximum = p_json.schoolMaximum;

        this.m_defaultNoDays = p_json.defaultNoDays;
        this.m_defaultTickSize = p_json.defaultTickSize;
    }
    public getName(): string {
        return this.m_name;
    }
    public getDescription(): string {
        return this.m_description;
    }
    public getfinGoal(): number {
        return this.m_finGoal;
    }
    public getEcoGoal(): number {
        return this.m_ecoGoal;
    }
    public getSocGoal(): number {
        return this.m_socGoal;
    }
    public getAllScore(): number {
        return this.m_allGoal;
    }
    public getLink(): string {
        return this.m_linkToMCA;
    }
    public getMapType(): number {
        return this.m_mapType;
    }
    public getMapSize(): number {
        return this.m_mapSize;
    }
    public getNumberOfSchools(): number {
        return this.m_numberOfSchools;
    }
    public getPrices(): { [fishType: number]: number } {
        return this.m_prices;
    }
    public getOceanFishCapacity(): number {
        return this.m_oceanFishCapacity;
    }
    public getSchoolsInOnePlace(): number {
        return this.m_schoolsInOnePlace;
    }
    public getSchoolSize(): number {
        return this.m_schoolSize;
    }
    public getSchoolMsy() {
        return this.m_schoolMsy;
    }
    public getSchoolMinimum(): number {
        return this.m_schoolMinimum;
    }
    public getSchoolMaximum(): number {
        return this.m_schoolMaximum;
    }
    public getDefaultNoDays(): number {
        return this.m_defaultNoDays;
    }
    public getDefaultTicksize(): number {
        return this.m_defaultTickSize;
    }
}