<?php include_once 'library.php' ?>

<?php
    if( isset( $_GET[UTMTags::UTM_SOURCE] ) )
        UTMTags::setUtm(UTMTags::UTM_SOURCE, $_GET[UTMTags::UTM_SOURCE]);
    if( isset( $_GET[UTMTags::UTM_TERM]   ) )
        UTMTags::setUtm(UTMTags::UTM_TERM, $_GET[UTMTags::UTM_TERM]);
?>

<?php include_once 'index.html' ?>
