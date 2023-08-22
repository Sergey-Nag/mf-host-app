import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const AdminComponent = dynamic(() => import('admin/AdminComponent'), {
    ssr: false,
});

export const AdminApp: React.FC<{ basename?: string }> = ({ basename }) => {
    return (
        <Suspense>
            <AdminComponent basename={basename} />
        </Suspense>
    )
}
