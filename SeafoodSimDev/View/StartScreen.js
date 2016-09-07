// <reference path = "../../TSSeafoodSimDev/externals/wrappers.d.ts"/>
// <reference path = "../../TSSeafoodSimDev/externals/wrappers.d.ts"/>
// <reference path = "../../TSSeafoodSimDev/externals/model.d.ts"/>
var StartScreen = (function () {
    function StartScreen() {
        var mainDiv = document.createElement("div");
        $('body').append(mainDiv);
        mainDiv.id = "startScreen";
        var textDiv = document.createElement("div");
        mainDiv.appendChild(textDiv);
        textDiv.innerHTML = "Welcome to SeafoodSim. Choose a scenario to continue.";
        textDiv.id = "welcomeText";
        var fieldSet = document.createElement("fieldset");
        fieldSet.id = "chooseScenario";
        mainDiv.appendChild(fieldSet);
        var div = document.createElement("div");
        fieldSet.appendChild(div);
        var button = document.createElement("input");
        div.appendChild(button);
        button.type = "radio";
        button.id = "scenario1";
        var label = document.createElement("label");
        div.appendChild(label);
        label.htmlFor = "scenario1";
        label.innerHTML = "Scenario 1";
        div.classList.add("radio");
        var div = document.createElement("div");
        fieldSet.appendChild(div);
        var button = document.createElement("input");
        div.appendChild(button);
        button.type = "radio";
        button.id = "scenario2";
        var label = document.createElement("label");
        div.appendChild(label);
        label.htmlFor = "scenario2";
        label.innerHTML = "Scenario 2";
        div.classList.add("radio");
    }
    return StartScreen;
}());
//# sourceMappingURL=StartScreen.js.map