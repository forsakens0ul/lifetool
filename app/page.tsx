import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CoffeeGuide from '@/components/CoffeeGuide';
import TeaGuide from '@/components/TeaGuide';
import SportGuide from '@/components/SportGuide';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 bg-clip-text text-transparent mb-4">
            生活指南助手
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            探索咖啡冲煮的艺术，品味茶饮调制的精髓，掌握科学运动的方法 —— 让每一天都充满仪式感
          </p>
        </div>

        <Tabs defaultValue="coffee" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="coffee" className="text-lg py-3">
              ☕ 咖啡冲煮
            </TabsTrigger>
            <TabsTrigger value="tea" className="text-lg py-3">
              🫖 茶饮调制
            </TabsTrigger>
            <TabsTrigger value="sport" className="text-lg py-3">
              🏋️‍♂️ 运动健身
            </TabsTrigger>
          </TabsList>

          <TabsContent value="coffee">
            <CoffeeGuide />
          </TabsContent>

          <TabsContent value="tea">
            <TeaGuide />
          </TabsContent>

          <TabsContent value="sport">
            <SportGuide />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}