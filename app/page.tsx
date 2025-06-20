'use client';

import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CoffeeGuide from '@/components/CoffeeGuide';
import TeaGuide from '@/components/TeaGuide';
import SportGuide from '@/components/SportGuide';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            生活指南助手
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            从咖啡冲煮到茶饮调制，从运动健身到生活技巧，让专业指导陪伴你的每一天
          </p>
        </div>

        <Tabs defaultValue="coffee" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="coffee" className="text-lg">☕ 咖啡冲煮</TabsTrigger>
            <TabsTrigger value="tea" className="text-lg">🫖 茶饮调制</TabsTrigger>
            <TabsTrigger value="sport" className="text-lg">🏋️‍♂️ 运动健身</TabsTrigger>
          </TabsList>

          {/* 咖啡模块 */}
          <TabsContent value="coffee">
            <CoffeeGuide />
          </TabsContent>

          {/* 茶饮模块 */}
          <TabsContent value="tea">
            <TeaGuide />
          </TabsContent>

          {/* 运动模块 */}
          <TabsContent value="sport">
            <SportGuide />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}