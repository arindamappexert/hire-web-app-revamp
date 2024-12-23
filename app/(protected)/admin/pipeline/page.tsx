'use client';

import { KanbanBoard } from "@/components/kanban/board";
import { Pipeline } from "@/components/kanban/types";
import { useState } from "react";

const initialData: { pipelines: Pipeline[] } = {
    pipelines: [
        {
            id: "pipeline-1",
            title: "Sales Pipeline",
            columns: [
                {
                    id: "col-1",
                    title: "Shortlist",
                    cards: [
                        {
                            id: "card-1",
                            title: "Company A",
                            description: "Interested in our enterprise plan",
                        },
                        {
                            id: "card-2",
                            title: "Company B",
                            description: "Follow up needed",
                        },
                    ],
                },
                {
                    id: "col-2",
                    title: "Meet",
                    cards: [
                        {
                            id: "card-3",
                            title: "Company C",
                            description: "Demo scheduled for next week",
                        },
                    ],
                },
                {
                    id: "col-3",
                    title: "Pending",
                    cards: [],
                },
                {
                    id: "col-4",
                    title: "Accepted",
                    cards: [
                        {
                            id: "card-4",
                            title: "Company D",
                            description: "Contract signed",
                        },
                    ],
                },
                {
                    id: "col-5",
                    title: "Later",
                    cards: [],
                },
            ],
        },
        {
            id: "pipeline-2",
            title: "Recruitment Pipeline",
            columns: [
                {
                    id: "col-6",
                    title: "Shortlist",
                    cards: [
                        {
                            id: "card-5",
                            title: "John Doe",
                            description: "Frontend Developer",
                        },
                    ],
                },
                {
                    id: "col-7",
                    title: "Meet",
                    cards: [],
                },
                {
                    id: "col-8",
                    title: "Pending",
                    cards: [
                        {
                            id: "card-6",
                            title: "Jane Smith",
                            description: "Backend Developer",
                        },
                    ],
                },
                {
                    id: "col-9",
                    title: "Accepted",
                    cards: [],
                },
                {
                    id: "col-10",
                    title: "Later",
                    cards: [],
                },
            ],
        },
    ],
};

const PipelinePage = () => {
    const [data, setData] = useState(initialData);
    return (
        <main>
            <KanbanBoard
                pipelines={data.pipelines}
                onUpdate={(pipelines) => setData({ ...data, pipelines })}
            />
        </main>
    );
};

export default PipelinePage;