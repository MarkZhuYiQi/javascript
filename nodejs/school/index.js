/**
 * Created by szl4zsy on 9/27/2016.
 */
var klass=require("./klass");

exports.add=function(klasses){
    klasses.forEach(function(item,index){
        var _klass=item;
        var teacherName=item.teacherName;
        var students=item.students;
        klass.add(teacherName,students);
    });
};
