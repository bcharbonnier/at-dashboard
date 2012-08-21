Aria.tplScriptDefinition({
	$classpath : "dashboard.controls.github.NewsScript",
	$prototype : {
		$afterRefresh : function () {
			$(".gitAvatar").twipsy();
		}
	}
});
