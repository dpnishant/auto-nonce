lib auto-nonce 
==============

This is an experimental framework for automatic addition of anti-cross-site-request-forgery nonces to web applications via client side DOM manipulation

Documentation
=============

auto-xsrf.js

This is the core javascript file that does the following things:
1. Fetch the nonce from the server.
2. Parse the DOM to inject nonces to the HTML forms.
3. Overload the native XMLHttpRequest object's open method to automatically send a custom HTTP header called ''X-CSRF-Token" and the nonce as the header value, irrespective of the HTTP method. (Thanks to Ahamed Nafeez, for helping me fix this one. Follow him on Twitter: @skeptic_fx)

get_token.php

This script mimicks a REST API for generating the client nonces, based on the user session, and returns the nonce in a JSON response back to the client.

index.html

This is a test static HTML file that can be used for testing the working of the auto-xsrf library.

validate_token.php

This script compares the incoming client token, if any, and validates with the server token and returns a JSON response (or error) back to the client.
