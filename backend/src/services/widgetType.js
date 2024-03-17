const WidgetType = require("../models/widgetType.model")

exports.toWidgetTypeJson = function(widgetType) {

    try {
        let jsonWidgetType =  {
            id: widgetType._id,
            name: widgetType.name,
            category: widgetType.category,
            price: widgetType.price,
            stripePriceId: widgetType.stripePriceId,
            stripeProductId: widgetType.stripeProductId,
            desc: widgetType.desc,
        }

        return jsonWidgetType
    } catch (error) {
        throw error;
    }
}
exports.getWidgetTypeById = async (widgetTypeId) => {

    try {

        var widgetType = await WidgetType.findById(widgetTypeId);

        if (!widgetType) {
            throw Error("WidgetTypeNotFound");
        }

        return widgetType;

    } catch(error) {
        throw error;
    }

}

exports.getAllWidgetTypes = async () => {

    try {
        const widgetTypes = await WidgetType.find();
        return widgetTypes;

    } catch(error) {
        throw error;
    }
}