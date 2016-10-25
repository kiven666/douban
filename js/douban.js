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
    .when('/recommend',{
        templateUrl:'template/recommend.html',
        controller:'recomCtrl'
    })
    .when('/detail/:id',{
        templateUrl:'template/detail.html',
        controller:'detailCtrl'
    })
    .when('/search',{
        templateUrl:'template/search.html',
        controller:'searchCtrl'
    })

    .otherwise({
        redirectTo:'/head'
    })
}])

//index控制器
app.controller('indexCtrl', ['$scope','$http', function($scope,$http){
    $scope.boole = true;
    $scope.name = 'kiven';
    $http.jsonp('js/res.php',{
        params:{
            url:'https://api.douban.com/v2/movie/in_theaters',
            callback:'JSON_CALLBACK'
        }
    }).success(function(data){
        // console.log(data);
        $scope.arrs = data.subjects; //得到电影的数组
        $scope.boole = !$scope.boole;
    })
}])


//recommend控制器
app.controller('recomCtrl', ['$scope','$http', function($scope,$http){
    $scope.boole = true;
    $http.jsonp('js/res.php',{
        params:{
            url:'https://api.douban.com/v2/movie/top250',
            callback:'JSON_CALLBACK'
        }
    }).success(function(data){
        // console.log(data);
        $scope.arrs = data.subjects; //得到电影的数组
        $scope.boole = !$scope.boole;
    })
}])



//search控制器
app.controller('searchCtrl', ['$scope','$http', function($scope,$http){
    $scope.insert = '';
    $scope.boole = true;
    $scope.startSearch = function(){
        if($scope.insert == ''){
            alert('请输入搜索内容');
        }else{
            $http.jsonp('js/search.php',{
                params:{
                   num:$scope.insert,
                   callback:'JSON_CALLBACK'
                }
            }).success(function(data){
                // console.log(data);
                $scope.arrs = data.subjects;
                $scope.boole = !$scope.boole;
                console.log($scope.arrs);
            })
        }
    }
    
}])

//detailCtrl控制器

app.controller('detailCtrl', ['$scope','$http','$routeParams',function($scope,$http,$routeParams){
    $scope.boole = true;
    $http.jsonp('js/detail.php',{
        params:{
            id:$routeParams.id,
            callback:'JSON_CALLBACK'
        }
    }).success(function(data){
        console.log(data);
        $scope.msg = data;
        $scope.act = data.casts;
        $scope.boole = !$scope.boole;
        // console.log(data.casts)
    })
}])



//头部的组件
app.directive('headtop',function($http,$window){
    return {
        templateUrl:'template/headtop.html',
        link:function(scope,ele,attr){
            var allA = ele.find('a');
            allA.on('tap',function(){
                allA.removeClass('active');
                $(this).addClass('active');
            })
        }
    }
})

//导航组件
app.directive('nav',function($http){
    return {
        templateUrl:'template/nav.html',
        link:function(scope,ele,attr){
            var myswiper = new Swiper('.swiper-container', {
                // direction: 'vertical',  // 一个垂直方向的
                loop: true,             // 一个循环的滑动
                pagination: '.swiper-pagination',  // 分页器
                // prevButton: '.swiper-button-prev',
                autoplay: '2000'
            });
        }
    }
})

//加载的动画
app.directive('load',function(){
    return {
        templateUrl:'template/load.html'
    }
})


//页面内容
app.directive('cont',function($window,$routeParams){
    return {
        templateUrl:'template/cont.html',
        link:function(scope,ele,attr){
            scope.goDetail = function(id){
                $window.location.href = '#/detail/' + id;
            }
        }
    }
})

