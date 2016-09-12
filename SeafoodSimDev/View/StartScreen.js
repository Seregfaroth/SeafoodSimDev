// <reference path = "../../TSSeafoodSimDev/externals/wrappers.d.ts"/>
// <reference path = "../../TSSeafoodSimDev/externals/wrappers.d.ts"/>
// <reference path = "../../TSSeafoodSimDev/externals/model.d.ts"/>
var StartScreen = (function () {
    function StartScreen() {
        var mainDiv = document.createElement("div");
        $('body').append(mainDiv);
        mainDiv.id = "startScreen";
        var headerDiv = document.createElement("div");
        mainDiv.appendChild(headerDiv);
        headerDiv.innerHTML = "SeafoodSim";
        headerDiv.classList.add("header");
        var textDiv = document.createElement("div");
        mainDiv.appendChild(textDiv);
        textDiv.innerHTML = "Welcome to SeafoodSim. Here you can choose which scenario to run. " +
            "The scenarios have different purposes and different goals you have to achieve to " +
            "win. You can also set the durion of the simulation.";
        textDiv.id = "welcomeText";
        var buttonTable = document.createElement("table");
        mainDiv.appendChild(buttonTable);
        var row = buttonTable.insertRow();
        var cell = row.insertCell();
        var fieldSet = document.createElement("fieldset");
        fieldSet.id = "chooseScenario";
        cell.appendChild(fieldSet);
        var button = document.createElement("input");
        fieldSet.appendChild(button);
        button.type = "radio";
        button.id = "scenario1";
        button.name = "radio";
        button.value = "false";
        var label = document.createElement("label");
        fieldSet.appendChild(label);
        label.htmlFor = "scenario1";
        label.innerHTML = "Scenario 1";
        var button = document.createElement("input");
        fieldSet.appendChild(button);
        button.type = "radio";
        button.id = "scenario2";
        button.name = "radio";
        button.value = "true";
        var label = document.createElement("label");
        fieldSet.appendChild(label);
        label.htmlFor = "scenario2";
        label.innerHTML = "Scenario 2";
        var button = document.createElement("input");
        fieldSet.appendChild(button);
        button.type = "radio";
        button.id = "scenario3";
        button.name = "radio";
        button.value = "true";
        var label = document.createElement("label");
        fieldSet.appendChild(label);
        label.htmlFor = "scenario3";
        label.innerHTML = "Scenario 3";
        var cell = row.insertCell();
        var label = document.createElement("label");
        cell.appendChild(label);
        label.htmlFor = "endTime";
        label.innerHTML = "Select the duraion of the simulation: ";
        cell.appendChild(document.createElement("br"));
        var endTime = document.createElement("input");
        cell.appendChild(endTime);
        endTime.id = "endTime";
        endTime.type = "number";
        endTime.max = "99999";
        endTime.min = "10";
        endTime.step = "10";
        endTime.value = "100";
        var span = document.createElement("span");
        cell.appendChild(span);
        span.innerHTML = "days";
        span.style.marginLeft = "5px";
        var informationDiv = document.createElement("div");
        mainDiv.appendChild(informationDiv);
        informationDiv.id = "information";
        informationDiv.innerHTML = "Here is some information about scenario 1. What is " +
            "the purpose of this scenario and how to win in this scenario.";
        $("#startScreen").dialog({
            minWidth: 750,
            minHeight: 600
        });
    }
    return StartScreen;
}());
//# sourceMappingURL=StartScreen.js.map