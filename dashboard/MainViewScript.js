Aria.tplScriptDefinition({
	$classpath : "dashboard.MainViewScript",
	$dependencies : ["aria.utils.Dom"],
	$prototype : {

		$displayReady : function () {
			$(".modalSettings").modal({
				backdrop : "static",
				show : false
			});
	
			var tplCtxt = this;
			
			$(".draggable .ui-icon-wrench, .draggable .ui-icon-refresh").twipsy();
			$(".draggable").draggable({distance : 30, helper : "clone", opacity: 0.6, handle : "h4", cursor : "move"});
			$(".droppable").droppable({
				drop : function (evt, ui) {
					$(this).removeClass("drop-over");
					tplCtxt.moduleCtrl.moveControls($(ui.draggable).parent().data().tplkey, $(this).data().tplkey);
				},
				over : function (evt, ui) {
					$(this).addClass("drop-over");
				},
				out : function (evt, ui) {
					$(this).removeClass("drop-over");
				}
			});

			
			$(".draggable .ui-icon-help").each(function (i, el) {
				$(el).popover({
					placement : "below",
					html : true
				});
			});
		},

		settings : function (evt) {
			evt.preventDefault(true);

			$("#globalSettings").modal("show");
		},
		
		onModuleEvent : function (evt) {
			if (evt.name == "settingsChanged") {
				this.$refresh({
					outputSection : "controlsContainer"
				});
			}
		},

		computeWidth : function (tplSize, cols) {
			var size = aria.utils.Dom.getFullPageSize();
			if (size.width < 480) {
				cols = 1;
			} else if (size.width < 640) {
				if (cols > 2) {
					cols = 2;
				}
			}
			//add 20 px margins (per column)
			return this.$hdim((tplSize - 40 * cols) / cols, 1 / cols);
		},

		dismissUpdates : function (evt) {
			evt.preventDefault(true);
			
			// Don't call a full refresh, for now simply hide the placeholder
			this.$getElementById("updatesPlaceholder").classList.setClassName("hide");

			this.moduleCtrl.updateLastVisit();
		}
	}
});
