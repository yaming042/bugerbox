(function(){
	var projectId = '';
	var swiper_1 = null;

	var users = [];
	var projects = [];

	function init(){
		if(data && data.hasOwnProperty('bugerboxUser')){
			$("#username").text(data.bugerboxUser.name);
		}

		getUsers();//获取用户列表
		getProjects();//获取项目列表
		addListener();
	}
	getUsers(){
		chrome.runtime.sendMessage({event: 'getUsers', data: ''}, function(response){
			if(response.code == 200){
				initSelectator();
			}else{
				console.log(response);
			}
		});
	}
	getProjects(){
		chrome.runtime.sendMessage({event: 'getProjects', data: ''}, function(response){
			if(response.code == 200){
				renderProjectList();
			}else{
				console.log(response);
			}
		});
	}

	renderProjectList(){
		/*
		<div class="bug-list-item">
						<div>测试项目</div>
						<div>项目描述项目描述项目描述项目描述项目描述项目描述</div>
						<div>admin</div>
						<div>admin@163.com</div>
						<div>10</div>
						<div>
							<span class="iconfont-options" data-id="1">
								<i class="iconfont option"></i>
							</span>
						</div>
					</div>
		*/ 
		var html = '';
		projects.map(function(d, k){
			html += '<div class="bug-list-item">'+
						'<div>'+ d.name +'</div>'+
						'<div>'+ d.desc +'</div>'+
						'<div>'+ d.ower +'</div>'+
						'<div>'+ d.email +'</div>'+
						'<div>'+ d.devs +'</div>'+
						'<div>'+
							'<span class="iconfont-options" data-id="'+ d.id +'"><i class="iconfont option"></i></span>'+
						'</div>'+
					'</div>';
		});
	}


	function addListener(){
		$(document).on('click', '#create-project', function(e){
			$("#dialog-index").css({'display':'block','opacity':1});
			if(!swiper_1){
				initSwiper();
			}
		});
		$(document).on('click', '#close-create-dialog', function(e){
			$("#dialog-index").css({'display':'none','opacity':0});
		});

		$(document).on('click', '.iconfont-options', function(e){
			projectId = $(this).attr('data-id');
			commonMenuOpen('index-option-menu', e);
		});

		$(document).on('click', '.edit', function(e){
			var url = chrome.runtime.getURL('views/adminDetail.html?id='+projectId);
			window.location.href = url;
		});
		$(document).on('click', '.delete', function(e){
			$("#dialog-index-delete").css({'display':'block','opacity':1});
		});
		$(document).on('click', '#close-delete-dialog', function(e){
			$("#dialog-index-delete").css({'display':'none','opacity':0});
		});


		$(document).on('click', '.create-project-dialog .tabs-item', function(e){
			var index = $(this).attr('data-id');
			if(swiper_1){
				swiper_1.slideTo(index);
			}

			if($(this).hasClass('current-tabs-item')){
				return;
			}else{
				$(this).addClass('current-tabs-item');
				$(this).siblings().removeClass('current-tabs-item');
			}
		});
	}

	function commonMenuOpen(menuId, evt){
        let node = $(evt.target);
        let pclass = 'bug-list-item';
        let cClass = 'tr-bg';
        let tClass = 'iconfont-options';

        /*根据父节点是否有特定的类来判断是否需要打开或关闭
         * 1:点击同一个icon
         * 2:点击不同的icon
         * 3:点击icon之外的节点
         * */
        let pnode = node.parents('.'+pclass);
        if(pnode.hasClass(cClass)){
            pnode.removeClass(cClass);
            $('#'+menuId).css({'left': '0px', 'top': '-1000px', "display": 'none'});
        }else{
            pnode.siblings().removeClass(cClass);
            pnode.addClass(cClass);
            if(evt){
                let left = evt.clientX;
                let top = evt.clientY;
                if(top > ($(window).height() / 5 * 4)){
                    $('#'+menuId).css({
                        'left': left - 10 - $('#'+menuId).width() + 'px',
                        'top': top + 5 - $('#'+menuId).height() + 'px',
                        'z-index': 1501,
                        'display': 'block'
                    });
                }else{
                    $('#'+menuId).css({'left': left - 10 - $('#'+menuId).width() + 'px', 'top': top + 5 + 'px','z-index': 1501, 'display': 'block'});
                }

                $(document).on('click.openMenu', function(e) {//用命名空间绑定函数，方便取消取消显示窗口
                    if(!$(e.target).hasClass(tClass)){
                        hiddenMenu(pclass, menuId);
                    }
                });
            }

        }

        function hiddenMenu(c, menuId){
            $('.'+c).removeClass(cClass);
            $('#'+menuId).css({'left': '0px', 'top': '-1000px','display': 'none'});
            $(document).unbind("click.openMenu" );
        }
    }

    function initSelectator(){
    	$("#select-admin").selectator({
			labels: {
		        search: 'Search...'
		    },
		});
    }
    function initSwiper(){
    	if(!swiper_1){
			swiper_1 = new Swiper('.swiper-container',{
	    		initialSlide: 0,
	    		simulateTouch : false,
	    	});
    	}
    }

	init();
})();