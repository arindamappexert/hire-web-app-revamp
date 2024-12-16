import { StatsCard } from "@/components/dashboard/stats-card"
import { PipelineSummary } from "@/components/dashboard/pipeline-summary"
import { CountList } from "@/components/dashboard/count-list"

const stats = [
  {
    label: "Total Developers",
    value: "833",
    change: { value: 20, trend: "up" },
  },
  {
    label: "New User Sign-ups",
    value: "15",
    change: { value: 81, trend: "down" },
  },
  {
    label: "New Users",
    value: "12",
    change: { value: 20, trend: "down" },
  },
]

const pipelineStages = [
  { label: "Shortlisted", value: 202 },
  { label: "Meet", value: 67 },
  { label: "Decision pending", value: 43 },
  { label: "Accepted", value: 42 },
  { label: "Later", value: 30 },
]

const jobRoles = [
  { label: "Backend Developer", value: 290 },
  { label: "Frontend Developer", value: 25 },
  { label: "Fullstack Developer", value: 21 },
  { label: "Software Developer", value: 13 },
  { label: "DevOps Engineer", value: 6 },
]

const availability = [
  { label: "Immediate", value: 134 },
  { label: "2 Weeks", value: 99 },
  { label: "4 Weeks", value: 144 },
  { label: "8 Weeks", value: 123 },
  { label: "Stealth", value: 27 },
]

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="grid gap-6 md:grid-cols-3">
        {stats.map((stat) => (
          <StatsCard key={stat.label} stat={stat} />
        ))}
      </div>
      
      <PipelineSummary stages={pipelineStages} />
      
      <div className="grid gap-6 md:grid-cols-2">
        <CountList title="Developer Count by Job Roles" items={jobRoles} />
        <CountList title="Developer Count by Availability" items={availability} />
      </div>
    </div>
  )
}

