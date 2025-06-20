'use client';

import { useState, useEffect } from 'react';
import { Coffee, ChefHat, Utensils, Dumbbell , Languages, Sprout, RefreshCw, Clock, Users, AlertTriangle, Github, Globe, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface CoffeeSelections {
  bean: string;
  tool: string;
  additions: string[];
}

interface TeaSelections {
  teaTypes: string;      // 原来是 string[]
  brewMethods: string;   // 原来是 string[]
  temperature: string;   // 原来是 string[]
  accessories: string;   // 原来是 string[]
}

interface ExerciseSelections {
  bodyParts: string[];
  equipment: string[];
  intensity: string[];
  duration: string[];
}

interface CoffeeRecipe {
  bean: string;
  tool: string;
  addition: string;
  result: string;
}

interface TeaRecipe {
  tea: string;
  tool: string;
  addition: string;
  result: string;
}

interface CoffeeRecommendation {
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
    grind_size?: string;
  }>;
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

interface SportRecommendation {
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

export default function Home() {
  const [activeTab, setActiveTab] = useState(0);
  const [coffeeRecipes, setCoffeeRecipes] = useState<CoffeeRecipe[]>([]);
  const [teaRecipes, setTeaRecipes] = useState<TeaRecipe[]>([]);
  const [generatedRecipe, setGeneratedRecipe] = useState<string>('');
  const [coffeeTitle, setCoffeeTitle] = useState<string>('');
  const [coffeeDescription, setCoffeeDescription] = useState<string>('');
  const [generatedTeaRecipe, setGeneratedTeaRecipe] = useState<string>('');
  const [teaTitle, setTeaTitle] = useState<string>('');
  const [teaDescription, setTeaDescription] = useState<string>('');
  
  // Coffee recommendations state
  const [coffeeRecommendations, setCoffeeRecommendations] = useState<CoffeeRecommendation[]>([]);
  const [displayedRecommendations, setDisplayedRecommendations] = useState<CoffeeRecommendation[]>([]);
  const [selectedRecommendation, setSelectedRecommendation] = useState<CoffeeRecommendation | null>(null);
  
  // Tea recommendations state
  const [teaRecommendations, setTeaRecommendations] = useState<TeaRecommendation[]>([]);
  const [displayedTeaRecommendations, setDisplayedTeaRecommendations] = useState<TeaRecommendation[]>([]);
  const [selectedTeaRecommendation, setSelectedTeaRecommendation] = useState<TeaRecommendation | null>(null);
  
  // Sport recommendations state
  const [sportRecommendations, setSportRecommendations] = useState<SportRecommendation[]>([]);
  const [displayedSportRecommendations, setDisplayedSportRecommendations] = useState<SportRecommendation[]>([]);
  const [selectedSportRecommendation, setSelectedSportRecommendation] = useState<SportRecommendation | null>(null);
  
  // Coffee module state - simplified
  const [coffeeSelections, setCoffeeSelections] = useState<CoffeeSelections>({
    bean: '',
    tool: '',
    additions: []
  });

  // Tea module state
 const [teaSelections, setTeaSelections] = useState<TeaSelections>({
  teaTypes: "",       // 从 [] 改为 ""
  brewMethods: "",    // 从 [] 改为 "" 
  temperature: "",    // 从 [] 改为 ""
  accessories: ""     // 从 [] 改为 ""
});

  // Exercise module state
  const [exerciseSelections, setExerciseSelections] = useState<ExerciseSelections>({
    bodyParts: [],
    equipment: [],
    intensity: [],
    duration: []
  });

  // Get current date for version info
  const getCurrentDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1; // getMonth() returns 0-11
    return `${year}年${month}月`;
  };

  // Load coffee recipes from JSON
  useEffect(() => {
    fetch('/data/coffee_recipes_detailed.json')
      .then(response => response.json())
      .then(data => setCoffeeRecipes(data))
      .catch(error => console.error('Error loading coffee recipes:', error));
  }, []);

  // Load tea recipes from JSON
  useEffect(() => {
    fetch('/data/tea_recipes_detailed.json')
      .then(response => response.json())
      .then(data => setTeaRecipes(data))
      .catch(error => console.error('Error loading tea recipes:', error));
  }, []);

  // Load coffee recommendations
  useEffect(() => {
    fetch('/data/coffee_recommendations.json')
      .then(response => response.json())
      .then(data => {
        setCoffeeRecommendations(data.coffee_recipes);
        // Initially display 3 random recommendations
        const shuffled = [...data.coffee_recipes].sort(() => 0.5 - Math.random());
        setDisplayedRecommendations(shuffled.slice(0, 3));
      })
      .catch(error => console.error('Error loading coffee recommendations:', error));
  }, []);

  // Load tea recommendations
  useEffect(() => {
    fetch('/data/tea_recommendations.json')
      .then(response => response.json())
      .then(data => {
        setTeaRecommendations(data.tea_recipes);
        // Initially display 3 random recommendations
        const shuffled = [...data.tea_recipes].sort(() => 0.5 - Math.random());
        setDisplayedTeaRecommendations(shuffled.slice(0, 3));
      })
      .catch(error => console.error('Error loading tea recommendations:', error));
  }, []);

  // Load sport recommendations
  useEffect(() => {
    fetch('/data/sport_recommendations.json')
      .then(response => response.json())
      .then(data => {
        setSportRecommendations(data.sport_recipes);
        // Initially display 3 random recommendations
        const shuffled = [...data.sport_recipes].sort(() => 0.5 - Math.random());
        setDisplayedSportRecommendations(shuffled.slice(0, 3));
      })
      .catch(error => console.error('Error loading sport recommendations:', error));
  }, []);

  // Auto-generate recipe when selections are complete
  useEffect(() => {
    if (coffeeSelections.bean && coffeeSelections.tool && coffeeRecipes.length > 0) {
      generateCoffeeRecipe();
    } else {
      setGeneratedRecipe('');
      setCoffeeTitle('');
      setCoffeeDescription('');
    }
  }, [coffeeSelections.bean, coffeeSelections.tool, coffeeSelections.additions, coffeeRecipes]);

  // Auto-generate tea recipe when selections are complete
  useEffect(() => {
    if (teaSelections.teaTypes.length > 0 && teaSelections.brewMethods.length > 0 && teaRecipes.length > 0) {
      generateTeaRecipe();
    } else {
      setGeneratedTeaRecipe('');
      setTeaTitle('');
      setTeaDescription('');
    }
  }, [teaSelections.teaTypes, teaSelections.brewMethods, teaSelections.temperature, teaSelections.accessories, teaRecipes]);

  const tabs = [
    { id: 0, name: '咖啡冲煮', icon: Coffee, color: 'amber' },
    { id: 1, name: '泡茶教程', icon: Sprout, color: 'green' },
    { id: 2, name: '运动健身', icon: Dumbbell, color: 'blue' }
  ];

  const setCoffeeBean = (bean: string) => {
    setCoffeeSelections(prev => ({ ...prev, bean }));
  };

  const setCoffeeTool = (tool: string) => {
    setCoffeeSelections(prev => ({ ...prev, tool }));
  };

  const toggleCoffeeAddition = (addition: string) => {
    setCoffeeSelections(prev => ({
      ...prev,
      additions: prev.additions.includes(addition)
        ? prev.additions.filter(item => item !== addition)
        : [...prev.additions, addition]
    }));
  };

const setTeaTool = (category: keyof TeaSelections, value: string) => {
  setTeaSelections(prev => ({
    ...prev,
    [category]: prev[category] === value ? "" : value  
    // 如果点击的是已选中的值，则清空，否则设置新值
  }));
};
  
  const toggleTeaSelection = (category: keyof TeaSelections, value: string) => {
    setTeaSelections(prev => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter(item => item !== value)
        : [...prev[category], value]
    }));
  };

  const toggleExerciseSelection = (category: keyof ExerciseSelections, value: string) => {
    setExerciseSelections(prev => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter(item => item !== value)
        : [...prev[category], value]
    }));
  };

  const getCoffeeNameAndDescription = (tool: string, bean: string, additions: string[]) => {
    const toolNames: { [key: string]: { name: string; description: string } } = {
      '法压壶': {
        name: '法式咖啡',
        description: '浓郁醇厚的法式压滤咖啡，口感饱满层次丰富'
      },
      '摩卡壶': {
        name: '摩卡咖啡',
        description: '意式经典摩卡壶制作，浓缩香醇的传统风味'
      },
      '手冲壶+滤杯': {
        name: '手冲咖啡',
        description: '精品手冲咖啡，突出豆子原有的风味特色'
      },
      '冷萃瓶': {
        name: '冷萃咖啡',
        description: '低温长时间萃取，口感顺滑酸度柔和'
      },
      '咖啡胶囊机': {
        name: '胶囊咖啡',
        description: '便捷快速的胶囊咖啡，稳定一致的口感体验'
      },
      '意式浓缩机': {
        name: '意式浓缩',
        description: '经典意式浓缩咖啡，浓郁香醇的咖啡精华'
      },
      '冰滴壶': {
        name: '冰滴咖啡',
        description: '冰水慢滴萃取，清香甘甜的夏日特饮'
      },
      '爱乐压': {
        name: '爱乐压咖啡',
        description: '创新压滤萃取，干净明亮的咖啡风味'
      }
    };

    const beanDescriptions: { [key: string]: string } = {
      '浅烘焙豆': '风味清爽，果酸明显',
      '中烘焙豆': '酸苦平衡，适合多种冲煮',
      '深烘焙豆': '口感厚重偏苦，适合浓缩',
      '单品豆': '具体产地风味各异',
      '商业拼配豆': '适口性强，日常首选'
    };

    const toolInfo = toolNames[tool] || { name: '咖啡', description: '美味的咖啡饮品' };
    const beanDesc = beanDescriptions[bean] || '';
    
    // 如果有添加物，调整描述
    if (additions.length > 0 && !additions.includes('不加')) {
      const additionDesc = additions.includes('牛奶/奶泡') ? '，搭配丝滑奶泡' :
                          additions.includes('椰奶/燕麦奶') ? '，使用植物奶制作健康版本' :
                          additions.includes('蜂蜜/糖浆') ? '，添加天然甜味' :
                          additions.includes('冰淇淋') ? '，制作成Affogato风格' :
                          additions.includes('可可粉/肉桂粉') ? '，撒上香料粉增加风味' : '';
      
      return {
        name: toolInfo.name,
        description: `${toolInfo.description}（${beanDesc}）${additionDesc}`
      };
    }

    return {
      name: toolInfo.name,
      description: `${toolInfo.description}（${beanDesc}）`
    };
  };

  const getTeaNameAndDescription = (teaTypes: string[], brewMethods: string[], accessories: string[]) => {
    const teaNames: { [key: string]: { name: string; description: string } } = {
      'green': { name: '绿茶', description: '清香淡雅，富含抗氧化物质' },
      'black': { name: '红茶', description: '醇厚浓郁，温暖身心' },
      'oolong': { name: '乌龙茶', description: '半发酵茶，香气独特' },
      'white': { name: '白茶', description: '清淡甘甜，自然纯净' },
      'puer': { name: '普洱茶', description: '陈香浓郁，越陈越香' },
      'floral': { name: '花茶', description: '花香怡人，舒缓心情' }
    };

    const brewNames: { [key: string]: string } = {
      'clay-pot': '紫砂壶冲泡',
      'gaiwan': '盖碗冲泡',
      'glass': '玻璃杯冲泡',
      'teapot': '茶壶冲泡',
      'cold-brew': '冷泡制作',
      'quick': '快速冲泡'
    };

    const primaryTea = teaTypes[0];
    const primaryBrew = brewMethods[0];
    
    const teaInfo = teaNames[primaryTea] || { name: '茶饮', description: '香醇的茶饮' };
    const brewMethod = brewNames[primaryBrew] || '传统冲泡';
    
    // 如果有添加物，调整描述
    if (accessories.length > 0 && !accessories.includes('none')) {
      const additionDesc = accessories.includes('honey') ? '，添加蜂蜜增甜' :
                          accessories.includes('lemon') ? '，加入柠檬片提味' :
                          accessories.includes('milk') ? '，搭配牛奶制成奶茶' :
                          accessories.includes('mint') ? '，加入薄荷叶清香' :
                          accessories.includes('ice') ? '，加冰制成冰茶' : '';
      
      return {
        name: `${teaInfo.name}（${brewMethod}）`,
        description: `${teaInfo.description}${additionDesc}`
      };
    }

    return {
      name: `${teaInfo.name}（${brewMethod}）`,
      description: teaInfo.description
    };
  };

  const generateCoffeeRecipe = () => {
    if (!coffeeSelections.bean || !coffeeSelections.tool) {
      return;
    }

    // If no additions selected, use "不加"
    const additionsToCheck = coffeeSelections.additions.length > 0 ? coffeeSelections.additions : ['不加'];
    
    // Find matching recipe for the first addition (or "不加")
    const matchingRecipe = coffeeRecipes.find(recipe => 
      recipe.bean === coffeeSelections.bean && 
      recipe.tool === coffeeSelections.tool && 
      recipe.addition === additionsToCheck[0]
    );

    if (matchingRecipe) {
      setGeneratedRecipe(matchingRecipe.result);
      
      // Get coffee name and description based on selections
      const { name, description } = getCoffeeNameAndDescription(
        coffeeSelections.tool, 
        coffeeSelections.bean, 
        coffeeSelections.additions
      );
      setCoffeeTitle(name);
      setCoffeeDescription(description);
    } else {
      setGeneratedRecipe('未找到匹配的配方，请尝试其他组合。');
      setCoffeeTitle('咖啡');
      setCoffeeDescription('请选择有效的组合');
    }
  };

  const generateTeaRecipe = () => {
    if (teaSelections.teaTypes.length === 0 || teaSelections.brewMethods.length === 0) {
      return;
    }

    // Map tea types to recipe format
    const teaTypeMap: { [key: string]: string } = {
      'green': '绿茶',
      'black': '红茶',
      'oolong': '乌龙茶',
      'white': '白茶',
      'puer': '普洱茶',
      'floral': '花茶'
    };

    const brewMethodMap: { [key: string]: string } = {
      'clay-pot': '紫砂壶',
      'gaiwan': '盖碗',
      'glass': '玻璃杯',
      'teapot': '茶壶',
      'cold-brew': '冷泡',
      'quick': '快速冲泡'
    };

    const primaryTea = teaTypeMap[teaSelections.teaTypes[0]] || '绿茶';
    const primaryBrew = brewMethodMap[teaSelections.brewMethods[0]] || '玻璃杯';
    
    // If no accessories selected, use "不加"
    const accessoriesToCheck = teaSelections.accessories.length > 0 && !teaSelections.accessories.includes('none') 
      ? teaSelections.accessories : ['不加'];
    
    // Map accessories to recipe format
    const accessoryMap: { [key: string]: string } = {
      'honey': '蜂蜜',
      'lemon': '柠檬',
      'milk': '牛奶',
      'mint': '薄荷',
      'ice': '冰块',
      'none': '不加'
    };

    const primaryAccessory = accessoryMap[accessoriesToCheck[0]] || '不加';
    
    // Find matching recipe
    const matchingRecipe = teaRecipes.find(recipe => 
      recipe.tea === primaryTea && 
      recipe.tool === primaryBrew && 
      recipe.addition === primaryAccessory
    );

    if (matchingRecipe) {
      setGeneratedTeaRecipe(matchingRecipe.result);
      
      // Get tea name and description based on selections
      const { name, description } = getTeaNameAndDescription(
        teaSelections.teaTypes, 
        teaSelections.brewMethods, 
        teaSelections.accessories
      );
      setTeaTitle(name);
      setTeaDescription(description);
    } else {
      setGeneratedTeaRecipe('未找到匹配的配方，请尝试其他组合。');
      setTeaTitle('茶饮');
      setTeaDescription('请选择有效的组合');
    }
  };

  const generateExerciseRoutine = () => {
    window.open('https://www.bilibili.com/video/BV1GJ411x7h7/', '_blank');
  };

  const shuffleRecommendations = () => {
    // Get current displayed IDs
    const currentIds = displayedRecommendations.map(rec => rec.id);
    
    // Filter out currently displayed recommendations
    const availableRecommendations = coffeeRecommendations.filter(rec => !currentIds.includes(rec.id));
    
    // If we have enough different recommendations, use them
    if (availableRecommendations.length >= 3) {
      const shuffled = [...availableRecommendations].sort(() => 0.5 - Math.random());
      setDisplayedRecommendations(shuffled.slice(0, 3));
    } else {
      // If not enough different ones, shuffle all and take 3
      const shuffled = [...coffeeRecommendations].sort(() => 0.5 - Math.random());
      setDisplayedRecommendations(shuffled.slice(0, 3));
    }
    
    setSelectedRecommendation(null); // Clear selected recommendation
  };

  const shuffleTeaRecommendations = () => {
    // Get current displayed IDs
    const currentIds = displayedTeaRecommendations.map(rec => rec.id);
    
    // Filter out currently displayed recommendations
    const availableRecommendations = teaRecommendations.filter(rec => !currentIds.includes(rec.id));
    
    // If we have enough different recommendations, use them
    if (availableRecommendations.length >= 3) {
      const shuffled = [...availableRecommendations].sort(() => 0.5 - Math.random());
      setDisplayedTeaRecommendations(shuffled.slice(0, 3));
    } else {
      // If not enough different ones, shuffle all and take 3
      const shuffled = [...teaRecommendations].sort(() => 0.5 - Math.random());
      setDisplayedTeaRecommendations(shuffled.slice(0, 3));
    }
    
    setSelectedTeaRecommendation(null); // Clear selected recommendation
  };

  const shuffleSportRecommendations = () => {
    // Get current displayed IDs
    const currentIds = displayedSportRecommendations.map(rec => rec.id);
    
    // Filter out currently displayed recommendations
    const availableRecommendations = sportRecommendations.filter(rec => !currentIds.includes(rec.id));
    
    // If we have enough different recommendations, use them
    if (availableRecommendations.length >= 3) {
      const shuffled = [...availableRecommendations].sort(() => 0.5 - Math.random());
      setDisplayedSportRecommendations(shuffled.slice(0, 3));
    } else {
      // If not enough different ones, shuffle all and take 3
      const shuffled = [...sportRecommendations].sort(() => 0.5 - Math.random());
      setDisplayedSportRecommendations(shuffled.slice(0, 3));
    }
    
    setSelectedSportRecommendation(null); // Clear selected recommendation
  };

  const selectRecommendation = (recommendation: CoffeeRecommendation) => {
    setSelectedRecommendation(recommendation);
  };

  const selectTeaRecommendation = (recommendation: TeaRecommendation) => {
    setSelectedTeaRecommendation(recommendation);
  };

  const selectSportRecommendation = (recommendation: SportRecommendation) => {
    setSelectedSportRecommendation(recommendation);
  };

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

  // Coffee options - simplified
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

  // Tea options
  const teaTypeOptions = [
    { emoji: '🍃', text: '绿茶', value: 'green' },
    { emoji: '🟤', text: '红茶', value: 'black' },
    { emoji: '🌸', text: '乌龙茶', value: 'oolong' },
    { emoji: '⚪', text: '白茶', value: 'white' },
    { emoji: '🟫', text: '普洱茶', value: 'puer' },
    { emoji: '🌺', text: '花茶', value: 'floral' }
  ];

  const brewMethodOptions = [
    { emoji: '🫖', text: '紫砂壶', value: 'clay-pot' },
    { emoji: '🍵', text: '盖碗', value: 'gaiwan' },
    { emoji: '🥤', text: '玻璃杯', value: 'glass' },
    { emoji: '🫖', text: '茶壶', value: 'teapot' },
    { emoji: '🧊', text: '冷泡', value: 'cold-brew' },
    { emoji: '⚡', text: '快速冲泡', value: 'quick' }
  ];

  const temperatureOptions = [
    { emoji: '🔥', text: '沸水 (100°C)', value: 'boiling' },
    { emoji: '🌡️', text: '热水 (85-95°C)', value: 'hot' },
    { emoji: '💧', text: '温水 (70-80°C)', value: 'warm' },
    { emoji: '🧊', text: '冷水', value: 'cold' }
  ];

  const teaAccessoryOptions = [
    { emoji: '🍯', text: '蜂蜜', value: 'honey' },
    { emoji: '🍋', text: '柠檬', value: 'lemon' },
    { emoji: '🥛', text: '牛奶', value: 'milk' },
    { emoji: '🌿', text: '薄荷', value: 'mint' },
    { emoji: '🧊', text: '冰块', value: 'ice' },
    { emoji: '❌', text: '纯茶', value: 'none' }
  ];

  // Exercise options
  const bodyPartOptions = [
    { emoji: '💪', text: '手臂', value: 'arms' },
    { emoji: '🦵', text: '腿部', value: 'legs' },
    { emoji: '🫀', text: '胸部', value: 'chest' },
    { emoji: '🔙', text: '背部', value: 'back' },
    { emoji: '🤸', text: '核心', value: 'core' },
    { emoji: '🏃', text: '全身', value: 'full-body' }
  ];

  const exerciseEquipmentOptions = [
    { emoji: '🏋️', text: '哑铃', value: 'dumbbells' },
    { emoji: '🎯', text: '瑜伽垫', value: 'yoga-mat' },
    { emoji: '🏃', text: '跑步机', value: 'treadmill' },
    { emoji: '🚴', text: '健身车', value: 'bike' },
    { emoji: '🤸', text: '弹力带', value: 'resistance-band' },
    { emoji: '🚫', text: '徒手训练', value: 'bodyweight' }
  ];

  const intensityOptions = [
    { emoji: '😌', text: '轻松', value: 'easy' },
    { emoji: '😊', text: '适中', value: 'moderate' },
    { emoji: '😤', text: '高强度', value: 'intense' },
    { emoji: '🔥', text: '极限挑战', value: 'extreme' }
  ];

  const durationOptions = [
    { emoji: '⏱️', text: '15分钟', value: '15min' },
    { emoji: '⏰', text: '30分钟', value: '30min' },
    { emoji: '🕐', text: '45分钟', value: '45min' },
    { emoji: '⏳', text: '1小时+', value: '60min+' }
  ];

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
              colorScheme="amber"
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
            换一换
          </Button>
        </div>

        {/* Detailed Recipe Display */}
        {selectedRecommendation && (
          <div className="mt-8 p-6 bg-white rounded-xl shadow-lg border border-gray-200">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">{selectedRecommendation.emoji}</span>
                <div>
                  <h4 className="text-xl font-bold text-gray-800">{selectedRecommendation.name}</h4>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>难度: {selectedRecommendation.difficulty}</span>
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

              {selectedRecommendation.warning && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center gap-2 text-red-700 font-semibold mb-2">
                    <AlertTriangle className="w-5 h-5" />
                    {selectedRecommendation.warning}
                  </div>
                  {selectedRecommendation.safety && (
                    <ul className="text-sm text-red-600 space-y-1">
                      {selectedRecommendation.safety.map((item, index) => (
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
                    {selectedRecommendation.tools.map((tool, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-amber-400 rounded-full"></span>
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
                    {selectedRecommendation.ingredients.map((ingredient, index) => (
                      <li key={index} className="flex justify-between items-start">
                        <span className="font-medium">{ingredient.name}</span>
                        <div className="text-right">
                          <div className="font-semibold text-amber-600">{ingredient.amount}</div>
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
                {selectedRecommendation.steps.map((step, index) => (
                  <div key={index} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="flex-shrink-0 w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
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
                      
                      {step.abnormal && (
                        <div className="text-xs text-orange-600 bg-orange-50 p-2 rounded border border-orange-200 mb-2">
                          🔧 异常处理: {step.abnormal}
                        </div>
                      )}
                      
                      {step.sound_clue && (
                        <div className="text-xs text-purple-600 bg-purple-50 p-2 rounded border border-purple-200 mb-2">
                          🔊 声音提示: {step.sound_clue}
                        </div>
                      )}
                      
                      {step.pro_tip && (
                        <div className="text-xs text-amber-600 bg-amber-50 p-2 rounded border border-amber-200">
                          💡 专业技巧: {step.pro_tip}
                        </div>
                      )}
                      
                      {step.time_control && (
                        <div className="text-xs text-indigo-600 bg-indigo-50 p-2 rounded border border-indigo-200">
                          ⏱️ 时间控制: {step.time_control}
                        </div>
                      )}
                      
                      {step.temp_target && (
                        <div className="text-xs text-red-600 bg-red-50 p-2 rounded border border-red-200">
                          🌡️ 温度目标: {step.temp_target}
                        </div>
                      )}
                      
                      {step.drink_tip && (
                        <div className="text-xs text-green-600 bg-green-50 p-2 rounded border border-green-200">
                          🥤 饮用建议: {step.drink_tip}
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
  );

  const renderTeaModule = () => (
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
            
               onClick={() => setTeaTool('teaTypes', option.value)}
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
              isSelected={teaSelections.brewMethods === option.value }
              onClick={() => setTeaTool('brewMethods', option.value)}
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
              isSelected={teaSelections.temperature=== option.value}
              onClick={() => setTeaTool('temperature', option.value)}
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
              isSelected={teaSelections.accessories=== option.value}
              
               onClick={() => setTeaTool('accessories', option.value)}
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
                onClick={() => window.open('https://www.bilibili.com/video/BV1yV411d7Qp/', '_blank')}
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
          {displayedTeaRecommendations.map((recommendation) => (
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
                      {selectedTeaRecommendation.safety.map((item, index) => (
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
                    {selectedTeaRecommendation.tools.map((tool, index) => (
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
                    {selectedTeaRecommendation.ingredients.map((ingredient, index) => (
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
                {selectedTeaRecommendation.steps.map((step, index) => (
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

      {/* Bonus Section */}
      <div className="mt-16 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200">
        <div className="text-center mb-4">
          <h3 className="text-xl font-bold text-gray-800 flex items-center justify-center gap-2">
            🌿 茶文化小贴士
          </h3>
        </div>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div className="text-center p-4 bg-white rounded-lg shadow-sm">
            <div className="font-semibold text-gray-800 mb-2">绿茶最佳时间</div>
            <div className="text-gray-600">上午10点，下午3点</div>
          </div>
          <div className="text-center p-4 bg-white rounded-lg shadow-sm">
            <div className="font-semibold text-gray-800 mb-2">红茶搭配</div>
            <div className="text-gray-600">配点心，加牛奶</div>
          </div>
          <div className="text-center p-4 bg-white rounded-lg shadow-sm">
            <div className="font-semibold text-gray-800 mb-2">普洱养生</div>
            <div className="text-gray-600">饭后一小时饮用</div>
          </div>
        </div>
      </div>
    </Card>
  );

  const renderExerciseModule = () => (
    <Card className="p-8 bg-white/80 backdrop-blur-sm shadow-xl border-0">
      {/* Step 1: Body Parts */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-2xl">1️⃣</span>
          <h2 className="text-2xl font-bold text-gray-800">选择锻炼部位</h2>
          <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">可多选</span>
        </div>
        <p className="text-gray-600 mb-4">「目标肌群」</p>
        <div className="flex flex-wrap gap-3">
          {bodyPartOptions.map((option) => (
            <OptionButton
              key={option.value}
              option={option}
              isSelected={exerciseSelections.bodyParts.includes(option.value)}
              onClick={() => toggleExerciseSelection('bodyParts', option.value)}
              colorScheme="blue"
            />
          ))}
        </div>
      </div>

      {/* Step 2: Equipment */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-2xl">2️⃣</span>
          <h2 className="text-2xl font-bold text-gray-800">选择运动器材</h2>
        </div>
        <p className="text-gray-600 mb-4">「可用设备」</p>
        <div className="flex flex-wrap gap-3">
          {exerciseEquipmentOptions.map((option) => (
            <OptionButton
              key={option.value}
              option={option}
              isSelected={exerciseSelections.equipment.includes(option.value)}
              onClick={() => toggleExerciseSelection('equipment', option.value)}
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
        </div>
        <p className="text-gray-600 mb-4">「训练强度」</p>
        <div className="flex flex-wrap gap-3">
          {intensityOptions.map((option) => (
            <OptionButton
              key={option.value}
              option={option}
              isSelected={exerciseSelections.intensity.includes(option.value)}
              onClick={() => toggleExerciseSelection('intensity', option.value)}
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
        </div>
        <p className="text-gray-600 mb-4">「训练时间」</p>
        <div className="flex flex-wrap gap-3">
          {durationOptions.map((option) => (
            <OptionButton
              key={option.value}
              option={option}
              isSelected={exerciseSelections.duration.includes(option.value)}
              onClick={() => toggleExerciseSelection('duration', option.value)}
              colorScheme="blue"
            />
          ))}
        </div>
      </div>

      {/* Enhanced Sport Recommendations Section */}
      <div className="mt-16 p-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl border border-blue-200">
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold text-gray-800 flex items-center justify-center gap-2">
            🎲 选择困难？抽卡直接练！
          </h3>
          <p className="text-sm text-gray-600 mt-2">发现更多运动训练方法</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-4 text-sm mb-6">
          {displayedSportRecommendations.map((recommendation) => (
            <div 
              key={recommendation.id}
              onClick={() => selectSportRecommendation(recommendation)}
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
            onClick={shuffleSportRecommendations}
            className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-6 py-2 rounded-full text-sm font-medium shadow-md hover:shadow-lg transition-all duration-200"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            换一换
          </Button>
        </div>

        {/* Detailed Sport Recipe Display */}
        {selectedSportRecommendation && (
          <div className="mt-8 p-6 bg-white rounded-xl shadow-lg border border-gray-200">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">{selectedSportRecommendation.emoji}</span>
                <div>
                  <h4 className="text-xl font-bold text-gray-800">{selectedSportRecommendation.name}</h4>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>难度: {selectedSportRecommendation.difficulty}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      训练时间: 5-20分钟
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      1人份
                    </span>
                  </div>
                </div>
              </div>

              {selectedSportRecommendation.warning && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center gap-2 text-red-700 font-semibold mb-2">
                    <AlertTriangle className="w-5 h-5" />
                    {selectedSportRecommendation.warning}
                  </div>
                  {selectedSportRecommendation.safety && (
                    <ul className="text-sm text-red-600 space-y-1">
                      {selectedSportRecommendation.safety.map((item, index) => (
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
                    {selectedSportRecommendation.tools.map((tool, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                        {tool}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h5 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    📋 准备清单
                  </h5>
                  <ul className="text-sm text-gray-600 space-y-2">
                    {selectedSportRecommendation.ingredients.map((ingredient, index) => (
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
                {selectedSportRecommendation.steps.map((step, index) => (
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
                      
                      {step.purpose && (
                        <div className="text-xs text-purple-600 bg-purple-50 p-2 rounded border border-purple-200">
                          🎯 目的: {step.purpose}
                        </div>
                      )}
                      
                      {step.timing && (
                        <div className="text-xs text-indigo-600 bg-indigo-50 p-2 rounded border border-indigo-200">
                          ⏱️ 时间控制: {step.timing}
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

      {/* Step 5: Generate Routine */}
      <div className="text-center mt-16">
        <div className="flex items-center justify-center gap-3 mb-6">
          <span className="text-2xl">5️⃣</span>
          <h2 className="text-2xl font-bold text-gray-800">生成训练计划！</h2>
          <span className="text-2xl">💪</span>
        </div>
        <Button
          onClick={generateExerciseRoutine}
          className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
        >
          🏋️ 查看训练视频
        </Button>
      </div>

      {/* Bonus Section */}
      <div className="mt-16 p-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl border border-blue-200">
        <div className="text-center mb-4">
          <h3 className="text-xl font-bold text-gray-800 flex items-center justify-center gap-2">
            💡 健身小贴士
          </h3>
        </div>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div className="text-center p-4 bg-white rounded-lg shadow-sm">
            <div className="font-semibold text-gray-800 mb-2">运动前热身</div>
            <div className="text-gray-600">5-10分钟动态拉伸</div>
          </div>
          <div className="text-center p-4 bg-white rounded-lg shadow-sm">
            <div className="font-semibold text-gray-800 mb-2">运动后放松</div>
            <div className="text-gray-600">静态拉伸15分钟</div>
          </div>
          <div className="text-center p-4 bg-white rounded-lg shadow-sm">
            <div className="font-semibold text-gray-800 mb-2">补充水分</div>
            <div className="text-gray-600">运动中少量多次</div>
          </div>
        </div>
      </div>
    </Card>
  );

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
              当前版本 v1.0.0（{getCurrentDate()}）
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
                    <div className="text-xs text-gray-600 mb-2 text-center whitespace-nowrap">扫码关注公众号</div>
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
                      ${isActive 
                        ? 'bg-white text-gray-800 shadow-md scale-105' 
                        : 'text-gray-600 hover:text-gray-800 hover:bg-white/50'
                      }
                    `}
                  >
                    <Icon className={`w-5 h-5 ${isActive ? `text-${tab.color}-600` : ''}`} />
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