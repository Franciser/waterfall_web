/* eslint-disable */
import './index.less';

window.onload=function(){
    var wrap=document.querySelector('.wrap');
    var searchBar = document.querySelector('.header_search_wrap>input')
    var loginBox = document.querySelector('.header_loginBox')
    var closeBtn = loginBox.querySelector('.closeBox')
    var loginBtn = document.querySelector('.header_login_wrap')
    var tabTxts = document.querySelectorAll('.tab_txt>ul>a')
    var tabLine = document.querySelector('.tab_txt>ul>span');
    var carousel_wrap = document.querySelector(".carousel_wrap")
    var carousel = document.querySelector(".carousel")
    var carousel_items = document.querySelectorAll(".carousel_item")
    var carousel_control = document.querySelector(".carousel_control");
    var carousel_points = carousel_control.children;
    var arrLeft = document.querySelector('.arrLeft')
    var arrRight = document.querySelector('.arrRight')
    var returnTopBtn = document.querySelector('.wrap>.returnTop')

    //得到滚动条的宽度，在模态框显示时给文档右边加一个滚动条的间隔；
    var scrollWidth = window.innerWidth - document.documentElement.clientWidth;

    //得到每个图片块集合
    var waterfallItems = document.getElementsByClassName('waterfall_item');
    //得到瀑布流大容器
    var waterfallContent = document.getElementById('waterfallBox');
    //得到每个瀑布流图片块的宽度
    var waterfallWidth = waterfallItems[0].clientWidth;
    //得到瀑布流大容器的宽度
    // var waterfallContentWidth = waterfallContent.clientWidth;
    //让瀑布流大容器宽度等于屏幕宽度
    var waterfallContentWidth = window.innerWidth;
    // console.log(document.documentElement.clientWidth)
    //宽度大于1380时为1400，否则为1120
    if (waterfallContentWidth > 1380) {
        waterfallContentWidth = 1400;
    }
    else{
        waterfallContentWidth = 1120;
    }
    
    //定义一个值，用于判断瀑布流函数里是否是新追加的图片块
    var startNumber = 0;
    var data = '';
    var json = [
        {
            "src": require("../../img/1.jpg"),
            "title": "极简扁平设计"
        },
        {
            "src": require("../../img/2.jpg"),
            "title": "极简扁平设计"
        },
        {
            "src": require("../../img/3.jpg"),
            "title": "极简扁平设计"
        },
        {
            "src": require("../../img/4.jpg"),
            "title": "极简扁平设计"
        },
        {
            "src": require("../../img/5.jpg"),
            "title": "极简扁平设计"
        },
        {
            "src": require("../../img/6.jpg"),
            "title": "极简扁平设计"
        },
        {
            "src": require("../../img/7.jpg"),
            "title": "极简扁平设计"
        },
        {
            "src": require("../../img/8.jpg"),
            "title": "极简扁平设计"
        },
        {
            "src": require("../../img/9.jpg"),
            "title": "极简扁平设计"
        },
        {
            "src": require("../../img/10.jpg"),
            "title": "极简扁平设计"
        },

    ]

    
    
    init_fn();
    returnTop();
    carousel_fn();
    //瀑布流函数
    waterfall_fn();
    
    function init_fn(){
        //搜索条获得焦点
        searchBar.addEventListener('focus', function () {
            this.style.width = '200px';
        })

        searchBar.addEventListener('blur', function () {
            this.style.width = '150px';
        })

        //点击登录弹出登录框
        loginBtn.addEventListener('click', function () {
            loginBox.style.display = 'block';
            document.body.style.overflow = 'hidden';
            wrap.style.marginRight = scrollWidth+ "px";
        })
        closeBtn.addEventListener('click', function () {
            loginBox.style.display = 'none';
            document.body.style.overflow = 'auto';
            wrap.style.marginRight = 0 + "px";
        })

        //主体导航点击切换
        for (var i = 0; i < tabTxts.length; i++) {
            (function (i) {
                tabTxts[i].addEventListener('click', function (e) {
                    tabLine.style.left = i * 80 + 'px';

                })
            })(i)
        }
    }

    function returnTop() {
        var timerInterval = null;
        var scrollValue = 0;
        window.addEventListener('scroll',function(){
            if(document.documentElement.scrollTop>100){
                returnTopBtn.classList.add('returnTop_active');
            }else{
                returnTopBtn.classList.remove('returnTop_active');
            }
        })
        returnTopBtn.addEventListener('click', function () {
            clearInterval(timerInterval)
            var scrollTop = document.documentElement.scrollTop;
            scrollValue = scrollTop;
            if (scrollTop > 100) {
                timerInterval = setInterval(function () {
                    scrollValue -= Math.ceil(scrollValue / 10);
                    if (scrollValue <= 0) {
                        scrollValue = 0;
                        clearInterval(timerInterval)
                    }
                    document.documentElement.scrollTop = scrollValue;

                }, 10)

            }
        })
    }


    function carousel_fn(){
        var length = carousel_items.length;
        var timer = null;
        var key = 1;
        var isOver = true;
        //初始化第一个小圆点状态
        setPointsState(1)

        //鼠标移入清除定时器
        carousel.addEventListener('mouseenter', function () {
            clearInterval(timer)
            //让左右箭头显示
            arrLeft.classList.add('arr_active')
            arrRight.classList.add('arr_active')
        })

        //鼠标离开重启定时器
        carousel.addEventListener('mouseleave', function () {
            //让左右箭头隐藏
            arrLeft.classList.remove('arr_active')
            arrRight.classList.remove('arr_active')
            timer = setInterval(function () {
                key++;
                carouselFn(key)
                setPointsState(key)
                if (key === length - 1) {
                    setTimeout(function () {
                        key = 1
                    }, 500)
                }

            }, 2000)
        })
        //执行点击箭头执行的函数
        clickArrows()
        //执行点击小圆点执行的函数
        clickPoints();

        function clickArrows() {
            arrLeft.addEventListener('click', function () {
                if (isOver) {
                    isOver = false;
                    key--;
                    setTimeout(function () {
                        if (key === 0) {
                            key = length - 2
                        }
                    }, 500)
                    carouselFn(key)
                    setPointsState(key)
                }
            })
            arrRight.addEventListener('click', function () {
                if (isOver) {
                    isOver = false;
                    key++;
                    setTimeout(function () {
                        if (key === length - 1) {
                            key = 1
                        }
                    }, 500)
                    carouselFn(key)
                    setPointsState(key)
                }

            })
        }

        function clickPoints() {
            for (var i = 0; i < carousel_points.length; i++) {
                (function (i) {
                    carousel_points[i].addEventListener('click', function () {
                        key = i + 1;
                        carouselFn(i + 1)
                        setPointsState(i + 1)
                    });
                })(i)

            }
        }

        //开启定时器
        timer = setInterval(function () {
            key++;
            carouselFn(key)
            setPointsState(key)

            if (key === length - 1) {
                setTimeout(function () {
                    key = 1
                }, 500)
            }

        }, 2000)

        function carouselFn(key) {
            // console.log(key)
            carousel_wrap.style.transition = ".5s ease-in-out"
            carousel_wrap.style.transform = "translateX(-" + key * 100 / length + "%)"
            if (key === length - 1) {
                setTimeout(function () {
                    carousel_wrap.style.transition = "none"
                    carousel_wrap.style.transform = "translateX(-" + 100 / length + "%)";
                }, 500)

            }

            if (key === 0) {
                setTimeout(function () {
                    carousel_wrap.style.transition = "none"
                    carousel_wrap.style.transform = "translateX(" + (-(length - 2) * (100 / length)) + "%)";
                }, 500)
            }
            //500毫秒过后确认动画执行完
            setTimeout(function () {
                isOver = true;
            }, 500)
        }

        function setPointsState(key) {
            var key = key - 1;
            if (key === length - 2) {
                key = 0;
            }
            else if (key === -1) {
                key = length - 3;
            }
            for (var i = 0; i < carousel_points.length; i++) {
                carousel_points[i].classList.remove('controlAnimate')
            }
            carousel_points[key].classList.add('controlAnimate')
        }
    }

    //缩放窗口大小时调整瀑布流宽度和排列
    window.addEventListener('resize',function(){
        // console.log(window.innerWidth)
        // console.log(document.documentElement.offsetWidth)
        if (window.innerWidth > 1380) {
            waterfallContentWidth = 1400;
        }
        else{
            waterfallContentWidth = 1120;
        }
        waterfall_fn(true);
    })

    function waterfall_fn(needInit=false) {
        var waterfallLength = Math.floor(waterfallContentWidth / waterfallWidth);
        // console.log(waterfallContentWidth)
        // console.log(waterfallLength)
        waterfallContent.style.width = waterfallLength * waterfallWidth + 'px';
        var heightArr = [];
        var mostHeight = 0;
        var mostHeightArr = [];
        for (var i = 0; i < waterfallItems.length; i++) {


            if (i < waterfallLength) {
                waterfallItems[i].style.position = 'absolute'
                waterfallItems[i].style.left = waterfallWidth*i + 'px'
                waterfallItems[i].style.top = 0 + 'px'
                heightArr.push(waterfallItems[i].offsetHeight)
            } else {
                //得到数组中最小高度
                var minHeight = Math.min.apply(null, heightArr);
                //调用求符合条件的值的函数来得到最小高度的这个盒子对应的索引
                var minIndex = getIndex(minHeight, heightArr);
                //得到最小高度盒子的左边的位置
                var minLeft = waterfallWidth * minIndex

                if(needInit){
                    waterfallItems[i].style.position = 'absolute'
                    waterfallItems[i].style.left = minLeft + 'px'
                    waterfallItems[i].style.top = minHeight + 'px'
                    // waterfallItems[i].style.opacity = '0';
                    var that = waterfallItems[i];
                    //开一个闭包将当前对象传入定时器，实现透明度渐入
                    (function (that) {
                        setTimeout(function () {
                            that.style.transition = 'opacity 1s linear,transform .3s ease-in-out';
                            that.style.opacity = '1';
                        }, 200)

                    })(that)
                    startNumber = i;
                }
                else{
                    if (startNumber < i) {
                        waterfallItems[i].style.position = 'absolute'
                        waterfallItems[i].style.left = minLeft + 'px'
                        waterfallItems[i].style.top = minHeight + 'px'
                        waterfallItems[i].style.opacity = '0';
                        var that = waterfallItems[i];
                        //开一个闭包将当前对象传入定时器，实现透明度渐入
                        (function (that) {
                            setTimeout(function () {
                                that.style.transition = 'opacity 1s linear,transform .3s ease-in-out';
                                that.style.opacity = '1';
                            }, 200)

                        })(that)
                        startNumber = i;
                    }
                }
                
                //让数组中最小高度变为加上下一个高度后的值
                // heightArr[minIndex] += itemHeight;
                heightArr[minIndex] += waterfallItems[i].offsetHeight;
                //把当前的距离大容器顶部的距离和自身高度相加然后放进数组；
                mostHeightArr.push(waterfallItems[i].offsetTop + waterfallItems[i].offsetHeight)
                //从数组中找到最大值赋值给mostHeight（第二次开始每次和上一次的最大值做比对）;
                mostHeight = Math.max.apply(null, mostHeightArr)
                //然后清空数组
                mostHeightArr = [];
                //然后再把最大值放进数组
                mostHeightArr.push(mostHeight)
                // console.log(mostHeightArr)

            }
        }

        // waterfallContent.style.height = mostHeight + Math.min.apply(null, heightArr) + 'px';
        waterfallContent.style.height = mostHeight + 'px';
        // console.log(heightArr)



        function getIndex(minHeight, heightArr) {

            for (var i = 0; i < heightArr.length; i++) {
                if (heightArr[i] === minHeight) {
                    return i
                }
            }

        }
    }

    function getScrollTop() {
        //获得瀑布流大容器距离文档顶部的距离再加上自身的高度
        var lastWaterfallTop = waterfallContent.offsetTop + waterfallContent.offsetHeight;
        var scrollTop = document.documentElement.scrollTop;
        var clientHeight = document.documentElement.clientHeight;

        if (scrollTop + clientHeight >= lastWaterfallTop) {
            return true;
        } else {
            return false;
        }
        // console.log(scrollTop+clientHeight)
        // console.log(lastWaterfallTop)
    }

    function forData() {
        for (var i = 0; i < json.length; i++) {
            data += '<div class="waterfall_item"><div class="waterfall_wrap"><a href="javascript:;" class="img_link"><img src=' + json[i].src + ' alt=""></a><div><span>' + json[i].title + '</span><a href="javascript:;"><i class="iconfont icon-icon--"></i></a></div></div></div>'
        }

        waterfallContent.innerHTML += data;
        data = '';
        waterfall_fn();

    }

    var timerOut = null;
    window.addEventListener('scroll', function () {
        clearTimeout(timerOut)
        if (getScrollTop()) {
            timerOut = setTimeout(function () {
                forData()

            }, 400)
        }
    })

}