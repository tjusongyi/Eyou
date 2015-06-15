
















if(typeof doyoo=='undefined' || !doyoo){
var d_genId=function(){
    var id ='',ids='0123456789abcdef';
    for(var i=0;i<34;i++){ id+=ids.charAt(Math.floor(Math.random()*16));  }  return id;
};
var doyoo={
env:{
secure:false,
mon:'http://m185.looyu.com/monitor',
chat:'http://ali218.looyu.com/chat',
file:'http://static.doyoo.net/110402',
compId:38611,
confId:104426,
vId:d_genId(),
lang:'sc',
fixFlash:1,
subComp:0
}

, monParam:{
index:1,

title:'\u5728\u7ebf\u5ba2\u670d',
text:'\u5c0a\u656c\u7684\u5ba2\u6237\u60a8\u597d\uff0c\u6b22\u8fce\u5149\u4e34\u6211\u516c\u53f8\u7f51\u7ad9\uff01\u6211\u662f\u4eca\u5929\u7684\u5728\u7ebf\u503c\u73ed\u5ba2\u670d\uff0c\u70b9\u51fb\u201c\u5f00\u59cb\u4ea4\u8c08\u201d\u5373\u53ef\u4e0e\u6211\u5bf9\u8bdd',
auto:-1,
group:'64326',
start:'00:00',
end:'24:00',
mask:false,
status:false,
fx:0,
mini:1,
pos:0,
offShow:0,
loop:0,
autoHide:0,
hidePanel:0,
miniStyle:1,
monHideStatus:[0,0,0],
monShowOnly:''
}


, panelParam:{
category:'icon',
position:1,
vertical:150,
horizon:5


,mode:1,
target:'62063',
online:'http://223.4.135.99/qqkefu/ly/rm.gif',
offline:'http://223.4.135.99/qqkefu/ly/rml.gif',
width:120,
height:540,
status:0,
closable:1


}


,sniffer:{
ids:'\u70b9\u51fb\u8fd9\u91cc,img/online_liuyan.jpg,img/cos_liuyan.jpg,zt\images\lytb\18.jpg,zt\images\lytb\19.jpg,zt\images\lytb\04.jpg,zt/images/lytb/02.png,zt/images/lytb/03.png,zt/images/lytb/04.png,zt/images/lytb/05.png,zt/images/lytb/06.png,zt/images/lytb/07.png,zt/images/lytb/08.png,zt/images/lytb/10.png,zt/images/lytb/11.png,zt/images/lytb/12.png,zt/images/lytb/13.png,zt/images/lytb/14.png,zt/images/lytb/15.png,zt/images/lytb/16.png,zt/images/lytb/17.png,zt\images\lytb\20.jpg ,zt/images/lytb/21.png,zt/images/lytb/22.png,zt/images/lytb/23.png,zt/images/lytb/01.png,zt/images/lytb/24.png,zt/images/lytb/25.png,zt/images/lytb/27.png,zt/images/lytb/28.png,zt/images/lytb/29.png,zt/images/lytb/30.png,zt/images/lytb/31.png,zt/images/lytb/32.png,zt/images/lytb/33.png,zt/images/lytb/34.png,zt/images/lytb/35.png,zt/images/lytb/36.png ,zt/images/lytb/09.png',
gids:'37761,37761,37761,37761,37761,37761,37761,37761,37761,37761,37761,37761,37761,37761,37761,37761,37761,37761,37761,37761,37761,37761,37761,37761,37761,37761,37761,37761,37761,37761,37761,37761,37761,37761,37761,37761,37761,37761,37761'
}

};


document.write('<div id="doyoo_panel"></div>');


document.write('<div id="doyoo_monitor"></div>');

document.write('<div id="doyoo_share" style="display:none;"></div>');
document.write('<lin'+'k rel="stylesheet" type="text/css" href="http://static.doyoo.net/110402/looyu.css?140702"></li'+'nk>');
document.write('<scr'+'ipt type="text/javascript" src="http://static.doyoo.net/110402/looyu.js?141104"></scr'+'ipt>');

}

