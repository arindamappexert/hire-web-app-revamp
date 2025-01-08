import { useAuth } from "@/lib/auth/context";

export function SSOButtons() {
  const { enabledProviders } = useAuth();

  return (
    <div className="space-y-2">
      {enabledProviders.map(({ id, name, icon, login }) => (
        <button
          key={id}
          onClick={login}
          className="flex items-center gap-2 w-full p-2 border rounded-lg"
        >
          <img src={icon} alt={name} className="w-5 h-5" />
          <span>Continue with {name}</span>
        </button>
      ))}
    </div>
  );
}