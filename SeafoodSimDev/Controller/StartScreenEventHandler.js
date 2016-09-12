var StartScreenEventHandler = (function () {
    function StartScreenEventHandler(p_controller) {
        var _this = this;
        this.radioChange = function (p_evt) {
            _this.m_controller.setScenario(p_evt.data.scenario);
            $("#information").text("Here is some information about scenario " + p_evt.data.scenario + ". What is " +
                "the purpose of this scenario and how to win in this scenario.");
        };
        this.close = function () {
            $("#startScreen").dialog("close");
            _this.m_controller.setEndTime($("#endTime").val());
            _this.m_controller.setTickPerMove($("#movesPerTick").val());
        };
        this.m_controller = p_controller;
        $("#scenario1").on("change", { scenario: 1 }, this.radioChange);
        $("#scenario2").on("change", { scenario: 2 }, this.radioChange);
        $("#scenario3").on("change", { scenario: 3 }, this.radioChange);
        $('[name="radio"][value="false"]').attr("checked", true);
        $('#chooseScenario').buttonset();
        var handler = this;
        $("#startScreen").dialog({
            buttons: {
                Ok: handler.close
            },
            close: handler.close
        });
    }
    return StartScreenEventHandler;
}());
//# sourceMappingURL=StartScreenEventHandler.js.map