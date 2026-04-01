import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, User, Bell, Shield, LogOut, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/context/AuthContext";
import { currentUser } from "@/data/mockData";

interface SettingsSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SettingsSheet = ({ open, onOpenChange }: SettingsSheetProps) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    onOpenChange(false);
    logout();
    navigate("/");
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-foreground/40 z-50"
            onClick={() => onOpenChange(false)}
          />
          {/* Sheet */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 bg-card rounded-t-3xl z-50 max-h-[85vh] overflow-y-auto"
          >
            {/* Handle */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 rounded-full bg-border" />
            </div>

            <div className="px-5 pb-24">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-foreground">Settings</h2>
                <button onClick={() => onOpenChange(false)} className="p-2 text-muted-foreground">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Edit Profile */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <User className="w-4 h-4" />
                  Edit Profile
                </div>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img
                      src={currentUser.avatar}
                      alt="Avatar"
                      className="w-14 h-14 rounded-full object-cover border-2 border-border"
                    />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                      <Camera className="w-3 h-3 text-primary-foreground" />
                    </div>
                  </div>
                  <div className="flex-1 space-y-2">
                    <div>
                      <Label className="text-xs">Username</Label>
                      <Input defaultValue={currentUser.name} className="rounded-lg h-9 text-sm" />
                    </div>
                  </div>
                </div>
              </div>

              <Separator className="my-4" />

              {/* Settings toggles */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Bell className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-foreground">Notifications</span>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Shield className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-foreground">Privacy Mode</span>
                  </div>
                  <Switch />
                </div>
              </div>

              <Separator className="my-4" />

              {/* Logout */}
              <Button
                variant="destructive"
                onClick={handleLogout}
                className="w-full rounded-xl gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SettingsSheet;