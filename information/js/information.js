$(function(){
    // Campaign
    var onLoadedCampaignXml = function(data) {
        var _list = data.list;
        var structArr = [];
        $(data).find('item').each(function(n) {
                var campaign_item = 4; // 表示させる個数
                if ( n < campaign_item ) {
                    /* thumnail */
                    var host_url = "https://www.subaru.jp";
                    var enclosure = $(this).find('enclosure').attr('url');
                    /* link */
                    var $url = $(this).find('link').text(),
                        $targetwindow = "_self";
                    if ($url.indexOf(host_url)) {
                        $targetwindow = "_blank";
                    }
                    /* date */
                    var pubdate = $(this).find('pubDate').text(),
                        date_obj = new Date(pubdate),
                        $year = date_obj.getFullYear(),
                        $mounth = date_obj.getMonth() + 1,
                        $day = date_obj.getDate();
                        if( $mounth < 10 ) { $mounth = '0' + $mounth; }
                        if( $day < 10 ) { $day = '0' + $day; }
                        $date = $year + '/' + $mounth + '/' + $day;

                    var struct = {
                        title:$(this).find('title').text(),
                        thumb_img:enclosure.slice(host_url.length),
                        url:$url,
                        targetWindow:$targetwindow,
                        date:$date
                    };
                    structArr.push(struct);

                    /* キャンペーン部分に表示 */
                    var htmlstr = '';
                    htmlstr += '<li><dl class="clearfix"><dt><img src="' + struct.thumb_img + '" alt=""></dt>';
                    htmlstr += '<dd><a href="' + struct.url + '" target="' + struct.targetWindow + '">' + struct.title + '</a></dd></dl></li>';
                    $('#campaign .btn-list').append(htmlstr);

                    /* ニュース部分に表示 */
                    var htmlstr_info = '';
                    htmlstr_info += '<dl class="news_item"><dt class="date">' + struct.date + '</dt>';
                    htmlstr_info += '<dd class="txt"><a href="' + struct.url + '">' + struct.title + '</a></dd></dl>';
                    $('#news .news-list').append(htmlstr_info);

                }
        });
    }

    var campaignlistLoad = {
        init:function() {
            $.ajax({
                url:'/rss/campaign.xml',
                dataType:"xml",
                success:onLoadedCampaignXml,
                error:function(xhr, status, error) {
                    //console.log([xhr, status, error]);
                },
                complete:styleSet
            });
        }
    }
    campaignlistLoad.init();

    // channel SUBARU
    var onLoadedChannelXml = function(data) {
        var _list = data.list;
        var channel_item = 4; // 表示させる個数

        for(var i = channel_item; i--;) {
            var itemData = _list[i];
            var htmlstr = '';
            htmlstr += '<li><dl class="tile clearfix"><dt><img src="/channel/images/thumb/' + itemData.id + '.jpg" alt=""></dt>';
            htmlstr += '<dd><a href="/channel/movie/?' + itemData.id + '">' + itemData.title + '</a></dd></dl></li>';
            $('#channel .btn-list').prepend(htmlstr);
        }
    }

    var movielistLoad = {
        init:function() {
            $.ajax({
                url:'/channel/data/movielist.json',
                dataType: 'json',
                success:onLoadedChannelXml,
                error:function(xhr, status, error) {
                    //console.log([xhr, status, error]);
                },
                complete:styleSet
            });
        }
    }
    movielistLoad.init();

    // event
    /////////////////////////////////////
   var onLoadedEventXml = function(data) {
        var structArr = [];
        var max_num = 1;
        var EVENT_ITEM = 4; // 表示させる個数
        $(data).find('event').each(function() {
            if ( $(this).attr('index') == 1 ) {
                //console.log('個数'+item);
                if ( max_num <= EVENT_ITEM ) {
                    var struct = {
                        title:$(this).children('title').text(),
                        thumb_img:$(this).children('thumb_img').text(),
                        url:$(this).children('url').text(),
                        targetWindow:$(this).children('targetWindow').text()
                    };
                    structArr.push(struct);
                    var htmlstr = '';
                    htmlstr += '<li><dl class="tile clearfix"><dt><img src="/event/' + struct.thumb_img + '" alt=""></dt>';
                    htmlstr += '<dd><a href="' + struct.url + '" target="' + struct.targetWindow + '">' + struct.title + '</a></dd></dl></li>';
                    $('#event .btn-list').append(htmlstr);

                    max_num++;
                }
            }
        });
    }


    var eventlistLoad = {
        init:function() {
            $.ajax({
                type: "GET",
                url:"/event/xml/event.xml",
                dataType:"xml",
                success:onLoadedEventXml,
                error:function(xhr, status, error) {
                    //console.log([xhr, status, error]);
                },
                complete:styleSet
            });
        }
    }
    eventlistLoad.init();

});

var styleSet = function() {
    // mouseover
    var _item = $(".btn-list").children('li');
    _item.each(function(){
        if ($(this).find('a').attr('target') == '_blank') {
            $(this).find('a').addClass('blank');
        }
    })

    _item.on('mouseover',function(){
        $(this).addClass('hover');
    });
    _item.on('mouseout',function(){
        $(this).removeClass('hover');
    });
    _item.on('click',function(){
        var _url = $(this).find('a');
        if( _url ){
            if (_url.attr('target') == '_blank') {
                window.open(_url.attr('href'), "_blank");
                return false;
            } else {
                window.location = $(this).find('a').attr('href');
                return false;
            }
        }
    });

    // tile
    $(".btn-list li dl.tile").tile();

}

$(window).load(function(){
    
    /* news */
        var news_num = 9; //表示させる記事の個数

        // 記事の配列
        var a_news_item = new Array();

        // 記事の日付を、dl.news_itemのvalueにセットする。
        $('#news dl.news_item').each( function(index){
            var _date = $(this).children('dt.date').text().split('/').join('');
            a_news_item[index] = new Object();
            a_news_item[index].key = _date;
            a_news_item[index].value = $(this);
        });

        // 記事の日付で並び替える。
        a_news_item.sort(sortDesc);
        for(i = 0; i < a_news_item.length ; i++){
            $('.news-list').append(a_news_item[i].value);
        }
        function sortDesc ( a,b ){
            return b.key.localeCompare(a.key);
        }

        // 概要をhtmlで記述
        $('span.outline').each( function () {
            $(this).css('display','none');
            var outline_txt = $(this).text();
            // プレスリリースが含まれる場合は、内容を表示する。
            if ( outline_txt.indexOf('プレスリリース')!=-1 ) {
                $(this).parent('dd.txt').append('<span>' + outline_txt + '</span>');
            }
        });

        $('dl.news_item').each( function(index){
            // 指定件数を表示
            if( index > news_num - 1) {
                $(this).remove();
            }

            /* 別ウィンドウ */
            var link_obj = $(this).children('dd.txt').find('a'),
                host_url = "https://www.subaru.jp",
                host_url2 = "http://www.subaru.jp";
            link_obj.each( function(){
                $(this).attr('target','_blank');
                $(this).addClass('blank');
                $url = $(this).attr('href');
                if ($url.indexOf(host_url) != -1) {
                    $(this).attr('target','');
                    $(this).removeClass('blank');
                }
                if ($url.indexOf(host_url2) != -1) {
                    $(this).attr('target','');
                    $(this).removeClass('blank');
                }
            });
        });

    /* tile */
    var news_hgt = $(".hightline-2").height();

    $("#campaign .btn-list li dl").tile(4);
    var campaign_hgt = $("#campaign .btn-list li dl").height();
    var sabun = (campaign_hgt*2)+8 - news_hgt;

    /* 各種新着情報とキャンペーン情報のボックスの高さを揃える*/
    if ( sabun < 0 ) {
        $("#campaign .btn-list li dl").css("height" , (news_hgt-36) / 2 );
    } else {
        $(".hightline-2").css("height" , (campaign_hgt*2) + 36 );
    }


});
 