const {getPlanById} = require("../services/plan")
exports.verifyPlan = async (req, res, next) => {
    let user = req.user;
        if(!user) {
            res.status(403).send("Invalid JWT token");
        } else {
            let currPlan = await getPlanById(user.plan);
            let widget = req.body.widget;
            // Check whether current plan includes the widget
            const widgetCategory = widget.category;
            const allowedWidgets = currPlan.allowedWidgets;
            if (!allowedWidgets.includes(widgetCategory)) {
                return res.status(403).json({planError: "Widget category is not allowed for the current plan"});
            }
            // Check total widgets of user
            const totalWidget = user.widgets.length;
            const widgetCount = currPlan.widgetCount;
            if(totalWidget >= widgetCount) {
                return res.status(403).json({planError: `Only ${widgetCount} widget allowed under current plan.`});
            }
            next();
        }
}