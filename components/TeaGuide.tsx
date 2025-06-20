'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Clock, Users, Star, Thermometer, Timer, AlertTriangle } from 'lucide-react';

interface TeaIngredient {
  name: string;
  amount: string;
  note: string;
}

interface TeaStep {
  step: number;
  action: string;
  detail: string;
  warning?: string;
  pro_tip?: string;
  success_sign?: string;
  visual_clue?: string;
  purpose?: string;
  time_control?: string;
  timing?: string;
  technique?: string;
  drink_tip?: string;
  sound_clue?: string;
  temp_target?: string;
  effect?: string;
  check?: string;
  tool?: string;
  visual_check?: string;
  abnormal?: string;
  output?: string;
}

interface TeaRecipe {
  id: number;
  name: string;
  difficulty: string;
  time: string;
  servings: string;
  description: string;
  emoji: string;
  subtitle: string;
  warning?: string;
  safety?: string[];
  tools: string[];
  ingredients: TeaIngredient[];
  steps: TeaStep[];
}

interface TeaData {
  tea_recipes: TeaRecipe[];
  pro_tips: Record<string, string>;
  metadata: {
    tea_brewing_guide: Record<string, string>;
    substitution_tips: Record<string, string>;
    temperature_guide: Record<string, string>;
    steeping_time: Record<string, string>;
  };
}

// 茶叶类型选项
const teaTypes = [
  { id: 'green', name: '绿茶', emoji: '🍃', temp: '75-85°C', time: '2-3分钟' },
  { id: 'black', name: '红茶', emoji: '🔴', temp: '90-100°C', time: '3-5分钟' },
  { id: 'oolong', name: '乌龙茶', emoji: '🟤', temp: '85-95°C', time: '3-7分钟' },
  { id: 'white', name: '白茶', emoji: '⚪', temp: '85-90°C', time: '4-6分钟' },
  { id: 'puer', name: '普洱茶', emoji: '🟫', temp: '95-100°C', time: '5-8分钟' },
  { id: 'herbal', name: '花草茶', emoji: '🌸', temp: '80-90°C', time: '5-10分钟' }
];

// 冲泡方法选项
const brewMethods = [
  { id: 'gongfu', name: '功夫茶', emoji: '🫖', description: '小壶多次冲泡' },
  { id: 'western', name: '西式冲泡', emoji: '☕', description: '大杯一次冲泡' },
  { id: 'cold', name: '冷泡茶', emoji: '🧊', description: '冷水长时间浸泡' },
  { id: 'milk', name: '奶茶制作', emoji: '🥛', description: '加奶调制' }
];

// 配件选项
const accessories = [
  { id: 'honey', name: '蜂蜜', emoji: '🍯' },
  { id: 'lemon', name: '柠檬', emoji: '🍋' },
  { id: 'milk', name: '牛奶', emoji: '🥛' },
  { id: 'sugar', name: '糖', emoji: '🍬' },
  { id: 'mint', name: '薄荷', emoji: '🌿' },
  { id: 'ginger', name: '生姜', emoji: '🫚' }
];

export default function TeaGuide() {
  const [teaData, setTeaData] = useState<TeaData | null>(null);
  const [selectedRecipe, setSelectedRecipe] = useState<TeaRecipe | null>(null);
  const [activeTab, setActiveTab] = useState('recipes');
  
  // 自定义配方状态
  const [selectedTeaType, setSelectedTeaType] = useState<string>('');
  const [selectedBrewMethod, setSelectedBrewMethod] = useState<string>('');
  const [selectedAccessories, setSelectedAccessories] = useState<string[]>([]);

  useEffect(() => {
    fetch('/data/tea_recommendations.json')
      .then(response => response.json())
      .then((data: TeaData) => {
        setTeaData(data);
        if (data.tea_recipes.length > 0) {
          setSelectedRecipe(data.tea_recipes[0]);
        }
      })
      .catch(error => console.error('Error loading tea data:', error));
  }, []);

  // 生成自定义茶饮配方
  const generateCustomRecipe = () => {
    if (!selectedTeaType || !selectedBrewMethod) return null;

    const teaType = teaTypes.find(t => t.id === selectedTeaType);
    const brewMethod = brewMethods.find(b => b.id === selectedBrewMethod);
    const selectedAccessoryItems = accessories.filter(a => selectedAccessories.includes(a.id));

    if (!teaType || !brewMethod) return null;

    return {
      teaType,
      brewMethod,
      accessories: selectedAccessoryItems,
      temperature: teaType.temp,
      time: teaType.time
    };
  };

  const customRecipe = generateCustomRecipe();

  if (!teaData) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-muted-foreground">加载茶饮指南中...</p>
        </div>
      </div>
    );
  }

  const getDifficultyColor = (difficulty: string) => {
    const stars = difficulty.split('★').length - 1;
    if (stars <= 1) return 'bg-green-100 text-green-800';
    if (stars <= 2) return 'bg-yellow-100 text-yellow-800';
    if (stars <= 3) return 'bg-orange-100 text-orange-800';
    return 'bg-red-100 text-red-800';
  };

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

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="recipes">茶饮配方</TabsTrigger>
          <TabsTrigger value="custom">自定义配方</TabsTrigger>
          <TabsTrigger value="guide">冲泡指南</TabsTrigger>
          <TabsTrigger value="tips">专业技巧</TabsTrigger>
        </TabsList>

        <TabsContent value="custom" className="space-y-6">
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
                    </Button>
                  ))}
                </div>
              </div>

              {/* 冲泡方法选择 */}
              <div>
                <h4 className="font-semibold mb-3">2️⃣ 选择冲泡方法</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
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

              {/* 配件选择 */}
              <div>
                <h4 className="font-semibold mb-3">3️⃣ 选择配件（可多选）</h4>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                  {accessories.map((accessory) => (
                    <Button
                      key={accessory.id}
                      variant={selectedAccessories.includes(accessory.id) ? "default" : "outline"}
                      className="h-auto p-3 flex flex-col items-center gap-1"
                      onClick={() => {
                        setSelectedAccessories(prev => 
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
              {customRecipe && (
                <div className="mt-8 p-6 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg border border-emerald-200">
                  <h3 className="text-xl font-bold text-emerald-800 mb-4 flex items-center gap-2">
                    <span className="text-2xl">🫖</span>
                    你的专属茶饮配方
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{customRecipe.teaType.emoji}</span>
                        <div>
                          <h4 className="font-semibold text-emerald-700">{customRecipe.teaType.name}</h4>
                          <p className="text-sm text-emerald-600">主要茶叶</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{customRecipe.brewMethod.emoji}</span>
                        <div>
                          <h4 className="font-semibold text-emerald-700">{customRecipe.brewMethod.name}</h4>
                          <p className="text-sm text-emerald-600">{customRecipe.brewMethod.description}</p>
                        </div>
                      </div>

                      {customRecipe.accessories.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-emerald-700 mb-2">添加配件</h4>
                          <div className="flex flex-wrap gap-2">
                            {customRecipe.accessories.map((accessory) => (
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
                            <span className="text-sm font-medium text-emerald-600">{customRecipe.temperature}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">时间</span>
                            <span className="text-sm font-medium text-emerald-600">{customRecipe.time}</span>
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
                          {customRecipe.accessories.length > 0 && (
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
        </TabsContent>

        <TabsContent value="recipes" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-4">
              <h3 className="text-lg font-semibold">选择茶饮配方</h3>
              <div className="space-y-3 max-h-[600px] overflow-y-auto">
                {teaData.tea_recipes.map((recipe) => (
                  <Card 
                    key={recipe.id}
                    className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                      selectedRecipe?.id === recipe.id ? 'ring-2 ring-emerald-500 bg-emerald-50' : ''
                    }`}
                    onClick={() => setSelectedRecipe(recipe)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">{recipe.emoji}</span>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm leading-tight">{recipe.name}</h4>
                          <p className="text-xs text-muted-foreground mt-1">{recipe.subtitle}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="secondary" className={`text-xs ${getDifficultyColor(recipe.difficulty)}`}>
                              {recipe.difficulty}
                            </Badge>
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {recipe.time}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="lg:col-span-2">
              {selectedRecipe && (
                <Card className="h-fit">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <span className="text-4xl">{selectedRecipe.emoji}</span>
                      <div className="flex-1">
                        <CardTitle className="text-xl">{selectedRecipe.name}</CardTitle>
                        <CardDescription className="mt-2">{selectedRecipe.description}</CardDescription>
                        
                        <div className="flex flex-wrap gap-3 mt-4">
                          <Badge className={getDifficultyColor(selectedRecipe.difficulty)}>
                            <Star className="w-3 h-3 mr-1" />
                            {selectedRecipe.difficulty}
                          </Badge>
                          <Badge variant="outline">
                            <Clock className="w-3 h-3 mr-1" />
                            {selectedRecipe.time}
                          </Badge>
                          <Badge variant="outline">
                            <Users className="w-3 h-3 mr-1" />
                            {selectedRecipe.servings}
                          </Badge>
                        </div>

                        {selectedRecipe.warning && (
                          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                            <div className="flex items-start gap-2">
                              <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                              <div>
                                <p className="text-sm font-medium text-yellow-800">{selectedRecipe.warning}</p>
                                {selectedRecipe.safety && (
                                  <ul className="mt-2 text-xs text-yellow-700 space-y-1">
                                    {selectedRecipe.safety.map((item, index) => (
                                      <li key={index}>• {item}</li>
                                    ))}
                                  </ul>
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                          所需工具
                        </h4>
                        <ul className="space-y-2">
                          {selectedRecipe.tools.map((tool, index) => (
                            <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                              <span className="w-1 h-1 bg-muted-foreground rounded-full"></span>
                              {tool}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                          材料清单
                        </h4>
                        <ul className="space-y-2">
                          {selectedRecipe.ingredients.map((ingredient, index) => (
                            <li key={index} className="text-sm">
                              <div className="flex justify-between items-start">
                                <span className="font-medium">{ingredient.name}</span>
                                <span className="text-emerald-600 font-medium">{ingredient.amount}</span>
                              </div>
                              {ingredient.note && (
                                <p className="text-xs text-muted-foreground mt-1">{ingredient.note}</p>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-4 flex items-center gap-2">
                        <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                        制作步骤
                      </h4>
                      <div className="space-y-4">
                        {selectedRecipe.steps.map((step, index) => (
                          <div key={index} className="flex gap-4">
                            <div className="flex-shrink-0 w-8 h-8 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-sm font-semibold">
                              {step.step}
                            </div>
                            <div className="flex-1 space-y-2">
                              <h5 className="font-medium text-emerald-700">{step.action}</h5>
                              <p className="text-sm text-muted-foreground leading-relaxed">{step.detail}</p>
                              
                              {step.warning && (
                                <div className="p-2 bg-red-50 border border-red-200 rounded text-xs text-red-700">
                                  <strong>⚠️ 注意：</strong> {step.warning}
                                </div>
                              )}
                              
                              {step.pro_tip && (
                                <div className="p-2 bg-blue-50 border border-blue-200 rounded text-xs text-blue-700">
                                  <strong>💡 专业提示：</strong> {step.pro_tip}
                                </div>
                              )}
                              
                              {step.success_sign && (
                                <div className="p-2 bg-green-50 border border-green-200 rounded text-xs text-green-700">
                                  <strong>✅ 成功标志：</strong> {step.success_sign}
                                </div>
                              )}

                              {step.visual_clue && (
                                <div className="p-2 bg-purple-50 border border-purple-200 rounded text-xs text-purple-700">
                                  <strong>👁️ 视觉提示：</strong> {step.visual_clue}
                                </div>
                              )}

                              {step.time_control && (
                                <div className="p-2 bg-orange-50 border border-orange-200 rounded text-xs text-orange-700 flex items-center gap-1">
                                  <Timer className="w-3 h-3" />
                                  <strong>时间控制：</strong> {step.time_control}
                                </div>
                              )}

                              {step.temp_target && (
                                <div className="p-2 bg-cyan-50 border border-cyan-200 rounded text-xs text-cyan-700 flex items-center gap-1">
                                  <Thermometer className="w-3 h-3" />
                                  <strong>温度目标：</strong> {step.temp_target}
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="guide" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Thermometer className="w-5 h-5 text-emerald-600" />
                  冲泡温度指南
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(teaData.metadata.tea_brewing_guide).map(([tea, temp]) => (
                    <div key={tea} className="flex justify-between items-center p-2 rounded bg-muted/50">
                      <span className="font-medium">{tea}</span>
                      <span className="text-emerald-600 font-semibold">{temp}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Timer className="w-5 h-5 text-emerald-600" />
                  浸泡时间指南
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(teaData.metadata.steeping_time).map(([tea, time]) => (
                    <div key={tea} className="flex justify-between items-center p-2 rounded bg-muted/50">
                      <span className="font-medium">{tea}</span>
                      <span className="text-emerald-600 font-semibold">{time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>替代方案指南</CardTitle>
              <CardDescription>没有专业工具时的实用替代方法</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(teaData.metadata.substitution_tips).map(([item, tip]) => (
                  <div key={item} className="p-3 border rounded-lg">
                    <h4 className="font-medium text-sm mb-1">{item}</h4>
                    <p className="text-sm text-muted-foreground">{tip}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tips" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(teaData.pro_tips).map(([title, tip]) => (
              <Card key={title}>
                <CardHeader>
                  <CardTitle className="text-lg">{title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{tip}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}