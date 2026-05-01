import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Languages, KeyRound } from 'lucide-react';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <nav className="border-b border-slate-800 bg-darkBg/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0 flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <Languages className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                MultiTool
              </span>
            </div>
            <div className="flex space-x-1 sm:space-x-4">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                    isActive
                      ? 'bg-slate-800 text-indigo-400 shadow-inner'
                      : 'text-slate-300 hover:bg-slate-800/50 hover:text-white'
                  }`
                }
              >
                <Languages className="w-4 h-4" />
                <span className="hidden sm:inline">Translator</span>
              </NavLink>
              <NavLink
                to="/generator"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                    isActive
                      ? 'bg-slate-800 text-pink-400 shadow-inner'
                      : 'text-slate-300 hover:bg-slate-800/50 hover:text-white'
                  }`
                }
              >
                <KeyRound className="w-4 h-4" />
                <span className="hidden sm:inline">String Generator</span>
              </NavLink>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-grow max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>

      <footer className="border-t border-slate-800 py-6 text-center text-slate-500 text-sm">
        <p>© {new Date().getFullYear()} MultiTool App. Built with React & Tailwind.</p>
      </footer>
    </div>
  );
}
