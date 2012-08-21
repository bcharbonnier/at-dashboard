{Template {
	$classpath : "dashboard.controls.twitter.Feed",
	$extends : "dashboard.controls.Container",
	$hasScript : true
}}

{macro title()}
Twitter
{/macro}

{macro content()}

{if data.pending}
	<div class="alert-message block-message info">
		<p><strong>Downloading from Twitter ...</strong></p>
	</div>
{elseif data.error/}
	<div class="alert-message block-message error">
		<p><strong>Error while searching Twitter for ${data.searchQuery}</strong>
		<br>
		${data.error}
		</p>
	</div>
{elseif data.messages.length == 0 /}
	<div class="alert-message block-message warn">
		<p>No search results for <strong>${data.searchQuery}</strong>.</p>
		<p><a href="https://twitter.com" target="_blank">Twitt</a> about Aria Templates now.</p>
	</div>
{else /}
	<table class="zebra-striped">
	<tbody>
	{foreach message in data.messages}
		<tr>
			<td width="48px"><img class="thumbnail tweetAvatar" src="${message.profile_image_url}" alt="${message.from_user_name}" data-placement="left" data-original-title="${message.from_user_name}" /></td>
			<td>${message.text}</td>
		</tr>
	{/foreach}
	</tbody>
	</table>
{/if}
{/macro}

{macro settings()}
<div class="clearfix">
    <label for="search">Search Query : </label>
    <div class="input">
      <input name="search" {id "search"/} class="span6" type="text" value="${data.searchQuery}" />
    </div>
</div>
{/macro}
{/Template}
