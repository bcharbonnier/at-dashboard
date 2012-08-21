{Template {
	$classpath : "dashboard.controls.pinup.Image",
	$extends : "dashboard.controls.Container",
	$hasScript : true
}}
{macro title()}
Pin-up Girl
{/macro}

{macro content()}
<img src="${getImage()}" width="250px" />
{/macro}
{/Template}