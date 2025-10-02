import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';


const resources = {
  en: {
    translation: {
      "Railway QR Code System": "Railway QR Code System",
      "AI-powered Track Fittings Quality Control Portal": "AI-powered Track Fittings Quality Control Portal",
      "Secure Access": "Secure Access",
      "Real-time Monitoring": "Real-time Monitoring",
      "System Login": "System Login",
      "Enter credentials": "Enter your railway credentials to access the quality control system",
      "Employee ID": "Employee ID",
      "Password": "Password",
      "Access Level": "Access Level",
      "Depot Staff & Procurement Teams": "Depot Staff & Procurement Teams",
      "Login to Dashboard": "Login to Dashboard",
      "Select Language": "Select Language"
    }
  },
  hi: {
    translation: {
      "Railway QR Code System": "रेलवे QR कोड सिस्टम",
      "AI-powered Track Fittings Quality Control Portal": "एआई-प्रेरित ट्रैक फिटिंग गुणवत्ता नियंत्रण पोर्टल",
      "Secure Access": "सुरक्षित पहुँच",
      "Real-time Monitoring": "रीयल-टाइम निगरानी",
      "System Login": "सिस्टम लॉगिन",
      "Enter credentials": "गुणवत्ता नियंत्रण प्रणाली का उपयोग करने के लिए अपने रेलवे क्रेडेंशियल्स दर्ज करें",
      "Employee ID": "कर्मचारी आईडी",
      "Password": "पासवर्ड",
      "Access Level": "एक्सेस स्तर",
      "Depot Staff & Procurement Teams": "डिपो स्टाफ और खरीद टीम",
      "Login to Dashboard": "डैशबोर्ड में लॉगिन करें",
      "Select Language": "भाषा चुनें"
    }
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
