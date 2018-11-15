(function(){
	var errors = {
		name: '',
		pwd: '',

		regName: '',
		regPwd: '',
		regConfirmPwn: '',
		regPhone: '',
		regEmail: '',
	};
	
	function init(){
		addEvent();
		// chrome.storage.sync.clear();
		chrome.storage.sync.get(function(data){
			console.log(data);
			/**
			{
				userid: xxx,
				username: xxx,
				isadmin: bool,
				created_at: xxxx
			}
			*/ 
			if(data && data.hasOwnProperty('bugerboxUser')){//登录
				$(".reg-box").show();
				$('.sign-in').hide();
			}else{//注册
				$(".reg-box").hide();
				$('.sign-in').show();
			}
		})
	}

	function addEvent(){
		// 登录
		$(document).on('click', '#reg-btn', function(e){
			$("#userName").focus().blur();
			$("#userPwd").focus().blur();

			if(errors.name || errors.pwd){
				return;
			}

			var data = {
				name: $("#userName").val(),
				password: $("#userPwd").val()
			};

			chrome.runtime.sendMessage({event: 'toSignUp',data: data},function(response){
				console.log(response);
				var url = chrome.runtime.getURL('views/index.html');
				var admin = chrome.runtime.getURL('views/adminIndex.html');

				if(response.code == 200){
					chrome.storage.sync.set({'bugerboxUser': response.data}, function(){});

					chrome.tabs.query(
						{
							active: true,
							currentWindow: true,
							windowType: 'normal'
						},
						function(tabs){
							if(tabs.length > 0){
								response.data.admin == 1 ?
									window.open( admin )
								:
									window.open( url )
							}
						}
					);
				}else{
					$("#login-err").text('用户名或密码错误');
				}
			});

			// todo....
		});
		// 注册
		$(document).on('click', '#sign-btn', function(e){
			$("#regUserName").focus().blur();
			$("#regUserPwd").focus().blur();
			$("#regUserConfirmPwd").focus().blur();
			$("#regUserPhone").focus().blur();
			$("#regUserEmail").focus().blur();

			if(errors.regName || errors.regPhone || errors.regPwd || errors.regConfirmPwn || errors.regEmail){
				return;
			}

			var data = {
				name: $("#regUserName").val(),
				phone: $("#regUserPhone").val(),
				email: $("#regUserEmail").val(),
				password: $("#regUserPwd").val()
			};

			chrome.runtime.sendMessage({event: 'toSignIn',data: data},(response) => {
				console.log(response);
            });

			// todo....
		});

		// 验证登录
		$(document).on('focus', '#userName', function(e){
			errors.name = '';
			$("#userName-err").text(errors.name);
			$("#login-err").text('');
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
		$(document).on('focus', '#userPwd', function(e){
			errors.pwd = '';
			$("#userPwd-err").text(errors.pwd);
			$("#login-err").text('');
		});
		$(document).on('blur', '#userPwd', function(e){
			var val = e.target.value;
			if(!val.length){
				errors.pwd = '请填写你的登录密码';
			}else if(val.length < 4 || val.length > 12){
				errors.pwd = '登录密码建议长度6 ~ 12';
			}else{
				errors.pwd = '';
			}
			$("#userPwd-err").text(errors.pwd);
		});
		// 验证注册
		$(document).on('focus', '#regUserName', function(e){
			errors.regName = '';
			$("#regUserName-err").text(errors.regName);
		});
		$(document).on('focus', '#regUserPwd', function(e){
			errors.regPwd = '';
			$("#regUserPwd-err").text(errors.regPwd);
		});
		$(document).on('focus', '#regUserConfirmPwd', function(e){
			errors.regConfirmPwn = '';
			$("#regUserConfirmPwd-err").text(errors.regConfirmPwn);
		});
		$(document).on('focus', '#regUserPhone', function(e){
			errors.regPhone = '';
			$("#regUserPhone-err").text(errors.regPhone);
		});
		$(document).on('focus', '#regUserEmail', function(e){
			errors.regEmail = '';
			$("#regUserEmail-err").text(errors.regEmail);
		});

		$(document).on('blur', '#regUserName', function(e){
			var val = e.target.value;
			if(!val.length){
				errors.regName = '用户名不能为空';
			}else if(val.length < 6 || val.length > 32){
				errors.regName = '用户名不建议长度6 ~ 32';
			}else{
				errors.regName = '';
			}
			$("#regUserName-err").text(errors.regName);
		});
		$(document).on('blur', '#regUserPwd', function(e){
			var val = e.target.value;
			if(!val.length){
				errors.regPwd = '用户密码不能为空';
			}else if(val.length < 6 || val.length > 12){
				errors.regPwd = '用户密码建议长度6 ~ 12';
			}else{
				errors.regPwd = '';
			}
			$("#regUserPwd-err").text(errors.regPwd);
		});
		$(document).on('blur', '#regUserConfirmPwd', function(e){
			var val = e.target.value;
			var pwd = $('#regUserPwd').val();
			if(!val.length){
				errors.regConfirmPwn = '确认密码不能为空';
			}else if(val != pwd){
				errors.regConfirmPwn = '确认密码错误';
			}else{
				errors.regConfirmPwn = '';
			}
			$("#regUserConfirmPwd-err").text(errors.regConfirmPwn);
		});
		$(document).on('blur', '#regUserPhone', function(e){
			var val = e.target.value;
			if(val.length && (!_isPhone(val) || !_isMobile(val))){
				errors.regPhone = '请输入正确的手机号码';
			}else{
				errors.regPhone = '';
			}
			$("#regUserPhone-err").text(errors.regPhone);
		});
		$(document).on('blur', '#regUserEmail', function(e){
			var val = e.target.value;
			if(val.length && !_isEmail(val)){
				errors.regEmail = '请输入正确的邮箱地址';
			}else{
				errors.regEmail = '';
			}
			$("#regUserEmail-err").text(errors.regEmail);
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
