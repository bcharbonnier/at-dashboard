{Template {
	$classpath : "dashboard.controls.gifs.Funny",
	$extends : "dashboard.controls.Container"
}}

{macro title () }
Random GIF
{/macro}

{macro content()}
{if data.pending}
	<div class="alert-message block-message info">
		<p><strong>Trying to make you laugh ...</strong></p>
	</div>
{elseif !data.image/}
	<div class="alert-message block-message error">
		<p><strong>Error downloading GIFs</strong>
		<br>
		Figure out yourself what went wrong!
		</p>
	</div>
{else /}
	<img src="${data.image}" />
{/if}
{/macro}
{/Template}
