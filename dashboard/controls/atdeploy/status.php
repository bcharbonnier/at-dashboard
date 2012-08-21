<?php
// This file goes on the server !
$baseFileName = "./updateAndDeploy_AriaTemplates";
// Just to avoid bad stuff
switch ($_GET["who"]) {
	case "DEV":
	case "dev":
		$who = "DEV";
		break;
	case "DEMO":
	case "demo":
		$who = "DEMO";
		break;
	default:
		$who = "DAVE";
		break;
}

if (isset($_GET["when"]) && preg_match("/^\d{8}$/", $_GET["when"])) {
	$when =$_GET["when"];
} else {
	$when = date("Ydm");
}

$filename = $baseFileName . $who . "_" . $when . ".log";

$message = array("when" => $when, "errorMsg" => "", "who" => $who);

if (file_exists($filename)) {
	$message["when"] = date("c", filemtime($filename));
	$lines = file($filename);
	$hasError = false;
	foreach($lines as $line) {
		if (stripos($line, "[trycatch]") !== false) {
			$hasError = true;
			$message["errorMsg"] .= $line;
		}
	}
	$message["error"] = $hasError;
	$displayDate = date("r", filemtime($filename));
} else {
	$message["error"] = true;
	$message["errorMsg"] = "File " . $filename . " missing";
	$displayDate = $when;
}

if (isset($_GET["callback"])) {
	header("Content-type: application/javascript");
	echo $_GET["callback"] . "(" . json_encode($message) . ")";
} else {
	if ($message["error"]) {
		echo <<<END
		<div style="
  position: relative;
  padding: 7px 15px;
  margin-bottom: 18px;
  color: #404040;
  background-color: #eedc94;
  background-repeat: repeat-x;
  background-image: -khtml-gradient(linear, left top, left bottom, from(#fceec1), to(#eedc94));
  background-image: -moz-linear-gradient(top, #fceec1, #eedc94);
  background-image: -ms-linear-gradient(top, #fceec1, #eedc94);
  background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #fceec1), color-stop(100%, #eedc94));
  background-image: -webkit-linear-gradient(top, #fceec1, #eedc94);
  background-image: -o-linear-gradient(top, #fceec1, #eedc94);
  background-image: linear-gradient(top, #fceec1, #eedc94);
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#fceec1', endColorstr='#eedc94', GradientType=0);
  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.25);
  border-color: #eedc94 #eedc94 #e4c652;
  border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25);
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.5);
  border-width: 1px;
  border-style: solid;
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  border-radius: 4px;
  -webkit-box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.25);
  -moz-box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.25);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.25);
  background-color: #c43c35;
  background-repeat: repeat-x;
  background-image: -khtml-gradient(linear, left top, left bottom, from(#ee5f5b), to(#c43c35));
  background-image: -moz-linear-gradient(top, #ee5f5b, #c43c35);
  background-image: -ms-linear-gradient(top, #ee5f5b, #c43c35);
  background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #ee5f5b), color-stop(100%, #c43c35));
  background-image: -webkit-linear-gradient(top, #ee5f5b, #c43c35);
  background-image: -o-linear-gradient(top, #ee5f5b, #c43c35);
  background-image: linear-gradient(top, #ee5f5b, #c43c35);
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ee5f5b', endColorstr='#c43c35', GradientType=0);
  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.25);
  border-color: #c43c35 #c43c35 #882a25;
  border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25);">
			<p style="color:white;"><strong>$message[who]</strong> - Deploy failed on $message[when].</p>
		</div>
		<pre>
$message[errorMsg]
		</pre>
END;
	} else {
		echo <<<END
			<div style="
  position: relative;
  padding: 7px 15px;
  margin-bottom: 18px;
  color: #404040;
  background-color: #eedc94;
  background-repeat: repeat-x;
  background-image: -khtml-gradient(linear, left top, left bottom, from(#fceec1), to(#eedc94));
  background-image: -moz-linear-gradient(top, #fceec1, #eedc94);
  background-image: -ms-linear-gradient(top, #fceec1, #eedc94);
  background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #fceec1), color-stop(100%, #eedc94));
  background-image: -webkit-linear-gradient(top, #fceec1, #eedc94);
  background-image: -o-linear-gradient(top, #fceec1, #eedc94);
  background-image: linear-gradient(top, #fceec1, #eedc94);
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#fceec1', endColorstr='#eedc94', GradientType=0);
  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.25);
  border-color: #eedc94 #eedc94 #e4c652;
  border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25);
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.5);
  border-width: 1px;
  border-style: solid;
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  border-radius: 4px;
  -webkit-box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.25);
  -moz-box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.25);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.25);
  background-color: #57a957;
  background-repeat: repeat-x;
  background-image: -khtml-gradient(linear, left top, left bottom, from(#62c462), to(#57a957));
  background-image: -moz-linear-gradient(top, #62c462, #57a957);
  background-image: -ms-linear-gradient(top, #62c462, #57a957);
  background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #62c462), color-stop(100%, #57a957));
  background-image: -webkit-linear-gradient(top, #62c462, #57a957);
  background-image: -o-linear-gradient(top, #62c462, #57a957);
  background-image: linear-gradient(top, #62c462, #57a957);
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#62c462', endColorstr='#57a957', GradientType=0);
  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.25);
  border-color: #57a957 #57a957 #3d773d;
  border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25);
			">
				<p style="color:white;"><strong>$message[who]</strong> - Deploy successfull on $displayDate.</p>
			</div>
END;
	}
}
?>