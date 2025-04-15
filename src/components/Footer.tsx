import { Blocks } from "lucide-react";
import Link from "next/link";

function Footer() {
  return (
    <footer className="relative border-t border-gray-100 dark:border-gray-800/50 mt-auto">
      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-gray-900 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-gray-400">
            <Blocks className="size-5" />
            <span>Built for Programmers, by @Sjx</span>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex border-md rounded-md py-1 px-2 bg-gray-300 dark:bg-indigo-500 dark:bg-opacity-30">          
            <Link href="/support" className="font-serif text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 transition-colors">
              Quiz (Beta v1.2)
            </Link>
            </div>
            <Link href="/privacy" className="text-gray-400 hover:text-gray-300 transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-gray-300 transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
export default Footer;