"use strict";

const axios = require("axios");
const cheerio = require("cheerio");

const websiteUrl =
  "https://www.w-tokyodo.com/neostall/space/lunch/?lunch=%E6%85%B6%E6%87%89%E7%BE%A9%E5%A1%BE%E5%A4%A7%E5%AD%A6%E7%9F%A2%E4%B8%8A%E3%82%AD%E3%83%A3%E3%83%B3%E3%83%91%E3%82%B9%E6%9D%91";

const rawHtml = `
<!doctype html>
<html lang="jp">
<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="description" content="ネオ屋台村「慶應義塾大学矢上キャンパス村」のランチスケジュールです。">
<meta name="keywords" content="WorkStore Tokyo Do,ワークストア・トウキョウドゥ,ネオ屋台村,キッチンカー,ケータリングカー,フードトラック,フェス飯,千葉らぁ麺,ランチ,テイクアウト,屋台,屋台村">
<meta name="viewport" content="width=device-width">

<meta property="og:title" content="慶應義塾大学矢上キャンパス村 | ランチスケジュール | ネオ屋台村 | ワークストア・トウキョウドゥ">
<meta property="og:description" content="ネオ屋台村「慶應義塾大学矢上キャンパス村」のランチスケジュールです。">
<meta property="og:url" content="https://www.w-tokyodo.com/neostall/space/lunch/?lunch=%E6%85%B6%E6%87%89%E7%BE%A9%E5%A1%BE%E5%A4%A7%E5%AD%A6%E7%9F%A2%E4%B8%8A%E3%82%AD%E3%83%A3%E3%83%B3%E3%83%91%E3%82%B9%E6%9D%91">
<meta property="og:type" content="website"/>
<meta property="og:image" content="https://www.w-tokyodo.com/assets/common/img/ogp.jpg">

<link rel="canonical" href="https://www.w-tokyodo.com/neostall/space/lunch/?lunch=%E6%85%B6%E6%87%89%E7%BE%A9%E5%A1%BE%E5%A4%A7%E5%AD%A6%E7%9F%A2%E4%B8%8A%E3%82%AD%E3%83%A3%E3%83%B3%E3%83%91%E3%82%B9%E6%9D%91">
<link rel="shortcut icon" href="/assets/common/icon/favicon.ico">
<link rel="apple-touch-icon-precomposed" href="/assets/common/icon/apple-touch-icon.png">

<link rel="stylesheet" href="/assets/common/css/reset.css" type="text/css" media="all">
<link rel="stylesheet" href="/assets/common/css/jquery.bxslider.css" type="text/css" media="all">
<link rel="stylesheet" href="/assets/common/css/jquery.fancybox.css" type="text/css" media="all">
<link rel="stylesheet" href="/assets/common/css/common.css" type="text/css" media="all">
<link rel="stylesheet" href="/assets/common/css/parts.css" type="text/css" media="all">

<script type="text/javascript" src="/assets/common/js/jquery-1.12.4.min.js"></script>
<script type="text/javascript" src="/assets/common/js/jquery.easing.1.3.js"></script>
<script type="text/javascript" src="/assets/common/js/jquery.bxslider.min.js"></script>
<script type="text/javascript" src="/assets/common/js/jquery.fancybox.min.js"></script>
<script type="text/javascript" src="/assets/common/js/common.js"></script>
<script type="text/javascript" src="/assets/common/js/ga.js"></script>

<link rel="stylesheet" href="/assets/neostall/css/neostall.css" type="text/css" media="all">
<script type="text/javascript" src="/assets/neostall/js/neostall.js"></script>

<title>慶應義塾大学矢上キャンパス村 | ランチスケジュール | ネオ屋台村 | ワークストア・トウキョウドゥ</title>

</head>


<body class="neostall_page neostall_space_page">
    

<!-- START #header -->
<noscript>
    <p class="header_noscript">ウェブブラウザの設定でJavaScriptを有効にしてご利用ください。</p>
</noscript>
    
<header id="header">
    <div class="header_inner">
        <h1 class="header_site_ttl"><a href="/">Workstore Tokyo Do | ワークストア・トウキョウドゥ</a></h1>
        <nav class="header_gnav">
            <div class="header_gnav_inner">
                <ul class="header_gnav_brand">
                    <li class="header_gnav_brand_direct"><a href="/direct/">DIRECT MANAGEMENT</a></li>
                    <li class="header_gnav_brand_neostall"><a class="active" href="/neostall/">ネオ屋台村</a></li>
                    <li class="header_gnav_brand_neoponte"><a href="/neoponte/">ネオポンテ</a></li>
                    <li class="header_gnav_brand_sharyobu"><a href="/sharyobu/">車両部</a></li>
                </ul>
                <ul class="header_gnav_menu">
                    <li><a href="/company/"><span>会社概要</span></a></li>
                    <li><a href="/terms/"><span>ご利用にあたって</span></a></li>
                    <li><a href="/contact/"><span>お問い合わせ</span></a></li>
                </ul>
                <ul class="header_gnav_other">
                    <li class="header_gnav_other_facebook"><a href="https://www.facebook.com/sharer.php?u=http%3A%2F%2Fwww.w-tokyodo.com%2Fneostall%2Fspace%2Flunch%2F%3Flunch%3D%25E6%2585%25B6%25E6%2587%2589%25E7%25BE%25A9%25E5%25A1%25BE%25E5%25A4%25A7%25E5%25AD%25A6%25E7%259F%25A2%25E4%25B8%258A%25E3%2582%25AD%25E3%2583%25A3%25E3%2583%25B3%25E3%2583%2591%25E3%2582%25B9%25E6%259D%2591" target="_blank">Facebook</a></li>
                    <li class="header_gnav_other_twitter"><a href="https://twitter.com/share?text=%E6%85%B6%E6%87%89%E7%BE%A9%E5%A1%BE%E5%A4%A7%E5%AD%A6%E7%9F%A2%E4%B8%8A%E3%82%AD%E3%83%A3%E3%83%B3%E3%83%91%E3%82%B9%E6%9D%91" target="_blank">Twitter</a></li>
                    <li class="header_gnav_other_contact"><a href="/contact/">お問い合わせ</a></li>
                </ul>
                <div class="header_gnav_btn">
                    <a href="">
                        <span class="header_gnav_btn_ttl">Menu</span>
                        <span id="header_gnav_btn_bar01" class="header_gnav_btn_bar"></span>
                        <span id="header_gnav_btn_bar02" class="header_gnav_btn_bar"></span>
                        <span id="header_gnav_btn_bar03" class="header_gnav_btn_bar"></span>
                    </a>
                </div>
            </div>
        </nav>
        <nav class="header_lnav">
            <div class="header_lnav_inner clearfix">
                <h2 class="header_lnav_ttl"><a href="/neostall/">ネオ屋台村</a></h2>
                <ul class="header_lnav_menu">
                    <li><a href="/neostall/event/">イベント</a></li>
                    <li><a class="active" href="/neostall/space/">ランチスケジュール</a></li>
                    <li><a href="/neostall/about/">ネオ屋台村とは</a></li>
                    <li><a href="/contact#join">出店をご希望の方</a></li>
                    <li><a href="/neostall/location/">ネオ屋台村の誘致をご検討の方</a></li>
                </ul>
                <div class="header_lnav_btn"><a href="">メニュー</a></div>
            </div>
        </nav>
    </div>
</header>
    
<div class="header_overlay"></div>
<!-- //END #header -->
    
    
<!-- START #loader -->
<div id="loader"></div>
<!-- //END #loader -->


<!-- START #contents -->
<article id="contents">
    <section id="mv">
        <h2 class="mv_ttl">
            <span>ランチスケジュール</span>
            <span>Lunch Schedule</span>
        </h2>
        <div class="mv_img">
            <ul class="bxslider bg_img">
                <li><img src="/assets/neostall/img/neostall_space_mv_img01.jpg" alt=""></li>
                <li><img src="/assets/neostall/img/neostall_brand_mv_img06.jpg" alt=""></li>
            </ul>
        </div>
    </section>
    <section id="content">
        <div class="cnt_block">
            <h3 class="cnt_ttl">慶應義塾大学矢上キャンパス村</h3>
            <div class="cnt_details_overview">
                <dl>
                    <dt>
                        <span class="cnt_icon cnt_icon_place">神奈川県横浜市港北区日吉3-14-1</span>
                        <span class="cnt_icon cnt_icon_time">11:30～13:30</span>
                    </dt>
                     <dd>
                        <ul class="cnt_btn">
                            <li><a href="/assets/common/images/event_pdf/event_2983.pdf" target="_blank"><span class="link_icon link_icon_arrow">フライヤーを見る</span></a></li>
                        </ul>
                    </dd>
                     <dd>
                        <ul class="cnt_btn">
                            <li><a href="https://maps.google.co.jp/maps?ll=35.556097, 139.653014" target="_blank"><span class="link_icon link_icon_arrow">地図を見る</span></a></li>
                        </ul>
                    </dd>
                 </dl>
            </div>
        </div>
        <div class="cnt_block">
            <div class="cnt_tabs">
                <ul class="cnt_tabs_menu cnt_tabs_col05">
                    <li>05/22<span>（月）</span></li>
                    <li>05/23<span>（火）</span></li>
                    <li>05/24<span>（水）</span></li>
                    <li>05/25<span>（木）</span></li>
                    <li class="active">05/26<span>（金）</span></li>
                </ul>
                <ul class="cnt_tabs_inner">
                    <li><!-- date -->
                        <div class="cnt_block"><!-- cnt_block -->
							<div class="cnt_archive_lists"><!-- cnt_archive_lists -->
                                <ul class="cnt_archive_lists_col02"><!-- cnt_archive_lists_col02 -->

                                    <li><!-- cnt_archive_lists_col02 li -->
                                        <a class="fancybox fancybox_inline" href="#989">
                                            <h4 class="cnt_archive_lists_ttl"><span class="link_icon link_icon_arrow">Smokin&#039; Bluemoon</span></h4>
                                            <dl class="clearfix">
                                                <dt>
                                                    <span class="cnt_archive_lists_img resize_img"><img src="https://www.w-tokyodo.com/assets/common/images/car_photo_thum/2983_989.jpg" alt=""></span>
                                                    <span class="cnt_archive_lists_thumb resize_img"><img src="https://www.w-tokyodo.com/assets/common/images/menu_photo_thum/2983_989.jpg" alt=""></span>
                                                </dt>
                                                <dd>
                                                    <div class="cnt_archive_lists_txt">
<p>	【メニュー：ハーブチキン＆ライス/ケイジャンポーク＆ライス/ハーフ＆ハーフ】フレッシュなスイートバジルで作ったソースで味付けしたチキンは食欲をそそります。</p></div>
                                                </dd>
                                            </dl>
                                        </a>
                                        <div id="989" class="cnt_modalbox">
                                            <div class="cnt_modalbox_inner">
                                                <h4 class="cnt_modalbox_ttl">Smokin&#039; Bluemoon</h4>
                                                <div class="cnt_image_lists">
                                                    <ul class="cnt_image_lists_col02">
                                                    <li><div><span class="cnt_image_lists_img resize_img"><img src="https://www.w-tokyodo.com/assets/common/images/car_photo_thum/2983_989.jpg" alt=""></span></div></li>
                                                    <li><div><span class="cnt_image_lists_img resize_img"><img src="https://www.w-tokyodo.com/assets/common/images/menu_photo_thum/2983_989.jpg" alt=""></span></div></li>
                                                    </ul>
                                                </div>
<p>	【メニュー：ハーブチキン＆ライス/ケイジャンポーク＆ライス/ハーフ＆ハーフ】フレッシュなスイートバジルで作ったソースで味付けしたチキンは食欲をそそります。</p>                                            </div>
                                        </div>
                                    </li><!-- cnt_archive_lists_col02 li -->

                                    <li><!-- cnt_archive_lists_col02 li -->
                                        <a class="fancybox fancybox_inline" href="#1210">
                                            <h4 class="cnt_archive_lists_ttl"><span class="link_icon link_icon_arrow">SOSYURAN </span></h4>
                                            <dl class="clearfix">
                                                <dt>
                                                    <span class="cnt_archive_lists_img resize_img"><img src="https://www.w-tokyodo.com/assets/common/images/car_photo_thum/2983_1210.jpg" alt=""></span>
                                                    <span class="cnt_archive_lists_thumb resize_img"><img src="https://www.w-tokyodo.com/assets/common/images/menu_photo_thum/2983_1210.jpg" alt=""></span>
                                                </dt>
                                                <dd>
                                                    <div class="cnt_archive_lists_txt">
<p>【メニュー：からあげ丼/キムチからあげ丼/チーズからあげ丼】作り立てアツアツを提供いたします。</p></div>
                                                </dd>
                                            </dl>
                                        </a>
                                        <div id="1210" class="cnt_modalbox">
                                            <div class="cnt_modalbox_inner">
                                                <h4 class="cnt_modalbox_ttl">SOSYURAN </h4>
                                                <div class="cnt_image_lists">
                                                    <ul class="cnt_image_lists_col02">
                                                    <li><div><span class="cnt_image_lists_img resize_img"><img src="https://www.w-tokyodo.com/assets/common/images/car_photo_thum/2983_1210.jpg" alt=""></span></div></li>
                                                    <li><div><span class="cnt_image_lists_img resize_img"><img src="https://www.w-tokyodo.com/assets/common/images/menu_photo_thum/2983_1210.jpg" alt=""></span></div></li>
                                                    </ul>
                                                </div>
<p>【メニュー：からあげ丼/キムチからあげ丼/チーズからあげ丼】作り立てアツアツを提供いたします。</p>                                            </div>
                                        </div>
                                    </li><!-- cnt_archive_lists_col02 li -->
                                </ul>
							</div>
						</div><!-- cnt_block -->
                    </li><!-- date -->
					<li><!-- date -->
                        <div class="cnt_block"><!-- cnt_block -->
							<div class="cnt_archive_lists"><!-- cnt_archive_lists -->
                                <ul class="cnt_archive_lists_col02"><!-- cnt_archive_lists_col02 -->

                                    <li><!-- cnt_archive_lists_col02 li -->
                                        <a class="fancybox fancybox_inline" href="#1375">
                                            <h4 class="cnt_archive_lists_ttl"><span class="link_icon link_icon_arrow">まはまぐ</span></h4>
                                            <dl class="clearfix">
                                                <dt>
                                                    <span class="cnt_archive_lists_img resize_img"><img src="https://www.w-tokyodo.com/assets/common/images/car_photo_thum/2983_1375.jpg" alt=""></span>
                                                    <span class="cnt_archive_lists_thumb resize_img"><img src="https://www.w-tokyodo.com/assets/common/images/menu_photo_thum/2983_1375.jpg" alt=""></span>
                                                </dt>
                                                <dd>
                                                    <div class="cnt_archive_lists_txt">
<p>【メニュー：サテライス/ガイヤーン】こんがり焼いたお肉にピーナッツバターソースとココナツミルクをかけた南国感溢れるサテライスなど各種アジアンごはんをご用意しております！</p></div>
                                                </dd>
                                            </dl>
                                        </a>
                                        <div id="1375" class="cnt_modalbox">
                                            <div class="cnt_modalbox_inner">
                                                <h4 class="cnt_modalbox_ttl">まはまぐ</h4>
                                                <div class="cnt_image_lists">
                                                    <ul class="cnt_image_lists_col02">
                                                    <li><div><span class="cnt_image_lists_img resize_img"><img src="https://www.w-tokyodo.com/assets/common/images/car_photo_thum/2983_1375.jpg" alt=""></span></div></li>
                                                    <li><div><span class="cnt_image_lists_img resize_img"><img src="https://www.w-tokyodo.com/assets/common/images/menu_photo_thum/2983_1375.jpg" alt=""></span></div></li>
                                                    </ul>
                                                </div>
<p>【メニュー：サテライス/ガイヤーン】こんがり焼いたお肉にピーナッツバターソースとココナツミルクをかけた南国感溢れるサテライスなど各種アジアンごはんをご用意しております！</p>                                            </div>
                                        </div>
                                    </li><!-- cnt_archive_lists_col02 li -->

                                    <li><!-- cnt_archive_lists_col02 li -->
                                        <a class="fancybox fancybox_inline" href="#781">
                                            <h4 class="cnt_archive_lists_ttl"><span class="link_icon link_icon_arrow">+Spice</span></h4>
                                            <dl class="clearfix">
                                                <dt>
                                                    <span class="cnt_archive_lists_img resize_img"><img src="https://www.w-tokyodo.com/assets/common/images/car_photo_thum/2983_781.jpg" alt=""></span>
                                                    <span class="cnt_archive_lists_thumb resize_img"><img src="https://www.w-tokyodo.com/assets/common/images/menu_photo_thum/2983_781.jpg" alt=""></span>
                                                </dt>
                                                <dd>
                                                    <div class="cnt_archive_lists_txt">
<p>【メニュー：インドカレー/ナン/ライス】　 車の中に積んだタンドリー釜の炭火で焼いた熱々モチモチのナンが最高です！！ インド人シェフが作るカレーは定番チキンやキーマ、季節の野菜からお選び頂けます。 ベジタリアンの方にも召し上がって頂けるメニューもご用意致します。</p></div>
                                                </dd>
                                            </dl>
                                        </a>
                                        <div id="781" class="cnt_modalbox">
                                            <div class="cnt_modalbox_inner">
                                                <h4 class="cnt_modalbox_ttl">+Spice</h4>
                                                <div class="cnt_image_lists">
                                                    <ul class="cnt_image_lists_col02">
                                                    <li><div><span class="cnt_image_lists_img resize_img"><img src="https://www.w-tokyodo.com/assets/common/images/car_photo_thum/2983_781.jpg" alt=""></span></div></li>
                                                    <li><div><span class="cnt_image_lists_img resize_img"><img src="https://www.w-tokyodo.com/assets/common/images/menu_photo_thum/2983_781.jpg" alt=""></span></div></li>
                                                    </ul>
                                                </div>
<p>【メニュー：インドカレー/ナン/ライス】　 車の中に積んだタンドリー釜の炭火で焼いた熱々モチモチのナンが最高です！！ インド人シェフが作るカレーは定番チキンやキーマ、季節の野菜からお選び頂けます。 ベジタリアンの方にも召し上がって頂けるメニューもご用意致します。</p>                                            </div>
                                        </div>
                                    </li><!-- cnt_archive_lists_col02 li -->
                                </ul>
							</div>
						</div><!-- cnt_block -->
                    </li><!-- date -->
					<li><!-- date -->
                        <div class="cnt_block"><!-- cnt_block -->
							<div class="cnt_archive_lists"><!-- cnt_archive_lists -->
                                <ul class="cnt_archive_lists_col02"><!-- cnt_archive_lists_col02 -->

                                    <li><!-- cnt_archive_lists_col02 li -->
                                        <a class="fancybox fancybox_inline" href="#1140">
                                            <h4 class="cnt_archive_lists_ttl"><span class="link_icon link_icon_arrow">てふてふ</span></h4>
                                            <dl class="clearfix">
                                                <dt>
                                                    <span class="cnt_archive_lists_img resize_img"><img src="https://www.w-tokyodo.com/assets/common/images/car_photo_thum/2983_1140.jpg" alt=""></span>
                                                    <span class="cnt_archive_lists_thumb resize_img"><img src="https://www.w-tokyodo.com/assets/common/images/menu_photo_thum/2983_1140.jpg" alt=""></span>
                                                </dt>
                                                <dd>
                                                    <div class="cnt_archive_lists_txt">
<p>【メニュー：ムーデン/てふてふごはん】自分の足で目で口でタイ屋台を食べ歩き、豚の三枚肉を豪快に焼いて吊るした屋台料理ムーデンと出会った。 タイ料理をもっと皆に食べてほしい。</p></div>
                                                </dd>
                                            </dl>
                                        </a>
                                        <div id="1140" class="cnt_modalbox">
                                            <div class="cnt_modalbox_inner">
                                                <h4 class="cnt_modalbox_ttl">てふてふ</h4>
                                                <div class="cnt_image_lists">
                                                    <ul class="cnt_image_lists_col02">
                                                    <li><div><span class="cnt_image_lists_img resize_img"><img src="https://www.w-tokyodo.com/assets/common/images/car_photo_thum/2983_1140.jpg" alt=""></span></div></li>
                                                    <li><div><span class="cnt_image_lists_img resize_img"><img src="https://www.w-tokyodo.com/assets/common/images/menu_photo_thum/2983_1140.jpg" alt=""></span></div></li>
                                                    </ul>
                                                </div>
<p>【メニュー：ムーデン/てふてふごはん】自分の足で目で口でタイ屋台を食べ歩き、豚の三枚肉を豪快に焼いて吊るした屋台料理ムーデンと出会った。 タイ料理をもっと皆に食べてほしい。</p>                                            </div>
                                        </div>
                                    </li><!-- cnt_archive_lists_col02 li -->

                                    <li><!-- cnt_archive_lists_col02 li -->
                                        <a class="fancybox fancybox_inline" href="#1213">
                                            <h4 class="cnt_archive_lists_ttl"><span class="link_icon link_icon_arrow">Ft-works</span></h4>
                                            <dl class="clearfix">
                                                <dt>
                                                    <span class="cnt_archive_lists_img resize_img"><img src="https://www.w-tokyodo.com/assets/common/images/car_photo_thum/2983_1213.jpg" alt=""></span>
                                                    <span class="cnt_archive_lists_thumb resize_img"><img src="https://www.w-tokyodo.com/assets/common/images/menu_photo_thum/2983_1213.jpg" alt=""></span>
                                                </dt>
                                                <dd>
                                                    <div class="cnt_archive_lists_txt">
<p>【メニュー：ビビンバ/ヤンニョムチキン/プルコギ/テジクッパ】５品目の特製ビビンバに甘辛いヤンニョムチキンを付けたセットがおすすめ！その他単品のビビンバやハニーマスタードチキンもご用意しておりますので是非お試しください！</p></div>
                                                </dd>
                                            </dl>
                                        </a>
                                        <div id="1213" class="cnt_modalbox">
                                            <div class="cnt_modalbox_inner">
                                                <h4 class="cnt_modalbox_ttl">Ft-works</h4>
                                                <div class="cnt_image_lists">
                                                    <ul class="cnt_image_lists_col02">
                                                    <li><div><span class="cnt_image_lists_img resize_img"><img src="https://www.w-tokyodo.com/assets/common/images/car_photo_thum/2983_1213.jpg" alt=""></span></div></li>
                                                    <li><div><span class="cnt_image_lists_img resize_img"><img src="https://www.w-tokyodo.com/assets/common/images/menu_photo_thum/2983_1213.jpg" alt=""></span></div></li>
                                                    </ul>
                                                </div>
<p>【メニュー：ビビンバ/ヤンニョムチキン/プルコギ/テジクッパ】５品目の特製ビビンバに甘辛いヤンニョムチキンを付けたセットがおすすめ！その他単品のビビンバやハニーマスタードチキンもご用意しておりますので是非お試しください！</p>                                            </div>
                                        </div>
                                    </li><!-- cnt_archive_lists_col02 li -->
                                </ul>
							</div>
						</div><!-- cnt_block -->
                    </li><!-- date -->
					<li><!-- date -->
                        <div class="cnt_block"><!-- cnt_block -->
							<div class="cnt_archive_lists"><!-- cnt_archive_lists -->
                                <ul class="cnt_archive_lists_col02"><!-- cnt_archive_lists_col02 -->

                                    <li><!-- cnt_archive_lists_col02 li -->
                                        <a class="fancybox fancybox_inline" href="#94">
                                            <h4 class="cnt_archive_lists_ttl"><span class="link_icon link_icon_arrow">Jule&#039;s spices</span></h4>
                                            <dl class="clearfix">
                                                <dt>
                                                    <span class="cnt_archive_lists_img resize_img"><img src="https://www.w-tokyodo.com/assets/common/images/car_photo_thum/2983_94.jpg" alt=""></span>
                                                    <span class="cnt_archive_lists_thumb resize_img"><img src="https://www.w-tokyodo.com/assets/common/images/menu_photo_thum/2983_94.jpg" alt=""></span>
                                                </dt>
                                                <dd>
                                                    <div class="cnt_archive_lists_txt">
<p>【メニュー：甘辛丼/ナシゴレン】ジュリーズスパイスが紹介するナシゴレンやオリジナル甘辛丼です。一度食べたらクセになりますよー。</p></div>
                                                </dd>
                                            </dl>
                                        </a>
                                        <div id="94" class="cnt_modalbox">
                                            <div class="cnt_modalbox_inner">
                                                <h4 class="cnt_modalbox_ttl">Jule&#039;s spices</h4>
                                                <div class="cnt_image_lists">
                                                    <ul class="cnt_image_lists_col02">
                                                    <li><div><span class="cnt_image_lists_img resize_img"><img src="https://www.w-tokyodo.com/assets/common/images/car_photo_thum/2983_94.jpg" alt=""></span></div></li>
                                                    <li><div><span class="cnt_image_lists_img resize_img"><img src="https://www.w-tokyodo.com/assets/common/images/menu_photo_thum/2983_94.jpg" alt=""></span></div></li>
                                                    </ul>
                                                </div>
<p>【メニュー：甘辛丼/ナシゴレン】ジュリーズスパイスが紹介するナシゴレンやオリジナル甘辛丼です。一度食べたらクセになりますよー。</p>                                            </div>
                                        </div>
                                    </li><!-- cnt_archive_lists_col02 li -->

                                    <li><!-- cnt_archive_lists_col02 li -->
                                        <a class="fancybox fancybox_inline" href="#1098">
                                            <h4 class="cnt_archive_lists_ttl"><span class="link_icon link_icon_arrow">ふらっと</span></h4>
                                            <dl class="clearfix">
                                                <dt>
                                                    <span class="cnt_archive_lists_img resize_img"><img src="https://www.w-tokyodo.com/assets/common/images/car_photo_thum/2983_1098.jpg" alt=""></span>
                                                    <span class="cnt_archive_lists_thumb resize_img"><img src="https://www.w-tokyodo.com/assets/common/images/menu_photo_thum/2983_1098.jpg" alt=""></span>
                                                </dt>
                                                <dd>
                                                    <div class="cnt_archive_lists_txt">
<p>【メニュー：ハンバーグ丼】いろいろな料理になる挽き⾁。後引く味のお⾁を丼でお召し上がりください。</p></div>
                                                </dd>
                                            </dl>
                                        </a>
                                        <div id="1098" class="cnt_modalbox">
                                            <div class="cnt_modalbox_inner">
                                                <h4 class="cnt_modalbox_ttl">ふらっと</h4>
                                                <div class="cnt_image_lists">
                                                    <ul class="cnt_image_lists_col02">
                                                    <li><div><span class="cnt_image_lists_img resize_img"><img src="https://www.w-tokyodo.com/assets/common/images/car_photo_thum/2983_1098.jpg" alt=""></span></div></li>
                                                    <li><div><span class="cnt_image_lists_img resize_img"><img src="https://www.w-tokyodo.com/assets/common/images/menu_photo_thum/2983_1098.jpg" alt=""></span></div></li>
                                                    </ul>
                                                </div>
<p>【メニュー：ハンバーグ丼】いろいろな料理になる挽き⾁。後引く味のお⾁を丼でお召し上がりください。</p>                                            </div>
                                        </div>
                                    </li><!-- cnt_archive_lists_col02 li -->
                                </ul>
							</div>
						</div><!-- cnt_block -->
                    </li><!-- date -->
					<li class="active"><!-- date -->
                        <div class="cnt_block"><!-- cnt_block -->
							<div class="cnt_archive_lists"><!-- cnt_archive_lists -->
                                <ul class="cnt_archive_lists_col02"><!-- cnt_archive_lists_col02 -->

                                    <li><!-- cnt_archive_lists_col02 li -->
                                        <a class="fancybox fancybox_inline" href="#996">
                                            <h4 class="cnt_archive_lists_ttl"><span class="link_icon link_icon_arrow">Comida Latina</span></h4>
                                            <dl class="clearfix">
                                                <dt>
                                                    <span class="cnt_archive_lists_img resize_img"><img src="https://www.w-tokyodo.com/assets/common/images/car_photo_thum/2983_996.jpg" alt=""></span>
                                                    <span class="cnt_archive_lists_thumb resize_img"><img src="https://www.w-tokyodo.com/assets/common/images/menu_photo_thum/2983_996.jpg" alt=""></span>
                                                </dt>
                                                <dd>
                                                    <div class="cnt_archive_lists_txt">
<p>【メニュー：タコライス】本格沖縄のタコライス。 アボカド・ビーンズ・サワークリームなどトッピング色々で、お好みの味にアレンジ出来ます！</p></div>
                                                </dd>
                                            </dl>
                                        </a>
                                        <div id="996" class="cnt_modalbox">
                                            <div class="cnt_modalbox_inner">
                                                <h4 class="cnt_modalbox_ttl">Comida Latina</h4>
                                                <div class="cnt_image_lists">
                                                    <ul class="cnt_image_lists_col02">
                                                    <li><div><span class="cnt_image_lists_img resize_img"><img src="https://www.w-tokyodo.com/assets/common/images/car_photo_thum/2983_996.jpg" alt=""></span></div></li>
                                                    <li><div><span class="cnt_image_lists_img resize_img"><img src="https://www.w-tokyodo.com/assets/common/images/menu_photo_thum/2983_996.jpg" alt=""></span></div></li>
                                                    </ul>
                                                </div>
<p>【メニュー：タコライス】本格沖縄のタコライス。 アボカド・ビーンズ・サワークリームなどトッピング色々で、お好みの味にアレンジ出来ます！</p>                                            </div>
                                        </div>
                                    </li><!-- cnt_archive_lists_col02 li -->

                                    <li><!-- cnt_archive_lists_col02 li -->
                                        <a class="fancybox fancybox_inline" href="#1133">
                                            <h4 class="cnt_archive_lists_ttl"><span class="link_icon link_icon_arrow">CAMPS</span></h4>
                                            <dl class="clearfix">
                                                <dt>
                                                    <span class="cnt_archive_lists_img resize_img"><img src="https://www.w-tokyodo.com/assets/common/images/car_photo_thum/2983_1133.jpg" alt=""></span>
                                                    <span class="cnt_archive_lists_thumb resize_img"><img src="https://www.w-tokyodo.com/assets/common/images/menu_photo_thum/2983_1133.jpg" alt=""></span>
                                                </dt>
                                                <dd>
                                                    <div class="cnt_archive_lists_txt">
<p>【メニュー：ルーローハン/ジーローハン】台湾の定番料理、ルーローハン・ジーローハンを提供します。 独自のスパイスが効いたご飯の進む一品です。ぜひご賞味ください。</p></div>
                                                </dd>
                                            </dl>
                                        </a>
                                        <div id="1133" class="cnt_modalbox">
                                            <div class="cnt_modalbox_inner">
                                                <h4 class="cnt_modalbox_ttl">CAMPS</h4>
                                                <div class="cnt_image_lists">
                                                    <ul class="cnt_image_lists_col02">
                                                    <li><div><span class="cnt_image_lists_img resize_img"><img src="https://www.w-tokyodo.com/assets/common/images/car_photo_thum/2983_1133.jpg" alt=""></span></div></li>
                                                    <li><div><span class="cnt_image_lists_img resize_img"><img src="https://www.w-tokyodo.com/assets/common/images/menu_photo_thum/2983_1133.jpg" alt=""></span></div></li>
                                                    </ul>
                                                </div>
<p>【メニュー：ルーローハン/ジーローハン】台湾の定番料理、ルーローハン・ジーローハンを提供します。 独自のスパイスが効いたご飯の進む一品です。ぜひご賞味ください。</p>                                            </div>
                                        </div>
                                    </li><!-- cnt_archive_lists_col02 li -->
                                </ul><!-- cnt_archive_lists_col02 -->
                            </div><!-- cnt_archive_lists -->
						</div><!-- cnt_block -->
                    </li><!-- date -->
                </ul>
            </div>
        </div>
		<div class="cnt_block fs12"><b>ご注意：</b>お店・メニューなどは変更になる可能性がございます。予告なしにお休みとなるお店もございます。交通状況などにより、営業時間が遅れることがございます。</div>
    </section>
</article>
<!-- //END #contents -->


<!-- START #footer -->
<footer id="footer">
    <div class="footer_pagetop"><a href="">PAGE TOP</a></div>
    
    <div class="footer_inner">
        <ol class="footer_breadcrumbs">
            <li><a href="/">トップページ</a></li>
            <li><a href="/neostall/">ネオ屋台村</a></li>
            <li><a href="/neostall/space/">ランチスケジュール</a></li>
            <li>慶應義塾大学矢上キャンパス村</li>
        </ol>


        <nav class="footer_sitemap clearfix">
            <dl class="footer_sitemap_tokyodo">
                <dt><a href="/">Workstore Tokyo Do | ワークストア・トウキョウドゥ</a></dt>
                <dd>
                    <p>〒146-0094 東京都大田区東矢口三丁目30番14号</p>
                    <ul class="footer_sitemap_tokyodo_links">
                        <li class="footer_sitemap_tokyodo_links_tel"><a href="tel:03-3737-3000">03-3737-3000</a></li>
                        <li class="footer_sitemap_tokyodo_links_mail"><a href="/contact">お問い合わせ</a></li>
                    </ul>
                </dd>
            </dl>
            <ul class="footer_sitemap_brand">
                <li class="footer_sitemap_brand_direct"><a href="/direct/">DIRECT MANAGEMENT</a></li>
                <li class="footer_sitemap_brand_neostall"><a href="/neostall/">ネオ屋台村</a></li>
                <li class="footer_sitemap_brand_neoponte"><a href="/neoponte/">ネオポンテ</a></li>
                <li class="footer_sitemap_brand_sharyobu"><a href="/sharyobu/">車両部</a></li>
            </ul>
        </nav>
    </div>
    
    <div class="footer_credit">
        <p>Copyright &copy; 2010-<script type="text/javascript">var nowDate = new Date(); var dateYear = nowDate.getFullYear(); document.write(dateYear)</script> WorkStore Tokyo Do.<br>All Rights Reserved.</p>
    </div></footer>
<!-- //END #footer -->


</body>
</html>
`;

const getLunch = async () => {
    // const response = await axios.get(websiteUrl);
    // const $ = cheerio.load(response.data);
    const $ = cheerio.load(rawHtml);
    const shops = $("#content .cnt_block .cnt_tabs .cnt_tabs_inner .active .cnt_block .cnt_archive_lists .cnt_archive_lists_col02");
    shops.children("li").each((i, e) => {
        let elem = cheerio.load(e);
        const shopName = elem("a h4 span").text();
        const shopImages = elem("a dl dt");
        const shopAppearanceImg = shopImages.first().find("img").attr("src");
        const shopMenuImg = shopImages.last().find("img").attr("src");
        
        const shopExplanation = elem("a dl dd div p").text();

        console.log(shopName);
        console.log(shopAppearanceImg);
        console.log(shopMenuImg);
        console.log(shopExplanation);
        console.log("-----");
    });
    return shops.text();
}

getLunch().then((lunch) => {
    // console.log(lunch);
});
