var mjAppfolio = document.querySelectorAll(".mj-appfolio");

var commonStyleAppfolio = `

    .apfl-sl-wrapper .listing-sec{
        display: flex;
    }
    .apfl-column{
        float: left;
        margin: 0 1% 40px;
        padding: 0 1%;
        box-sizing: border-box;
    }
    .apfl-two-fifth{
        width: 38%;
    }
    .apfl-three-fifth{
        width: 58%;
    }
    .apfl-prmry-btn{
        color: #fff;
        background: rgb(89, 143, 205);
        padding: 7px 20px;
        letter-spacing: 1px;
        transition: 0.3s;
        text-decoration: none;
    }

    /* All Listings page */
    .main-listings-page .all-listings{
        padding: 2em;
    }
    .main-listings-page .listing-item{
        position: relative;
        transition: 0.3s;
        width: 32%;
        float: left;
        margin: 0 0.5%;
        margin-bottom: 2rem;
    }
    .main-listings-page .listing-item .list-img{
        position: relative;
    }
    .main-listings-page .listing-item .list-img img {
        width: 100%;
        height: 275px;
        display: block;
    }
    #googlemap{
        width:100%;
        height: 350px;
    }
    .listing-filters form{
        display: flex;
        justify-content: center;
        align-items: normal;
        margin: 0 25px;
        flex-flow: wrap;
    }
    .listing-filters select, .listing-filters input[type="date"], .listing-filters input[type="text"], .listing-filters input[type="search"]{
    width: auto;
    /* min-width: 135px; */
        margin: 0 5px;
        padding: 3px 25px 3px 3px;
    }
    .listing-filters {
        padding: 40px 0;
        text-align: center;
        background: #598fcd;
    }
    .listing-filters .apfl_page_hdng{
        color: #fff;
        font-size: 40px;
        margin-top: 0;
        margin-bottom: 2rem;
        text-transform: uppercase;
        letter-spacing: 5px;
        line-height: 3rem;
    }
    .listing-filters .apfl_page_hdng h1, .listing-filters .apfl_page_hdng h2, .listing-filters .apfl_page_hdng h3, .listing-filters .apfl_page_hdng h4, 
    .listing-filters .apfl_page_hdng h5, .listing-filters .apfl_page_hdng h6, .listing-filters .apfl_page_hdng p{
        color: #fff;
    }
    .listing-filters input[type="submit"] {
    min-width: 135px;
        background: #ff6600;
        color: #fff;
        padding: 7px 30px !important;
        font-size: 18px;
        text-transform: uppercase;
        letter-spacing: 1px;
        margin: 0 10px;
        line-height: 1;
        text-decoration: none;
    }
    .listing-items-grp{
        clear: both;
    }
    .main-listings-page .listing-item span.rent-price, .main-listings-page .listing-item span.rent-price-off,
    .main-listings-page .listing-item span.lstng-avail, .main-listings-page .listing-item span.lstng-avail-off {
        color: #fff;
        padding: 5px 10px;
        letter-spacing: 1px;
        position: absolute;
        left: 0px;
        font-size: 18px;
        bottom: 0px;
    }
    .main-listings-page .listing-item span.rent-price-off, .main-listings-page .listing-item span.lstng-avail-off{
        position: relative;
    }
    .main-listings-page .listing-item span.lstng-avail, .main-listings-page .listing-item span.lstng-avail-off {
        left: auto;
        right: 0px;
    }
    .main-listings-page .listing-item span.lstng-avail-off{
        float: right;
    }
    .details {
        padding: 15px;
        background: rgba(89, 143, 205, 0.1);
        
        gap: 10px;
        display: flex;
        flex-direction: column;
    }

    .details *{
        margin: 2px;
    }
    .main-listings-page .listing-item img.bedimg, .main-listings-page .listing-item img.bathimg {
        width: 16px;
        height: auto;
        margin: 0 5px;
        display: inline;
    }
    .main-listings-page .listing-item .btns a {
        color: #fff;
        background: rgb(89, 143, 205);
        padding: 5px 10px;
        margin-right: 5px;
        text-transform: uppercase;
        letter-spacing: 1px;
        transition: 0.3s;
        text-decoration: none;
        display: inline-block;
        margin-bottom: 10px;
    }
    .main-listings-page .listing-item .btns a:hover {
        background: #444;
    }
    .listing-item:hover {
        box-shadow: 0px 0px 10px 0px #444;
    }
    .listing-item:hover .details {
        background: #fff;
    }
    .mm-prop-popup{
        display: flex;
    }
    .mm-prop-popup .map-popup-thumbnail{
        margin-right: 15px;
    }
    h3.map-popup-rent, .map-popup-specs{
        margin-bottom: 5px;
        margin-top: 0;
    }
    .mm-prop-popup .map-popup-info a{
        color: #fff;
        background: rgb(89, 143, 205);
        padding: 7px 20px;
        margin-right: 5px;
        text-transform: uppercase;
        letter-spacing: 1px;
    }

    /* SINGLE LISTING PAGE*/
    .apfl-sl-wrapper .sl-btns{
        text-decoration: none;
        display: block;
        width: fit-content;
        margin-bottom: 10px;
        margin-left: auto;
    }
    /* Gallery CSS */
    .apfl-gallery{
        position: relative;
    }
    .apfl-gallery .mySlides {
        display: none;
        width: 100%;
    }
    .apfl-gallery .mySlides img{
    max-height: 450px !important;
        width: 100%;
    }
    .apfl-gallery .cursor {
        cursor: pointer;
    }
    .apfl-gallery .prev,
    .apfl-gallery .next {
        cursor: pointer;
        position: absolute;
        top: 40%;
        width: auto;
        padding: 25px 15px;
        margin-top: -50px;
        color: white;
        font-weight: bold;
        font-size: 20px;
        border-radius: 0 3px 3px 0;
        user-select: none;
        -webkit-user-select: none;
        text-decoration: none;
    }
    .apfl-gallery .next {
        right: 0;
        border-radius: 3px 0 0 3px;
    }
    .apfl-gallery .prev:hover, .apfl-gallery .next:hover {
        background: rgba(255,255,255,0.5);
        color: #444;
        text-decoration: none;
    }
    .apfl-gallery .numbertext {
        color: #f2f2f2;
        font-size: 12px;
        padding: 8px 12px;
        position: absolute;
        top: 0;
    }
    .apfl-gallery .caption-container {
        text-align: center;
        background-color: #222;
        padding: 2px 16px;
        color: white;
    }
    .apfl-gallery .row{
        display: block;
    }
    .apfl-gallery .row:after {
        content: "";
        display: table;
        clear: both;
    }
    .apfl-gallery #image-prvw .demo {
        opacity: 0.6;
        height: 100px;
        width: 95%;
        margin: auto;
    }
    .apfl-gallery .active, .apfl-gallery .demo:hover {
        opacity: 1;
    }
    .apfl-gallery .imgcolumn {
        float: left;
        width: 20%;
        margin: auto;
    }
    .listing-sec #apfl-vdo{
        margin-top: 2em;
    }
    /* Listing details */
    .lst-dtls{
        display: flex;
        border-bottom: 1px solid #ccc;
        margin-bottom: 25px;
    }
    .lst-dtls .details-left{
        width: 60%;
    }
    .lst-dtls .details-right{
        width: 40%;
        text-align: right;
    }
    .address-hdng, .rent-hdng, .apfl-half h3{
        margin-top: 0 !important;
    }
    .address-hdng a{
        text-indent: -9999px;
        display: inline-block;
        line-height: 1;
    }
    .address-hdng a:before{
        content: '';
        width: 32px;
        height: 32px;
        float: left;
        margin: 0;
        text-indent: 0;
    }
    .apfl-half{
        width: 50%;
        float: left;
    }
    .sl-btns{
        color: #fff;
        background: rgb(89, 143, 205);
        padding: 7px 20px;
        margin-right: 5px;
        text-transform: capitalize;
        letter-spacing: 1px;
        transition: 0.3s;
    }
    .sl-btns:hover{
        text-decoration: none;
        background: #444;
    }
    .bathimg, .bedimg{
        width: 16px;
        height: auto;
        margin: 0 5px;
        display: inline;
    }
    .details-right .rent-hdng{
        margin-bottom: 1rem;
        padding: .5rem 0;
        text-align: right;
        border: none;
        font-weight: bold;
        font-size: 24px;
        line-height: 1;
    }
    .call-top{
        color: rgb(89, 143, 205);
        text-decoration: none;
    }
    .call-top .call-now{
        display: inline;
        width: 18px;
        vertical-align: middle;
    }
    .details-right .rent-hdng .price-tag{
        display: inline;
        width: 24px;
        vertical-align: bottom;
    }
    .details-right #avail-txt{
        color: #3bb54a;
    }
    img.avail-now{
        display: inline;
        width: 18px;
        margin-right: 5px;
        margin-bottom: -2px;
    }
    .extra-half {
        margin-bottom: 25px;
    }
    .apfl-half.apply-sec{
        text-align: right;
        margin: 25px 0;
    }

    /* Listings Slider */
    .apfl-listings-slider, .apfl-listings-crsl{
        max-width: 100% !important;
        width: 100% !important;
    }
    .sngl-lstng-slide .slide-img{
        width: 50% !important;
        left: auto !important;
        right: 0 !important;
    }
    .sngl-lstng-slide .slide-txt{
        width: 50% !important;
        position: absolute;
        height: 100%;
    }
    .sngl-lstng-slide .slide-txt .ttl{
        color: #fff;
        position: relative;
        text-align: center;
        font-size: 36px;
        padding: 0 90px;
        margin-bottom: 10px;
        line-height: 1.3;
    }
    .sngl-lstng-slide .plc_avl, .sngl-lstng-slide .lstng_price{
        position: absolute;
        right: 0;
        top: 20px;
        color: #fff;
        font-size: 1.2em;
        background: #1e2430;
        padding: 7px 15px;
        font-family: Roboto Condensed,sans-serif;
        letter-spacing: 1px;
    }
    .sngl-lstng-slide .lstng_price{
        left: 0;
        right: auto;
    }
    .sngl-lstng-slide .mini-dtl{
        color: #fff;
        position: relative;
        text-align: center;
        padding: 0 26px;
        font-size: 1.5em;
        margin-bottom: 10px;
    }
    .sngl-lstng-slide .mini-dtl span{
        color: #ffffff;
        padding: 7px 15px;
        font-family: Roboto Condensed,sans-serif;
        letter-spacing: 0.5px;
    }
    .sngl-lstng-slide .mini-dtl span img{
        display: inline-block;
        filter: invert(1);
        vertical-align: middle;
    }
    .lstng-adrs{
        text-align: center;
        margin-bottom: 30px;
        color: #1e2430;
        font-size: 24px;
        padding: 0 40px;
        font-family: Roboto Condensed,sans-serif;
        letter-spacing: 1px;
    }
    .sngl-lstng-slide .apply_sec{
        text-align: center;
    }
    .sngl-lstng-slide .apply_sec a{
        color: #fff;
        font-size: 1.2em;
        padding: 10px 20px;
        font-family: Roboto Condensed,sans-serif;
        letter-spacing: 1px;
        text-decoration: none;
        border: 2px solid #ffffff;
        margin: 0 10px;
        background: transparent;
    }
    .slide-lstng-content {
        position: absolute;
        width: 100%;
        bottom: 25%;
        height: auto;
    }
    .slide-lstng-content p{
        line-height: 1.4;
    }

    .apfl-half.apply-sec{
        display: flex;
        flex-direction: column;
        gap: 10px;
        width: auto;
        text-align: center;
        float: right;
    }
    /* Carousel */
    .sngl-lstng-crsl .slide-txt{
        width: 100%;
        height: 100%;
        position: absolute;
        color: #fff;
        font-weight: bold;
        font-family: Roboto Condensed,sans-serif;
        text-decoration: none;
        letter-spacing: 1px;
        display: flex;
        flex-direction: column;
    }
    .sngl-lstng-crsl .lstng_price{
        position: absolute;
        left: 0;
        top: 0;
        font-size: 1.1em;
        background: rgb(91, 175, 203, 0.85);
        padding: 5px 12px;
    }
    .sngl-lstng-crsl .plc_avl{
        position: absolute;
        right: 0;
        top: 0;
        font-size: 1.1em;
        background: rgb(91, 175, 203, 0.85);
        padding: 5px 12px;
    }
    .sngl-lstng-crsl .mini-dtl{
        display: inline-block;
        margin-top: auto;
        margin-bottom: 0;
        text-align: center;
        background: rgb(91, 175, 203, 0.85);
        padding: 10px 0px;
    }
    .sngl-lstng-crsl .mini-dtl span {
        display: inline-block;
        padding: 0px 20px;
        font: inherit;
    }
    .sngl-lstng-crsl .mini-dtl span img {
        filter: invert(1);
        margin: auto;
        vertical-align: bottom;
    }
    .sngl-lstng-crsl .lstng-adrs{
        color: #fff;
        bottom: 0;
        background: rgb(30,36,48, 0.85);
        padding: 7px 0px;
        margin-bottom: 0;
        font: inherit;
    }

    /* Responsiveness */
    @media only screen and (max-width: 1348px) {
        .listing-filters form{
            flex-flow: wrap;
            align-items: end;
        }
        .listing-filters select{
            margin-bottom: 15px;
        }
    }

    @media only screen and (max-width: 853px) and (min-width: 768px) {
        .main-listings-page .listing-item .btns a{
            display: inline-block;
            margin-bottom: 10px;
        }
    }

    @media only screen and (max-width: 767px) {
        .apfl-sl-wrapper .listing-sec{
            display: block;
        }
        .listing-filters h2{
            font-size: 20px;
            letter-spacing: 1px;
        }
        .listing-filters input[type="submit"] {
            padding: 5px 30px;
            font-size: 16px;
            margin: 0 10px;
        }
        .main-listings-page .all-listings {
            padding: 1em;
        }
        .main-listings-page .listing-item{
            width: 100%;
        }
        .sngl-lstng-slide .slide-img, .sngl-lstng-slide .slide-txt{
            width: 100% !important;
        }
        .sngl-lstng-slide .slide-txt{
            background-color: rgb(91, 175, 203, 0.7);
        }
        .sngl-lstng-slide .slide-txt .ttl{
            font-size: 30px;
            padding: 0 75px;
        }
        .slide-lstng-content {
            bottom: 50px;
        }
        .sngl-lstng-slide .mini-dtl{
            padding: 0 80px;
            font-size: 25px;
        }
        .sngl-lstng-slide .mini-dtl span{
            display: inline-block;
        }
        /* Single listing */
        .apfl-two-fifth, .apfl-three-fifth{
            width: 100%;
            padding: 0 1em;
        }
        .lst-dtls{
            display: block;
        }
        .lst-dtls .details-left, .lst-dtls .details-right{
            width: 100%;
        }
        .lst-dtls .details-right, .details-right .rent-hdng{
            text-align: left;
            font-weight: normal;
            font-size: 1rem;
        }
        .mjwi-apfl-details-popup{
            background-color: white;
        }

    }

    @media only screen and (max-width: 425px) {
        .apfl-half{
            width: 100%;
            float: none;
        }
        .apfl-half.apply-sec{
            text-align: left;
            margin: 0;
        }
    }
`;

var styleElementAppfolio = document.createElement('style');
styleElementAppfolio.innerHTML = commonStyleAppfolio;
document.head.appendChild(styleElementAppfolio);

var listingsArr = [];
var appfolioCol = 3;
var widgetId = "mjwi-appfolio-preview";
var clientGmapApi = '';
var defaultCity = '';

async function prepareAppfolioWidget(appfolio) {
    var parentWidget = appfolio.closest('.mj-widget');

    // Get widget data
    let data = JSON.parse(parentWidget.getAttribute("data-widget"));
    if (!data) {
        widgetId = parentWidget.attributes.id.value
        data = mjWidgetsData[widgetId];
    }

    let htmlData = data.widgetData.htmlData;
    // Get html using widget data
    let appfolioData = htmlData.appfolio;
    let appfolioHtml = "";
    
    try {

        appfolioHtml = await fetchData(decodeURIComponent(appfolioData.appfolioUrl));

    } catch (error) {

        console.error('Error fetching data:', error);

    }

    // Convert html to DOM
    const parser = new DOMParser();
    const tempDoc = parser.parseFromString(appfolioHtml, 'text/html');
    let appfolioUrl = decodeURIComponent(appfolioData.appfolioUrl);
    let appfolioHeading = appfolioData.appfolioHeading;
    appfolioCol = appfolioData.appfolioCol;
    let appfolioSortOrder = appfolioData.appfolioSortOrder;
    let isDisplayBeds = appfolioData.displayBeds;
    let isDisplayBaths = appfolioData.displayBath;
    let template = appfolioData.template;
    clientGmapApi = appfolioData.clientGmapApi || '';
    let bedImage = decodeURIComponent(appfolioData.bedImgUrl);
    let bathImage = decodeURIComponent(appfolioData.bathImgUrl);
    let dollarImg = decodeURIComponent(appfolioData.priceTagImgUrl);
    let checkImg = decodeURIComponent(appfolioData.checkImgUrl);
    let phoneImg = decodeURIComponent(appfolioData.phoneImgUrl);

    let rentText = appfolioData.appfolioRentText;
    let displayFilters = appfolioData.appfolioDisplayFilters;

    let clientListingsUrl = appfolioUrl.match(/^(https?:\/\/[^/]+)/)[0] + '/';

    let listing_items = tempDoc.querySelectorAll('#result_container .listing-item');

    let idSelector = `[id='${widgetId}']`;
    let listingHtml = `
    <style>
        ${idSelector} .mj-appfolio{
            height: ${appfolioData.height}vh;
            width: ${appfolioData.width}%;
            overflow: auto;
        }

    `;

    if (template == 'hawk') {
        listingHtml += `
        ${idSelector} .main-listings-page .listing-filters {
            padding: 20px 0;
            background-color: #232532;
        }
        ${idSelector} .main-listings-page .listing-filters select {
            padding: 2px 25px 3px 10px;
            font-size: 16px;
        }
        ${idSelector} .main-listings-page .listing-filters form select, .main-listings-page .listing-filters input[type=submit] {
            border: none;
            border-radius: 4px;
        }
        ${idSelector} .main-listings-page .listing-filters input[type=submit] {
            cursor: pointer;
        }
        ${idSelector} .main-listings-page #googlemap {
            height: 90vh;
            width: 35%;
            float: left;
        }
        ${idSelector} .main-listings-page .all-listings{
            width: ${(clientGmapApi) ? 62 : 100}%;
            float: left;
            height: 90vh;
            overflow-y: auto;
            padding: 17px;
            -ms-overflow-style: none;
            scrollbar-width: none;
            display: grid;
            gap: 14px;
            grid-auto-rows: max-content;
            grid-template-columns: repeat(auto-fill,minmax(285px,1fr));
            margin-bottom: 15px;
        }
        ${idSelector} .main-listings-page .all-listings::-webkit-scrollbar {
            display: none;
        }
        ${idSelector} .main-listings-page .all-listings .details p{
            order: 2;
        }
        ${idSelector} .main-listings-page .all-listings .listing-item {
            width: 100%;
            border-radius: 5px;
            overflow: hidden;
            padding-bottom: 55px;
            box-shadow: 0 2px 5px #0003;
            background: #fff;
        }
        ${idSelector} .main-listings-page .all-listings .listing-item .btns{
            order: 5;
            position: absolute;
            width: 100%;
            bottom: 0;
            display: flex;
        }
        ${idSelector} .main-listings-page .all-listings .details .lstng_ttl {
            font-size: 16px;
            font-weight: normal;
            color: #666;
            order: 3;
            line-height: 1.3;
        }
        ${idSelector} .main-listings-page .all-listings .listing-item span.rent-price-off{
            font-weight: normal;
            margin-bottom: 0;
            padding-bottom: 0;
            order: 1;
            font-size: 16px;
            color: #444;
        }
        ${idSelector} .main-listings-page .all-listings .listing-item span.rent-price-off b{
            font-size: 28px;
            color: #444;
            vertical-align: sub;
        }
        ${idSelector} .main-listings-page .all-listings .listing-item .lstng-avail-off{
            order: 4;
            margin: 0;
            padding-top: 0;
            padding-bottom: 0;
            color: #444;

        }
        ${idSelector} .main-listings-page .listing-item .btns a{
            padding: 8px 10px;
        }
        ${idSelector} .main-listings-page .listing-item .btns .more_detail_btn {
            background: #27547c;
            margin: 0 0 0 0;
            font-weight:600;
            text-align:center;
            width: 50%;
        }
        ${idSelector} .main-listings-page .listing-item .btns .apply_btn{
            background: #333333;
            margin: 0 0 0 0;
            font-weight:600;
            text-align:center;
            width: 50%;
        }
        
        ${idSelector} .main-listings-page .listing-item .btns .schedule_btn{
            background: #9b9b96;
            margin: 0 0 0 0;
            font-weight:600;
            text-align:center;
            width: 100%;
        }
        ${idSelector} .main-listings-page .all-listings .details {
            padding: 15px 0 0 0;
            display: flex;
            flex-direction: column;
            gap: 15px;
            background: #fff;
            text-align:start;
        }
        ${idSelector} .main-listings-page .all-listings .address{
            align-items: flex-end;
            background: linear-gradient(#0000,#000);
            bottom: 0;
            color: #fff;
            display: flex;
            font-size: 20px;
            height: 50%;
            left: 0;
            line-height: 1.25;
            margin: 0;
            padding: 10px 15px;
            pointer-events: none;
            position: absolute;
            text-align: left;
            text-shadow: 0 1px 2px #0009;
            width: 100%;
        }
        ${idSelector} .main-listings-page .all-listings .lstng_ttl, .main-listings-page .all-listings .details p{
            padding: 0 0 0 10px;
        }
        ${idSelector} .main-listings-page .all-listings .lstng_ttl, .main-listings-page .all-listings .details *{
            margin: 0;
        }
        
        @media only screen and (max-width: 1366px){
            ${idSelector} .main-listings-page .listing-item {
                width: 49%;
            }
        }
        @media only screen and (max-width: 1348px){
            ${idSelector} .listing-filters select, .listing-filters input[type=submit]{
                margin-bottom: 0;
                margin-top: 15px;
            }
            ${idSelector} .listing-filters form{
                margin-bottom: 15px;
            }
        }
        @media screen and (max-width: 767px) {
            ${idSelector} .listing-filters select, .listing-filters input[type=submit] {
                width: 48%;
                margin: 1%;
                font-size: 13px;
            }
            ${idSelector} .main-listings-page #googlemap {
                width: 100%;
                height: 246px;
            }
             ${idSelector} .main-listings-page .all-listings {
                width: 100%;
                height: auto;
                overflow-y: hidden;
            }
         
            ${idSelector} .main-listings-page .listing-item {
                width: 100%;
            }
        }`;
    }
    listingHtml += '</style>';
    listingHtml += `<div class="main-listings-page mjwi-apfl-template-${template}" style="width: 100%; max-width: 100%;">`;
    listingHtml += '<div class="mjwi-apfl-details-popup" style="display: none"></div>';
    listingHtml += '<div class="mjwi-listings-container">';
    listingHtml += '<div class="listing-filters">';
    listingHtml += '<div class="apfl_page_hdng">' + appfolioHeading + '</div>';

    listingsArr[widgetId] = [];
    let db = {};

    for (let i = 0; i < Math.min(listing_items.length, 12); i++) {

        let listing = listing_items[i];
        let id = listing.attributes.id.value;
        id = id.replace('listing_', '');
        db[i] = {};
        db[i]['id'] = id;
        db[i]['BED'] = 'N/A';
        db[i]['BATH'] = 'N/A';

        // Assuming listing is an object representing your HTML structure
        let listingItemBody = listing.querySelector('.listing-item__body');
        let listingItemAction = listing.querySelector('.listing-item__actions');
        let listingImgObj = listing.querySelector('img.listing-item__image');
        let listingImg = listingImgObj ? listingImgObj.dataset.original : '';

        if (listingItemBody) {
            Array.from(listingItemBody.querySelectorAll('.detail-box__item')).forEach(dbItem => {
                let label = dbItem.querySelector('.detail-box__label').innerText;
                let val = dbItem.querySelector('.detail-box__value').innerText;

                if (label === 'Bed / Bath') {
                    if (val.includes('bd') && val.includes('ba')) {

                        let bedsAndBaths = val.split(' bd / ');
                        let beds = bedsAndBaths[0];
                        let baths = bedsAndBaths[1].split(' ba')[0];

                        db[i]['BED'] = beds + ' Beds';
                        db[i]['BATH'] = baths + ' Baths';
                    } else if (val.includes('Studio')) {

                        db[i]['BED'] = 'Studio';
                        db[i]['BATH'] = 'N/A';
                    }
                } else if (label == 'RENT') {
                    db[i][label] = parseFloat(val.replace('$', '').replace(',', ''))
                }
                else {
                    db[i][label] = val;
                }
            });

            let listingTitleObj = listingItemBody.querySelector('.js-listing-title a');
            let listingTitle = listingTitleObj ? listingTitleObj.innerText : '';
            let listingAddressObj = listingItemBody.querySelector('.js-listing-address');
            let listingAddress = listingAddressObj ? listingAddressObj.innerText : '';
            let listingDescriptionObj = listingItemBody.querySelector('.js-listing-description');
            let listingDescription = listingDescriptionObj ? listingDescriptionObj.innerText : '';
            let listingPetPolicyObj = listingItemBody.querySelector('.js-listing-pet-policy');
            let listingPetPolicy = listingPetPolicyObj ? listingPetPolicyObj.innerText : '';

            let catsStatus = '';
            let dogsStatus = '';

            if (listingPetPolicy) {
                const petPolicyParts = listingPetPolicy.split(':');

                if (petPolicyParts.length >= 2) {
                    catsStatus = petPolicyParts[1]?.split(',')[0]?.split(' ')[2];
                    dogsStatus = petPolicyParts[1]?.split(',')[1];

                    if (dogsStatus) {
                        let dogsArr = dogsStatus.split(' ');

                        if (Array.isArray(dogsArr)) {
                            if (dogsArr.length == 3) {
                                dogsStatus = dogsArr[2];
                            } else if (dogsArr.length == 4) {
                                dogsStatus = dogsArr[1];
                            }
                        }
                    }
                }
            }

            db[i]['catsStatus'] = catsStatus;
            db[i]['dogsStatus'] = dogsStatus;

            let listingApplyLink = '';
            let listingDetailLink = '';
            let listingItemAction = listing.querySelector('.listing-item__actions');

            if (listingItemAction) {

                let listingApplyElement = listingItemAction.querySelector('.js-listing-apply');
                if (listingApplyElement) {
                    listingApplyLink = clientListingsUrl + listingApplyElement.href.replace(window.location.origin + '/', '').replace('C:/', '');
                }

                let listingDetailsLink = listingItemAction.querySelector('.js-link-to-detail');
                if (listingDetailsLink) {
                    listingDetailLink = clientListingsUrl + listingDetailsLink.href.replace(window.location.origin + '/', '').replace('C:/', '');
                }

            }

            db[i]['listingDetailLink'] = listingDetailLink;
            db[i]['listingApplyLink'] = listingApplyLink;
            db[i]['listingImg'] = listingImg;
            db[i]['listingTitle'] = listingTitle;
            db[i]['listingAddress'] = listingAddress;


        }
    }

    let formHtml = '';
    let minRent = Number.MAX_VALUE;
    let maxRent = 0;
    let maxBeds = 0;
    let maxBaths = 0;
    let cities = [];
    let zips = [];


    for (let i = 0; i < Object.keys(db).length; i++) {
        minRent = Math.min(minRent, db[i]['RENT']);
        maxRent = Math.max(maxRent, db[i]['RENT']);

        maxBeds = Math.max(maxBeds, parseInt(db[i]['BED'].split(' ')[0]) || 0);
        maxBaths = Math.max(maxBaths, parseInt(db[i]['BATH'].split(' ')[0]) || 0);


        let address = db[i]['listingAddress'];
        let addressParts = address.split(',');
        let city = addressParts[addressParts.length - 2].trim();
        if (!cities.includes(city)) {
            cities.push(city);
        }
        let zipCode = addressParts[addressParts.length - 1].trim().replace(/\D/g, '');
        if (!zips.includes(zipCode)) {
            zips.push(zipCode);
        }

    }

    if (displayFilters.search) {
        formHtml = '<input type="search" name="filters[listing_address]" placeholder="Search by address...">';
    }

    if (displayFilters.minRent) {
        formHtml += '<select name="filters[market_rent_from]"><option value="' + minRent + '">Min ' + rentText + '</option>';
        for (let i = minRent; i <= maxRent; i += 100) {
            formHtml += '<option value="' + i + '">$' + i + '</option>';
        }
        formHtml += '</select>';
    }

    if (displayFilters.maxRent) {
        formHtml += '<select name="filters[market_rent_to]"><option value="' + maxRent + '">Max ' + rentText + '</option>';
        for (let i = minRent; i <= maxRent; i += 100) {
            formHtml += '<option value="' + i + '">$' + i + '</option>';
        }
        formHtml += '</select>';
    }

    if (displayFilters.beds) {
        formHtml += '<select name="filters[bedrooms]"><option value="0">Beds</option>';
        for (let i = 1; i <= maxBeds; i++) {
            formHtml += '<option value="' + i + '">' + i + '+</option>';
        }
        formHtml += '</select>';
    }

    if (displayFilters.baths) {
        formHtml += '<select name="filters[bathrooms]"><option value="0">Baths</option>';
        for (let i = 1; i <= maxBaths; i++) {
            formHtml += '<option value="' + i + '">' + i + '+</option>';
        }
        formHtml += '</select>';
    }

    if (displayFilters.cities) {
        formHtml += '<select name="filters[cities]"><option value="">City</option>';
        for (let i = 0; i < cities.length; i++) {
            formHtml += '<option value="' + cities[i] + '">' + cities[i] + '</option>';
        }

        formHtml += '</select>';
    }

    if (displayFilters.zip) {
        formHtml += '<select name="filters[zips]"><option value="">Zip</option>';
        for (let i = 0; i < zips.length; i++) {
            formHtml += '<option value="' + zips[i] + '">' + zips[i] + '</option>';
        }

        formHtml += '</select>';
    }

    if (displayFilters.cats) {
        formHtml += '<select name="filters[cats]"><option value="yes">Cats allowed</option>';
        formHtml += '<option value="yes">Yes</option>';
        formHtml += '<option value="no">No</option>';
        formHtml += '</select>';
    }

    if (displayFilters.dogs) {
        formHtml += '<select name="filters[dogs]"><option value="large">Dogs allowed</option>';
        formHtml += '<option value="large">Large</option>';
        formHtml += '<option value="small">Small</option>';
        formHtml += '<option value="no">No</option>';
        formHtml += '</select>';
    }

    if (displayFilters.sorting) {
        formHtml += '<select name="filters[sort_order]"><option value="date_posted">Sort order</option>';
        formHtml += '<option value="date_posted" ' + (appfolioSortOrder === 'date_posted' ? 'selected' : '') + '>Most Recent</option>';
        formHtml += '<option value="rent_asc" ' + (appfolioSortOrder === 'rent_asc' ? 'selected' : '') + '>Rent (Low to High)</option>';
        formHtml += '<option value="rent_desc" ' + (appfolioSortOrder === 'rent_desc' ? 'selected' : '') + '>Rent (High to Low)</option>';
        formHtml += '<option value="bedrooms_asc" ' + (appfolioSortOrder === 'bedrooms_asc' ? 'selected' : '') + '>Bedrooms (ASC)</option>';
        formHtml += '<option value="bedrooms_desc" ' + (appfolioSortOrder === 'bedrooms_desc' ? 'selected' : '') + '>Bedrooms (DESC)</option>';
        formHtml += '<option value="availability" ' + (appfolioSortOrder === 'availability' ? 'selected' : '') + '>Availability</option>';
        formHtml += '</select>';
    }

    if (displayFilters.desiredMoveIn) {
        formHtml += '<input type="text" onfocus="(this.type=\'date\')" name="filters[desired_move_in]" placeholder="Desired Move In Date">';
    }
    listingHtml += formHtml;

    listingHtml += '</div>';
    if (clientGmapApi) {
        listingHtml += '<div id="googlemap"></div>';
        listingHtml += '<div id="map"></div>';
    }
    listingHtml += '<div class="all-listings">';


    // Create the HTML structure
    for (let i = 0; i < Math.min(listing_items.length, 12); i++) {
        let itemHtml = '';
        itemHtml += '<div class="listing-item column mcb-column one-third">';
        itemHtml += '<a class="mjwi-apfl-details-page" data-id="' + db[i]['listingDetailLink'] + '" href="javascript:void(0);">';
        itemHtml += '<div class="list-img">';
        itemHtml += '<img decoding="async" src="' + db[i]['listingImg'] + '">';
        itemHtml += '<span class="rent-price">$' + db[i]['RENT'] + '</span>';
            itemHtml += '<span class="lstng-avail">' + db[i]['Available'] + '</span>';

        if (template == 'hawk') {
            itemHtml += '<h3 class="address">' + db[i]['listingAddress'] + '</h3>';
        }

        itemHtml += '</div></a><div class="details">';
        let apfl_listings_price_pos = 'offimage';
        let isDisplayPrice = true;

        if (isDisplayPrice && apfl_listings_price_pos == 'offimage') {
            if (template === 'hawk') {
                itemHtml += '<span class="rent-price-off">RENT<b>$' + db[i]['RENT'] + '</b></span>';
            } 
        }

        let isDisplayAvail = true;

        if (isDisplayAvail && apfl_listings_price_pos == 'offimage') {
            if (template === 'hawk') {
                itemHtml += '<span class="lstng-avail-off">Available '+ db[i]['Available'] +'</span>';
            }
        }

        itemHtml += '<h4 class="lstng_ttl">' + db[i]['listingTitle'] + '</h4>';
        if (template != 'hawk') {
            itemHtml += '<h5 class="address">' + db[i]['listingAddress'] + '</h5>';
        }
        itemHtml += '<p>';
        if (isDisplayBeds) {
            itemHtml += '<img decoding="async" class="bedimg" src="' + bedImage + '">';
            itemHtml += '<span class="beds">' + db[i]['BED'] + '</span>';
        }

        if (isDisplayBaths) {
            itemHtml += '<img decoding="async" class="bathimg" src="' + bathImage + '">';
            itemHtml += '<span class="baths">' + db[i]['BATH'] + '</span>';
        }
        itemHtml +='</p>';
        itemHtml += '<div class="btns">';
        itemHtml += '<a class="more_detail_btn mjwi-apfl-details-page" data-id="' + db[i]['listingDetailLink'] + '" href="javascript:void(0);">Details</a>';
        itemHtml += '<a class="apply_btn" href="' + db[i]['listingApplyLink'] + '" target="_blank">Apply</a>';
        itemHtml += '</div></div></div>';

        let id = db[i]['id'];
        let rentValue = db[i]['RENT'];
        let bedValue = db[i]['BED'];
        let bathValue = db[i]['BATH'];
        let availableValue = db[i]['Available'];
        let listingAddress = db[i]['listingAddress'];
        let catsStatus = db[i]['catsStatus'];
        let dogsStatus = db[i]['dogsStatus'];
        let listingDetailLink = db[i]['listingDetailLink'];
        let listingImg = db[i]['listingImg'];

        listingsArr[widgetId].push({
            id,
            itemHtml,
            rentValue,
            bedValue,
            bathValue,
            availableValue,
            listingAddress,
            catsStatus,
            dogsStatus,
            listingDetailLink,
            listingImg
        });

    }

    switch (appfolioSortOrder) {

        case 'rent_asc':
            listingsArr[widgetId].sort((a, b) => (a.rentValue || Infinity) - (b.rentValue || Infinity));
            break;
        case 'rent_desc':
            listingsArr[widgetId].sort((a, b) => (b.rentValue || Infinity) - (a.rentValue || Infinity));
            break;
        case 'bedrooms_asc':
            listingsArr[widgetId].sort((a, b) => {
                const bedA = a.bedValue || '';
                const bedB = b.bedValue || '';

                if (bedA === 'Studio' || bedA === 'N/A') return 1;
                if (bedB === 'Studio' || bedB === 'N/A') return -1;

                return bedA.localeCompare(bedB);
            });
            break;
        case 'bedrooms_desc':
            listingsArr[widgetId].sort((a, b) => {
                const bedA = a.bedValue || '';
                const bedB = b.bedValue || '';

                if (bedA === 'Studio' || bedA === 'N/A') return 1;
                if (bedB === 'Studio' || bedB === 'N/A') return -1;

                return bedB.localeCompare(bedA);
            });
            break;
        case 'availability':
            listingsArr[widgetId].sort((a, b) => (a.availableValue || '').localeCompare(b.availableValue || ''));
            break;
        default:
            break;

    }
    if (listingsArr[widgetId].length == 0) {
        listingHtml += '<div class="no-listings"><p>No vacancies found matching your search criteria. Please select other filters.</p></div>';
    } else {
        listingsArr[widgetId].forEach((listing, i) => {
            if (template !== 'hawk') {
                if (i % appfolioCol === 0) {
                    listingHtml += '<div class="listing-items-grp">';
                }
            }

            listingHtml += listing.itemHtml;

            if (template !== 'hawk') {
                if (((i + 1) % appfolioCol === 0) || (i + 1 === Math.min(listingsArr[widgetId].length, 12))) {
                    listingHtml += '</div>';
                }
            }
        });

    }

    if (clientGmapApi) {
        let lat_longs = '';
        let scripts = tempDoc.querySelectorAll('script');
        let markers_obj = scripts[scripts.length - 2];

        if (markers_obj) {
            let markers = markers_obj.innerHTML;
            markers = markers.split('markers:');

            if (markers.length > 1) {
                markers = markers[1].split('infoWindowTemplate');
                lat_longs = JSON.parse(markers[0].replace(/],/g, ']'));
            }
        }

        lat_longs.forEach(pos => {
            let id = pos.listing_id;
            let latitude = pos.latitude;
            let longitude = pos.longitude;
            const item = listingsArr[widgetId].find((item) => { return item.id == id });
            if (item) {
                item.latitude = latitude;
                item.longitude = longitude;
            }

        })

        let textarea_input = '';

        if (lat_longs.length > 0) {
            let init_lat = lat_longs[0].latitude;
            let init_lng = lat_longs[0].longitude;
            let is_initcity = false;

            let grouped_positions = {};
            lat_longs.forEach(pos => {
                let init_address = pos.address;

                if (textarea_input) {
                    if (!(init_address.toLowerCase().includes(textarea_input.toLowerCase()))) {
                        return;
                    }
                }

                let lat_long_key = `${pos.latitude}_${pos.longitude}`;
                if (!is_initcity) {
                    init_lat = pos.latitude;
                    init_lng = pos.longitude;
                    is_initcity = true;
                }
                if (!grouped_positions[lat_long_key]) {
                    grouped_positions[lat_long_key] = [];
                }
                grouped_positions[lat_long_key].push(pos);
            });


            // Init map function
            function initMap() {
                const initCity = { lat: init_lat, lng: init_lng };
                defaultCity = initCity;
                var widgetId = appfolio.closest('.mj-widget').attributes.id.value;
                var map = new google.maps.Map(
                  
                    document.querySelector(`[id='${widgetId}'] #googlemap`), { zoom: 8, center: initCity }
                );

                let i = 1;

                for (let lat_long_key in grouped_positions) {
                    let group = grouped_positions[lat_long_key];

                    let infowindows_content = '';

                    group.forEach(pos => {
                        let lstng_id = '';
                        let lid_url = pos.detail_page_url;

                        let lid_url_arr = lid_url.split('/');
                        if (lid_url_arr.length > 0) {
                            lstng_id = lid_url_arr[lid_url_arr.length - 1];
                        }

                        infowindows_content += `<div class="mm-prop-popup">
                        <div class="map-popup-thumbnail"><a href="${window.location.origin}?lid=${lstng_id}" target="_blank"><img src="${pos.default_photo_url}" width="144"></a></div>
                        <div class="map-popup-info">
                            <h3 class="map-popup-rent">${pos.market_rent}</h3>
                            <p class="map-popup-specs">${pos.unit_specs}</p>
                            <p class="map-popup-address">${pos.address}</p>
                            <p><a href="${window.location.origin}?lid=${lstng_id}" target="_blank" class="btn btn-secondary btn-sm pt-1 pb-1">Details</a>
                                <a href="https://maps.google.com/maps?daddr=${pos.address}" target="_blank" class="btn btn-secondary btn-sm pt-1 pb-1 directions-link">Directions</a>
                            </p>
                        </div>
                    </div>`;
                    });

                    infowindows_content = infowindows_content.slice(0, -1);
    
                    let [latitude, longitude] = lat_long_key.split('_');
                    var infowindow = new google.maps.InfoWindow({
                        content: infowindows_content
                    });
            
                    var marker = new google.maps.Marker({
                        map: map,
                        position: new google.maps.LatLng(latitude, longitude)
                    });
                    addClickListener(marker, infowindow);

                    i++;
                }

            }
        }
       
    }
    listingHtml += '</div></div></div>';

    if(clientGmapApi) {
        window.initMap = initMap;
        const scriptElement = document.createElement('script');
        scriptElement.type = 'text/javascript';
        scriptElement.src = `https://maps.googleapis.com/maps/api/js?key=${clientGmapApi}&callback=initMap`;

        document.head.appendChild(scriptElement);
    }

    if (widgetId != "mjwi-appfolio-preview") {
        document.getElementById(widgetId).querySelector(".mj-appfolio").innerHTML = listingHtml;
    } else {
        document.querySelector(".mj-appfolio").innerHTML = listingHtml;
    }


    let parentElement = document.querySelector(`[id='${widgetId}']  .mj-appfolio`);
    let filtersArray = [];

    // Search by address
    let addressSearchNode = parentElement.querySelector(`[id='${widgetId}']  input[name="filters[listing_address]"]`);

    if (addressSearchNode) {
        addressSearchNode.addEventListener('input', function (event) {
            let addressSearchVal = event.target.value.toLowerCase();
            filtersArray = filtersArray.filter(filter => filter.type !== 'listing_address');
            if (addressSearchVal !== '') {
                filtersArray.push({ type: 'listing_address', value: addressSearchVal });
            }
            applyFilters(filtersArray, widgetId);
        });
    }

    let rentMinFilterNode = parentElement.querySelector(`[id='${widgetId}']  select[name="filters[market_rent_from]"]`);
    let rentMaxFilterNode = parentElement.querySelector(`[id='${widgetId}']  select[name="filters[market_rent_to]"]`);

    let rentMinFilterVal = rentMinFilterNode ? rentMinFilterNode.value : minRent;
    let rentMaxFilterVal = rentMaxFilterNode ? rentMaxFilterNode.value : maxRent;

    if (rentMinFilterNode) {
        rentMinFilterNode.addEventListener('change', function (event) {
            rentMinFilterVal = event.target.value;
            filtersArray = updateRentFilters(filtersArray, rentMinFilterVal, rentMaxFilterVal);
            applyFilters(filtersArray, widgetId);
        });
    }

    if (rentMaxFilterNode) {
        rentMaxFilterNode.addEventListener('change', function (event) {
            rentMaxFilterVal = event.target.value;
            filtersArray = updateRentFilters(filtersArray, rentMinFilterVal, rentMaxFilterVal);
            applyFilters(filtersArray, widgetId);
        });
    }

    // Function to update rent filters
    function updateRentFilters(filtersArray, minRent, maxRent) {
        filtersArray = filtersArray.filter(filter => filter.type !== 'market_rent');

        if (minRent !== '' && maxRent !== '') {
            filtersArray.push({ type: 'market_rent', min: minRent, max: maxRent });
        } else if (minRent !== '') {
            filtersArray.push({ type: 'market_rent', min: minRent });
        } else if (maxRent !== '') {
            filtersArray.push({ type: 'market_rent', max: maxRent });
        }

        return filtersArray;
    }

    // Bedrooms filter
    let bedFilterNode = parentElement.querySelector(`[id='${widgetId}']  select[name="filters[bedrooms]"]`);
    if (bedFilterNode) {
        bedFilterNode.addEventListener('change', function (event) {
            let bed = event.target.value;
            filtersArray = filtersArray.filter(filter => filter.type !== 'bedrooms');
            if (bed !== '') {
                filtersArray.push({ type: 'bedrooms', value: bed });
            }
            var widgetId = appfolio.closest('.mj-widget').attributes.id.value;
            console.log(widgetId)
            applyFilters(filtersArray, widgetId);
        });
    }

    // Bathrooms filter
    let bathFilterNode = parentElement.querySelector(`[id='${widgetId}']  select[name="filters[bathrooms]"]`);

    if (bathFilterNode) {
        bathFilterNode.addEventListener('change', function (event) {
            let bath = event.target.value;
            filtersArray = filtersArray.filter(filter => filter.type !== 'bathrooms');
            if (bath !== '') {
                filtersArray.push({ type: 'bathrooms', value: bath });
            }
            applyFilters(filtersArray, widgetId);
        });
    }

    // Cities filter
    let cityFilterNode = parentElement.querySelector(`[id='${widgetId}']  select[name="filters[cities]"]`);
    if (cityFilterNode) {
        cityFilterNode.addEventListener('change', function (event) {
            let city = event.target.value;
            filtersArray = filtersArray.filter(filter => filter.type !== 'cities');
            if (city !== '') {
                filtersArray.push({ type: 'cities', value: city });
            }
            applyFilters(filtersArray, widgetId);
        });

        // Zip
        let zipFilterNode = parentElement.querySelector(`[id='${widgetId}']  select[name="filters[zips]"]`);

        if (zipFilterNode) {
            zipFilterNode.addEventListener('change', function (event) {
                let zip = event.target.value;
                filtersArray = filtersArray.filter(filter => filter.type !== 'zips');
                if (zip !== '') {
                    filtersArray.push({ type: 'zips', value: zip });
                }
                applyFilters(filtersArray, widgetId);
            });
        }

        // Dogs
        let dogFilterNode = parentElement.querySelector(`[id='${widgetId}']  select[name="filters[dogs]"]`);

        if (dogFilterNode) {
            dogFilterNode.addEventListener('change', function (event) {
                let dogsAllowed = event.target.value;
                filtersArray = filtersArray.filter(filter => filter.type !== 'dogs');
                if (dogsAllowed !== '') {
                    filtersArray.push({ type: 'dogs', value: dogsAllowed });
                }
                applyFilters(filtersArray, widgetId);
            });
        }

        // Cats
        let catsFilterNode = parentElement.querySelector('select[name="filters[cats]"]');

        if (catsFilterNode) {
            catsFilterNode.addEventListener('change', function (event) {
                let catsAllowed = event.target.value;
                filtersArray = filtersArray.filter(filter => filter.type !== 'cats');
                if (catsAllowed !== '') {
                    filtersArray.push({ type: 'cats', value: catsAllowed });
                }
                applyFilters(filtersArray, widgetId);
            });
        }


        // Desired move in
        let dateFilterNode = parentElement.querySelector(`[id='${widgetId}']  input[name="filters[desired_move_in]"]`);
        if (dateFilterNode) {
            dateFilterNode.addEventListener('change', function (event) {
                let selectedDate = event.target.value;

                filtersArray = filtersArray.filter(filter => filter.type !== 'desired_move_in');
                if (selectedDate !== '') {
                    filtersArray.push({ type: 'desired_move_in', value: selectedDate });
                }
                applyFilters(filtersArray, widgetId);
            });
        }

        // Sorting
        let sortFilterNode = parentElement.querySelector(`[id='${widgetId}']  select[name="filters[sort_order]"]`);
        if (sortFilterNode) {
            sortFilterNode.addEventListener('change', function (event) {
                let sortOrder = event.target.value;
                filtersArray = filtersArray.filter(filter => filter.type !== 'sort_order');
                if (sortOrder !== '') {
                    filtersArray.push({ type: 'sort_order', value: sortOrder });
                }
                var widgetId = appfolio.closest('.mj-widget').attributes.id.value;

                applyFilters(filtersArray, widgetId);
            });
        }

        // Details page
        let detailsLinkNodes = parentElement.querySelectorAll(`[id='${widgetId}']  .mjwi-apfl-details-page`);

        detailsLinkNodes.forEach(function (detailsLinkNode) {
            detailsLinkNode.addEventListener('click', async function (event) {

                document.querySelector(`[id='${widgetId}']  .mjwi-apfl-details-popup`).innerHTML = '<div class="mj-appfolio">Loading...</div>';
                    document.querySelector(`[id='${widgetId}']  .mjwi-apfl-details-popup`).style.display = 'block';
                    document.querySelector(`[id='${widgetId}']  .mjwi-listings-container`).style.display = 'none';


                let detailsPageLink = detailsLinkNode.dataset.id;
                let detailsPageHtml = '';
                let errorHtml = '';

                const postData = {
                    url: detailsPageLink
                };

                await fetchDetailsData('http://localhost:3001/widget/appfolio/details', postData)
                    .then(response => {
                        detailsPageHtml = response.detailsHtml;
                    })
                    .catch(error => {
                        console.log(error)
                        errorHtml = '<div className=""mjwi-apfl-error>' + error.message + '</div>';
                    });

                if (detailsPageHtml != '') {
                    let listingImages = [];
                    let sl_html = '';
                    let i = 0;

                    const parser = new DOMParser();
                    const detailsDom = parser.parseFromString(detailsPageHtml, 'text/html');

                    let mainGallery = detailsDom.querySelector('main .gallery');
                    if (mainGallery) {
                        let mainImgs = mainGallery.querySelectorAll(`a.swipebox`);
                        if (mainImgs) {
                            mainImgs.forEach((mainImg) => {
                                listingImages[i] = {
                                    'href': mainImg.getAttribute('href')
                                };

                                let src = mainImg.style.backgroundImage;
                                if (src) {
                                    let ini = src.indexOf('(') + 1;
                                    let len = src.indexOf(')', ini) - ini;
                                    listingImages[i]['img_url'] = src.substr(ini, len);
                                } else {
                                    let imgSrcObj = mainImg.querySelector('img');
                                    let imgSrc = imgSrcObj.getAttribute('src');
                                    listingImages[i]['img_url'] = imgSrc;
                                }

                                i++;
                            });
                        }

                        let extraImgs = detailsDom.querySelectorAll(`div[style="display:none"] a.swipebox`);
                        if (extraImgs) {
                            extraImgs.forEach((extraImg) => {
                                listingImages[i] = {
                                    'href': extraImg.getAttribute('href')
                                };
                                let extImgObj = extraImg.querySelector('img');
                                listingImages[i]['img_url'] = extImgObj.getAttribute('src');
                                i++;
                            });
                        }
                    }

                    let listing_details = detailsDom.querySelector('.listing-detail');
                    if (listing_details) {
                        let ld_body = listing_details.querySelector('.listing-detail__body');
                        let address = '';
                        let place_area = '';
                        let availability = '';
                        let ttl = '';
                        let dsc = '';
                        let extra_fields = [];

                        if (ld_body) {
                            let address_obj = ld_body.querySelector('.header .js-show-title');
                            address = address_obj ? address_obj.innerHTML : '';

                            let bb_obj = ld_body.querySelector('.header .header__summary');
                            let bed_bath_avail = bb_obj ? bb_obj.innerHTML : '';

                            // Check if bed_bath_avail is a non-empty string before attempting to split
                            if (bed_bath_avail && typeof bed_bath_avail === 'string') {
                                bed_bath_avail = bed_bath_avail.split("| ");

                                if (bed_bath_avail.length > 0) {
                                    if (bed_bath_avail[0].includes('Sq.')) {
                                        let reversedParts = bed_bath_avail[0].split(' ,').reverse();
                                        // Check if reversedParts is an array and has at least one element
                                        if (Array.isArray(reversedParts) && reversedParts.length > 0) {
                                            place_area = reversedParts[0];
                                        }
                                    }
                                    if (bed_bath_avail.length > 1) {
                                        availability = bed_bath_avail[1];
                                    }
                                }
                            }

                            let ttl_obj = ld_body.querySelector('.listing-detail__title');
                            ttl = ttl_obj ? ttl_obj.innerHTML : '';

                            let dsc_obj = ld_body.querySelector('.listing-detail__description');
                            dsc = dsc_obj ? dsc_obj.innerHTML : '';

                            extra_fields = ld_body.querySelectorAll(`.grid div`);
                        }


                        let rent_price = '';
                        let bed_std = '';
                        let baths = '';
                        let schshowing_btn_link = '';
                        let apply_btn_link = '';
                        let contact_btn_link = '';
                        let logo_link = '';
                        let phn_ctc = '';

                        let ld_sidebar = listing_details.querySelector('.sidebar');
                        if (ld_sidebar) {
                            let rent_cap = ld_sidebar.firstElementChild;
                            if (rent_cap) {
                                let rent_price_obj = rent_cap.querySelector('h2');
                                rent_price = rent_price_obj ? rent_price_obj.innerHTML : '';

                                let cap_bed_baths_obj = rent_cap.querySelector('h3');

                                let cap_bed_baths = cap_bed_baths_obj ? cap_bed_baths_obj.innerHTML : '';

                                // Check if cap_bed_baths is a non-empty string before attempting to split
                                if (cap_bed_baths && typeof cap_bed_baths === 'string') {
                                    cap_bed_baths = cap_bed_baths.split("/");
                                    if (cap_bed_baths.length === 2) {
                                        bed_std = cap_bed_baths[0].replace("bd", "Bed");
                                        baths = cap_bed_baths[1].replace("ba", "Baths");
                                    }
                                }

                                let btns = ld_sidebar.querySelector('.foot-button');
                                if (btns) {
                                    let schshowing_btn_link_obj = btns.querySelector('.js-schedule-showing');
                                    schshowing_btn_link = schshowing_btn_link_obj ? schshowing_btn_link_obj.href : '';

                                    let apply_btn_link_obj = btns.querySelector('.btn-warning');
                                    apply_btn_link = apply_btn_link_obj ? apply_btn_link_obj.href : '';

                                    let contact_btn_link_obj = btns.querySelector('.btn-secondary');
                                    contact_btn_link = contact_btn_link_obj ? clientListingsUrl + contact_btn_link_obj.href : '';
                                }

                                let logo_link_obj = ld_sidebar.querySelector('.sidebar__portfolio-logo');
                                logo_link = logo_link_obj ? logo_link_obj.src : '';

                                let phn_ctc_obj = ld_sidebar.querySelector('.u-pad-bl');
                                if (phn_ctc_obj) {
                                    // Check if innerHTML is a non-empty string
                                    phn_ctc = phn_ctc_obj.innerHTML && typeof phn_ctc_obj.innerHTML === 'string'
                                        ? phn_ctc_obj.innerHTML.replace(/<a(?:[^>]+)?>.*?<\/a>/s, '')
                                        : '';
                                }
                            }
                        }


                        let backToListingsHtml = '<div style="margin-bottom: 2rem;">';
                        backToListingsHtml += '<a class="mjwi-apfl-all-listings" href="javascript:void(0)" style="margin-left: 2%;"> &lt;&lt; All Listings</a>';
                        backToListingsHtml += '</div>';

                        sl_html += backToListingsHtml;


                        var galleryHtml = '<div class="listing-sec"><div class="apfl-column apfl-two-fifth">';
                        if (listingImages) {
                            galleryHtml += '<div class="apfl-gallery">';
                            var j = 1;
                            var videoUrl = '';
                            
                            listingImages.forEach(function (listImg) {
                                if (listImg.href.includes('youtube')) {
                                    videoUrl = listImg.href;
                                }

                                galleryHtml += '<div class="mySlides">' +
                                    '<div class="numbertext">' + j + ' / ' + listingImages.length + '</div>' +
                                    '<img src="' + (listImg.href.includes('youtube') ? listImg.img_url : listImg.href) + '" data-href="' + listImg.href + '" data-id="apfl_gal_img_' + j + '">' +
                                    '</div>';
                                j++;
                            });

                            galleryHtml += '<a class="prev" onclick="plusSlides(-1)">&#10094;</a>' +
                                '<a class="next" onclick="plusSlides(1)">&#10095;</a>' +
                                '<div class="row" style="margin-top: 7px;">';

                            var k = 1;
                            listingImages.forEach(function (listImg) {
                                galleryHtml += '<div id="image-prvw" class="imgcolumn">' +
                                    '<img class="demo cursor" src="' + listImg.img_url + '" onclick="currentSlide(' + k + ')">' +
                                    '</div>';
                                k++;
                            });

                            galleryHtml += '</div></div>';

                            if (videoUrl) {
                                var iframeCode = videoUrl.replace(/\s*[a-zA-Z\/\/:\.]*youtube.com\/watch\?v=([a-zA-Z0-9\-_]+)([a-zA-Z0-9\/\*\-\_\?\&\;\%\=\.]*)/i, '<iframe width="560" height="330" src="//www.youtube.com/embed/$1" frameborder="0" allowfullscreen></iframe>');

                                galleryHtml += '<div id="apfl-vdo">' +
                                    iframeCode +
                                    '</div>';
                            }
                        }

                        galleryHtml += '</div>';
                        sl_html += galleryHtml;

                        sl_html += '<div class="apfl-column apfl-three-fifth">';

                        sl_html += '<div class="lst-dtls"><div class="details-left"><h3 class="address-hdng">' + address + '</h3>';
                        sl_html += '<p class="bed-bath-std">';


                        sl_html += bedImage ? '<img class="bedimg" src="' + bedImage + '"><span>' + bed_std + '</span>' :
                            '<img class="bedimg" src="' + apfl_plugin_url + 'images/sleep.png"><span>' + bed_std + '</span>';


                        sl_html += bathImage ? '<img class="bathimg" src="' + bathImage + '"><span>' + baths + '</span>' :
                            '<img class="bathimg" src="' + apfl_plugin_url + 'images/bathtub.png"><span>' + baths + '</span>';

                        if (place_area) {
                            sl_html += '<span> | ' + place_area + '</span>';
                        }

                        sl_html += '</p></div><div class="details-right">';


                        // Remove per mo
                        rent_price = rent_price.replace('/mo', '');

                        sl_html += '<p class="rent-hdng"><img class="price-tag" src="' + dollarImg + '">' + rent_price + '</p>';

                        if (availability) {
                            sl_html += '<p style="margin-bottom: 1rem;">';
                            if (availability.replace(/\s+/g, '') == 'AvailableNow') {
                                sl_html += '<img class="avail-now" src="' + checkImg + '">';
                            }
                            sl_html += '<span id="avail-txt">' + availability + '</span>';
                            sl_html += '</p>';
                        }

                        let phn_nmbr = phn_ctc.split('<br>');
                        if (phn_nmbr.length > 1) {
                            phn_nmbr = phn_nmbr[1];
                            sl_html += '<a class="call-top" href="tel:' + phn_nmbr + '"><img class="call-now" src="' + phoneImg + '"><strong>' + phn_nmbr + '</strong></a>';
                        }

                        sl_html += '</div></div>';
                        let apfl_details_ttl_tag = 'p';

                        sl_html += '<' + apfl_details_ttl_tag + ' class="desctitle">' + ttl + '</' + apfl_details_ttl_tag + '>';


                        sl_html += '<p class="desc">' + dsc + '</p><div class="apfl-half">';
                        if (extra_fields) {
                            sl_html += '<div class="extra">';
                            extra_fields.forEach(field => {
                                sl_html += '<div class="extra-half">';
                                let extra_fld_obj = field.querySelector("h3");
                                if (extra_fld_obj) {
                                    sl_html += '<h4>' + extra_fld_obj.innerHTML + '</h4>';
                                }
                                let extra_fld_ul_obj = field.querySelector("ul");
                                if (extra_fld_ul_obj) {
                                    sl_html += '<ul>' + extra_fld_ul_obj.innerHTML + '</ul>';
                                }
                                sl_html += '</div>';
                            });
                            sl_html += '</div>';
                        }

                        sl_html += '</div><div class="apfl-half apply-sec">';

                        if (schshowing_btn_link) {
                            schshowing_btn_link = clientListingsUrl + schshowing_btn_link;
                            sl_html += '<a id="schshowingBtn" class="sl-btns" target="_blank" href="' + schshowing_btn_link + '">Schedule Showing</a>';
                        }

                        if (apply_btn_link) {
                            apply_btn_link = clientListingsUrl + apply_btn_link;
                            sl_html += '<a id="applyBtn" class="sl-btns" target="_blank" href="' + apply_btn_link + '">Apply Now</a>';
                        }

                        if (contact_btn_link) {
                            sl_html += '<a id="contactBtn" class="sl-btns" target="_blank" href="' + contact_btn_link + '">Contact Us</a>';
                        }

                        sl_html += '<p>' + phn_ctc + '</p></div>';
                    }
                    sl_html += '</div></div>';

                    document.querySelector(`[id='${widgetId}']  .mjwi-apfl-details-popup`).innerHTML = sl_html;
                    showSlides(slideIndex);
                } else {
                    document.querySelector(`[id='${widgetId}']  .mjwi-apfl-details-popup`).innerHTML = errorHtml;
                    document.querySelector(`[id='${widgetId}']  .mjwi-apfl-details-popup`).style.display = 'block';
                    document.querySelector(`[id='${widgetId}']  .mjwi-listings-container`).style.display = 'none';
                }

                let allListingsLink = parentElement.querySelector('.mjwi-apfl-all-listings');
                allListingsLink.addEventListener('click', function (event) {
                    event.preventDefault();
                    document.querySelector(`[id='${widgetId}']  .mjwi-apfl-details-popup`).style.display = 'none';
                    document.querySelector(`[id='${widgetId}']  .mjwi-listings-container`).style.display = 'block';
                    document.querySelector(`[id='${widgetId}']  .mjwi-apfl-details-popup`).innerHTML = '';
                });

            });

        })


    }

}
async function processAppfolioWidgets() {
    for (let index = 0; index < mjAppfolio.length; index++) {
        await prepareAppfolioWidget(mjAppfolio[index]);
    }
}

window[prepareAppfolioWidget] = prepareAppfolioWidget;
processAppfolioWidgets();

var slideIndex = 1;
// Next/previous controls
function plusSlides(n) {
    showSlides(slideIndex += n);
}
// Thumbnail image controls
function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");

    var dots = document.getElementsByClassName("demo");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    if(slides[slideIndex - 1])
    slides[slideIndex - 1].style.display = "block";

    if( dots[slideIndex - 1])
    dots[slideIndex - 1].className += " active";

    if (dots.length > 5) {
        for (i = 0; i < dots.length; i++) {
            dots[i].style.display = "none";
        }
        if (slideIndex > 2 && slideIndex < dots.length - 1) {
            for (i = 0; i < 5; i++) {
                dots[slideIndex - 3 + i].style.display = "block";
            }
        } else if (slideIndex < 3) {
            for (i = 0; i < 5; i++) {
                dots[i].style.display = "block";
            }
        } else if (slideIndex > dots.length - 2) {
            for (i = dots.length - 1; i > dots.length - 6; i--) {
                dots[i].style.display = "block";
            }
        }
    }
}

// Function to apply filters
function applyFilters(filters, widgetId) {
    let filteredListingsArr = [...listingsArr[widgetId]];

    filters.forEach(filter => {
        switch (filter.type) {
            case 'bedrooms':
                filteredListingsArr = filteredListingsArr.filter(item => {
                    const bedValueInt = parseInt(item.bedValue.split(' ')[0]) || 0;
                    const filterValueInt = parseInt(filter.value) || 0;

                    return bedValueInt >= filterValueInt;
                });
                break;

            case 'bathrooms':
                filteredListingsArr = filteredListingsArr.filter(item => {
                    const bathValueInt = parseInt(item.bathValue.split(' ')[0]) || 0;
                    const filterValueInt = parseInt(filter.value) || 0;

                    return bathValueInt >= filterValueInt;
                });
                break;
            case 'cities':
                filteredListingsArr = filteredListingsArr.filter(item => item.listingAddress.toLowerCase().includes(filter.value.toLowerCase()));
                break;
            case 'desired_move_in':
                filteredListingsArr = filteredListingsArr.filter(item => {
                    let itemDateParts = item.availableValue.split('/');
                    let itemDate = new Date('20' + itemDateParts[2], itemDateParts[0] - 1, itemDateParts[1]);
                    let selectedDateParts = filter.value.split('-');
                    let selectedDateObj = new Date(selectedDateParts[0], selectedDateParts[1] - 1, selectedDateParts[2]);

                    // Compare dates
                    return itemDate <= selectedDateObj;
                });
                break;
            case 'zips':
                filteredListingsArr = filteredListingsArr.filter(item => item.listingAddress.toLowerCase().includes(filter.value.toLowerCase()));
                break;
            case 'cats':
                if (filter.value.toLowerCase() === 'yes') {
                    filteredListingsArr = filteredListingsArr.filter(item => item.dogsStatus.toLowerCase() === 'allowed');
                } else if (filter.value.toLowerCase() === 'no') {
                    filteredListingsArr = filteredListingsArr.filter(item => item.dogsStatus.toLowerCase() === 'not');
                }
                break;
            case 'dogs':
                if (filter.value.toLowerCase() === 'large') {
                    filteredListingsArr = filteredListingsArr.filter(item => ['large', 'small', 'allowed'].includes(item.dogsStatus.toLowerCase()));
                } else if (filter.value.toLowerCase() === 'small') {
                    filteredListingsArr = filteredListingsArr.filter(item => ['small', 'allowed'].includes(item.dogsStatus.toLowerCase()));
                } else if (filter.value.toLowerCase() === 'no') {
                    filteredListingsArr = filteredListingsArr.filter(item => item.dogsStatus.toLowerCase() === 'not');
                }
                break;
            case 'listing_address':
                filteredListingsArr = filteredListingsArr.filter(item => item.listingAddress.toLowerCase().includes(filter.value.toLowerCase()));
                break;
            case 'market_rent':
                filteredListingsArr = filteredListingsArr.filter(item => {
                    const rentValueInt = parseInt(item.rentValue, 10);
                    const minRentInt = parseInt(filter.min, 10);
                    const maxRentInt = parseInt(filter.max, 10);

                    return (!isNaN(rentValueInt) && !isNaN(minRentInt) && !isNaN(maxRentInt)) &&
                        (rentValueInt >= minRentInt && rentValueInt <= maxRentInt);
                });
                break;
            case 'sort_order':
                switch (filter.value) {
                    case 'rent_asc':
                        filteredListingsArr.sort((a, b) => (a.rentValue || Infinity) - (b.rentValue || Infinity));
                        break;
                    case 'rent_desc':
                        filteredListingsArr.sort((a, b) => (b.rentValue || Infinity) - (a.rentValue || Infinity));
                        break;
                    case 'bedrooms_asc':
                        filteredListingsArr.sort((a, b) => {
                            const bedA = a.bedValue || '';
                            const bedB = b.bedValue || '';

                            if (bedA === 'Studio' || bedA === 'N/A') return 1;
                            if (bedB === 'Studio' || bedB === 'N/A') return -1;

                            return bedA.localeCompare(bedB);
                        });
                        break;
                    case 'bedrooms_desc':
                        filteredListingsArr.sort((a, b) => {
                            const bedA = a.bedValue || '';
                            const bedB = b.bedValue || '';

                            if (bedA === 'Studio' || bedA === 'N/A') return 1;
                            if (bedB === 'Studio' || bedB === 'N/A') return -1;

                            return bedB.localeCompare(bedA);
                        });
                        break;
                    case 'availability':
                        filteredListingsArr.sort((a, b) => (a.availableValue || '').localeCompare(b.availableValue || ''));
                        break;
                    default:
                        break;
                }

                break;
        }
    });

    // Update the HTML
    let filteredHtml = generateHtml(filteredListingsArr, appfolioCol, widgetId);

    if (widgetId != "mjwi-appfolio-preview") {
        document.getElementById(widgetId).querySelector(".all-listings").innerHTML = filteredHtml;
    } else {
        document.querySelector(".mj-appfolio .all-listings").innerHTML = filteredHtml;
    }
}




function generateHtml(filteredListingsArr, appfolioCol, widgetId) {

    let listingHtml = '';
    for (let i = 0; i < filteredListingsArr.length; i++) {
        if (i % appfolioCol == 0) {
            listingHtml += '<div class="listing-items-grp">';
        }

        listingHtml += filteredListingsArr[i].itemHtml;

        if (((i + 1) % appfolioCol === 0)) {
            listingHtml += '</div>';
        }
    }
    if(clientGmapApi) {
        if ( filteredListingsArr.length > 0 ) {
            
            let init_lat = filteredListingsArr[0].latitude;
            let init_lng = filteredListingsArr[0].longitude;
            let grouped_positions = {};
            for (let i = 0; i < filteredListingsArr.length; i++) {
                let lat_long_key = `${filteredListingsArr[i].latitude}_${filteredListingsArr[i].longitude}`;
            
                if (!grouped_positions[lat_long_key]) {
                    grouped_positions[lat_long_key] = [];
                }
                grouped_positions[lat_long_key].push(filteredListingsArr[i]);

            }
        
            const initCity = { lat: init_lat, lng: init_lng };

            var map = new google.maps.Map(
                document.querySelector(`[id='${widgetId}'] #googlemap`), { zoom: 8, center: initCity }
            );
        
            for (let lat_long_key in grouped_positions) {
                let group = grouped_positions[lat_long_key];
        
                let infowindows_content = '';
        
                group.forEach((pos, index) => {


                    infowindows_content += `<div class="mm-prop-popup">
                                    <div class="map-popup-thumbnail"><a href="${pos.listingDetailLink}" target="_blank"><img src="${pos.listingImg}" width="144"></a></div>
                                    <div class="map-popup-info">
                                        <h3 class="map-popup-rent">${pos.rentValue}</h3>
                                        <p class="map-popup-specs">${pos.bedValue} ${pos.bathValue}</p>
                                        <p class="map-popup-address">${pos.listingAddress}</p>
                                        <p><a href="${pos.listingDetailLink}" target="_blank" class="btn btn-secondary btn-sm pt-1 pb-1">Details</a>
                                            <a href="https://maps.google.com/maps?daddr=${pos.listingAddress}" target="_blank" class="btn btn-secondary btn-sm pt-1 pb-1 directions-link">Directions</a>
                                        </p>
                                    </div>
                                </div>`;
                });
        
                infowindows_content = infowindows_content.slice(0, -1);
        
                let [latitude, longitude] = lat_long_key.split('_');
                var infowindow = new google.maps.InfoWindow({
                    content: infowindows_content
                });
        
                var marker = new google.maps.Marker({
                    map: map,
                    position: new google.maps.LatLng(latitude, longitude)
                });
                addClickListener(marker, infowindow);
            }
        } else {
            console.log(widgetId)
            var map = new google.maps.Map(
                document.querySelector(`[id='${widgetId}'] #googlemap`), { zoom: 8, center: defaultCity }
            );
        }
    }

    return listingHtml;
}

function addClickListener(marker, infowindow) {
    marker.addListener("click", function () {
        infowindow.open(map, marker);
    });
}

function fetchData(url) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    // const responseData = JSON.parse(xhr.responseText);
                    resolve(xhr.responseText);
                } else {
                    reject(new Error('Error fetching data:', xhr.statusText));
                }
            }
        };
        xhr.onerror = function () {
            reject(new Error('Request failed'));
        };
        xhr.send();
    });
}



function fetchDetailsData(url, postData) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', url, true);

        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    resolve(JSON.parse(xhr.responseText));
                } else {
                    reject(new Error(xhr.responseText));
                }
            }
        };
        xhr.onerror = function () {
            reject(new Error('Request failed'));
        };

        const jsonData = JSON.stringify(postData);
        xhr.send(jsonData);
    });
}
