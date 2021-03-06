/**
 * Created by Administrator on 2017/3/6.
 */
$(function() {

    getCategoryTitleData();

    function getCategoryTitleData() {
        //获取标题列表的数据
        $.get('http://139.199.157.195:9090/api/getcategorytitle', function(data) {
            $('.pro-list').html(template('pro-brief-tpl', data));

            //点击打开当前列表 收起其余列表 以及切换下拉箭头的背景图片
            $('.pro-brief').on('touchend', function () {
                $(this).next().slideToggle().siblings('.pro-particular').hide();
                if ($(this).hasClass('active')) {
                    $(this).removeClass('active').css({
                        background: "url('../../images/arrow2.gif') right center no-repeat"
                    });
                } else {
                    $(this).addClass('active').css({
                        background: "url('../../images/arrow1.gif') right center no-repeat"
                    });
                }


                //获取二级列表需要传入一级列表的id 所以先把1级列表的id存在它的自定义属性里
                //获取数据时 点击当前1级列表 获取自定义属性里的id 再去发送ajax请求获取数据 渲染到当前点击的列表下
                //但这么做有两个弊端 第一必须每次点击的时候都发送ajax请求
                //第二点击后返回数据时会延迟几秒 造成卡顿 不利于用户体验
                //var titleid = $(this).attr('data-id');
                //console.log(titleid);
                //$.get('http://139.199.157.195:9090/api/getcategory', {titleid: titleid}, function(data) {
                //    $('.pro-particular').html(template('pro-particular-tpl', data));
                //});
            })



                //先遍历所有数据 根据每一个数据里面的titleId去发送请求 获取该id的数据 一次性渲染到页面中

                var objData = {};
                for (var i = 0; i < data.result.length; i++) {
                    (function (titleid) {
                        $.get('http://139.199.157.195:9090/api/getcategory', {titleid: titleid}, function (data) {
                            objData[titleid] = data;
                            $('.pro-particular')[titleid].innerHTML = template('pro-particular-tpl', objData[titleid]);
                        })
                    })(data.result[i].titleId);
                }

        })
    }
})