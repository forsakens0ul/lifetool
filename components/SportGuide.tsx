'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Timer, Play } from 'lucide-react';

// 运动相关数据
const bodyParts = [
  { id: 'chest', name: '胸部', emoji: '💪', description: '胸大肌、胸小肌' },
  { id: 'back', name: '背部', emoji: '🔙', description: '背阔肌、斜方肌' },
  { id: 'shoulders', name: '肩部', emoji: '🤲', description: '三角肌、肩袖' },
  { id: 'arms', name: '手臂', emoji: '💪', description: '二头肌、三头肌' },
  { id: 'core', name: '核心', emoji: '🎯', description: '腹肌、腰部' },
  { id: 'legs', name: '腿部', emoji: '🦵', description: '大腿、小腿' },
  { id: 'glutes', name: '臀部', emoji: '🍑', description: '臀大肌、臀中肌' },
  { id: 'cardio', name: '有氧', emoji: '❤️', description: '心肺功能训练' }
];

const equipment = [
  { id: 'bodyweight', name: '徒手', emoji: '🤸', description: '无需器材' },
  { id: 'dumbbells', name: '哑铃', emoji: '🏋️', description: '可调节重量' },
  { id: 'resistance', name: '弹力带', emoji: '🎗️', description: '便携阻力训练' },
  { id: 'kettlebell', name: '壶铃', emoji: '⚖️', description: '功能性训练' },
  { id: 'barbell', name: '杠铃', emoji: '🏋️‍♂️', description: '大重量训练' },
  { id: 'machine', name: '器械', emoji: '🏃‍♂️', description: '健身房器械' },
  { id: 'yoga', name: '瑜伽垫', emoji: '🧘', description: '地面训练' },
  { id: 'cardio', name: '有氧器械', emoji: '🚴', description: '跑步机、单车等' }
];

const intensityLevels = [
  { id: 'low', name: '低强度', emoji: '🟢', description: 'RPE 3-4，轻松对话' },
  { id: 'moderate', name: '中强度', emoji: '🟡', description: 'RPE 5-6，稍感吃力' },
  { id: 'high', name: '高强度', emoji: '🟠', description: 'RPE 7-8，明显吃力' },
  { id: 'extreme', name: '极高强度', emoji: '🔴', description: 'RPE 9-10，接近极限' }
];

const durations = [
  { id: '15min', name: '15分钟', emoji: '⏱️', description: '快速训练' },
  { id: '30min', name: '30分钟', emoji: '⏰', description: '标准训练' },
  { id: '45min', name: '45分钟', emoji: '🕐', description: '充分训练' },
  { id: '60min', name: '60分钟', emoji: '🕑', description: '完整训练' }
];

// 训练视频链接
const trainingVideos = {
  chest: 'https://www.bilibili.com/video/BV1GJ411x7h7', // 胸部训练
  back: 'https://www.bilibili.com/video/BV1564y1q7X5', // 背部训练
  shoulders: 'https://www.bilibili.com/video/BV1Lh411B7HP', // 肩部训练
  arms: 'https://www.bilibili.com/video/BV1yh411B7nP', // 手臂训练
  core: 'https://www.bilibili.com/video/BV1Zh411B7qP', // 核心训练
  legs: 'https://www.bilibili.com/video/BV1fh411B7sP', // 腿部训练
  glutes: 'https://www.bilibili.com/video/BV1Th411B7tP', // 臀部训练
  cardio: 'https://www.bilibili.com/video/BV1Rh411B7uP' // 有氧训练
};

export default function SportGuide() {
  const [selectedBodyParts, setSelectedBodyParts] = useState<string[]>([]);
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>([]);
  const [selectedIntensity, setSelectedIntensity] = useState<string>('');
  const [selectedDuration, setSelectedDuration] = useState<string>('');

  // 生成运动计划
  const generateSportPlan = () => {
    if (selectedBodyParts.length === 0 || selectedEquipment.length === 0 || !selectedIntensity || !selectedDuration) {
      return null;
    }

    const bodyPartItems = bodyParts.filter(bp => selectedBodyParts.includes(bp.id));
    const equipmentItems = equipment.filter(eq => selectedEquipment.includes(eq.id));
    const intensityItem = intensityLevels.find(il => il.id === selectedIntensity);
    const durationItem = durations.find(d => d.id === selectedDuration);

    if (!intensityItem || !durationItem) return null;

    // 根据选择生成训练计划
    const exercises = generateExercises(bodyPartItems, equipmentItems, intensityItem, durationItem);
    
    return {
      bodyParts: bodyPartItems,
      equipment: equipmentItems,
      intensity: intensityItem,
      duration: durationItem,
      exercises
    };
  };

  // 生成具体练习动作
  const generateExercises = (bodyParts: any[], equipment: any[], intensity: any, duration: any) => {
    const exercises = [];
    const timePerPart = parseInt(duration.id) / bodyParts.length;
    
    bodyParts.forEach((part, index) => {
      const partExercises = getExercisesForBodyPart(part.id, equipment, intensity);
      exercises.push({
        bodyPart: part.name,
        emoji: part.emoji,
        time: `${Math.round(timePerPart)}分钟`,
        exercises: partExercises,
        videoUrl: trainingVideos[part.id as keyof typeof trainingVideos]
      });
    });

    return exercises;
  };

  // 根据部位和器材获取练习动作
  const getExercisesForBodyPart = (bodyPartId: string, equipment: any[], intensity: any) => {
    const exerciseDatabase: Record<string, Record<string, string[]>> = {
      chest: {
        bodyweight: ['俯卧撑', '钻石俯卧撑', '宽距俯卧撑'],
        dumbbells: ['哑铃卧推', '哑铃飞鸟', '上斜哑铃推举'],
        resistance: ['弹力带夹胸', '弹力带推胸', '弹力带飞鸟'],
        barbell: ['杠铃卧推', '上斜杠铃推举', '下斜杠铃推举']
      },
      back: {
        bodyweight: ['引体向上', '反向划船', '超人式'],
        dumbbells: ['哑铃划船', '单臂哑铃划船', '哑铃硬拉'],
        resistance: ['弹力带划船', '弹力带下拉', '弹力带反向飞鸟'],
        barbell: ['杠铃划船', '硬拉', '高位下拉']
      },
      shoulders: {
        bodyweight: ['派克推举', '倒立撑', '肩部绕环'],
        dumbbells: ['哑铃推举', '侧平举', '前平举'],
        resistance: ['弹力带侧平举', '弹力带推举', '弹力带面拉'],
        barbell: ['杠铃推举', '直立划船', '颈后推举']
      },
      arms: {
        bodyweight: ['钻石俯卧撑', '三头肌撑体', '反向俯卧撑'],
        dumbbells: ['哑铃弯举', '三头肌伸展', '锤式弯举'],
        resistance: ['弹力带弯举', '弹力带三头伸展', '弹力带锤式弯举'],
        barbell: ['杠铃弯举', '窄距卧推', '法式推举']
      },
      core: {
        bodyweight: ['平板支撑', '卷腹', '俄罗斯转体'],
        dumbbells: ['哑铃俄罗斯转体', '哑铃侧弯', '哑铃仰卧起坐'],
        resistance: ['弹力带转体', '弹力带抗阻', '弹力带木砍'],
        yoga: ['平板支撑', '侧平板', '死虫式']
      },
      legs: {
        bodyweight: ['深蹲', '弓步蹲', '单腿深蹲'],
        dumbbells: ['哑铃深蹲', '哑铃弓步', '哑铃提踵'],
        resistance: ['弹力带深蹲', '弹力带侧步', '弹力带腿举'],
        barbell: ['杠铃深蹲', '杠铃硬拉', '杠铃弓步']
      },
      glutes: {
        bodyweight: ['臀桥', '单腿臀桥', '蚌式开合'],
        dumbbells: ['哑铃臀桥', '哑铃硬拉', '哑铃侧步蹲'],
        resistance: ['弹力带臀桥', '弹力带侧步', '弹力带蚌式'],
        kettlebell: ['壶铃摆动', '壶铃深蹲', '壶铃硬拉']
      },
      cardio: {
        bodyweight: ['开合跳', '高抬腿', '波比跳'],
        cardio: ['跑步机', '椭圆机', '动感单车'],
        resistance: ['弹力带有氧', '弹力带循环', '弹力带间歇'],
        kettlebell: ['壶铃摆动', '壶铃推举', '壶铃深蹲跳']
      }
    };

    const availableExercises: string[] = [];
    equipment.forEach(eq => {
      const exercises = exerciseDatabase[bodyPartId]?.[eq.id] || [];
      availableExercises.push(...exercises);
    });

    // 根据强度调整练习数量
    const exerciseCount = intensity.id === 'low' ? 2 : intensity.id === 'moderate' ? 3 : intensity.id === 'high' ? 4 : 5;
    
    return availableExercises.slice(0, exerciseCount).map(exercise => ({
      name: exercise,
      sets: intensity.id === 'low' ? '2-3组' : intensity.id === 'moderate' ? '3-4组' : '4-5组',
      reps: intensity.id === 'low' ? '8-12次' : intensity.id === 'moderate' ? '12-15次' : '15-20次'
    }));
  };

  const sportPlan = generateSportPlan();

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <div className="text-4xl">🏋️‍♂️</div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            运动健身指南
          </h2>
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          从基础热身到专业训练，掌握科学运动方法，在家享受健身房级别的锻炼效果
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-2xl">💪</span>
            自定义训练计划
          </CardTitle>
          <CardDescription>
            选择锻炼部位、器材、强度和时长，生成专属训练方案
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* 锻炼部位选择 */}
          <div>
            <h4 className="font-semibold mb-3">1️⃣ 选择锻炼部位（可多选）</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {bodyParts.map((part) => (
                <Button
                  key={part.id}
                  variant={selectedBodyParts.includes(part.id) ? "default" : "outline"}
                  className="h-auto p-4 flex flex-col items-center gap-2"
                  onClick={() => {
                    setSelectedBodyParts(prev => 
                      prev.includes(part.id) 
                        ? prev.filter(id => id !== part.id)
                        : [...prev, part.id]
                    );
                  }}
                >
                  <span className="text-2xl">{part.emoji}</span>
                  <span className="text-sm">{part.name}</span>
                  <span className="text-xs text-muted-foreground text-center">{part.description}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* 运动器材选择 */}
          <div>
            <h4 className="font-semibold mb-3">2️⃣ 选择运动器材（可多选）</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {equipment.map((eq) => (
                <Button
                  key={eq.id}
                  variant={selectedEquipment.includes(eq.id) ? "default" : "outline"}
                  className="h-auto p-4 flex flex-col items-center gap-2"
                  onClick={() => {
                    setSelectedEquipment(prev => 
                      prev.includes(eq.id) 
                        ? prev.filter(id => id !== eq.id)
                        : [...prev, eq.id]
                    );
                  }}
                >
                  <span className="text-2xl">{eq.emoji}</span>
                  <span className="text-sm">{eq.name}</span>
                  <span className="text-xs text-muted-foreground text-center">{eq.description}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* 运动强度选择 */}
          <div>
            <h4 className="font-semibold mb-3">3️⃣ 选择运动强度</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {intensityLevels.map((level) => (
                <Button
                  key={level.id}
                  variant={selectedIntensity === level.id ? "default" : "outline"}
                  className="h-auto p-4 flex flex-col items-center gap-2"
                  onClick={() => setSelectedIntensity(level.id)}
                >
                  <span className="text-2xl">{level.emoji}</span>
                  <span className="text-sm">{level.name}</span>
                  <span className="text-xs text-muted-foreground text-center">{level.description}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* 运动时长选择 */}
          <div>
            <h4 className="font-semibold mb-3">4️⃣ 选择运动时长</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {durations.map((duration) => (
                <Button
                  key={duration.id}
                  variant={selectedDuration === duration.id ? "default" : "outline"}
                  className="h-auto p-4 flex flex-col items-center gap-2"
                  onClick={() => setSelectedDuration(duration.id)}
                >
                  <span className="text-2xl">{duration.emoji}</span>
                  <span className="text-sm">{duration.name}</span>
                  <span className="text-xs text-muted-foreground text-center">{duration.description}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* 生成的训练计划 */}
          {sportPlan && (
            <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
              <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">💪</span>
                你的专属运动配方
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-blue-700 mb-2">训练部位</h4>
                    <div className="flex flex-wrap gap-2">
                      {sportPlan.bodyParts.map((part) => (
                        <Badge key={part.id} variant="secondary" className="bg-blue-100 text-blue-700">
                          {part.emoji} {part.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-blue-700 mb-2">使用器材</h4>
                    <div className="flex flex-wrap gap-2">
                      {sportPlan.equipment.map((eq) => (
                        <Badge key={eq.id} variant="secondary" className="bg-purple-100 text-purple-700">
                          {eq.emoji} {eq.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-white rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-700 mb-3 flex items-center gap-2">
                    <Timer className="w-4 h-4" />
                    训练参数
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">强度等级</span>
                      <span className="text-sm font-medium text-blue-600">{sportPlan.intensity.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">训练时长</span>
                      <span className="text-sm font-medium text-blue-600">{sportPlan.duration.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">目标部位</span>
                      <span className="text-sm font-medium text-blue-600">{sportPlan.bodyParts.length}个</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 具体训练动作 */}
              <div className="space-y-4">
                <h4 className="font-semibold text-blue-700 mb-3">训练动作安排</h4>
                {sportPlan.exercises.map((exercise, index) => (
                  <div key={index} className="p-4 bg-white rounded-lg border border-blue-200">
                    <div className="flex items-center justify-between mb-3">
                      <h5 className="font-semibold text-blue-700 flex items-center gap-2">
                        <span className="text-xl">{exercise.emoji}</span>
                        {exercise.bodyPart} - {exercise.time}
                      </h5>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-blue-600 border-blue-300 hover:bg-blue-50"
                        onClick={() => window.open(exercise.videoUrl, '_blank')}
                      >
                        <Play className="w-4 h-4 mr-1" />
                        观看教程
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {exercise.exercises.map((ex, exIndex) => (
                        <div key={exIndex} className="p-3 bg-gray-50 rounded border">
                          <h6 className="font-medium text-sm text-gray-800">{ex.name}</h6>
                          <p className="text-xs text-gray-600 mt-1">{ex.sets} × {ex.reps}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 p-4 bg-white rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-700 mb-2">训练要点</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• 训练前进行5-10分钟热身</li>
                  <li>• 动作标准比重量更重要</li>
                  <li>• 组间休息30-90秒</li>
                  <li>• 训练后进行拉伸放松</li>
                  <li>• 根据身体状况调整强度</li>
                </ul>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}