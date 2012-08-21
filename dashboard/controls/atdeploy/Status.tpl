{Template {
	$classpath : "dashboard.controls.atdeploy.Status",
    $extends : "dashboard.controls.Container",
    $dependencies : ["aria.utils.Date"],
    $hasScript : true
}}

{macro title()}
nceariap1 Deploy
{/macro}

{macro content()}

{if data.pending}
	<div class="alert-message block-message info">
		<p><strong>Downloading from server ...</strong></p>
	</div>
{elseif data.status.error/}
	{call displayError() /}
{else /}
	{call displaySuccess() /}
{/if}

{/macro}

{macro displayError() }
<div class="alert-message block-message error">
	<p>Deploy <strong>error</strong> on ${data.who} - ${data.when}.</p>
	<br />
	<pre>
		${data.status.errorMsg}
	</pre>
</div>
{/macro}

{macro displaySuccess()}
<div class="alert-message block-message success">
	<p>Deploy <strong>success</strong> on ${data.status.who} - ${data.status.when|dateformat:"MMM dd yyyy"}.</p>
</div>
{/macro}

{macro settings()}
<form class="horizontal-form">
	<fieldset class="control-group whoControl">
		<label class="control-label" for="who">Server</label>
		<div class="controls">
			<select name="who" {id "who"/}>
				<option value="DAVE" {if data.who == "dave"}selected="selected"{/if}>DAVE</option>
				<option value="DEV" {if data.who == "dev"}selected="selected"{/if}>DEV</option>
				<option value="DEMO" {if data.who == "demo"}selected="selected"{/if}>DEMO</option>
			</select>
			<p class="help-text">Remember that only DAVE is deployed on a daily basis!</p>
		</div>
	</fieldset>

	<fieldset class="control-group whenControl">
		<label class="control-label" for="when">Date</label>
		<div class="controls">
			{@aria:DatePicker {
				bind : {
					value : {
						inside : data,
						to : "when"
					}
				},
				maxValue : new Date(),
				calendarNumberOfUnits : 1
			}/}
		</div>
	</fieldset>
<form>
{/macro}
{/Template}