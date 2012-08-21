{Template {
	$classpath : "dashboard.controls.github.Public",
	$extends : "dashboard.controls.github.BaseGit"
}}

{macro title()}
Public website Repository
{/macro}

{macro gitContent(repo)}
	{call listCommit(getRepo("wwwpublic")) /}
{/macro}
{/Template}
