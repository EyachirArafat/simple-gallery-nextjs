"use client";

import { useState, useEffect } from "react";
import { Settings, Sun, Moon, Monitor, Globe, Bell, Eye, Shield, Check } from "lucide-react";

export default function SettingsPage() {
    const [theme, setTheme] = useState<"dark" | "light" | "system">("dark");
    const [notifications, setNotifications] = useState(true);
    const [autoplay, setAutoplay] = useState(true);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") as "dark" | "light" | null;
        if (savedTheme) {
            setTheme(savedTheme);
        }
    }, []);

    const handleThemeChange = (newTheme: "dark" | "light" | "system") => {
        setTheme(newTheme);
        if (newTheme === "system") {
            const systemPreference = window.matchMedia("(prefers-color-scheme: dark)").matches
                ? "dark"
                : "light";
            document.documentElement.classList.toggle("dark", systemPreference === "dark");
            localStorage.removeItem("theme");
        } else {
            document.documentElement.classList.toggle("dark", newTheme === "dark");
            localStorage.setItem("theme", newTheme);
        }
        showSavedMessage();
    };

    const showSavedMessage = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    const SettingSection = ({
        icon: Icon,
        title,
        description,
        children
    }: {
        icon: React.ElementType;
        title: string;
        description: string;
        children: React.ReactNode;
    }) => (
        <div className="p-6 rounded-2xl bg-gray-800/30 border border-gray-700/50">
            <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-gray-700/50 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-gray-400" />
                </div>
                <div className="flex-1">
                    <h3 className="font-semibold text-white mb-1">{title}</h3>
                    <p className="text-sm text-gray-400 mb-4">{description}</p>
                    {children}
                </div>
            </div>
        </div>
    );

    const Toggle = ({
        enabled,
        onChange
    }: {
        enabled: boolean;
        onChange: () => void;
    }) => (
        <button
            onClick={onChange}
            className={`relative w-12 h-6 rounded-full transition-colors ${enabled ? "bg-purple-600" : "bg-gray-700"
                }`}
        >
            <span
                className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${enabled ? "left-7" : "left-1"
                    }`}
            />
        </button>
    );

    return (
        <div className="min-h-screen py-8 px-4">
            <div className="container max-w-3xl mx-auto">
                {/* Page Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gray-500 to-slate-500 flex items-center justify-center">
                            <Settings className="w-5 h-5 text-white" />
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold text-white">
                            Settings
                        </h1>
                    </div>
                    <p className="text-gray-400">
                        Customize your MediaHub experience
                    </p>
                </div>

                {/* Saved Toast */}
                {saved && (
                    <div className="fixed bottom-8 right-8 px-4 py-3 bg-green-500/90 backdrop-blur-sm text-white rounded-xl flex items-center gap-2 animate-fadeInUp z-50">
                        <Check className="w-5 h-5" />
                        Settings saved!
                    </div>
                )}

                {/* Settings Sections */}
                <div className="space-y-6">
                    {/* Theme */}
                    <SettingSection
                        icon={Sun}
                        title="Appearance"
                        description="Choose how MediaHub looks to you"
                    >
                        <div className="flex flex-wrap gap-3">
                            <button
                                onClick={() => handleThemeChange("light")}
                                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all ${theme === "light"
                                        ? "bg-purple-500/20 border-purple-500 text-white"
                                        : "bg-gray-700/50 border-gray-600 text-gray-300 hover:border-gray-500"
                                    }`}
                            >
                                <Sun className="w-4 h-4" />
                                Light
                            </button>
                            <button
                                onClick={() => handleThemeChange("dark")}
                                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all ${theme === "dark"
                                        ? "bg-purple-500/20 border-purple-500 text-white"
                                        : "bg-gray-700/50 border-gray-600 text-gray-300 hover:border-gray-500"
                                    }`}
                            >
                                <Moon className="w-4 h-4" />
                                Dark
                            </button>
                            <button
                                onClick={() => handleThemeChange("system")}
                                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all ${theme === "system"
                                        ? "bg-purple-500/20 border-purple-500 text-white"
                                        : "bg-gray-700/50 border-gray-600 text-gray-300 hover:border-gray-500"
                                    }`}
                            >
                                <Monitor className="w-4 h-4" />
                                System
                            </button>
                        </div>
                    </SettingSection>

                    {/* Notifications */}
                    <SettingSection
                        icon={Bell}
                        title="Notifications"
                        description="Manage your notification preferences"
                    >
                        <div className="flex items-center justify-between">
                            <span className="text-gray-300">Enable notifications</span>
                            <Toggle
                                enabled={notifications}
                                onChange={() => {
                                    setNotifications(!notifications);
                                    showSavedMessage();
                                }}
                            />
                        </div>
                    </SettingSection>

                    {/* Autoplay */}
                    <SettingSection
                        icon={Eye}
                        title="Video Autoplay"
                        description="Automatically play videos when scrolling"
                    >
                        <div className="flex items-center justify-between">
                            <span className="text-gray-300">Enable autoplay</span>
                            <Toggle
                                enabled={autoplay}
                                onChange={() => {
                                    setAutoplay(!autoplay);
                                    showSavedMessage();
                                }}
                            />
                        </div>
                    </SettingSection>

                    {/* Language */}
                    <SettingSection
                        icon={Globe}
                        title="Language"
                        description="Choose your preferred language"
                    >
                        <select className="w-full max-w-xs px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-xl text-gray-200 focus:outline-none focus:border-purple-500 cursor-pointer">
                            <option value="en">English</option>
                            <option value="bn">বাংলা</option>
                            <option value="es">Español</option>
                            <option value="fr">Français</option>
                        </select>
                    </SettingSection>

                    {/* Privacy */}
                    <SettingSection
                        icon={Shield}
                        title="Privacy"
                        description="Manage your privacy settings"
                    >
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-gray-300">Show activity status</span>
                                <Toggle enabled={true} onChange={() => showSavedMessage()} />
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-gray-300">Allow analytics</span>
                                <Toggle enabled={false} onChange={() => showSavedMessage()} />
                            </div>
                        </div>
                    </SettingSection>
                </div>

                {/* App Info */}
                <div className="mt-8 p-4 rounded-xl bg-gray-800/20 border border-gray-800 text-center text-sm text-gray-500">
                    MediaHub v1.0.0 • Made with ❤️ using Next.js
                </div>
            </div>
        </div>
    );
}
