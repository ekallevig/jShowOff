Title: jShowOff: a jQuery Content Rotator Plugin  
Author: [Erik Kallevig][5]  
Version: 0.1.2  
Website: [http://ekallevig.com/jshowoff][6]  
License: Dual licensed under the MIT and GPL licenses.

# jShowOff: a jQuery Content Rotator Plugin

jShowOff is a jQuery plugin for creating a rotating content module. It works by creating 'slides' from the child elements (eg. `<li>`) inside a specified wrapper element (eg. `<ul>`) on which `.jshowoff()` is invoked. It then rotates through the slides, with options for controls, links, and more.  This type of module is often used to promote pages, sections, or features on a site.

## Required Files

1.  [the jQuery Core JavaScript Library (1.3+)][1]
2.  [jquery.jshowoff.min.js][2]

To get jShowOff up and running, simply include the above files on your page, create the required slides markup and invoke the method (example below). You can use the default skin ([jshowoff.css][3]) from the demo, or restyle the elements to your liking.

## How to Use

The required markup for jShowOff is a parent element with one or more child elements, which are used as the 'slides'. The following is a basic example:

    <div id="features">
    	<div><p>This is a slide!</p></div>
    	<div><a href="http://google.com"><img src="http://www.google.com/intl/en_ALL/images/logo.gif" alt="Google Logo" /></a></div>
    </div>
    <script type="text/javascript">		
    	$(document).ready(function(){ $('#features').jshowoff(); });
    </script>

## Options

jShowOff has several options for customization.  Pass these settings as an object to the `.jshowoff()` method like this:

    $('#features').jshowoff({ speed:1500, links: false }); });

<table id="options" cellpadding="0" cellspacing="0">
	<col />
	<col />
	<col width="120" />
	<col />
	<tr>
		<th>Property</th>
		<th>Type</th>
		<th>Default</th>
		<th>Description</th>
	</tr>
	<tr>
		<td>animatePause</td>
		<td>boolean</td>
		<td>true</td>
		<td>Whether to use 'Pause' animation text when pausing.</td>
	</tr>
	<tr>
		<td>autoPlay</td>
		<td>boolean</td>
		<td>true</td>
		<td>Whether to start playing immediately.</td>
	</tr>
	<tr>
		<td>changeSpeed</td>
		<td>integer</td>
		<td>600</td>
		<td>Speed of transition in milliseconds.</td>
	</tr>
	<tr>
		<td>controls</td>
		<td>boolean</td>
		<td>true</td>
		<td>Whether to create & display controls (Play/Pause, Previous, Next).</td>
	</tr>
	<tr>
		<td>controlText</td>
		<td>object</td>
		<td>{ play:'Play', pause:'Pause', previous:'Previous', next:'Next' }</td>
		<td>Text to use for controls (Play/Pause, Previous, Next). For multi-language support, etc.</td>
	</tr>
	<tr>
		<td>cssClass</td>
		<td>string</td>
		<td>true</td>
		<td>Add an additional custom class to the .jshowoff wrapper.</td>
	</tr>
	<tr>
		<td>effect</td>
		<td>string</td>
		<td>'fade'</td>
		<td>Type of transition effect: 'fade', 'slideLeft' or 'none'.</td>
	</tr>
	<tr>
		<td>hoverPause</td>
		<td>boolean</td>
		<td>true</td>
		<td>Whether to pause on hover.</td>
	</tr>
	<tr>
		<td>links</td>
		<td>boolean</td>
		<td>true</td>
		<td>Whether to create & display numeric links to each slide.</td>
	</tr>
	<tr>
		<td>speed</td>
		<td>integer</td>
		<td>3000</td>
		<td>Time each slide is shown in milliseconds.</td>
	</tr>
</table>

Additionally, the value of the `title` attribute on the 'slide' elements will be inserted as the text for the corresponding 'slide link' in lieu of the default numeric value.

## Support

If you need help or if you've found a bug, please [create an issue][7] and I will investigate.

## Future Features

*   Option to show slides randomly.

## Change Log

0.1.2

*   Added `effect` option to customize transitions. Options currently include: `fade`, `slideLeft` or `none`.  Slide effect uses new global jQuery mini-plugin, `$.slideIt()`, which can be used on separately on any element.
*   Added `hoverPause` option to temporarily stop slide rotation on hover.
*   `$.jshowoff()` can now be invoked on any element and can take any child element as a 'slide'. Previously, only allowed `<div>`'s.
*   Added ability to customize slide link text via slide element's `title` attribute.
*   Added `controlText` parameter to allow custom text for controls (multi-language support, etc).
*   Added the `animatePause` option to specify whether to show the pause animation when pausing.
*   Changed a lot of dynamic markup and classes, skin CSS, and internal functions, so beware when upgrading. The plugin is still young, so it's subject to substantial change.

0.1.1

*   Added error check for `changeSpeed` set less than `speed`.
*   Added `cssClass` option to specify additional class on .jshowoff wrapper.
*   Now possible to invoke multiple instances, each with unique classes (for container, controls and links).

0.1.0

*   Initial release.

## License

jShowOff is free for personal and commercial use under the [MIT/GPL license][4] used by the jQuery core libraries. Donations are appreciated, but not required. 

## Author

This plugin was written by [Erik Kallevig][5].

 [1]: http://jquery.com
 [2]: http://github.com/ekallevig/jShowOff/raw/master/jquery.jshowoff.min.js
 [3]: http://github.com/ekallevig/jShowOff/raw/master/jshowoff.css
 [4]: http://jquery.org/license
 [5]: http://ekallevig.com/about
 [6]: http://ekallevig.com/jshowoff
 [7]: http://github.com/ekallevig/jShowOff/issues