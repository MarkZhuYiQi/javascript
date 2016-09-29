/**
 * Created by szl4zsy on 9/28/2016.
*/
//扒了个慕课网
var http=require("http");
var cheerio=require("cheerio");
var url="http://www.imooc.com/learn/637";

function filterChapters(html){
    // courseData={
    //     title:"",
    //     learningNum:"",
    //     section:[{
    //         chapterTitle:"",
    //         videos:[
    //             {
    //                 id:"",
    //                 title:""
    //             },{},{},{}
    //         ]
    //     }]
    // };
    var $=cheerio.load(html);
    var chapters=$(".mod-chapters .chapter");
    //存放整个页面内容
    var courseData=[];
    chapters.each(function(item) {
        //
        var chapter = $(this);
        //课程标题
        var courseHeadline = chapter.find(".hd").find("h2").text();
        //每个章节内容
        var section = chapter.find(".chapter");
        section.each(function (sectionData) {
            //章节标题
            var chapterHeadline = sectionData.find("strong").text();
            //章节视频相关内容
            var chapterVideo = chapter.find(".video").children('li');
            var chapterData = {
                chapterHeadline: chapterHeadline,
                videos: []
            };
            //视频相关内容循环
            chapterVideo.each(function (item) {
                //视频ID
                var id = $(this).attr("data-media-id");
                //视频标题
                var title = $(this).find(".J-media-item").text();
                chapterData.videos.push({
                    id: id,
                    title: title
                });
            });
            courseData.push(chapterData);
        });
    });
    return courseData;

    //     var chapterHeadline=chapter.find("strong").text();      //章节标题
    //     // var chapterTitle=chapter.find(".J-media-item").text();
    //     var chapterVideo=chapter.find(".video").children('li');
    //     var chapterData={
    //         chapterHeadline:chapterHeadline,
    //         // chapterTitle:chapterTitle,
    //         videos:[]
    //     };
    //     chapterVideo.each(function(item){
    //         var id=$(this).attr("data-media-id");
    //         var title=$(this).find(".J-media-item").text();
    //         chapterData.videos.push({
    //             id:id,
    //             title:title
    //         });
    //     });
    //     courseData.push(chapterData);
    // });
    // return courseData;
}
function printCourseInfo(courseData){
    courseData.forEach(function (item){
        var headLine=item.chapterHeadline;
        console.log("\t"+headLine.replace(/[\s]+/g,'')+"\n");
        item.videos.forEach(function(content){
            console.log("["+content.id+"]"+content.title.replace(/[\s]+/g,''));
        })
    });
}

http.get(url,function(response){
    var html='';
    response.on('data',function(data){
        html+=data;
    });
    response.on('end',function(){
        var courseData=filterChapters(html);
        printCourseInfo(courseData);
    });
}).on('error',function(){
    console.log("获取课程数据出错");
});



/*
//扒了个沈叔的网站
var http=require("http");
var cheerio=require("cheerio");
var url="http://www.jtthink.com/course";

http.get(url,function(response){
    var html="";
    response.setEncoding('utf8');
    response.on("data",function(data){
        html+=data;
    });
    response.on("end",function(){
        var courseData=filterChapters(html);
        printCourseInfo(courseData);
    });
}).on("error",function(){
    console.log("获取课程出错");
});
function filterChapters(html){
    var $=cheerio.load(html);
    var courses=$(".col-md-4");
    var courseData=[];
    courses.each(function(item){
        var chapter=$(this);
        var title=chapter.find('a').text().trim();  //获得每个课程标题
        var discount=chapter.find('.label-danger').text().trim();   //课题是否优惠
        var para=chapter.find("p").text().replace(/[\s]+/g,' ');
        var href=chapter.find('a').attr('href');
        chapterData={
            title:title+"\r\n",
            discount:"["+discount+"]",
            para:para+"\r\n",
            href:href+"\r\n"
        };
        courseData.push(chapterData);
    });
    return courseData;
}
function printCourseInfo(courseData){
    courseData.forEach(function(item){
        console.log(item.title+item.discount+item.para+item.href);
    });
}
*/
