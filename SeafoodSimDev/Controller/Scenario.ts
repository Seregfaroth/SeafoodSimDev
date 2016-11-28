class Scenario {
    private m_maxNoDaysFishing: number; //Maximum number of days a ship should fish at the same position
    private m_schoolSizeWeight: number;
    private m_startNoCodShips: number;
    private m_startNoMackerelShips: number;
    private m_noOfShipOwners: number;
    private m_movingRadius: number;
    private m_recrutingPercentage: number;

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
    private m_recruitAndAgeFreq: number;
    private m_statFreq: number;
    private m_noOfMenPerShip: number;
    private m_shipPrice: number;

    private m_defaultNoDays: number;
    private m_defaultTickSize: number;

    private m_taxingRate: number;
    private m_shipOwner;

    private m_aiBuyShipBalance: number;
    private m_aiSellShipBalance: number;
    private m_shipOwnerStartBalance: number;

    private m_subFinancialWeight: number;
    private m_subEnvironmentalWeight: number;
    private m_subSocialWeight: number;
    private m_indicatorInvestmentWeight: number;
    private m_indicatorIncomeWeight: number;
    private m_indicatorBiomassWeight: number;
    private m_indicatorRecruitmentWeight: number;
    private m_indicatorOnshoreEmployment: number;
    private m_indicatorOffshoreEmployment: number;

    private m_fishingPercentage: number;

    private m_financialMaxScore: number;
    private m_environmentalMaxScore: number;
    private m_socialMaxScore: number;
    private m_financialMinScore: number;
    private m_environmentalMinScore: number;
    private m_socialMinScore: number;

    private m_landsiteShipCapacity: number;
    private m_landsiteResourceCapacity: number;
    private m_landsiteProcessPerDay: number;
    private m_landsiteRunningCost: number;
    private m_landsiteNumberOfEmployees: number;

    private m_fuelsiteShipCapacity: number;
    private m_fuelsiteResourceCapacity: number;
    private m_fuelsiteProcessPerDay: number;
    private m_fuelsiteRunningCost: number;
    private m_fuelsiteFuelPrize: number;
    private m_fuelsiteNumberOfEmployees: number;


    private m_oceanShipCapacity: number;

    private m_environmentalScoreMaxIncreasePerTick: number;

    private m_codMovingRadius: number;
    private m_codRecruitPercent: number;
    private m_codSchoolMaxAge: number;

    private m_mackerelScoolMaxAge: number;

    private m_modelStatFreq: number;
    private m_modelRecruitAndAgeFreq: number;
    private m_noOfEmployeesPerShip: number;
    private m_noOfEmployeesOnLandPerShip: number;

    private m_shipFuelCapacity: number;
    private m_shipCargoCapacity: number;
    private m_shipFuelPerMove: number;
    private m_shipMovesPerTick: number;
    private m_shipFuelPerFishingTick: number;

    private m_shipOwnerStartMoney: number;
    private m_shipOwnerShipPrice: number;
    private m_shipOwnerLicense: boolean;

    private m_noGraphicsMapUpdate: boolean;
    private m_noMenuDateUpdate: boolean;
    private m_noMenuScoreUpdate: boolean;

    private m_noHistory: boolean;
    private static ms_instance: Scenario;

    constructor() {
        if (Scenario.ms_instance) {
            throw ("Cannot create new scenario. Use get Scenario.getInstance()");
        }
    }

    public static getInstance(): Scenario {
        if (Scenario.ms_instance)
            return Scenario.ms_instance;
        else {
            Scenario.ms_instance = new Scenario();
            return Scenario.ms_instance;
        }
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
        this.m_maxNoDaysFishing = p_json.maxNoDaysFishing;
        this.m_schoolSizeWeight = p_json.schoolSizeWeight;
        this.m_startNoCodShips = p_json.startNoCodShips;
        this.m_startNoMackerelShips = p_json.startNoMackerelShips;
        this.m_movingRadius = p_json.movingRadius;
        this.m_recrutingPercentage = p_json.recrutingPercentage;
        this.m_noOfShipOwners = p_json.noOfShipOwners
        this.m_name = p_json.name;
        this.m_prices = p_json.prices;
        this.m_prices = {};
        this.m_prices[FishType.cod] = p_json.prices.Cod;
        this.m_prices[FishType.mackerel] = p_json.prices.Mackerel;

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
        this.m_recruitAndAgeFreq = p_json.recruitAndAgeFreq;
        this.m_statFreq = p_json.statFreq;
        this.m_noOfEmployeesOnLandPerShip = p_json.noOfEmployeesOnLandPerShip;
        this.m_noOfMenPerShip = p_json.noOfMenPerShip;
        this.m_shipPrice = p_json.shipPrice;

        this.m_defaultNoDays = p_json.defaultNoDays;
        this.m_defaultTickSize = p_json.defaultTickSize;

        this.m_taxingRate = p_json.taxingRate;
        this.m_map = p_json.map;
        this.m_shipOwner = p_json.shipOwner;
        this.m_shipOwnerStartMoney = p_json.shipOwnerStartMoney;
        this.m_shipOwnerShipPrice = p_json.shipPrice;
        this.m_aiBuyShipBalance = p_json.aiShipBuyBalance;
        this.m_aiSellShipBalance = p_json.aiShipSellBalance;
        this.m_shipOwnerStartBalance = p_json.shipOwnerStartBalance;

        this.m_subFinancialWeight = p_json.subFinancialWeight;
        this.m_subEnvironmentalWeight = p_json.subEnvironmentalWeight;
        this.m_subSocialWeight = p_json.subSocialWeight;
        this.m_indicatorInvestmentWeight = p_json.indicatorInvestmentWeight;
        this.m_indicatorIncomeWeight = p_json.indicatorIncomeWeight;
        this.m_indicatorBiomassWeight = p_json.indicatorBiomassWeight;
        this.m_indicatorRecruitmentWeight = p_json.indicatorRecruitmentWeight;
        this.m_indicatorOnshoreEmployment = p_json.indicatorOnshoreEmployment;
        this.m_indicatorOffshoreEmployment = p_json.indicatorOffshoreEmployment;

        this.m_fishingPercentage = p_json.fishingPercentage;

        this.m_financialMaxScore = p_json.financialMaxScore;
        this.m_environmentalMaxScore = p_json.environmentalMaxScore;
        this.m_socialMaxScore = p_json.socialMaxScore;
        this.m_financialMinScore = p_json.financialMinScore;
        this.m_environmentalMinScore = p_json.environmentalMinScore;
        this.m_socialMinScore = p_json.socialMinScore;

        this.m_landsiteShipCapacity = p_json.landsiteShipCapacity;
        this.m_landsiteResourceCapacity = p_json.landsiteResourceCapacity;
        this.m_landsiteProcessPerDay = p_json.landsiteProcessPerDay;
        this.m_landsiteRunningCost = p_json.landsiteRunningCost;
        this.m_landsiteNumberOfEmployees = p_json.landsiteNumberOfEmployees;

        this.m_fuelsiteShipCapacity = p_json.fuelsiteShipCapacity;
        this.m_fuelsiteResourceCapacity = p_json.fuelsiteResourceCapacity;
        this.m_fuelsiteProcessPerDay = p_json.fuelsiteProcessPerDay;
        this.m_fuelsiteRunningCost = p_json.fuelsiteRunningCost;
        this.m_fuelsiteFuelPrize = p_json.fuelsiteFuelPrize;
        this.m_fuelsiteNumberOfEmployees = p_json.fuelsiteNumberOfEmployees;

        this.m_oceanShipCapacity = p_json.oceanShipCapacity;

        this.m_environmentalScoreMaxIncreasePerTick = p_json.environmentalScoreMaxIncreasePerTick;
        this.m_codMovingRadius = p_json.codMovingRadius ;
        this.m_codRecruitPercent = p_json.codRecruitPercent;
        this.m_codSchoolMaxAge = p_json.codSchoolMaxAge;

        this.m_mackerelScoolMaxAge = p_json.mackerelSchoolMaxAge;

        this.m_modelStatFreq = p_json.modelStatFreq;
        this.m_modelRecruitAndAgeFreq = p_json.modelRecruitAndAgeFreq;
        this.m_noOfEmployeesPerShip = p_json.noOfEmployeesPerShip;

        this.m_shipFuelCapacity = p_json.shipFuelCapacity;
        this.m_shipCargoCapacity = p_json.shipCargoCapacity;
        this.m_shipFuelPerMove = p_json.shipFuelPerMove;
        this.m_shipMovesPerTick = p_json.shipMovesPerTick;
        this.m_shipFuelPerFishingTick = p_json.shipFuelPerFishingTick;

        this.m_shipOwnerStartMoney = p_json.shipOwnerStartMoney;
        //this.m_shipOwnerShipPrice = p_json.shipOwnerShipPrice;
        this.m_shipOwnerLicense = p_json.shipOwnerLicense;

        this.m_noGraphicsMapUpdate = p_json.noGraphicsMapUpdate;
        this.m_noMenuDateUpdate = p_json.noMenuDateUpdate;
        this.m_noMenuScoreUpdate = p_json.noMenuScoreUpdate;

        this.m_noHistory = p_json.noHistory;
    }
    public setTaxrate(p_taxRate: number) {
        this.m_taxingRate = p_taxRate;
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
    public getTaxingRate(): number {
        return this.m_taxingRate;
    }
    public getMap(): Map {
        return this.m_map;
    }
    public getShipOwner() {
        return this.m_shipOwner;
    }
    public getShipPrice(): number {
        return this.m_shipOwnerShipPrice;
    }
    public getAiBuyShipBalance(): number {
        return this.m_aiBuyShipBalance;
    }
    public getAiSellShipBalance(): number {
        return this.m_aiSellShipBalance;
    }
    public getSubFinancialWeight() {
        return this.m_subFinancialWeight;
    }
    public getSubEnvironmentalWeight() {
        return this.m_subEnvironmentalWeight;
    }
    public getSubSocialWeight() {
        return this.m_subSocialWeight;
    }
    public getIndicatorInvestmentWeight() {
        return this.m_indicatorInvestmentWeight;
    }
    public getIndicatorIncomeWeight() {
        return this.m_indicatorIncomeWeight;
    }
    public getIndicatorBiomassWeight() {
        return this.m_indicatorBiomassWeight;
    }
    public getIndicatorRecruitmentWeight() {
        return this.m_indicatorRecruitmentWeight;
    }
    public getIndicatorOnshoreEmployment() {
        return this.m_indicatorOnshoreEmployment;
    }
    public getIndicatorOffshoreEmployment() {
        return this.m_indicatorOffshoreEmployment;
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
    public getFinancialMinScore(): number {
        return this.m_financialMinScore;
    }
    public getEnvironmentalMinScore(): number {
        return this.m_environmentalMinScore;
    }
    public getSocialMinScore(): number {
        return this.m_socialMinScore;
    }
    public getLandsiteShipCapacity(): number {
        return this.m_landsiteShipCapacity;
    }
    public getLandsiteResourceCapacity(): number {
        return this.m_landsiteResourceCapacity;
    }
    public getLandsiteProcessPerDay(): number {
        return this.m_landsiteProcessPerDay;
    }
    public getLandsiteRunningCost(): number {
        return this.m_landsiteRunningCost;
    }
    public getLandsiteNumberOfEmployees(): number {
        return this.m_landsiteNumberOfEmployees;
    }
    public getFuelsiteShipCapacity(): number {
        return this.m_fuelsiteShipCapacity;
    }
    public getFuelsiteResourceCapacity(): number {
        return this.m_fuelsiteResourceCapacity;
    }
    public getFuelsiteProcessPerDay(): number {
        return this.m_fuelsiteProcessPerDay;
    }
    public getFuelsiteRunningCost(): number {
        return this.m_fuelsiteRunningCost;
    }
    public getFuelsiteFuelPrize(): number {
        return this.m_fuelsiteFuelPrize;
    }
    public getFuelsiteNumberOfEmployees(): number {
        return this.m_fuelsiteNumberOfEmployees;
    }

    public getEnvironmentalScoreMaxIncreasePerTick(): number {
        return this.m_environmentalScoreMaxIncreasePerTick;
    }
    public getCodMovingRadius(): number {
        return this.m_codMovingRadius;
    }
    public getCodRecruitPercent(): number {
        return this.m_codRecruitPercent;
    }
    public getCodSchoolMaxAge(): number {
        return this.m_codSchoolMaxAge;
    }
    public getMackerelSchoolMaxAge(): number {
        return this.m_mackerelScoolMaxAge;
    }

    public getModelStatFreq(): number {
        return this.m_modelStatFreq;
    }
    public getModelRecruitAndAgeFreq(): number {
        return this.m_modelRecruitAndAgeFreq;
    }
    public getNoOfEmployeesPerShip(): number {
        return this.m_noOfEmployeesPerShip;
    }
    public getNoOfEmployeesOnLandPerShip(): number {
        return this.m_noOfEmployeesOnLandPerShip;
    }
    public getShipFuelCapacity(): number {
        return this.m_shipFuelCapacity;
    }
    public getShipCargoCapacity(): number {
        return this.m_shipCargoCapacity;
    }
    public getShipFuelPerMove(): number {
        return this.m_shipFuelPerMove;
    }
    public getShipMovesPerTick(): number {
        return this.m_shipMovesPerTick;
    }
    public getFuelFishingPerTick(): number {
        return this.m_shipFuelPerFishingTick;
    }

    public getShipOwnerStartMoney(): number {
        return this.m_shipOwnerStartMoney;
    }
    public getShipOwnerShipPrice(): number {
        return this.m_shipOwnerShipPrice;
    }
    public getShipOwnerLicense(): boolean {
        return this.m_shipOwnerLicense;
    }
    public getRecruitAndAgeFreq(): number {
        return this.m_recruitAndAgeFreq;
    }
    public getStatFreq(): number {
        return this.m_statFreq;
    }
    public getNoOfMenPerShip(): number {
        return this.m_noOfMenPerShip;
    }
    public getShipOwnerStartBalance(): number {
        return this.m_shipOwnerStartBalance;
    }
    public getNoOfShipOwners(): number {
        return this.m_noOfShipOwners;
    }
    public getMovingRadius(): number {
        return this.m_movingRadius;
    }
    public getRecrutingPercentage(): number {
        return this.m_recrutingPercentage;
    }
    public getStartNoCodShips(): number {
        return this.m_startNoCodShips;
    }
    public getStartNoMackerelShips(): number {
        return this.m_startNoMackerelShips;
    }
    public getNoGraphicsMapUpdate(): boolean {
        return this.m_noGraphicsMapUpdate;
    }
    public getNoMenuDateUpdate(): boolean {
        return this.m_noMenuDateUpdate;
    }
    public getNoMenuScoreUpdate(): boolean {
        return this.m_noMenuScoreUpdate;
    }
    public getSchoolSizeWeight(): number {
        return this.m_schoolSizeWeight;
    }
    public getMaxNoDaysFishing(): number {
        return this.m_maxNoDaysFishing;
    }
    public getNoHistory(): boolean {
        return this.m_noHistory;
    }
    public getOceanShipCapacity(): number {
        return this.m_oceanShipCapacity;
    }
}