const router = require("express").Router();
const {getAllWidgetTypes} = require("../controllers/widgetType.controller")

// Get all widgets
router.route("/").get(getAllWidgetTypes)

module.exports = router;
