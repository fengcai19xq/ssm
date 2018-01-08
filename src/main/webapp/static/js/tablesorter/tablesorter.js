(function($) {
	$.fn.sorter = function(options) {
		var tableObject = $(this); // 获取id为tableSort的table对象
		var tbHead = tableObject.children('thead'); // 获取table对象下的thead
		var tbHeadTh = tbHead.find('tr th'); // 获取thead下的tr下的th
		var tbBody = tableObject.children('tbody'); // 获取table对象下的tbody
		var tbBodyTr = tbBody.find('tr'); // 获取tbody下的tr

		var sortIndex = -1;
		tbHeadTh.each(function() {// 遍历thead的tr下的th
			var thisIndex = tbHeadTh.index($(this)); // 获取th所在的列号
			$(this).removeClass('sorting');
			if(options&&options.sortList){
				for(var a=0;a<options.sortList.length;a++){
					index = options.sortList[a];
					if(thisIndex==index){
						var html = $(this).html();
						if(html.indexOf('span')>0){
						}else{
							$(this).html($(this).html()+'<span class="caret"></span>');
						}
						$(this).click(function() {// 给当前表头th增加点击事件
							$(this).toggleClass('dropup');
							checkColumnValue(thisIndex);
							if(options.callback){
								options.callback();
							}
						});
					}
				}
			}else{
				var html = $(this).html();
				if(html.indexOf('span')>0){
				}else{
					$(this).html($(this).html()+'<span class="caret"></span>');
				}
				$(this).click(function() {// 给当前表头th增加点击事件
					$(this).toggleClass('dropup');
					checkColumnValue(thisIndex);
				});
			}
		});
	
		// 对表格排序
		function checkColumnValue(index) {
			var trsValue = new Array();
			tbBodyTr.each(function() {
				var tds = $(this).find('td');
				// 获取行号为index列的某一行的单元格内容与该单元格所在行的行内容添加到数组trsValue中
				var _value = $(tds[index]).html();
				if(index==0){
					if($(tds[index]).find('a')){
						_value = $(tds[index]).find('a').text();
					}
				}
				var type = validateType(_value);
				trsValue.push(type + ".separator" + _value
						+ ".separator" + $(this).html());
				$(this).html("");
				var temptype='';
				for ( var i = 0; i < trsValue.length; i++) {
					var str = trsValue[i];
					var temp = str.split('.separator');
					if(temp[0]!=''){
						temptype = temp[0];
						break;
					}
				}
				
				for ( var i = 0; i < trsValue.length; i++) {
					var str = trsValue[i];
					if(str.indexOf('.separator')==0){
						str = temptype+str;
					}
					//trsValue.push(args)
				}
			});

			var len = trsValue.length;

			if (index == sortIndex) {
				// 如果已经排序了则直接倒序
				trsValue.reverse();
			} else {
				for ( var i = 0; i < len; i++) {
					// split() 方法用于把一个字符串分割成字符串数组
					// 获取每行分割后数组的第一个值,即此列的数组类型,定义了字符串\数字\Ip
					type = trsValue[i].split(".separator")[0];
					for ( var j = i + 1; j < len; j++) {
						// 获取每行分割后数组的第二个值,即文本值
						value1 = trsValue[i].split(".separator")[1];
						// 获取下一行分割后数组的第二个值,即文本值
						value2 = trsValue[j].split(".separator")[1];
						// 接下来是数字\字符串等的比较
						if (type == "number") {
							value1 = value1 == "" ? 0 : value1;
							value2 = value2 == "" ? 0 : value2;
							if (parseFloat(value1) > parseFloat(value2)) {
								var temp = trsValue[j];
								trsValue[j] = trsValue[i];
								trsValue[i] = temp;
							}
						} else if (type == "currency") {
							if (currencytofloat(value1) > currencytofloat(value2)) {
								var temp = trsValue[j];
								trsValue[j] = trsValue[i];
								trsValue[i] = temp;
							}
						}else if (type == "date") {
							if (strtoDate(value1) > strtoDate(value2)) {
								var temp = trsValue[j];
								trsValue[j] = trsValue[i];
								trsValue[i] = temp;
							}
						}else if(type=="numberdate"){
							if (numberdateformate(value1) > numberdateformate(value2)) {
								var temp = trsValue[j];
								trsValue[j] = trsValue[i];
								trsValue[i] = temp;
							}
						} else {
							if (value1.localeCompare(value2) > 0) {// 该方法不兼容谷歌浏览器
								var temp = trsValue[j];
								trsValue[j] = trsValue[i];
								trsValue[i] = temp;
							}
						}
					}
				}
			}

			for ( var i = 0; i < len; i++) {
				$("tbody tr:eq(" + i + ")")
						.html(trsValue[i].split(".separator")[2]);
			}
			sortIndex = index;
		};

		
		//判断是否是金额类型的number  如果传入值为此格式则认为是数字
		function validateNumber(str) {
			 var reg = /^([0-9]+|[0-9]{1,3}(,[0-9]{3})*)(.[0-9]{1,2})?$/;     
		     var r = str.match(reg);  
		     return r==null?false:true;    
		}
		
		//判断日期类型是否为YYYY-MM-DD格式的类型  如果传入值为此格式则认为是日期
		function IsDate(str){     
		        var reg = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/;     
		        var r = str.match(reg);     
		        return r==null?false:true;    
		}  
		
		function numberDate(str){
			var reg = /^\d+天$/;     
	        var r = str.match(reg);     
	        return r==null?false:true;   
		}
		
		/**
		 * 判断输入值得类型
		 */
		function validateType(str){
			if(str==''||str==null){
				return '';
			}
			if(typeof str == 'number'){
				return number;
			}else if(validateNumber(str)){
				return 'currency';
			}else if(IsDate(str)){
				return 'date';
			}else if(numberDate(str)){
				return "numberdate"
			}
			return 'string';
		}
		/**
		 * 转换货币类型为float类型
		 */
		function currencytofloat(str){
			   re=new RegExp(",","g");
			   var newstr=str.replace(re,"");
			   return parseFloat(newstr);
		}
		/**
		 * 转换货币类型为日期类型
		 */
		function strtoDate(str){
			 	re=new RegExp("-","g");
			   var newstr=str.replace(re,"/");
			   return new Date(newstr);
		}
		
		function numberdateformate(str){
			re=new RegExp("天","g");
			var newstr=str.replace(re,"");
			return parseInt(newstr);
		}
	};
})(jQuery);