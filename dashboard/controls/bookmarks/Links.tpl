{Template {
	$classpath : "dashboard.controls.bookmarks.Links",
	$extends : "dashboard.controls.Container",
	$hasScript : true,
	$css : ["dashboard.controls.bookmarks.Style", "dashboard.controls.ContainerStyle"]
}}

{macro title()}
Bookmarks
{/macro}

{macro content()}
<ul class="linkList">
	{foreach link in data.links}
		<li><a href="${link}" target="_blank">${link_index}</a></li>
	{/foreach}
</ul>
{/macro}


{macro settings()}
<form>
<h3>Add a bookmark</h3>
	<div class="clearfix" {id "clearfix_title"/}>
	    <label for="title">Title : </label>
	    <div class="input">
	      <input name="title" {id "title"/} class="span6" type="text" />
	    </div>
	</div>
	<div class="clearfix" {id "clearfix_url"/}>
	    <label for="url">Url : </label>
	    <div class="input">
	      <input name="url" {id "url"/} class="span6" type="text" />
	    </div>
	</div>
<a href="#" class="btn success" {on click {fn : addLink} /}>Add this link</a>

<h3>Remove a bookmark</h3>
{section {
	type : "ul",
	macro : "removeLinks",
	id : "removeLinks"
}/}

</form>
{/macro}


{macro removeLinks()}
	{foreach link in data.links}
	<li style="font-size: 18px; line-height: 30px">
		<a href="#" {on click {fn : removeLink, args: link_index}/} style="color: black; font-size: 20px; font-weight: bold; line-height: 13.5px; text-shadow: 0 1px 0 white; filter: alpha(opacity=25); -khtml-opacity: 0.25; -moz-opacity: 0.25; opacity: 0.25; margin-right: 12px">&times;</a>${link_index}
	</li>
	{/foreach}
{/macro}
{/Template}
