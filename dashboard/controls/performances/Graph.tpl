{Template {
	$classpath : "dashboard.controls.performances.Graph",
	$extends : "dashboard.controls.Container",
	$hasScript : true
}}

{macro title()}
Performance Report
{/macro}

{macro content()}
{section {
	id : "mainContainer",
	macro : "wholeContent",
	bindRefreshTo : [{
		inside : data,
		to : "pending"
	}]
}/}
{/macro}

{macro wholeContent()}

{if data.pending}
	<div class="alert-message block-message info">
		<p><strong>Drawing...</strong></p>
	</div>
{elseif data.error || data.lines.length === 0 /}
	<div class="alert-message block-message error">
		<p><strong>Couldn't get what you're looking for. Sorry :(</strong></p>
	</div>
{else /}
	{@aria:Select {
		options : optionsForSelect(),
		onchange : switchView,
		label : "Select a chart : ",
		width : 300,
		labelWidth : 100,
		bind : {
			value : {
				inside : data,
				to : "view:visibleOption"
			}
		}
	}/}

	<div id="graphContainer"></div>
{/if}
{/macro}
{/Template}