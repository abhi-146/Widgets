const axios = require('axios');
const {getHtmlFromUrl} = require("../utilities/utility")
const {getWidgetTypeById} = require("../services/widgetType")

exports.serveWidget = async (widget) => {

    try {

        let serveData = {};

        let widgetType =  await getWidgetTypeById(widget.widgetType);
        
        switch(widgetType.name) {

            case "threadsFeeds": 
        
                const threadsId = widget.htmlData.threadsFeeds.threadsId;

                if(threadsId) {

                    const lsd = 'm6yfegdR9KDb6k2BYkK9Ya';
                    const api_url = 'https://www.threads.net/api/graphql';
                    const body = `lsd=${lsd}&variables={"userID":"${threadsId}"}&doc_id=6232751443445612`;
                    const headers = {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'X-IG-App-ID': '238260118697367',
                    'X-FB-LSD': lsd,
                    'Sec-Fetch-Site': 'same-origin',
                    };
                    const options = {
                    method: 'POST',
                    timeout: 10000,
                    headers,
                    data: body,
                    url: api_url,
                    };
                    await axios(options)
                    .then((response) => {
                        
                        const data = response.data;
                        const items = data.data.mediaData.threads;

                        serveData.items = items;
            
                    })
                    .catch((error) => {
                        throw error;
                    });
                }

                break;
            default: 
                serveData = {};

        }

        return serveData;

    } catch(error) {
        throw error;
    }

}

/* ----- Appfolio ------ */

// Get details for single listing page
exports.getAppfolioDetails = async (url) => {

    try {

        const detailsHtml = getHtmlFromUrl(url);

        return detailsHtml;

    } catch(error) {
        throw error;
    }

}