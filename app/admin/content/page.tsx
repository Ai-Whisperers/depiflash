"use client"
import dynamic from "next/dynamic"
const ContentEditor = dynamic(() => import("@ai-whisperers/client-kit").then(m => ({ default: m.ContentEditor })), { ssr: false })
export default function AdminContentPage() { return <ContentEditor /> }
