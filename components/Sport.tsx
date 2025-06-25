"use client";

import { useState, useEffect } from "react";
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
  RefreshCw,
} from "lucide-react";

// 导入数据
import sportRecommendationsData from "@/public/data/sport_recommendations.json";
import sportDetailedData from "@/public/data/sport_recipes_detailed.json";

// 定义sport_recommendations.json的根类型
interface SportRecommendationsDataRoot {
  sport_recipes: SportRecipe[];
  pro_tips: Record<string, string>;
  metadata: Record<string, any>;
}

// 定义SportRecipe接口
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

// 详细训练建议的接口
interface SportDetailedRecipe {
  bodyPart: string;
  equipment: string;
  intensity: string;
  duration: string;
  result: string;
}

const OptionButton = ({
  option,
  isSelected,
  onClick,
  colorScheme = "blue",
  disabled = false,
}: {
  option: { emoji: string; text: string; value: string; desc?: string };
  isSelected: boolean;
  onClick: () => void;
  colorScheme?: string;
  disabled?: boolean;
}) => {
  const colorClasses = {
    amber: isSelected
      ? "bg-amber-100 text-amber-800 ring-2 ring-amber-300 shadow-sm"
      : "bg-gray-50 text-gray-700 hover:bg-gray-100",
    green: isSelected
      ? "bg-green-100 text-green-800 ring-2 ring-green-300 shadow-sm"
      : "bg-gray-50 text-gray-700 hover:bg-gray-100",
    blue: isSelected
      ? "bg-blue-100 text-blue-800 ring-2 ring-blue-300 shadow-sm"
      : "bg-gray-50 text-gray-700 hover:bg-gray-100",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium
        transition-all duration-200 hover:scale-105 hover:shadow-md
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        ${colorClasses[colorScheme as keyof typeof colorClasses]}
      `}
    >
      <span className="text-base">{option.emoji}</span>
      <span>{option.text}</span>
      {option.desc && (
        <span className="text-xs text-gray-500 ml-2">{option.desc}</span>
      )}
    </button>
  );
};

export default function Sport() {
  // Sport options - simplified
  const [sportRecipes, setSportRecipes] = useState<SportRecipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<SportRecipe | null>(
    null
  );
  const [showRandomRecipes, setShowRandomRecipes] = useState(false);
  const [randomRecipes, setRandomRecipes] = useState<SportRecipe[]>([]);

  // Selection states
  const [selectedBodyPart, setSelectedBodyPart] = useState("");
  const [selectedSportEquipment, setSelectedSportEquipment] = useState("");
  const [selectedIntensity, setSelectedIntensity] = useState("");
  const [selectedDuration, setSelectedDuration] = useState("");

  const bodyPartOptions = [
    { emoji: "💪", text: "胸部", value: "胸部" },
    { emoji: "🔙", text: "背部", value: "背部" },
    { emoji: "🤲", text: "肩部", value: "肩部" },
    { emoji: "💪", text: "手臂", value: "手臂" },
    { emoji: "🎯", text: "核心", value: "核心" },
    { emoji: "🦵", text: "腿部", value: "腿部" },
    { emoji: "🍑", text: "臀部", value: "臀部" },
    { emoji: "❤️", text: "全身有氧", value: "全身有氧" },
  ];

  const sportEquipmentOptions = [
    { emoji: "🤸", text: "徒手训练", value: "徒手训练" },
    { emoji: "🏋️", text: "哑铃", value: "哑铃" },
    { emoji: "🎗️", text: "弹力带", value: "弹力带" },
    { emoji: "⚖️", text: "壶铃", value: "壶铃" },
    { emoji: "🏋️‍♂️", text: "杠铃", value: "杠铃" },
    { emoji: "🏃‍♂️", text: "健身器械", value: "健身器械" },
    { emoji: "🧘", text: "瑜伽垫", value: "瑜伽垫" },
    { emoji: "🚫", text: "什么都没有", value: "什么都没有" },
  ];

  const intensityOptions = [
    { emoji: "😌", text: "轻松", value: "轻松" },
    { emoji: "😊", text: "适中", value: "适中" },
    { emoji: "😤", text: "高强度", value: "高强度" },
    { emoji: "🔥", text: "极限挑战", value: "极限挑战" },
  ];

  const durationOptions = [
    { emoji: "⏱️", text: "15分钟", value: "15分钟" },
    { emoji: "⏰", text: "30分钟", value: "30分钟" },
    { emoji: "🕐", text: "45分钟", value: "45分钟" },
    { emoji: "⏳", text: "1小时+", value: "1小时+" },
  ];

  useEffect(() => {
    // 使用类型断言确保数据结构正确
    const typedSportData =
      sportRecommendationsData as SportRecommendationsDataRoot;
    if (typedSportData && Array.isArray(typedSportData.sport_recipes)) {
      setSportRecipes(typedSportData.sport_recipes);
      // 初始化随机配方
      setRandomRecipes(typedSportData.sport_recipes.slice(0, 3));
    }
  }, []);

  const getRandomRecipes = () => {
    if (sportRecipes.length === 0) return [] as SportRecipe[];
    const shuffled = [...sportRecipes].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  };

  const handleRandomize = () => {
    setRandomRecipes(getRandomRecipes());
    setShowRandomRecipes(true);
  };

  // 查找匹配的详细训练建议
  const getMatchedSportRecipe = (): SportDetailedRecipe | null => {
    if (
      !selectedBodyPart ||
      !selectedSportEquipment ||
      !selectedIntensity ||
      !selectedDuration
    ) {
      return null;
    }

    // 对选项进行映射处理
    const bodyPartMapping: { [key: string]: string } = {
      全身有氧: "全身",
      肩部: "背部", // 将肩部映射到背部
      臀部: "腿部", // 将臀部映射到腿部
    };

    // 对于equipment需要特殊处理
    const equipmentMapping: { [key: string]: string } = {
      徒手训练: "无器械",
      什么都没有: "无器械",
      健身器械: "哑铃", // 将健身器械映射到哑铃
      壶铃: "哑铃", // 将壶铃映射到哑铃
      杠铃: "哑铃", // 将杠铃映射到哑铃
    };

    // 对于intensity需要特殊处理
    const intensityMapping: { [key: string]: string } = {
      轻松: "适中",
      极限挑战: "高强度",
    };

    // 对于duration需要特殊处理
    const durationMapping: { [key: string]: string } = {
      "1小时+": "45分钟",
    };

    const mappedBodyPart =
      bodyPartMapping[selectedBodyPart] || selectedBodyPart;
    const mappedEquipment =
      equipmentMapping[selectedSportEquipment] || selectedSportEquipment;
    const mappedIntensity =
      intensityMapping[selectedIntensity] || selectedIntensity;
    const mappedDuration =
      durationMapping[selectedDuration] || selectedDuration;

    console.log("寻找匹配:", {
      bodyPart: mappedBodyPart,
      equipment: mappedEquipment,
      intensity: mappedIntensity,
      duration: mappedDuration,
    });

    // 使用sport_recipes_detailed.json中的数据
    const exactMatch = (sportDetailedData as SportDetailedRecipe[]).find(
      (item: SportDetailedRecipe) =>
        item.bodyPart === mappedBodyPart &&
        item.equipment === mappedEquipment &&
        item.intensity === mappedIntensity &&
        item.duration === mappedDuration
    );

    if (exactMatch) return exactMatch;

    // 如果没有完全匹配，尝试只匹配部位和强度
    const partialMatch = (sportDetailedData as SportDetailedRecipe[]).find(
      (item: SportDetailedRecipe) =>
        item.bodyPart === mappedBodyPart && item.intensity === mappedIntensity
    );

    // 如果没有部位和强度的匹配，尝试只匹配部位
    if (!partialMatch) {
      return (
        (sportDetailedData as SportDetailedRecipe[]).find(
          (item: SportDetailedRecipe) => item.bodyPart === mappedBodyPart
        ) || null
      );
    }

    return partialMatch || null;
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
              <Badge
                variant="outline"
                className="border-blue-300 text-blue-700"
              >
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
                      <div
                        key={index}
                        className="flex items-center space-x-2 text-sm"
                      >
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
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-100"
                      >
                        <div>
                          <span className="font-medium text-gray-800">
                            {ingredient.name}
                          </span>
                          {ingredient.note && (
                            <p className="text-xs text-gray-600 mt-1">
                              {ingredient.note}
                            </p>
                          )}
                        </div>
                        <Badge
                          variant="secondary"
                          className="bg-blue-200 text-blue-800"
                        >
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
                          <h4 className="font-semibold text-gray-800 mb-1">
                            {step.action}
                          </h4>
                          <p className="text-sm text-gray-600 mb-2">
                            {step.detail}
                          </p>

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
                              <span>
                                <strong>专业提示：</strong>
                                {step.pro_tip}
                              </span>
                            </div>
                          )}

                          {step.visual_clue && (
                            <div className="flex items-start space-x-2 p-2 bg-green-50 border border-green-200 rounded text-xs text-green-700 mb-2">
                              <Eye className="w-3 h-3 mt-0.5 flex-shrink-0" />
                              <span>
                                <strong>视觉提示：</strong>
                                {step.visual_clue}
                              </span>
                            </div>
                          )}

                          {step.success_sign && (
                            <div className="flex items-start space-x-2 p-2 bg-emerald-50 border border-emerald-200 rounded text-xs text-emerald-700 mb-2">
                              <Star className="w-3 h-3 mt-0.5 flex-shrink-0" />
                              <span>
                                <strong>成功标志：</strong>
                                {step.success_sign}
                              </span>
                            </div>
                          )}

                          {step.purpose && (
                            <div className="flex items-start space-x-2 p-2 bg-gray-50 border border-gray-200 rounded text-xs text-gray-700 mb-2">
                              <span>
                                <strong>目的：</strong>
                                {step.purpose}
                              </span>
                            </div>
                          )}

                          {step.timing && (
                            <div className="flex items-start space-x-2 p-2 bg-pink-50 border border-pink-200 rounded text-xs text-pink-700 mb-2">
                              <span>
                                <strong>时机：</strong>
                                {step.timing}
                              </span>
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
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          🏃‍♂️ 科学运动健身指南
        </h2>
        <p className="text-gray-600">专业训练方案，塑造健康体魄</p>
      </div>

      <Card className="p-8 bg-white/80 backdrop-blur-sm shadow-xl border-0">
        {/* Step 1: Body Part */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-2xl">1️⃣</span>
            <h2 className="text-2xl font-bold text-gray-800">选择锻炼部位</h2>
            <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              单选
            </span>
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
            <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              单选
            </span>
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
            <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              单选
            </span>
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
            <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              单选
            </span>
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
        {selectedBodyPart &&
          selectedSportEquipment &&
          selectedIntensity &&
          selectedDuration && (
            <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl border border-blue-200">
              <div className="text-center mb-4">
                <h3 className="text-xl font-bold text-gray-800 flex items-center justify-center gap-2">
                  🎯 你的专属运动配方
                </h3>
                <p className="text-sm text-gray-600 mt-2">
                  根据你的偏好生成的个性化配方
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="mb-4">
                  <h4 className="text-lg font-semibold text-blue-700 mb-2">
                    {selectedBodyPart} × {selectedSportEquipment}
                  </h4>
                  <p className="text-gray-600 text-sm mb-3">
                    {selectedIntensity}，{selectedDuration}
                  </p>
                </div>
                <div className="mb-4">
                  <h5 className="font-semibold text-gray-800 mb-2">
                    🏋️ 训练建议
                  </h5>
                  {getMatchedSportRecipe() ? (
                    <div>
                      <div className="text-gray-700 text-sm mb-4 leading-relaxed">
                        {getMatchedSportRecipe()?.result}
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-700 text-sm leading-relaxed">
                      暂无详细建议，请尝试其他组合。
                    </p>
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
            {randomRecipes.length > 0 ? (
              randomRecipes.map((recipe: SportRecipe) => (
                <div
                  key={recipe.id}
                  onClick={() => setSelectedRecipe(recipe)}
                  className="text-center p-4 bg-white rounded-lg shadow-sm cursor-pointer hover:shadow-md transition-all duration-200 hover:scale-105"
                >
                  <div className="text-2xl mb-2">{recipe.emoji}</div>
                  <div className="font-semibold text-gray-800 mb-2">
                    {recipe.name}
                  </div>
                  <div className="text-gray-600 mb-2">{recipe.subtitle}</div>
                  <div className="text-xs text-blue-600">
                    {recipe.difficulty}
                  </div>
                  {recipe.warning && (
                    <div className="text-xs text-red-600 mt-1 flex items-center justify-center gap-1">
                      <AlertTriangle className="w-3 h-3" />
                      安全提醒
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center p-8 text-gray-500">
                加载中...
              </div>
            )}
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
      </Card>
    </div>
  );
}
