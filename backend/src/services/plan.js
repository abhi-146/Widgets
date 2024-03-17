const Plan = require("../models/plan.model");

exports.getPlanByName = async (planName) => {
    try {
        const plan = await Plan.findOne({name: planName});
        
        if(!plan) {
            throw Error("PlanNotFound");
        }
        return plan;
    } catch (error) {
        throw error;
    }
}

exports.getPlanById = async (planId) => {
    try {

        var plan = await Plan.findById(planId);

        if (!plan) {
            throw Error("PlanNotFound");
        }

        return plan;

    } catch(error) {
        throw error;
    }
}

exports.getPlanByStripeProductId = async (productId) => {
    try {

        const plan = await Plan.findOne({stripeProductId: productId});

        if (!plan) {
            throw Error("PlanNotFound");
        }

        return plan;

    } catch(error) {
        throw error;
    }
}