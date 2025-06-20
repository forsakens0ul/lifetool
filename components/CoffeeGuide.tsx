'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Thermometer } from 'lucide-react';

// 咖啡相关数据
const coffeeTypes = [
  { id: 'espresso', name: '意式浓缩', emoji: '☕', description: '浓郁醇厚' },
  { id: 'americano', name: '美式咖啡', emoji: '🇺🇸', description: '清淡顺滑' },
  { id: 'latte', name: '拿铁', emoji: '🥛', description: '奶香浓郁' },
  { id: 'cappuccino', name: '卡布奇诺', emoji: '☁️', description: '奶泡丰富' },
  { id: 'mocha', name: '摩卡', emoji: '🍫', description: '巧克力风味' },
  { id: 'macchiato', name: '玛奇朵', emoji: '🎨', description: '层次分明' }
];

const brewMethods = [
  { id: 'espresso_machine', name: '意式机', emoji: '⚡', description: '高压萃取' },
  { id: 'french_press', name: '法压壶', emoji: '🫖', description: '浸泡萃取' },
  { id: 'pour_over', name: '手冲', emoji: '💧', description: '滴滤萃取' },
  { id: 'aeropress', name: '爱乐压', emoji: '🔄', description: '压力萃取' },
  { id: 'moka_pot', name: '摩卡壶', emoji: '🏺', description: '蒸汽萃取' },
  { id: 'cold_brew', name: '冷萃', emoji: '🧊', description: '冷水萃取' }
];

const coffeeAddons = [
  { id: 'milk', name: '牛奶', emoji: '🥛' },
  { id: 'sugar', name: '糖', emoji: '🍬' },
  { id: 'cream', name: '奶油', emoji: '🍦' },
  { id: 'syrup', name: '糖浆', emoji: '🍯' },
  { id: 'cinnamon', name: '肉桂', emoji: '🌿' },
  { id: 'vanilla', name: '香草', emoji: '🌸' }
];

export default function CoffeeGuide() {
  const [selectedCoffeeType, setSelectedCoffeeType] = useState<string>('');
  const [selectedBrewMethod, setSelectedBrewMethod] = useState<string>('');
  const [selectedCoffeeAddons, setSelectedCoffeeAddons] = useState<string[]>([]);

  // 生成咖啡配方
  const generateCoffeeRecipe = () => {
    if (!selectedCoffeeType || !selectedBrewMethod) return null;

    const coffeeType = coffeeTypes.find(c => c.id === selectedCoffeeType);
    const brewMethod = brewMethods.find(b => b.id === selectedBrewMethod);
    const selectedAddonItems = coffeeAddons.filter(a => selectedCoffeeAddons.includes(a.id));

    if (!coffeeType || !brewMethod) return null;

    // 根据咖啡类型和冲泡方法生成参数
    const getBrewParams = () => {
      const params = {
        ratio: '1:15',
        temperature: '90-95°C',
        time: '3-4分钟',
        grind: '中等研磨'
      };

      if (brewMethod.id === 'espresso_machine') {
        params.ratio = '1:2';
        params.temperature = '90-94°C';
        params.time = '25-30秒';
        params.grind = '细研磨';
      } else if (brewMethod.id === 'french_press') {
        params.ratio = '1:12';
        params.temperature = '90-95°C';
        params.time = '4分钟';
        params.grind = '粗研磨';
      } else if (brewMethod.id === 'pour_over') {
        params.ratio = '1:16';
        params.temperature = '88-92°C';
        params.time = '2.5-3.5分钟';
        params.grind = '中细研磨';
      } else if (brewMethod.id === 'cold_brew') {
        params.ratio = '1:8';
        params.temperature = '室温';
        params.time = '12-24小时';
        params.grind = '粗研磨';
      }

      return params;
    };

    return {
      coffeeType,
      brewMethod,
      addons: selectedAddonItems,
      params: getBrewParams()
    };
  };

  const coffeeRecipe = generateCoffeeRecipe();

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <div className="text-4xl">☕</div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
            咖啡冲煮指南
          </h2>
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          从意式浓缩到手冲单品，掌握专业咖啡师技巧，在家享受咖啡馆级别的香醇体验
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-2xl">☕</span>
            自定义咖啡配方
          </CardTitle>
          <CardDescription>
            选择咖啡类型、冲泡方法和添加物，生成专属配方
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* 咖啡类型选择 */}
          <div>
            <h4 className="font-semibold mb-3">1️⃣ 选择咖啡类型</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {coffeeTypes.map((coffee) => (
                <Button
                  key={coffee.id}
                  variant={selectedCoffeeType === coffee.id ? "default" : "outline"}
                  className="h-auto p-4 flex flex-col items-center gap-2"
                  onClick={() => setSelectedCoffeeType(coffee.id)}
                >
                  <span className="text-2xl">{coffee.emoji}</span>
                  <span className="text-sm">{coffee.name}</span>
                  <span className="text-xs text-muted-foreground text-center">{coffee.description}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* 冲泡方法选择 */}
          <div>
            <h4 className="font-semibold mb-3">2️⃣ 选择冲泡方法</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {brewMethods.map((method) => (
                <Button
                  key={method.id}
                  variant={selectedBrewMethod === method.id ? "default" : "outline"}
                  className="h-auto p-4 flex flex-col items-center gap-2"
                  onClick={() => setSelectedBrewMethod(method.id)}
                >
                  <span className="text-2xl">{method.emoji}</span>
                  <span className="text-sm text-center">{method.name}</span>
                  <span className="text-xs text-muted-foreground text-center">{method.description}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* 添加物选择 */}
          <div>
            <h4 className="font-semibold mb-3">3️⃣ 选择添加物（可多选）</h4>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
              {coffeeAddons.map((addon) => (
                <Button
                  key={addon.id}
                  variant={selectedCoffeeAddons.includes(addon.id) ? "default" : "outline"}
                  className="h-auto p-3 flex flex-col items-center gap-1"
                  onClick={() => {
                    setSelectedCoffeeAddons(prev => 
                      prev.includes(addon.id) 
                        ? prev.filter(id => id !== addon.id)
                        : [...prev, addon.id]
                    );
                  }}
                >
                  <span className="text-xl">{addon.emoji}</span>
                  <span className="text-xs">{addon.name}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* 生成的配方 */}
          {coffeeRecipe && (
            <div className="mt-8 p-6 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg border border-amber-200">
              <h3 className="text-xl font-bold text-amber-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">☕</span>
                你的专属咖啡配方
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{coffeeRecipe.coffeeType.emoji}</span>
                    <div>
                      <h4 className="font-semibold text-amber-700">{coffeeRecipe.coffeeType.name}</h4>
                      <p className="text-sm text-amber-600">{coffeeRecipe.coffeeType.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{coffeeRecipe.brewMethod.emoji}</span>
                    <div>
                      <h4 className="font-semibold text-amber-700">{coffeeRecipe.brewMethod.name}</h4>
                      <p className="text-sm text-amber-600">{coffeeRecipe.brewMethod.description}</p>
                    </div>
                  </div>

                  {coffeeRecipe.addons.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-amber-700 mb-2">添加物</h4>
                      <div className="flex flex-wrap gap-2">
                        {coffeeRecipe.addons.map((addon) => (
                          <Badge key={addon.id} variant="secondary" className="bg-amber-100 text-amber-700">
                            {addon.emoji} {addon.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-white rounded-lg border border-amber-200">
                    <h4 className="font-semibold text-amber-700 mb-3 flex items-center gap-2">
                      <Thermometer className="w-4 h-4" />
                      冲泡参数
                    </h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">粉水比例</span>
                        <span className="text-sm font-medium text-amber-600">{coffeeRecipe.params.ratio}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">水温</span>
                        <span className="text-sm font-medium text-amber-600">{coffeeRecipe.params.temperature}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">时间</span>
                        <span className="text-sm font-medium text-amber-600">{coffeeRecipe.params.time}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">研磨度</span>
                        <span className="text-sm font-medium text-amber-600">{coffeeRecipe.params.grind}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-white rounded-lg border border-amber-200">
                    <h4 className="font-semibold text-amber-700 mb-2">制作要点</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• 使用新鲜烘焙的咖啡豆</li>
                      <li>• 控制好水温和萃取时间</li>
                      <li>• 根据个人口味调整浓度</li>
                      {coffeeRecipe.addons.length > 0 && (
                        <li>• 添加物在咖啡制作完成后加入</li>
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