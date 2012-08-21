{Template {
	$classpath : "dashboard.controls.github.BaseGit",
	$extends : "dashboard.controls.Container",
	$hasScript : true
}}

{macro content()}

{if data.pending}
	<div class="alert-message block-message info">
		<p><strong>Downloading from GitHub ...</strong></p>
	</div>
{elseif data.error/}
	<div class="alert-message block-message error">
		<p><strong>Error while contacting GitHub.</strong>
		<br>
		${data.error}
		</p>
	</div>
{else /}
	{call gitContent() /}
{/if}


{/macro}



{macro listCommit(repo)}
{if repo.error}
	<div class="alert-message block-message error">
		<p><strong>Error while getting the repository.</strong>
		<br>
		${repo.error}
		</p>
	</div>
{elseif repo.commits.length == 0 /}
	<p>No commits for <strong>${repo.name}</strong></p>
{else /}
	<table class="zebra-striped bordered-table">
	<tbody>
	{foreach commit inArray repo.commits}
		{if commit}
			<tr {on mouseenter {fn : moreDetails, args : commit.sha}/} {on mouseleave {fn : lessDetails, args : commit.sha}/}>
				<td class="span1">
					<img class="thumbnail gitAvatar" src="${commit.author.avatar_url}" alt="${commit.author.login}" width="50px" height="50px" /><br/>
					${commit.commit.author.name}
				</td>
				<td>
					<p><small class="label success">${formatDate(commit.commit.author.date)}</small></p>
					${commit.commit.message}<br />
					<div {id commit.sha /} class="hide">
						${commit.sha}<br />
						<a href="http://github.com/ariatemplates/${repo.name}/commits/${commit.sha}" target="_blank">More on GitHub</a>
					</div>
				</td>
			</tr>
		{/if}
	{/foreach}
	</tbody>
	</table>
{/if}
{/macro}
{/Template}
