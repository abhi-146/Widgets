const {toWidgetTypeJson, getAllWidgetTypes} = require("../services/widgetType")

exports.getAllWidgetTypes = async (req, res) => {
    try {
        
        const widgetTypes = await getAllWidgetTypes();
        let allWidgetTypes = widgetTypes.map((widgetType) => (toWidgetTypeJson(widgetType)))
        res.status(200).json(allWidgetTypes);
        
    } catch (error) {

        console.error(error);
        res.status(500).json('Internal server error');

    }
}