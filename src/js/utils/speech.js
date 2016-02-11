import _ from 'lodash';

let Speech = ((window) => {
	
	let CONF = {
		'lang' : 'en-GB',
		'volume': 1,
		'rate': 0.9,
		'pitch': 1
	};

	//let voices = window.speechSynthesis.getVoices();

	let _init = (conf) => {
		// Check browser support
		if(!_checkBrowserSupport()) {
			console.log("browser not supported");
			return;
		}

		// Import conf
		CONF =_.merge(CONF, conf);

		// Start listening to events
		window.onmouseup = (e) => {
			let text = _getSelectedText();
			_speak(text);
		}
		
	}

	let _checkBrowserSupport = () => {
		console.log("check browser");
		return !!window.speechSynthesis;
	}
	
	let _getSelectedText = () => {
		let txt = '';
	    if (window.getSelection) {
	        txt = window.getSelection().toString();
	    } else if (window.document.getSelection) {
	        txt = window.document.getSelection().toString();
	    } else if (window.document.selection) {
	        txt = window.document.selection.createRange().text;
	    }
	    return txt;  
	}

	let _speak = (msg) => {
		if(!msg) return;
		console.log("speak", msg);
		let utterance = new SpeechSynthesisUtterance();
		//utterance.voice = voices[10]; // Note: some voices don't support altering params
		//utterance.voiceURI = 'native';
		utterance.volume = CONF.volume; // 0 to 1
		utterance.rate = CONF.rate; // 0.1 to 10
		utterance.pitch = CONF.pitch; //0 to 2
		utterance.text = msg;
		utterance.lang = CONF.lang;
		//
		utterance.onerror = function (e) {
        	console.log("an error occured", e);
    	};
		window.speechSynthesis.speak(utterance);
	}

	return {
		init: _init,
		//speak: _speak
	}
})(window);

export default Speech;