import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { EyeIcon } from 'lucide-react'

export default function LoginPage() {
  return (
    <div className="flex min-h-screen">
      {/* Left Section */}
      <div className="hidden w-1/2 flex-col justify-between bg-[#1e2147] p-12 lg:flex">
        <div>
          <div className="text-white">
            <svg
              className="h-12 w-12"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2L2 19.7778H22L12 2ZM12 5.77778L18.5795 17.7778H5.42047L12 5.77778Z" />
            </svg>
            <div className="mt-2 text-2xl font-semibold">AppExert</div>
          </div>
        </div>
        <h1 className="text-4xl font-bold text-white">Global Hiring, Simplified.</h1>
      </div>

      {/* Right Section */}
      <div className="flex w-full items-center justify-center px-6 lg:w-1/2">
        <div className="w-full max-w-md space-y-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-semibold tracking-tight">Login to your account</h2>
            <p className="text-muted-foreground">Enter your login details to continue</p>
          </div>

          <form className="space-y-4">
            <div className="space-y-2">
              <Input
                id="email"
                placeholder="Email"
                type="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
              />
            </div>
            <div className="relative space-y-2">
              <Input
                id="password"
                placeholder="Password"
                type="password"
                autoCapitalize="none"
                autoComplete="current-password"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-2 top-0.5 h-8 w-8"
              >
                <EyeIcon className="h-4 w-4" />
              </Button>
            </div>
            <Button className="w-full bg-[#6366f1] hover:bg-[#5558e7]">
              Sign in
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

