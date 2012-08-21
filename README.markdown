Aria Templates Dashboard
========================

Aria Templates Dashboard ia simple GridView web application using [Aria Templates](http://ariatemplates.com), [jQuery](http://jquery.com/) and [Bootstrap](http://twitter.github.com/bootstrap). Every cell (aka control) is a standalone Aria Templates module that allows you to gather information from different sources in one place.

Usage
=====

Clone the project and open index.html in your browser

Develop your own control
========================

Control's definition
--------------------

The list of available controls is inside `dashboard.MainController`. The control is described by the object

	{
		tpl : "template classpath of your control",
		mctrl : "optional module controller for your control",
		desc : "Description of you control, available in settings and info popover."
	}


If not specified, the default module controller for the control's template is `dashboard.controls.ContainerController`.

Template
--------

Every control must extend from the base template class `dashboard.controls.Container`. This class provides

* Drag & Drop
* Settings modal dialog
* Automatic refresh

A very basic template looks like this

	{Template {
		$classpath : "MyNewControl",
		$extends : "dashboard.controls.Container"
	}}
	
	{macro title()}
		Control's Title
	{/macro}
	
	{macro content()}
		Control's content.
	{/macro}
	
	{macro settings()}
		Control's settings.
	{/macro}
	{/Template}


The `content` macro by default has an automatic refresh binding to `data.loading`.

Module Controller
-----------------

A module controller is optional, but it's needed if you want to populate your datamodel from the Internet, save/load settings to localStorage or if you want to have a better separation of the logic behind your control's template.

If you define your own module controller make sure to extend from `dashboard.controls.ContainerController`.

ContainerController gives you helper methods to refresh the control's template and save/load settings.

A module controller looks like this

	Aria.classDefinition({
		$classpath : "MyModuleController",
		$extends : "dashboard.controls.ContainerController",
		$prototype : {
			init : function (evt, callback) {
				//Build the datamodel
				this._data = {
					myVar : "something",
					settings : this.settings.load() // loading the settings
				};
	
				this.$callback(callback);
			}
		}
	});


The object `this.settings` is inherited by the parent Module Controller and provides an easy way to load and save an object to localStorage.

The Module Controller can invalidate the view and force a Template refresh by raising the event `refresh`.

	this.$raiseEvent("refresh");

Settings
--------

A click on wrench icon next to control's title opens a settings dialog. The content of the dialog is taken calling the macro `settings`.
In this macro you can configure through widgets and/or bindings the control's datamodel as you prefer.

When the user clicks on _Apply_ button, the function `saveSettings` of your control's template script is called. Override this function to implement your own logic and call `this.moduleCtrl.saveSettings(mySettings)`.
saveSettings on the module controller stores the configuration object into localStorage and trigger a refresh of the control's template.

A sample of the template script looks like this

	Aria.tplScriptDefinition({
		$classpath : "MyNewControlScript",
		$prototype : {
			saveSettings : function () {
				this.moduleCtrl.saveSettings(this.data.settings);
			}
		}
	});


Refresh
-------

A click on refresh icon next to control's title triggers a template refresh and calls the function `contentRefresh` on the module controller if present.

If a control accesses resources from the Internet, it's possible to override `contentRefresh` on the module controller to update these resources and then triggering a template refresh.

