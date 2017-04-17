<?php
    class UTMTags {

        const UTM_SOURCE  = "utm_source";
        const UTM_TERM    = "utm_term";
        const UTM_MEDIUM  = "utm_medium";
        const UTM_CONTENT = "utm_content";

        protected static $utms_ = array();

        protected static $utms = [
            self::UTM_SOURCE   => self::UTM_SOURCE,
            self::UTM_TERM     => self::UTM_TERM,
            self::UTM_MEDIUM   => self::UTM_MEDIUM,
            self::UTM_CONTENT  => self::UTM_CONTENT
        ];

        public function __construct(){
            self::$utms_[self::UTM_SOURCE]  = self::UTM_SOURCE;
            self::$utms_[self::UTM_TERM]    = self::UTM_TERM;
            self::$utms_[self::UTM_MEDIUM]  = self::UTM_MEDIUM;
            self::$utms_[self::UTM_CONTENT] = self::UTM_CONTENT;
        }

        public static function getUtm($utm = self::UTM_SOURCE)
        {
            return self::$utms[$utm];
        }

        public static function setUtm($utm = self::UTM_SOURCE, $utm_value = self::UTM_SOURCE)
        {
            self::$utms[$utm] = $utm_value;
        }
    }
?>

<?php

    $dynamic_keywords = array(
        'Frunzenskiy_rayon' => "Минск, Фрунзенский р-н – 2 центра",
        'Sovetskiy_rayon' => "Минск, Советский р-н – ул. Богдановича, 68А",
        'Pervomayskiy_rayon' => "Минск, Первомайский р-н – 3 центра",
        'Tsentralnyiy_rayon' => "Минск, Центральный р-н – пр. Победителей, 109",
        'Partizanskiy_rayon' => "Минск, Партизанский р-н – ул. Радиальная, 36",
        'Oktyabrskiy_rayon' => "Минск, Октябрьский р-н – ул. Асаналиева, 16",
        'Zavodskoy_rayon' => "Минск, Заводской р-н – 4 центра",
        'Moskovskiy_rayon' => "Минск, Московский р-н – ул. Слободская, 169",
        'Borisovskiy_trakt' => "Минск, ст. м. Борисовский тракт",
        'Moskovskaya' => "Минск, ст. м. Московская",
        'Park_Chelyuskintsev' => "Минск, ст. м. Парк Челюскинцев",
        'Akademiya_nauk' => "Минск, ст. м. Академия наук",
        'Ploschad_Yakuba_Kolasa' => "Минск, ст. м. Площадь Якуба Коласа",
        'Ploschad_Pobedyi' => "Минск, ст. м. Площадь Победы",
        'Oktyabrskaya' => "Минск, ст. м. Октябрьская",
        'Ploschad_Lenina' => "Минск, ст. м. Площадь Ленина",
        'Nezavisimosti' => "Минск, ст. м. Независимости",
        'Institut_Kulturyi' => "Минск, ст. м. Институт Культуры",
        'Vaneeva' => "Минск, ул. Ванеева, 1",
        'Gerasimenko' => "Минск, ул. Герасименко, 10",
        'Ilimskaya' => "Минск, ул. Илимская, 15",
        'Uborevicha' => "Минск, ул. Уборевича, 124А",
        'Slobodskaya' => "Минск, ул. Слободская, 169",
        'Asanalieva' => "Минск, ул. Асаналиева, 16",
        'Radialnaya' => "Минск, ул. Радиальная, 36",
        'Pobediteley' => "Минск, пр. Победителей, 109",
        'Kalinovskogo' => "Минск, ул. Калиновского, 55",
        'Kozlova' => "Минск, ул. Козлова, 17А",
        'Sedyih' => "Минск, ул. Седых, 66",
        'Bogdanovicha' => "Минск, ул. Богдановича, 68А",
        'Chaylyitko' => "Минск, ул. Чайлытко, 8",
        'Sharangovicha' => "Минск, ул. Шаранговича, 68",
        'Yugo_Zapad' => "Минск, Юго-Запад",
        'Suharevo' => "Минск, Сухарево",
        'Brilevichi' => "Минск, Брилевичи",
        'Zelyonyiy_Lug' => "Минск, Зелёный Луг",
        'Serebryanka' => "Минск, Серебрянка",
        'Chizhovka' => "Минск, Чижовка",
        'Shabanyi' => "Минск, Шабаны",
        'Kurasovschina' => "Минск, Курасовщина",
        'Vesnyanka' => "Минск, Веснянка",
        'Loshitsa' => "Минск, Лошица",
        'Angarskaya' => "Минск, Ангарская",
        'Mayakovskogo' => "Минск, Маяковского",
        'Uruche' => "Минск, Уручье",
        'Vostok' => "Минск, Восток",
        'Grushevka' => "Минск, Грушевка",
        'Mihalovo' => "Минск, Михалово",
        'Petrovschina' => "Минск, Петровщина",
        'Malinovka' => "Минск, Малиновка"
    );

    $utm_array = array (
        UTMTags::getUtm(UTMTags::UTM_TERM),
        UTMTags::getUtm(UTMTags::UTM_CONTENT)
    );
?>
