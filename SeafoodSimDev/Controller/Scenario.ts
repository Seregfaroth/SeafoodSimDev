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
        this.m_finGoal = p_json.financialScoreGoal;
        this.m_ecoGoal = p_json.environmentalScoreGoal;
        this.m_socGoal = p_json.socialScoreGoal;
        this.m_allGoal = p_json.overallscoreGoal;

        this.m_description = p_json.description;
        this.m_linkToMCA = p_json.linkToMCA;
        this.m_mapType = p_json.mapType;
        this.m_mapSize = p_json.mapSize;
        this.m_numberOfSchools = p_json.numberOfSchools;
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

}