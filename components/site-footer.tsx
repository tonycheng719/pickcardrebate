"use client";

import Link from "next/link";
import { MessageCircle, Instagram } from "lucide-react";
import { WHATSAPP_GROUP_URL } from "@/lib/constants";
import { useSettings } from "@/lib/store/settings-context";
import { useState, useEffect } from "react";

// Threads icon (Meta's Threads app)
function ThreadsIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.96-.065-1.182.408-2.256 1.33-3.022.812-.675 1.89-1.058 3.108-1.14l.124-.005c.056 0 .111 0 .167.002 1.478.051 2.627.504 3.416 1.346.326.348.577.746.756 1.178.535-.345.99-.768 1.35-1.262.614-.845.94-1.899.94-3.053v-.007c-.01-2.212-.788-3.983-2.32-5.27-1.333-1.12-3.136-1.697-5.363-1.717h-.01c-2.234.02-4.037.6-5.358 1.726-1.52 1.297-2.29 3.07-2.29 5.268v.007c.01 2.307.78 4.092 2.29 5.31 1.335 1.08 3.148 1.635 5.388 1.654.04 0 .08.002.12.002 1.883-.015 3.36-.48 4.518-1.42l1.287 1.607c-1.444 1.17-3.256 1.765-5.396 1.77l-.141.001c-.05 0-.098 0-.147-.002-2.78-.02-5.068-.726-6.805-2.1-1.983-1.571-2.987-3.79-2.987-6.592v-.01c0-2.8 1.005-5.02 2.987-6.6C6.946.746 9.229.024 12.002 0h.01c2.764.024 5.05.744 6.79 2.138 1.665 1.332 2.684 3.203 3.027 5.563l.022.17v.01c.032.334.048.684.048 1.05 0 1.618-.484 3.118-1.4 4.335-.696.924-1.61 1.654-2.715 2.168.166.79.165 1.643-.035 2.521-.43 1.875-1.634 3.34-3.48 4.237-1.456.708-3.168 1.052-5.083 1.02z"/>
    </svg>
  );
}

export function SiteFooter() {
  const { getSetting } = useSettings();
  // Use setting from DB, fallback to constant
  const whatsappUrl = getSetting("whatsapp_group_url") || WHATSAPP_GROUP_URL;
  
  // Use fixed year for SSR to avoid hydration mismatch
  const [year, setYear] = useState(2025);
  
  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-gray-50 dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 py-12 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © {year} PickCardRebate. All rights reserved.
            </p>
            {/* Social Links */}
            <div className="flex items-center justify-center md:justify-start gap-3 mt-3">
              <a 
                href="https://www.instagram.com/pickcardrebate/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 text-white hover:scale-110 transition-transform"
                title="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a 
                href="https://www.threads.com/@pickcardrebate"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-black dark:bg-white text-white dark:text-black hover:scale-110 transition-transform"
                title="Threads"
              >
                <ThreadsIcon className="h-4 w-4" />
              </a>
              <a 
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-green-500 text-white hover:scale-110 transition-transform"
                title="WhatsApp"
              >
                <MessageCircle className="h-4 w-4" />
              </a>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
            <a 
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-500 transition-colors group"
            >
              <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full group-hover:scale-110 transition-transform">
                <MessageCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <span className="font-medium">加入 WhatsApp 討論群</span>
            </a>
            
            <Link href="/about" className="text-sm text-gray-500 hover:text-gray-900 dark:hover:text-gray-300">
              關於我們
            </Link>
            <Link href="/terms" className="text-sm text-gray-500 hover:text-gray-900 dark:hover:text-gray-300">
              服務條款
            </Link>
            <Link href="/privacy" className="text-sm text-gray-500 hover:text-gray-900 dark:hover:text-gray-300">
              私隱政策
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

