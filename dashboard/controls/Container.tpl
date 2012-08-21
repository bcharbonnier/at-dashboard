{Template {
	$classpath : "dashboard.controls.Container",
	$hasScript : true,
	$css : ["dashboard.controls.ContainerStyle"],
	$dependencies : ["aria.utils.String"]
}}

{macro main()}
{var tplKey = moduleCtrl.getKey() /}
<div class="droppable" data-tplKey="${tplKey}">
	<div class="draggable">
		<h4 class="alert-message info" {on mouseenter {fn : __hideIcons, args : false} /} {on mouseleave {fn : __hideIcons, args : true} /}>
			{call title() /}
			<span class="hide" {id "hideIcons" /}>
				<span class="ui-icon ui-icon-help" 
					data-original-title="Info"
					data-content="${aria.utils.String.encodeForQuotedHTMLAttribute(moduleCtrl.getDesc())}"></span>
				<span class="ui-icon ui-icon-wrench" data-original-title="Settings" {on click {fn : __settings, args : tplKey}/}></span>
				<span class="ui-icon ui-icon-refresh" data-original-title="Refresh" {on click {fn : contentRefresh}/}></span>
			</span>
		</h4>
		
		{section {
			id : "contentSection",
			macro : "content",
			bindRefreshTo : [
				{inside : data, to : "loading"}
			]
		}/}
	</div>
</div>


// Settings
<div class="modalSettings modal hide fade" id="settings_${tplKey}">
	<div class="modal-header">
		<a href="#" class="close" {on click {fn : __closeSettings, args : tplKey} /}>&times;</a>
		<h3>Settings</h3>
	</div>
	<div class="modal-body">
		{call settings()/}
	</div>
	<div class="modal-footer">
		<a href="#" class="btn primary" {on click {fn : __applySettings, args : tplKey} /}>Apply</a>
	</div>
</div>
{/macro}


{macro title()}
${moduleCtrl.getKey()}
{/macro}

{macro content()}
${moduleCtrl.getDesc()}
{/macro}

{macro settings()}
Sorry dude, nothing to configure.
{/macro}
{/Template}
