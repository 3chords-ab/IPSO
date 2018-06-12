<html>
<head><title>ipso.cc - Projekt</title>
<style>
body{font-family:verdana; margin:0px;}
a{text-decoration:none; color:#fffffa;}
a:hover{text-decoration:underline; color:yellow;}
</style>
</head>
<body bgcolor="#666633">

<center>
<br><br><br>
<div style="width:100%; height:100px; background-color:#fffffa; filter:alpha(opacity=10);"></div>
<br><br><br>
<div style="width:400px; text-align:left; border:1px dashed black; padding:10px;">
<?php
$myvar = "<big><b>Projekt:</b></big><br><br>";
echo $myvar;
?>

<p>
<?php
// define directory to read from
if ($handle = opendir('/project/')) {
    while (false !== ($file = readdir($handle))) { 
        if ($file != "." && $file != "..") { 
            //create img HTML code
            $projectlink = "<li> <a href=$file/>$file</a>";
            //display FILES
            echo "$projectlink";
        }
    }
    closedir($handle); 
}
?>
</p>
</div>

<br><br><br>
<div style="width:100%; height:100px; background-color:#fffffa; filter:alpha(opacity=10);"></div>
</center>

</body>
</html>