import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/adm/dashboard")({
    component: Adm,
    loader: async () => {
        return {
            title: "Dashboard",
        };
    },
});

function Adm() {
    return <div>Adm</div>;
}
