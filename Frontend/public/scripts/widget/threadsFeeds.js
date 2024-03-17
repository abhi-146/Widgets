var mjThreadsFeeds = document.querySelectorAll(".mj-threadsFeeds");

// Append common styles
var commonStyleThreadsFeeds = `
    .mj-threads-feeds {
        box-shadow: 0 0 3px #aaa;
        padding: 10px;
        margin: 10px;
        position: relative;
        display: flex;
        flex-direction: column;
        gap: 15px;
    }
    .mj-threads-feeds {
        box-shadow: 0 0 3px #aaa;
        padding: 10px;
        margin: 10px;
        position: relative;
        display: flex;
        flex-direction: column;
        gap: 15px;
        
    }
    .fftmj_row4 {
        margin-top: auto
    }
    .fftmj_loading {
        padding: 10px;
        text-align: center;
    }
    .fftmj_single_thread {
        padding: 15px;
        margin-bottom: 10px;
        box-shadow: 0 0 5px 5px #f1f1f1;
        border-radius: 5px;
        background: #fff;
    }
    .fftmj_single_thread * a {
        color: #000;
        text-decoration: none;
    }
    .fftmj_row1 {
        display: flex;
        flex-wrap: wrap-reverse;
        align-items: center;
    }
    .fftmj_profileimage {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-right: 10px;
    }
    .fftmj_thrusr {
        font-weight: bold;
        margin-right: 10px;
    }
    .fftmj_thrusr  a{
        text-decoration: none;
        color: black;
    }
    .fftmj_reusr {
        margin-left: 20px;
        margin-right: 10px;
        opacity: 0.5;
    }
    .fftmj_reusr svg {
        vertical-align: sub;
        margin-right: 5px;
        display: inline-block;
    }
    .fftmj_time {
        margin-left: auto;
        margin-right: 10px;
    }
    .fftmj_thrlogo {
        background: #000;
        padding: 5px;
        border-radius: 10px;
    }
    .fftmj_thrlogo svg {
        display: block;
    }
    .fftmj_mediaimage {
        max-width: 100%;
        max-height: 430px;
        border-radius: 10px;
    }
    .fftmj_likereply a {
        font-size: 90%;
        opacity: 0.6;
        text-decoration: none;
        color:black;
    }
    .fftmj_row4 {
        display: flex;
        flex-wrap: nowrap;
    }
    .fftmj_thricons {
        margin-left: auto;
        display: flex;
        align-items: center;
    }
    .fftmj_thricons a {
        margin-left: 7px;
        display: flex;
    }
`;

var styleElementThreadsFeeds = document.createElement('style');
styleElementThreadsFeeds.innerHTML = commonStyleThreadsFeeds;
document.head.appendChild(styleElementThreadsFeeds);

async function prepareThreadsFeedsWidget(threadsFeed) {
    var parentWidget = threadsFeed.closest('.mj-widget');
 
    // Get widget data
    let widgetId = "mjwi-threadsFeeds-preview";
    let data = JSON.parse(parentWidget.getAttribute("data-widget"));

    if(!data) {
        widgetId = parentWidget.attributes.id.value
        data = mjWidgetsData[widgetId];
        
    }

    let serveData = data.serveData;
    let htmlData = data.widgetData.htmlData;

    const threadsFeedData = htmlData.threadsFeeds;
    const items = serveData.items;

    let idSelector = `[id='${widgetId}']`;
    let threadsFeedHtml = 
    `<style>
        ${idSelector} .mj-threadsFeeds {
            height: ${threadsFeedData.height}vh;
            width: ${threadsFeedData.width}%;
            background-color: ${threadsFeedData.backgroundColor};
            overflow: auto;
            position: relative;
        }
        `;

    // Custom css
    threadsFeedHtml += `
                ${idSelector} .fftmj_title {
                    color: ${threadsFeedData.textColor};
                    font-family: ${threadsFeedData.fontFamily};
                    font-size: ${threadsFeedData.fontSize}px;
                }`;
                
    // Custom css for templates
    if(threadsFeedData.template === "grid") {
        
        threadsFeedHtml += `
            ${idSelector} .mj-threadsFeeds {
                display: grid;
                grid-template-columns: auto auto auto;
            }
            ${idSelector} .fftmj_thrlogo {
                display: none;
            }
            ${idSelector} .mj-threads-feeds .fftmj_row3 .fftmj_mediaimage {
                height: 150px;
                width: 150px;
            }
        `;
    } else if(threadsFeedData.template === 'slider') {
        threadsFeedHtml += `
            ${idSelector} .mj-threadsFeeds {
                display: flex;
            }
            ${idSelector} .mj-threads-feeds{
                display: none;
            }
            ${idSelector} .mj-threads-feeds.active {
                display: flex;
                width:98%;
                flex-shrink: 0;
            }
            ${idSelector} .mjwi-slider-btn {
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                background-color: rgba(0, 0, 0, 0.3);
                color: white;
                border: none;
                cursor: pointer;
                padding: 10px;
                font-size: 18px;
                z-index:9999;
            }
            ${idSelector} .mjwi-slider-prev {
                left: 0;
            }
            ${idSelector} .mjwi-slider-next {
                right: 0;
            }

        `;
    } else {
        threadsFeedHtml += `
            ${idSelector} .mj-threadsFeeds {
                display: flex;
                flex-direction: column;
            }
        `;
    }

    threadsFeedHtml += '</style>';

    if(threadsFeedData.template === 'slider') {
        threadsFeedHtml += `
            <button class="mjwi-slider-btn mjwi-slider-prev" onclick="prevSlide()">&#10094;</button>
            <button class="mjwi-slider-btn mjwi-slider-next" onclick="nextSlide()">&#10095;</button>`;
    }

    if (items) {
                            let i = 0;
                
                            items.forEach((item) => {
                                if (i < threadsFeedData.noOfThreads && item.thread_items) {
                                    const post = item.thread_items[0].post;
                                    const rply_users = item.thread_items[0].reply_facepile_users;
                                    const rplies = item.thread_items[0].view_replies_cta_string;
                                    const likes = post.like_count + ' Likes';
                                    const code = post.code;
                                    const main_username = post.user.username;
                                    const time = post.taken_at;
                                    
                                    html = '<div class="mj-threads-feeds">';
                                        
                                    reposted = quoted = null;
                                    title = usr_profile_pic = video_url = post_img_src = thread_type = quoted_html = sub_quoted_html = '';
                                    
                                    if(post.caption){
                                        title = post.caption.text;
                                    }
                                    usr_profile_pic = post.user.profile_pic_url;
                                    usr_username = post.user.username;
                                    usr_is_verified = post.user.is_verified;
                                    
                                    if(post.text_post_app_info){
                                        reposted	= post.text_post_app_info.share_info.reposted_post;
                                        quoted		= post.text_post_app_info.share_info.quoted_post;
                                    }
                                    
                                    if(reposted)
                                    {
                                        thread_type = 'reposted';
                                        if(reposted.caption){
                                            title		= reposted.caption.text;
                                        }
                                        reposted_likes = reposted.like_count + ' Likes';
                                        if(reposted.image_versions2){
                                            if(reposted.image_versions2.candidates && reposted.image_versions2.candidates.length !==0){
                                                if( reposted.image_versions2.candidates[0].url != 'http://static.cdninstagram.com/rsrc.php/null.jpg' ){
                                                    post_img_src		= reposted.image_versions2.candidates[0].url;
                                                }
                                            }
                                        }
                                        usr_profile_pic = reposted.user.profile_pic_url;
                                        usr_username = reposted.user.username;
                                        usr_is_verified = reposted.user.is_verified;
                                        
                                        rp_quoted	= reposted.text_post_app_info.share_info.quoted_post;
                                        if(rp_quoted){
                                            
                                            if(rp_quoted.caption){
                                                rp_quoted_title = rp_quoted.caption.text;
                                            }
                                            rp_usr_profile_pic = rp_quoted.user.profile_pic_url;
                                            rp_usr_username = rp_quoted.user.username;
                                            rp_usr_is_verified = rp_quoted.user.is_verified;
                                            rp_time = rp_quoted.taken_at;
                                            rp_time_passed = fftmjTimeElapsedString(rp_time);
                                            if(rp_quoted.image_versions2){
                                                if(rp_quoted.image_versions2.candidates && rp_quoted.image_versions2.candidates.length !== 0){
                                                    if( rp_quoted.image_versions2.candidates[0].url != 'http://static.cdninstagram.com/rsrc.php/null.jpg' ){
                                                        rp_post_img_src = rp_quoted.image_versions2.candidates[0].url;
                                                    }
                                                }
                                            }
                                            rp_likes = rp_quoted.like_count + ' Likes';
                                            
                                            sub_quoted_html += '<div style="border:1px solid #ccc;padding: 10px;">';
                                            sub_quoted_html += '<div class="fftmj_row1">';
                                            sub_quoted_html += '<img class="fftmj_profileimage" src="'+transformUrl(rp_usr_profile_pic)+'">';
                                            sub_quoted_html += '<div class="fftmj_thrusr"><a href="https://www.threads.net/@'+rp_usr_username+'" target="_blank">' + rp_usr_username + '</a></div>' + (rp_usr_is_verified ? '<div class="fftmj_verify"><svg aria-label="Verified" class="x1lliihq x1n2onr6" color="rgb(0, 149, 246)" fill="rgb(0, 149, 246)" height="12" role="img" viewBox="0 0 40 40" width="12"><title>Verified</title><path d="M19.998 3.094 14.638 0l-2.972 5.15H5.432v6.354L0 14.64 3.094 20 0 25.359l5.432 3.137v5.905h5.975L14.638 40l5.36-3.094L25.358 40l3.232-5.6h6.162v-6.01L40 25.359 36.905 20 40 14.641l-5.248-3.03v-6.46h-6.419L25.358 0l-5.36 3.094Zm7.415 11.225 2.254 2.287-11.43 11.5-6.835-6.93 2.244-2.258 4.587 4.581 9.18-9.18Z" fill-rule="evenodd"></path></svg></div>' : '');
                                            if(threadsFeedData.displayTimeElapsed) {
                                                sub_quoted_html += '<div class="fftmj_time">'+rp_time_passed+'</div>';
                                            }
                                            sub_quoted_html += '</div>';
                                            
                                            sub_quoted_html += '<div class="fftmj_row2">';
                                                if(rp_quoted_title){
                                                    sub_quoted_html += '<div class="fftmj_title">' + rp_quoted_title + '</div>';
                                                }
                                            sub_quoted_html += '</div>';
                                            
                                            if(threadsFeedData.displayMedia) {
                                                sub_quoted_html += '<div class="fftmj_row3">';
                                                if(rp_post_img_src){
                                                    sub_quoted_html += '<a href="https://www.threads.net/t/'+code+'/" target="_blank"><img class="fftmj_mediaimage" src="' + transformUrl(rp_post_img_src) + '"></a>';
                                                }
                                                sub_quoted_html += '</div>';
                                            }
                                            
                                            sub_quoted_html += '<div class="fftmj_row4">';
                                                sub_quoted_html += '<div class="fftmj_likereply"><a href="https://www.threads.net/t/'+code+'/" target="_blank">' + rp_likes + '</a></div>';
                                            sub_quoted_html += '</div>';
                                            sub_quoted_html += '</div>'; // bordered div close
                                        }
                                        
                                    }
                                    else if(quoted)
                                    {
                
                                        thread_type = 'quoted';
                                        if(quoted.caption){
                                            quoted_title = quoted.caption.text;
                                        }
                                        qt_usr_profile_pic = quoted.user.profile_pic_url;
                                        qt_usr_username = quoted.user.username;
                                        qt_usr_is_verified = quoted.user.is_verified;
                                        qt_time = quoted.taken_at;
                                        qt_time_passed = fftmjTimeElapsedString(qt_time);
                                        if(quoted.image_versions2){
                                            if(quoted.image_versions2.candidates && quoted.image_versions2.candidates.length !== 0){
                                                if( quoted.image_versions2.candidates[0].url != 'http://static.cdninstagram.com/rsrc.php/null.jpg' ){
                                                    qt_post_img_src = quoted.image_versions2.candidates[0].url;
                                                }
                                            }
                                        }
                                        quoted_likes = quoted.like_count + ' Likes';
                                        
                                        quoted_html += '<div style="border:1px solid #ccc;padding: 10px;">';
                                        quoted_html += '<div class="fftmj_row1">';
                                        quoted_html += '<img class="fftmj_profileimage" src="'+transformUrl(qt_usr_profile_pic)+'">';
                                        quoted_html += '<div class="fftmj_thrusr"><a href="https://www.threads.net/@'+qt_usr_username+'" target="_blank">' + qt_usr_username + '</a></div>' + (qt_usr_is_verified ? '<div class="fftmj_verify"><svg aria-label="Verified" class="x1lliihq x1n2onr6" color="rgb(0, 149, 246)" fill="rgb(0, 149, 246)" height="12" role="img" viewBox="0 0 40 40" width="12"><title>Verified</title><path d="M19.998 3.094 14.638 0l-2.972 5.15H5.432v6.354L0 14.64 3.094 20 0 25.359l5.432 3.137v5.905h5.975L14.638 40l5.36-3.094L25.358 40l3.232-5.6h6.162v-6.01L40 25.359 36.905 20 40 14.641l-5.248-3.03v-6.46h-6.419L25.358 0l-5.36 3.094Zm7.415 11.225 2.254 2.287-11.43 11.5-6.835-6.93 2.244-2.258 4.587 4.581 9.18-9.18Z" fill-rule="evenodd"></path></svg></div>' : '');
                                        if(threadsFeedData.displayTimeElapsed) {
                                            quoted_html += '<div class="fftmj_time">'+qt_time_passed+'</div>';
                                        }
                                        quoted_html += '</div>';
                                        
                                        quoted_html += '<div class="fftmj_row2">';
                                            if(quoted_title){
                                                quoted_html += '<div class="fftmj_title">' + quoted_title + '</div>';
                                            }
                                        quoted_html += '</div>';
                                        
                                        if(threadsFeedData.displayMedia) {
                                            quoted_html += '<div class="fftmj_row3">';
                                            if(qt_post_img_src){
                                                quoted_html += '<a href="https://www.threads.net/t/'+code+'/" target="_blank"><img class="fftmj_mediaimage" src="' + transformUrl(qt_post_img_src) + '"></a>';
                                            }
                                            quoted_html += '</div>';
                                        }
                                        
                                        quoted_html += '<div class="fftmj_row4">';
                                            quoted_html += '<div class="fftmj_likereply"><a href="https://www.threads.net/t/'+code+'/" target="_blank">' + quoted_likes + '</a></div>';
                                        quoted_html += '</div>';
                                        quoted_html += '</div>'; // bordered div close
                                        
                                    }
                                    else
                                    {
                                    
                                        if(post.image_versions2){
                                            if(post.image_versions2.candidates && post.image_versions2.candidates.length !== 0){
                                                if( post.image_versions2.candidates[0].url != 'http://static.cdninstagram.com/rsrc.php/null.jpg' ){
                                                    post_img_src		= post.image_versions2.candidates[0].url;
                                                }
                                            }
                                        }
                                    }
                                    
                                    // Thread Information
                                    html += '<div class="fftmj_row1">';
                                    html += '<img class="fftmj_profileimage" src="'+transformUrl(usr_profile_pic)+'">';
                                    html += '<div class="fftmj_thrusr"><a href="https://www.threads.net/@'+usr_username+'" target="_blank">' + usr_username + '</a></div>' + (usr_is_verified ? '<div class="fftmj_verify"><svg aria-label="Verified" class="x1lliihq x1n2onr6" color="rgb(0, 149, 246)" fill="rgb(0, 149, 246)" height="12" role="img" viewBox="0 0 40 40" width="12"><title>Verified</title><path d="M19.998 3.094 14.638 0l-2.972 5.15H5.432v6.354L0 14.64 3.094 20 0 25.359l5.432 3.137v5.905h5.975L14.638 40l5.36-3.094L25.358 40l3.232-5.6h6.162v-6.01L40 25.359 36.905 20 40 14.641l-5.248-3.03v-6.46h-6.419L25.358 0l-5.36 3.094Zm7.415 11.225 2.254 2.287-11.43 11.5-6.835-6.93 2.244-2.258 4.587 4.581 9.18-9.18Z" fill-rule="evenodd"></path></svg></div>' : '');
                                    if(thread_type && threadsFeedData.template !== 'grid'){
                                        html += '<div class="fftmj_reusr"><svg aria-label="Repost" class="x1lliihq x1n2onr6" color="rgb(153, 153, 153)" fill="#000" height="16" role="img" viewBox="0 0 24 24" width="16"><title>Repost</title><path d="M19.998 9.497a1 1 0 0 0-1 1v4.228a3.274 3.274 0 0 1-3.27 3.27h-5.313l1.791-1.787a1 1 0 0 0-1.412-1.416L7.29 18.287a1.004 1.004 0 0 0-.294.707v.001c0 .023.012.042.013.065a.923.923 0 0 0 .281.643l3.502 3.504a1 1 0 0 0 1.414-1.414l-1.797-1.798h5.318a5.276 5.276 0 0 0 5.27-5.27v-4.228a1 1 0 0 0-1-1Zm-6.41-3.496-1.795 1.795a1 1 0 1 0 1.414 1.414l3.5-3.5a1.003 1.003 0 0 0 0-1.417l-3.5-3.5a1 1 0 0 0-1.414 1.414l1.794 1.794H8.27A5.277 5.277 0 0 0 3 9.271V13.5a1 1 0 0 0 2 0V9.271a3.275 3.275 0 0 1 3.271-3.27Z"></path></svg>' + main_username + ' ' + thread_type + '</div>';
                                    }
                                    
                                    time_passed = fftmjTimeElapsedString(time);
                                    
                                    if(threadsFeedData.displayTimeElapsed) {
                                        html += '<div class="fftmj_time">'+time_passed+'</div>';
                                    }
                                    
                                    if(threadsFeedData.displayThreadLogo) {
                                        html += '<div class="fftmj_thrlogo"><svg aria-label="Threads" class="x1ypdohk x13dflua x11xpdln xus2keu xk4oym4" fill="#fff" height="25px" role="img" viewBox="0 0 192 192" width="100%" xmlns="http://www.w3.org/2000/svg"><path class="x19hqcy" d="M141.537 88.9883C140.71 88.5919 139.87 88.2104 139.019 87.8451C137.537 60.5382 122.616 44.905 97.5619 44.745C97.4484 44.7443 97.3355 44.7443 97.222 44.7443C82.2364 44.7443 69.7731 51.1409 62.102 62.7807L75.881 72.2328C81.6116 63.5383 90.6052 61.6848 97.2286 61.6848C97.3051 61.6848 97.3819 61.6848 97.4576 61.6855C105.707 61.7381 111.932 64.1366 115.961 68.814C118.893 72.2193 120.854 76.925 121.825 82.8638C114.511 81.6207 106.601 81.2385 98.145 81.7233C74.3247 83.0954 59.0111 96.9879 60.0396 116.292C60.5615 126.084 65.4397 134.508 73.775 140.011C80.8224 144.663 89.899 146.938 99.3323 146.423C111.79 145.74 121.563 140.987 128.381 132.296C133.559 125.696 136.834 117.143 138.28 106.366C144.217 109.949 148.617 114.664 151.047 120.332C155.179 129.967 155.42 145.8 142.501 158.708C131.182 170.016 117.576 174.908 97.0135 175.059C74.2042 174.89 56.9538 167.575 45.7381 153.317C35.2355 139.966 29.8077 120.682 29.6052 96C29.8077 71.3178 35.2355 52.0336 45.7381 38.6827C56.9538 24.4249 74.2039 17.11 97.0132 16.9405C119.988 17.1113 137.539 24.4614 149.184 38.788C154.894 45.8136 159.199 54.6488 162.037 64.9503L178.184 60.6422C174.744 47.9622 169.331 37.0357 161.965 27.974C147.036 9.60668 125.202 0.195148 97.0695 0H96.9569C68.8816 0.19447 47.2921 9.6418 32.7883 28.0793C19.8819 44.4864 13.2244 67.3157 13.0007 95.9325L13 96L13.0007 96.0675C13.2244 124.684 19.8819 147.514 32.7883 163.921C47.2921 182.358 68.8816 191.806 96.9569 192H97.0695C122.03 191.827 139.624 185.292 154.118 170.811C173.081 151.866 172.51 128.119 166.26 113.541C161.776 103.087 153.227 94.5962 141.537 88.9883ZM98.4405 129.507C88.0005 130.095 77.1544 125.409 76.6196 115.372C76.2232 107.93 81.9158 99.626 99.0812 98.6368C101.047 98.5234 102.976 98.468 104.871 98.468C111.106 98.468 116.939 99.0737 122.242 100.233C120.264 124.935 108.662 128.946 98.4405 129.507Z"></path></svg></div>';
                                        
                                    }
                                    html += '</div>';
                                    
                                    // CONTENT AREA
                                    html += '<div class="fftmj_row2">';
                                    if(title){
                                        html += '<div class="fftmj_title">' + title + '</div>';
                                    }
                                    html += '</div>';
                                    
                                    // Thread Media
                                    if(threadsFeedData.displayMedia) {
                                        html += '<div class="fftmj_row3">';
                                        if(post_img_src){
                                            html += '<a href="https://www.threads.net/t/'+code+'/" target="_blank"><img class="fftmj_mediaimage" src="' + transformUrl(post_img_src) + '"></a>';
                                        }
                                        
                                        if(threadsFeedData.template !== "grid") {
                                            if(sub_quoted_html){
                                                html += sub_quoted_html;
                                            }
                                            
                                            if(quoted_html){
                                                html += quoted_html;
                                            }
                                        }
                                        
                                        html += '</div>';
                                    }

                                    // Thread Tools
                                    if(reposted){
                                        likes = reposted_likes;
                                    }
                                    html += '<div class="fftmj_row4">';
                                        if(threadsFeedData.displayReactions) {
                                            html += '<div class="fftmj_likereply"><a href="https://www.threads.net/t/'+code+'/" target="_blank">' + likes + (rplies ? " · " + rplies : "") + '</a></div>';
                                        }
                                        html += '<div class="fftmj_thricons">';
                                            if(threadsFeedData.displayLikeBtn) {
                                                html += '<a href="https://www.threads.net/t/'+code+'/" target="_blank"><svg aria-label="Like" class="x1lliihq x1n2onr6" color="rgb(0, 0, 0)" fill="transparent" height="19" role="img" viewBox="0 0 24 22" width="20"><title>Like</title><path d="M1 7.66c0 4.575 3.899 9.086 9.987 12.934.338.203.74.406 1.013.406.283 0 .686-.203 1.013-.406C19.1 16.746 23 12.234 23 7.66 23 3.736 20.245 1 16.672 1 14.603 1 12.98 1.94 12 3.352 11.042 1.952 9.408 1 7.328 1 3.766 1 1 3.736 1 7.66Z" stroke="currentColor" stroke-width="2"></path></svg></a>';
                                            }
                                            if(threadsFeedData.displayCommentBtn) {
                                                html += '<a href="https://www.threads.net/t/'+code+'/" target="_blank"><svg aria-label="Comment" class="x1lliihq x1n2onr6" color="rgb(0, 0, 0)" fill="rgb(0, 0, 0)" height="20" role="img" viewBox="0 0 24 24" width="20"><title>Comment</title><path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></path></svg></a>';
                                            }
                                            if(threadsFeedData.displayRepostBtn) {
                                                html += '<a href="https://www.threads.net/t/'+code+'/" target="_blank"><svg aria-label="Repost" class="x1lliihq x1n2onr6" color="rgb(0, 0, 0)" fill="rgb(0, 0, 0)" height="20" role="img" viewBox="0 0 24 24" width="20"><title>Repost</title><path d="M19.998 9.497a1 1 0 0 0-1 1v4.228a3.274 3.274 0 0 1-3.27 3.27h-5.313l1.791-1.787a1 1 0 0 0-1.412-1.416L7.29 18.287a1.004 1.004 0 0 0-.294.707v.001c0 .023.012.042.013.065a.923.923 0 0 0 .281.643l3.502 3.504a1 1 0 0 0 1.414-1.414l-1.797-1.798h5.318a5.276 5.276 0 0 0 5.27-5.27v-4.228a1 1 0 0 0-1-1Zm-6.41-3.496-1.795 1.795a1 1 0 1 0 1.414 1.414l3.5-3.5a1.003 1.003 0 0 0 0-1.417l-3.5-3.5a1 1 0 0 0-1.414 1.414l1.794 1.794H8.27A5.277 5.277 0 0 0 3 9.271V13.5a1 1 0 0 0 2 0V9.271a3.275 3.275 0 0 1 3.271-3.27Z"></path></svg></a>';
                                            }
                                            if(threadsFeedData.displayShareBtn) {
                                                html += '<a href="https://www.threads.net/t/'+code+'/" target="_blank"><svg aria-label="Share" class="x1lliihq x1n2onr6" color="rgb(0, 0, 0)" fill="rgb(0, 0, 0)" height="20" role="img" viewBox="0 0 24 24" width="20"><title>Share</title><line fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2" x1="22" x2="9.218" y1="3" y2="10.083"></line><polygon fill="none" points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></polygon></svg></a>';
                                            }
                                        html += '</div>';
                                    html += '</div>';

                                    html += '</div>'; // Single Thread DIV Close (fftmj_single_thread)
                                    
                                    threadsFeedHtml += html;
                                    i++;
                                }
                                
                            });
                        }

    if(widgetId !== 'mjwi-threadsFeeds-preview') {
        document.getElementById(widgetId).querySelector(".mj-threadsFeeds").innerHTML = threadsFeedHtml;
    } else {
        document.querySelector(".mj-threadsFeeds").innerHTML = threadsFeedHtml;
    }
}

async function processThreadsFeedsWidgets() {
    for (let index = 0; index < mjThreadsFeeds.length; index++) {
        await prepareThreadsFeedsWidget(mjThreadsFeeds[index]);
    }
}
window[prepareThreadsFeedsWidget] = prepareThreadsFeedsWidget;
processThreadsFeedsWidgets();

function fetchData(threadsId) {
    return new Promise((resolve, reject) => {
        const lsd = 'm6yfegdR9KDb6k2BYkK9Ya';
        const api_url = 'https://www.threads.net/api/graphql';
        const body = `lsd=${lsd}&variables={"userID":"${threadsId}"}&doc_id=6232751443445612`;

        const xhr = new XMLHttpRequest();
        xhr.open("POST", api_url);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.setRequestHeader('X-IG-App-ID', '238260118697367');
        xhr.setRequestHeader('X-FB-LSD', lsd);
        xhr.setRequestHeader('Sec-Fetch-Site', 'same-origin');

        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve(JSON.parse(xhr.responseText));
            } else {
                reject(new Error(`Request failed with status ${xhr.status}`));
            }
        };

        xhr.onerror = function () {
            reject(new Error('Request error'));
        };

        xhr.timeout = 10000;
        xhr.send(body);
    });
}
 function transformUrl (url) {
    const p = url.split('/');
    let t = '';
    for (let i = 0; i < p.length; i++) {
      if (i === 2) {
        t += p[i].replaceAll('-', '--').replaceAll('.', '-') + atob('LnRyYW5zbGF0ZS5nb29n') + '/';
      } else {
        if (i !== p.length - 1) {
          t += p[i] + '/';
        } else {
          t += p[i];
        }
      }
    }
    return encodeURI(t);
};

function fftmjTimeElapsedString(datetime) {
    const now = new Date();
    const ago = new Date(datetime * 1000);
    const elapsedMilliseconds = now - ago;

    const seconds = Math.floor(elapsedMilliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);

    if (weeks > 0) {
        return weeks === 1 ? '1 week ago' : `${weeks} weeks ago`;
    } else if (days > 0) {
        return days === 1 ? '1 day ago' : `${days} days ago`;
    } else if (hours > 0) {
        return hours === 1 ? '1 hour ago' : `${hours} hours ago`;
    } else if (minutes > 0) {
        return minutes === 1 ? '1 minute ago' : `${minutes} minutes ago`;
    } else {
        return 'Just now';
    }
}

slideIndex = 0;
showSlide(slideIndex);

function nextSlide() {
    console.log(2)
  showSlide(slideIndex += 1);
}

function prevSlide() {
    console.log(1)
  showSlide(slideIndex -= 1);
}

function showSlide(n) {
  const slides = document.querySelectorAll('.mj-threadsFeeds .mj-threads-feeds');
  if (n >= slides.length) {slideIndex = 0}    
  if (n < 0) {slideIndex = slides.length - 1}
  if(  slides[slideIndex]){
    slides.forEach(slide => slide.classList.remove('active'));
    slides[slideIndex].classList.add('active');
  }

}