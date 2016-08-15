/**
 * Created by Administrator on 2016/8/12.
 */

//序列化post值
$().extend("serialize",function(){
    for(var k=0;k<this.elements.length;k++){
        var form=this.elements[k];
        var parts={};
        for(var i=0;i<form.elements.length;i++){
            var filed=form.elements[i];
            switch(filed.type){
                case undefined:
                    break;
                case "submit":
                    break;
                case "button":
                    break;
                case "reset":
                    break;
                case "file":
                    break;
                case "radio":
                case "checkbox":
                    if(!filed.selected)break;
                case "select-one":
                    //什么都不写会直接跟给下面一样执行最新的
                case "select-multiple":
                    for(var j=0;j<filed.options.length;j++){
                        var option=filed.options[j];
                        if(option.selected){
                            var optValue="";
                            if(option.hasAttribute){
                                optValue=(option.hasAttribute("value")?option.value:option.text);
                            }else{
                                optValue=(option.attribute("value").specified)?option.value:option.text;
                            }
                            parts[filed.name]=optValue;    //或者option.text
                        }
                    }
                    break;
                default:
                    parts[filed.name]=filed.value;
            }
        }
        return parts;
    }
    return this;
});