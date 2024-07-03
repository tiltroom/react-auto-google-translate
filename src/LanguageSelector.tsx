import React, {useContext, useEffect, useState} from 'react';

import { TranslationContext } from './TranslationProvider';
import Select from "react-select";
import {StylesConfig} from "react-select";

const languageOptions = [
    { value: 'af', label: 'Afrikaans', countryCode: 'za' }, // South Africa
    { value: 'sq', label: 'Albanian', countryCode: 'al' }, // Albania
    { value: 'am', label: 'Amharic', countryCode: 'et' }, // Ethiopia
    { value: 'ar', label: 'Arabic', countryCode: 'sa' }, // Saudi Arabia
    { value: 'hy', label: 'Armenian', countryCode: 'am' }, // Armenia
    { value: 'as', label: 'Assamese', countryCode: 'in' }, // India
    { value: 'ay', label: 'Aymara', countryCode: 'bo' }, // Bolivia
    { value: 'az', label: 'Azerbaijani', countryCode: 'az' }, // Azerbaijan
    { value: 'bm', label: 'Bambara', countryCode: 'ml' }, // Mali
    { value: 'eu', label: 'Basque', countryCode: 'es' }, // Spain
    { value: 'be', label: 'Belarusian', countryCode: 'by' }, // Belarus
    { value: 'bn', label: 'Bengali', countryCode: 'bd' }, // Bangladesh
    { value: 'bho', label: 'Bhojpuri', countryCode: 'in' }, // India
    { value: 'bs', label: 'Bosnian', countryCode: 'ba' }, // Bosnia and Herzegovina
    { value: 'bg', label: 'Bulgarian', countryCode: 'bg' }, // Bulgaria
    { value: 'ca', label: 'Catalan', countryCode: 'es' }, // Spain
    { value: 'ceb', label: 'Cebuano', countryCode: 'ph' }, // Philippines
    { value: 'zh-CN', label: 'Chinese (Simplified)', countryCode: 'cn' }, // China
    { value: 'zh-TW', label: 'Chinese (Traditional)', countryCode: 'tw' }, // Taiwan
    { value: 'co', label: 'Corsican', countryCode: 'fr' }, // France
    { value: 'hr', label: 'Croatian', countryCode: 'hr' }, // Croatia
    { value: 'cs', label: 'Czech', countryCode: 'cz' }, // Czech Republic
    { value: 'da', label: 'Danish', countryCode: 'dk' }, // Denmark
    { value: 'dv', label: 'Dhivehi', countryCode: 'mv' }, // Maldives
    { value: 'doi', label: 'Dogri', countryCode: 'in' }, // India
    { value: 'nl', label: 'Dutch', countryCode: 'nl' }, // Netherlands
    { value: 'en', label: 'English', countryCode: 'gb' }, // United Kingdom
    { value: 'eo', label: 'Esperanto', countryCode: 'xx' }, // Not applicable
    { value: 'et', label: 'Estonian', countryCode: 'ee' }, // Estonia
    { value: 'ee', label: 'Ewe', countryCode: 'gh' }, // Ghana
    { value: 'fil', label: 'Filipino (Tagalog)', countryCode: 'ph' }, // Philippines
    { value: 'fi', label: 'Finnish', countryCode: 'fi' }, // Finland
    { value: 'fr', label: 'French', countryCode: 'fr' }, // France
    { value: 'fy', label: 'Frisian', countryCode: 'nl' }, // Netherlands
    { value: 'gl', label: 'Galician', countryCode: 'es' }, // Spain
    { value: 'ka', label: 'Georgian', countryCode: 'ge' }, // Georgia
    { value: 'de', label: 'German', countryCode: 'de' }, // Germany
    { value: 'el', label: 'Greek', countryCode: 'gr' }, // Greece
    { value: 'gn', label: 'Guarani', countryCode: 'py' }, // Paraguay
    { value: 'gu', label: 'Gujarati', countryCode: 'in' }, // India
    { value: 'ht', label: 'Haitian Creole', countryCode: 'ht' }, // Haiti
    { value: 'ha', label: 'Hausa', countryCode: 'ng' }, // Nigeria
    { value: 'haw', label: 'Hawaiian', countryCode: 'us' }, // United States (Hawaii)
    { value: 'he', label: 'Hebrew', countryCode: 'il' }, // Israel
    { value: 'hi', label: 'Hindi', countryCode: 'in' }, // India
    { value: 'hmn', label: 'Hmong', countryCode: 'xx' }, // Not country-specific
    { value: 'hu', label: 'Hungarian', countryCode: 'hu' }, // Hungary
    { value: 'is', label: 'Icelandic', countryCode: 'is' }, // Iceland
    { value: 'ig', label: 'Igbo', countryCode: 'ng' }, // Nigeria
    { value: 'ilo', label: 'Ilocano', countryCode: 'ph' }, // Philippines
    { value: 'id', label: 'Indonesian', countryCode: 'id' }, // Indonesia
    { value: 'ga', label: 'Irish', countryCode: 'ie' }, // Ireland
    { value: 'it', label: 'Italian', countryCode: 'it' }, // Italy
    { value: 'ja', label: 'Japanese', countryCode: 'jp' }, // Japan
    { value: 'jv', label: 'Javanese', countryCode: 'id' }, // Indonesia
    { value: 'kn', label: 'Kannada', countryCode: 'in' }, // India
    { value: 'kk', label: 'Kazakh', countryCode: 'kz' }, // Kazakhstan
    { value: 'km', label: 'Khmer', countryCode: 'kh' }, // Cambodia
    { value: 'rw', label: 'Kinyarwanda', countryCode: 'rw' }, // Rwanda
    { value: 'gom', label: 'Konkani', countryCode: 'in' }, // India
    { value: 'ko', label: 'Korean', countryCode: 'kr' }, // South Korea
    { value: 'kri', label: 'Krio', countryCode: 'sl' }, // Sierra Leone
    { value: 'ku', label: 'Kurdish', countryCode: 'iq' }, // Iraq (Kurdistan)
    { value: 'ckb', label: 'Kurdish (Sorani)', countryCode: 'iq' }, // Iraq (Kurdistan)
    { value: 'ky', label: 'Kyrgyz', countryCode: 'kg' }, // Kyrgyzstan
    { value: 'lo', label: 'Lao', countryCode: 'la' }, // Laos
    { value: 'la', label: 'Latin', countryCode: 'xx' }, // Not country-specific
    { value: 'lv', label: 'Latvian', countryCode: 'lv' }, // Latvia
    { value: 'ln', label: 'Lingala', countryCode: 'cg' }, // Congo
    { value: 'lt', label: 'Lithuanian', countryCode: 'lt' }, // Lithuania
    { value: 'lg', label: 'Luganda', countryCode: 'ug' }, // Uganda
    { value: 'lb', label: 'Luxembourgish', countryCode: 'lu' }, // Luxembourg
    { value: 'mk', label: 'Macedonian', countryCode: 'mk' }, // North Macedonia
    { value: 'mai', label: 'Maithili', countryCode: 'in' }, // India
    { value: 'mg', label: 'Malagasy', countryCode: 'mg' }, // Madagascar
    { value: 'ms', label: 'Malay', countryCode: 'my' }, // Malaysia
    { value: 'ml', label: 'Malayalam', countryCode: 'in' }, // India
    { value: 'mt', label: 'Maltese', countryCode: 'mt' }, // Malta
    { value: 'mi', label: 'Maori', countryCode: 'nz' }, // New Zealand
    { value: 'mr', label: 'Marathi', countryCode: 'in' }, // India
    { value: 'mni-Mtei', label: 'Meiteilon (Manipuri)', countryCode: 'in' }, // India
    { value: 'lus', label: 'Mizo', countryCode: 'in' }, // India
    { value: 'mn', label: 'Mongolian', countryCode: 'mn' }, // Mongolia
    { value: 'my', label: 'Myanmar (Burmese)', countryCode: 'mm' }, // Myanmar
    { value: 'ne', label: 'Nepali', countryCode: 'np' }, // Nepal
    { value: 'no', label: 'Norwegian', countryCode: 'no' }, // Norway
    { value: 'ny', label: 'Nyanja (Chichewa)', countryCode: 'mw' }, // Malawi
    { value: 'or', label: 'Odia (Oriya)', countryCode: 'in' }, // India
    { value: 'om', label: 'Oromo', countryCode: 'et' }, // Ethiopia
    { value: 'ps', label: 'Pashto', countryCode: 'af' }, // Afghanistan
    { value: 'fa', label: 'Persian', countryCode: 'ir' }, // Iran
    { value: 'pl', label: 'Polish', countryCode: 'pl' }, // Poland
    { value: 'pt', label: 'Portuguese', countryCode: 'pt' }, // Portugal
    { value: 'pa', label: 'Punjabi', countryCode: 'in' }, // India
    { value: 'qu', label: 'Quechua', countryCode: 'pe' }, // Peru
    { value: 'ro', label: 'Romanian', countryCode: 'ro' }, // Romania
    { value: 'ru', label: 'Russian', countryCode: 'ru' }, // Russia
    { value: 'sm', label: 'Samoan', countryCode: 'ws' }, // Samoa
    { value: 'sa', label: 'Sanskrit', countryCode: 'in' }, // India
    { value: 'gd', label: 'Scots Gaelic', countryCode: 'gb' }, // Scotland
    { value: 'nso', label: 'Sepedi', countryCode: 'za' }, // South Africa
    { value: 'sr', label: 'Serbian', countryCode: 'rs' }, // Serbia
    { value: 'st', label: 'Sesotho', countryCode: 'za' }, // South Africa
    { value: 'sn', label: 'Shona', countryCode: 'zw' }, // Zimbabwe
    { value: 'sd', label: 'Sindhi', countryCode: 'pk' }, // Pakistan
    { value: 'si', label: 'Sinhala', countryCode: 'lk' }, // Sri Lanka
    { value: 'sk', label: 'Slovak', countryCode: 'sk' }, // Slovakia
    { value: 'sl', label: 'Slovenian', countryCode: 'si' }, // Slovenia
    { value: 'so', label: 'Somali', countryCode: 'so' }, // Somalia
    { value: 'es', label: 'Spanish', countryCode: 'es' }, // Spain
    { value: 'su', label: 'Sundanese', countryCode: 'id' }, // Indonesia
    { value: 'sw', label: 'Swahili', countryCode: 'ke' }, // Kenya
    { value: 'sv', label: 'Swedish', countryCode: 'se' }, // Sweden
    { value: 'tl', label: 'Tagalog (Filipino)', countryCode: 'ph' }, // Philippines
    { value: 'tg', label: 'Tajik', countryCode: 'tj' }, // Tajikistan
    { value: 'ta', label: 'Tamil', countryCode: 'in' }, // India
    { value: 'tt', label: 'Tatar', countryCode: 'ru' }, // Russia
    { value: 'te', label: 'Telugu', countryCode: 'in' }, // India
    { value: 'th', label: 'Thai', countryCode: 'th' }, // Thailand
    { value: 'ti', label: 'Tigrinya', countryCode: 'er' }, // Eritrea
    { value: 'ts', label: 'Tsonga', countryCode: 'za' }, // South Africa
    { value: 'tr', label: 'Turkish', countryCode: 'tr' }, // Turkey
    { value: 'tk', label: 'Turkmen', countryCode: 'tm' }, // Turkmenistan
    { value: 'ak', label: 'Twi (Akan)', countryCode: 'gh' }, // Ghana
    { value: 'uk', label: 'Ukrainian', countryCode: 'ua' }, // Ukraine
    { value: 'ur', label: 'Urdu', countryCode: 'pk' }, // Pakistan
    { value: 'ug', label: 'Uyghur', countryCode: 'cn' }, // China
    { value: 'uz', label: 'Uzbek', countryCode: 'uz' }, // Uzbekistan
    { value: 'vi', label: 'Vietnamese', countryCode: 'vn' }, // Vietnam
    { value: 'cy', label: 'Welsh', countryCode: 'gb' }, // United Kingdom (Wales)
    { value: 'xh', label: 'Xhosa', countryCode: 'za' }, // South Africa
    { value: 'yi', label: 'Yiddish', countryCode: 'xx' }, // Not country-specific
    { value: 'yo', label: 'Yoruba', countryCode: 'ng' }, // Nigeria
    { value: 'zu', label: 'Zulu', countryCode: 'za' }, // South Africa
];



const injectCSS = (url) => {
    const head = document.head;
    const link = document.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = url;
    head.appendChild(link);
};




const Flag = ({ countryCode }) => (
    <span className={`flag-icon flag-icon-${countryCode}`} style={{ marginRight: '10px' }}></span>
);

const formatOptionLabel = ({ label, countryCode }) => (
    <div style={{ color:"inherit", display: 'flex', alignItems: 'center' }}>
        <Flag countryCode={countryCode} />
        {label}
    </div>
);


interface ILanguageOption {
    value: string;
    label: string;
    countryCode: string;
    
}

interface LanguageSelectorProps {
    onlySpecificLanguages?: string[];
    customStyles?: StylesConfig;
    className?: string;
    componentScale?: number;
}





const LanguageSelector = ({onlySpecificLanguages=null,customStyles={},className="", componentScale: componentSize = 1}:LanguageSelectorProps) => {
    const { changeLanguage } = useContext(TranslationContext);
    const initialLang = document.cookie
        .split('; ')
        .find(row => row.startsWith('googtrans='))
        ?.split('=')[1]
        ?.split('/')[2] || 'en'; // Default to 'en' if not found

    const [selectedLanguage, setSelectedLanguage] = useState(languageOptions.find(option => option.value === initialLang));



    useEffect(() => {
        injectCSS('https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.5.0/css/flag-icon.min.css');
    }, []);


    useEffect(() => {
        const style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = `#react-select-2-input{
    background-color: transparent !important;
    border: none !important;
    -webkit-box-shadow: 0 0 0 0 rgba(0, 0, 0, 0), 0 0 0 0 rgba(0, 0, 0, 0), 0 0 0 0 rgba(0, 0, 0, 0) !important; 
     box-shadow:  0 0 0 rgba(0, 0, 0, 0), 0 0 0 0 rgba(0, 0, 0, 0), 0 0 0 0 rgba(0, 0, 0, 0) !important;
}


        `;

        document.head.appendChild(style);

        return () => {

            document.head.removeChild(style);
        };
    }, []);


    const handleChange = (option) => {
        setSelectedLanguage(option);
        changeLanguage(option.value);
    };




    return (
        <div className={"notranslate"} style={{ minWidth:160, zoom:componentSize }}>
        <Select
            options={onlySpecificLanguages == null ? languageOptions:onlySpecificLanguages}
            value={selectedLanguage}
            onChange={handleChange}
            formatOptionLabel={formatOptionLabel}
            styles={customStyles}
            className={className}
            isSearchable={true}  // Enable searching
            
          
        />
        </div>
    );
};

export default LanguageSelector;
