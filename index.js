const $style=document.createElement('link');
$style.rel='stylesheet';
$style.href='style.css';
 document.head.appendChild($style);


 const $canvas=document.createElement('canvas');
 document.body.appendChild($canvas);

const $ctx = $canvas.getContext("2d");//контекст 2d
$canvas.width = 500;
$canvas.height = 320;


const random = (max, min = 0) => (Math.random() * (max - min + 1) + min) | 0//Рандом

const bolls=[];//Массив для комет
var redY=320/2;//Координата самолета
var redX=0;//Координата самолета

var lives=3;//Жизни
var cons=0;//Очки


function img(){  //Рисуем самолет
var img = new Image();
img.src = "img2.png";  
 $ctx.drawImage(img,redX, redY, 70, 30);   }          



function Ball(x,y){//Рисуем комету
	var img = new Image();
img.src = "img4.png";  
 $ctx.drawImage(img,x, y, 60, 40);  }

 function line(redX,redY){//Рисуем линию
 	$ctx.beginPath();
                $ctx.moveTo(redX+70, redY);//Начальные координаты
                $ctx.lineTo($canvas.width-redX,redY);//длина
                $ctx.lineWidth = 5; // толщина линии
                $ctx.strokeStyle = "#4169E1"; // цвет линии
                $ctx.stroke();
 }

setInterval(()=>bolls.push({x:480,y:random($canvas.height-20)}),1000);//Создаем объект кометы с координатами

function CreadBall(){//Показываем каждый объект на холсте
	for (var i = 0; i < bolls.length; i++) {
		const boll=bolls[i];
		if (boll.x <0) return bolls.splice(i, 1);
		if(boll.x<60){
		if(boll.y<redY+60&&boll.y>redY) {lives-=1;bolls.splice(i, 1);}}
		Ball(boll.x,boll.y);
		boll.x-=10;}}


function Text(){//Создаем текст жизней
 $ctx.font = "16px Arial";
    $ctx.fillStyle = "#CDB38B";
    $ctx.fillText("lives: "+lives, $canvas.width-60, 20); 
}
function TextA(){//Создаем текст очков
 $ctx.font = "16px Arial";
    $ctx.fillStyle = "#CDB38B";
    $ctx.fillText("Chet: "+cons, 20, 20);
}


setInterval(()=>{//запускаем все функции
	$ctx.clearRect(0, 0, $canvas.width, $canvas.height);
	
	 CreadBall();
	 Text();
	 TextA();
	 img();
	 if(redY<0){redY+=10};
	  if(redY>$canvas.height-25){redY-=10};
	  if(redX<0){redX+=10};
	  if(redX>$canvas.width-70){redX-=10};
	  if(lives<=0){
	  	alert("Ваш счет:"+cons);
	  	document.location.reload();}

},2000/80)


document.addEventListener('keydown', (event)=>{//Назначаем обработчики кклавишам
if(event.keyCode==38){redY-=10;}
if(event.keyCode==40){redY+=10;}
if(event.keyCode==37){redX-=10;}
if(event.keyCode==39){redX+=10;}
if(event.keyCode==32){ for (var i = 0; i < bolls.length; i++) {
		const boll=bolls[i];

		if(boll.y<redY+70&&boll.y>redY) {
			line(redX,redY);
			bolls.splice(i, 1);cons+=1;}}
	}
})
document.addEventListener('keyup', (event)=>{
if(event.keyCode==38){}
if(event.keyCode==40){}})