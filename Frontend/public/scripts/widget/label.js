var mjlabels = document.querySelectorAll(".mj-label");

async function prepareLabelWidget(label) {
    var parentWidget = label.closest('.mj-widget');

    // Get widget data
    let widgetId = "";
    let data = JSON.parse(parentWidget.getAttribute("data-widget"));

    if (!data) {
        widgetId = parentWidget.attributes.id.value
        data = mjWidgetsData[widgetId];
    }
    let htmlData = data.widgetData.htmlData;
    const labelData = htmlData.label;

    let labelHtml = `
        <style>
            [id='${widgetId}'] .mj-label {
                color: ${labelData.textColor};
                font-size: ${labelData.fontSize}px;
                font-family: ${labelData.fontFamily};
            }
        </style>
    `;

    labelHtml += "<span>" + labelData.text + "</span>";

    if (widgetId) {
        document.getElementById(widgetId).querySelector(".mj-label").innerHTML = labelHtml;
    } else {
        document.querySelector(".mj-label").innerHTML = labelHtml;
    }
}

async function processlabelWidgets() {
    for (let index = 0; index < mjlabels.length; index++) {
        await prepareLabelWidget(mjlabels[index]);
    }
}
window[prepareLabelWidget] = prepareLabelWidget;
processlabelWidgets();
