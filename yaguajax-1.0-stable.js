//////////////////////////////////////////
//Copyright: Juan Pablo Stange
//3 CLAUSE BSD LICENSE
//http://code.google.com/p/yaguajax/
//This is Yaguajax version 1.0 STABLE
//////////////////////////////////////////

	var yaguajax = function () {

		var Vars          = [];
		var req           = null;
		var retObj        = null;
		this.jsCall       = null;
		this.jsMethod     = null;
		this.htmlID       = null;

		this.dorequestCB  = null;
		this.requestCB    = null;
		this.requestVars  = null;

		this.doSuccessCB  = false;
		this.successCB    = null;
		this.successDelay = null;
		this.successVars  = null;

		this.fmode        = null;
		

		this.setFetchMode = function (mode){

			this.fmode=mode;

		},


		this.onRequest   = function (obj,cback,vars){
			this.dorequestCB  = true;
			this.requestCB    = obj[cback];
			if (vars) this.requestVars  = new Object(vars);
			return;
		},


		this.target = function (id){
			this.htmlID=id;
		},

		this.onSuccess   = function (obj,cback,vars,delay){
			this.doSuccessCB = true;
			this.successCB   = obj[cback];
			if (delay) this.successDelay = parseInt(delay);
			if (vars)  this.successVars  = new Object(vars);
			return;
		},

		this.simpleRequest = function (url,method,callJsFunc,jsM,htmlID) {

			req     = this.startXhr();

			if (!req) {
				alert('Cannot create XMLHTTP instance');
				return false;
			} 

			this.jsCall   = callJsFunc;
			this.jsMethod = jsM;

			if (htmlID) this.htmlID = htmlID;

			req.open(method,url,true);

			req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			req.setRequestHeader('Connection', 'close');

			var params = this.parseVars(Vars)+'&nocache='+Math.random();

			req.onreadystatechange = function(c) {return function() {c.checkStateSimple()}}(this);

			if (this.dorequestCB) this.requestCB(this.requestVars);
				

			req.send(params);

		},


		this.debug = function () {
			alert (req.responseText);
		},

		this.switchMode = function(response){

			switch(this.fmode){
				
				case 'xml':
					return this.parseXml(response);
					break; // ;P	

				case 'js' :
					return this.parseObject(response);
					break;

				default:
					return response;
					break;

			}
			

		},


		this.parseObject = function (jscode){

			var fn = new Function ('return new Array('+jscode+')');
			return fn;

		},

		this.checkStateSimple = function () {

			if (req.readyState != 4) return;

			if (req.status !== 200&&req.status !== 304) return;

			var response = this.switchMode(req.responseText);
			//var response = (this.xml) ? this.parseXml(req.responseText) : req.responseText;

			if (this.doSuccessCB) {

				if (this.successDelay)
					window.setTimeout(function(c){ return function() { c.successCB(c.successVars); }}(this),this.successDelay);
				else
					this.successCB(this.successVars);	

				}
			
			if (this.htmlID) {
				
				var elm       = document.getElementById(this.htmlID);

				if (!elm) {

					alert ('Yaguajax: The Provided ID -> '+this.htmlID+'<- doesnt exists');
					return;

				}

				elm.innerHTML = response;

				return;

			}

				return this.jsCall[this.jsMethod](response);


		},


		this.parseXml = function (contents) {

					var xmlobject = null;

					try{

						xmlobject = (new DOMParser()).parseFromString(contents, "text/xml");

					} catch(e) {

						try {
							xmlobject = new ActiveXObject("Microsoft.XMLDOM");
							xmlobject.async=false;
							xmlobject.loadXML(contents);

						} catch(e) { 

								  alert (e); 

						}


					}

					return xmlobject;

		},

		this.startXhr =  function () {

			var ua = navigator.userAgent.toLowerCase();

			if (!window.ActiveXObject)
				return (new XMLHttpRequest());

			if (ua.indexOf('msie 5') == -1)
				return (new ActiveXObject("Msxml2.XMLHTTP"));

			return (new ActiveXObject("Microsoft.XMLHTTP"));

		},


		this.parseVars = function (sendUs) {

			var send = new String();

			for ( i in sendUs )
				send += i  + '=' + sendUs[i] + '&';

			send = send.substring (send.lastIndexOf('&'),-1);

			return send;

		},
		
		this.addVar =  function (variable,value,encode) {

			Vars[variable] = (encode) ? escape(value) : value;

			return;

		}

	}

