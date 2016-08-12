/**
 * Created by Administrator on 2016/8/12.
 */
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
                    break;
                case "checkbox":
                    if(!filed.selected)break;
                case "select-one":

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