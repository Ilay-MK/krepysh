<?php include_once 'library.php' ?>

<?php
    if( isset( $_GET[UTMTags::UTM_SOURCE] ) )
        UTMTags::setUtm(UTMTags::UTM_SOURCE, $_GET[UTMTags::UTM_SOURCE]);
    if( isset( $_GET[UTMTags::UTM_TERM]   ) )
        UTMTags::setUtm(UTMTags::UTM_TERM, $_GET[UTMTags::UTM_TERM]);
?>

<?php
    $addH1_geoloc = null;

    foreach($utm_array as $e) {

        if(!empty($_GET[$e])) {
            $param = $_GET[$e];

            /*
            $$e = $_GET[$e];

            $pos2 = stripos($mystring2, $findme);
            if ($pos2 !== false) {
                echo "Нашел '$findme' в '$mystring2' в позиции $pos2";
            }

            // ---

            $email = 'USER@EXAMPLE.com';
            echo stristr($email, 'e'); // выводит ER@EXAMPLE.com
            echo stristr($email, 'e', true); // Начиная с PHP 5.3.0, выводит US

            $string = 'APPLE';
            echo stristr($string, 97); // 97 = a в нижнем регистре
            // выводит: APPLE
            */

            /*
            if (array_key_exists($$e, $dynamic_keywords)) {
                $addH1_geoloc = $dynamic_keywords[$$e];
                break; // отобразить 1 вхождение/совпадение
            }
            */

            while ($dynamic_keyword = current($dynamic_keywords)) {

                if( ($temp = stripos($param, key($dynamic_keywords))) !== false )
                {
                    $addH1_geoloc = $dynamic_keyword;
                    break; // отобразить 1 вхождение/совпадение
                }

                next($dynamic_keywords);
            }
        }
    }
?>

<?php include_once 'index.html' ?>
