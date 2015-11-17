# Blogfoni

Blogfoni is a sleek and simple blog system with a CMS and an admin panel, written with MEAN.js technologies as an internship project of mine. And will be used within the IT department and related employees of Markafoni inc. as a knowledge/memory sharing platform.

## Pre-installation requirements

NodeJS / iojs is the fatal requirement of blogfoni and they could be downloaded from either <a href="https://iojs.org/en/">https://iojs.org/en/</a> or <a href="https://nodejs.org/en/">https://nodejs.org/en/</a>

Check if you have node/iojs already installed by the command:

	$ node -v

As <b>M</b>EAN.js's initial letter refers, MongoDb is the data provider of this project. 

Make sure that you've mongodb installed. MongoDb 3.0.1 was used in this project, version may vary depending on the year you are in, so make sure that the version is compatible.

Run:
 
	$ mongo 	 

Output should be something similar to:
	MongoDB shell version: 3.0.1
	connecting to: xxx

If MongoDb is not installed on your environment try: <a href="https://www.mongodb.org"> https://www.mongodb.org</a>

## Installation


Once you cloned/downloaded the project to your local drive, in terminal go to the folder containing package.json and then run the command below:

	$ npm install

(You may have to do sudo on this one.)

Once the dependencies are met, proceed to the initialization.

## Usage

Assuming you are still inside the project folder:

Inside two different tabs on the terminal, run:

	$ mongod 

(You may have to do sudo on this one too.)

And then run:

	$ npm start

If these lines below are visible, you have had a successful installation process:
	
	$> blogfoniv2@0.0.0 start /Users/yourUsername/blogfoniv2
	$> node ./bin/www

Blogfoni will be running on your localhost with a port number of 8000.

Enjoy!