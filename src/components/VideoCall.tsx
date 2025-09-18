import { useState, useRef, useEffect } from "react";
import doctorLogo from "@/assets/doctor-logo.png";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  Phone, 
  PhoneOff,
  Users
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface VideoCallProps {
  doctorName: string;
  patientName: string;
  onEndCall: () => void;
}

const VideoCall = ({ doctorName, patientName, onEndCall }: VideoCallProps) => {
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [callDuration, setCallDuration] = useState(0);
  const [isConnected, setIsConnected] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Simulate connection
    const connectTimer = setTimeout(() => {
      setIsConnected(true);
      toast({
        title: "Call Connected",
        description: `Connected to ${doctorName}`,
      });
    }, 2000);

    // Start call timer when connected
    let durationTimer: NodeJS.Timeout;
    if (isConnected) {
      durationTimer = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    }

    // Request camera access
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then(stream => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch(err => {
          console.log("Camera access denied:", err);
        });
    }

    return () => {
      clearTimeout(connectTimer);
      if (durationTimer) clearInterval(durationTimer);
    };
  }, [isConnected, doctorName, toast]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleEndCall = () => {
    toast({
      title: "Call Ended",
      description: `Call with ${doctorName} ended after ${formatDuration(callDuration)}`,
    });
    onEndCall();
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl h-[600px] bg-gray-900 text-white border-gray-700">
        <CardHeader className="bg-gradient-primary text-primary-foreground">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Users className="h-6 w-6" />
              <div>
                <CardTitle>Video Consultation</CardTitle>
                <p className="text-sm opacity-80">
                  {isConnected ? `Connected with ${doctorName}` : "Connecting..."}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-mono">{formatDuration(callDuration)}</div>
              <div className="text-sm opacity-80">
                {isConnected ? "Connected" : "Connecting..."}
              </div>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-6 h-full relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full">
            {/* Doctor Video */}
            <div className="relative bg-gray-800 rounded-lg overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                {isConnected ? (
                  <div className="text-center">
                    <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4 border-4 border-primary">
                      <img 
                        src={doctorLogo} 
                        alt="Doctor" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-lg font-semibold">{doctorName}</h3>
                    <p className="text-sm opacity-80">General Medicine</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="animate-pulse w-32 h-32 bg-gray-700 rounded-full mx-auto mb-4"></div>
                    <p className="text-sm opacity-80">Connecting to doctor...</p>
                  </div>
                )}
              </div>
              <div className="absolute top-4 left-4 bg-black/50 text-white px-2 py-1 rounded text-sm">
                {doctorName}
              </div>
            </div>

            {/* Patient Video */}
            <div className="relative bg-gray-800 rounded-lg overflow-hidden">
              {isVideoOn ? (
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-32 h-32 bg-gradient-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="h-16 w-16 text-secondary-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold">{patientName}</h3>
                    <p className="text-sm opacity-80">Video Off</p>
                  </div>
                </div>
              )}
              <div className="absolute top-4 left-4 bg-black/50 text-white px-2 py-1 rounded text-sm">
                You ({patientName})
              </div>
            </div>
          </div>

          {/* Call Controls */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
            <div className="flex items-center gap-4 bg-black/50 backdrop-blur-sm rounded-full px-6 py-3">
              <Button
                variant={isAudioOn ? "secondary" : "destructive"}
                size="sm"
                className="rounded-full w-12 h-12"
                onClick={() => setIsAudioOn(!isAudioOn)}
              >
                {isAudioOn ? (
                  <Mic className="h-5 w-5" />
                ) : (
                  <MicOff className="h-5 w-5" />
                )}
              </Button>

              <Button
                variant={isVideoOn ? "secondary" : "destructive"}
                size="sm"
                className="rounded-full w-12 h-12"
                onClick={() => setIsVideoOn(!isVideoOn)}
              >
                {isVideoOn ? (
                  <Video className="h-5 w-5" />
                ) : (
                  <VideoOff className="h-5 w-5" />
                )}
              </Button>

              <Button
                variant="destructive"
                size="sm"
                className="rounded-full w-14 h-14"
                onClick={handleEndCall}
              >
                <PhoneOff className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VideoCall;