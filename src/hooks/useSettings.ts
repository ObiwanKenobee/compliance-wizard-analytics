
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import { 
  fetchUserSettings, 
  upsertUserSettings,
  fetchUserProfile,
  upsertUserProfile,
  UserSettings,
  UserProfile 
} from "@/api/settings";

export function useSettings(userId: string) {
  const queryClient = useQueryClient();

  const settingsQuery = useQuery({
    queryKey: ["userSettings", userId],
    queryFn: () => fetchUserSettings(userId),
    enabled: !!userId,
  });

  const profileQuery = useQuery({
    queryKey: ["userProfile", userId],
    queryFn: () => fetchUserProfile(userId),
    enabled: !!userId,
  });

  const updateSettingsMutation = useMutation({
    mutationFn: (settings: Omit<UserSettings, "id" | "created_at" | "updated_at">) => upsertUserSettings(settings),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userSettings", userId] });
      toast({
        title: "Success",
        description: "Settings updated successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to update settings: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const updateProfileMutation = useMutation({
    mutationFn: (profile: UserProfile) => upsertUserProfile(profile),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userProfile", userId] });
      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to update profile: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  return {
    settingsQuery,
    profileQuery,
    updateSettingsMutation,
    updateProfileMutation,
  };
}
