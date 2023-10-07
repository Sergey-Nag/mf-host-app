///<reference types="react" />

declare module 'admin/AdminComponent' {
    const AdminComponent: React.FC<{ basename?: string, theme?: Theme }>;

    export default AdminComponent;
}