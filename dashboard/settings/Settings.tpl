{Template {
	$classpath : "dashboard.settings.Settings",
	$hasScript : true
}}

{createView controlsView on data.availableControls /}

{macro main()}

	${initView()}

	<div class="modal-header">
		<a href="#" class="close" {on click closeSettings /}>&times;</a>
		<h3>Settings</h3>
	</div>
	<div class="modal-body">
		{call modalBody () /}
	</div>
	<div class="modal-footer">
		<a href="#" class="btn primary" {on click applySettings /}>Apply</a>
	</div>

{/macro}


{macro modalBody()}
<form class="horizontal-form">
	<fieldset class="control-group sizeControl">
		<label class="control-label" for="size">Control Size</label>
		<div class="controls">
			<select name="size" {id "size"/}>
				<option value="4" {if data.settings.size == "4"}selected="selected"{/if}>4 controls per row</option>
				<option value="3" {if data.settings.size == "3"}selected="selected"{/if}>3 controls per row</option>
				<option value="2" {if data.settings.size == "2"}selected="selected"{/if}>2 controls per row</option>
				<option value="1" {if data.settings.size == "1"}selected="selected"{/if}>1 control per row</option>
			</select>
		</div>
	</fieldset>


	<legend>Controls</legend>

	{foreach control inView controlsView}
		<fieldset class="control-group">
			<label class="control-label" for="${control.name}">${control.name}</label>
			<div class="controls">
				<p>${control.desc}</p>
				{if isControlEnabled(control.name)}
					<a href="#" class="btn danger" {on click {fn : removeControl, args : control.name} /}>
						Remove <strong>${control.name}</strong> from dashboard
					</a>
				{else /}
					<a href="#" class="btn primary" {on click {fn : loadControl, args : control.name} /}>
						Add <strong>${control.name}</strong> to dashboard
					</a>
				{/if}
			</div>
		</fieldset>

	{/foreach}


	{call pagination()/}
</fieldset>
<form>
{/macro}


{macro pagination()}
<div class="pagination">
	<ul>
		<li class="prev{if controlsView.currentPageIndex === 0} disabled{/if}">
			<a href="#" {on click {fn : toPage, args: controlsView.currentPageIndex - 1} /}>Previous</a>
		</li>

		{foreach page in controlsView.pages}
			<li><a href="#" {on click {fn : toPage, args: page.pageIndex} /}>${page.pageNumber}</a></li>
		{/foreach}

		<li class="next{if controlsView.currentPageIndex === controlsView.pages.length - 1} disabled{/if}">
			<a href="#" {on click {fn : toPage, args: controlsView.currentPageIndex + 1} /}>Next</a>
		</li>
	</ul>
</div>
{/macro}
{/Template}
