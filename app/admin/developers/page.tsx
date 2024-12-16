'use client'

import { Button } from "@/components/ui/button";
import { useFirebaseAuth } from "@/hooks/useFirebaseAuth";

export default function Page() {
  const { logout } = useFirebaseAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div>
      <h1>Developers</h1>

      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
}
