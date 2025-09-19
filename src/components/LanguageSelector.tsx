import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Globe, Languages } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

interface LanguageSelectorProps {
  onLanguageChange?: (language: string, locale: string) => void;
}

const languages = [
  { code: 'en', name: 'English', locale: 'en' },
  { code: 'hi', name: 'हिन्दी (Hindi)', locale: 'hi' },
  { code: 'pa', name: 'ਪੰਜਾਬੀ (Punjabi)', locale: 'pa' },
];

const LanguageSelector = ({ onLanguageChange }: LanguageSelectorProps) => {
  const { language, setLanguage, t } = useLanguage();
  const [selectedLanguage, setSelectedLanguage] = useState(language);
  const { toast } = useToast();

  const handleLanguageChange = (languageCode: string) => {
    const selectedLang = languages.find(lang => lang.code === languageCode);
    if (selectedLang) {
      setSelectedLanguage(languageCode);
      setLanguage(languageCode);
      
      if (onLanguageChange) {
        onLanguageChange(languageCode, selectedLang.locale);
      }
      
      toast({
        title: t('language_changed'),
        description: t('language_changed'),
      });
    }
  };

  return (
    <Card className="p-4 shadow-card">
      <div className="flex flex-col space-y-3">
        <div className="flex items-center space-x-2">
          <Globe className="h-4 w-4 text-primary" />
          <h3 className="text-sm font-semibold">{t('select_language')}</h3>
        </div>

        <div className="space-y-2">
          <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder={t('select_language')} />
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
      </div>
    </Card>
  );
};

export default LanguageSelector;