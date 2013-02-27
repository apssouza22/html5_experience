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
	
	appendWall : function(wall){
		if (wall.length > 0) {
			var boxWall = "";
			var text = '';
			$.each(wall, function (i, val) {
				text = '';
				if(val.type == 'photo'){
					if(typeof(val.name) == 'string'){
						text += val.name;
					}
					
					if(typeof(val.caption) == 'string'){
						text += text ? ' - ' + val.caption : val.caption;
					}
					if(typeof(val.description) == 'string'){
						text += text ? ' - ' + val.description : val.description
					}
					if(Facebook.posts[1].hasOwnProperty(val.object_id)){
						var comments = "";
						if(val.comments.hasOwnProperty('count') && val.comments.count >= 1){
							$.each(val.comments.data ,function(i, val){
								comments += "<br /> <b>"+val.from.name +"</b> - "+ val.message;
								});
						}
						
						boxWall += '<li class="conteinerItem">' +
						'<div class="card scale"><div class="front face">'+
						'<img src="'+Facebook.posts[1][val.object_id].images[4].source+'">'+
						'</div><div class="back face">'+
						'<p>'+ text +"<br/> Comentários : <br/>"+ comments +'</p>'+
						'</div></div>'+
						'</li>'
					}
				}
			});
		
		} else {
			boxWall += '<li>Nenhum amigo encontrado.</li>';
		}
		
		$('.list-photos').append(boxWall);
		Loading.hide();
	}
}
