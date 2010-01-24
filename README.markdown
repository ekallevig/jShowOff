Title: jShowOff: a jQuery Content Rotator Plugin

Author: Erik Kallevig

Version: 0.1.0

Download: jquery.jshowoff.bundle.zip

Website: http://ekallevig.com/jshowoff

Licence: Dual licensed under the MIT and GPL licenses.

# jShowOff: a jQuery Content Rotator

jShowOff is a jQuery plugin for creating a rotating content module. It works by creating 'slides' from all the child `<div>`'s inside a specified wrapper `<div>` (on which the call to `.jshowoff()` is invoked) and rotating through them, with options for controls, links, and more. This type of module is often used to promote pages, sections, or features on a site.

## Required Files

1.  [the jQuery Core JavaScript Library (1.3+)][1]
2.  [jquery.jshowoff.min.js][2]

To get jShowOff up and running, simply include the above files on your page, create the required slides markup and invoke the method (example below). You can use the default skin ([jshowoff.css][3]) from the demo, or restyle the elements to your liking.

## How to Use

The required markup for jShowOff is a parent `<div>` with one or more child `<div>`'s, which will be used as the 'slides'. The following is a basic example:

    <div id="features">
    	<div><p>This is a slide!</p></div>
    	<div><a href="http://google.com"><img src="http://www.google.com/intl/en_ALL/images/logo.gif" alt="Google Logo" /></a></div>
    </div>
    <script type="text/javascript">		
    	$(document).ready(function(){ $('#features').jshowoff(); });
    </script>

## Options

jShowOff currently has a few options for customization, hopefully more in the future. Pass these settings as an object to the `.jshowoff()` method like this:

    $('#features').jshowoff({ speed:1500, links: false }); });

| Property    | Type    | Default | Description                                                        |
| ----------- | ------- | ------- | ------------------------------------------------------------------ |
| speed       | integer | 3000    | Time each slide is shown in milliseconds.                          |
| changeSpeed | integer | 600     | Speed of transition in milliseconds.                               |
| controls    | boolean | true    | Whether to create & display controls (Previous, Next, Play/Pause). |
| links       | boolean | true    | Whether to create & display numeric links to each slide.           |
| autoPlay    | boolean | true    | Whether to start playing immediately.                              |

## Future Features

*   Multiple instances per page.
*   Slide captions.

## License

jShowOff is free for personal and commercial use under the [MIT/GPL license][4] used by the jQuery core libraries. Donations are appreciated, but not required (see 'Donate' button on the right). 

## Author

This plugin was written by [Erik Kallevig][5].

 [1]: http://jquery.com
 [2]: http://ekallevig.com/jshowoff/jquery.jshowoff.min.js
 [3]: http://ekallevig.com/jshowoff/jshowoff.css
 [4]: http://jquery.org/license
 [5]: http://ekallevig.com/about