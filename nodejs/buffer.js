/**
 * Created by szl4zsy on 9/27/2016.
 */
require('buffer');
var buffer1=new Buffer("mark");
var buffer2=new Buffer("Zhu");
var buffer3=new Buffer.concat([buffer1,buffer2]);
// console.log(buffer3.toString());
var result=buffer1.compare(buffer2);
console.log(result);