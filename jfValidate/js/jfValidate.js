/**
	* Author: Swaroop SM.
	* Email: swaroop.striker@gmail.com.
	* Website: swaroopsm.github.com.
**/


/**
	* Validate form for emptyness.
*/

jQuery.fn.jfValidateEmpty = function(){

	var inputsList = $(this).find("input[type!=hidden], select, textarea");
	var flag = 0;
	var ip;
	var ip_cycle=0;
	var errorMsg = new Array();
	var stat = new Array();
	for(var i=0;i<inputsList.length;i++){
		if(inputsList[i].dataset.required=="true"){
				ip = $.trim(inputsList[i].value);
				if(ip == ''){
					flag++;
					errorMsg.push(inputsList[i].dataset.label);
			}
		}
	}
	if(flag>0){
		stat.push({"success": false, "errors": errorMsg});
		return stat[0];
	}
	else{
		stat.push({"success": true});
		return stat[0];
	}
};
