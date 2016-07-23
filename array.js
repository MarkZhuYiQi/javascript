/*
var box=Array(18,11,23);
alert(box);
var line=['mark','zhu','tsg'];
line[box.length]="jiangsu province";		//通过length增加元素
alert(line);
alert("linelength:"+line.length);
*/
/*
var arrange=[
	{
		name:'mark',
		age:28
	},
	[2,23,4,'jiangsu',new Object()],
	25+25,
	new Array(1,2,3)
];
alert('arrange:'+arrange);
alert(arrange[0].age);
*/
/*
var box=['mark',27,'programming',new Date()];
alert(box);
alert(box.toString());
alert(box.toLocaleString());
*/
/*		
//出入栈
var box=['mark',28,'asd'];
alert(box.push('programming','jiangsu'));	//返回最新长度
alert(box);
alert(box.pop());	//移除数组最后的元素，并返回移除元素
alert(box);
*/
/*
//出入队列
var box=['mark',28,'asd'];
alert(box.push('programming','jiangsu'));	//返回最新长度
alert(box);
alert(box.shift());	//移除数组第一个的元素，并返回移除元素
alert(box);
*/
/*
//排序
function compare(value1,value2){
	if(value1 < value2){
		return -1;
	}else if(value1 > value2){
		return 1;
	}else{
		return 0;
	}
}
var box=[0,1,5,10,15];
alert(box.sort(compare));
alert(box.reverse());
*/
/*
//追加
var box=['mark',28,'asd'];
var box2=box.concat('programming');
alert(box2);
*/
