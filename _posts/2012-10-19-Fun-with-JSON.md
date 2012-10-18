---
layout: post
title: Fun with JSON
posted: 19 October, 2012
---
<hr>
JSON(Javascript Object Notation) is fun! It's really easy to parse JSON particularly using jQuery.

A simple JSON Example. Assume you have a file name [person.json](#) that renders the following JSON object: 
<pre class="highlight"><code class="vi">[{
	"name":    "John Doe",
	"company": "Xyz Corp.",
	"skills":  ["Python", "jQuery", "HTML5", "CSS3"]
}]
</code>
</pre>

Now, let's see how we can use jQuery to parse the above mentioned JSON. For this you need to include the latest [jQuery](http:jquery.com) script file.

<pre class="highlight"><code class="vi">$(document).ready(function(){
	$.getJSON("person.json", function(data){
		 console.log("Name: "+ data[0].name);
		 console.log("Company: "+ data[0].company);
		 for(var i in data[0].skills){
			 console.log("Skill"+i+": "+data[0].skills[i]);
		 }
	});
});
</code>
</pre>

Now, let's look at a more complex example.
<pre class="highlight"><code class="vi">[{
	"name":    "John Doe",
	"email": "john@example.com",
	"friends": [
		{
			"name": "Jill",
			"email": "jill@example.com"
		},
		{
			"name": "Jack",
			"email": "jack@example.com"
		},
		{
			"name": "Parker",
			"email": "parker@example.com"
		}
	]
}]
</code>
</pre>

Let's parse this using [jQuery](http://jquery.com) now :)
<pre class="highlight"><code class="vi">$(document).ready(function(){
	$.getJSON("person.json", function(data){
		 console.log("Name: "+ data[0].name);
		 console.log("Email: "+ data[0].email);
		 for(var i in data[0].friends){
		 	console.log("Name: "+data[0].friends[i].name+" Email: "+data[0].friends[i].email)
		 }
	});
});
</code>
</pre>

When the going gets tough, the tough gets going ;)
<pre class="highlight"><code class="vi">[{
	"name":    "John Doe",
	"company": "XYZ Corp.",
	"friends": [
		{
			"name": "Kathy",
			"company": "XYZ Corp.",
			"past_experience": [{
				"company": "ABC LLC",
				"posts": ["Analyst", "Senior Analyst"],
				"awards": [
					{
						"title": "Employee of the month",
						"desc": "Awarded the best employee for the month September in 2011"
					},
					{
						"title": "Top 10 Senior Analysts",
						"desc": "Ranked top 10 among all the Senior Analysts"
					}
				]
			}]
		},
		{
			"name": "Kathy",
			"company": "XYZ Corp.",
			"past_experience": [{
				"company": "TZ-3000 Inc.",
				"posts": ["Developer", "Project Manager", "Vice President"],
				"awards": [
					{
						"title": "Python Coder of the year",
						"desc": "Awarded python coder of the year 2010"
					},
					{
						"title": "Best Team Award",
						"desc": "Secured the best team award when worked as the  Project Manager"
					}
				]
			}]
		}
	]
}]
</code>
</pre>

Looks complex, right? Let's parse this complex object now:
<pre class="highlight"><code class="vi">$(document).ready(function(){
	$.getJSON("person.json", function(data){
		for(var i in data[0].friends){
		console.log("Name: "+data[0].friends[i].name+", Company: "+data[0].friends[i].company);
		var exp=data[0].friends[i].past_experience;
		for(var j in exp){
			console.log("Previous Company: "+exp[j].company);
			console.log("Worked as: ");
			var a="";
			for(var k in exp[j].posts){
				a=a+exp[j].posts[k]+", "
			}
			console.log(a.substr(0,a.length-2));
			console.log("Awards: ");
			for(var l in exp[j].awards){
				console.log("Title: "+exp[j].awards[l].title+", Description: "+exp[j].awards[l].desc);
			}
		}
	 }
});
});
</code>
</pre>

P.S.: All JSON objects in the above examples are contained in a file called [person.json](#).
