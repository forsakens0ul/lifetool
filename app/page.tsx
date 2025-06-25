"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Clock,
  Users,
  Star,
  AlertTriangle,
  Lightbulb,
  Eye,
  Volume2,
  Shuffle,
  Coffee as CoffeeIcon,
  Leaf,
  Dumbbell,
  Github,
  Globe,
  MessageCircle,
  RefreshCw,
} from "lucide-react";

// 导入模块组件
import Coffee from "@/components/Coffee";
import Tea from "@/components/Tea";
import Sport from "@/components/Sport";

// 获取当前日期
const getCurrentDate = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}.${month}.${day}`;
};

export default function Home() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { id: 0, name: "咖啡", icon: CoffeeIcon, color: "amber" },
    { id: 1, name: "茶饮", icon: Leaf, color: "green" },
    { id: 2, name: "运动", icon: Dumbbell, color: "blue" },
  ];

  const renderCoffeeModule = () => <Coffee />;
  const renderTeaModule = () => <Tea />;
  const renderExerciseModule = () => <Sport />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            生活指南助手
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            选择你感兴趣的模块，开始探索吧！
          </p>

          {/* Version Info and Social Links */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-white/20 max-w-md mx-auto">
            <div className="text-sm text-gray-600 mb-3">
              当前版本 v1.0.1（{getCurrentDate()}）
            </div>
            <div className="flex items-center justify-center gap-6 text-sm">
              <a
                href="https://github.com/forsakens0ul"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
              >
                <Github className="w-4 h-4" />
                GitHub主页
              </a>
              <span className="text-gray-400">by</span>
              <a
                href="https://www.chalice.lol/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
              >
                <Globe className="w-4 h-4" />
                forsakensoul
              </a>
              <div className="relative group">
                <div className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors duration-200 cursor-pointer">
                  <MessageCircle className="w-4 h-4" />
                  公众号
                </div>
                {/* QR Code Tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                  <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-3">
                    <div className="text-xs text-gray-600 mb-2 text-center whitespace-nowrap">
                      扫码关注公众号
                    </div>
                    <img
                      src="/data/wechatQR.jpg"
                      alt="微信公众号二维码"
                      className="w-24 h-24 object-contain"
                    />
                  </div>
                  {/* Arrow */}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-2 shadow-lg border border-white/20">
            <div className="flex gap-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;

                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      flex items-center gap-3 px-6 py-3 rounded-xl font-medium transition-all duration-200
                      ${
                        isActive
                          ? "bg-white text-gray-800 shadow-md scale-105"
                          : "text-gray-600 hover:text-gray-800 hover:bg-white/50"
                      }
                    `}
                  >
                    <Icon
                      className={`w-5 h-5 ${
                        isActive ? `text-${tab.color}-600` : ""
                      }`}
                    />
                    <span className="whitespace-nowrap">{tab.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Module Content */}
        <div className="max-w-4xl mx-auto">
          {activeTab === 0 && renderCoffeeModule()}
          {activeTab === 1 && renderTeaModule()}
          {activeTab === 2 && renderExerciseModule()}
        </div>
      </div>
    </div>
  );
}
