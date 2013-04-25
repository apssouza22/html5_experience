/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Dom = {
	appendFriends : function(friends){
		if (friends.length > 0) {
			var boxFriends = "";
			$.each(friends, function (i, val) {
				boxFriends += '<li id="item_'+val.id+'"><a href="#' + val.name + '" data-id="' + val.id + '" class="loadHistory">' +
				'<img src="https://graph.facebook.com/' + val.id + '/picture/?type=small" alt="' + val.name + '" title="' + val.name + '" />'+
				'<span>' + val.name + '</span></a>'+
				'</li>'
			
			});

		} else {
			boxFriends += '<li>Nenhum amigo encontrado.</li>';
		}
		
		$('#faceListFriends').html(boxFriends);
	},
			
	setUserPhotos : function (){
		FB.api(Facebook.currentUserId+'/', 'get',function(response) {
			var $userLoged = $('.userLoged');
			$userLoged.find('.picture').attr('src','https://graph.facebook.com/' + response.id + '/picture/?type=small');
			$userLoged.find('.name').text(response.name);
				
		});
	},
	
	appendWall : function(wall){
		if (wall.length > 0) {
			var boxWall = "";
			var text = '';
			$.each(wall, function (i, val) {
				text = '';
				
					if(typeof(val.name) == 'string'){
						text += val.name;
					}
					
					if(typeof(val.caption) == 'string'){
						text += text ? ' - ' + val.caption : val.caption;
					}
					if(typeof(val.description) == 'string'){
						text += text ? ' - ' + val.description : val.description
					}
					
						var comments = "";
						if(val.hasOwnProperty('comments')){
							$.each(val.comments.data ,function(i, val){
								comments += "<br /> <b>"+val.from.name +"</b> - "+ val.message;
								});
						}
						boxWall += '<li class="conteinerItem">' +
						'<div class="card scale"><div class="front face">'+
						'<img src="'+val.images[4].source+'">'+
						'</div><div class="back face">'+
						'<p>'+ text +"<br/> Comentários : <br/>"+ comments +'</p>'+
						'</div></div>'+
						'</li>';
					
				
			});
		
		} else {
			boxWall += '<li>Nenhum amigo encontrado.</li>';
		}
		
		Dom.setUserPhotos();
		$('.list-photos').append(boxWall);
		Loading.hide();
	}
}
