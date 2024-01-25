"use client"

import { Card, CardContent, CardFooter, CardHeader} from "../ui/card";

interface CardWrapperProps {
    children: React.ReactNode;
    headerLabel: string;
    backButtonLabel: string;
    backButtonHref: string;
    showSocial?: boolean
}

const CardWrapper = ({
    children,
    headerLabel,
    backButtonHref,
    backButtonLabel
}: CardWrapperProps) => {
    return ( 
        <Card className="w-[400px] shadow-md">
            <CardHeader>
                
            </CardHeader>
            {children}
        </Card>
     );
}
 
export default CardWrapper;