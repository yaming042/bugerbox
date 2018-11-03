(function(){
	function init(){
		chrome.storage.sync.get(function(data){

		});


		chrome.runtime.onMessage.addListener(function(request, send, response){
			var event = request.event;
			switch(event){
				case 'toIndex':
					chrome.tabs.query(
						{
							active: true,
							currentWindow: true,
							windowType: 'normal'
						},
						function(tabs){
							if(tabs.length > 0){
								window.open(chrome.runtime.getURL('index.html'));
							}
						}
					);
					response({code: 200,data:'', msg:'success'});
					break;
				

				default:
					break;
			}
		});
	}


	init();
})();