<html>
<head><title>out.se - Foton</title>
<style>
body{font-family:verdana; font-size:11px;}
img{border:1px solid black}
</style>
</head>
<body>

<?php
$myvar = "<big><b>Bildgalleri</b></big><br><br>";
echo $myvar;
?>

<?php
/*  LIST THE FILES IN A DIRECTORY - sorted by date
    - for img links to work keep the same name on small and big imgs
    start IMAGE GALLERY
*/

// define goal directory to read from
$dir_name="/project/out/bilder/foton/big/";
// define urls
$path="./bilder/foton/";
$pathtoSMALLimgs= $path . "small/";
$pathtoBIGimgs= $path . "big/";
// define styles for img cells
$prettyframe="float:left; padding:6px; border:0px solid white;";
$datespan="font-family:arial; color:#777777;";


$dir = opendir($dir_name);
$basename = basename($dir_name);
$fileArr = array();

while ($file_name = readdir($dir))
{
  if (($file_name !=".") && ($file_name !=".."))
  {
    //Get file modification date...
    $fName = "$dir_name/$file_name";
    $fTime = filemtime($fName);
    $fileArr[$file_name] = $fTime;    
  }
}
// Use arsort to get most recent first
// and asort to get oldest first
arsort($fileArr);

$numberOfFiles = sizeOf($fileArr);
for($t=0;$t<$numberOfFiles;$t++)
{
    $thisFile = each($fileArr);
    $thisName = $thisFile[0];
    $thisTime = $thisFile[1];
    $thisTime = date("d M y", $thisTime);
    
    // Create HTML output
    echo "<div style=\"$prettyframe\">";
    echo "<a href=$pathtoBIGimgs$thisName target=_new>";
    echo "<img src=$pathtoSMALLimgs$thisName hspace=0 vspace=4>";
    echo "</a>";
     // comment/uncomment line below to hide/show date
     echo "<br><span style=$datespan><small>$thisTime</small></span><br>";
    echo "</div>";
}
closedir ($dir);
//  end IMAGE GALLERY
?>




</body>
</html>