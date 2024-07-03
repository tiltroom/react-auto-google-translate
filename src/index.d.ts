import { StylesConfig } from "react-select";
interface LanguageSelectorProps {
    onlySpecificLanguages?: string[];
    customStyles?: StylesConfig;
    className?: string;
    componentScale?: number;
}
declare const LanguageSelector: ({ onlySpecificLanguages, customStyles, className, componentScale: componentSize }: LanguageSelectorProps) => import("react/jsx-runtime").JSX.Element;
export default LanguageSelector;

declare const TranslationContext: import("react").Context<unknown>;
declare const useGoogleTranslateScript: (originalLang: any) => void;
export default useGoogleTranslateScript;
declare const TranslationProvider: {
    ({ children, originalLang }: {
        children: any;
        originalLang: any;
    }): import("react/jsx-runtime").JSX.Element;
    propTypes: {
        children: any;
        language: any;
    };
};
export { TranslationProvider, TranslationContext };
