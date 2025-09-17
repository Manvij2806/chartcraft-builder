import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Globe, Languages } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LanguageSelectorProps {
  onLanguageChange?: (language: string, locale: string) => void;
}

const languages = [
  { code: 'en-US', name: 'English (US)', locale: 'en' },
  { code: 'es-ES', name: 'Español (España)', locale: 'es' },
  { code: 'fr-FR', name: 'Français (France)', locale: 'fr' },
  { code: 'de-DE', name: 'Deutsch (Deutschland)', locale: 'de' },
  { code: 'it-IT', name: 'Italiano (Italia)', locale: 'it' },
  { code: 'pt-BR', name: 'Português (Brasil)', locale: 'pt' },
  { code: 'zh-CN', name: '中文 (简体)', locale: 'zh' },
  { code: 'ja-JP', name: '日本語 (日本)', locale: 'ja' },
  { code: 'ko-KR', name: '한국어 (대한민국)', locale: 'ko' },
  { code: 'ar-SA', name: 'العربية (السعودية)', locale: 'ar' },
  { code: 'hi-IN', name: 'हिन्दी (भारत)', locale: 'hi' },
  { code: 'ru-RU', name: 'Русский (Россия)', locale: 'ru' },
];

const translations = {
  en: {
    title: 'Language Settings',
    selectLanguage: 'Select Language',
    currentLanguage: 'Current Language',
    apply: 'Apply Language',
    success: 'Language changed successfully',
    description: 'Choose your preferred language for the interface and voice assistant.'
  },
  es: {
    title: 'Configuración de Idioma',
    selectLanguage: 'Seleccionar Idioma',
    currentLanguage: 'Idioma Actual',
    apply: 'Aplicar Idioma',
    success: 'Idioma cambiado exitosamente',
    description: 'Elige tu idioma preferido para la interfaz y el asistente de voz.'
  },
  fr: {
    title: 'Paramètres de Langue',
    selectLanguage: 'Sélectionner la Langue',
    currentLanguage: 'Langue Actuelle',
    apply: 'Appliquer la Langue',
    success: 'Langue changée avec succès',
    description: 'Choisissez votre langue préférée pour l\'interface et l\'assistant vocal.'
  },
  de: {
    title: 'Spracheinstellungen',
    selectLanguage: 'Sprache Auswählen',
    currentLanguage: 'Aktuelle Sprache',
    apply: 'Sprache Anwenden',
    success: 'Sprache erfolgreich geändert',
    description: 'Wählen Sie Ihre bevorzugte Sprache für die Benutzeroberfläche und den Sprachassistenten.'
  },
  zh: {
    title: '语言设置',
    selectLanguage: '选择语言',
    currentLanguage: '当前语言',
    apply: '应用语言',
    success: '语言更改成功',
    description: '选择您首选的界面和语音助手语言。'
  }
};

const LanguageSelector = ({ onLanguageChange }: LanguageSelectorProps) => {
  const [selectedLanguage, setSelectedLanguage] = useState('en-US');
  const [currentLocale, setCurrentLocale] = useState('en');
  const { toast } = useToast();

  const handleLanguageChange = (languageCode: string) => {
    const language = languages.find(lang => lang.code === languageCode);
    if (language) {
      setSelectedLanguage(languageCode);
      setCurrentLocale(language.locale);
      
      // Call the callback if provided
      if (onLanguageChange) {
        onLanguageChange(languageCode, language.locale);
      }

      // Show success message
      const t = translations[language.locale as keyof typeof translations] || translations.en;
      toast({
        title: t.success,
        description: `${t.currentLanguage}: ${language.name}`,
      });

      // Store in localStorage for persistence
      localStorage.setItem('selectedLanguage', languageCode);
      localStorage.setItem('selectedLocale', language.locale);
    }
  };

  const getCurrentTranslations = () => {
    return translations[currentLocale as keyof typeof translations] || translations.en;
  };

  const t = getCurrentTranslations();

  return (
    <Card className="p-6 shadow-medical">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center space-x-2">
          <Globe className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">{t.title}</h3>
        </div>

        <p className="text-sm text-muted-foreground">{t.description}</p>

        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground">{t.selectLanguage}</label>
          <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder={t.selectLanguage} />
            </SelectTrigger>
            <SelectContent>
              {languages.map((language) => (
                <SelectItem key={language.code} value={language.code}>
                  <div className="flex items-center space-x-2">
                    <Languages className="h-4 w-4" />
                    <span>{language.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-between pt-4">
          <div className="text-sm text-muted-foreground">
            {t.currentLanguage}: <span className="font-medium text-foreground">
              {languages.find(lang => lang.code === selectedLanguage)?.name}
            </span>
          </div>
          <Button 
            onClick={() => handleLanguageChange(selectedLanguage)}
            className="bg-gradient-primary hover:opacity-90"
          >
            {t.apply}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default LanguageSelector;