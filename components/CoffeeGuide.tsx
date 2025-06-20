'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Clock, Users, Star, Thermometer, Timer, AlertTriangle } from 'lucide-react';

interface CoffeeIngredient {
  name: string;
  amount: string;
  note: string;
}

interface CoffeeStep {
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

interface CoffeeRecipe {
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
  ingredients: CoffeeIngredient[];
  steps: CoffeeStep[];
}

interface CoffeeData {
  coffee_recipes: CoffeeRecipe[];
  pro_tips: Record<string, string>;
  metadata: {
    temperature_guide: Record<string, string>;
    conversion_tools: Record<string, string>;
  };
}

export default function CoffeeGuide() {
  const [coffeeData, setCoffeeData] = useState<CoffeeData | null>(null);
  const [selectedRecipe, setSelectedRecipe] = useState<CoffeeRecipe | null>(null);
  const [activeTab, setActiveTab] = useState('recipes');

  useEffect(() => {
    fetch('/data/coffee_recommendations.json')
      .then(response => response.json())
      .then((data: CoffeeData) => {
        setCoffeeData(data);
        if (data.coffee_recipes.length > 0) {
          setSelectedRecipe(data.coffee_recipes[0]);
        }
      })
      .catch(error => console.error('Error loading coffee data:', error));
  }, []);

  if (!coffeeData) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-muted-foreground">加载咖啡指南中...</p>
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
          <div className="text-4xl">☕</div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
            咖啡冲煮指南
          </h2>
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          从意式浓缩到手冲单品，掌握专业咖啡师技巧，在家享受咖啡馆级别的香醇体验
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="recipes">咖啡配方</TabsTrigger>
          <TabsTrigger value="guide">冲煮指南</TabsTrigger>
          <TabsTrigger value="tips">专业技巧</TabsTrigger>
        </TabsList>

        <TabsContent value="recipes" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-4">
              <h3 className="text-lg font-semibold">选择咖啡配方</h3>
              <div className="space-y-3 max-h-[600px] overflow-y-auto">
                {coffeeData.coffee_recipes.map((recipe) => (
                  <Card 
                    key={recipe.id}
                    className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                      selectedRecipe?.id === recipe.id ? 'ring-2 ring-amber-500 bg-amber-50' : ''
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
                          <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
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
                          <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                          材料清单
                        </h4>
                        <ul className="space-y-2">
                          {selectedRecipe.ingredients.map((ingredient, index) => (
                            <li key={index} className="text-sm">
                              <div className="flex justify-between items-start">
                                <span className="font-medium">{ingredient.name}</span>
                                <span className="text-amber-600 font-medium">{ingredient.amount}</span>
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
                        <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                        制作步骤
                      </h4>
                      <div className="space-y-4">
                        {selectedRecipe.steps.map((step, index) => (
                          <div key={index} className="flex gap-4">
                            <div className="flex-shrink-0 w-8 h-8 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center text-sm font-semibold">
                              {step.step}
                            </div>
                            <div className="flex-1 space-y-2">
                              <h5 className="font-medium text-amber-700">{step.action}</h5>
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

                              {step.abnormal && (
                                <div className="p-2 bg-yellow-50 border border-yellow-200 rounded text-xs text-yellow-700">
                                  <strong>🔧 异常处理：</strong> {step.abnormal}
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
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Thermometer className="w-5 h-5 text-amber-600" />
                温度指南
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Object.entries(coffeeData.metadata.temperature_guide).map(([method, temp]) => (
                  <div key={method} className="flex justify-between items-center p-2 rounded bg-muted/50">
                    <span className="font-medium">{method}</span>
                    <span className="text-amber-600 font-semibold">{temp}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>换算工具</CardTitle>
              <CardDescription>常用咖啡制作换算参考</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(coffeeData.metadata.conversion_tools).map(([conversion, note]) => (
                  <div key={conversion} className="p-3 border rounded-lg">
                    <h4 className="font-medium text-sm mb-1">{conversion}</h4>
                    <p className="text-sm text-muted-foreground">{note}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tips" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(coffeeData.pro_tips).map(([title, tip]) => (
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