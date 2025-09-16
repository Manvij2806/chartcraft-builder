import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar, 
  FileText, 
  Video, 
  Pill, 
  Clock,
  CheckCircle,
  User,
  Heart,
  Activity
} from "lucide-react";
import VideoCall from "./VideoCall";

interface Appointment {
  id: string;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  status: "upcoming" | "completed" | "cancelled";
  type: "video" | "in-person";
}

interface MedicalRecord {
  id: string;
  date: string;
  type: "consultation" | "prescription" | "test-result";
  title: string;
  doctor: string;
  summary: string;
}

const PatientPortal = () => {
  const [showVideoCall, setShowVideoCall] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [appointments] = useState<Appointment[]>([
    {
      id: "1",
      doctorName: "Dr. Rajesh Gupta",
      specialty: "General Medicine",
      date: "2024-09-17",
      time: "10:30 AM",
      status: "upcoming",
      type: "video"
    },
    {
      id: "2", 
      doctorName: "Dr. Sunita Verma",
      specialty: "Cardiology",
      date: "2024-09-20",
      time: "2:00 PM", 
      status: "upcoming",
      type: "in-person"
    },
    {
      id: "3",
      doctorName: "Dr. Kavita Sharma",
      specialty: "General Medicine", 
      date: "2024-09-10",
      time: "11:00 AM",
      status: "completed",
      type: "video"
    }
  ]);

  const [medicalRecords] = useState<MedicalRecord[]>([
    {
      id: "1",
      date: "2024-09-10", 
      type: "consultation",
      title: "General Checkup",
      doctor: "Dr. Kavita Sharma",
      summary: "Routine checkup completed. All vitals normal. Recommended follow-up in 6 months."
    },
    {
      id: "2",
      date: "2024-09-10",
      type: "prescription", 
      title: "Medication Prescribed",
      doctor: "Dr. Kavita Sharma",
      summary: "Amoxicillin 500mg prescribed for minor infection. Take 3 times daily for 7 days."
    },
    {
      id: "3",
      date: "2024-08-25",
      type: "test-result",
      title: "Blood Test Results",
      doctor: "Dr. Sunita Verma", 
      summary: "Complete blood count results within normal ranges. Cholesterol levels slightly elevated."
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming": return "primary";
      case "completed": return "success";
      case "cancelled": return "destructive";
      default: return "secondary";
    }
  };

  const getRecordIcon = (type: string) => {
    switch (type) {
      case "consultation": return Video;
      case "prescription": return Pill;
      case "test-result": return Activity;
      default: return FileText;
    }
  };

  const upcomingAppointments = appointments.filter(a => a.status === "upcoming");
  const pastAppointments = appointments.filter(a => a.status === "completed");

  const handleJoinCall = (doctorName: string) => {
    setSelectedDoctor(doctorName);
    setShowVideoCall(true);
  };

  return (
    <>
      {showVideoCall && (
        <VideoCall
          doctorName={selectedDoctor}
          patientName="Patient"
          onEndCall={() => setShowVideoCall(false)}
        />
      )}
      <div className="space-y-6">
      {/* Health Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="shadow-card bg-gradient-subtle">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Next Appointment</p>
                <p className="text-lg font-bold">Tomorrow</p>
                <p className="text-sm text-muted-foreground">10:30 AM</p>
              </div>
              <Calendar className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card bg-gradient-subtle">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Health Score</p>
                <p className="text-2xl font-bold text-success">85%</p>
                <p className="text-sm text-success">Good</p>
              </div>
              <Heart className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card bg-gradient-subtle">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Prescriptions</p>
                <p className="text-2xl font-bold">2</p>
                <p className="text-sm text-muted-foreground">Current medications</p>
              </div>
              <Pill className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Appointments */}
        <Card className="shadow-elevated">
          <CardHeader className="bg-gradient-primary text-primary-foreground rounded-t-lg">
            <div className="flex items-center gap-3">
              <Calendar className="h-6 w-6" />
              <div>
                <CardTitle>My Appointments</CardTitle>
                <CardDescription className="text-primary-foreground/80">
                  Upcoming and past consultations
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Tabs defaultValue="upcoming" className="w-full">
              <TabsList className="grid w-full grid-cols-2 rounded-none">
                <TabsTrigger value="upcoming" className="rounded-none">
                  Upcoming ({upcomingAppointments.length})
                </TabsTrigger>
                <TabsTrigger value="past" className="rounded-none">
                  Past ({pastAppointments.length})
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="upcoming" className="p-6 space-y-4">
                {upcomingAppointments.map((appointment) => (
                  <Card key={appointment.id} className="shadow-card">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                            {appointment.type === "video" ? (
                              <Video className="h-6 w-6 text-primary-foreground" />
                            ) : (
                              <User className="h-6 w-6 text-primary-foreground" />
                            )}
                          </div>
                          <div>
                            <h3 className="font-semibold">{appointment.doctorName}</h3>
                            <p className="text-sm text-muted-foreground">{appointment.specialty}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">{appointment.date} at {appointment.time}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <Badge variant={getStatusColor(appointment.status) as any}>
                            {appointment.status}
                          </Badge>
                          <Button 
                            size="sm" 
                            className="bg-gradient-primary hover:opacity-90"
                            onClick={() => appointment.type === "video" ? handleJoinCall(appointment.doctorName) : undefined}
                          >
                            {appointment.type === "video" ? "Join Call" : "View Details"}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
              
              <TabsContent value="past" className="p-6 space-y-4">
                {pastAppointments.map((appointment) => (
                  <Card key={appointment.id} className="shadow-card opacity-75">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gradient-subtle rounded-full flex items-center justify-center">
                            <CheckCircle className="h-6 w-6 text-success" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{appointment.doctorName}</h3>
                            <p className="text-sm text-muted-foreground">{appointment.specialty}</p>
                            <span className="text-sm text-muted-foreground">
                              {appointment.date} at {appointment.time}
                            </span>
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

        {/* Medical Records */}
        <Card className="shadow-elevated">
          <CardHeader className="bg-gradient-secondary text-secondary-foreground rounded-t-lg">
            <div className="flex items-center gap-3">
              <FileText className="h-6 w-6" />
              <div>
                <CardTitle>Medical Records</CardTitle>
                <CardDescription className="text-secondary-foreground/80">
                  Your health history and documents
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            {medicalRecords.map((record) => {
              const Icon = getRecordIcon(record.type);
              return (
                <Card key={record.id} className="shadow-card">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-gradient-subtle rounded-full flex items-center justify-center">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold">{record.title}</h3>
                          <span className="text-sm text-muted-foreground">{record.date}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          By {record.doctor}
                        </p>
                        <p className="text-sm">{record.summary}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </CardContent>
        </Card>
      </div>
      </div>
    </>
  );
};

export default PatientPortal;