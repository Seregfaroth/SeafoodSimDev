﻿/// <reference path = "../Model/EndScreenStats.ts"/>
enum simState { starting, running, paused, ending, fast, changeSettings }
class Controller {
    private m_view: MainView;
    private m_model: Model;
    private m_eventHandler: EventHandler;
    private m_startScreenEventHandler: StartScreenEventHandler;
    private m_timer: number;
    private m_fastTimer: number;

    private m_simState: simState;
    private m_delayPerTick: number;
    private m_fastDelayPerTick: number;
    private m_stats: EndScreenStats;
    private m_endScreen: EndScreen;
    private m_intervalStats: IntervalStats;
    private m_statFreq: number;
    //private m_scenario: number;
    private m_scenario: Scenario;
    private m_endTime: number;
    private m_newSim: boolean = true;
    
    
    private m_ticksPerMove: number;
    //private m_sce: Scenario;
    constructor(p_mca?: boolean) {
        console.log("Controller loading");
        this.m_endScreen = new EndScreen();
        this.m_endScreen.hide();
        this.m_scenario = Scenario.getInstance();
        if (p_mca === true) {
            this.m_scenario.loadScenario('Controller/scenarios/scnMCA1.json', this.initMCA);
        }
        else {
            this.m_simState = simState.changeSettings;
            this.m_delayPerTick = 500;
            this.m_fastDelayPerTick = 1;
            //this.m_statFreq = 30;
            //this.m_model = new Model(this.m_scenario);
            //this.m_view = new MainView(this.m_model.getMap(), this.m_model.getShipOwners(), this.m_model.getGovernment().getTaxingRate());
            
            this.m_startScreenEventHandler = new StartScreenEventHandler(this, new StartScreen());
            this.m_startScreenEventHandler.initialize();
            //this.m_scenario.loadScenario('Controller/scenarios/scn1.json', this.m_startScreenEventHandler.updateInfo);
            //this.m_view.updateMainView(this.m_model);
        }
    }
    //public getScenario(): number {
    //    return this.m_scenario;
    //}
    //public setScenario(p_scenario: number): void {
    //    this.m_scenario = p_scenario;
    //}
    private initMCA = () => {
        this.setModelMCA(new Model());
        this.m_model.runMCA(this.m_scenario.getDefaultNoDays());
    }
    public getTicksPerMove(): number {
        return this.m_ticksPerMove;
    }
    public setTicksPerMove(p_tpm: number) {
        this.m_ticksPerMove = p_tpm;
    }
    public getScenario(): Scenario {
        return this.m_scenario;
    }
    public setScenario(p_scenario: Scenario): void {
        this.m_scenario = p_scenario;
    }
    public getModel(): Model {
        return this.m_model;
    }
    public setModelMCA(p_model: Model) {
        this.m_model = p_model;
    }
    public setModel(p_model: Model) {
        this.m_model = p_model;
        this.m_view = new MainView(this.m_model.getMap(), this.m_model.getShipOwners(), this.m_model.getGovernment().getTaxingRate(),this.m_scenario);
        this.m_eventHandler = new EventHandler(this);
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
    public setMainView(p_view: MainView) {
        this.m_view = p_view;
    }
    public setEndTime(p_endTime: number): void {
        this.m_endTime = p_endTime;
    }
    public getEndtime(): number {
        return this.m_endTime;
    }


    public restart = (): void => {
        $("#endDialogDiv").hide();
        $("#startScreen").dialog({
            minWidth: 1100,
            minHeight: 700,
            modal: true
        });
        this.m_eventHandler.bindFunctions(true);
        this.m_simState = simState.paused;
        clearInterval(this.m_timer);
        $("#startButton").removeClass("marked");
        $("#fastForwardButton").removeClass("marked");
        $("#pauseButton").addClass("marked");

        $("#scenario1Label").removeClass("ui-state-focus");//This is hardcoded to prevent scenario 1 from being checked by default
        this.m_newSim = true;
    }

    simulationTick = () => {
        //console.log("Controller running simulationtick");

        
        if (this.m_model.getTime() >= this.m_scenario.getDefaultNoDays()) {
            this.m_simState = simState.ending;
            this.m_model.updateStats();
            console.log("Simulation ended" + this.m_model.getStats());
            clearInterval(this.m_timer);
            this.m_eventHandler.unBindFunctions(true);

            //this.m_endScreen.addSimulation(this.m_model.getStats(), this.m_model);
            this.m_endScreen.show();
            //$("#endDialogDiv").dialog({
            //    close: this.closeEndScreen
            //});
            
        }
        //The second condition makes sure the break screen is not shown at the end of the simulaiton
        else if (!((this.m_model.getTime() + 1) % this.m_scenario.getStatFreq()) && this.m_model.getTime() < this.m_scenario.getDefaultNoDays()-1) {
            //The reason for running model once more is that otherwise time would not change
            //and we would get in here in next iteration as well
            this.m_model.run(this.m_ticksPerMove);

            this.m_simState = simState.changeSettings;
            clearInterval(this.m_timer);
            this.m_eventHandler.bindFunctions(false);
            
            //this.m_model.updateStats();
            if (this.m_newSim) {
                
                this.m_endScreen.addSimulation(this.m_model.getStats(), this.m_model);
                this.m_newSim = false;  
            }
            //this.m_intervalStats = new IntervalStats(this.m_model.getStats(), this.m_model);
            $("#startSim").text("Continue Simulation");
            $("#startSim").css("display", "initial");
            $(".fa").css("display", "none");

            //this.getMainView().getIntervalStats().update(this.m_model.getTime());
            //this.m_intervalStats.update(this.m_model.getTime());
            this.m_endScreen.drawCharts(this.m_model, this.m_model.getStats());
            this.m_endScreen.show();
            //$("#intervalStats").dialog({
            //    buttons: {
            //        Ok: function () {
            //            $(this).dialog("close"); //closing on Ok click
            //        }
            //    },
            //    modal: true,
            //    width: 1111,
            //    height: 777
            //});
        }
        else {
            this.m_model.run(this.m_ticksPerMove);
        }
        this.m_view.updateMainView(this.m_model);
    }
    private closeEndScreen = (): void => {
        //$("#endDialogDiv").empty().remove();
        //console.log("closing endscreen");
        this.restart();
    }
    runSimulation = (p_ticks?: number) => {
        if (this.m_simState == simState.paused || this.m_simState == simState.fast || this.m_simState == simState.changeSettings) {
            if (this.m_simState == simState.changeSettings) {//If new interval has begun
                this.m_view.updateMap(this.m_model.getMap());
            }
            clearInterval(this.m_timer);
            this.m_timer = setInterval(this.simulationTick, this.m_delayPerTick);
            this.m_simState = simState.running;
        }
        /*if (this.m_simState = simState.ending) {
            clearInterval(this.m_timer);
            this.m_view.updateMainView(this.m_model);
            this.endSimulation();
        }*/
    }

    public endSimulation(): void {

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
    public resizeWindow = (): void => {
        this.m_view.resizeWindow();
    }

    
}
