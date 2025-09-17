import { useState } from "react";
import Navigation from "@/components/Navigation";
import PatientPortal from "@/components/PatientPortal";
import SymptomChecker from "@/components/SymptomChecker";
import DoctorDashboard from "@/components/DoctorDashboard";
import PharmacyModule from "@/components/PharmacyModule";
import AdminPanel from "@/components/AdminPanel";
import VoiceAssistant from "@/components/VoiceAssistant";
import LanguageSelector from "@/components/LanguageSelector";
import { useLanguage } from "@/hooks/useLanguage";

const Index = () => {
  const [activeTab, setActiveTab] = useState("patient");
  const { language, locale, changeLanguage } = useLanguage();

  const renderContent = () => {
    switch (activeTab) {
      case "patient":
        return <PatientPortal />;
      case "symptom-checker":
        return <SymptomChecker />;
      case "doctor":
        return <DoctorDashboard />;
      case "pharmacy":
        return <PharmacyModule />;
      case "admin":
        return <AdminPanel />;
      default:
        return <PatientPortal />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Navigation Sidebar */}
          <div className="md:col-span-1">
            <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
          </div>
          
          {/* Main Content */}
          <div className="md:col-span-3 space-y-6">
            {/* Voice Assistant and Language Selector */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <VoiceAssistant language={language} />
              <LanguageSelector onLanguageChange={changeLanguage} />
            </div>
            
            {/* Main Application Content */}
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
