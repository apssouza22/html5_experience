/* 
 * Arquivo com fun�oes de ajuda
 */

window.onerror = function(e){
	log(e);
}

function log(value){
	if(typeof(console) == "object"){	
		console.log(value);
	}else{
		alert(value);
	}
}


/***
 * Faz busca numa lista, contemplando um timeout entre o keypress e ainda evitando pesquisa, se a palavra n�o mudou
 */
var Search = function (options) {
	var methodPublic = {},
	_valueSearch = "",
	_lastValueSearch = "",
	_objTimeout = 0,
	defaultOptions = {
		_objTimeoutLength : 500,//milisegundos
		searchInput : null,
		searchList : [],
		handleResultFilter : function(){},
		searchProperty : 'name'
	},
	
	settings = $.extend( {}, defaultOptions, options );

	//fn
	methodPublic.search = function () {
		if(settings.searchInput){
			_valueSearch = $(settings.searchInput).val();
		}else{
			_valueSearch = $(this).val();
		}

		if (_objTimeout) {
			clearTimeout(_objTimeout);
			_objTimeout = 0;
		}

		if (_valueSearch != _lastValueSearch) {
			_lastValueSearch = _valueSearch;
			_objTimeout = setTimeout(searchItem, settings._objTimeoutLength);
		}
	}
	
	
	/**
	 *Analisa item a intem se combina com o valor digitado no input de busca
	 **/
	function searchItem() {
		addMethodFilter();
		var filter = settings.searchList.filter(function (element) {
			if(element.hasOwnProperty(settings.searchProperty)){
				element = String(element[settings.searchProperty].toLowerCase());
			}
			return element.match(new RegExp(_valueSearch.toLowerCase()));
		});

		settings.handleResultFilter(filter);
	}
	
	/**
	 *Nos browsers mais antigos, n�o tem o m�todo filter no Array, por isso adicionamos 
	 **/
	function addMethodFilter(){
		if (!Array.prototype.filter) {
			Array.prototype.filter = function (fun /*, thisp*/) {
				var len = this.length >>> 0;
				if (typeof fun != "function") {
					throw new TypeError();
				}
				var res = [];
				var thisp = arguments[1];
				for (var i = 0; i < len; i++) {
					if (i in this) {
						var val = this[i]; // in case fun mutates this
						if (fun.call(thisp, val, i, this)) {
							res.push(val);
						}
					}
				}
				return res;
			};
		}
	}

	return methodPublic;
} //FIM SearchFriends


/**
 *Cuida do loading do site
 **/
var Loading = {
	show : function(){
		$('.loading').fadeIn();
		$('#container').fadeTo(200, 0.3);
	},
	
	hide : function(){
		$('.loading').fadeOut();
		$('#container').fadeTo(100, 1);
	}
}


