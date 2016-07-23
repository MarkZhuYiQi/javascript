var i=20;
if(i>25){
	alert("if:greate than 25.");
}else if(i<0){
	alert("if:less than 0.");
}else{
	alert("if:between 0 and 25, inclusive.");
}

var j=0;
do{
	j+=2;
}while(j<10);
alert("do while:"+j);

var k=0;
while(k<12){
	k+=2;
}
alert("while:"+k);

var count=3;
for(i=0;i<count;i++){
	if(i==2){
		break;
	}
	alert("count:"+i);
}

for(var propName in window){
	document.write(propName)+"<BR />";
}