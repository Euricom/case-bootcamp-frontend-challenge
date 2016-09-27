
# Bootcamp Challenge Guidelines
--------------------------------

## Voorbereiding

Te doen door de coach.

Eerst wordt de sessionId gezet. Dit gebeurd in het begin van de test
Let wel op dit maar 1 keer te doen indien er meerdere kandidaten zijn
op dezelfde moment

	http://bootcamp-challenge.herokuapp.com/api/dBDiFG8MEkA7RB?id=123

Als je de sessionId opnieuw zet worden alle vorige apiKeys gewist (zie create-session).

## Part1 - Web Page

### Web Page

De kanditaat kan hier zijn framework kiezen (jquery, anglular, native JS, bootstap, etc) om een interactive web pagina te maken.

Tooling: text editor, bower, chrome, ...

### Hosting

* [RawGit](https://rawgit.com/)
* [GoogleDrive as CDN](https://cube3x.com/how-to-use-google-drive-as-cdn-for-your-website/)
* DropBox public Url's
* [CodePin](http://codepen.io/)
* Static file hosting (https://getforge.com of https://www.bitballoon.com)
* classic hosting (use FTP)

## Part2 - Access API Service

### Get documentation

Een HTTP POST doen. Hier kunnen verschillende tools voor gebruikt worden:
- ```PostMan``` (chrome plugin, er zijn ook plugins voor firefox)
- ```CURL``` (command line)
- ```www.hurl.it``` & ```http-master.com``` (online tools)
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

Als de create-session lukt wordt er een apiToken teruggegeven die gebruikt kan worden voor de get users en send sms. Je kan meerdere sessions creëren.

### Get Users

Een HTTP GET doen vanuit javascript om de users op te halen en te renderen in JS.

Hier is de uitdaging om te gaan met javascript in combinatie met HTML & jquery
Dus hoe krijg ik een data structuur gerendered op de pagina.

Makkelijkste is gebruik maken van jquery maar

	document.getElementById("#example").innerHTML

kan ook.

### Send SMS

Een HTTP POST doen vanuit javascript om de een SMS te sturen.

Een vervolg op de twee bovenstaande. Vanuit javascript moet nu de input data vanuit de web pagina doorstuurd worden naar een service (API) via een post. Ook hier mogen ze niet vergeten de Content-Type door te geven.

Omdat we hier cross domain gaan moet de web pagina vanuit een webserver draaien en kan een local file (file://....) niet gebruikt worden. Anders krijg je volgende error: "No ‘Access-Control-Allow-Origin’ header is present on the requested resource".

Mogelijk oplossingen:

- ```npm install serve```
  ```serve .```
- ```python -m http.server``` (win, indien python 3.x installed)
- ```python -m SimpleHTTPServer``` (mac)
- webstorm: open in browser

Extra hier is dat ze voor de send-sms nog een username/password nodig hebben die ze nog niet gekregen hebben. De bedoeling is dat ze deze komen vragen.

En de 'destination' (phone number) is in MSISDN formaat. Door de kandidaat uit te zoeken wat dit formaat wil zeggen: international format without leading “00” or “+”.

## Part3 - Create Presentation

De kandidaat is vrij hier zijn tooling te kiezen die hij zelf wilt.
De bedoeling is kort zijn werk voor te stellen en hiervoor een presentatie te maken.

