/**
 * Created by szl4zsy on 9/29/2016.
 */
var http=require("http");
// var Promise=require("bluebird");
var cheerio=require("cheerio");
var baseUrl="http://www.imooc.com/learn/";

var url="http://www.imooc.com/learn/637";

// getPageAsync(url);

function filterChapters(html){
    // courseData={
    //     title:"",
    //     learningNum:"",
    //     videos:[{
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
    var chapters=$(".chapter");
    var courseData=[];
    chapters.each(function(item){
        var chapter=$(this);
        //课程标题
        var courseHeadline=chapter.find(".1").text().trim();
        var chapterHeadline=chapter.find("strong").text().trim();      //章节标题
        var learningNum=chapter.find(".js-learn-num").text().trim();    //学习人数
        //每个li中包含每个小节的信息
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
            console.log("["+content.id+"]"+content.title.replace(/[\s]+/g,' '));
        })
    });
}

function getPageAsync(url){
    return new Promise(function(resolve,reject){
        console.log("正在爬取"+url);
        http.get(url,function(response){
            var html='';
            response.on('data',function(data){
                html+=data;
            });
            response.on('end',function(){
                resolve(html);
                // var courseData=filterChapters(html);
                // printCourseInfo(courseData);
            });
        }).on('error',function(e){
            reject(e);
            console.log("获取课程数据出错");
        });
    });
}

var fetchCourseArr=[];
videoIds.forEach(function(id){
    fetchCourseArr.push(getPageAsync(baseUrl+id));      //依次获取各个页面的html数据
});

Promise
    .all(fetchCourseArr)
    .then(function(pages){
        var coursesData=[];
        pages.forEach(function(html){
            var courses=filterChapters(html);           //依次处理每个课程的HTML数据
            coursesData.push(courses);
        });
    });