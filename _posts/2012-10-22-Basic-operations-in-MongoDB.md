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
In the above example, we are inserting data into the persons [collection](http://www.mongodb.org/display/DOCS/Collections) of the database swaroop. Remember, a [collection](http://www.mongodb.org/display/DOCS/Collections) can be considered as a table in RDBMS, although since MongoDB is a schema-free database, there is no concept of tables.

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


#####Complex data insertion:
		name       : "Swaroop SM",
		gender	: "Male",
		website    : "swaroopsm.github.com",
		friends	: "Joe", "Chris", "Kathy", "Thomas"
		
		Now we also need to store the friend's details of Swaroop SM.
		For e.g.: Joe's website, gender etc.
		
<pre class="highlight"><code class="vi">> db.persons.save({"name": "Carl James",
				"gender": "Male",
  				"website": "carljames.in",
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

**Select Data from MongoDB**

MongoDB uses the *find* method to retreive data.

#####Retrieve all documents of a particular collection:
<pre class="highlight"><code class="vi">> db.persons.find()
</code></pre>

#####Result:
<pre class="highlight"><code class="vi">{ "_id" : ObjectId("5084dbc63a54d35a3ce18ae0"), "name" : "Swaroop SM", "gender" : "Male", "website" : "swaroopsm.github.com", "friends" : [ "Joe", "Chris", "Kathy", "Thomas" ] }
{ "_id" : ObjectId("5084e17f3a54d35a3ce18ae1"), "name" : "Johnson", "gender" : "Male", "website" : "johnson.czx.in", "friends" : [ "Swaroop SM", "Kristy" ] }
</code></pre>

#####Retrieve a specific document:
<pre class="highlight"><code class="vi">> db.persons.find({"name": "Swaroop SM"})
</code></pre>
This retreives all documents with the name field having the value Swaroop SM.

#####Result:
<pre class="highlight"><code class="vi">{ "_id" : ObjectId("5084dbc63a54d35a3ce18ae0"), "name" : "Swaroop SM", "gender" : "Male", "website" : "swaroopsm.github.com", "friends" : [ "Joe", "Chris", "Kathy", "Thomas" ] }
</code></pre>

#####Retrieve a specific field in a document
<pre class="highlight"><code class="vi">> db.persons.find({"name":"Swaroop SM"},{"friends":1})
</code></pre>
This retreives all the friends of Swaroop SM.

#####Result
<pre class="highlight"><code class="vi">{ "_id" : ObjectId("5084dbc63a54d35a3ce18ae0"), "friends" : [ "Joe", "Chris", "Kathy", "Thomas" ] }
</code></pre>

#####Retrieve a specific field of a nested document
<pre class="highlight"><code class="vi">> db.persons.find({"name": "Carl James"},{"friends.website":1})
</code></pre>
This retreives a all the websites of Carl James' friends.

#####Result
<pre class="highlight"><code class="vi">{ "_id" : ObjectId("5084e49d3a54d35a3ce18ae2"), "friends" : [ { "website" : "joe.abc.com" }, 	{ "website" : "chris.xyz.com" }, { "website" : "kathy.pqr.org" }, { "website": "thomas.ttt.in" } ] }
</code></pre>

#####Retrieve documents using operators
<pre class="highlight"><code class="vi">> db.persons.save({"name": "Smith","salary": 40000})
> db.persons.save({"name": "Chad","salary": 45000})

> db.persons.find({"salary": {$gt: 40000}})
</code></pre>
This retieves all the documents whose salary field value is greater that 40000.

There are various operators like $lt, $ne etc. Check out the complete list here: [MongoDB Conditional Operators](http://www.mongodb.org/display/DOCS/Advanced+Queries#AdvancedQueries-ConditionalOperators)
