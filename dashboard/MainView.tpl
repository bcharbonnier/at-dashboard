{Template {
	$classpath : "dashboard.MainView",
	$dependencies : ["aria.utils.Function"],
	$hasScript : true,
	$css : ["dashboard.MainStyle"],
	$width : {
		min : 320
	}
}}

{macro main()}

	{call topbar()/}

	{call updates()/}

	{section {
		id : "controlsContainer",
		macro : "container",
		type : "div"
	}/}

	<div id="globalSettings" class="modal hide fade">
	{@aria:Template {
		defaultTemplate : "dashboard.settings.Settings",
		block : true
	}/}
	</div>
{/macro}


{macro topbar()}
	<div class="navbar">
	 	<div class="navbar-inner">
			<div class="fluid-container">
				<a class="brand" href="#">\{Aria Templates\} Open Source Dashboard</a>
				<p class="pull-right"><a href="#" {on click {fn: settings}/}>Settings</a></p>
			</div>
		</div>
	</div>
{/macro}


{macro container()}

	{if data.settings.loaded.length === 0}
		{call welcomePage()/}
	{else/}
		{foreach tplKey inArray data.settings.loaded}
			<div class="controlContainer" style="width:${computeWidth(320, data.settings.size)}px;">

		      	{var desc = moduleCtrl.getDescription(tplKey) /}
		      	{if desc}
		      		{@aria:Template {
		      			defaultTemplate : desc.tpl,
		      			moduleCtrl : {
						classpath : desc.mctrl || "dashboard.controls.ContainerController",
						constructorArgs : {
							name : tplKey,
							desc : desc.desc,
							settings : {
								load : aria.utils.Function.bind(moduleCtrl.loadLocalSettings, moduleCtrl, tplKey),
								save : aria.utils.Function.bind(moduleCtrl.saveLocalSettings, moduleCtrl, tplKey)
							}
						}
					},
					block : true
				}/}
			{/if}

			</div>
		{/foreach}

	{/if}
{/macro}


{macro welcomePage()}
<div class="hero-unit">
	<h1>Take back control!</h1>
	<p>With the Aria Templates dashboard you can effortlessly control what matters most to you.</p>
	<p>You can choose your own page layout and load your favourite <strong>controls</strong> to get all the info you want in a single page.</p>
	<p>Try now the following controls</p>
	<dl>
		<dt>Bookmarks</dt>
		<dd>Most useful Aria Templates website</dd>

		<dt>Count Down</dt>
		<dd>Sprint summary information</dd>

		<dt>Git Hub</dt>
		<dd>Feeds about Aria Templates organization and projects.</dd>

		<dt>Twitter</dt>
		<dd>What twitter says about us.</dd>

		<dt>More</dt>
		<dd>Create your own controls. <a href="https://github.com/piuccio/Dashboard" target="_blank">Learn how</a> on GitHub.</dd>
	</dl>
	<p><a class="btn primary large" {on click {fn: settings}/}>Start now »</a></p>
</div>
{/macro}


{macro updates()}
{if data.updates.length > 0}
<div class="alert info-alert" {id "updatesPlaceholder"/}>
<strong>Recent updates</strong>
<ul>
	{foreach news inArray data.updates}
	<li>${news.when} - ${news.what}</li>
	{/foreach}
</ul>
<a href="#" class="btn primary" {on click dismissUpdates/}>Dismiss</a>
</div>
{/if}
{/macro}

{/Template}
