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
  { code: 'en-US', name: 'English', locale: 'en' },
  { code: 'hi-IN', name: 'हिन्दी (Hindi)', locale: 'hi' },
  { code: 'pa-IN', name: 'ਪੰਜਾਬੀ (Punjabi)', locale: 'pa' },
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
  hi: {
    title: 'भाषा सेटिंग्स',
    selectLanguage: 'भाषा चुनें',
    currentLanguage: 'वर्तमान भाषा',
    apply: 'भाषा लागू करें',
    success: 'भाषा सफलतापूर्वक बदली गई',
    description: 'इंटरफेस और वॉयस असिस्टेंट के लिए अपनी पसंदीदा भाषा चुनें।'
  },
  pa: {
    title: 'ਭਾਸ਼ਾ ਸੈਟਿੰਗਾਂ',
    selectLanguage: 'ਭਾਸ਼ਾ ਚੁਣੋ',
    currentLanguage: 'ਮੌਜੂਦਾ ਭਾਸ਼ਾ',
    apply: 'ਭਾਸ਼ਾ ਲਾਗੂ ਕਰੋ',
    success: 'ਭਾਸ਼ਾ ਸਫਲਤਾਪੂਰਵਕ ਬਦਲੀ ਗਈ',
    description: 'ਇੰਟਰਫੇਸ ਅਤੇ ਵੌਇਸ ਅਸਿਸਟੈਂਟ ਲਈ ਆਪਣੀ ਪਸੰਦੀਦਾ ਭਾਸ਼ਾ ਚੁਣੋ।'
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