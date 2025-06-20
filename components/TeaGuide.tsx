'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Thermometer } from 'lucide-react';

// 茶饮相关数据
const teaTypes = [
  { id: 'green', name: '绿茶', emoji: '🍃', temp: '75-85°C', time: '2-3分钟', description: '清香淡雅' },
  { id: 'black', name: '红茶', emoji: '🔴', temp: '90-100°C', time: '3-5分钟', description: '浓郁醇厚' },
  { id: 'oolong', name: '乌龙茶', emoji: '🟤', temp: '85-95°C', time: '3-7分钟', description: '半发酵茶' },
  { id: 'white', name: '白茶', emoji: '⚪', temp: '85-90°C', time: '4-6分钟', description: '清淡甘甜' },
  { id: 'puer', name: '普洱茶', emoji: '🟫', temp: '95-100°C', time: '5-8分钟', description: '陈香浓郁' },
  { id: 'herbal', name: '花草茶', emoji: '🌸', temp: '80-90°C', time: '5-10分钟', description: '天然花香' }
];

const teaBrewMethods = [
  { id: 'gongfu', name: '功夫茶', emoji: '🫖', description: '小壶多次冲泡' },
  { id: 'western', name: '西式冲泡', emoji: '☕', description: '大杯一次冲泡' },
  { id: 'cold', name: '冷泡茶', emoji: '🧊', description: '冷水长时间浸泡' },
  { id: 'milk', name: '奶茶制作', emoji: '🥛', description: '加奶调制' }
];

const teaAccessories = [
  { id: 'honey', name: '蜂蜜', emoji: '🍯' },
  { id: 'lemon', name: '柠檬', emoji: '🍋' },
  { id: 'milk', name: '牛奶', emoji: '🥛' },
  { id: 'sugar', name: '糖', emoji: '🍬' },
  { id: 'mint', name: '薄荷', emoji: '🌿' },
  { id: 'ginger', name: '生姜', emoji: '🫚' }
];

export default function TeaGuide() {
  const [selectedTeaType, setSelectedTeaType] = useState<string>('');
  const [selectedTeaBrewMethod, setSelectedTeaBrewMethod] = useState<string>('');
  const [selectedTeaAccessories, setSelectedTeaAccessories] = useState<string[]>([]);

  // 生成茶饮配方
  const generateTeaRecipe = () => {
    if (!selectedTeaType || !selectedTeaBrewMethod) return null;

    const teaType = teaTypes.find(t => t.id === selectedTeaType);
    const brewMethod = teaBrewMethods.find(b => b.id === selectedTeaBrewMethod);
    const selectedAccessoryItems = teaAccessories.filter(a => selectedTeaAccessories.includes(a.id));

    if (!teaType || !brewMethod) return null;

    return {
      teaType,
      brewMethod,
      accessories: selectedAccessoryItems,
      temperature: teaType.temp,
      time: teaType.time
    };
  };

  const teaRecipe = generateTeaRecipe();

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <div className="text-4xl">🫖</div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            茶饮调制指南
          </h2>
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          从经典奶茶到创意特饮，掌握专业调茶技巧，在家享受茶室级别的美味体验
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-2xl">🫖</span>
            自定义茶饮配方
          </CardTitle>
          <CardDescription>
            选择茶叶类型、冲泡方法和配件，生成专属配方
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* 茶叶类型选择 */}
          <div>
            <h4 className="font-semibold mb-3">1️⃣ 选择茶叶类型</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {teaTypes.map((tea) => (
                <Button
                  key={tea.id}
                  variant={selectedTeaType === tea.id ? "default" : "outline"}
                  className="h-auto p-4 flex flex-col items-center gap-2"
                  onClick={() => setSelectedTeaType(tea.id)}
                >
                  <span className="text-2xl">{tea.emoji}</span>
                  <span className="text-sm">{tea.name}</span>
                  <span className="text-xs text-muted-foreground text-center">{tea.description}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* 冲泡方法选择 */}
          <div>
            <h4 className="font-semibold mb-3">2️⃣ 选择冲泡方法</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {teaBrewMethods.map((method) => (
                <Button
                  key={method.id}
                  variant={selectedTeaBrewMethod === method.id ? "default" : "outline"}
                  className="h-auto p-4 flex flex-col items-center gap-2"
                  onClick={() => setSelectedTeaBrewMethod(method.id)}
                >
                  <span className="text-2xl">{method.emoji}</span>
                  <span className="text-sm text-center">{method.name}</span>
                  <span className="text-xs text-muted-foreground text-center">{method.description}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* 配件选择 */}
          <div>
            <h4 className="font-semibold mb-3">3️⃣ 选择配件（可多选）</h4>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
              {teaAccessories.map((accessory) => (
                <Button
                  key={accessory.id}
                  variant={selectedTeaAccessories.includes(accessory.id) ? "default" : "outline"}
                  className="h-auto p-3 flex flex-col items-center gap-1"
                  onClick={() => {
                    setSelectedTeaAccessories(prev => 
                      prev.includes(accessory.id) 
                        ? prev.filter(id => id !== accessory.id)
                        : [...prev, accessory.id]
                    );
                  }}
                >
                  <span className="text-xl">{accessory.emoji}</span>
                  <span className="text-xs">{accessory.name}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* 生成的配方 */}
          {teaRecipe && (
            <div className="mt-8 p-6 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg border border-emerald-200">
              <h3 className="text-xl font-bold text-emerald-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">🫖</span>
                你的专属茶饮配方
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{teaRecipe.teaType.emoji}</span>
                    <div>
                      <h4 className="font-semibold text-emerald-700">{teaRecipe.teaType.name}</h4>
                      <p className="text-sm text-emerald-600">{teaRecipe.teaType.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{teaRecipe.brewMethod.emoji}</span>
                    <div>
                      <h4 className="font-semibold text-emerald-700">{teaRecipe.brewMethod.name}</h4>
                      <p className="text-sm text-emerald-600">{teaRecipe.brewMethod.description}</p>
                    </div>
                  </div>

                  {teaRecipe.accessories.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-emerald-700 mb-2">添加配件</h4>
                      <div className="flex flex-wrap gap-2">
                        {teaRecipe.accessories.map((accessory) => (
                          <Badge key={accessory.id} variant="secondary" className="bg-emerald-100 text-emerald-700">
                            {accessory.emoji} {accessory.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-white rounded-lg border border-emerald-200">
                    <h4 className="font-semibold text-emerald-700 mb-3 flex items-center gap-2">
                      <Thermometer className="w-4 h-4" />
                      冲泡参数
                    </h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">水温</span>
                        <span className="text-sm font-medium text-emerald-600">{teaRecipe.temperature}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">时间</span>
                        <span className="text-sm font-medium text-emerald-600">{teaRecipe.time}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">茶水比例</span>
                        <span className="text-sm font-medium text-emerald-600">1:50</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-white rounded-lg border border-emerald-200">
                    <h4 className="font-semibold text-emerald-700 mb-2">制作要点</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• 先温杯，再投茶</li>
                      <li>• 控制好水温和时间</li>
                      <li>• 根据个人口味调整浓度</li>
                      {teaRecipe.accessories.length > 0 && (
                        <li>• 配件在茶汤温度降至60°C后添加</li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}