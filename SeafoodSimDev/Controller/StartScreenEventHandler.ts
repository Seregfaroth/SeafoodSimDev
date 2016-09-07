class StartScreenEventHandler {
    private m_controller: Controller;

    constructor(p_controller: Controller) {
        this.m_controller = p_controller;

        $("#scenario1").on("change", { scenario: 1 }, this.radioChange);
        $("#scenario2").on("change", { scenario: 2 }, this.radioChange);
        $("#scenario3").on("change", { scenario: 3 }, this.radioChange);

        $('[name="radio"][value="false"]').attr("checked", true);
        $('#chooseScenario').buttonset();
        var handler: StartScreenEventHandler = this;
        $("#startScreen").dialog({
            buttons: {
                Ok: handler.close
            }
        });
    }

    private radioChange = (p_evt: Event):void => {
        this.m_controller.setScenario(p_evt.data.scenario);
        $("#information").text("Here is some information about scenario " + p_evt.data.scenario +". What is "+
            "the purpose of this scenario and how to win in this scenario.");
        $("#information").show();
    }

    private close = (): void => {
        $("#startScreen").dialog("close");
        this.m_controller.setEndTime($("#endTime").val());
    }
}