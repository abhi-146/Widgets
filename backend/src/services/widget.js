const Widget = require("../models/widget.model");
const {getHtmlFromUrl} = require("../utilities/utility");
const {getWidgetTypeById, toWidgetTypeJson} = require("../services/widgetType")

exports.getWidgetById = async (widgetId) => {

    try {

        var widget = await Widget.findById(widgetId);

        if (!widget) {
            throw Error("WidgetNotFound");
        }

        return widget;

    } catch(error) {
        throw error;
    }

}

exports.getAllWidgets = async (userId) => {

    try {
        const widgets = await Widget.find({userId: userId});
        return widgets;

    } catch(error) {
        throw error;
    }
}

exports.toWidgetJson = async function(widget) {

    try {
        let widgetType = await getWidgetTypeById(widget.widgetType)
        widgetType = toWidgetTypeJson(widgetType);
        let jsonWidget =  {
            id: widget._id,
            widgetType: widgetType,
            title: widget.title,
            htmlData: widget.htmlData,
            password: widget.password,
            isPro: widget.plan === 'pro',
        }

        return jsonWidget
    } catch (error) {
        throw error;
    }
}

fetchUserIdFromUrl = async (url) => {
    var threadsId = -1;

    var data = await getHtmlFromUrl(url);

    if(data) {
        const userIdPattern = /"user_id"\s*:\s*"([^"]+)"/;                  
        const match = data.match(userIdPattern);
    
        if (match) {
        
            const userIdValue = match[1];
            threadsId = userIdValue;

        }
    }

    return threadsId;
}

exports.addWidget = async (widgetData, user) => {
    try {

        let widget = new Widget(widgetData);

        // Set owner of the widget
        widget.userId = user.id;

        // Set publish status
        widget.publish = true;

        let widgetType = await getWidgetTypeById(widget.widgetType)
            
        // Fetch threads ID from url 
        if(widgetType.name === 'threadsFeeds' && widget.htmlData.threadsFeeds.threadsUrl) {
        
            let threadsId = await fetchUserIdFromUrl(decodeURIComponent(widget.htmlData.threadsFeeds.threadsUrl));
            widget.htmlData.threadsFeeds.threadsId = threadsId;
        }
        
        const savedWidget = await widget.save();

        // Update widgets array of user
        let allWidgets = user.widgets ? user.widgets : [];
        allWidgets.push(savedWidget.id);
        user.widgets = allWidgets;

        await user.save();

        return savedWidget;

    } catch (error) {
        throw error;
    }
}

exports.updateWidget = async(widgetId, widgetData) => {
    try {

        let widgetType = widgetData.widgetType;

        if(widgetType.name === 'threadsFeeds' && widgetData.htmlData.threadsFeeds.threadsUrl) {
            
            let threadsId = await fetchUserIdFromUrl(decodeURIComponent(widgetData.htmlData.threadsFeeds.threadsUrl));
            widgetData.htmlData.threadsFeeds.threadsId = threadsId;
        }

        const updatedWidget = await Widget.findByIdAndUpdate(
            widgetId,
            widgetData,
            { 
                new: true , // Return the updated document
                runValidators: true 
            } 
        );

        if (!updatedWidget) {
            throw Error("WidgetNotFound");
        } 

        return updatedWidget;

    } catch(error) {
        throw error;
    }
}

exports.deleteWidget = async (widgetId, user) => {
    try {

        const deletedWidget = await Widget.findByIdAndDelete(widgetId);

        if (!deletedWidget) {
            throw Error("WidgetNotFound");
        }

        // Update widgets array of user
        let allWidgets = user.widgets ? user.widgets : [];
        const indexToRemove = allWidgets.findIndex((widget) => {return widget.toString() === widgetId});
        if (indexToRemove !== -1) {
            allWidgets.splice(indexToRemove, 1);
        }
        user.widgets = allWidgets;

        await user.save();

        // Delete files associated with the widget
        const {deleteWidgetFiles} = require("./file");
        deleteWidgetFiles(widgetId);

        return deletedWidget;
        
    } catch(error) {
        throw error;
    }
}

exports.widgetPublishStatus = async (widgetId) => {
    try {

       let widget = await this.getWidgetById(widgetId);
       return widget.publish;
       
    } catch(error) {
        throw error;
    }
}

exports.publishWidget = async (widgetId, publish) => {
    try {

       let widget = await this.getWidgetById(widgetId);

       if(widget.plan === 'pro') {
        if(widget.activated) {
            widget.publish = true;
        } else {
            throw Error("SubscriptionExpired")
        }
       } else {
        widget.publish = true;
    }
       

       
    } catch(error) {
        throw error;
    }
}

exports.deleteUserWidgets = async (userId) => {
    try {

       await Widget.deleteMany({ userId: userId });
       
    } catch(error) {
        throw error;
    }
}