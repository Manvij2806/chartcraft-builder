import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mic, MicOff, Volume2, VolumeX } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface VoiceAssistantProps {
  language?: string;
}

// Extend Window interface for speech recognition
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

const VoiceAssistant = ({ language = 'en-US' }: VoiceAssistantProps) => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [response, setResponse] = useState("");
  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const { toast } = useToast();

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

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setTranscript(transcript);
        handleVoiceCommand(transcript);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current.onerror = (event) => {
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

    // Medical assistant responses
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

    setResponse(responseText);
    speak(responseText);
  };

  const speak = (text: string) => {
    if (synthRef.current) {
      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language;
      utterance.rate = 0.9;
      utterance.pitch = 1;
      
      utterance.onend = () => {
        setIsSpeaking(false);
      };
      
      utterance.onerror = () => {
        setIsSpeaking(false);
        toast({
          title: "Speech synthesis error",
          description: "Unable to speak response",
          variant: "destructive",
        });
      };

      synthRef.current.speak(utterance);
    }
  };

  const startListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.start();
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

  return (
    <Card className="p-6 shadow-medical">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Voice Assistant</h3>
          <div className="flex space-x-2">
            <Button
              variant={isListening ? "destructive" : "default"}
              size="sm"
              onClick={isListening ? stopListening : startListening}
              className="bg-gradient-primary hover:opacity-90"
            >
              {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              {isListening ? "Stop" : "Listen"}
            </Button>
            <Button
              variant={isSpeaking ? "destructive" : "secondary"}
              size="sm"
              onClick={stopSpeaking}
              disabled={!isSpeaking}
            >
              {isSpeaking ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              {isSpeaking ? "Stop Speaking" : "Ready"}
            </Button>
          </div>
        </div>

        {transcript && (
          <div className="p-3 bg-accent rounded-md">
            <p className="text-sm text-accent-foreground">
              <strong>You said:</strong> {transcript}
            </p>
          </div>
        )}

        {response && (
          <div className="p-3 bg-secondary/10 rounded-md">
            <p className="text-sm text-foreground">
              <strong>Assistant:</strong> {response}
            </p>
          </div>
        )}

        {isListening && (
          <div className="flex items-center justify-center p-4">
            <div className="animate-pulse">
              <Mic className="h-8 w-8 text-primary" />
            </div>
            <span className="ml-2 text-primary">Listening...</span>
          </div>
        )}

        <div className="text-xs text-muted-foreground">
          <p>Say "help" for available commands or ask about symptoms, appointments, or prescriptions.</p>
        </div>
      </div>
    </Card>
  );
};

export default VoiceAssistant;