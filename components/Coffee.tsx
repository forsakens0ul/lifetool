'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Users, Star, AlertTriangle, Lightbulb, Eye, Volume2, Shuffle, RefreshCw } from 'lucide-react';

// 导入数据
import coffeeData from '@/public/data/coffee_recommendations.json';

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
  }>;
}

interface OptionButtonProps {
  option: {
    emoji: string;
    text: string;
    value: string;
  };
  isSelected: boolean;
  onClick: () => void;
}

const OptionButton = ({ 
  option, 
  isSelected, 
  onClick,
  colorScheme = 'amber',
  disabled = false
}: { 
  option: { emoji: string; text: string; value: string };
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
    </button>
  );
};

export default function Coffee() {
  const [coffeeRecipes, setCoffeeRecipes] = useState<CoffeeRecipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<CoffeeRecipe | null>(null);
  const [displayedRecommendations, setDisplayedRecommendations] = useState<CoffeeRecipe[]>([]);
  const [hasShuffled, setHasShuffled] = useState(false);
  
  // Generated recipe states
  const [generatedRecipe, setGeneratedRecipe] = useState<string>('');
  const [coffeeTitle, setCoffeeTitle] = useState<string>('');
  const [coffeeDescription, setCoffeeDescription] = useState<string>('');

  // Selection states
  const [coffeeSelections, setCoffeeSelections] = useState({
    bean: '',
    tool: '',
    additions: [] as string[]
  });

  const beanOptions = [
    { emoji: '🫘', text: '浅烘焙豆', value: '浅烘焙豆' },
    { emoji: '🫘', text: '中烘焙豆', value: '中烘焙豆' },
    { emoji: '🫘', text: '深烘焙豆', value: '深烘焙豆' },
    { emoji: '🫘', text: '单品豆', value: '单品豆' },
    { emoji: '🫘', text: '商业拼配豆', value: '商业拼配豆' },
    { emoji: '❓', text: '没有豆子', value: '没有豆子' }
  ];

  const equipmentOptions = [
    { emoji: '☕', text: '法压壶', value: '法压壶' },
    { emoji: '🫖', text: '摩卡壶', value: '摩卡壶' },
    { emoji: '💦', text: '手冲壶+滤杯', value: '手冲壶+滤杯' },
    { emoji: '🧊', text: '冷萃瓶', value: '冷萃瓶' },
    { emoji: '🧃', text: '咖啡胶囊机', value: '咖啡胶囊机' },
    { emoji: '☕', text: '意式浓缩机', value: '意式浓缩机' },
    { emoji: '🧊', text: '冰滴壶', value: '冰滴壶' },
    { emoji: '🧪', text: '爱乐压', value: '爱乐压' },
    { emoji: '🚫', text: '什么都没有', value: '什么都没有' }
  ];

  const additiveOptions = [
    { emoji: '🥛', text: '牛奶/奶泡', value: '牛奶/奶泡' },
    { emoji: '🥥', text: '椰奶/燕麦奶', value: '椰奶/燕麦奶' },
    { emoji: '🍯', text: '蜂蜜/糖浆', value: '蜂蜜/糖浆' },
    { emoji: '🍦', text: '冰淇淋', value: '冰淇淋' },
    { emoji: '🍫', text: '可可粉/肉桂粉', value: '可可粉/肉桂粉' },
    { emoji: '❌', text: '不加，我喜欢纯的', value: '不加' }
  ];

  useEffect(() => {
    setCoffeeRecipes(coffeeData.coffee_recipes);
    // 初始化时显示前3个，不算作已抽卡
    setDisplayedRecommendations(coffeeData.coffee_recipes.slice(0, 3));
  }, []);

  const setCoffeeBean = (value: string) => {
    setCoffeeSelections(prev => ({ ...prev, bean: value }));
  };

  const setCoffeeTool = (value: string) => {
    setCoffeeSelections(prev => ({ ...prev, tool: value }));
  };

  const toggleCoffeeAddition = (value: string) => {
    if (value === '不加') {
      setCoffeeSelections(prev => ({ ...prev, additions: ['不加'] }));
    } else {
      setCoffeeSelections(prev => ({
        ...prev,
        additions: prev.additions.includes(value)
          ? prev.additions.filter(item => item !== value)
          : [...prev.additions.filter(item => item !== '不加'), value]
      }));
    }
  };

  const shuffleRecommendations = () => {
    if (!hasShuffled) {
      // 第一次抽卡，从所有配方中随机选择3个
      const shuffled = [...coffeeRecipes].sort(() => 0.5 - Math.random());
      setDisplayedRecommendations(shuffled.slice(0, 3));
      setHasShuffled(true);
    } else {
      // 后续换一换，确保新的3个和当前显示的不重复
      const currentIds = displayedRecommendations.map(recipe => recipe.id);
      const availableRecipes = coffeeRecipes.filter(recipe => !currentIds.includes(recipe.id));
      
      if (availableRecipes.length >= 3) {
        const shuffled = [...availableRecipes].sort(() => 0.5 - Math.random());
        setDisplayedRecommendations(shuffled.slice(0, 3));
      } else {
        // 如果剩余配方不足3个，重新从所有配方中选择
        const shuffled = [...coffeeRecipes].sort(() => 0.5 - Math.random());
        setDisplayedRecommendations(shuffled.slice(0, 3));
      }
    }
  };

  const selectRecommendation = (recipe: CoffeeRecipe) => {
    setSelectedRecipe(recipe);
  };

  // Generate personalized recipe based on selections
  const generatePersonalizedRecipe = () => {
    if (!coffeeSelections.bean || !coffeeSelections.tool || coffeeSelections.additions.length === 0) return;

    // Generate coffee title and description
    let title = '';
    let description = '';
    let recipe = '';

    // Determine coffee type based on selections
    if (coffeeSelections.tool === '摩卡壶') {
      title = '摩卡咖啡';
      description = '意式经典摩卡壶制作，浓缩香醇的传统风味';
    } else if (coffeeSelections.tool === '法压壶') {
      title = '法式咖啡';
      description = '法压壶萃取，醇厚饱满的经典口感';
    } else if (coffeeSelections.tool === '手冲壶+滤杯') {
      title = '手冲咖啡';
      description = '精品手冲制作，层次丰富的风味体验';
    } else if (coffeeSelections.tool === '冷萃瓶') {
      title = '冷萃咖啡';
      description = '低温慢萃，清爽顺滑的夏日特饮';
    } else if (coffeeSelections.tool === '意式浓缩机') {
      title = '意式浓缩';
      description = '专业意式萃取，浓郁香醇的咖啡精华';
    } else {
      title = '特调咖啡';
      description = '根据现有器材调制的个性化咖啡';
    }

    // Add bean characteristics to description
    if (coffeeSelections.bean === '浅烘焙豆') {
      description += '（风味清爽，果酸明显）';
    } else if (coffeeSelections.bean === '中烘焙豆') {
      description += '（平衡醇厚，香甜适中）';
    } else if (coffeeSelections.bean === '深烘焙豆') {
      description += '（浓郁醇厚，苦甜平衡）';
    }

    // Add additive info to description
    if (coffeeSelections.additions.includes('椰奶/燕麦奶')) {
      description += '，使用植物奶制作健康版本';
    } else if (coffeeSelections.additions.includes('牛奶/奶泡')) {
      description += '，搭配丝滑奶泡';
    }

    // Generate recipe instructions
    let beanAmount = '15g';
    let grindSize = '中细研磨';
    let waterTemp = '92℃';
    let brewTime = '3-4分钟';
    let servings = '一人份';

    if (coffeeSelections.bean === '浅烘焙豆') {
      waterTemp = '94℃';
      grindSize = '中粗研磨';
      description += '，适合清爽型饮品。';
    } else if (coffeeSelections.bean === '深烘焙豆') {
      waterTemp = '88℃';
      grindSize = '中细研磨';
    }

    if (coffeeSelections.tool === '法压壶') {
      beanAmount = '20g';
      grindSize = '粗研磨';
      brewTime = '4分钟';
      waterTemp = '90℃';
    } else if (coffeeSelections.tool === '冷萃瓶') {
      beanAmount = '25g';
      grindSize = '中粗研磨';
      brewTime = '12-16小时';
      waterTemp = '室温水';
    } else if (coffeeSelections.tool === '手冲壶+滤杯') {
      beanAmount = '15g';
      grindSize = '中细研磨';
      brewTime = '2-3分钟';
    }

    recipe = `使用${coffeeSelections.bean}（${description.includes('风味清爽') ? '风味清爽，果酸明显，适合清爽型饮品。' : coffeeSelections.bean === '中烘焙豆' ? '平衡醇厚，香甜适中，适合日常饮用。' : '浓郁醇厚，苦甜平衡，适合浓郁口感。'}），取${beanAmount}研磨成${grindSize}，用${coffeeSelections.tool}冲煮，水温${waterTemp}，时间约${brewTime}，适合${servings}。`;

    if (coffeeSelections.additions.length > 0 && !coffeeSelections.additions.includes('不加')) {
      if (coffeeSelections.additions.includes('椰奶/燕麦奶')) {
        recipe += '完成后使用冰椰奶或燕麦奶代替牛奶，适合乳糖不耐人群。';
      } else if (coffeeSelections.additions.includes('牛奶/奶泡')) {
        recipe += '完成后加入温热牛奶和奶泡，制作拿铁风味。';
      } else if (coffeeSelections.additions.includes('蜂蜜/糖浆')) {
        recipe += '可根据个人喜好添加蜂蜜或糖浆调味。';
      } else if (coffeeSelections.additions.includes('冰淇淋')) {
        recipe += '完成后加入香草冰淇淋，制作阿芙佳朵风味。';
      } else if (coffeeSelections.additions.includes('可可粉/肉桂粉')) {
        recipe += '完成后撒上可可粉或肉桂粉增加风味层次。';
      }
    }

    setCoffeeTitle(title);
    setCoffeeDescription(description);
    setGeneratedRecipe(recipe);
  };

  // Auto-generate recipe when all selections are made
  useEffect(() => {
    if (coffeeSelections.bean && coffeeSelections.tool && coffeeSelections.additions.length > 0) {
      generatePersonalizedRecipe();
    } else {
      setGeneratedRecipe('');
      setCoffeeTitle('');
      setCoffeeDescription('');
    }
  }, [coffeeSelections]);

  const renderCoffeeModule = () => (
    <Card className="p-8 bg-white/80 backdrop-blur-sm shadow-xl border-0">
      {/* Step 1: Coffee Beans */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-2xl">1️⃣</span>
          <h2 className="text-2xl font-bold text-gray-800">选择你有的咖啡豆</h2>
          <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">单选</span>
        </div>
        <p className="text-gray-600 mb-4">「咖啡豆类型」</p>
        <div className="flex flex-wrap gap-3">
          {beanOptions.map((option) => (
            <OptionButton
              key={option.value}
              option={option}
              isSelected={coffeeSelections.bean === option.value}
              onClick={() => setCoffeeBean(option.value)}
            />
          ))}
        </div>
      </div>

      {/* Step 2: Equipment */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-2xl">2️⃣</span>
          <h2 className="text-2xl font-bold text-gray-800">选择手边的器具</h2>
          <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">单选</span>
        </div>
        <p className="text-gray-600 mb-4">「冲煮工具」</p>
        <div className="flex flex-wrap gap-3">
          {equipmentOptions.map((option) => (
            <OptionButton
              key={option.value}
              option={option}
              isSelected={coffeeSelections.tool === option.value}
              onClick={() => setCoffeeTool(option.value)}
               colorScheme="amber"
            />
          ))}
        </div>
      </div>

      {/* Step 3: Additives */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-2xl">3️⃣</span>
          <h2 className="text-2xl font-bold text-gray-800">是否搭配牛奶或其它？</h2>
          <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">可多选</span>
        </div>
        <p className="text-gray-600 mb-4">「风味增强」</p>
        <div className="flex flex-wrap gap-3">
          {additiveOptions.map((option) => (
            <OptionButton
              key={option.value}
              option={option}
              isSelected={coffeeSelections.additions.includes(option.value)}
              onClick={() => toggleCoffeeAddition(option.value)}
              colorScheme="amber"
            />
          ))}
        </div>
      </div>

      {/* Generated Recipe Display */}
      {generatedRecipe && (
        <div className="mb-8 p-6 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl border border-yellow-200">
          <div className="text-center mb-4">
            <h3 className="text-xl font-bold text-gray-800 flex items-center justify-center gap-2">
              🎯 你的专属咖啡配方
            </h3>
            <p className="text-sm text-gray-600 mt-2">根据你的偏好生成的个性化配方</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="mb-4">
              <h4 className="text-lg font-semibold text-amber-700 mb-2">{coffeeTitle}</h4>
              <p className="text-gray-600 text-sm mb-3">{coffeeDescription}</p>
            </div>
            
            <div className="mb-4">
              <h5 className="font-semibold text-gray-800 mb-2">🥄 制作方法</h5>
              <p className="text-gray-700 text-sm leading-relaxed">{generatedRecipe}</p>
            </div>
            
            <div className="flex justify-center">
              <Button
                onClick={() => window.open('https://www.bilibili.com/video/BV1xx411c7Sq/', '_blank')}
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 py-2 rounded-full text-sm font-medium shadow-md hover:shadow-lg transition-all duration-200"
              >
                ▶ 观看详细教程视频 🔗
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Recommendations Section */}
      <div className="mt-16 p-6 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl border border-yellow-200">
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold text-gray-800 flex items-center justify-center gap-2">
            🎲 选择困难？抽卡直接做！
          </h3>
          <p className="text-sm text-gray-600 mt-2">发现更多咖啡制作方法</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-4 text-sm mb-6">
          {displayedRecommendations.map((recommendation) => (
            <div 
              key={recommendation.id}
              onClick={() => selectRecommendation(recommendation)}
              className="text-center p-4 bg-white rounded-lg shadow-sm cursor-pointer hover:shadow-md transition-all duration-200 hover:scale-105"
            >
              <div className="text-2xl mb-2">{recommendation.emoji}</div>
              <div className="font-semibold text-gray-800 mb-2">{recommendation.name}</div>
              <div className="text-gray-600 mb-2">{recommendation.subtitle}</div>
              <div className="text-xs text-amber-600">{recommendation.difficulty}</div>
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
            onClick={shuffleRecommendations}
            className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-6 py-2 rounded-full text-sm font-medium shadow-md hover:shadow-lg transition-all duration-200"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            {hasShuffled ? '换一换' : '我的配方，抽卡！'}
          </Button>
        </div>

        {/* Detailed Recipe Display */}
        {selectedRecipe && (
          <div className="mt-8 p-6 bg-white rounded-xl shadow-sm border border-orange-200">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <span className="text-4xl">{selectedRecipe.emoji}</span>
                <div>
                  <h4 className="text-xl font-bold text-gray-800">{selectedRecipe.name}</h4>
                  <p className="text-gray-600 text-sm">{selectedRecipe.subtitle}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="border-orange-300 text-orange-700">
                  {selectedRecipe.difficulty}
                </Badge>
                <Button
                  onClick={() => setSelectedRecipe(null)}
                  variant="outline"
                  size="sm"
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </Button>
              </div>
            </div>

            <div className="flex items-center space-x-6 text-sm text-gray-600 mb-4">
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
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
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

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* 工具和材料 */}
              <div className="space-y-4">
                <div>
                  <h5 className="font-semibold text-gray-800 mb-2 flex items-center">
                    🔧 所需工具
                  </h5>
                  <div className="space-y-1">
                    {selectedRecipe.tools.map((tool, index) => (
                      <div key={index} className="flex items-center space-x-2 text-sm">
                        <div className="w-1 h-1 bg-orange-400 rounded-full"></div>
                        <span>{tool}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h5 className="font-semibold text-gray-800 mb-2 flex items-center">
                    🥄 材料清单
                  </h5>
                  <div className="space-y-2">
                    {selectedRecipe.ingredients.map((ingredient, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-orange-50 rounded border border-orange-100">
                        <div>
                          <span className="font-medium text-gray-800 text-sm">{ingredient.name}</span>
                          {ingredient.note && (
                            <p className="text-xs text-gray-600">{ingredient.note}</p>
                          )}
                        </div>
                        <Badge variant="secondary" className="bg-orange-200 text-orange-800 text-xs">
                          {ingredient.amount}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 制作步骤 */}
              <div>
                <h5 className="font-semibold text-gray-800 mb-2 flex items-center">
                  📋 制作步骤
                </h5>
                <div className="space-y-3">
                  {selectedRecipe.steps.map((step, index) => (
                    <div key={index} className="flex gap-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
                        {step.step}
                      </div>
                      <div className="flex-1">
                        <h6 className="font-medium text-gray-800 text-sm mb-1">{step.action}</h6>
                        <p className="text-xs text-gray-600 mb-2">{step.detail}</p>
                        
                        {/* 各种提示信息 */}
                        {step.warning && (
                          <div className="flex items-start space-x-1 p-2 bg-red-50 border border-red-200 rounded text-xs text-red-700 mb-1">
                            <AlertTriangle className="w-3 h-3 mt-0.5 flex-shrink-0" />
                            <span>{step.warning}</span>
                          </div>
                        )}
                        
                        {step.pro_tip && (
                          <div className="flex items-start space-x-1 p-2 bg-blue-50 border border-blue-200 rounded text-xs text-blue-700 mb-1">
                            <Lightbulb className="w-3 h-3 mt-0.5 flex-shrink-0" />
                            <span><strong>专业提示：</strong>{step.pro_tip}</span>
                          </div>
                        )}
                        
                        {step.visual_clue && (
                          <div className="flex items-start space-x-1 p-2 bg-green-50 border border-green-200 rounded text-xs text-green-700 mb-1">
                            <Eye className="w-3 h-3 mt-0.5 flex-shrink-0" />
                            <span><strong>视觉提示：</strong>{step.visual_clue}</span>
                          </div>
                        )}
                        
                        {step.success_sign && (
                          <div className="flex items-start space-x-1 p-2 bg-emerald-50 border border-emerald-200 rounded text-xs text-emerald-700 mb-1">
                            <Star className="w-3 h-3 mt-0.5 flex-shrink-0" />
                            <span><strong>成功标志：</strong>{step.success_sign}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">☕ 精品咖啡制作指南</h2>
        <p className="text-gray-600">从入门到精通，掌握专业咖啡制作技巧</p>
      </div>

      {renderCoffeeModule()}
    </div>
  );
}