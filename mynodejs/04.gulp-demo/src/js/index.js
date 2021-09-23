window.addEventListener('load', function(){

    var shopcar = document.querySelector('.shopcar');
    shopcar.addEventListener('click', function(){
        location.href = './shopcar.html';  //只能用绝对路径
    })

    //轮播图
    var arrow_left = document.querySelector('.arrow-left');
    var arrow_right = document.querySelector('.arrow-right');
    var focus = document.querySelector('.focus');
    var focusWidth = focus.offsetWidth;
    focus.addEventListener('mouseenter', function(){
        arrow_left.style.display = 'block';
        arrow_right.style.display = 'block';
        clearInterval(timer);
        timer = null; //清除定时器变量
    })
    focus.addEventListener('mouseleave', function(){
        arrow_left.style.display = 'none';
        arrow_right.style.display = 'none';
        timer = setInterval(function(){
            //手动调用点击事件
            arrow_right.click();
        }, 2000)
    })

    //动态生成ol中的圆圈
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('.circle');
    for(var i = 0; i<ul.children.length; i++){
        var li = document.createElement('li');
        li.setAttribute('data-index', i);
        ol.appendChild(li);

        li.addEventListener('click', function(){
            for(var j = 0; j<ol.children.length; j++){
                ol.children[j].className = '';
            }
            this.className = 'current';

            var target = -(this.getAttribute('data-index') * focusWidth);
            animate_slow(ul, target);

            //将点击的圆圈索引传递给左右箭头
            count = this.dataset.index;
            index = this.dataset.index;
        })
    }
    ol.children[0].className = 'current';


    //无缝滚动时克隆第一张作为过渡
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);

    //设置节流阀，防止快速点击
    var flag = 1;

    var count = 0;
    var index = 0; //圆圈索引
    arrow_left.addEventListener('click', function(){
        if(flag){
            flag = 0;
            if(count == 0){
                count = ul.children.length - 1;
                ul.style.left = -count * focusWidth + 'px';
            }
            count--;
            animate_slow(ul, -count * focusWidth, function(){
                flag = 1;
            });
    
            for(var i = 0; i<ol.children.length; i++){
                ol.children[i].className = '';
            }
            index--;
            if(index < 0){
                index = ol.children.length - 1;
            }
            ol.children[index].className = 'current';
        }  
    })
    arrow_right.addEventListener('click', function(){
        if(flag){
            flag = 0;
            if(count == ul.children.length - 1){
                ul.style.left = 0; //将left瞬间变为0，头尾相接
                count = 0;
            }
            count++;
            animate_slow(ul, -count * focusWidth, function(){
                flag = 1;
            });
    
            for(var i = 0; i<ol.children.length; i++){
                ol.children[i].className = '';
            }
            index++;
            if(index == ol.children.length){
                index = 0;
            }
            ol.children[index].className = 'current';
        }    
    })

    var timer = setInterval(function(){
        //手动调用点击事件
        arrow_right.click();
    }, 2000)
})


$(function(){

    // 侧边栏电梯导航
    var recomTop = $(".recom").offset().top;
    toggleNav();
    function toggleNav(){
        if($(window).scrollTop() >= recomTop){
            $(".c_nav").fadeIn();
        }else{
            $(".c_nav").fadeOut();
        }
    }

    var flag = 1;  //设置滚动节流阀
    $(window).scroll(function(){
        toggleNav();

        if(flag){
            $(".floor .box_hd").each(function(i, e){
                if($(document).scrollTop() >= $(e).offset().top){
                    $(".c_nav li").eq(i).addClass("c_nav_current").siblings().removeClass();
                }
            })
        }
        
    })

    $(".c_nav li span").click(function(){
        console.log($(this).parent().index());

        flag = 0; //关闭节流阀
        var target = $(".floor .box_hd").eq($(this).parent().index()).offset().top
        $("html, body").stop().animate({
            scrollTop: target
        }, function(){
            flag = 1; //打开节流阀
        })

        $(this).parent().addClass("c_nav_current").siblings().removeClass();
    })
    
})