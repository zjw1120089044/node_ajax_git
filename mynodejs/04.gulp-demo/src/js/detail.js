window.addEventListener('load', function(){
    var pre_img = document.querySelector('.preview_img');
    var mask = document.querySelector('.mask');
    var big = document.querySelector('.big');
    pre_img.addEventListener('mouseover', function(){
        mask.style.display = 'block';  //mouseover的冒泡可能会导致闪烁
        big.style.display = 'block';
    })
    pre_img.addEventListener('mouseout', function(){
        mask.style.display = 'none';
        big.style.display = 'none';
    })
    pre_img.addEventListener('mousemove', function(e){
        var x = e.pageX - this.offsetLeft - mask.offsetWidth / 2;
        var y = e.pageY - this.offsetTop - mask.offsetHeight / 2;
        var maxX = pre_img.offsetWidth - mask.offsetWidth;
        var maxY = pre_img.offsetHeight - mask.offsetHeight;
        if(x <= 0){
            x = 0;
        }else if(x >= maxX){
            x = maxX;
        }
        if(y <= 0){
            y = 0;
        }else if(y >= maxY){
            y = maxY;
        }
        mask.style.left = x + 'px';
        mask.style.top = y + 'px';
        
        var bigImg = document.querySelector('.bigImg');
        var bigMax = bigImg.offsetWidth - big.offsetWidth;
        var bigX = x * bigMax / maxX;
        var bigY = y * bigMax / maxY;
        bigImg.style.left = -bigX + 'px';
        bigImg.style.top = -bigY + 'px';
    })
})