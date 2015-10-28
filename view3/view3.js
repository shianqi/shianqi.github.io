"use strict";
var kee1 = "ar";
var kex = "you";
angular.module("myApp.view3", ["ngRoute"]).config(["$routeProvider", function(a) {
    a.when("/view3", {
        templateUrl: "view3/view3.html",
        controller: "View3Ctrl"
    })
}])

    .controller("View3Ctrl", ["$scope", function(a) {
    if (!document.createElement("canvas").getContext) {
        var b = document.createElement("div");
        b.id = "errorMsg";
        b.innerHTML = "Your browser doesn't support HTML5!<br/>Recommend use Chrome 14+/IE 9+/Firefox 7+/Safari 4+";
        document.body.appendChild(b);
        $("#code").css("display", "none");
        document.execCommand("stop")
    } else {}
    a.enter = function(c) {
        if (c.keyCode == 13) {
            a.show()
        }
    };
    a.show = function() {
        $("#inputText").css("display", "none");
        $("#inputSubmit").css("display", "none");
        if (a.hh == kee1 + "e " + kex + " sure?") {
            setTimeout("$('#success').css('display','block');", 88000);
            setTimeout("$('#fail').css('display','block');", 88000);
            a.showSecret = "true";
            setTimeout("$('#code').typewriter()", 0);
            setTimeout("$('#code').css('display','block')", 0)
        } else {
            a.showSecret = "true2";
            setTimeout("$('#code2').typewriter()", 0);
            setTimeout("$('#code2').css('display','block')", 0)
        }
    };
    a.refresh = function() {
        location.reload();
    };
    a.isSuccess = function() {
        var data = "flag=1";
        $.ajax({
            type: "POST",
            url: "http://www.hupeng.wang:8080/shianqi/index.php",
            data: data,
            success: function(msg) {
                location.reload();
            }
        });
    };
    a.isFail = function() {
        var data = "flag=0";
        $.ajax({
            type: "POST",
            url: "http://www.hupeng.wang:8080/shianqi/index.php",
            data: data,
            success: function(msg) {
                alert("没关系");
                location.reload();
            }
        });
    };
    a.killer1 = unescape("*%20%u5BC6%u94A5%u6B63%u786E%uFF01%uFF1A");
    a.killer2 = unescape("%20*%20%u8FD9%u662F%u4E00%u4E2A%u79C1%u4EBA%u7559%u8A00%uFF0C%u8BF7%u786E%u4FDD%u53EA%u6709%u4F60%u80FD%u770B%u5230%u6B64%u7559%u8A00%uFF1A");
    a.killer3 = unescape("*%20%u70B9%u51FB%u4E3B%u9875%u9762%u4EFB%u4F55%u533A%u57DF%u5373%u53EF%u505C%u6B62%u64AD%u653E%uFF1A");
    a.killer4 = unescape("*%20%u4EE5%u4E0B%u662F%u7559%u8A00%u5185%u5BB9%uFF1A");
    a.killer5 = unescape("*%20%u5353%uFF1A");
    a.killer6 = unescape("*%20%u6211%u5199%u8FD9%u4E2A%u7F51%u7AD9%u5C31%u662F%u6709%u4E9B%u60F3%u8BF4%u7684%u8BDD%u60F3%u548C%u4F60%u8BF4%u3002%20");
    a.killer7 = unescape("*%20%u867D%u7136%uFF0C%u6211%u4E0D%u662F%u4E00%u4E2A%u5F88%u64C5%u957F%u8868%u8FBE%u8A00%u8BED%u7684%u4EBA%u3002%20");
    a.killer8 = unescape("*%20%u4F46%u6211%u5E0C%u671B%u591A%u5E74%u540E%u56DE%u5FC6%u8D77%u6765%u5982%u4ECA%u6BCF%u4E00%u523B%u6211%u4E0D%u4F1A%u540E%u6094%u3002");
    a.killer9 = unescape("//%20%u4E5F%u8BB8%u8FD9%u6837%u5199%u5E76%u4E0D%u597D%uFF0C");
    a.killer10 = unescape("//%20%u4F46%u6B64%u523B%uFF0C%u5374%u80FD%u4EE3%u8868%u6211%u60F3%u8BF4%u7684%u3002");
    a.killer11 = unescape("//%20%u8BA4%u8BC6%u4F60%u4E24%u5E74%u7684%u65F6%u95F4%u91CC");
    a.killer12 = unescape("//%20%u6211%u628A%u4F60%u7684%u7B11%u5BB9%u7C98%u8D34%u5728%u65E5%u8BB0%u91CC%uFF0C%u8BA9%u56FE%u7247%u628A%u4F60%u7684%u6D3B%u6CFC%u8BB0%u5FC6%u3002");
    a.killer13 = unescape("//%20%u5F53%u6211%u51DD%u89C6%u4F60%u7684%u773C%uFF0C%u5F53%u6211%u542C%u5230%u4F60%u7684%u58F0%u97F3%u3002%20");
    a.killer14 = unescape("//%20%u5F53%u6211%u95FB%u5230%u4F60%u79C0%u53D1%u4E0A%u6DE1%u6DE1%u7684%u6E05%u9999%u3002%20");
    a.killer15 = unescape("%u6211%u7231%u4F60%3B");
    a.killer16 = unescape("//%u5F53%u6211%u611F%u53D7%u5230%u6211%u5267%u70C8%u7684%u5FC3%u8DF3%uFF0C%u6211%u660E%u767D%u4E86%uFF1A");
    a.killer17 = unescape("%u6211%u60F3%u4F60%3B");
    a.killer18 = unescape("//%20%u4F60%u5728%u6211%u5FC3%u4E2D%u6700%u7F8E%u3002%20");
    a.killer19 = unescape("%u6211%u60F3%u7167%u987E%u4F60%20");
    a.killer20 = unescape("//%20%u4F60%u662F%u6211%u4ECA%u751F%u7684%u552F%u4E00%uFF01");
    a.killer21 = unescape("//%20%u6240%u4EE5%u6211%u7EE7%u7EED%u7B49%u5F85%uFF0C%u6211%u6709%u4FE1%u5FC3%uFF0C%u4F60%u4F1A%u3002");
    a.killer22 = unescape("%u7231%u4F60");
    a.killer23 = unescape("//%20%u6211%u8BA4%u4E3A%u8FD9%u662F%u4E00%u4E2A%u91CD%u8981%u7684%u51B3%u5B9A%u3002");
    a.killer24 = unescape("//%20%u4F60%u53EF%u4EE5%u5728%u4EFB%u4F55%u65F6%u5019%u51B3%u5B9A%u3002");
    a.killer25 = unescape("%u6211%u975E%u5E38%u9AD8%u5174%u80FD%u591F%u9047%u5230%u4F60");
    a.killer26 = unescape("%u60F3%u4F60")
}]);