Aria.tplScriptDefinition({
	$classpath : "dashboard.controls.pinup.ImageScript",
	$prototype : {
		_images : ["blonde.jpg",
			"Dancing Record.jpg",
			"degree.jpg",
			"elv09316.jpg",
			"elv66001.jpg",
			"elv69001.jpg",
			"flowers.jpg",
			"fly.jpg",
			"gil-elvgren-pinup_6.jpg",
			"midway.jpg",
			"pinup-1652.jpg",
			"pinupgallery11.jpg",
			"pinupgallery3.jpg",
			"pinupgallery9.jpg",
			"pinup_girls_2.jpg",
			"pinup_girls_3.jpg",
			"pinup_girls_7.jpg",
			"pin-up.jpg",
			"pinups.jpg",
			"sailor.jpg",
			"vaughanbasspinupgirlwithtowel.jpg",
			"whatispinup1.jpg"
		],

		getImage : function () {
			var id = Math.floor(Math.random() * this._images.length + 1) % this._images.length;
			return this.$package.replace(/\./g, "/") + "/images/" + this._images[id];
		}
	}
});