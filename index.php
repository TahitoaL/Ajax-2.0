<?php $filesNames = get_object_vars(json_decode(file_get_contents('./dist/manifest.json')));
?>
 <!DOCTYPE html>
 <html>
 	<head>
 		<title>Toa | Accueil</title>
 		<meta charset="UTF-8">
 		<meta name="theme-color" content="#2196F3">
 		<meta name="msapplication-navbutton-color" content="#2196F3">
 		<meta name="apple-mobile-web-app-status-bar-style" content="#2196F3">
    <link rel="stylesheet" href="<?=$filesNames["app.css"]?>">
 	</head>
 	<body>
 		<header class="header">
 			<nav class="nav">
 				<ul>
 					<li><a class="title" href="https://toal.000webhostapp.com">Toa</a></li>
 					<li><a href="https://toal.000webhostapp.com/works.php">Articles</a></li>
 					<li><a href="https://toal.000webhostapp.com/about.php">A propos</a></li>
 				</ul>
 			</nav>
 		</header>
 		<div class="container" id="container">
			<button class="test" data-notification-type="success">Valider</button><br>
			<button class="test" data-notification-type="error">Refuser</button><br>
			<button class="test" data-notification-type="info" data-notification-text="Informations diverses">Informer</button><br>
			<button class="test" data-notification-type="warning" data-notification-text="Problème sur la ligne 9">Attention</button><br>
			<div id="result"></div>
			<div class="metro">
				<div class="metro__header">
					<span class="metro__header__icon">
						<img src="https://toal.000webhostapp.com/src/img/metro.svg" alt="Metro 9">
						<img src="https://toal.000webhostapp.com/src/img/m9genrvb.svg" alt="Metro 9">
					</span>
					<span class="metro__header__station">
						Rue de la Pompe <i>#Demo#</i>
					</span>
				</div>
				<div class="metro__body">
					<span class="metro__body__dir">
						Mairie de Montreuil
					</span>
					<span class="metro__body__schedules">
						<span class="left">
							<span class="metro__body__schedules__time blink__time">0</span>
							<span class="metro__body__schedules__time">4</span>
							<span class="metro__body__schedules__time blink__time">++</span>
							<span class="metro__body__schedules__time">13</span>
						</span>
						<span class="right">
							<span class="metro__body__trafic">
								<span class="trafic__state">&nbsp;</span>
							</span>
						</span>
					</span>
				</div>
        </div>
		</div class="container">
	</body>
	<script type="text/javascript" src="<?=$filesNames["app.js"]?>"></script>
</html>
