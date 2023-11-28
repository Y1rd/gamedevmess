<?php
$fredCheck = false;
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $text = $_POST['textbox'];
    if ($text == 'fred' || $text == 'Fred') {
        $fredCheck = true;
    }
}
?>
<head>
    <link rel="stylesheet" href="../style.css">
</head>
<body>
	<div class="box">
        <div class="boxcontent">
            <h1>PHP Test</h1>
            <p>Press the button to see if this works.</p>
            <form method="post" action="">
                <input type="text" value="fred" id="textbox" name="textbox">
                <input type="submit">
            </form>
            <?php
            if ($fredCheck) {
                echo "<p>Fred checked!</p>";
            } else {
                echo "<p>Fred not check...</p>";
            }
            ?>
        </div>
    </div>
</body>
</html>