import { useState } from "react";
import Navigation from "@/components/Navigation";
import PatientPortal from "@/components/PatientPortal";
import SymptomChecker from "@/components/SymptomChecker";
import DoctorDashboard from "@/components/DoctorDashboard";
import PharmacyModule from "@/components/PharmacyModule";
import AdminPanel from "@/components/AdminPanel";
import HeaderControls from "@/components/HeaderControls";
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
      {/* Header with Controls */}
      <div className="bg-card border-b border-border shadow-card">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-foreground">Healthcare System</h1>
            <HeaderControls 
              language={language} 
              locale={locale} 
              onLanguageChange={changeLanguage} 
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Navigation Sidebar */}
          <div className="md:col-span-1">
            <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
          </div>
          
          {/* Main Application Content */}
          <div className="md:col-span-3">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
