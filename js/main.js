$(function(){
	$(".pagePub").css({"height":$(document).height()});
    showPage("page01");
    $(".enter").click(function(){
        showPage("page02");
    });
    $(".messageUl li").click(function(){
        showPage("page03");
        //滑动
        var swiper = new Swiper('.swiper-container-h', {
            paginationClickable: true,
            nextButton: '.swiper-button-h',
            prevButton: '.swiper-button-p',
            loop: true,
        });
    });
    $(".speak").click(function(){
        showPage("page04");
    });
    $('#share').click(function () {
        $('#shadow').show();
    });
	$("#shadow").click(function(){
		$(this).hide();
	});
    $(".returnIcon").click(function(){
        showPage("page02");
    });
    $(".homeIcon").click(function(){
        showPage("page01");
    });
    $(".sendA").click(function(){
        showPage("page05");
        var i = 0;
        var pecentInt = setInterval(function(){
            i=i+1;
            $(".processNum i").html(i)
            if(i >= 100){
                clearInterval(pecentInt);
                showPage("page06");
                setTimeout(function(){
                    showPage("page02");
                },5000)
            }
        },30);
    });
		
    $("#TextArea1").keydown(function(){  
        var curLength=$("#TextArea1").val().length;   
        if(curLength>=100){  
            var num=$("#TextArea1").val().substr(0,99);  
            $("#TextArea1").val(num);  
            alert("超过字数限制~" );  
        }
    });

    $(".sendA").click(function(){
        $.post('http://chat.meedesidy.top/messages', {"message[context]": $("#TextArea1").val(),"message[userid]": $("#message_userid").val(), formats: 'json'}, function(data){
            console.info(data);
        });

    });

    $.get('http://chat.meedesidy.top/messages/show_all', {formats: 'json'}, function(data){
        $.each(data, function(index, item){
            showMessaage(item.context, item.userid);
        })
    });

    $("#bgmusic")[0].play();
});


function showMessaage(message, userid){
    var messageSlideHtml = "<div class='swiper-slide messageSlide'><img src='img/tx0"+ Math.floor(Math.random()*6+1) +".png' class='txBig'><span class='nameBig'>" + userid + "</span><p class='messageBig'>" + message + "</p></div>";
    var html = "<li><div class='tx'><img src='img/tx0"+ Math.floor(Math.random()*6+1) +".png'><span>" + userid + "</span></div><p class='message'>" + message + "</p><div class='clear'></div></li>"
    $(".messageUl").append(html);
    $(".swiper-wrapper").append(messageSlideHtml);
    $(".messageUl li").click(function(){
        showPage("page03");
        //滑动
        var swiper = new Swiper('.swiper-container-h', {
            paginationClickable: true,
            nextButton: '.swiper-button-h',
            prevButton: '.swiper-button-p',
            loop: true,
        });
    });
}

function showPage(pageId){
    $(".page").hide();
    $("#"+pageId).show();
}

function musicCtl(){
    var audio = document.getElementById('bgmusic');
    var musicIcon = $("#musicIcon");
    if(audio!==null){
        //检测播放是否已暂停.audio.paused 在播放器播放时返回false.
        if(audio.paused)                     {
            audio.play();//audio.play();// 这个就是播放
            musicIcon.addClass("musicplay");
        }else{
            audio.pause();// 这个就是暂停
            musicIcon.removeClass("musicplay");
        }
    }
}


