"use client";

import { useState, useEffect } from "react";
import {
  Card,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw, Clock, Users, AlertTriangle } from "lucide-react";

interface TeaSelections {
  teaTypes: string;
  brewMethods: string;
  temperature: string;
  accessories: string;
}

interface TeaRecipe {
  tea: string;
  tool: string;
  addition: string;
  result: string;
}

interface TeaRecommendation {
  id: number;
  name: string;
  emoji: string;
  subtitle: string;
  difficulty: string;
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
    visual_clue?: string;
    success_sign?: string;
    abnormal?: string;
    sound_clue?: string;
    pro_tip?: string;
    time_control?: string;
    temp_target?: string;
    drink_tip?: string;
    visual_check?: string;
    timing?: string;
    effect?: string;
    tool?: string;
    output?: string;
    check?: string;
    technique?: string;
    purpose?: string;
  }>;
}

export default function Tea() {
  const [teaRecipes, setTeaRecipes] = useState<TeaRecipe[]>([]);
  const [generatedTeaRecipe, setGeneratedTeaRecipe] = useState<string>("");
  const [teaTitle, setTeaTitle] = useState<string>("");
  const [teaDescription, setTeaDescription] = useState<string>("");
  const [teaRecommendations, setTeaRecommendations] = useState<TeaRecommendation[]>([]);
  const [displayedTeaRecommendations, setDisplayedTeaRecommendations] = useState<TeaRecommendation[]>([]);
  const [selectedTeaRecommendation, setSelectedTeaRecommendation] = useState<TeaRecommendation | null>(null);
  const [teaSelections, setTeaSelections] = useState<TeaSelections>({
    teaTypes: "",
    brewMethods: "",
    temperature: "",
    accessories: "",
  });

  useEffect(() => {
    fetch("/data/tea_recipes_detailed.json")
      .then((response) => response.json())
      .then((data) => setTeaRecipes(data))
      .catch((error) => console.error("Error loading tea recipes:", error));
  }, []);

  useEffect(() => {
    fetch("/data/tea_recommendations.json")
      .then((response) => response.json())
      .then((data) => {
        setTeaRecommendations(data.tea_recipes);
        const shuffled = [...data.tea_recipes].sort(() => 0.5 - Math.random());
        setDisplayedTeaRecommendations(shuffled.slice(0, 3));
      })
      .catch((error) => console.error("Error loading tea recommendations:", error));
  }, []);

  useEffect(() => {
    if (
      teaSelections.teaTypes &&
      teaSelections.brewMethods &&
      teaSelections.temperature &&
      teaSelections.accessories &&
      teaRecipes.length > 0
    ) {
      generateTeaRecipe();
    } else {
      setGeneratedTeaRecipe("");
      setTeaTitle("");
      setTeaDescription("");
    }
  }, [
    teaSelections.teaTypes,
    teaSelections.brewMethods,
    teaSelections.temperature,
    teaSelections.accessories,
    teaRecipes,
  ]);

  const teaTypeOptions = [
    { emoji: "🍃", text: "绿茶", value: "green" },
    { emoji: "🟤", text: "红茶", value: "black" },
    { emoji: "🌸", text: "乌龙茶", value: "oolong" },
    { emoji: "⚪", text: "白茶", value: "white" },
    { emoji: "🟫", text: "普洱茶", value: "puer" },
    { emoji: "🌺", text: "花茶", value: "floral" },
  ];
  const brewMethodOptions = [
    { emoji: "🫖", text: "紫砂壶", value: "clay-pot" },
    { emoji: "🍵", text: "盖碗", value: "gaiwan" },
    { emoji: "🥤", text: "玻璃杯", value: "glass" },
    { emoji: "🫖", text: "茶壶", value: "teapot" },
    { emoji: "🧊", text: "冷泡", value: "cold-brew" },
    { emoji: "⚡", text: "快速冲泡", value: "quick" },
  ];
  const temperatureOptions = [
    { emoji: "🔥", text: "沸水 (100°C)", value: "boiling" },
    { emoji: "🌡️", text: "热水 (85-95°C)", value: "hot" },
    { emoji: "💧", text: "温水 (70-80°C)", value: "warm" },
    { emoji: "🧊", text: "冷水", value: "cold" },
  ];
  const teaAccessoryOptions = [
    { emoji: "🍯", text: "蜂蜜", value: "honey" },
    { emoji: "🍋", text: "柠檬", value: "lemon" },
    { emoji: "🥛", text: "牛奶", value: "milk" },
    { emoji: "🌿", text: "薄荷", value: "mint" },
    { emoji: "🧊", text: "冰块", value: "ice" },
    { emoji: "❌", text: "纯茶", value: "none" },
  ];

  const setTeaTool = (category: keyof TeaSelections, value: string) => {
    setTeaSelections((prev: TeaSelections) => ({
      ...prev,
      [category]: prev[category] === value ? "" : value,
    }));
  };

  const getTeaNameAndDescription = (
    teaTypes: string[],
    brewMethods: string[],
    accessories: string[]
  ) => {
    const teaNames: { [key: string]: { name: string; description: string } } = {
      green: { name: "绿茶", description: "清香淡雅，富含抗氧化物质" },
      black: { name: "红茶", description: "醇厚浓郁，温暖身心" },
      oolong: { name: "乌龙茶", description: "半发酵茶，香气独特" },
      white: { name: "白茶", description: "清淡甘甜，自然纯净" },
      puer: { name: "普洱茶", description: "陈香浓郁，越陈越香" },
      floral: { name: "花茶", description: "花香怡人，舒缓心情" },
    };
    const brewNames: { [key: string]: string } = {
      "clay-pot": "紫砂壶冲泡",
      gaiwan: "盖碗冲泡",
      glass: "玻璃杯冲泡",
      teapot: "茶壶冲泡",
      "cold-brew": "冷泡制作",
      quick: "快速冲泡",
    };
    const primaryTea = teaTypes.length > 0 ? teaTypes[0] : "";
    const primaryBrew = brewMethods.length > 0 ? brewMethods[0] : "";
    const teaInfo = teaNames[primaryTea] || { name: "茶饮", description: "香醇的茶饮" };
    const brewMethod = brewNames[primaryBrew] || "传统冲泡";
    if (accessories.length > 0 && !accessories.includes("none")) {
      const additionDesc = accessories.includes("honey")
        ? "，添加蜂蜜增甜"
        : accessories.includes("lemon")
        ? "，加入柠檬片提味"
        : accessories.includes("milk")
        ? "，搭配牛奶制成奶茶"
        : accessories.includes("mint")
        ? "，加入薄荷叶清香"
        : accessories.includes("ice")
        ? "，加冰制成冰茶"
        : "";
      return {
        name: `${teaInfo.name}（${brewMethod}）`,
        description: `${teaInfo.description}${additionDesc}`,
      };
    }
    return {
      name: `${teaInfo.name}（${brewMethod}）`,
      description: teaInfo.description,
    };
  };

  const temperatureMap: { [key: string]: string } = {
    boiling: "沸水 (100°C)",
    hot: "热水 (85-95°C)",
    warm: "温水 (70-80°C)",
    cold: "冷水",
  };

  const generateTeaRecipe = () => {
    if (!teaSelections.teaTypes || !teaSelections.brewMethods || !teaSelections.temperature || !teaSelections.accessories) {
      return;
    }
    const teaTypeMap: { [key: string]: string } = {
      green: "绿茶",
      black: "红茶",
      oolong: "乌龙茶",
      white: "白茶",
      puer: "普洱茶",
      floral: "花茶",
    };
    const brewMethodMap: { [key: string]: string } = {
      "clay-pot": "紫砂壶",
      gaiwan: "盖碗",
      glass: "玻璃杯",
      teapot: "茶壶",
      "cold-brew": "冷泡",
      quick: "快速冲泡",
    };
    const accessoryMap: { [key: string]: string } = {
      honey: "蜂蜜",
      lemon: "柠檬",
      milk: "牛奶",
      mint: "薄荷",
      ice: "冰块",
      none: "不加",
    };
    const primaryTea = teaTypeMap[teaSelections.teaTypes] || "绿茶";
    const primaryBrew = brewMethodMap[teaSelections.brewMethods] || "玻璃杯";
    const primaryTemp = temperatureMap[teaSelections.temperature] || "沸水 (100°C)";
    const primaryAccessory = accessoryMap[teaSelections.accessories] || "不加";

    // 查找详细配方
    const matchingRecipe = teaRecipes.find(
      (recipe: TeaRecipe) =>
        recipe.tea === primaryTea &&
        recipe.tool === primaryBrew &&
        recipe.addition === primaryAccessory
    );

    // 智能生成配方描述
    let baseDesc = `使用${primaryTea}（建议使用量：3g），使用${primaryBrew}冲泡，水温为${primaryTemp}，时间约为2分钟。`;
    let note = "";
    if (teaSelections.teaTypes === "green" && teaSelections.temperature === "boiling") {
      note = "注意：避免高温以防苦涩。";
    }
    if (primaryAccessory !== "不加") {
      baseDesc += `泡好后加入${primaryAccessory}`;
      if (primaryAccessory === "柠檬") {
        baseDesc += "，适合解腻醒神。";
      } else if (primaryAccessory === "蜂蜜") {
        baseDesc += "，增添甜味。";
      } else if (primaryAccessory === "牛奶") {
        baseDesc += "，可制成奶茶风味。";
      } else if (primaryAccessory === "薄荷") {
        baseDesc += "，清新提神。";
      } else if (primaryAccessory === "冰块") {
        baseDesc += "，适合夏日冷饮。";
      }
    }
    if (note) baseDesc += note;

    if (matchingRecipe) {
      // 替换配方中的水温为用户选择
      let recipeText = matchingRecipe.result;
      recipeText = recipeText.replace(/水温为[^，。\n]+/, `水温为${primaryTemp}`);
      setGeneratedTeaRecipe(recipeText);
      const { name, description } = getTeaNameAndDescription(
        teaSelections.teaTypes ? [teaSelections.teaTypes] : [],
        teaSelections.brewMethods ? [teaSelections.brewMethods] : [],
        teaSelections.accessories ? [teaSelections.accessories] : []
      );
      setTeaTitle(name);
      setTeaDescription(description);
    } else {
      setGeneratedTeaRecipe(baseDesc + "\n未找到详细配方，请尝试其他组合。");
      setTeaTitle("茶饮");
      setTeaDescription("请选择有效的组合");
    }
  };

  const shuffleTeaRecommendations = () => {
    const currentIds = displayedTeaRecommendations.map((rec: TeaRecommendation) => rec.id);
    const availableRecommendations = teaRecommendations.filter(
      (rec: TeaRecommendation) => !currentIds.includes(rec.id)
    );
    if (availableRecommendations.length >= 3) {
      const shuffled = [...availableRecommendations].sort(
        () => 0.5 - Math.random()
      );
      setDisplayedTeaRecommendations(shuffled.slice(0, 3));
    } else {
      const shuffled = [...teaRecommendations].sort(() => 0.5 - Math.random());
      setDisplayedTeaRecommendations(shuffled.slice(0, 3));
    }
    setSelectedTeaRecommendation(null);
  };

  const selectTeaRecommendation = (recommendation: TeaRecommendation) => {
    setSelectedTeaRecommendation(recommendation);
  };

const OptionButton = ({ 
  option, 
  isSelected, 
  onClick,
    colorScheme = "green",
    disabled = false,
}: { 
  option: { emoji: string; text: string; value: string };
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
    </button>
  );
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">泡茶教程</h1>
          <p className="text-xl text-gray-600 mb-6">选择你喜欢的茶饮组合，获取专属配方和详细步骤！</p>
      </div>
        <div className="max-w-4xl mx-auto">
      <Card className="p-8 bg-white/80 backdrop-blur-sm shadow-xl border-0">
        {/* Step 1: Tea Type */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-2xl">1️⃣</span>
                <h2 className="text-2xl font-bold text-gray-800">选择茶叶类型</h2>
            <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">单选</span>
          </div>
              <p className="text-gray-600 mb-4">「茶叶种类」</p>
          <div className="flex flex-wrap gap-3">
            {teaTypeOptions.map((option) => (
              <OptionButton
                key={option.value}
                option={option}
                    isSelected={teaSelections.teaTypes === option.value}
                    onClick={() => setTeaTool("teaTypes", option.value)}
                colorScheme="green"
              />
            ))}
          </div>
        </div>
            {/* Step 2: Brewing Method */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-2xl">2️⃣</span>
                <h2 className="text-2xl font-bold text-gray-800">选择冲泡方式</h2>
            <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">单选</span>
          </div>
              <p className="text-gray-600 mb-4">「冲泡器具」</p>
          <div className="flex flex-wrap gap-3">
                {brewMethodOptions.map((option) => (
              <OptionButton
                key={option.value}
                option={option}
                    isSelected={teaSelections.brewMethods === option.value}
                    onClick={() => setTeaTool("brewMethods", option.value)}
                colorScheme="green"
              />
            ))}
          </div>
        </div>
            {/* Step 3: Water Temperature */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-2xl">3️⃣</span>
                <h2 className="text-2xl font-bold text-gray-800">选择水温</h2>
                <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">单选</span>
              </div>
              <p className="text-gray-600 mb-4">「冲泡温度」</p>
              <div className="flex flex-wrap gap-3">
                {temperatureOptions.map((option) => (
                  <OptionButton
                    key={option.value}
                    option={option}
                    isSelected={teaSelections.temperature === option.value}
                    onClick={() => setTeaTool("temperature", option.value)}
                    colorScheme="green"
                  />
                ))}
              </div>
            </div>
            {/* Step 4: Accessories */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl">4️⃣</span>
                <h2 className="text-2xl font-bold text-gray-800">添加配料</h2>
                <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">单选</span>
          </div>
              <p className="text-gray-600 mb-4">「茶饮搭配」</p>
          <div className="flex flex-wrap gap-3">
                {teaAccessoryOptions.map((option) => (
              <OptionButton
                key={option.value}
                option={option}
                    isSelected={teaSelections.accessories === option.value}
                    onClick={() => setTeaTool("accessories", option.value)}
                colorScheme="green"
              />
            ))}
          </div>
        </div>
            {/* Generated Tea Recipe Display */}
            {generatedTeaRecipe && (
          <div className="mb-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200">
            <div className="text-center mb-4">
              <h3 className="text-xl font-bold text-gray-800 flex items-center justify-center gap-2">
                🎯 你的专属茶饮配方
              </h3>
              <p className="text-sm text-gray-600 mt-2">根据你的偏好生成的个性化配方</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="mb-4">
                    <h4 className="text-lg font-semibold text-green-700 mb-2">{teaTitle}</h4>
                    <p className="text-gray-600 text-sm mb-3">{teaDescription}</p>
              </div>
              <div className="mb-4">
                <h5 className="font-semibold text-gray-800 mb-2">🫖 制作方法</h5>
                    <p className="text-gray-700 text-sm leading-relaxed">{generatedTeaRecipe}</p>
                  </div>
                  <div className="flex justify-center">
                    <Button
                      onClick={() => window.open("https://www.bilibili.com/video/BV1yV411d7Qp/", "_blank")}
                      className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 py-2 rounded-full text-sm font-medium shadow-md hover:shadow-lg transition-all duration-200"
                    >
                      ▶ 观看详细教程视频 🔗
                    </Button>
              </div>
            </div>
          </div>
        )}
            {/* Enhanced Tea Recommendations Section */}
        <div className="mt-16 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200">
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold text-gray-800 flex items-center justify-center gap-2">
              🎲 选择困难？抽卡直接做！
            </h3>
            <p className="text-sm text-gray-600 mt-2">发现更多茶饮制作方法</p>
          </div>
          <div className="grid md:grid-cols-3 gap-4 text-sm mb-6">
                {displayedTeaRecommendations.map((recommendation: TeaRecommendation) => (
              <div 
                key={recommendation.id}
                    onClick={() => selectTeaRecommendation(recommendation)}
                className="text-center p-4 bg-white rounded-lg shadow-sm cursor-pointer hover:shadow-md transition-all duration-200 hover:scale-105"
              >
                <div className="text-2xl mb-2">{recommendation.emoji}</div>
                <div className="font-semibold text-gray-800 mb-2">{recommendation.name}</div>
                <div className="text-gray-600 mb-2">{recommendation.subtitle}</div>
                <div className="text-xs text-green-600">{recommendation.difficulty}</div>
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
                  onClick={shuffleTeaRecommendations}
              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-6 py-2 rounded-full text-sm font-medium shadow-md hover:shadow-lg transition-all duration-200"
            >
                  <RefreshCw className="w-4 h-4 mr-2" />
              换一换
            </Button>
          </div>
              {/* Detailed Tea Recipe Display */}
              {selectedTeaRecommendation && (
                <div className="mt-8 p-6 bg-white rounded-xl shadow-lg border border-gray-200">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-3">
                      <span className="text-3xl">{selectedTeaRecommendation.emoji}</span>
                <div>
                        <h4 className="text-xl font-bold text-gray-800">{selectedTeaRecommendation.name}</h4>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span>难度: {selectedTeaRecommendation.difficulty}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                            制作时间: 10-15分钟
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                            1人份
                    </span>
                  </div>
                </div>
              </div>
                    {selectedTeaRecommendation.warning && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center gap-2 text-red-700 font-semibold mb-2">
                    <AlertTriangle className="w-5 h-5" />
                          {selectedTeaRecommendation.warning}
                  </div>
                        {selectedTeaRecommendation.safety && (
                    <ul className="text-sm text-red-600 space-y-1">
                            {selectedTeaRecommendation.safety.map((item: string, index: number) => (
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
                    🛠️ 所需工具
                  </h5>
                  <ul className="text-sm text-gray-600 space-y-1">
                          {selectedTeaRecommendation.tools.map((tool: string, index: number) => (
                      <li key={index} className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                        {tool}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    🥄 材料清单
                  </h5>
                  <ul className="text-sm text-gray-600 space-y-2">
                          {selectedTeaRecommendation.ingredients.map((ingredient: {name: string; amount: string; note: string}, index: number) => (
                      <li key={index} className="flex justify-between items-start">
                        <span className="font-medium">{ingredient.name}</span>
                        <div className="text-right">
                          <div className="font-semibold text-green-600">{ingredient.amount}</div>
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
                📋 制作步骤
              </h5>
              <div className="space-y-4">
                      {selectedTeaRecommendation.steps.map((step: any, index: number) => (
                  <div key={index} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
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
                        <div className="text-xs text-green-600 bg-green-50 p-2 rounded border border-green-200">
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
            </div>
      </Card>
        </div>
      </div>
    </div>
  );
}