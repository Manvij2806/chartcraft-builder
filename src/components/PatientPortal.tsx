import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";
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
  const { t } = useLanguage();
  const [showVideoCall, setShowVideoCall] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [appointments] = useState<Appointment[]>([
    {
      id: "1",
      doctorName: "Dr. Rajesh Gupta",
      specialty: "General Medicine",
      date: "20-09-2025",
      time: "10:30 AM",
      status: "upcoming",
      type: "video"
    },
    {
      id: "2", 
      doctorName: "Dr. Sunita Verma",
      specialty: "Cardiology",
      date: "20-09-2025",
      time: "2:00 PM", 
      status: "upcoming",
      type: "in-person"
    },
    {
      id: "3",
      doctorName: "Dr. Kavita Sharma",
      specialty: "General Medicine", 
      date: "20-09-2025",
      time: "11:00 AM",
      status: "completed",
      type: "video"
    }
  ]);

  const [medicalRecords] = useState<MedicalRecord[]>([
    {
      id: "1",
      date: "20-09-2025", 
      type: "consultation",
      title: t('general_checkup'),
      doctor: "Dr. Kavita Sharma",
      summary: t('routine_checkup_completed')
    },
    {
      id: "2",
      date: "20-09-2025",
      type: "prescription", 
      title: t('medication_prescribed'),
      doctor: "Dr. Kavita Sharma",
      summary: t('amoxicillin_prescribed')
    },
    {
      id: "3",
      date: "20-09-2025",
      type: "test-result",
      title: t('blood_test_results'),
      doctor: "Dr. Sunita Verma", 
      summary: t('blood_test_normal')
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
                <p className="text-sm font-medium text-muted-foreground">{t('next_appointment')}</p>
                <p className="text-lg font-bold">{t('tomorrow')}</p>
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
                <p className="text-sm font-medium text-muted-foreground">{t('health_score')}</p>
                <p className="text-2xl font-bold text-success">85%</p>
                <p className="text-sm text-success">{t('good')}</p>
              </div>
              <Heart className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card bg-gradient-subtle">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{t('active_prescriptions')}</p>
                <p className="text-2xl font-bold">2</p>
                <p className="text-sm text-muted-foreground">{t('current_medications')}</p>
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
                <CardTitle>{t('my_appointments')}</CardTitle>
                <CardDescription className="text-primary-foreground/80">
                  {t('upcoming_past_consultations')}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Tabs defaultValue="upcoming" className="w-full">
              <TabsList className="grid w-full grid-cols-2 rounded-none">
                <TabsTrigger value="upcoming" className="rounded-none">
                  {t('upcoming')} ({upcomingAppointments.length})
                </TabsTrigger>
                <TabsTrigger value="past" className="rounded-none">
                  {t('past')} ({pastAppointments.length})
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
                            {appointment.type === "video" ? t('join_call') : t('view_details')}
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
                          {t('view_notes')}
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
                <CardTitle>{t('medical_records')}</CardTitle>
                <CardDescription className="text-secondary-foreground/80">
                  {t('health_history_documents')}
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