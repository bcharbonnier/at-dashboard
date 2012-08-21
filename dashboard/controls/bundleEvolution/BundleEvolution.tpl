{Template {
	$classpath : "dashboard.controls.bundleEvolution.BundleEvolution",
    $extends : "dashboard.controls.Container",
    $hasScript : true,
	$css : ["dashboard.controls.bundleEvolution.BundleEvolutionCSS", "dashboard.controls.ContainerStyle"]
}}

{macro title()}
Bundle Evolution
{/macro}

{macro content()}
	{section {
		id : "chartContainer",
		bindRefreshTo : [{
			to : "pending",
			inside : data
		}],
		attributes : {
			classList : ["chart-container"]
		},
		type : "DIV",
		macro : "displayChart"
	}/}
{/macro}

{macro displayChart()}
{if data.pending}
    <div class="alert-message block-message info">
        <p><strong>Measuring the bundles...</strong></p>
    </div>
{elseif data.error /}
    <div class="alert-message block-message error">
        <p><strong>An error occurred while downloading the bundle's measures.</strong></p>
    </div>
{else /}
    <table>
        <thead>
            <tr>
                <th>Version</th>
                {foreach bundle inArray data.stats.bundleNames}
                    <th>${bundle}</th>
                {/foreach}
            </tr>
        </thead>
        <tbody>
            {foreach version inArray data.stats.data}
                <tr>
                    <th>${version.name}</th>
                    {foreach bundle inArray version.data}
                        <td>${bundle}</td>
                    {/foreach}
                </tr>
            {/foreach}
        </tbody>
    </table>
    <div id="bundleEvolutionContainer"></div>
{/if}
{/macro}

{/Template}