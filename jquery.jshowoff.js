/*

Title:		jShowOff: a jQuery Content Rotator Plugin
Author:		Erik Kallevig
Version:	0.1.1
Website:	http://ekallevig.com/jshowoff
License: 	Dual licensed under the MIT and GPL licenses.

jShowOff Options

speed : 		time each slide is shown [integer, milliseconds, defaults to 3000]
changeSpeed : 	speed of transition [integer, milliseconds, defaults to 600]
controls : 		whether to create & display controls (Previous, Next, Play/Pause) [boolean, defaults to true]
links : 		whether to create & display numeric links to each slide [boolean, defaults to true]
autoPlay : 		whether to start playing immediately [boolean, defaults to true]
cssClass :		custom class to add to .jshowoff wrapper [string]

*/

(function($) {


	$.fn.jshowoff = function(settings) {

		// default variable values
		var config = {
			speed : 3000,
			changeSpeed : 600,
			controls : true,
			links : true,
			autoPlay : true
		};
		
		// merge default variables with custom variables, modifying 'config'
		if (settings) $.extend(config, settings);

		// make sure speed is at least 20ms longer than changeSpeed
		if (config.speed < (config.changeSpeed+20)) {
			alert('jShowOff: Make speed at least 20ms longer than changeSpeed; the fades aren\'t always right on time.');
			return this;
		};
		
		// create slideshow for each matching element invoked by jshowoff()
		this.each(function(i) {
			
			// invoke variables
			var cont = this;
			var gallery = $(this).children('div').remove();
			var timer = '';
			var counter = 0;
			var preloaded = [];
			var howManyInstances = $('.jshowoff').length+1;
			var cssClass = config.cssClass !== undefined ? 'jshowoff-custom-'+howManyInstances+' '+config.cssClass : 'jshowoff-'+howManyInstances;
			var uniqueClass = cssClass.split(' ')[0];
			
			// set up rotator and start playing
			function start() {
				
				// add .jshowoff wrapper inside container
				$(cont).css('position','relative').append('<div class="jshowoff '+cssClass+'"></div>');
				
				// copy slides, then add to wrapper
				$(gallery[0]).clone().appendTo('.'+uniqueClass);
				
				// preload slide images
				preload();
				
				// add controls
				if(config.controls){ addControls(); if(config.autoPlay==false){ $('.'+uniqueClass+'-play').addClass(uniqueClass+'-paused jshowoff-paused').text('Play'); } }
				
				// add links
				if(config.links){ addLinks(); $('.'+uniqueClass+'-slidelinks a').eq(0).addClass(uniqueClass+'-active jshowoff-active'); }
				
				// load slides into hidden 'cache' div
				$('<div class="'+uniqueClass+'-cache jshowoff-cache"></div>').appendTo(cont);
				$(gallery).each(function(){$(this).appendTo($('.'+uniqueClass+'-cache')).hide();});
				
				// determine autoPlay
				if(config.autoPlay && gallery.length>1) { timer = setTimeout( function(){play();}, config.speed ); };
				
				// display error message if no slides present
				if(gallery.length<1){ $('.'+uniqueClass).append('<p>For jShowOff to work, the container element must have child divs.</p>'); }
			};
			
			// utility for loading 'slides'
			function transitionTo(gallery,index) {
				if((counter >= gallery.length) || (index >= gallery.length)) { counter = 0; }
				else if((counter < 0) || (index < 0)) { counter = gallery.length-1; }
				else { counter = index; }
				$(gallery[counter]).clone().appendTo('.'+uniqueClass).hide().fadeIn(config.changeSpeed);
				if($('.'+uniqueClass+' div').length>1){
					$('.'+uniqueClass+' div:first').css('position','absolute').fadeOut(config.changeSpeed,function(){$(this).remove();});
				};
				
				// update active class on slide link
				if(config.links){
					$('.'+uniqueClass+'-active').removeClass(uniqueClass+'-active jshowoff-active');
					$('.'+uniqueClass+'-slidelinks a').eq(counter).addClass(uniqueClass+'-active jshowoff-active');
				}
			};
			
			// generate and add play/pause, prev, next controls
			function addControls() {
				$(cont).append('<p class="jshowoff-controls '+uniqueClass+'-controls"><a class="jshowoff-play '+uniqueClass+'-play" href="#null">Pause</a> <a class="jshowoff-prev '+uniqueClass+'-prev" href="#null">Previous</a> <a class="jshowoff-next '+uniqueClass+'-next" href="#null">Next</a></p>');
				$('.'+uniqueClass+'-controls a').each(function(){

						if($(this).hasClass('jshowoff-play')) $(this).click(function(){ updatePlayPause(); return false; } );
						if($(this).hasClass('jshowoff-prev')) $(this).click(function(){ previous(); return false; });
						if($(this).hasClass('jshowoff-next')) $(this).click(function(){ next(); return false; });
	
				});
			};

			// modify play/pause button text/event depending on state
			function updatePlayPause() {
				if(isPlaying()){ pause(); $('.'+uniqueClass+'-play').text('Play').toggleClass('jshowoff-paused '+uniqueClass+'-paused'); }
				else { play(); $('.'+uniqueClass+'-play').text('Pause').toggleClass('jshowoff-paused '+uniqueClass+'-paused'); };
			};
			
			// is the rotator currently in 'play' mode
			function isPlaying(){
				if($('.'+uniqueClass+'-play').hasClass('jshowoff-paused')){ return false; }
				else { return true; };
			};
			
			// start rotating slides on a specified interval
			function play() {
				if(!isBusy()){
					counter++;
					transitionTo(gallery,counter);
					clearTimeout(timer);
					timer = setTimeout(function(){ play(gallery); },config.speed);
				}
			};
			
			// stop auto rotation & invoke pause animation
			function pause() {
				clearTimeout(timer);
				$('<p class="'+uniqueClass+'-pausetext">Pause</p>').css({ fontSize:'62%', color:'#fff', textAlign:'center', position:'absolute', top:'40%', lineHeight:'100%', width:'100%' }).appendTo('.'+uniqueClass).animate({ fontSize:'600%', top:'30%', opacity:0 }, {duration:400,complete:function(){$(this).remove();}});
			};
			
			// stop auto rotation
			function stopit() {
				clearTimeout(timer);
			};
			
			// load the next slide
			function next() {
				goToAndPause(counter+1);
			};
		
			// load the previous slide
			function previous() {
				goToAndPause(counter-1);
			};
			
			
			// is the rotator in mid-transition
			function isBusy() {
				return $('.'+uniqueClass+' div').length>1 ? true : false;
			};
			
			// load a specific slide
			function goToAndPause(index) {
				$('.'+uniqueClass+' div').stop(true);
				stopit();
				$('.'+uniqueClass+'-play').text('Play').addClass('jshowoff-paused '+uniqueClass+'-paused');
				if((counter != index) || ((counter == index) && isBusy())){
					if(isBusy()) $('.'+uniqueClass+' div:first').remove();
					transitionTo(gallery,index);
				}
			};
			
			// generate and add slide links
			function addLinks() {
				$(cont).append('<p class="jshowoff-slidelinks '+uniqueClass+'-slidelinks"></p>');
				$.each(gallery, function(i, val) {
					$('<a class="jshowoff-slidelink-'+i+' '+uniqueClass+'-slidelink-'+i+'" href="#null">'+(i+1)+'</a>').bind('click', {index:i}, function(e){ goToAndPause(e.data.index); return false; }).appendTo('.'+uniqueClass+'-slidelinks');
				});
			};			

			function preload() {
				$(gallery).each(function(i){
					$(this).find('img').each(function(i){
						preloaded[i] = $('<img>').attr('src',$(this).attr('src'));					
					});
				});
			};
			
			start();	
	
	
	
		// end .each
		});
	
		return this;

	// end .jshowoff
	};

// end closure
})(jQuery);