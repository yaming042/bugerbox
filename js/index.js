(function(){


	function init(){
		chrome.storage.sync.get(function(data){
			/**
			{
				userid: xxx,
				username: xxx,
				isadmin: bool,
				created_at: xxxx
			}
			*/ 
			if(data && data.hasOwnProperty('bugerboxUser')){
				$("#username").text(data.bugerboxUser.name);
			}
		});

		getProjects();
		addListener();
	}

	function addListener(){

	}
	function getProjects(){
		
	}

	init();
})();