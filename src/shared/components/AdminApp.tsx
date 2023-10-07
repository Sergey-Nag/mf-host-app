import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import theme from '@/theme';

const AdminComponent = dynamic(() => import('admin/AdminComponent'), {
    ssr: false,
});

export const AdminApp: React.FC<{ basename?: string }> = ({ basename }) => {
    return (
        <Suspense>
            <AdminComponent basename={basename} theme={theme} />
        </Suspense>
    );
}
