{Template {
	$classpath : "dashboard.controls.github.Samples",
	$extends : "dashboard.controls.github.BaseGit"
}}

{macro title()}
Samples Repository
{/macro}

{macro gitContent(repo)}
	{call listCommit(getRepo("ariadoc")) /}
{/macro}
{/Template}
