// JavaScript Document

jQuery(function(){
	/*-------------
	Ga _trackEvent
	--------------*/
	/*$("a[href^=http]").click(function(){
		var url = $(this).attr('href');
			if( url.indexOf(location.hostname)<0){
			_gaq.push(['_trackEvent','_blank','Click',url]);
			}
	});*/
	
	/*-------------
	Copyrightの年度自動更新
	--------------*/
	/*function chgYear(){
		var myDate=new Date();
		var nowYear=myDate.getFullYear();
		return nowYear;
	}*/
	jQuery('#copyright span.year').text(new Date().getFullYear());
});


/**
 * header global navi
**/
//window.console = window.console || {log:function(){}}

var SUBARU = SUBARU || {};
SUBARU.header = (function($){
	var PATH_LIST = [['carlineup'], ['information','news','campaign','event','channel','onair'], ['purchase','search','catalog'], ['accessory'], ['afterservice','tnst']];
	var HOST_NAME = window.location.hostname;
	var PATH_NAME = window.location.pathname.split('/');
	
	var _dir;
	for(var i = 0; i < PATH_LIST.length; i++) {
		var path = PATH_LIST[i];
		for(var j = 0; j < path.length; j++) {
			if(PATH_NAME[1] == path[j]) {
				_dir = i;
				j = path.length;
				i = PATH_LIST.length;
			}
		}
	}
	if(HOST_NAME.indexOf('compare.subaru.jp') != -1) { _dir = 2; }
	if(HOST_NAME.indexOf('members.subaru.jp') != -1 && PATH_NAME[1] == 'tnst') { dir = 4; }
	if(HOST_NAME.indexOf('members.subaru.jp') != -1 && PATH_NAME[1] == 'search') { _dir = null; }
	
	
	var tabSwitch = function(id) {
		var $openTab = (id == 1) ? $('#carlineup_tab1') : $('#carlineup_tab2');
		var $closeTab = (id != 1) ? $('#carlineup_tab1') : $('#carlineup_tab2');
		var $openContent = (id == 1) ? $('#carlineup_content1') : $('#carlineup_content2');
		var $closeContent = (id != 1) ? $('#carlineup_content1') : $('#carlineup_content2');
		
		$openTab.addClass('active');
		$closeTab.removeClass('active');
		$openContent.show();
		$closeContent.hide();
		$('#snavi_lineup').animate({height:$('#snavi_lineup').find('.inner').height()}, {duration:300, easing:'easeOutQuint', queue:false});
		
		$('#snavi_lineup_img').css('left', (parseInt($('#snavi_lineup').css('left'), 10) + $('#snavi_lineup').outerWidth() - 1) + 'px');
	};



	var setLnaviActive = function(){
		var hostname = HOST_NAME;
		var path = PATH_NAME;
		switch(_dir){
			case 0 :
				// break;
				$('#lnavi_carlineup').addClass('active');

				if(path[1].indexOf('carlineup') > -1 ) {
					//search(/carlineup|legacy|xv|forester|brz|impreza|exiga|wrxsti|trezia|transcare|lucra|stella|pleoplus|pleo|pleovan|diaswagon|sambar/i) > -1) {
					gnavi_default( 'carlineup' );
				}
				break;

			case 1 :
				$('#lnavi_information').addClass('active');
				$('#lnavi').addClass('lnaviset png_bg test');

				if(path[1].indexOf('news') > -1) {
					if(path[2].indexOf('info.html') > -1 || path[2].indexOf('info_faq.html') > -1) {
						$('#lnavi_information li:eq(4) a').addClass('active');
					} else {
						$('#lnavi_information li:eq(0) a').addClass('active');
					}
					gnavi_default( 'information' );
				} else if(path[1].indexOf('campaign') > -1) {
					$('#lnavi_information li:eq(1) a').addClass('active');
					gnavi_default( 'information' );
				} else if(path[1].indexOf('event') > -1) {
					$('#lnavi_information li:eq(2) a').addClass('active');
					gnavi_default( 'information' );
				} else if(path[1].indexOf('channel') > -1) {
					$('#lnavi_information li:eq(4) a').addClass('active');
					gnavi_default( 'information' );
				} else if(path[1].indexOf('onair') > -1) {
					$('#lnavi_information li:eq(5) a').addClass('active');
					gnavi_default( 'information' );
				} else if(path[1].indexOf('information') > -1) {
					gnavi_default( 'information' );
				}
				
				break;
			case 2 :
				$('#lnavi_support').addClass('active');
				$('#lnavi').addClass('lnaviset png_bg');
				if(path[1].indexOf('purchase') > -1) {
					if(path[2].indexOf('simulation') > -1) {
						$('#lnavi_support li:eq(0) a').addClass('active');
					} else if(path[2].indexOf('card') > -1) {
						$('#lnavi_support li:eq(6) a').addClass('active');
					} else if(path[2].indexOf('insurance') > -1) {
						$('#lnavi_support li:eq(7) a').addClass('active');
					}
					gnavi_default( 'support' );
				} else if(path[1].indexOf('catalog') > -1) {
					$('#lnavi_support li:eq(1) a').addClass('active');
					gnavi_default( 'support' );
				} else if(path[1].indexOf('search') > -1) {
					if(path[2].indexOf('drivecar.html') > -1) {
						$('#lnavi_support li:eq(2) a').addClass('active');
					} else if(path[2].indexOf('dealer.html') > -1) {
						$('#lnavi_support li:eq(3) a').addClass('active');
					}
					gnavi_default( 'support' );
				} else if(hostname == 'ucar.subaru.jp') {
					$('#lnavi_support li:eq(4) a').addClass('active');
					gnavi_default( 'support' );
				} else if(hostname == 'compare.subaru.jp') {
					$('#lnavi_support li:eq(5) a').addClass('active');
					gnavi_default( 'support' );
				} else if(hostname == 'subaru-finance.jp') {
					$('#lnavi_support li:eq(8) a').addClass('active');
					gnavi_default( 'support' );
				}
				
				break;
			case 3 :
				$('#lnavi_accessory').addClass('active');
				$('#lnavi').addClass('lnaviset png_bg');

				if(path[2].search(/car_select|legacy|xv|forester|brz|impreza|exiga|wrx|trezia|lucra|stella|pleoplus|pleo/i) > -1) {
					$('#lnavi_accessory li:eq(0) a').addClass('active');
					gnavi_default( 'accessory' );
				} else if(path[2].indexOf('navi_audio') > -1) {
					if(path[3].indexOf('option') > -1){
						$('#lnavi_accessory li:eq(2) a').addClass('active');
					}else{
						$('#lnavi_accessory li:eq(1) a').addClass('active');
					}
					gnavi_default( 'accessory' );
				} else if(path[2].indexOf('versionup') > -1) {
					$('#lnavi_accessory li:eq(3) a').addClass('active');
					gnavi_default( 'accessory' );
				} else if(path[2].indexOf('engine_oil') > -1) {
					$('#lnavi_accessory li:eq(4) a').addClass('active');
					gnavi_default( 'accessory' );
				} else if(path[2].indexOf('catalog') > -1) {
					$('#lnavi_accessory li:eq(5) a').addClass('active');
					gnavi_default( 'accessory' );
				} else if(path[1].indexOf('accessory') > -1) {
					gnavi_default( 'accessory' );
				}
				break;
			case 4 :
				$('#lnavi_affter').addClass('active');
				$('#lnavi').addClass('lnaviset png_bg');
				if(path[2].indexOf('check') > -1) {
					$('#lnavi').css('display','none');
					gnavi_default( 'after' );
				} else if(path[2].indexOf('inspection') > -1) {
					$('#lnavi').css('display','none');
					gnavi_default( 'after' );
				} else if(path[2].indexOf('warranty') > -1) {
					$('#lnavi').css('display','none');
					gnavi_default( 'after' );
				} else if(path[2].indexOf('maintenance') > -1) {
					$('#lnavi').css('display','none');
					gnavi_default( 'after' );
				} else if(path[2].indexOf('technical') > -1) {
					$('#lnavi').css('display','none');
					gnavi_default( 'after' );
				} else if(path[2].indexOf('carcare') > -1) {
					$('#lnavi').css('display','none');
					gnavi_default( 'after' );
				} else if(path[2].indexOf('dealer') > -1) {
					$('#lnavi').css('display','none');
					gnavi_default( 'after' );
				} else if(path[2].indexOf('cddb') > -1) {
					$('#lnavi').css('display','none');
					gnavi_default( 'after' );
				} else if(path[2].indexOf('tnst') > -1) {
					$('#lnavi_affter li:eq(7) a').addClass('active');
					gnavi_default( 'after' );
				} else if(path[1].indexOf('tnst') > -1) {
					$('#lnavi_affter li:eq(6) a').addClass('active');
					gnavi_default( 'after' );
				} else if(path[1].indexOf('afterservice') > -1) {
					gnavi_default( 'after' );
				}
				
				break;
		}
		function gnavi_default(id) {
			var gnav_id = "#gnav_"+ id;
			var obj = $(gnav_id).children('a.gnav').children('span');
			obj.css('display', 'none');
			//var obj_name = obj.attr('src').split('.png');
			//obj.attr('src', obj_name[0] + '_o.png');
		}
	};
	
	var _self = {
		init:function() {
/*↓20160627修正：dropdownを出さないようにcommentOut↓
			$('#global li').hover(
				function(e) {
					var $target = $(this).find('nav');
					$target.stop().show().animate({height:$target.children('.inner').height()}, {duration:400, easing:'easeOutQuint', queue:false});
					isLineupHover = true;
				},
				function(e){
					isLineupHover = false;
					var $target = $(this).find('nav');
					$target.stop().animate({height:0}, {duration:200, easing:'easeInQuad', queue:false, complete:function(){ $target.hide().height(0); if($target.attr('id') == 'snavi_lineup') { tabSwitch(1); } }});
				}
			);
↑20160627修正：dropdownを出さないようにcommentOut↑*/
			
			tabSwitch(1);
			$('#carlineup_tab1').mouseover(function() { tabSwitch(1); });
			$('#carlineup_tab2').mouseover(function() { tabSwitch(2); });
			
			$('#snavi_lineup li a[data-role]').hover(
				function(e){
					var $ph = $($(this).attr('data-role'));
					$ph.stop().show().animate({width:$ph.find('img').width()}, {duration:800, easing:'easeOutQuint', queue:false});
				},
				function(e){
					$($(this).attr('data-role')).stop().width(0).hide();
				}
			);
			
			$('#snavi_lineup_img li').hover(
				function(){
					$(this).stop().width($(this).find('img').width()).show();
					$('#snavi_lineup').stop().show().height($('#snavi_lineup').children('.inner').height());
				},
				function(){
					$(this).stop().width(0).hide();
					$('#snavi_lineup').stop().animate({height:0}, {duration:200, easing:'easeInQuad', queue:false, complete:function(){ $('#snavi_lineup').hide().height(0); tabSwitch(1); }});
				}
			);
			
			// サブナビを設定
			setLnaviActive();
			
			if(navigator.userAgent.toLowerCase().indexOf("mac") != -1 ){
				$('#gnav_header #lnavi li').css('font-size', '11px');
			}

			// ライフアクティブボタン
/*
			$('#gnav_lifeactive a').click(function() {
				location.href=$(this).attr('href');
			});
*/
		}
	};
	
	return _self;
}(jQuery));


jQuery(function(){ SUBARU.header.init(); });


//add20160627.JSをcommonに追加記述
$(function(){
//ホバーによるオンマウスアテンション
var hvrFlg = 0;/*
0 = no
1 = hover*/
var clkTxtH = 40;
$("#global > li").hover(function(){
//console.log(hvrFlg);
	var thisClkTxt = $(".clkTxt", this);
	clearTimeout(timer);
	$(".clkTxt").not(thisClkTxt).css({"display": "none", "height": 0});

	if(hvrFlg == 0){//他にhoverしてない場合
		hvrFlg = 1;
		thisClkTxt.css("display", "block");
		thisClkTxt.stop();
		thisClkTxt.animate(
			{height: clkTxtH},
			300
		);
	}else{//他のhoverから移る場合
		$(".clkTxt").stop();
		thisClkTxt.css({"display": "block", "height": clkTxtH});
	}
},function(){
	var thisClkTxt = $(".clkTxt", this);
	timer = setTimeout(function(){
		thisClkTxt.stop();
		thisClkTxt.animate(
			{height: 0},
			300,
			function(){
				$(this).css("display", "none");
				hvrFlg = 0;
			}
		);
	}, 200);
});//#global > li HvrEnd


var timer;
var megaHObj = {//それぞれの高さ
	"gnav_carlineup": {//カーラインナップ
	//2段:462
	//3段:326
		"carJ": 512,//乗用車
		"carK": 512//軽自動車
	},
	"gnav_information": 607,//インフォメーション
	"gnav_support": 528,//ご購入サポート
	"gnav_accessory": 586,//アクセサリー
	"gnav_after": 451,//アフターサービス
	"gnav_lifeactive": 600//アクティブライフ
};
//headerのgnavをclickでmegaDropの表示
$("#global > li .gnav, #global > li .clkTxt").click(function(){
	var parentName = $(this).parent().attr("id");
	var megaH;

	if($(this).parent().attr("id") == "gnav_carlineup"){//カーラインナップ
		//乗用車か軽自動車か
		megaH = ($(".megaDrop .cars.show").hasClass("boxJoyo")) ? megaHObj[parentName]["carJ"] : megaHObj[parentName]["carK"];
	}else{//カーラインナップ以外
		megaH = megaHObj[parentName];
	}

	var menuName = $(this).parent();
	var thisMega = menuName.find(".megaDrop");
	$(".opn .megaDrop").not(thisMega).fadeOut(150, function(){
		$(".megaDrop").not(thisMega).css({"display": "none", "height": 0})
		$("#global > li").not(menuName).removeClass("opn");
	});

	if(menuName.hasClass("opn")){
		thisMega.animate(
			{height:0},
			150,
			function(){
				$(this).css("display", "none");
				menuName.removeClass("opn");
			}
		);
	}else{
		thisMega.css({"display": "block", "height": megaH});
		thisMega.find(".inner").css("opacity", 0);
		thisMega.find(".inner").animate(
			{"opacity": 1},
			300,
			function(){
				menuName.addClass("opn");
			}
		);
	}
	return false;
});//#global > li .gnav ClkEnd


/*ホバーでmegaDropを開く(戻る可能性大の為残しておく)
$("#global > li").hover(function(){
	var tagName = $(".megaDrop", this);
	clearTimeout(timer);
	$(".megaDrop").not(tagName).css({"display": "none", "height": 0});
	var megaH = ($(this).attr("id") == "gnav_carlineup") ? 510 : 485;
	tagName.css("display", "block");
	tagName.stop();
	tagName.animate(
		{height: megaH},
		300
	);
},function(){
	var tagName2 = $(".megaDrop", this);
	timer = setTimeout(function(){
		tagName2.stop();
		tagName2.animate(
			{height: 0},
			300,
			function(){$(this).css("display", "none");}
		);
	}, 200);
});//#global > li HvrEnd
*/


//megaDropの閉じるbtn
$(".btnClsMDrop").click(function(){
	hvrFlg = 0;
	$(".clkTxt").css({"display": "none", "height": "0"});

	var menuName = $(this).parents("li");
	menuName.find(".megaDrop").animate(
		{height: 0},
		300,
		function(){
			$(this).css("display", "none");
			menuName.removeClass("opn");
		}
	);
	return false;
});//btnClsMDrop ClkFncEnd


//headerのcarlineupの乗用車と軽自動車の切替
$(".lineupArea .btns a").click(function(){
	if($(this).hasClass("on")){
		return false;
	}else{
		if($(this).parent().hasClass("btnAll")){
		}else{
			var JorK = ($(this).parent().hasClass("btnJoyo")) ? "Joyo": "Kei";
			var megaH2 = (JorK == "Joyo") ? megaHObj["gnav_carlineup"]["carJ"] : megaHObj["gnav_carlineup"]["carK"];
			$("#gnav_carlineup .megaDrop").height(megaH2);
			$(".lineupArea .btns a").removeClass("on");
			$(this).addClass("on");
			$(".lineupArea .cars").removeClass("show");
			$(".lineupArea .cars.box" + JorK).addClass("show");
			return false;
		}
	}
});//.lineupArea .btns a ClkFncEnd
});//$FncEnd
//add20160627.JSをcommonに追加記述 End

//add20161012:日付によるnewマーク
$(function(){
//今日
var today = new Date();
var todayTime = today.getTime(); // 1970/1/1午前0時からの現在までのミリ秒
/*
console.log("今日");
console.log(today);
console.log(todayTime);
console.log("\n");
*/

$("#gnav_header #global .megaDrop .lineupArea ul.cars > li").each(function(){
//始まり
	var start = new Date($(this).attr("data-start"));
	var startTime = start.getTime();

//終わり
	var end = new Date($(this).attr("data-end"));
	var endTime = end.getTime();

/*
console.log($(this).attr("data-start"));
console.log(start);
console.log(startTime);
console.log($(this).attr("data-end"));
console.log(end);
console.log(endTime);
console.log("\n");
*/

	if(startTime <= todayTime && endTime >= todayTime){//指定日
		$(this).addClass("icnNew");
	}else{//指定日の前後
	}
});//li each End

//alert(today + "\n" + todayTime);

});//$FncEnd
//add20161012:日付によるnewマーク End