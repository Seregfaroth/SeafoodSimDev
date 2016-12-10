class StartScreenEventHandler {
    private m_controller: Controller;
    //private m_scenario: Scenario;
    private m_startScreen: StartScreen;

    constructor(p_controller: Controller, p_startScreen: StartScreen) {
        this.m_controller = p_controller;
        this.m_startScreen = p_startScreen;
        //this.m_scenario = Scenario.getInstance();
        
        var handler: StartScreenEventHandler = this;
        $("#startScreen").dialog({
            buttons: {
                Ok: handler.close
            },
            close: handler.close,
            beforeClose: handler.beforeClose
        });
        this.m_controller.getScenario().loadScenario('Controller/scenarios/scn1.json', this.m_startScreen.updateInfo);
    }

    public initialize(): void {
        $("#scenario1").on("change", { scenario: 1 }, this.radioChange);
        $("#scenario2").on("change", { scenario: 2 }, this.radioChange);
        $("#scenario3").on("change", { scenario: 3 }, this.radioChange);
    }
    private radioChange = (p_evt: BaseJQueryEventObject): void => {
        var t = this;
        var t2 = this.m_controller.getScenario();
        if (p_evt.data.scenario === 1) this.m_controller.getScenario().loadScenario('Controller/scenarios/scn1.json', this.m_startScreen.updateInfo);
        if (p_evt.data.scenario === 2) this.m_controller.getScenario().loadScenario('Controller/scenarios/scn2.json', this.m_startScreen.updateInfo);
        if (p_evt.data.scenario === 3) this.m_controller.getScenario().loadScenario('Controller/scenarios/scn3.json', this.m_startScreen.updateInfo);
    }
    private close = () => {
        $("#startScreen").dialog("close");
    }

    private beforeClose = (e: JQueryEventObject): void => {
        this.m_controller.setModel(new Model());
        this.m_controller.getMainView().updateMainView(this.m_controller.getModel());
        this.m_controller.getMainView().getMapMenu().updateMsy(this.m_controller.getModel());
    }
    
}