(function(){
	var errors = {
		name: '',
		phone: '',
	};
	
	function init(){
		addEvent();
		chrome.storage.sync.get(function(data){
			if(!data.hasOwnProperty('userid')){
				
			}else{
				
			}
		})
	}

	function addEvent(){
		$(document).on('click', '#reg-btn', function(e){
			$("#userName").focus().blur();
			$("#userPhone").focus().blur();

			if(errors.name || errors.phone){
				return;
			}

			var data = {
				name: $("#userName").val(),
				phone: $("#userPhone").val()
			};

			chrome.runtime.sendMessage({event: 'toIndex',data: data},(response) => {
				console.log(response);
            });

			// todo....
		});

		$(document).on('focus', '#userName', function(e){
			errors.name = '';
			$("#userName-err").text(errors.name);
		});
		$(document).on('blur', '#userName', function(e){
			var name = e.target.value;
			if(!name.length || name.length > 32){
				errors.name = '用户名长度(1 ~ 32)';
			}else{
				errors.name = '';
			}
			$("#userName-err").text(errors.name);
		});
		$(document).on('focus', '#userPhone', function(e){
			errors.phone = '';
			$("#userPhone-err").text(errors.phone);
		});
		$(document).on('blur', '#userPhone', function(e){
			var phone = e.target.value;
			if(!phone.length || !_isPhone(phone) || !_isMobile(phone)){
				errors.phone = '请填写正确的电话号码';
			}else{
				errors.phone = '';
			}
			$("#userPhone-err").text(errors.phone);
		});



	}

	/**
     * 辅助函数
     * */
    function _isArray(obj){
        return Array.isArray?Array.isArray(obj):Object.prototype.toString.call(obj) === '[object Array]';
    }
    function _isPhone(tel){
        return ( /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test(tel) );
    }
    function _isMobile(phone){
        return ( /^1[34578]\d{9}$/.test(phone) );
    }
    function _isURL(url){
        let reg = /^((ht|f)tps?):\/\/[\w\-]+(\.[\w\-]+)+([\w\-\.,@?^=%&:\/~\+#]*[\w\-\@?^=%&\/~\+#])?$/;
        return reg.test(url);
    }
    function _isEmail(email){
        return (/\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/.test(email));
    }


	init();
})();
