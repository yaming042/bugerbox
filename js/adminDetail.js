(function(){
	var bugId = '';
	var loading = false;
	var swiper_1 = null;

	var checkedUser = [];
	var users = [];

	function init(){
		getUsers();

		addListener();
	}

	function addListener(){
		$(document).on('click', '.project-bug-list .bug-list-item', function(e){
			bugId = $(this).attr('data-id');
			getBugDetail(bugId);
			$("#dialog-detail").css({'display':'block','opacity':1});
			if(!swiper_1){
				initSwiper();
			}
		});
		$(document).on('click', '#close-create-dialog', function(e){
			$("#dialog-detail").css({'display':'none','opacity':0});
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
		$(document).on('mouseup', '.user-check', function(e){
			e.stopPropagation();
			var checked = $(this).find('input').eq(0).attr('checked');
			var key = $(this).attr('data-key');
			let data = {
					id: users[key].id,
					name: users[key].name
				};
			if(checked){//增加
				addChecked(data);
			}else{//删除
				removeChecked(data);
			}

		});
	}

	function getBugDetail(id){
		
	}
	function getUsers(){
		users = [
			{
				id: '1',
				name: 'test',
				email: 'teswt@qq.com',
				type: 'user'
			},
			{
				id: '2',
				name: 'aaaaa',
				email: 'ddfdfd@qq.com',
				type: 'user'
			},
			{
				id: '3',
				name: 'admin',
				email: 'admin@qq.com',
				type: 'admin'
			}
		];

		renderUserList();
	}
	function renderUserList(){
		var html = '';
		users.map(function(d, k){
			html += '<div class="person-item">'+
						'<label data-key="'+k+'" class="user-check">'+
							'<input type="checkbox" name="select-persons" id="person-'+d.id+'" >'+
							d.name +
						'</label>' +
						'<span>' +
							d.email +
						'</span>' +
					'</div>';
		});
		$("#select-operator .person-list").html(html);
	}
	function renderCheckedUser(){
		var html = '';
		checkedUser.map(function(d, k){
			html += '<div class="person-item-checked">'+
						'<label>'+
							'<i class="iconfont oneuser"></i>'+
							d.name+
						'</label>'+
						'<i class="iconfont icon-delete"></i>'+
					'</div>';
		});
		$("#select-operator .left").html(html);
	}
	function addChecked(data){
		checkedUser.push(data);
		renderCheckedUser();
	}
	function removeChecked(data){
		checkedUser.map(function(d, k){
			if(d.id == data.id){
				checkedUser.splice(k, 1);
			}
		});
		renderCheckedUser();
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