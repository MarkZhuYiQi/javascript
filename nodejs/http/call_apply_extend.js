/**
 * Created by Administrator on 2016/9/27.
 */
function Pet(words){
    this.words=words;
    this.speak=function(){
        console.log(this.words);
    }
}
function Dog(words){
    Pet.call(this,words);
}
var dog=new Dog('wang');
dog.speak();