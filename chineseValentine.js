$(function () {
    initImg();
    bind();
});
// 绑定函数
function bind() {
    var n = 0, flag = true;
    var $wrap = $('ul');
    var lisH = $('ul li').eq(0).height();
    $wrap.on('touchstart', '.layer', function (e) {
        e.stopPropagation();
        e.preventDefault();
        if ($(this).hasClass('tite')) {
            if(!$(this).hasClass('start')){
                var $me = $(this);
                var liLast = $wrap.find('li:first').attr('class');
                var liLastNum = Number(liLast.match(/\d+/g));
                var doSTop = $(document).scrollTop();
                $.when($('html,body').animate({scrollTop: doSTop - lisH}, 10)).then(function () {
                    var str;
                    var thisLiNum = Number($me.parent().attr('class').match(/\d+/g));
                    if(thisLiNum == 17){  //77应该也可以用Number($('li:first').attr('class').match(/\d+/g))
                        $wrap.off();
                        clearTimeout(timer);
                        hanleResult();
                    }else if(thisLiNum >= 9){
                        if(flag){
                            $me.parent().next().remove();
                            str = '<div class="end"><img src="img/ban.jpg"></div>';
                            flag = false;
                        }else{
                            str = '';
                            if($('.end img').offset().top <= 0){
                                $me.parent().next().remove();
                            }
                        }
                    }else{
                        $me.parent().next().remove();
                        var nowLastNum = liLastNum + 1;
                        str = '<li class="li' + nowLastNum + '">' +
                            '<span class="layer"></span>' +
                            '<span class="layer"></span>' +
                            '<span class="layer"></span>' +
                            '<span class="layer"></span>' +
                            '</li>';
                    }
                    $wrap.prepend(str);
                    arrangeImg($('.li' + nowLastNum));
                    var nowSTop = $(document).scrollTop();
                    $(document).scrollTop(nowSTop + lisH * 2);
                });
            }else{
                countTime()
            }
            $(this).addClass('click');
        } else {
            $wrap.off();
            $('.playAgain').css('display', '-webkit-box');
        }

    });
    //弹层关闭按钮
    $('body').on('touchstart', '.pop-innr .close', function (e) {
        e.stopPropagation();
        e.preventDefault();
        $('.pop-warp').hide()
    });
}
//初始化时图片的排列
function initImg() {
    $(document).scrollTop($('ul').height() - $(window).height());
    var $lis = $('ul li');
    for (var i = 0; len = $lis.length, i < len; i++) {
        var $lineLi = $lis.eq(i);
        arrangeImg($lineLi)
    }
}
//图片横向随机排列
function arrangeImg(lineWap) {
    var num = Math.floor(4 * Math.random());
    var $chooseTite = lineWap.find('.layer:eq(' + num + ')');
    if (lineWap.hasClass('li1')) {
        $chooseTite.addClass('tite start');
    } else {
        $chooseTite.addClass('tite');
    }
}
//数据结果处理函数
function hanleResult() {
    $.ajax({
        url: "",
        type: "GET",
        data: {}
    }).done(function (data) {
        var code = data.code;
        var result = data.result;
        if(code == 200){
            $('.getCoupon').css('display', '-webkit-box')
        }else if(code == -401){
            window.location.href = result.url;
        }else if(code == -402){
            $('.couponOut').css('display', '-webkit-box')
        }else if(code == -403){
            $('.onlyOnce').css('display', '-webkit-box')
        }
    })
}
//计时
var $timeText = $('.game-time span');
var n = 0;
var timer;
function countTime(){
    n = n + 0.01;
    $timeText.text(n.toFixed((2)));
    timer = setTimeout(countTime,10)
}

