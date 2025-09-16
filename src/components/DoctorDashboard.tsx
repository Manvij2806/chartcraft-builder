import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  Calendar, 
  FileText, 
  Video, 
  Clock, 
  AlertCircle,
  CheckCircle,
  User
} from "lucide-react";

interface Patient {
  id: string;
  name: string;
  age: number;
  symptoms: string;
  priority: "high" | "medium" | "low";
  status: "waiting" | "in-consultation" | "completed";
  appointmentTime: string;
}

const DoctorDashboard = () => {
  const [patients] = useState<Patient[]>([
    {
      id: "1",
      name: "Sarah Johnson",
      age: 34,
      symptoms: "Persistent headache, mild fever",
      priority: "high",
      status: "waiting",
      appointmentTime: "10:30 AM"
    },
    {
      id: "2", 
      name: "Michael Chen",
      age: 28,
      symptoms: "Cough, sore throat",
      priority: "medium",
      status: "waiting",
      appointmentTime: "11:00 AM"
    },
    {
      id: "3",
      name: "Emma Davis",
      age: 45,
      symptoms: "Back pain, muscle stiffness",
      priority: "low",
      status: "completed",
      appointmentTime: "9:30 AM"
    }
  ]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "destructive";
      case "medium": return "warning";
      case "low": return "secondary";
      default: return "secondary";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "waiting": return "warning";
      case "in-consultation": return "primary";
      case "completed": return "success";
      default: return "secondary";
    }
  };

  const waitingPatients = patients.filter(p => p.status === "waiting");
  const completedPatients = patients.filter(p => p.status === "completed");

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Today's Patients</p>
                <p className="text-2xl font-bold">{patients.length}</p>
              </div>
              <Users className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Waiting</p>
                <p className="text-2xl font-bold text-warning">{waitingPatients.length}</p>
              </div>
              <Clock className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold text-success">{completedPatients.length}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">High Priority</p>
                <p className="text-2xl font-bold text-destructive">
                  {patients.filter(p => p.priority === "high").length}
                </p>
              </div>
              <AlertCircle className="h-8 w-8 text-destructive" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Patient Queue */}
      <Card className="shadow-elevated">
        <CardHeader className="bg-gradient-primary text-primary-foreground rounded-t-lg">
          <div className="flex items-center gap-3">
            <Calendar className="h-6 w-6" />
            <div>
              <CardTitle>Patient Queue</CardTitle>
              <CardDescription className="text-primary-foreground/80">
                Manage your consultations and patient flow
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Tabs defaultValue="waiting" className="w-full">
            <TabsList className="grid w-full grid-cols-2 rounded-none">
              <TabsTrigger value="waiting" className="rounded-none">
                Waiting ({waitingPatients.length})
              </TabsTrigger>
              <TabsTrigger value="completed" className="rounded-none">
                Completed ({completedPatients.length})
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="waiting" className="p-6 space-y-4">
              {waitingPatients.map((patient) => (
                <Card key={patient.id} className="shadow-card">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gradient-subtle rounded-full flex items-center justify-center">
                          <User className="h-6 w-6 text-primary" />
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{patient.name}</h3>
                            <Badge variant="outline">Age {patient.age}</Badge>
                            <Badge variant={getPriorityColor(patient.priority) as any}>
                              {patient.priority} priority
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Symptoms: {patient.symptoms}
                          </p>
                          <p className="text-sm font-medium text-primary">
                            Scheduled: {patient.appointmentTime}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" className="bg-gradient-primary hover:opacity-90">
                          <Video className="mr-2 h-4 w-4" />
                          Start Consultation
                        </Button>
                        <Button size="sm" variant="outline">
                          <FileText className="mr-2 h-4 w-4" />
                          View History
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
            
            <TabsContent value="completed" className="p-6 space-y-4">
              {completedPatients.map((patient) => (
                <Card key={patient.id} className="shadow-card opacity-75">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-subtle rounded-full flex items-center justify-center">
                          <User className="h-6 w-6 text-success" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{patient.name}</h3>
                            <Badge variant="outline">Age {patient.age}</Badge>
                            <Badge variant="success">Completed</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {patient.symptoms}
                          </p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        <FileText className="mr-2 h-4 w-4" />
                        View Notes
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default DoctorDashboard;