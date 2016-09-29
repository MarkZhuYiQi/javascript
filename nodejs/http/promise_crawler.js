/**
 * Created by szl4zsy on 9/29/2016.
 */
var http=require("http");
// var Promise=require("bluebird");
var cheerio=require("cheerio");
var baseUrl="http://www.imooc.com/learn/";

var url="http://www.imooc.com/learn/637";
var crawlUrl="http://http://www.imooc.com/u/108492/courses?sort=publish";

// getPageAsync(url);

function filterChapters(html){
    // courseData={
    //     courseHeadline:"",
    //     learningNum:"",
    //     section:[{
    //         sectionHeadline:"",
    //         sectionVideos:[
    //             {
    //                 id:"",
    //                 chapterTitle:""
    //             },{},{},{}
    //         ]
    //     },{},{},{}]
    // };
    var $=cheerio.load(html);
    //课程标题
    var courseHeadline = $(".hd").find("h2").text().trim();
    //课程学习人数
    var learningNum=$(".statics .js-learn-num").text().trim();
    //章节内容
    var chapters=$(".mod-chapters .chapter");
    //存放整个页面内容
    var courseData={
        courseHeadline:courseHeadline,
        learningNum:learningNum,
        section:[]
    };
    //循环出几个章节内容
    chapters.each(function(item) {
        //每个章节内容
        var section = $(this);
        //章节标题
        var sectionHeadline = section.find("strong").text().trim().replace(/\s+/g,' ');
        //章节视频相关内容
        var sectionVideos = section.find(".video").children('li');
        var sectionData = {
            sectionHeadline: sectionHeadline,
            videos: []
        };
        //循环视频内容
        sectionVideos.each(function (sectionItem) {
            //视频ID
            var chapterId = $(this).attr("data-media-id");
            //视频标题
            var chapterTitle = $(this).find(".J-media-item").text().trim().replace(/\s+/g,' ');
            //把小节信息放到章节信息的video中
            sectionData.videos.push({
                chapterId: chapterId,
                chapterTitle: chapterTitle+"\n"
            });
        });
        courseData.section.push(sectionData);
    });
    return courseData;
}
function printCourseInfo(courseData){
    courseData.forEach(function(course){
        var courseHeadline=course.courseHeadline;
        var learningNum=course.learningNum;
        console.log("<<"+courseHeadline+">>");
        console.log(learningNum);
        course.section.forEach(function(videoData){
            console.log("||"+videoData.sectionHeadline+"||\n");
            videoData.videos.forEach(function(chapter){
                console.log("["+chapter.chapterId+"]"+chapter.chapterTitle+"\n");
            });
        });
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
            console.log("获取课程数据出错!");
        });
    });
}
var videoIds=[348,637];
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
        // coursesData.sort(function(a,b){
        //     return a.number<b.number;
        // });
        printCourseInfo(coursesData);
    });