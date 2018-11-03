(function(){
	var errors = {
		name: '',
		email: '',
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
			$("#userEmail").focus().blur();

			if(errors.name || errors.email){
				return;
			}

			var name = $("#userName").val();
			var email = $("#userEmail").val();

			chrome.runtime.sendMessage({event: 'toIndex'},(response) => {
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
		$(document).on('focus', '#userEmail', function(e){
			errors.email = '';
			$("#userEmail-err").text(errors.email);
		});
		$(document).on('blur', '#userEmail', function(e){
			var email = e.target.value;
			if(!email.length || !_isEmail(email)){
				errors.email = '请填写正确的邮箱地址';
			}else{
				errors.email = '';
			}
			$("#userEmail-err").text(errors.email);
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
