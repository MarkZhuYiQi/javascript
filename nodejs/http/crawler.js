/**
 * Created by szl4zsy on 9/28/2016.
*/
//扒了个慕课网
var http=require("http");
var queryString=require("querystring");
var cheerio=require("cheerio");
var baseUrl="http://www.imooc.com/learn/";
var url="http://www.imooc.com/learn/637";
function getMembers(){
    var getData=queryString.stringify({
        'ids':'637'
    });
    var options={
        hostname:'www.imooc.com',
        port:80,
        path:'/course/AjaxCourseMembers?'+getData,
        method:'GET',
        headers:{
            'Accept':'application/json, text/javascript, */*; q=0.01',
            'Accept-Encoding':'gzip, deflate, sdch',
            'Accept-Language':'zh-CN,zh;q=0.8',
            'Cache-Control':'max-age=0',
            'Connection':'keep-alive',
            'Cookie':'imooc_uuid=9eff7d4f-4b62-4c65-8630-c5b639205abc; imooc_isnew_ct=1464783875; loginstate=1; apsid=Q1ODg2N2FkM2ZkOWUzOTNhYTgwZTE3ZGU0ZTFhMDYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjU1MDk3OAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB6aHV5aXFpXzAyNkAxNjMuY29tAAAAAAAAAAAAAAAAAGQxMTk0ODBiNzhjMzhjZDBjZTc0MjYyNzU3ZTI4NzBhnS7pV50u6Vc%3DYW; last_login_username=zhuyiqi_026%40163.com; PHPSESSID=gekl8co7n0v5t25400d3c3l0u4; jwplayer.qualityLabel=è¶æ¸; imooc_isnew=2; cvde=57ed218f53323-5; IMCDNS=0',
            'Host':'www.imooc.com',
            'Referer':'http://www.imooc.com/learn/637',
            'User-Agent':'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.101 Safari/537.36',
            'X-Requested-With':'XMLHttpRequest'
        }
    };
    var req=http.request(options,function(res){
        // console.log('STATUS:'+res.statusCode);
        // console.log('headers:'+JSON.stringify(res.headers));
        res.on('data',function(chunk){
            // console.log(Buffer.isBuffer(chunk));
            // console.log(typeof chunk);
            var str=JSON.parse(chunk.toString('utf8'));
            var member=str.data[0].numbers;
            back(member);
        });
        res.on('end',function(){
            // console.log('获取完毕');
        });
    });
    req.on('error',function(e){
        console.log('problems with request:'+e.message);
    });
    req.end();
}
getMembers();


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
    var courseHeadline=courseData.courseHeadline;
    var learningNum=courseData.learningNum;
    console.log(courseHeadline);
    console.log(learningNum);
    courseData.section.forEach(function(videoData){
        console.log(videoData.sectionHeadline+"\n");
        videoData.videos.forEach(function(chapter){
            console.log("["+chapter.chapterId+"]"+chapter.chapterTitle+"\n");
        });
    });
}

http.get(url,function(response){
    var html='';
    response.on('data',function(data){
        html+=data;
    });
    response.on('end',function(){
        // var courseData=filterChapters(html);
        // printCourseInfo(courseData);
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
