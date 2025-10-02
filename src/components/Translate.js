import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Translate() {
  const { i18n, t } = useTranslation();
  return (
    <div style={{ position: 'absolute', top: 20, right: 40 }}>
      <button onClick={() => i18n.changeLanguage('en')}>{t("Select Language")} - English</button>
      <button onClick={() => i18n.changeLanguage('hi')} style={{ marginLeft: 8 }}>{t("Select Language")} - हिंदी</button>
    </div>
  );
}
