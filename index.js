let items=document.querySelectorAll('.item-container','.slider');
let active=6;
let touchStart=0;
let isTouch = 'ontouchstart' in window; // Check if touch events are supported


function showContent(){
items[active].style.transform='none';
items[active].style.zIndex=1;
items[active].style.filter='none';
items[active].style.opacity=1;

let start=0;
for(var i=active+1;i<items.length;i++){
start++;
items[i].style.transform=`translatey(${130*start}px) scale(${1-0.3*start}) perspective(16px)`;
items[i].style.zIndex=-start;
items[i].style.filter='blur(2px)';
items[i].style.opacity=start>2? 0:0.6;
}
start=0;
for(var i=(active-1);i>=0;i--){
start++;
items[i].style.transform=`translatey(${-130*start}px) scale(${1-0.3*start}) perspective(16px)`;
items[i].style.zIndex=-start;
items[i].style.filter='blur(2px)';
items[i].style.opacity=start>2? 0:0.6;
}
}

//this function is for desktop user
function handleScroll(event){
    if(event.deltaY>0){
        if(active < items.length-1){
            active++;
        }
    }
        else if(event.deltaY<0){
            if(active>0){
                active --
            }
        }
        showContent();
}
//this functin is for mobile user 
function handleTouchStart(event){
    touchStart=event.touches[0].clientY;

}
function handleTouchMove(event){
    if(!touchStart) return;
     
    let touchEnd=event.touches[0].clientY;
    let touchDifference=touchStart-touchEnd;

    if(touchDifference >0){
        if(active < items.length-1){
            active++;
        }
    }
    else if(touchDifference < 0){
        if(active>0){
            active --
        }
    }
    showContent();
    touchStart=touchEnd; // Update the touch start position for the next move

}
if(isTouch){
    window.addEventListener('touchStart',handleTouchStart);
    window.addEventListener('touchMove',handleTouchMove)
}
else{

    window.addEventListener('wheel',handleScroll)
}


showContent();