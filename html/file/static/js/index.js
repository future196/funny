var agent = '/api';  // 用于跨域代理名称转化
			
			new Vue({
				el: '#vue',
				data: {
					xuwei: '测试数据',
					classification: [],
					banner: [],
					hotScenery: [],
					nearbyScenery: [],
					banner_index: 0,
				},
				created: function(){
					let that = this;
					
					// 查询分类类型
					$.post(agent+"/lsmsManager/classification/queryForPage",
						{},
						function(data,status){
							var data = data.filter(function(val, index){
								return index < 4;
							})
							that.classification = data;
						  
					});
					
					// 查询轮播图数据
					$.post(agent+"/lsmsManager/productPlayPicture/queryProductPlayPictureShowHome",
						{},
						function(data,status){
							that.banner = data.map(function(value, index){
								value.picture = '/api/imgaes/'+value.picture.substring(0,value.picture.length - 1);
								console.log(value.picture)
								return value;
							});
						}

					);
					
					// 查询推荐/如:周边热点 - 超值热销 
					$.post(agent+"/lsmsManager/product/queryProductInfoByPiPushStatus",
						{
							pi_push_status: 1,	// 1为超值热销，2为热点周边景点， 0为未推荐
						},
						function(data,status){
							that.hotScenery = data.map(function(value, index){
								value.pi_picture = agent+'/imgaes/'+value.pi_picture.substring(0,value.pi_picture.length - 1);
								return value;
							});
						}
					);
					
					// 查询推荐/如:周边热点 - 热点周边景点
					$.post(agent+"/lsmsManager/product/queryProductInfoByPiPushStatus",
						{
							pi_push_status: 2,	// 1为超值热销，2为热点周边景点， 0为未推荐
						},
						function(data,status){
							that.nearbyScenery = data.map(function(value, index){
								value.pi_picture = agent+'/imgaes/'+value.pi_picture.substring(0,value.pi_picture.length - 1);
								return value;
							});
						}
					);
						
				},
				methods: {
					searchProduce: function(){
						var key = $('#key').val();
						if(key == ''){
							alert('请输入关键字');
							return false;
						}
						location.href='category.html?key='+key;
					}
				},
				mounted: function(){
					let that = this;
					
					$.getScript("static/js/siema.min.js",function(){   //加载test.js,成功后，并执行回调函数  
						var mySiema = new Siema({ //下面要用到Siema，就要声明为全局变量
							loop: true,
						});
						setInterval(function(){
							mySiema.next();
							that.banner_index = mySiema.currentSlide;
						}, 3000);
						
						setInterval(function(){
							that.banner_index = mySiema.currentSlide;
						}, 100);
					
						
						$('.banner-spot span').click(function(e){
							var index = $(".banner-spot span").index($(this))
							mySiema.goTo(index);
							that.banner_index = index;
						})
					 });  
					 
					 
			
				}
			});
			
			$(function() {
				$('.tab-classify-ctrl li').click(function() {
					var i = $(this).index();
					$(this).addClass('sel').siblings().removeClass('sel');
					$(this).parents('.tab-classify').find('.tab-classify-item').hide();
					$(this).parents('.tab-classify').find('.tab-classify-item').eq(i).show();
				});
				imgClip(".hot-list .img", 2);
				imgClip(".hot-list.single .img", 2);
				imgClip(".banner .sw-item", 2);
			
				//img-clip
				function imgClip(e, s) {
					var w = $(e).width();
					var h = parseInt(w / s);
					$(e).each(function() {
						$(this).css("height", h);
						var ih = $(this).find("img").height();
						if (ih < h) {
							$(this).find("img").css("height", "100%")
						}
					});
				};
			
				$('.menu-bar .more-ctrl').click(function() {
					menuBarShow();
				});
				$('.menu-bar-more .more-hide').click(function() {
					menuBarHide();
				});
				$('.menu-bar-more .menu-bar-mask').click(function() {
					menuBarHide();
				});
			
				function menuBarShow() {
					$('.menu-bar-mask').fadeIn('fast');
					$('.menu-bar-more').addClass('in');
					$('body').addClass('disable');
				}
			
				function menuBarHide() {
					$('.menu-bar-mask').fadeOut('fast');
					$('.menu-bar-more').removeClass('in');
					$('body').removeClass('disable');
				}
			
				$('.infomation-history-ctrl').click(function() {
					popupWrapShow('.infomation-history-wrap');
				});
				$('.popup-wrap .btn-close').click(function() {
					popupWrapHide();
				});
			
				function popupWrapShow(ojb) {
					$(ojb).fadeIn('fast');
					$('body').addClass('disable');
				}
			
				function popupWrapHide() {
					$('.popup-wrap').fadeOut('fast');
					$('body').removeClass('disable');
				}
			
			});