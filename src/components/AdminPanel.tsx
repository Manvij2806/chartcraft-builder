import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Users, 
  Activity, 
  TrendingUp, 
  Database, 
  Shield, 
  AlertTriangle,
  CheckCircle,
  Clock
} from "lucide-react";

const AdminPanel = () => {
  const systemStats = {
    totalUsers: 1247,
    activeConsultations: 23,
    pendingPrescriptions: 8,
    systemUptime: 99.9,
    
    securityAlerts: 2
  };

  const recentActivities = [
    {
      id: "1",
      type: "consultation",
      message: "Dr. Rajesh Gupta completed consultation with Patient #1023",
      timestamp: "2 minutes ago",
      status: "success"
    },
    {
      id: "2", 
      type: "prescription",
      message: "Prescription RX001 processed and ready for pickup",
      timestamp: "5 minutes ago", 
      status: "success"
    },
    {
      id: "3",
      type: "alert",
      message: "Low stock alert: Amoxicillin 500mg (15 units remaining)",
      timestamp: "10 minutes ago",
      status: "warning"
    },
    {
      id: "4",
      type: "user",
      message: "New patient registration: Rajesh Kumar",
      timestamp: "15 minutes ago",
      status: "info"
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "consultation": return CheckCircle;
      case "prescription": return CheckCircle;
      case "alert": return AlertTriangle;
      case "user": return Users;
      default: return Activity;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success": return "success";
      case "warning": return "warning";
      case "info": return "primary";
      default: return "secondary";
    }
  };

  return (
    <div className="space-y-6">
      {/* System Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                <p className="text-2xl font-bold">{systemStats.totalUsers.toLocaleString()}</p>
                <p className="text-sm text-success">+12% from last month</p>
              </div>
              <Users className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Consultations</p>
                <p className="text-2xl font-bold">{systemStats.activeConsultations}</p>
                <p className="text-sm text-primary">Real-time</p>
              </div>
              <Activity className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending Prescriptions</p>
                <p className="text-2xl font-bold">{systemStats.pendingPrescriptions}</p>
                <p className="text-sm text-warning">Requires attention</p>
              </div>
              <Clock className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">System Uptime</p>
                <p className="text-2xl font-bold">{systemStats.systemUptime}%</p>
                <Progress value={systemStats.systemUptime} className="mt-2" />
              </div>
              <TrendingUp className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>


        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Security Alerts</p>
                <p className="text-2xl font-bold text-destructive">{systemStats.securityAlerts}</p>
                <p className="text-sm text-destructive">Requires review</p>
              </div>
              <Shield className="h-8 w-8 text-destructive" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Recent Activities */}
        <Card className="shadow-elevated">
          <CardHeader className="bg-gradient-primary text-primary-foreground rounded-t-lg">
            <div className="flex items-center gap-3">
              <Activity className="h-6 w-6" />
              <div>
                <CardTitle>System Activity</CardTitle>
                <CardDescription className="text-primary-foreground/80">
                  Real-time system events and updates
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            {recentActivities.map((activity) => {
              const Icon = getActivityIcon(activity.type);
              return (
                <div key={activity.id} className="flex items-start gap-4 p-3 rounded-lg bg-gradient-subtle">
                  <div className="w-8 h-8 bg-background rounded-full flex items-center justify-center">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.message}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-muted-foreground">{activity.timestamp}</span>
                      <Badge variant={getStatusColor(activity.status) as any} className="text-xs">
                        {activity.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

      </div>
    </div>
  );
};

export default AdminPanel;