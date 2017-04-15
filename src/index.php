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
            $$e = $_GET[$e];

            if (array_key_exists($$e, $dynamic_keywords)) {
                $addH1_geoloc = $dynamic_keywords[$$e];
                break; /* отобразить 1 вхождение/совпадение */
            }
        }
    }
?>

<?php include_once 'index.html' ?>
