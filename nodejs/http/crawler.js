/**
 * Created by szl4zsy on 9/28/2016.
 */
var http=require("http");
var cheerio=require("cheerio");
var url="http://www.imooc.com/learn/637";

function filterChapters(html){
    var $=cheerio.load(html);
    var chapters=$(".chapter");
    var courseData=[];
    chapters.each(function(item){
        var chapter=$(this);
        var chapterHeadline=chapter.find("strong").text();      //章节标题
        // var chapterTitle=chapter.find(".J-media-item").text();
        var chapterVideo=chapter.find(".video").children('li');
        var chapterData={
            chapterHeadline:chapterHeadline,
            // chapterTitle:chapterTitle,
            videos:[]
        };
        chapterVideo.each(function(item){
            var id=$(this).attr("data-media-id");
            var title=$(this).find(".J-media-item").text();
            chapterData.videos.push({
                id:id,
                title:title
            });
        });
        courseData.push(chapterData);
    });
    return courseData;
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