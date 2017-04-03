<?php
    class UTMTags {

        const UTM_SOURCE = "utm_source";
        const UTM_TERM   = "utm_term";

        protected static $utms_ = array();

        protected static $utms = [
            self::UTM_SOURCE => self::UTM_SOURCE,
            self::UTM_TERM   => self::UTM_TERM
        ];

        public function __construct(){
            self::$utms_[self::UTM_SOURCE] = self::UTM_SOURCE;
            self::$utms_[self::UTM_TERM]   = self::UTM_TERM;
        }

        public static function getUtm($utm = self::UTM_SOURCE)
        {
            return self::$utms[$utm];
        }

        public static function setUtm($utm_value = self::UTM_SOURCE)
        {
            self::$utms[$utm] = $utm_value;
        }
    }
?>

<?php

    if( isset( $_GET[UTMTags::UTM_SOURCE] ) )
        UTMTags::setUtm($_GET[UTMTags::UTM_SOURCE]);
    if( isset( $_GET[UTMTags::UTM_TERM]   ) )
        UTMTags::setUtm(UTMTags::UTM_TERM);
?>

<?php include_once 'index.html' ?>
