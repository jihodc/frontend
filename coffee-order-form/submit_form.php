<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Confirmation</title>
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
</head>
<body>

	<div class="container">
		<div class="row">
			<h1 class="col-12 mt-5 mb-3">Order Confirmation</h1>
		</div> <!-- .row -->
	</div> <!-- .container -->
	
	<div class="container">

		<div class="row mt-3">
			<div>
				<!-- Change this to date/time that this was submitted. -->
				<!-- Use Los Angeles as default timezone -->
				<?php  
					date_default_timezone_set('America/Los_Angeles');
					echo 'This form was submitted on '. date('l, F j, Y') . ' at ' . date('h:i:s A');
				?>
			</div>
		</div>

		<div class="row mt-4">
			<div class="col-4 text-right">Full Name:</div>
			<div class="col-8">
				<!-- PHP Output Here -->
				<!-- 2 cases - 1: Full Name 2: No Name -->
				<?php  
					if ((isset($_POST['fname']) && isset($_POST['lname'])) && (!empty($_POST['fname']) && !empty($_POST['fname']))) {
						echo $_POST['fname'] . ' ' . $_POST['lname'];
					} else {
						echo '<span class="text-danger">Not provided.</span>';
					}
				?>
				
			</div>
		</div> <!-- .row -->

		<div class="row mt-3">
			<div class="col-4 text-right">Phone Number Match:</div>
			<div class="col-8">
				<!-- PHP Output Here -->
				<!-- Display that phone numbers match -->
				<!-- 3 cases - 1: Phone Numbers Match 2: Phone Numbers Don't Match 3: No Number Provided -->
				<?php  
					if ((isset($_POST['phone']) && isset($_POST['phone-confirm'])) && (!empty($_POST['phone']) && !empty($_POST['phone-confirm'])) && ($_POST['phone'] == $_POST['phone-confirm'])) {
						echo $_POST['phone'] . '<br>';
						echo '<span class="text-success">Phone numbers match!</span>';
					} elseif (($_POST['phone'] != $_POST['phone-confirm'])) {
						echo '<span class="text-danger">Phone numbers do not match.</span>';
					} else {
						echo '<span class="text-danger">Not provided.</span>';
					}
				?>
			</div>
		</div> <!-- .row -->

		<div class="row mt-3">
			<div class="col-4 text-right">Order:</div>
			<div class="col-8">
				<!-- PHP Output Here -->
				<?php  
					if (!isset($_POST['order'])) {
						echo '<span class="text-danger">Not provided.</span>';
					} else {
						// capitalize the output
						echo ucwords($_POST['order']);
					}
				?>
				
			</div>
		</div> <!-- .row -->
		<div class="row mt-3">
			<div class="col-4 text-right">Size:</div>
			<div class="col-8">
				<!-- PHP Output Here -->
				<?php
					if (!isset($_POST['size'])) {
						echo '<span class="text-danger">Not provided.</span>';
					} else {
						// capitalize the output
						echo ucwords($_POST['size']);
					}
				?>
			</div>
		</div> <!-- .row -->

		<div class="row mt-3">
			<div class="col-4 text-right">Flavor shot(s): </div>
			<div class="col-8">
				<!-- PHP Output Here -->
				<!-- Use array to present all flavor -->
				<?php
					if (!isset($_POST['flavor'])) {
						echo '<span>None.</span>';
					} else {
						// capitalize the output
						foreach ($_POST['flavor'] as $flavor) {
							echo ucwords($flavor . " ");
						}
					}
				?>
			</div>
		</div> <!-- .row -->

		<div class="row mt-4 mb-4">
			<a href="form.php" role="button" class="btn btn-primary">Back to Form</a>
		</div> <!-- .row -->

	</div> <!-- .container -->

</body>
</html>