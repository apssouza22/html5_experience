var Facebook = {
	urlAppFace : 'http://migre.me/cIJJs',
	urlApp : 'http://salvesocial.com/kimberly/cha-de-bebe/',
	myId : '',
	currentUserId : 'me',
	accessToken : '',
	posts:'',
	
	compartilheApp : function(e){
		e.preventDefault();
		FB.ui({
			method: 'feed',
			link: Facebook.urlAppFace,
			picture: Facebook.urlApp + 'img/share.jpg',
			name: 'Monte seu chá de bebê',
			caption: 'De Huggies Turma da Mônica',
			description: 'Compartilhe falta texto'
		}, function(response){
			log(response);
		});	
	},
	
	/**
	 *Tras os amigos do Facebook
	 */
	getFriends : function(callback){
		
		Facebook.getLoginStatus(function(){
			FB.api('/me/friends', 'get',function(response) {
				if(typeof(callback) == 'function'){
					callback(response.data);
				}
			});
		});
	},
	
	getWall : function(callback, uri){
		Loading.show();
		Facebook.getLoginStatus(function(){
			var faceUri = Facebook.currentUserId+'?fields=posts.limit(100).fields(from,type,picture,description,caption,name,object_id, comments)';
			if(typeof(uri) == 'string' ){
				faceUri = uri;
			}
			
			FB.api("/", "POST", {
				access_token:Facebook.accessToken,
				batch:[
				{
					"method":"GET",
					"name":"get-posts",
					"omit_response_on_success": false,
					"relative_url": faceUri
				},			
				{
					"method":"GET",
					"name":"get-likes",
					"omit_response_on_success": false,
					"relative_url":"?ids={result=get-posts:$.posts.data.*.object_id}&fields=images"
				}				
				]
			}
			, function(response) {
				response = Facebook.handleResponse(response);
				Facebook.posts = response;
				if(typeof(callback) == 'function'){
					callback();
				}
			});
		});
	},
	
	handleResponse : function(response){
		var dataFace = [];
		if (!response || response.error) {
			log(response.error_description);
		}    
					
		for(var i=0,l=response.length; i<l; i++) {
			//       If we have set 'omit_response_on_success' to true in the Request, the Response value will be null, so continue to the next iteration                       
			if(response[i] === null) continue;
						
			var responseBody = $.parseJSON(response[i].body);
                       
			if(responseBody.error) {
				log(responseBody.error.message);
			}
			
			dataFace.push(responseBody);
		}
		return dataFace;
	},
	
	getLoginStatus : function (callbackConnected){
		//		callbackConnected();
		//		return true;
		FB.getLoginStatus(function(response) {
			if (response.status === 'connected') {
				var authResponse = FB.getAuthResponse();
				Facebook.myId = authResponse.userID;
				Facebook.accessToken = authResponse.accessToken;
				callbackConnected();
			} else {
				FB.login(function(response) {
					if (response.authResponse) {
						callbackConnected();
					}else{
						alert("Você deve aceitar o aplicativo.");
						window.location.reload();
					}
				}, {
					scope: 'user_about_me, email, publish_stream, read_stream, user_photos, friends_about_me, friends_photos, friends_status'
				});
			} 
		});
	}
}
