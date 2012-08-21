{Template {
	$classpath : "dashboard.controls.github.News",
	$extends : "dashboard.controls.github.BaseGit",
	$hasScript : true
}}

{macro title()}
AriaTemplates on GitHub
{/macro}

{macro gitContent()}
	<table>
	<tbody>
	{foreach repo inArray data.repos}
		<tr>
			<td class="gitRepoName">
				<strong><a href="${repo.html_url}" target="_blank">${repo.name}</a></strong><br />
				${repo.watchers} watchers, ${repo.forks} forks
			</td>
			<td>
				${repo.description}<br /><br />
				{if repo.commits.length > 0}
					<span class="label important">Latest Commit</span>
					{call latestCommits(repo.commits, 1)/}
				{/if}
			</td>
		</tr>
	{/foreach}
	</tbody>
	</table>
{/macro}


{macro latestCommits(commits, max)}
	{set max = max || 10 /}


	<table>
		<tbody>
			{for i = 0; i < max; i += 1}
				{var comm = commits[i] /}
				{if comm}
				<tr>
					<td>
						<img class="thumbnail gitAvatar" src="${comm.author.avatar_url}" alt="${comm.author.login}" width="50px" height="50px" /><br/>
						${comm.commit.author.name}
					</td>
					<td>
						${comm.commit.message}<br />
						<small>&mdash; ${formatDate(comm.commit.author.date)}</small>
					</td>
				</tr>
				{/if}
			{/for}


		</tbody>
	</table>
{/macro}
{/Template}
