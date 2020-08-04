<?php
?>
<html>
<head>
	<title>Gift Card Registration</title>
	<link rel="stylesheet" type="text/css" href="styles.css"> 

</head>
<body>
	<h4>Register a New Gift Card</h4>
	<form action="" method="post">
        <input type="text" name="Company" placeholder="Company" required>

        <br><br>
        <input type="text" name="Value" placeholder="Value" required>

        <br><br>
        <input type="test" name="Starting_Price" placeholder="Starting Price" required>

        <br><br>
				<input type="datetime-local" name="Start_Date" placeholder="Start Date" id="Datepicker1" required>

        <br><br>
				<input type="datetime-local" name="End_Date" placeholder="End Date" id="Datepicker2" required>

        <br><br>

        <input type="submit" value="Submit">
				<input type="reset" value="Reset">
    </form>
		
	<script type="text/javascript">
		$(function() {
			$( "#Datepicker1" ).datetimepicker();

			$( "#Datepicker2" ).datetimepicker();
		});
		    </script>

</body>
</html>
