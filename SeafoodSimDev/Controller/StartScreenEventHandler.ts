class StartScreenEventHandler {
    private m_controller: Controller;

    constructor(p_controller: Controller) {
        this.m_controller = p_controller;

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
            close: handler.close
        });
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

    private close = (): void => {
        $("#startScreen").dialog("close");
        this.m_controller.setEndTime($("#endTime").val());
        this.m_controller.setTickPerMove($("#movesPerTick").val());

    }
    private updateInfo = () => {
        var scenario = this.m_controller.getScenario();
        $("#information").text("hello");
        $("#name").text(scenario.getName());
        $("#des").text(scenario.getDescription());
    }
}