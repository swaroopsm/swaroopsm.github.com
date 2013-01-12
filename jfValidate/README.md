##jfValidate

A simple and easy to use jQuery form validation plugin.

###Usage:
#####For Required Fields: 

	Use data-required="true"
	Eg.:
	<input type="text" name="name" data-type="text" data-required="true" placeholder="Your Name"/>
	
#####Using a Label Name:
	Use data-label="Any Name"
	Eg.:
	<input type="text" name="qualification" data-label="Your Qualification" data-type="text" data-required="true" placeholder="Your Qualification"/>


#####Validating on a Form using jQuery:
	$("form#form-id").submit(function(){
		var obj = $(this).jfValidateEmpty();
		if(obj.success){
			//Implement on Success.
		}
		else{
			var errors = obj.errors;
			//Display Error Message.
		}
		return false;
	});

	
#####Outputing Error:
	As of now, this plugin is under development and displays errors as JSON.
	obj.errors consists of the error messages.
	
#####@TODO:
	* Validation for emptyness on radio buttons and checkboxes.
	* Validations for different data-types such as email, phone etc.
	* Parsing JSON errors and rendering messages.
	* Ajax form submit function plugin.
