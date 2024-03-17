const express = require("express");
require("./config/db")
const path = require('path');
const Plan = require("./src/models/plan.model")
const WidgetType = require("./src/models/widgetType.model")
require("dotenv").config()

const {createCheckoutSession} = require("./src/services/handlePayment")


const app = express();
const port = process.env.PORT;

const cors = require("cors")

app.use(cors())

// Body parser
app.use((req, res, next) => {
    if (req.path !== '/widget/webhook') {
      express.json()(req, res, next);
    } else {
      next();
    }
});

// Main router
const mainRouter = require("./src/routes/index")
app.use("/", mainRouter);

// Router for user
const userRouter = require("./src/routes/user");
app.use("/user", userRouter);

// Router for widget categories
const widgetCategoryRouter = require("./src/routes/widgetType");
app.use("/widgetType", widgetCategoryRouter);

// Router for widgets
const widgetRouter = require("./src/routes/widget");
app.use("/widget", widgetRouter);

// Router for files
const FileRouter = require("./src/routes/file");
app.use("/widget/file", FileRouter);

// Serve static file
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`);
})

// // Add widget types
// const appfolio = new WidgetType({
//     name: "appfolio",
//     category: "listings",
//     price: 9,
//     stripePriceId: 'price_1Op6fiDRr2mjfOwjqyvo8mEw',
//     stripeProductId: 'prod_PePUTMC3QfQLK7'
// })
// appfolio.save();

// const threadsFeeds = new WidgetType({
//     name: "threadsFeeds",
//     category: "feeds",
//     price: 6,
//     stripePriceId: 'price_1Op6hGDRr2mjfOwjU0Lp26tI',
//     stripeProductId: 'prod_PePW1Scnxmc5b7'
// })
// threadsFeeds.save();

// const files = new WidgetType({
//     name: "files",
//     category: "files",
//     price: 5,
//     stripePriceId: 'price_1Op6iSDRr2mjfOwjtRi1u4CI',
//     stripeProductId: 'prod_PePXtta8XJriDJ'
// })
// files.save();

// // Add plans
// const freePlan = new Plan({
//     name: "basic",
//     allowedWidgets: ["label"],
//     desc: "Free plan",
//     widgetCount: 1
// });

// freePlan.save();

// const starterPlan = new Plan({
//     name: "starter",
//     allowedWidgets: ["label", "threadsFeeds"],
//     desc: "Starter plan",
//     widgetCount: 2,
//     stripeProductId: "prod_PbNA5nGgyNQp5r"
// })

// starterPlan.save();

// const developerPlan = new Plan({
//     name: "developer",
//     allowedWidgets: ["label", "files", "threadsFeeds", "appfolio"],
//     desc: "Developer plan",
//     widgetCount: 5,
//     stripeProductId: "prod_PbQOLJoBFnIKKB"
// })

// developerPlan.save();

app.post('/create-checkout-session', createCheckoutSession);
