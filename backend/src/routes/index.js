const router = require("express").Router();
const verifyToken = require("../middlewares/authJWT");
const { toAuthJson } = require("../services/user");
const {getAllWidgetTypes, toWidgetTypeJson} = require("../services/widgetType")

// Get all widgets
router.route("/").get(verifyToken, async (req, res) => {

    try {
        
        let isUserLoggedIn = req.user ? true : false;
        let widgetsTypes = await getAllWidgetTypes()
        let allWidgetTypes = widgetsTypes.map((widgetType) => (toWidgetTypeJson(widgetType)))

        res.status(200).send({
            isUserLoggedIn: isUserLoggedIn,
            user: await toAuthJson(req.user),
            widgetTypes: allWidgetTypes
        });
        
    } catch (error) {

        console.error(error);
        res.status(500).json({ message: 'Internal server error' });

    }
})

module.exports = router;
