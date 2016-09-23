class StartScreenEventHandler {
    private m_controller: Controller;
    private m_scenario: Scenario;

    constructor(p_controller: Controller, p_scenario: Scenario) {
        this.m_controller = p_controller;
        this.m_scenario = p_scenario;

        $("#scenario1").on("change", { scenario: 1 }, this.radioChange);
        $("#scenario2").on("change", { scenario: 2 }, this.radioChange);
        $("#scenario3").on("change", { scenario: 3 }, this.radioChange);

        $('[name="radio"][value="false"]').attr("checked", 'true');
        $('#chooseScenario').buttonset();
        var handler: StartScreenEventHandler = this;
        $("#startScreen").dialog({
            buttons: {
                Ok: handler.close
            },
            close: handler.close,
            beforeClose: handler.beforeClose
        });
        this.m_controller.getScenario().loadScenario('Controller/scenarios/scn1.json', this.updateInfo);
    }

    private radioChange = (p_evt: BaseJQueryEventObject): void => {
        var t = this;
        var t2 = this.m_controller.getScenario();
        if (p_evt.data.scenario === 1) this.m_controller.getScenario().loadScenario('Controller/scenarios/scn1.json', this.updateInfo);
        if (p_evt.data.scenario === 2) this.m_controller.getScenario().loadScenario('Controller/scenarios/scn2.json', this.updateInfo);
        if (p_evt.data.scenario === 3) this.m_controller.getScenario().loadScenario('Controller/scenarios/scn3.json', this.updateInfo);
        //$("#information").text(this.m_controller.getScenario().getName());
        //$("#information").text("Here is some information about scenario " + p_evt.data.scenario +". What is "+
        //    "the purpose of this scenario and how to win in this scenario.");
    }
    private close = () => {
        $("#startScreen").dialog("close");
    }

    private beforeClose = (e: JQueryEventObject): void => {
        var tm3 = e;
        //$("#startScreen").dialog("close");
        var scenario = this.m_controller.getScenario();
        this.m_controller.setEndTime($("#endTime").val());
        this.m_controller.setTicksPerMove($("#movesPerTick").val());
        //var tm = this.m_controller.getModel().getMap();
        //this.m_controller.getModel().setMap(new Map(scenario.getMapType(), scenario.getMapSize(), scenario.getNumberOfSchools(), this.m_controller.getModel().getGovernment().getRestrictions(), this.m_config));

        //this.m_controller.getModel().getMap().setScenario(scenario);
        this.m_controller.setModel(new Model(scenario));
        //this.m_controller.getModel().getMap().setScenario(scenario);
        //var tm2 = this.m_controller.getModel().getMap();
        //new MainView(this.m_model.getMap(), this.m_model.getShipOwners(), this.m_model.getGovernment().getTaxingRate());
        //this.m_controller.setMainView(new MainView(this.m_controller.getModel().getMap(), this.m_controller.getModel().getShipOwners(), this.m_controller.getModel().getGovernment().getTaxingRate()));
        //this.m_controller.getMainView().updateMainView(this.m_controller.getModel());
        //this.m_controller.getMainView().changeMap(this.m_controller.getModel().getMap());
        this.m_controller.getMainView().updateMainView(this.m_controller.getModel());
    }
    public updateInfo = () => {
        var scenario = this.m_controller.getScenario();
        var t = $("#endTime");
        (document.getElementById("endTime") as HTMLInputElement).value = scenario.getDefaultNoDays().toString();
        //$("#endTime").val(scenario.getDefaultNoDays().toString());
        var t3 = $("#endTime").val();
        (document.getElementById("movesPerTick") as HTMLInputElement).value = scenario.getDefaultTicksize().toString();
        var t4 = scenario.getName();
        var t32 = scenario.getDescription();
        $("#name").html(scenario.getName());
        $("#des").html(scenario.getDescription());
        $("#link").html("<a target='_blank' href='" + scenario.getLink() + "'>" + scenario.getLink() + "</a>");
        var goal = $("#goal");
        goal.html("");
        goal.append("<p>");
        if (this.m_scenario.getfinGoal().toString() != "no")
            goal.append("Financial score goal: <span style='float:right' > " + scenario.getfinGoal() + "</span><br/>");
        if (this.m_scenario.getEcoGoal().toString() != "no")
            goal.append("Environmental score goal: <span style='float:right' > " + scenario.getEcoGoal() + "</span><br/>");
        if (this.m_scenario.getSocGoal().toString() != "no")
            goal.append("Social score goal: <span style='float:right' > " + scenario.getSocGoal() + "</span><br/>");
        if (this.m_scenario.getAllScore().toString() != "no")
            goal.append("Overall score goal: <span style='float:right' > " + scenario.getAllScore() + "</span><br/>");
        //$("#goal").html("<p>Financial score goal: <span style='float:right'>" + scenario.getfinGoal()
        //    + "</span><br/>Environmental score goal: <span style='float:right'>" + scenario.getEcoGoal()
        //    + "</span><br/>Social score goal: <span style='float:right'>" + scenario.getSocGoal() + "</span></p>");
        goal.append("</p>");
    }
}