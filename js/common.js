$('.card').live('click', function(){
	$(this).toggleClass('showBack');
});

function addListenerInputSearch(faceFriends){
	var oSearch = Search({
		_keyTimeoutLength : 100,//milisegundos
		searchInput : null,
		searchList : faceFriends,
		handleResultFilter : function(friends){
			$liDom = $('#faceListFriends li');
	
			if($liDom.length > 0){
				$liDom.hide();
				$.each(friends, function (i, val) {
					$("#item_"+val.id).show();
				});
			}
		}
	});
	$('.searchInput').bind('keyup',oSearch.search);
	$('.searchInput').bind('focus',function(){
		$('#faceListFriends').fadeIn();
	});
	
	$('.searchInput').bind('blur',function(){
		$('#faceListFriends').fadeOut();
	});
}

function fbLoad(){
	Facebook.getFriends(function(friends){
		Dom.appendFriends(friends);
		addListenerInputSearch(friends);
	});
	
	Facebook.getWall(function(){
		Dom.appendWall(Facebook.posts[0].posts.data);
	});
	
	var acabou = false;
	$(window).scroll(function(){
		if(acabou){
			return;
		}
		
		if  ($(window).scrollTop() == $(document).height() - $(window).height()){
			acabou = Facebook.posts[0].posts.data.length > 1 ? false : true;
			var dateStr=Facebook.posts[0].posts.data[Facebook.posts[0].posts.data.length-1].created_time;
			var a=dateStr.split("T");
			var d=a[0].split("-");
			var t=a[1].split(":");
			var date = new Date(d[0],(d[1]-1),d[2],t[0],t[1],0);

			Facebook.getWall(function(){
				Dom.appendWall(Facebook.posts[0].posts.data);
			}, Facebook.currentUserId+'?fields=posts.until('+date.getTime()/1000+').fields(from,type,picture,description,caption,name,object_id, comments).limit(100)');
		}
	}); 
	
	$('.loadHistory').live('click',function(e){
		Loading.show();
		$('.list-photos').html('');
		Facebook.currentUserId = $(this).data('id');
		Facebook.getWall(function(){
			Dom.appendWall(Facebook.posts[0].posts.data);
		});
	});
}

