import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mic, MicOff, Settings, Languages, Volume2, VolumeX } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface HeaderControlsProps {
  language: string;
  locale: string;
  onLanguageChange: (language: string, locale: string) => void;
}

const languages = [
  { code: 'en-US', name: 'English', locale: 'en' },
  { code: 'hi-IN', name: 'हिन्दी (Hindi)', locale: 'hi' },
  { code: 'pa-IN', name: 'ਪੰਜਾਬੀ (Punjabi)', locale: 'pa' },
];

const translations = {
  en: {
    voiceAssistant: 'Voice Assistant',
    languageSettings: 'Language Settings',
    selectLanguage: 'Select Language',
    apply: 'Apply',
    listening: 'Listening...',
    stopListening: 'Stop',
    startListening: 'Start Voice',
    speaking: 'Speaking...',
    stopSpeaking: 'Stop',
    success: 'Language changed successfully',
    helpText: "Say 'help' for available commands or ask about symptoms, appointments, or prescriptions.",
    youSaid: 'You said:',
    assistant: 'Assistant:'
  },
  hi: {
    voiceAssistant: 'वॉयस असिस्टेंट',
    languageSettings: 'भाषा सेटिंग्स',
    selectLanguage: 'भाषा चुनें',
    apply: 'लागू करें',
    listening: 'सुन रहा है...',
    stopListening: 'रोकें',
    startListening: 'वॉयस शुरू करें',
    speaking: 'बोल रहा है...',
    stopSpeaking: 'रोकें',
    success: 'भाषा सफलतापूर्वक बदली गई',
    helpText: "सहायता के लिए 'मदद' कहें या लक्षण, अपॉइंटमेंट या दवाओं के बारे में पूछें।",
    youSaid: 'आपने कहा:',
    assistant: 'असिस्टेंट:'
  },
  pa: {
    voiceAssistant: 'ਵੌਇਸ ਅਸਿਸਟੈਂਟ',
    languageSettings: 'ਭਾਸ਼ਾ ਸੈਟਿੰਗਾਂ',
    selectLanguage: 'ਭਾਸ਼ਾ ਚੁਣੋ',
    apply: 'ਲਾਗੂ ਕਰੋ',
    listening: 'ਸੁਣ ਰਿਹਾ ਹੈ...',
    stopListening: 'ਰੋਕੋ',
    startListening: 'ਵੌਇਸ ਸ਼ੁਰੂ ਕਰੋ',
    speaking: 'ਬੋਲ ਰਿਹਾ ਹੈ...',
    stopSpeaking: 'ਰੋਕੋ',
    success: 'ਭਾਸ਼ਾ ਸਫਲਤਾਪੂਰਵਕ ਬਦਲੀ ਗਈ',
    helpText: "ਮਦਦ ਲਈ 'ਮਦਦ' ਕਹੋ ਜਾਂ ਲੱਛਣਾਂ, ਮੁਲਾਕਾਤਾਂ ਜਾਂ ਦਵਾਈਆਂ ਬਾਰੇ ਪੁੱਛੋ।",
    youSaid: 'ਤੁਸੀਂ ਕਿਹਾ:',
    assistant: 'ਅਸਿਸਟੈਂਟ:'
  }
};

// Extend Window interface for speech recognition
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

const HeaderControls = ({ language, locale, onLanguageChange }: HeaderControlsProps) => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [response, setResponse] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState(language);
  const [isVoiceDialogOpen, setIsVoiceDialogOpen] = useState(false);
  const [isLanguageDialogOpen, setIsLanguageDialogOpen] = useState(false);
  
  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const { toast } = useToast();

  const t = translations[locale as keyof typeof translations] || translations.en;

  useEffect(() => {
    setSelectedLanguage(language);
  }, [language]);

  useEffect(() => {
    // Initialize speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = language;

      recognitionRef.current.onstart = () => {
        setIsListening(true);
      };

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setTranscript(transcript);
        handleVoiceCommand(transcript);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
        toast({
          title: "Voice recognition error",
          description: "Please try again",
          variant: "destructive",
        });
      };
    }

    // Initialize speech synthesis
    synthRef.current = window.speechSynthesis;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, [language]);

  const handleVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase();
    let responseText = "";

    // Medical assistant responses in multiple languages
    if (language.includes('hi')) {
      // Hindi responses
      if (lowerCommand.includes("लक्षण") || lowerCommand.includes("दर्द") || lowerCommand.includes("symptom") || lowerCommand.includes("pain")) {
        responseText = "मैं आपके लक्षणों की जांच में मदद कर सकता हूं। कृपया सिम्पटम चेकर टैब पर जाएं या अपने लक्षणों का विस्तार से वर्णन करें।";
      } else if (lowerCommand.includes("अपॉइंटमेंट") || lowerCommand.includes("डॉक्टर") || lowerCommand.includes("appointment") || lowerCommand.includes("doctor")) {
        responseText = "आप पेशेंट पोर्टल में अपने अपॉइंटमेंट देख सकते हैं या डॉक्टर के साथ नया अपॉइंटमेंट शेड्यूल कर सकते हैं।";
      } else if (lowerCommand.includes("दवा") || lowerCommand.includes("prescription") || lowerCommand.includes("medicine")) {
        responseText = "दवा की जानकारी के लिए, कृपया फार्मेसी मॉड्यूल देखें या अपने डॉक्टर से सलाह लें।";
      } else if (lowerCommand.includes("आपातकाल") || lowerCommand.includes("emergency") || lowerCommand.includes("urgent")) {
        responseText = "यदि यह मेडिकल इमरजेंसी है, तो कृपया तुरंत आपातकालीन सेवाओं को कॉल करें।";
      } else if (lowerCommand.includes("मदद") || lowerCommand.includes("help")) {
        responseText = "मैं आपको स्वास्थ्य सेवा में मदद कर सकता हूं। आप लक्षण जांच, अपॉइंटमेंट देखना, दवाएं प्रबंधित करना या डॉक्टरों से संपर्क कर सकते हैं।";
      } else {
        responseText = "मैं समझ गया कि आपने कहा: " + command + "। आज मैं आपकी स्वास्थ्य संबंधी जरूरतों में कैसे मदद कर सकता हूं?";
      }
    } else if (language.includes('pa')) {
      // Punjabi responses
      if (lowerCommand.includes("ਲੱਛਣ") || lowerCommand.includes("ਦਰਦ") || lowerCommand.includes("symptom") || lowerCommand.includes("pain")) {
        responseText = "ਮੈਂ ਤੁਹਾਡੇ ਲੱਛਣਾਂ ਦੀ ਜਾਂਚ ਵਿੱਚ ਮਦਦ ਕਰ ਸਕਦਾ ਹਾਂ। ਕਿਰਪਾ ਕਰਕੇ ਸਿੰਪਟਮ ਚੈਕਰ ਟੈਬ 'ਤੇ ਜਾਓ ਜਾਂ ਆਪਣੇ ਲੱਛਣਾਂ ਦਾ ਵਿਸਤਾਰ ਨਾਲ ਵਰਣਨ ਕਰੋ।";
      } else if (lowerCommand.includes("ਮੁਲਾਕਾਤ") || lowerCommand.includes("ਡਾਕਟਰ") || lowerCommand.includes("appointment") || lowerCommand.includes("doctor")) {
        responseText = "ਤੁਸੀਂ ਮਰੀਜ਼ ਪੋਰਟਲ ਵਿੱਚ ਆਪਣੀਆਂ ਮੁਲਾਕਾਤਾਂ ਦੇਖ ਸਕਦੇ ਹੋ ਜਾਂ ਡਾਕਟਰ ਨਾਲ ਨਵੀਂ ਮੁਲਾਕਾਤ ਨਿਰਧਾਰਿਤ ਕਰ ਸਕਦੇ ਹੋ।";
      } else if (lowerCommand.includes("ਦਵਾਈ") || lowerCommand.includes("prescription") || lowerCommand.includes("medicine")) {
        responseText = "ਦਵਾਈ ਦੀ ਜਾਣਕਾਰੀ ਲਈ, ਕਿਰਪਾ ਕਰਕੇ ਫਾਰਮੇਸੀ ਮੋਡਿਊਲ ਦੇਖੋ ਜਾਂ ਆਪਣੇ ਡਾਕਟਰ ਨਾਲ ਸਲਾਹ ਕਰੋ।";
      } else if (lowerCommand.includes("ਐਮਰਜੈਂਸੀ") || lowerCommand.includes("emergency") || lowerCommand.includes("urgent")) {
        responseText = "ਜੇ ਇਹ ਮੈਡੀਕਲ ਐਮਰਜੈਂਸੀ ਹੈ, ਤਾਂ ਕਿਰਪਾ ਕਰਕੇ ਤੁਰੰਤ ਐਮਰਜੈਂਸੀ ਸੇਵਾਵਾਂ ਨੂੰ ਕਾਲ ਕਰੋ।";
      } else if (lowerCommand.includes("ਮਦਦ") || lowerCommand.includes("help")) {
        responseText = "ਮੈਂ ਤੁਹਾਨੂੰ ਸਿਹਤ ਸੇਵਾ ਵਿੱਚ ਮਦਦ ਕਰ ਸਕਦਾ ਹਾਂ। ਤੁਸੀਂ ਲੱਛਣਾਂ ਦੀ ਜਾਂਚ, ਮੁਲਾਕਾਤਾਂ ਦੇਖਣਾ, ਦਵਾਈਆਂ ਦਾ ਪ੍ਰਬੰਧਨ ਜਾਂ ਡਾਕਟਰਾਂ ਨਾਲ ਸੰਪਰਕ ਕਰ ਸਕਦੇ ਹੋ।";
      } else {
        responseText = "ਮੈਂ ਸਮਝ ਗਿਆ ਕਿ ਤੁਸੀਂ ਕਿਹਾ: " + command + "। ਅੱਜ ਮੈਂ ਤੁਹਾਡੀਆਂ ਸਿਹਤ ਸੰਬੰਧੀ ਲੋੜਾਂ ਵਿੱਚ ਕਿਵੇਂ ਮਦਦ ਕਰ ਸਕਦਾ ਹਾਂ?";
      }
    } else {
      // English responses
      if (lowerCommand.includes("symptom") || lowerCommand.includes("pain")) {
        responseText = "I can help you check your symptoms. Please go to the symptom checker tab or describe your symptoms in detail.";
      } else if (lowerCommand.includes("appointment") || lowerCommand.includes("doctor")) {
        responseText = "You can view your appointments in the patient portal or schedule a new appointment with a doctor.";
      } else if (lowerCommand.includes("prescription") || lowerCommand.includes("medicine")) {
        responseText = "For prescription information, please check the pharmacy module or consult with your doctor.";
      } else if (lowerCommand.includes("emergency") || lowerCommand.includes("urgent")) {
        responseText = "If this is a medical emergency, please call emergency services immediately. For urgent but non-emergency care, contact your doctor.";
      } else if (lowerCommand.includes("help")) {
        responseText = "I can help you navigate the healthcare system. You can check symptoms, view appointments, manage prescriptions, or contact doctors.";
      } else {
        responseText = "I understand you said: " + command + ". How can I help you with your healthcare needs today?";
      }
    }

    setResponse(responseText);
    speak(responseText);
  };

  const speak = (text: string) => {
    if (synthRef.current && 'speechSynthesis' in window) {
      setIsSpeaking(true);
      synthRef.current.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language;
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 1;
      
      utterance.onend = () => {
        setIsSpeaking(false);
      };
      
      utterance.onerror = () => {
        setIsSpeaking(false);
      };

      synthRef.current.speak(utterance);
    }
  };

  const startListening = () => {
    if (recognitionRef.current && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      try {
        setIsVoiceDialogOpen(true);
        recognitionRef.current.start();
      } catch (error) {
        toast({
          title: "Voice recognition error",
          description: "Unable to start voice recognition",
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "Voice recognition not supported",
        description: "Your browser doesn't support voice recognition",
        variant: "destructive",
      });
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

  const stopSpeaking = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
    }
  };

  const handleLanguageChange = (languageCode: string) => {
    const language = languages.find(lang => lang.code === languageCode);
    if (language) {
      setSelectedLanguage(languageCode);
      onLanguageChange(languageCode, language.locale);
      
      const newTranslations = translations[language.locale as keyof typeof translations] || translations.en;
      toast({
        title: newTranslations.success,
        description: `${language.name}`,
      });
      
      setIsLanguageDialogOpen(false);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      {/* Voice Assistant Button */}
      <Dialog open={isVoiceDialogOpen} onOpenChange={setIsVoiceDialogOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            onClick={startListening}
            className="flex items-center space-x-2"
          >
            <Mic className="h-4 w-4" />
            <span className="hidden sm:inline">{t.voiceAssistant}</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{t.voiceAssistant}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-2">
              <Button
                variant={isListening ? "destructive" : "default"}
                onClick={isListening ? stopListening : startListening}
                className="bg-gradient-primary hover:opacity-90"
              >
                {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                {isListening ? t.stopListening : t.startListening}
              </Button>
              <Button
                variant="secondary"
                onClick={stopSpeaking}
                disabled={!isSpeaking}
              >
                {isSpeaking ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                {isSpeaking ? t.stopSpeaking : "Ready"}
              </Button>
            </div>

            {isListening && (
              <div className="flex items-center justify-center p-4 bg-accent rounded-md">
                <div className="animate-pulse">
                  <Mic className="h-8 w-8 text-primary" />
                </div>
                <span className="ml-2 text-primary">{t.listening}</span>
              </div>
            )}

            {transcript && (
              <div className="p-3 bg-accent rounded-md">
                <p className="text-sm">
                  <strong>{t.youSaid}</strong> {transcript}
                </p>
              </div>
            )}

            {response && (
              <div className="p-3 bg-secondary/10 rounded-md">
                <p className="text-sm">
                  <strong>{t.assistant}</strong> {response}
                </p>
              </div>
            )}

            <div className="text-xs text-muted-foreground">
              <p>{t.helpText}</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Language Settings Button */}
      <Dialog open={isLanguageDialogOpen} onOpenChange={setIsLanguageDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="flex items-center space-x-2">
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline">{t.languageSettings}</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{t.languageSettings}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">{t.selectLanguage}</label>
              <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                      <div className="flex items-center space-x-2">
                        <Languages className="h-4 w-4" />
                        <span>{lang.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button 
              onClick={() => handleLanguageChange(selectedLanguage)}
              className="w-full bg-gradient-primary hover:opacity-90"
            >
              {t.apply}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HeaderControls;