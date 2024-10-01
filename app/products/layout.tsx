import ContentLoader from "@/components/loaders/ContentLoader"; 
import React, { Suspense } from 'react'; 

export default function ProductsLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <Suspense fallback={<p>Loading...</p>}>
            {children}
        </Suspense>
    );
}
