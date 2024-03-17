const { getWidgetById } = require("../services/widget")
exports.verifyWidgetPassword = async (req, res, next) => {
    try {
        const password = req.headers['password'];
        const id = req.params.id;
        let widget = req.body.widget;

        if(!widget) {
            widget = await getWidgetById(id)
        }

        if(widget.password && widget.password != "" && widget.password !== password){
          
            return res.status(403).json('Invalid widget password');
        } else {
            
            req.widget = widget;
            next();
        }
    } catch (error) {
        console.error(error);
        if (error.message == "WidgetNotFound") {
            return res.status(404).json("Widget not found.");
        } else {
            return res.status(500).json('Internal server error');
        }
    }
}