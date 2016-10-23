 var app = angular.module('myApp',['ngRoute']);

//运行块在注入器创建之后被执行，它是所有AngularJS应用中第一个被执行的方法。运行块通常用来注册全局的事件监听器。例如，我们会在.run()块中设置路由事件的监听器以及过滤未经授权的请求。
app.run(function(){
    (function(doc, win) {
        var docEl = doc.documentElement;
        resize = function() {
            var clientWidth = docEl.clientWidth;
            docEl.style.fontSize = 100 * (clientWidth / 320) + 'px';
        }
        win.addEventListener('resize', resize);
        win.addEventListener('DOMContentLoaded', resize);
    })(document, window);
})


//路由
app.config(['$routeProvider',function($routeProvider){
    $routeProvider.when('/head',{
        templateUrl:'template/head.html',
        controller:'indexCtrl'
    })
    .when('/detail',{
        templateUrl:'template/detail.html',
        controller:'detailCtrl'
    })

    .otherwise({
        redirectTo:'/head'
    })
}])

//index控制器
app.controller('indexCtrl', ['$scope','$http','swip', function($scope,$http,swip){
    //启动轮播图
    swip.swiper();
    $scope.name = 'kiven';
    $http.jsonp('js/res.php',{
        params:{
            url:'https://api.douban.com/v2/movie/in_theaters',
            callback:'JSON_CALLBACK'
        }
    }).success(function(data){
        // console.log(data);
        $scope.arrs = data.subjects; //得到电影的数组
    })
}])

//头部的组件
app.directive('headtop',function($http,road){
    return {
        templateUrl:'template/headtop.html',
        link:function(scope,ele,attr){
            // var oli = document.querySelectorAll('.toplist li');
            var oli = $(".toplist>li");
            // console.log(oli)
            oli.on('tap',function(){
                var inner = this.innerHTML;
                oli.attr('class','');
                this.setAttribute('class','active');
                $http.jsonp('js/res.php',{
                    params:{
                        url:road[inner],
                        callback:'JSON_CALLBACK'
                    }
                }).success(function(data){
                    console.log(data.subjects)
                    scope.arrs = data.subjects; //得到电影的数组
                })
            })
        }
    }
})

//导航组件
app.directive('nav',function($http){
    return {
        templateUrl:'template/nav.html',
    }
})

//页面内容
app.directive('cont',function(){
    return {
        templateUrl:'template/cont.html',
    }
})


//创建一个服务   轮播图滑动的插件
app.service("swip",function(){
    return {
        swiper:function(){
            var myswiper = new Swiper('.swiper-container', {
                // direction: 'vertical',  // 一个垂直方向的
                loop: true,             // 一个循环的滑动
                pagination: '.swiper-pagination',  // 分页器
                prevButton: '.swiper-button-prev',
                autoplay: '2000'
            });
        }
    }
})


app.service('road', function(){
    return {
        热门电影:'https://api.douban.com/v2/movie/in_theaters',
        电影推荐:'https://api.douban.com/v2/movie/top250',
        电影查询:"'https://api.douban.com/v2/movie/search?q='+ self.data.inputVal",
    }
})