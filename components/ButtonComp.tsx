import { Button } from "@/components/ui/button";

export const ButtonComp = ({ children, onClick }: { children: React.ReactNode; onClick: () => void }) => {
    return (

        <Button onClick={onClick}>
            {children}
        </Button>
    )
}