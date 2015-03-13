# Introduction #
Well this is one simple example, taken from my other project uoogle
(Google search API)




&lt;html&gt;


> 

&lt;head&gt;



> 

&lt;title&gt;

Google AJAX API Search

&lt;/title&gt;



> 

&lt;script type="text/javascript" src="resources/js/yaguajax.js"&gt;



&lt;/script&gt;



> 

&lt;script type="text/javascript"&gt;



> function loadSearch (term) {

> var elm  = document.getElementById('_search');
> elm.innerHTML = '';_

> var yagu = new yaguajax();
> yagu.target('_search');
> yagu.addVar('term',term.value);_

> yagu.simpleRequest('results.php','POST');

> }

> 

&lt;/script&gt;



> 

&lt;/head&gt;



> 

&lt;body&gt;



> 

&lt;form action="results.php" method="GET"&gt;


> > 

&lt;input type="text" name="q"&gt;


> > 

&lt;input type="submit" value="Go"&gt;



> 

Unknown end tag for &lt;/form&gt;



> <div></div>

> 

Unknown end tag for &lt;/body&gt;





Unknown end tag for &lt;/html&gt;





# Details #

**bold More exampels to come soon, im sorry im out of time right now ^^**bold Oh and im sorry im not such a wiki fan, i have to put myself upto date with this :)