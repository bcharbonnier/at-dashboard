{Template {
	$classpath : "dashboard.controls.github.AriaTemplates",
	$extends : "dashboard.controls.github.BaseGit"
}}

{macro title()}
AriaTemplates Repository
{/macro}

{macro gitContent(repo)}
	{call listCommit(getRepo("ariatemplates")) /}
{/macro}
{/Template}
