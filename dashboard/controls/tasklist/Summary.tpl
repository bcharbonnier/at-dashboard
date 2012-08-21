{Template {
	$classpath : "dashboard.controls.tasklist.Summary",
	$extends : "dashboard.controls.Container",
	$hasScript : true
}}
{macro title()}
Tasklist
{/macro}

{macro content()}
{if data.loading}
	Loading tasks from the Internet, please wait.
{elseif data.error /}
	{call diplayError(data.error)/}
{elseif data.tasks.length == 0 /}
	No tasks yet. You can create them from the Settings.
{else/}
	{section {
		type : "ul",
		id : "tasksContent",
		macro : "tasksContent",
		bindRefreshTo : [{
			inside : data,
			to : "tasks"
		}, {
			inside : data,
			to : "view:task"
		}]
	}/}
{/if}
{/macro}

{macro diplayError(error)}
<div class="alert-message block-message error">
	<p><strong>Database Communication Error</strong></p>
	<br>
	{if aria.utils.Type.isString(error)}
		<p>${error}</p>
	{else/}
		<pre>${aria.utils.Json.convertToJsonString(error, {indent : "&nbsp;&nbsp;&nbsp;"})}</pre>
	{/if}
	
</div>
{/macro}


{macro tasksContent()}

{if data["view:task"]}
	<ul class="breadcrumb">
		{if data["view:task"]}
		<li>
			<a href="#" {on click navigate /}>All Tasks</a> <span class="divider">/</span>
		</li>
		<li class="active">${data["view:task"].name}</li>
		{else /}
		<li class="active">All Tasks</li>
		{/if}
	</ul>
	{call tasksListContent(data["view:task"].subtasks, false) /}
{else /}
	{call tasksListContent(data.tasks, true) /}
{/if}
{/macro}

{macro tasksListContent(allTasks, nested)}
{foreach task inArray allTasks}
	<li>
		{if task.subtasks.length > 0}
			<a href="#" {on click {fn : navigate, args : task}/}>
			<h3>
			${task.name}
			<span style="margin-left:3em; font-size:80%; color:#ccc">${task.subtasks.length} sub-tasks</span>
			</h3>
			</a>
		
			{var percentage = percentageComplete(task)/}
			{if percentage != null}
				<div class="progress striped{if percentage < 50} danger{else /} success{/if}" style="margin:5px 20px 20px">
					<div class="bar" style="width: ${percentage}%;"></div>
				</div>
			{else /}
				<div class="progress danger striped" style="margin:5px 20px 20px">
					<div class="bar" style="width: 100%;"></div>
				</div>
			{/if}
		{else /}
			<h3>${task.name}</h3>
			
			<div class="progress striped{if task.complete} success{else /} danger{/if}" style="margin:5px 20px 20px">
				<div class="bar" style="width: {if task.complete}100{else/}5{/if}%;"></div>
			</div>
		{/if}
	</li>
{/foreach}
{/macro}



{macro settings ()}
{section {
	type : "ul",
	id : "tasksSettings",
	macro : "tasksSettings",
	bindRefreshTo : [{
		inside : data,
		to : "tasks"
	}, {
		inside : data,
		to : "loading"
	}, {
		inside : data,
		to : "view:settingtask"
	}, {
		inside : data,
		to : "settingsError"
	}]
}/}
{/macro}

{macro tasksSettings()}
{if data.loading}
	Waiting for server response...
{elseif data.settingsError /}
	{call diplayError(data.settingsError)/}
	<br />
	<a href="#" {on click backSettings /}>Back</a>
{else /}

	{if data["view:settingtask"]}
		<ul class="breadcrumb">
			{if data["view:settingtask"]}
			<li>
				<a href="#" {on click navigateSettings /}>All Tasks</a> <span class="divider">/</span>
			</li>
			<li class="active">${data["view:settingtask"].name}</li>
			{else /}
			<li class="active">All Tasks</li>
			{/if}
		</ul>
		{call tasksListSettings(data["view:settingtask"].subtasks) /}
	{else /}
		{call tasksListSettings(data.tasks) /}
	{/if}
{/if}
{/macro}

{macro tasksListSettings(allTasks)}
{var nestedLink = !data["view:settingtask"]/}

<table>
<tbody style="font-size: 20px;">
{foreach task inArray allTasks}
	<tr>
		//close icon
		<td>
			<a href="#" {on click {fn : remove, args: task}/} style="color: black; font-size: 20px; font-weight: bold; line-height: 13.5px; text-shadow: 0 1px 0 white; filter: alpha(opacity=25); -khtml-opacity: 0.25; -moz-opacity: 0.25; opacity: 0.25; margin-right: 12px">&times;</a>
		</td>

		//task name
		<td>
			{if nestedLink}<a href="#" {on click {fn : navigateSettings, args : task}/}>{/if}
			${task.name}
			{if nestedLink}</a>{/if}
		</td>

		//toggle complete
		<td>
			{if !nestedLink}
				<span style="font-size:80%; color:#ccc">set 
				<a href="#" {on click {fn : toggleComplete, args : task}/}>
				{if task.complete}pending{else /}complete{/if}
				</a></span>
			{/if}
		</td>
	</tr>
{/foreach}
</tbody>
</table>

{section {
	id : "newTaskSection",
	keyMap : [{
            key : "Enter",
            callback : {
                fn : newTask,
                scope : this
            }
        }]
}}
<input type="text" {id "newTask" /} placeholder="New Task{if data["view:settingtask"]} - ${data["view:settingtask"].name}{/if}">
{/section}
{/macro}
{/Template}
