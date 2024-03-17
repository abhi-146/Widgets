const Widget = require("../models/widget.model");
const {toWidgetJson, getWidgetById, getAllWidgets, addWidget, updateWidget, deleteWidget, widgetPublishStatus, publishWidget} = require("../services/widget");
const {processStripeWebhook} = require("../services/handlePayment")
const {serveWidget, getAppfolioDetails} = require("../services/ServeWidget");
const {getWidgetTypeById} = require("../services/widgetType")
const stripe = require('stripe')('sk_test_51NI3U4DRr2mjfOwjKbLFIGgTAqY7zZcLo4vOenKq8qqyWIbejIB98egBw0wDv3alnscr9QX6yhcKHy1TIhqgazxD00lPgFUaRm')

exports.getWidgetById = async (req, res) => {
    try {
        const id = req.params.id;
        const widget = await getWidgetById(id);
        res.json({ widget: await toWidgetJson(widget) });
    } catch (error) {
        console.error(error);
        if(error.message == "WidgetNotFound") {
          return res.status(404).json("Widget not found.");
        } else {
            res.status(500).json('Internal server error');
        }
    }
}
async function getJsonWidgets(widgets) {
    let jsonWidgets = [];
    for(let i=0; i<widgets.length; i++) {
        jsonWidgets.push(await toWidgetJson(widgets[i]))
    }
    return jsonWidgets;
}
exports.getAllWidgets = async (req, res) => {
    try {
        let user = req.user;
        const widgets = await getAllWidgets(user.id);
        let allWidgets = await getJsonWidgets(widgets);
        res.status(200).json(allWidgets);
    } catch (error) {
        console.error(error);
        res.status(500).json('Internal server error');
    }
}
exports.addWidget = async (req,res) => {
    try {
        let user = req.user;
        let widgetData = req.body.widget;
        widgetData.plan = "free";
        widgetData.activated = true;

        const savedWidget = await addWidget(widgetData, user);
        res.status(201).json({ message: 'Widget saved successfully', widget: await toWidgetJson(savedWidget) });
    } catch (error) {
        console.error(error);
        if(error.name == "MongoServerError" && error.code == 11000) {
            res.status(400).json(`${Object.keys(error.keyValue)[0]} already exists`);
        } else if(error.name == "ValidationError") {
            res.status(400).json(error.message);
        } else {
            res.status(500).json('Internal server error');
        }
    }
}
exports.updateWidget = async (req, res) => {
    try {
        let widgetData = req.body.widget;
        const updatedWidget = await updateWidget(req.params.id, widgetData);
        res.status(200).json({ message: 'Widget updated successfully', widget: await toWidgetJson(updatedWidget) });
    } catch (error) {
        console.error(error);
        if(error.message === "WidgetNotFound") {
            return res.status(404).json("Widget not found.");
        } else if(error.name == "MongoServerError" && error.code == 11000) {
            res.status(400).json(`${Object.keys(error.keyValue)[0]} already exists`);
        } else if(error.name == "ValidationError") {
            res.status(400).json(error.message);
        } else {
            res.status(500).json('Internal server error');
        }
    }
}
exports.deleteWidget = async (req,res) => {
    try {
        let user = req.user;
        const deletedWidget = await deleteWidget(req.params.id, user);
        res.status(200).json({ message: 'Widget deleted successfully', widget: await toWidgetJson(deletedWidget) });
    } catch (error) {
        console.error(error);
        if(error.message === "WidgetNotFound") {
            return res.status(404).json("Widget not found.");
        } else {
            res.status(500).json('Internal server error');
        }
    }
}
exports.widgetPublishStatus = async (req,res) => {
    try {
        const widgetId = req.params.id;
        const publishStatus = await widgetPublishStatus(widgetId);
        res.status(200).json({publish: publishStatus});
    } catch (error) {
        console.error(error);
        if(error.message === "WidgetNotFound") {
            return res.status(404).json("Widget not found.");
        } else {
            res.status(500).json('Internal server error');
        }
    }
}

exports.publishWidget = async (req,res) => {
    try {

        const widgetId = req.params.id;
        const publish = req.body.publish;

        await publishWidget(widgetId, publish);

        res.status(200).json("Widget published successfully!");

    } catch (error) {

        console.error(error);

        if(error.message === "WidgetNotFound") {
            return res.status(404).json("Widget not found.");
        } else {
            res.status(500).json('Internal server error');
        }

    }
}

exports.serveWidget = async (req,res) => {
    try {
        const id = req.params.id;
        let widget = await getWidgetById(id)
        let widgetType = await getWidgetTypeById(widget.widgetType);
        if(widget) {
            const serveData = await serveWidget(widget);
            const widgetScript = `http://localhost:3000/scripts/widget/${widgetType.name}.js`;
            let jsonData = {
                // html: widgetHtml,
                data: {
                    widgetData: await toWidgetJson(widget),
                    serveData: serveData
                }
            }
            if(widgetScript != "") {
                jsonData.data.script = widgetScript;
            }
            res.status(200).json(jsonData);
        } else {
            throw new Error("WidgetNotFound");
        }
    } catch (error) {
        console.error(error);
        if(error.message == "WidgetNotFound") {
            res.status(400).json("Widget not found");
        } else {
            res.status(500).json('Internal server error');
        }
    }
}
exports.previewWidget = async (req,res) => {
    try {
        let widgetData = req.body.widget;
        let widget = new Widget(widgetData);
        let widgetType = await getWidgetTypeById(widget.widgetType);
        if(widgetType.name === 'threadsFeeds' && widgetData.htmlData.threadsFeeds.threadsUrl) {
            let threadsId = await fetchUserIdFromUrl(decodeURIComponent(widgetData.htmlData.threadsFeeds.threadsUrl));
            widget.htmlData.threadsFeeds.threadsId = threadsId;
        }
        const serveData = await serveWidget(widget);
        const widgetScript = `http://localhost:3000/scripts/widget/${widgetType.name}.js`;
        let jsonData = {
            // html: widgetHtml,
            data: {
                widgetData: await toWidgetJson(widget),
                serveData: serveData
            }
        }
        if(widgetScript != "") {
            jsonData.data.script = widgetScript;
        }
        res.status(200).json(jsonData);
    } catch (error) {
        console.error(error);
        if(error.message == "WidgetNotFound") {
            res.status(400).json("Widget not found");
        } else if(error.code === 'ENOTFOUND' ) {
            res.status(400).json('Inavlid URL');
        } else {
            res.status(500).json('Internal server error: ' + error);
        }
    }
}
/* ----- Appfolio ----- */
exports.getAppfolioDetails = async (req, res) => {
    try {
        let url = req.body.url;
        const detailsHtml = await getAppfolioDetails(url);
        res.status(200).json({
            detailsHtml: detailsHtml
        });
    } catch(error) {
        console.log(error);
        if(error.code === 'ERR_BAD_REQUEST') {
            res.status(400).json('Invalid Url: ' + error.message);
        } else {
            res.status(500).json('Internal server error: ' + error);
        }
    }

}

exports.stripeWebhook = async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_SECRET);

        // Handle the event
        processStripeWebhook(event);

        res.send();
    } catch (err) {
        
        console.log((`Webhook Error: ${err.message}`))
        res.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }

}