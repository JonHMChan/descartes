# [Descartes](https://descartes.io/)
*by Jon Chan* [@jonhmchan](http://twitter.com/jonhmchan/)

This is an experimental library for writing CSS in JavaScript. The current version is a beta and highly unstable, with changes happening on a daily basis. This library is *not* recommended for production use. It is actively being developed with your help.

## Quickstart

1. Download `descartes.js` from the `dist` folder
2. Set up Descartes in a webpage by inserting it in your `<head>` tag, like so:

    ```html
	<!doctype html>
	<html>
		<head>
			<script type="text/javascript" src="/path/to/descartes.js"></script>
		</head>
		<body>
			<h1>I compute, therefore I am.</h1>
			<script type="text/javascript" src="/path/to/styles.js"></script>
		</body>
	</html>
    ```

3. Create a `styles.js` where you will write your styles. Try the following:

    ```javascript
	Descartes.add({
		"body": {
			"color": "#555",
			"font-family": "Arial",
			"h1": {
				"font-family": "Helvetica",
				"font-size": function() {
					return 16 + Math.round(Math.random() * 42);
				}
			}
		}
	})
    ```

4. Save and open up your HTML file in a browser. Clicking anywhere on the window should randomize the size of your heading.


## Overview

For a full overview of features, take a look at the presentation I typically give at https://descartes.io/slides (just your right and left arrow keys to go through the slides).
