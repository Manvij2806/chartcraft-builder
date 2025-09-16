import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  User, 
  Brain, 
  Stethoscope, 
  Pill, 
  Menu, 
  X,
  Shield,
  Database
} from "lucide-react";

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Navigation = ({ activeTab, onTabChange }: NavigationProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: "patient", label: "Patient Portal", icon: User },
    { id: "symptom-checker", label: "Symptom Checker", icon: Brain },
    { id: "doctor", label: "Doctor Dashboard", icon: Stethoscope },
    { id: "pharmacy", label: "Pharmacy", icon: Pill },
    { id: "admin", label: "Admin Panel", icon: Shield },
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <Card className="hidden md:block shadow-elevated">
        <div className="p-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-hero rounded-lg flex items-center justify-center">
                <Database className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Sehat Saathi</h1>
                <p className="text-sm text-muted-foreground">Healthcare Management System by Ministry of Punjab</p>
              </div>
            </div>
          </div>
          
          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant={activeTab === item.id ? "default" : "ghost"}
                  className={`w-full justify-start ${
                    activeTab === item.id 
                      ? "bg-gradient-primary text-primary-foreground" 
                      : "hover:bg-accent"
                  }`}
                  onClick={() => onTabChange(item.id)}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.label}
                </Button>
              );
            })}
          </nav>
        </div>
      </Card>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <Card className="shadow-elevated">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-hero rounded-lg flex items-center justify-center">
                <Database className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-lg font-bold">Sehat Saathi</h1>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
          
          {isMobileMenuOpen && (
            <div className="border-t bg-background p-4">
              <nav className="space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Button
                      key={item.id}
                      variant={activeTab === item.id ? "default" : "ghost"}
                      className={`w-full justify-start ${
                        activeTab === item.id 
                          ? "bg-gradient-primary text-primary-foreground" 
                          : "hover:bg-accent"
                      }`}
                      onClick={() => {
                        onTabChange(item.id);
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      <Icon className="mr-3 h-5 w-5" />
                      {item.label}
                    </Button>
                  );
                })}
              </nav>
            </div>
          )}
        </Card>
      </div>
    </>
  );
};

export default Navigation;