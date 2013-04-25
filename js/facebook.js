var Facebook = {
	urlAppFace : 'http://migre.me/cIJJs',
	urlApp : 'http://salvesocial.com/kimberly/cha-de-bebe/',
	myId : '',
	currentUserId : 'me',
	accessToken : '',
	photos:'',
	
	compartilheApp : function(e){
		e.preventDefault();
		FB.ui({
			method: 'feed',
			link: Facebook.urlAppFace,
			picture: Facebook.urlApp + 'img/share.jpg',
			name: 'Monte seu ch� de beb�',
			caption: 'De Huggies Turma da M�nica',
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
			var faceUri = Facebook.currentUserId+'?fields=photos.fields(from,picture,name,comments,images).limit(10)';
			
			if(typeof(uri) == 'string' ){
				faceUri = uri;
			}
			
			FB.api(faceUri, "get", {access_token:Facebook.accessToken}
			, function(response) {
				//response = Facebook.handleResponse(response);
				if(!response.hasOwnProperty('photos')){
					$('.list-photos').html('<li>Nenhuma foto encontrada</li>');
					Loading.hide();
					return;
				}
				Facebook.photos = response.photos;
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
						alert("Voc� deve aceitar o aplicativo.");
						window.location.reload();
					}
				}, {
					scope: 'user_about_me, email, publish_stream, read_stream, user_photos, friends_about_me, friends_photos, friends_status'
				});
			} 
		});
	}
}
