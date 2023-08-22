//@ts-nocheck
import { AdminApp } from "@/components/AdminApp";
import Link from "next/link";

export default function AdminPage() {
    return (
        <div>
            Admin | <Link href="/">To the main page</Link>
            <AdminApp basename="admin" />
        </div>
    );
}
