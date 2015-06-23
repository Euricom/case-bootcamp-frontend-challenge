
# Euricom Bootcamp REST API Guidelines
---------------------------------------

## Voor de begeleiden

Eerst wordt de sessionId gezet. Dit gebeurd in het begin van de test
Let wel op dit maar 1 keer te doen indien er meerdere kandidaten zijn
op dezelfde moment

	http://bootcamp-challenge.herokuapp.com/api/dBDiFG8MEkA7RB?id=123

## Challenge 1

Een HTTP POST doen. Hier kunnen verschillende tools voor gebruikt worden:
- PostMan (chrome plugin, er zijn ook plugins voor firefox)
- CURL (command line)
- www.hurl.it & http-master.com (online tools)
- build it yourself (jquery, niet de beste oplossing)

Lastig puntje hier voor de meeste is het vergeten van de 'Content-Type' header.
als deze er niet bij staat wordt de JSON content niet herkend.

Als resultaat komt de URL van de help pagina terug (in JSON) de URL's van de users en send-sms (inclusief de juiste apiKey) wordt dan weergegeven.

	POST http://bootcamp-challenge.herokuapp.com/api/create-session
	{
		"sessionId": "123"
	}

Header (niet vergeten)

	'Content-Type': 'application/json'

Als de create-session lukt wordt er een apiToken teruggegeven die gebruikt kan worden voor de get users en send sms. Let op dat indien je de create-session opnieuw uitvoerdt de vorige vervalt.

## Challenge 2

Een HTTP GET doen vanuit javascript om de users op te halen en te renderen in JS.

Hier is de uitdaging om te gaan met javascript in combinatie met HTML & jquery
Dus hoe krijg ik een data structuur gerendered op de pagina.

Makkelijkste is gebruik maken van jquery maar

	document.getElementById("#example").innerHTML

kan ook.

## Challenge 3

Een HTTP POST doen vanuit javascript om de een SMS te sturen.

Een vervolg op de twee bovenstaande. Vanuit javascript moet nu de input data vanuit de web pagina doorstuurd worden naar een service (API) via een post. Ook hier mogen ze niet vergeten de Content-Type door te geven.

Omdat we hier cross domain gaan moet de web pagina vanuit een webserver draaien en kan een local file (file://....) niet gebruikt worden. Anders krijg je volgende error: "No ‘Access-Control-Allow-Origin’ header is present on the requested resource". Mogelijk oplossingen:
- npm install serve; serve myPage.html
- webstorm: open in browser
- iisexpress: map to folder

Extra hier is dat ze voor de send-sms nog een username/password nodig hebben die ze nog niet gekregen hebben. De bedoeling is dat ze deze komen vragen.
