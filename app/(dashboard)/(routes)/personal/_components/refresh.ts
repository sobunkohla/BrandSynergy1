'use client'

import { useRouter } from "next/navigation";

export function refresh () {
    const router = useRouter()
    router.refresh();
}