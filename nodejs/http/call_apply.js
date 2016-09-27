/**
 * Created by Administrator on 2016/9/27.
 */
var pet={
    words:'...',
    speak:function(say){
        console.log(say+' '+this.words);
    }
};
// pet.speak('speak');
var dog={
    words:'wang'
};
pet.speak.call(dog,'speak');    //改变上下文，现在this指向dog