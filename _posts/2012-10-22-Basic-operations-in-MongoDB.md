---
layout: post
title: Basic operations in MongoDB
posted: Monday, 22 October 2012
---

Off late, I've playing with MongoDB and I MongoDB's key/value store was very impressive to me. 

If you do not have the lathttp://docs.mongodb.org/manual/installation/est version of MongoDB, follow the instructions here: [MongoDB Installation](http://docs.mongodb.org/manual/installation/)

Now let's look at some basic operations in MongoDB:

#####Start Mongo shell and create a database called swaroop:
<pre class="highlight"><code class="vi">$ mongo
> use swaroop
> showdbs
	local	(empty)
	test	0.203125GB
</code></pre>
MongoDB is lazy, so the resulting database created won't show up unless you insert some data into it.

**Insert data into MongoDB**
#####Assume you need to insert the following data:
		name       : "Swaroop SM",
		gender	: "Male",
		website    : "swaroopsm.github.com"

To insert data into mongo, we need to pass data as JSON and then use the 'save' statement:
<pre class="highlight"><code class="vi">> db.persons.save({"name": "Swaroop SM",
				"gender": "Male",
  				"website": "swaroopsm.github.com"
			     })
</code></pre>
In the above example, we are inserting data into the persons collection of the database swaroop. Remember, a collection can be considered as a table in RDBMS, although since there MongoDB is a schema-free database, there is no concept of tables.

#####Insert an array of values:
		name       : "Swaroop SM",
		gender	: "Male",
		website    : "swaroopsm.github.com",
		friends	: "Joe", "Chris", "Kathy", "Thomas"
		
<pre class="highlight"><code class="vi">> db.persons.save({"name": "Swaroop SM",
				"gender": "Male",
  				"website": "swaroopsm.github.com",
  				"friends": ["Joe", "Chris", "Kathy", "Thomas"]
			     })
</code></pre>


#####Complex data insertion
		name       : "Swaroop SM",
		gender	: "Male",
		website    : "swaroopsm.github.com",
		friends	: "Joe", "Chris", "Kathy", "Thomas"
		
		Now we also need to store the friend's details of Swaroop SM.
		For e.g.: Joe's website, gender etc.
		
<pre class="highlight"><code class="vi">> db.persons.save({"name": "Swaroop SM",
				"gender": "Male",
  				"website": "swaroopsm.github.com",
  				"friends": {
  					"name": "Joe",
  					"gender": "Male",
  					"website": "joe.abc.com"
  					},
  					{
  					"name": "Chris",
  					"gender": "Male",
  					"website": "chris.xyz.com"
  					},
  					{
  					"name": "Kathy",
  					"gender": "Female",
  					"website": "kathy.pqr.org"
  					},
  					{
  					"name": "Thomas",
  					"gender": "Male",
  					"website": "Thomas.ttt.in"
  					}
			     })
</code></pre>
