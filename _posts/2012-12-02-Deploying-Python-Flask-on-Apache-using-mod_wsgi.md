---
layout: post
title: Deploying Python Flask on Apache using mod_wsgi
posted: Sunday, 02 December 2012
description: Configuring Python Flask to work with Apache
keywords: Python, Flask, Apache, wsgi
---

[Flask](http://flask.pocoo.org) is an amazing framework for developing web applications. It is so simple that you could develop web apps on the fly. I've been working on [Crackpot](http://github.com/swaroopsm/Crackpot) that is built using [Flask](http://flask.pocoo.org) and under constant development. The sole purpose of this web app was to learn and use [Flask](http://flask.pocoo.org). I built a couple of cool stuff in this app, ran on the local development server and was pretty happy. But then, I wondered how do I deploy this to the Apache web server. So, I began googling about posts and all my trials were unsuccessful at the beginning and after a week long I finally got it working on my Apache web server. :)

I am currently running Ubuntu 12.04 OS and will be demonstrating with respect to it. I am also assuming that you have Apache installed in your machine. If not follow the instructions in this post: [Installing LAMP on Ubuntu](http://zwaroop.wordpress.com/2011/12/31/installing-lamp-on-ubuntu/)


####Installing mod_wsgi for Apache:
Web Server Gateway Interface([wsgi](http://en.wikipedia.org/wiki/Web_Server_Gateway_Interface)) an interface between web app and web server for python. and mod_wsgi is the module that enables Apache to serve our [Flask](http://flask.pocoo.org) application. Open your terminal and install it using the following command:

<pre class="highlight"><code class="vi">$ sudo apt-get install libapache2-mod-wsgi
</code></pre>

####Enabling mod_wsgi

<pre class="highlight"><code class="vi">$ sudo a2enmod wsgi
</code></pre>
		
####Create a sample Flask app:
Assuming the following is your Application's directory structure:
Write some sample code in \__init\__.py. Similar to [this](http://flask.pocoo.org).

<pre class="highlight"><code class="vi">FlaskApp/
	FlaskApp/
		static/
		templates/
		__init__.py
</code></pre>
			
####Configure a new virtual host:
Open your terminal and issue the following command:

<pre class="highlight"><code class="vi">$ sudo gedit /etc/apache2/sites-available/FlaskApp
</code></pre>
		
Copy, paste the following lines into the file that you created previously:

		<VirtualHost *:80>
				ServerName localhost
				ServerAdmin webmaster@example.com

				WSGIScriptAlias / /path/to/FlaskApp/flaskapp.wsgi

				<Directory /path/to/FlaskApp/FlaskApp/>	
			  		Order allow,deny
			  		Allow from all
				</Directory>

				Alias /static /path/to/FlaskApp/FlaskApp/static

				<Directory /path/to/FlaskApp/FlaskApp/static/>
		  			Order allow,deny
		  			Allow from all
				</Directory>

				ErrorLog ${APACHE_LOG_DIR}/error.log
				LogLevel warn
				CustomLog ${APACHE_LOG_DIR}/access.log combined
		</VirtualHost>
		
####Enabling your Virtual host:

<pre class="highlight"><code class="vi">$ sudo a2ensite FlaskApp
</code></pre>

####Create the .wsgi file:
This is the file that Apache looks for and based on this file, Apache serves your FlaskApp. Create a file called flaskapp.wsgi.

<pre class="highlight"><code class="vi">$ touch flaskapp.wsgi
</code></pre>
		
Now your directory structure will look like this:

<pre class="highlight"><code class="vi">FlaskApp/
	FlaskApp/
		static/
		templates/
		__int__.py
	flaskapp.wsgi
</code></pre>
			
Copy, paste the following lines of code into your flaskapp.wsgi:

<pre class="highlight"><code class="vi">#!/usr/bin/python

import sys
import logging

logging.basicConfig(stream=sys.stderr)

sys.path.insert(0,"/path/to/FlaskApp/")

from FlaskApp import app as application
</code></pre>
####Restart Apache:

<pre class="highlight"><code class="vi">$ sudo service apache2 restart
</code></pre>
		
####View your Application:
Open your favourite browser and view your application at: [localhost](http://localhost)

####Possible Errors:
#####Session Error while user login or logout to your application
Flask Application requires a secret key to be defined in order to create sessions. The important thing here is you need to define your secret key in your .wsgi file. You need to define your secret key at last line in your wsgi file as follows:

<pre class="highlight"><code class="vi">#!/usr/bin/python

import sys
import logging

logging.basicConfig(stream=sys.stderr)
sys.path.insert(0,"/path/to/FlaskApp/")

from FlaskApp import app as application
application.secret_key = 'Your application secret key'
</code></pre>
