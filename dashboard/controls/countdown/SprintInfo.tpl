{Template {
	$classpath : "dashboard.controls.countdown.SprintInfo",
	$extends : "dashboard.controls.Container"
}}

{macro content()}
<table>
	<tbody>
		<tr>
			<td>Sprint</td>
			<td>${data.sprint}</td>
		</tr>
		<tr>
			<td>Start</td>
			<td>${data.start}</td>
		</tr>
		<tr>
			<td>End</td>
			<td><strong>${data.end}</strong>, week ${data.week}</td>
		</tr>
		<tr>
			<td>Code Freeze</td>
			<td>${data.freeze}</td>
		</tr>

		<tr>
			<td>Release Master</td>
			<td>${data.master}</td>
		</tr>

		<tr>
            <td>Support candidates</td>
            <td>
                {foreach person in data.candidates}
                    ${person.name} : ${person.weeks} weeks<br>
                {/foreach}
            </td>
        </tr>

        <tr>
            <td>Alternative Masters</td>
            <td>
                {foreach person inArray data.couple}
                    ${person}<br>
                {/foreach}
            </td>
        </tr>
	</tbody>
</table>
{/macro}

{macro title()}
Sprint ${data.sprint} Info
{/macro}
{/Template}
