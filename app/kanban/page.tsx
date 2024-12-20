import { KanbanBoard } from "@/components/kanban-board"

const columns = [
  { id: "shortlist", title: "SHORTLIST" },
  { id: "meet", title: "MEET" },
  { id: "pending", title: "PENDING" },
  { id: "accepted", title: "ACCEPTED" },
  { id: "later", title: "LATER" },
]

const pipelines = [
  {
    id: "rockstar",
    title: "Rockstar Developer",
    count: 2,
    items: {
      meet: [
        {
          id: "1",
          title: "Test",
          subtitle: "BI Developer",
          avatar: "/placeholder.svg?height=32&width=32",
          content: {
            experience: "1 year of experience",
            availability: "2 weeks",
            "salary expectation": "1 - 2(INR/Annual)",
          },
        },
        {
          id: "2",
          title: "Testappxt3+287",
          subtitle: "Backend Developer",
          avatar: "/placeholder.svg?height=32&width=32",
          content: {
            experience: "1 year of experience",
            availability: "unavailable",
            "salary expectation": "",
          },
        },
      ],
      shortlist: [],
      pending: [],
      accepted: [],
      later: [],
    },
  },
  {
    id: "director",
    title: "Director",
    count: 1,
    items: {
      shortlist: [
        {
          id: "3",
          title: "Testappxt3+286",
          subtitle: "Backend Developer",
          avatar: "/placeholder.svg?height=32&width=32",
          content: {
            experience: "1 year of experience",
            availability: "unavailable",
          },
        },
      ],
      meet: [],
      pending: [],
      accepted: [],
      later: [],
    },
  },
]

export default function Page() {
  return (
    <div className="p-8 bg-slate-100 min-h-screen">
      <KanbanBoard pipelines={pipelines} columns={columns} />
    </div>
  )
}

