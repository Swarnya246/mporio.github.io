<?
session_start();
?>

<html>
<head>
	<title>Gift Card Registration</title>
	<link href="jquery.datetimepicker.min.css" rel="stylesheet">
	<script src="jQuery.js"></script>
	<script src="jquery.datetimepicker.full.js"></script>
</head>
<body>
	<h4>Welcome <?php echo $_SESSION['name'];
	$un=$_SESSION['username'];
	?>!</h4>
	<form action="ginsert.php" method="post">
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
		<?php

		$conn=mysqli_connect("localhost", "root", "mysqladmin", "mporio");
		if($conn->connect_error)
		{
		die("connection failed:".$conn->connect_error);
		}
		$sql="select * from users where username='$un'";
		//echo $sql;
		$result=$conn->query($sql);
		If ($result-> num_rows==1)
		{
		  while($row=$result->fetch_assoc())
		  {
		    $uid=$row["id"];
				$uemail=$row["email"];
				$uname=$row['name'];
		  }
		}
		else
		  {
		  echo "No Username Found in the Database";
		  }
		$conn->close();
		$_SESSION['uid']=$uid;
		$_SESSION['email']=$uemail;
		echo $_SESSION['uid'];
		echo $_SESSION['email'];
		?>

	<script type="text/javascript">
		$(function() {
			$( "#Datepicker1" ).datetimepicker();

			$( "#Datepicker2" ).datetimepicker();
		});
		    </script>

</body>
</html>
