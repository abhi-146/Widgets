const Payment = require("../models/payment.model")
const {getUserByEmail} = require("./user");
const {getWidgetById, addWidget, deleteWidget} = require("./widget");
const stripe = require('stripe')('sk_test_51NI3U4DRr2mjfOwjKbLFIGgTAqY7zZcLo4vOenKq8qqyWIbejIB98egBw0wDv3alnscr9QX6yhcKHy1TIhqgazxD00lPgFUaRm');

exports.createCheckoutSession = async (req, res) => {

    const priceId = req.body.priceId;
    const customerEmail = req.body.customerEmail;
    let widgetData = req.body.widgetData;

    let user = await getUserByEmail(customerEmail);
    let widget = await addWidget(widgetData, user);
    
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `http://localhost:3000/editor?widgetId=${widget.id}`,
      cancel_url: `http://localhost:3000/catalog?widgetId=${widget.id}`,
      customer_email: customerEmail,
      metadata: {
        widgetId: widget.id
      },
    });
  
    res.json({ id: session.id });
  }
exports.processStripeWebhook = async (event) => {
    try {

        switch (event.type) {
            case 'subscription_schedule.aborted':
                const subscriptionScheduleAborted = event.data.object;
                this.paymentAbortedHandler(subscriptionScheduleAborted);

                break;
            case 'subscription_schedule.canceled':
                const subscriptionScheduleCanceled = event.data.object;
                this.paymentCanceledHandler(subscriptionScheduleCanceled);

                break;
            case 'checkout.session.completed':
                const subscriptionScheduleCompleted = event.data.object;
                this.paymentCompletedHandler(subscriptionScheduleCompleted);

                break;
            case 'subscription_schedule.created':
                const subscriptionScheduleCreated = event.data.object;
                this.paymentCreatedHandler(subscriptionScheduleCreated);

                break;
            case 'subscription_schedule.expiring':
                const subscriptionScheduleExpiring = event.data.object;
                this.paymentExpiringHandler(subscriptionScheduleExpiring);

                break;
            case 'subscription_schedule.released':
                const subscriptionScheduleReleased = event.data.object;
                this.paymentReleasedHandler(subscriptionScheduleReleased);

                break;
            case 'subscription_schedule.updated':
                const subscriptionScheduleUpdated = event.data.object;
                this.paymentUpdatedHandler(subscriptionScheduleUpdated);

                break;

            default:
                console.log(`Unhandled event type ${event.type}`);
        }

    } catch (error) {
        throw error;
    }
}

exports.paymentCompletedHandler = async (data) => {
    let paymentStatus = data.payment_status;
    let invoiceId = data.invoice;
    let created = data.created;
    let amount = data.amount_total/100;
    let email = data.customer_email;
    let subscriptionId = data.subscription;
    let widgetId = data.metadata.widgetId;

    if(paymentStatus === 'paid') {

        let widget = await getWidgetById(widgetId);

        widget.plan = "pro";
        widget.activated = true;
        widget.subscriptionId = subscriptionId;

        await widget.save();

        // Add payment
        let payment = new Payment({
            widgetId: widget.id,
            invoiceId: invoiceId,
            created: created,
            amount: amount,
        });
        payment.save();

        // Update payments array in widget
        let allPayments = widget.payments ? widget.payments : [];
        allPayments.push(payment.id);
        widget.payments = allPayments;
        await widget.save();
    } else {
        await deleteWidget(widgetId);
    }
}