<?php>
    error_reporting(-1);
    header('Content-Type: text/html; charset= utf-8');

    $error = false;

    if (!empty($_POST["bsName"])) {
        $name = substr(htmlspecialchars(trim($_POST["bsName"])), 0, 250);
	}
    else { $error = true; }

    if (!empty($_POST["bsPhone"])) {
        $phone = substr(htmlspecialchars(trim($_POST["bsPhone"])), 0, 50);
	}
    else { $error = true; }

    if (!empty($_POST["bsNote"])) {
        $note = htmlspecialchars(trim($_POST["bsNote"]));
	}

    /*if (!empty($_POST["bsEmail"])) {
        $email = substr(htmlspecialchars(trim($_POST["bsEmail"])), 0, 255);
	}*/

    /*if(empty($phone) && empty($email)) { $error = true; }*/


    if (!empty($_POST["whichService"])) {
        $whichService = substr(htmlspecialchars(trim($_POST["whichService"])), 0, 255);
	}

 	if (!$error) {
        $recepient = "MiKrob09@gmail.com, krepysh1@tut.by"; /* "MiKrob09@gmail.com" */
        $sitename = "krepysh.com";

        $pagetitle = "Новая заявка с сайта \"$sitename\"";
        $message = "Имя: $name \nТелефон: $phone \nКуда кликнул: $whichService";
        mail($recepient, $pagetitle, $message, "Content-type: text/plain; charset=\"utf-8\"\n From: $recepient");

	} else {
		echo "<p class='bg-danger text-danger'>Произошла ошибка! Заполните правильно все поля!</p>";
	}

    /*header( 'Location: /', true, 307 ); // перебросить на главную страницу сайта с использованием 307 редиректа.*/
    /*header( 'Refresh: 5; url=/', true, 307 ); // перебросить на главную страницу сайта с использованием 307 редиректа через 5 сек.
    exit;*/
?>
