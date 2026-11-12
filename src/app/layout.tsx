import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {title:'AFTERIMAGE.EXE — AI Research & Systems',description:'Independent work in GPU computing, AI systems, and artificial evolution.'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
