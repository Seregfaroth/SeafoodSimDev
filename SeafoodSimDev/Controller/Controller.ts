/// <reference path = "../Model/EndScreenStats.ts"/>
enum simState { starting, running, paused, ending, fast }
class Controller {
    private m_view: MainView;
    private m_model: Model;
    private m_eventHandler: EventHandler;
    private m_timer: number;
    private m_fastTimer: number;

    private m_simState: simState;
    private m_delayPerTick: number;
    private m_fastDelayPerTick: number;
    private m_stats: EndScreenStats;
    private m_statFreq: number;
    constructor() {
        console.log("Controller loading");
        this.m_simState = simState.paused;
        this.m_delayPerTick = 1000;
        this.m_fastDelayPerTick = 1;
        this.m_statFreq = 30;
        this.m_model = new Model();
        this.m_view = new MainView(this.m_model.getMap(), this.m_model.getShipOwners(),this.m_model.getGovernment().getTaxingRate()); 
        this.m_eventHandler = new EventHandler(this);
        this.m_stats = new EndScreenStats(this.m_model);
        this.m_view.updateMainView(this.m_model);
    }
    
    public getModel(): Model {
        return this.m_model;
    }

    public getEventHandler(): EventHandler {
        return this.m_eventHandler;
    }
    public getSimState(): simState {
        return this.m_simState;
    }

    public getMainView(): MainView {
        return this.m_view;
    }
    public updateStats() {
        var biomass = 0;
        for (var sc of this.m_model.getMap().getSchools()) {
            biomass += sc.getBiomass();
        }
        this.m_stats.setBiomassPrYearAt(this.m_model.getTime() / this.m_statFreq, biomass);
    }
    public getStats(): EndScreenStats {
        return this.m_stats;
    }
    simulationTick = () => {
        //console.log("Controller running simulationtick");
        if (this.m_model.getTime() % this.m_statFreq) this.updateStats();
        if (this.m_model.getTime() > 90 * 1) {
            this.m_simState = simState.ending;
        }
        else {
            this.m_model.run();
            this.m_view.updateMainView(this.m_model);
        }
    }

    runSimulation = (p_ticks?: number) =>{
        if (this.m_simState == simState.paused || this.m_simState == simState.fast) {
            clearInterval(this.m_timer);
            this.m_timer = setInterval(this.simulationTick, 1000);
            this.m_simState = simState.running;
        }
        if (this.m_simState = simState.ending) {
            clearInterval(this.m_timer);
            this.endSimulation();
        }
    }  
    public endSimulation(): void {
        
        console.log("Simulation ended" + this.getStats() );
    }

    public pause(): void {
        if (this.m_simState == simState.running || this.m_simState == simState.fast) {
            clearInterval(this.m_timer);
            this.m_simState = simState.paused;
        }
    }

    public fastForward(): void {
        if (this.m_simState == simState.running || this.m_simState == simState.paused) {
            clearInterval(this.m_timer);
            this.m_simState = simState.fast;
            this.m_timer = setInterval(this.simulationTick, this.m_fastDelayPerTick);
            
        }
    }
}