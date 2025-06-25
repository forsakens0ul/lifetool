'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Users, Star, AlertTriangle, Lightbulb, Eye, Volume2, Shuffle, RefreshCw } from 'lucide-react';

// 导入数据
import sportData from '@/public/data/sport_recommendations.json';

interface SportRecipe {
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
  ingredients: Array<{
    name: string;
    amount: string;
    note: string;
  }>;
  steps: Array<{
    step: number;
    action: string;
    detail: string;
    warning?: string;
    pro_tip?: string;
    visual_clue?: string;
    success_sign?: string;
    abnormal?: string;
    time_control?: string;
    temp_target?: string;
    drink_tip?: string;
    purpose?: string;
    technique?: string;
    timing?: string;
    temp_note?: string;
    check?: string;
    tool?: string;
    output?: string;
    effect?: string;
    sound_clue?: string;
    visual_check?: string;
  }>;
}

const OptionButton = ({ 
  option, 
  isSelected, 
  onClick,
  colorScheme = 'blue',
  disabled = false
}: { 
  option: { emoji: string; text: string; value: string; desc?: string };
  isSelected: boolean;
  onClick: () => void;
  colorScheme?: string;
  disabled?: boolean;
}) => {
  const colorClasses = {
    amber: isSelected 
      ? 'bg-amber-100 text-amber-800 ring-2 ring-amber-300 shadow-sm' 
      : 'bg-gray-50 text-gray-700 hover:bg-gray-100',
    green: isSelected 
      ? 'bg-green-100 text-green-800 ring-2 ring-green-300 shadow-sm' 
      : 'bg-gray-50 text-gray-700 hover:bg-gray-100',
    blue: isSelected 
      ? 'bg-blue-100 text-blue-800 ring-2 ring-blue-300 shadow-sm' 
      : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium
        transition-all duration-200 hover:scale-105 hover:shadow-md
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${colorClasses[colorScheme as keyof typeof colorClasses]}
      `}
    >
      <span className="text-base">{option.emoji}</span>
      <span>{option.text}</span>
      {option.desc && <span className="text-xs text-gray-500 ml-2">{option.desc}</span>}
    </button>
  );
};

export default function Sport() {
  // Sport options - simplified
  const [sportRecipes, setSportRecipes] = useState<SportRecipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<SportRecipe | null>(null);
  const [showRandomRecipes, setShowRandomRecipes] = useState(false);
  const [randomRecipes, setRandomRecipes] = useState<SportRecipe[]>([]);

  // Selection states
  const [selectedBodyPart, setSelectedBodyPart] = useState('');
  const [selectedSportEquipment, setSelectedSportEquipment] = useState('');
  const [selectedIntensity, setSelectedIntensity] = useState('');
  const [selectedDuration, setSelectedDuration] = useState('');

  const bodyPartOptions = [
    { emoji: '💪', text: '胸部', value: '胸部' },
    { emoji: '🔙', text: '背部', value: '背部' },
    { emoji: '🤲', text: '肩部', value: '肩部' },
    { emoji: '💪', text: '手臂', value: '手臂' },
    { emoji: '🎯', text: '核心', value: '核心' },
    { emoji: '🦵', text: '腿部', value: '腿部' },
    { emoji: '🍑', text: '臀部', value: '臀部' },
    { emoji: '❤️', text: '全身有氧', value: '全身有氧' }
  ];

  const sportEquipmentOptions = [
    { emoji: '🤸', text: '徒手训练', value: '徒手训练' },
    { emoji: '🏋️', text: '哑铃', value: '哑铃' },
    { emoji: '🎗️', text: '弹力带', value: '弹力带' },
    { emoji: '⚖️', text: '壶铃', value: '壶铃' },
    { emoji: '🏋️‍♂️', text: '杠铃', value: '杠铃' },
    { emoji: '🏃‍♂️', text: '健身器械', value: '健身器械' },
    { emoji: '🧘', text: '瑜伽垫', value: '瑜伽垫' },
    { emoji: '🚫', text: '什么都没有', value: '什么都没有' }
  ];

  const intensityOptions = [
    { emoji: '😌', text: '轻松', value: '轻松' },
    { emoji: '😊', text: '适中', value: '适中' },
    { emoji: '😤', text: '高强度', value: '高强度' },
    { emoji: '🔥', text: '极限挑战', value: '极限挑战' }
  ];

  const durationOptions = [
    { emoji: '⏱️', text: '15分钟', value: '15分钟' },
    { emoji: '⏰', text: '30分钟', value: '30分钟' },
    { emoji: '🕐', text: '45分钟', value: '45分钟' },
    { emoji: '⏳', text: '1小时+', value: '1小时+' }
  ];

  useEffect(() => {
    setSportRecipes(sportData.sport_recipes);
  }, []);

  const getRandomRecipes = () => {
    const shuffled = [...sportRecipes].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  };

  const handleRandomize = () => {
    setRandomRecipes(getRandomRecipes());
    setShowRandomRecipes(true);
  };

  // 新增：查找匹配的详细训练建议
  const getMatchedSportRecipe = () => {
    if (!selectedBodyPart || !selectedSportEquipment || !selectedIntensity || !selectedDuration) return null;
    if (!Array.isArray(sportData)) return null;
    return sportData.find(
      (item: any) =>
        item.bodyPart === selectedBodyPart &&
        item.equipment === selectedSportEquipment &&
        item.intensity === selectedIntensity &&
        item.duration === selectedDuration
    );
  };

  if (selectedRecipe) {
    return (
      <div className="max-w-4xl mx-auto">
        <Button 
          onClick={() => setSelectedRecipe(null)}
          variant="outline"
          className="mb-6 border-blue-300 text-blue-700 hover:bg-blue-50"
        >
          ← 返回列表
        </Button>
        
        <Card className="bg-white/90 backdrop-blur-sm border-blue-200/50">
          <CardHeader className="border-b border-blue-100">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <span className="text-5xl">{selectedRecipe.emoji}</span>
                  <div>
                    <CardTitle className="text-2xl text-gray-800">
                      {selectedRecipe.name}
                    </CardTitle>
                    <CardDescription className="text-gray-600 mt-1">
                      {selectedRecipe.subtitle}
                    </CardDescription>
                  </div>
                </div>
              </div>
              <Badge variant="outline" className="border-blue-300 text-blue-700">
                {selectedRecipe.difficulty}
              </Badge>
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-gray-600 mt-4">
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{selectedRecipe.time}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="w-4 h-4" />
                <span>{selectedRecipe.servings}</span>
              </div>
            </div>

            {selectedRecipe.warning && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center space-x-2 text-red-700 text-sm font-medium mb-2">
                  <AlertTriangle className="w-4 h-4" />
                  <span>{selectedRecipe.warning}</span>
                </div>
                {selectedRecipe.safety && (
                  <ul className="text-red-600 text-xs space-y-1 ml-6">
                    {selectedRecipe.safety.map((item, index) => (
                      <li key={index}>• {item}</li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </CardHeader>

          <CardContent className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* 工具和材料 */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                    🔧 所需工具
                  </h3>
                  <div className="space-y-2">
                    {selectedRecipe.tools.map((tool, index) => (
                      <div key={index} className="flex items-center space-x-2 text-sm">
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        <span>{tool}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                    🥄 准备清单
                  </h3>
                  <div className="space-y-3">
                    {selectedRecipe.ingredients.map((ingredient, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-100">
                        <div>
                          <span className="font-medium text-gray-800">{ingredient.name}</span>
                          {ingredient.note && (
                            <p className="text-xs text-gray-600 mt-1">{ingredient.note}</p>
                          )}
                        </div>
                        <Badge variant="secondary" className="bg-blue-200 text-blue-800">
                          {ingredient.amount}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 训练步骤 */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                  📋 训练步骤
                </h3>
                <div className="space-y-4">
                  {selectedRecipe.steps.map((step, index) => (
                    <div key={index} className="relative">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {step.step}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-800 mb-1">{step.action}</h4>
                          <p className="text-sm text-gray-600 mb-2">{step.detail}</p>
                          
                          {/* 各种提示信息 */}
                          {step.warning && (
                            <div className="flex items-start space-x-2 p-2 bg-red-50 border border-red-200 rounded text-xs text-red-700 mb-2">
                              <AlertTriangle className="w-3 h-3 mt-0.5 flex-shrink-0" />
                              <span>{step.warning}</span>
                            </div>
                          )}
                          
                          {step.pro_tip && (
                            <div className="flex items-start space-x-2 p-2 bg-blue-50 border border-blue-200 rounded text-xs text-blue-700 mb-2">
                              <Lightbulb className="w-3 h-3 mt-0.5 flex-shrink-0" />
                              <span><strong>专业提示：</strong>{step.pro_tip}</span>
                            </div>
                          )}
                          
                          {step.visual_clue && (
                            <div className="flex items-start space-x-2 p-2 bg-green-50 border border-green-200 rounded text-xs text-green-700 mb-2">
                              <Eye className="w-3 h-3 mt-0.5 flex-shrink-0" />
                              <span><strong>视觉提示：</strong>{step.visual_clue}</span>
                            </div>
                          )}
                          
                          {step.success_sign && (
                            <div className="flex items-start space-x-2 p-2 bg-emerald-50 border border-emerald-200 rounded text-xs text-emerald-700 mb-2">
                              <Star className="w-3 h-3 mt-0.5 flex-shrink-0" />
                              <span><strong>成功标志：</strong>{step.success_sign}</span>
                            </div>
                          )}
                          
                          {step.purpose && (
                            <div className="flex items-start space-x-2 p-2 bg-gray-50 border border-gray-200 rounded text-xs text-gray-700 mb-2">
                              <span><strong>目的：</strong>{step.purpose}</span>
                            </div>
                          )}
                          
                          {step.timing && (
                            <div className="flex items-start space-x-2 p-2 bg-pink-50 border border-pink-200 rounded text-xs text-pink-700 mb-2">
                              <span><strong>时机：</strong>{step.timing}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">🏃‍♂️ 科学运动健身指南</h2>
        <p className="text-gray-600">专业训练方案，塑造健康体魄</p>
      </div>

      <Card className="p-8 bg-white/80 backdrop-blur-sm shadow-xl border-0">
        {/* Step 1: Body Part */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-2xl">1️⃣</span>
            <h2 className="text-2xl font-bold text-gray-800">选择锻炼部位</h2>
            <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">单选</span>
          </div>
          <p className="text-gray-600 mb-4">「目标肌群」</p>
          <div className="flex flex-wrap gap-3">
            {bodyPartOptions.map((option) => (
              <OptionButton
                key={option.value}
                option={option}
                isSelected={selectedBodyPart === option.value}
                onClick={() => setSelectedBodyPart(option.value)}
                colorScheme="blue"
              />
            ))}
          </div>
        </div>

        {/* Step 2: Equipment */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-2xl">2️⃣</span>
            <h2 className="text-2xl font-bold text-gray-800">选择手边的器材</h2>
            <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">单选</span>
          </div>
          <p className="text-gray-600 mb-4">「训练工具」</p>
          <div className="flex flex-wrap gap-3">
            {sportEquipmentOptions.map((option) => (
              <OptionButton
                key={option.value}
                option={option}
                isSelected={selectedSportEquipment === option.value}
                onClick={() => setSelectedSportEquipment(option.value)}
                colorScheme="blue"
              />
            ))}
          </div>
        </div>

        {/* Step 3: Intensity */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-2xl">3️⃣</span>
            <h2 className="text-2xl font-bold text-gray-800">选择运动强度</h2>
            <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">单选</span>
          </div>
          <p className="text-gray-600 mb-4">「训练强度」</p>
          <div className="flex flex-wrap gap-3">
            {intensityOptions.map((option) => (
              <OptionButton
                key={option.value}
                option={option}
                isSelected={selectedIntensity === option.value}
                onClick={() => setSelectedIntensity(option.value)}
                colorScheme="blue"
              />
            ))}
          </div>
        </div>

        {/* Step 4: Duration */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-2xl">4️⃣</span>
            <h2 className="text-2xl font-bold text-gray-800">选择运动时长</h2>
            <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">单选</span>
          </div>
          <p className="text-gray-600 mb-4">「训练时间」</p>
          <div className="flex flex-wrap gap-3">
            {durationOptions.map((option) => (
              <OptionButton
                key={option.value}
                option={option}
                isSelected={selectedDuration === option.value}
                onClick={() => setSelectedDuration(option.value)}
                colorScheme="blue"
              />
            ))}
          </div>
        </div>

        {/* 生成配方展示区块 */}
        {selectedBodyPart && selectedSportEquipment && selectedIntensity && selectedDuration && (
          <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl border border-blue-200">
            <div className="text-center mb-4">
              <h3 className="text-xl font-bold text-gray-800 flex items-center justify-center gap-2">
                🎯 你的专属运动配方
              </h3>
              <p className="text-sm text-gray-600 mt-2">根据你的偏好生成的个性化配方</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="mb-4">
                <h4 className="text-lg font-semibold text-blue-700 mb-2">{selectedBodyPart} × {selectedSportEquipment}</h4>
                <p className="text-gray-600 text-sm mb-3">{selectedIntensity}，{selectedDuration}</p>
              </div>
              <div className="mb-4">
                <h5 className="font-semibold text-gray-800 mb-2">🏋️ 训练建议</h5>
                {getMatchedSportRecipe() ? (
                  <div>
                    <div className="font-bold text-blue-800 mb-2">{getMatchedSportRecipe().name}</div>
                    <div className="text-gray-700 text-sm mb-2">{getMatchedSportRecipe().description}</div>
                    <div className="text-xs text-gray-500 mb-2">{getMatchedSportRecipe().subtitle}</div>
                    <div className="mb-2">
                      <span className="font-semibold">所需器材：</span>
                      {getMatchedSportRecipe().tools.join('，')}
                    </div>
                    <div className="mb-2">
                      <span className="font-semibold">准备清单：</span>
                      {getMatchedSportRecipe().ingredients.map((ing: any) => `${ing.name}（${ing.amount}）`).join('，')}
                    </div>
                    <div className="mb-2">
                      <span className="font-semibold">训练步骤：</span>
                      <ol className="list-decimal ml-5">
                        {getMatchedSportRecipe().steps.map((step: any) => (
                          <li key={step.step} className="mb-1">{step.action}：{step.detail}</li>
                        ))}
                      </ol>
                    </div>
                    {getMatchedSportRecipe().warning && (
                      <div className="text-xs text-red-600 mt-2">⚠️ {getMatchedSportRecipe().warning}</div>
                    )}
                  </div>
                ) : (
                  <p className="text-gray-700 text-sm leading-relaxed">暂无详细建议，请尝试其他组合。</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* 推荐/抽卡区块 */}
        <div className="mt-16 p-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl border border-blue-200">
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold text-gray-800 flex items-center justify-center gap-2">
              🎲 选择困难？抽卡直接练！
            </h3>
            <p className="text-sm text-gray-600 mt-2">发现更多运动训练方法</p>
          </div>
          <div className="grid md:grid-cols-3 gap-4 text-sm mb-6">
            {randomRecipes.map((recommendation) => (
              <div 
                key={recommendation.id}
                onClick={() => setSelectedRecipe(recommendation)}
                className="text-center p-4 bg-white rounded-lg shadow-sm cursor-pointer hover:shadow-md transition-all duration-200 hover:scale-105"
              >
                <div className="text-2xl mb-2">{recommendation.emoji}</div>
                <div className="font-semibold text-gray-800 mb-2">{recommendation.name}</div>
                <div className="text-gray-600 mb-2">{recommendation.subtitle}</div>
                <div className="text-xs text-blue-600">{recommendation.difficulty}</div>
                {recommendation.warning && (
                  <div className="text-xs text-red-600 mt-1 flex items-center justify-center gap-1">
                    <AlertTriangle className="w-3 h-3" />
                    安全提醒
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="text-center">
            <Button
              onClick={handleRandomize}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-6 py-2 rounded-full text-sm font-medium shadow-md hover:shadow-lg transition-all duration-200"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              换一换
            </Button>
          </div>
        </div>

        {/* 详细训练方案展示区块 */}
        {selectedRecipe && (
          <div className="mt-8 p-6 bg-white rounded-xl shadow-lg border border-blue-200">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">{selectedRecipe.emoji}</span>
                <div>
                  <h4 className="text-xl font-bold text-gray-800">{selectedRecipe.name}</h4>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>难度: {selectedRecipe.difficulty}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      训练时间: {selectedRecipe.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {selectedRecipe.servings}
                    </span>
                  </div>
                </div>
              </div>
              {selectedRecipe.warning && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center gap-2 text-red-700 font-semibold mb-2">
                    <AlertTriangle className="w-5 h-5" />
                    {selectedRecipe.warning}
                  </div>
                  {selectedRecipe.safety && (
                    <ul className="text-sm text-red-600 space-y-1">
                      {selectedRecipe.safety.map((item, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-red-500 mt-1">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h5 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    🛠️ 所需器材
                  </h5>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {selectedRecipe.tools.map((tool, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                        {tool}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    🥄 准备清单
                  </h5>
                  <ul className="text-sm text-gray-600 space-y-2">
                    {selectedRecipe.ingredients.map((ingredient, index) => (
                      <li key={index} className="flex justify-between items-start">
                        <span className="font-medium">{ingredient.name}</span>
                        <div className="text-right">
                          <div className="font-semibold text-blue-600">{ingredient.amount}</div>
                          <div className="text-xs text-gray-500">{ingredient.note}</div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div>
              <h5 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                📋 训练步骤
              </h5>
              <div className="space-y-4">
                {selectedRecipe.steps.map((step, index) => (
                  <div key={index} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                      {step.step}
                    </div>
                    <div className="flex-1">
                      <h6 className="font-semibold text-gray-800 mb-2">{step.action}</h6>
                      <p className="text-sm text-gray-700 mb-2">{step.detail}</p>
                      {step.warning && (
                        <div className="text-xs text-red-600 bg-red-50 p-2 rounded border border-red-200 mb-2">
                          ⚠️ {step.warning}
                        </div>
                      )}
                      {step.visual_clue && (
                        <div className="text-xs text-blue-600 bg-blue-50 p-2 rounded border border-blue-200 mb-2">
                          👁️ 视觉提示: {step.visual_clue}
                        </div>
                      )}
                      {step.success_sign && (
                        <div className="text-xs text-green-600 bg-green-50 p-2 rounded border border-green-200 mb-2">
                          ✅ 成功标志: {step.success_sign}
                        </div>
                      )}
                      {step.pro_tip && (
                        <div className="text-xs text-blue-600 bg-blue-50 p-2 rounded border border-blue-200">
                          💡 专业技巧: {step.pro_tip}
                        </div>
                      )}
                      {step.time_control && (
                        <div className="text-xs text-indigo-600 bg-indigo-50 p-2 rounded border border-indigo-200">
                          ⏱️ 时间控制: {step.time_control}
                        </div>
                      )}
                      {step.purpose && (
                        <div className="text-xs text-purple-600 bg-purple-50 p-2 rounded border border-purple-200">
                          🎯 目的: {step.purpose}
                        </div>
                      )}
                      {step.technique && (
                        <div className="text-xs text-orange-600 bg-orange-50 p-2 rounded border border-orange-200">
                          🔧 技巧: {step.technique}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}