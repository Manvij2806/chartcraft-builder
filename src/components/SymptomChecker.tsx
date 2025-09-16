import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Brain, FileText, Loader2, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import VideoCall from "./VideoCall";

const SymptomChecker = () => {
  const [symptoms, setSymptoms] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [showVideoCall, setShowVideoCall] = useState(false);
  const { toast } = useToast();

  const analyzeSymptoms = async () => {
    if (!symptoms.trim()) {
      toast({
        title: "Please enter symptoms",
        description: "Describe your symptoms to get an AI analysis",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      setAnalysis(`Based on your symptoms: "${symptoms}"
      
**Preliminary Assessment:**
• Possible conditions: Common cold, viral infection, or allergic reaction
• Severity: Mild to moderate
• Recommended action: Monitor symptoms and consider telehealth consultation

**Recommendations:**
• Stay hydrated and get adequate rest
• Monitor temperature if fever symptoms persist
• Consider over-the-counter symptom relief if appropriate
• Schedule consultation with healthcare provider if symptoms worsen

**👨‍⚕️ Specialist Recommendation:**
Based on your symptoms, we recommend consulting with a General Medicine doctor or Internal Medicine specialist for comprehensive evaluation.

**⚠️ Important:** This is an AI-generated preliminary assessment. Please consult with a qualified healthcare provider for proper medical diagnosis and treatment.`);
      setIsAnalyzing(false);
      
      toast({
        title: "Analysis Complete",
        description: "Your symptom analysis is ready. Review the recommendations below.",
      });
    }, 3000);
  };

  const requestConsultation = () => {
    setShowVideoCall(true);
  };

  return (
    <>
      {showVideoCall && (
        <VideoCall
          doctorName="Dr. Rajesh Gupta"
          patientName="Patient"
          onEndCall={() => setShowVideoCall(false)}
        />
      )}
      <div className="space-y-6">
      <Card className="shadow-medical">
        <CardHeader className="bg-gradient-primary text-primary-foreground rounded-t-lg">
          <div className="flex items-center gap-3">
            <Brain className="h-6 w-6" />
            <div>
              <CardTitle>AI Symptom Checker</CardTitle>
              <CardDescription className="text-primary-foreground/80">
                Describe your symptoms for preliminary assessment
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="symptoms" className="text-sm font-medium">
                Describe your symptoms in detail
              </Label>
              <Textarea
                id="symptoms"
                placeholder="Example: I have been experiencing headache and mild fever for 2 days, along with body aches..."
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                className="mt-2 min-h-[120px] resize-none"
              />
            </div>
            
            <Button
              onClick={analyzeSymptoms}
              disabled={isAnalyzing}
              className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing Symptoms...
                </>
              ) : (
                <>
                  <Brain className="mr-2 h-4 w-4" />
                  Analyze Symptoms
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {analysis && (
        <Card className="shadow-card">
          <CardHeader className="bg-gradient-secondary text-secondary-foreground rounded-t-lg">
            <div className="flex items-center gap-3">
              <FileText className="h-6 w-6" />
              <div>
                <CardTitle>Analysis Report</CardTitle>
                <CardDescription className="text-secondary-foreground/80">
                  AI-generated preliminary assessment
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="prose prose-sm max-w-none">
              <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-foreground">
                {analysis}
              </pre>
            </div>
            
            <div className="flex gap-3 mt-6">
              <Button
                onClick={requestConsultation}
                className="flex-1 bg-gradient-secondary hover:opacity-90 transition-opacity"
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                Call Specialist Doctor
              </Button>
              <Button variant="outline" className="flex-1">
                Save Report
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
      </div>
    </>
  );
};

export default SymptomChecker;