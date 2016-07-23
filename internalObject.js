//alert(Math.random());//产生（0，1）之间但不包括0,1的数字
for(var i=0;i<10;i++){
	document.write(select(5,10));	//10+5-1=14 6+5-1=10-》5-10
	document.write('<br />');
}
function select(start,end){
	var total=end-start+1;
	return Math.floor(Math.random()*total+start);
}