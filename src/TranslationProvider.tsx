import React, { createContext, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

// @ts-ignore
//import gt from "assets/gt.js";

const TranslationContext = createContext();


const useGoogleTranslateScript = (originalLang) => {
    useEffect(() => {
        const scriptId = 'google-translate-script';
        if (document.getElementById(scriptId)) {
            return; // script already added
        }
        const script = document.createElement('script');
        script.id = scriptId;
        script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
       // script.src = "./gt.js";
        document.body.appendChild(script);

        window.googleTranslateElementInit = () => {
            new window.google.translate.TranslateElement({
                pageLanguage: originalLang, // Set the default language
                layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE
            }, 'google_translate_element');
        };
    }, []);
};

export default useGoogleTranslateScript;


const TranslationProvider = ({ children, originalLang }) => {
    const googleTranslateElementRef = useRef(null);

    const overrideGoogleTranslateStyles = () => {
        const style = document.body.style;
        style.position = 'static'; 
        style.minHeight = '0'; 
        style.top = '0'; 
    };


    useGoogleTranslateScript(originalLang);  

    useEffect(() => {
        const observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                // if (mutation.type === 'childList' && mutation.addedNodes.length) {
                //     mutation.addedNodes.forEach(node => {
                //         if (node.nodeName === 'IFRAME' && node.classList.contains('skiptranslate')) {
                //             // Hide the toolbar by setting its style
                //             node.style.display = 'none';
                //         }
                //     });
                // }
            });
        });

        if (googleTranslateElementRef.current) {
            observer.observe(googleTranslateElementRef.current, {
                childList: true,
                subtree: true
            });
        }

        setTimeout(overrideGoogleTranslateStyles, 215);
        return () => observer.disconnect();
    }, []);


    useEffect(() => {
        const style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = `iframe.VIpgJd-ZVi9od-ORHb-OEVmcd.skiptranslate {
            display: none !important;
            visibility: hidden !important;
        }

         .VIpgJd-ZVi9od-aZ2wEe-wOHMyf-ti6hGc {
            display: none !important;
            visibility: hidden !important;
            }

        `;

        document.head.appendChild(style);

        return () => {

            document.head.removeChild(style);
        };
    }, []);



    const changeLanguage = (lang) => {
        document.cookie = `googtrans=/auto/${lang}; path=/; domain=.${window.location.hostname}`;
       window.location.reload();  // This reloads the page to reflect changes in translation.
    };



    return (
        <TranslationContext.Provider value={{ changeLanguage }}>
            {children}
            <div style={{display:"none"}} ref={googleTranslateElementRef} id="google_translate_element"></div>
        </TranslationContext.Provider>
    );
};

TranslationProvider.propTypes = {
    children: PropTypes.node.isRequired,
    language: PropTypes.string.isRequired,
};

export { TranslationProvider, TranslationContext };
