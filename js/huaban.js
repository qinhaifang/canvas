$(function(){
    var box=$(".box");
    var copy=$(".copy");
    var canvas=$("canvas");
    var cobj=canvas[0].getContext("2d");
    //画板的大小
    canvas.attr({
        width:copy.width(),
        height:copy.height()
    })

   $(".title-t").hover(function(){
       $(this).find(".title-block").finish();
       $(this).find(".title-block").slideDown();
   },function(){
       $(this).find(".title-block").finish();
       $(this).find(".title-block").slideUp();
   })

    var obj= new shape(copy[0],canvas[0],cobj,$(".xp"),$(".selectarea"));
    //画图类型
    $(".shapes li").click(function(){
        if($(this).attr("data-role")!=="pen"){
            obj.shapes=$(this).attr("data-role");
            obj.draw();
        }else{
            obj.pen();
        }
    })
//画图的方式
    $(".type li").click(function(){
        obj.type=$(this).attr("data-role");
        obj.draw();
    })
//线条粗细
    $(".lineWidth li").click(function(){
        obj.lineWidth=$(this).attr("data-role");
        obj.draw();
    })
//  边框颜色
    $(".lineColor input").change(function(){
        obj.borderColor=$(this).val();
        obj.draw();
    })
//  背景颜色
    $(".fillColor input").change(function(){
        obj.fillColor=$(this).val();
        obj.draw();
    })
//    橡皮
$(".xpsize li").click(function(){
    var w=$(this).attr("data-role");
    var h=$(this).attr("data-role");
    obj.xp($(".xp"),w,h);
})
//    选择
    $(".select").click(function(){
        obj.select($(".selectarea"));
    })
    /*file*/
    $(".file li").click(function(){
        var index=$(this).index(".file li");
        if(index==0){
            if(obj.history.length>0){
                var yes=window.confirm("是否要保存");
                if(yes){
                    location.href=(canvas[0].toDataURL().replace("data:image/png","data:stream/octet"));
                }
            }
            obj.history=[];
            cobj.clearRect(0,0,canvas[0].width,canvas[0].height);
        }else if(index==1){
            cobj.clearRect(0,0,canvas[0].width,canvas[0].height);
            if(obj.history.length==0){
                alert("不能后退");
                return ;
            }
            var data=obj.history.pop();
            cobj.putImageData(data,0,0);

        }else if(index==2){
            location.href=(canvas[0].toDataURL().replace("data:image/png","data:stream/octet"));
        }
    })



})
