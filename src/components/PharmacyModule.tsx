import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  Pill, 
  Search, 
  ShoppingCart, 
  Package, 
  Clock,
  CheckCircle,
  AlertTriangle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Prescription {
  id: string;
  patientName: string;
  doctorName: string;
  date: string;
  status: "pending" | "processing" | "ready" | "dispensed";
  medications: {
    name: string;
    dosage: string;
    quantity: number;
    instructions: string;
    inStock: boolean;
  }[];
}

interface Medication {
  id: string;
  name: string;
  category: string;
  stock: number;
  price: number;
  expiryDate: string;
}

const PharmacyModule = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const [prescriptions] = useState<Prescription[]>([
    {
      id: "RX001",
      patientName: "Priya Sharma",
      doctorName: "Dr. Rajesh Gupta",
      date: "20-09-2025",
      status: "pending",
      medications: [
        {
          name: "Amoxicillin 500mg",
          dosage: "500mg",
          quantity: 21,
          instructions: "Take 1 capsule 3 times daily with food",
          inStock: true
        },
        {
          name: "Ibuprofen 400mg",
          dosage: "400mg", 
          quantity: 10,
          instructions: "Take 1 tablet as needed for pain",
          inStock: true
        }
      ]
    },
    {
      id: "RX002",
      patientName: "Rajesh Kumar",
      date: "20-09-2025",
      doctorName: "Dr. Sunita Verma",
      status: "ready",
      medications: [
        {
          name: "Cough Syrup",
          dosage: "10ml",
          quantity: 1,
          instructions: "Take 10ml 4 times daily",
          inStock: true
        }
      ]
    }
  ]);

  const [inventory] = useState<Medication[]>([
    {
      id: "MED001",
      name: "Amoxicillin 500mg",
      category: "Antibiotics",
      stock: 120,
      price: 125.50,
      expiryDate: "2025-12-31"
    },
    {
      id: "MED002", 
      name: "Ibuprofen 400mg",
      category: "Pain Relief",
      stock: 85,
      price: 75.00,
      expiryDate: "2025-08-15"
    },
    {
      id: "MED003",
      name: "Cough Syrup",
      category: "Respiratory",
      stock: 25,
      price: 95.00,
      expiryDate: "2024-11-30"
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "warning";
      case "processing": return "primary";
      case "ready": return "success";
      case "dispensed": return "secondary";
      default: return "secondary";
    }
  };

  const processePrescription = (id: string) => {
    toast({
      title: "Processing Prescription",
      description: `Prescription ${id} is being processed`,
    });
  };

  const markReady = (id: string) => {
    toast({
      title: "Prescription Ready",
      description: `Prescription ${id} is ready for pickup`,
    });
  };

  const filteredInventory = inventory.filter(med =>
    med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    med.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold text-warning">
                  {prescriptions.filter(p => p.status === "pending").length}
                </p>
              </div>
              <Clock className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Ready</p>
                <p className="text-2xl font-bold text-success">
                  {prescriptions.filter(p => p.status === "ready").length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Low Stock</p>
                <p className="text-2xl font-bold text-destructive">
                  {inventory.filter(med => med.stock < 30).length}
                </p>
              </div>
              <AlertTriangle className="h-8 w-8 text-destructive" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Items</p>
                <p className="text-2xl font-bold">{inventory.length}</p>
              </div>
              <Package className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Prescriptions */}
        <Card className="shadow-elevated">
          <CardHeader className="bg-gradient-primary text-primary-foreground rounded-t-lg">
            <div className="flex items-center gap-3">
              <Pill className="h-6 w-6" />
              <div>
                <CardTitle>E-Prescriptions</CardTitle>
                <CardDescription className="text-primary-foreground/80">
                  Manage and process prescriptions
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            {prescriptions.map((prescription) => (
              <Card key={prescription.id} className="shadow-card">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{prescription.patientName}</h3>
                        <p className="text-sm text-muted-foreground">
                          Prescribed by {prescription.doctorName}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge variant={getStatusColor(prescription.status) as any}>
                          {prescription.status}
                        </Badge>
                        <p className="text-sm text-muted-foreground mt-1">
                          {prescription.id}
                        </p>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      {prescription.medications.map((med, index) => (
                        <div key={index} className="flex items-center justify-between text-sm">
                          <div>
                            <span className="font-medium">{med.name}</span>
                            <span className="text-muted-foreground ml-2">
                              Qty: {med.quantity}
                            </span>
                          </div>
                          <Badge variant={med.inStock ? "success" : "destructive"}>
                            {med.inStock ? "In Stock" : "Out of Stock"}
                          </Badge>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-2 pt-2">
                      {prescription.status === "pending" && (
                        <Button 
                          size="sm" 
                          onClick={() => processePrescription(prescription.id)}
                          className="bg-gradient-primary hover:opacity-90"
                        >
                          Process
                        </Button>
                      )}
                      {prescription.status === "processing" && (
                        <Button 
                          size="sm" 
                          onClick={() => markReady(prescription.id)}
                          className="bg-gradient-secondary hover:opacity-90"
                        >
                          Mark Ready
                        </Button>
                      )}
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>

        {/* Inventory */}
        <Card className="shadow-elevated">
          <CardHeader className="bg-gradient-secondary text-secondary-foreground rounded-t-lg">
            <div className="flex items-center gap-3">
              <Package className="h-6 w-6" />
              <div>
                <CardTitle>Inventory Management</CardTitle>
                <CardDescription className="text-secondary-foreground/80">
                  Track medication stock and availability
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Label htmlFor="search">Search Medications</Label>
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="search"
                    placeholder="Search by name or category..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-3">
                {filteredInventory.map((med) => (
                  <Card key={med.id} className="shadow-card">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold">{med.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {med.category} • Expires: {med.expiryDate}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">₹{med.price}</p>
                          <Badge variant={med.stock < 30 ? "destructive" : "success"}>
                            Stock: {med.stock}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PharmacyModule;