"use client";

import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { WHATSAPP_GROUP_URL } from "@/lib/constants";
import { useSettings } from "@/lib/store/settings-context";

export function SiteFooter() {
  const { getSetting } = useSettings();
  // Use setting from DB, fallback to constant
  const whatsappUrl = getSetting("whatsapp_group_url") || WHATSAPP_GROUP_URL;

  return (
    <footer className="bg-gray-50 dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 py-12 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © {new Date().getFullYear()} PickCardRebate. All rights reserved.
            </p>
          </div>
          
          <div className="flex items-center gap-6">
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

