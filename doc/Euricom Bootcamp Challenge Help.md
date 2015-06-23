# Euricom Bootcamp Challenge

## API

### Create Session

Create a secure session based on sessionId. A apiKey is returned to access the secure session.

Request:

	POST http://bootcamp-challenge.herokuapp.com/api/create-session
	{
		sessionId: string
	}

Response:

	{
	    "helpUrl": string
	    "apiKey": string
	}

* helpUrl: The url of this help page
* apiKey: The apiKey to access the secure session (see apiKey query string)

### Get Users

Get a list of user objects.

Request:

	GET http://bootcamp-challenge.herokuapp.com/api/users?apiKey={{apiKey}}

Response:

	[
		{
			'name': string,
			'firstName': string,
			'title': string,
			'phone': string,
			'description': string
		}
	]

### Send SMS

Request:

	POST http://bootcamp-challenge.herokuapp.com/api/send-sms?apiKey={{apiKey}}
	{
		username: string
    	password: string,
    	text: string,
    	destination: string
	}

* username: account username
* password: account password
* text: content of the SMS (min: 1, max: 160)
* destination: destination number (MSISDN-numeric)

Reponse:

	- OK (200):      The SMS was send successfull
	- CONFLICT (409) The request could not be completed due to a
					 conflict with the current state of the resource.
					 A more detailed error code is returned.

Error codes:

	100 - Missing Parameter
	101 - Username too short
	102 - Username too long
	103 - Password too short
	104 - Password too long
	105 - Destination too short
	106 - Destination too long
	109 - Text too short
	110 - Text too long

	200 - Security error
	201 - Unknown route
	202 - Route access violation 203 - Insufficient credits

	800 - Technical Error
