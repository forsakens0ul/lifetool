# 生活指南助手 Life Guide Assistant

一个多功能的生活搭配探索小工具，支持咖啡冲煮、茶艺对照、锻炼训练等模块 —— 鼓励你在日常中体验生活的仪式感 ✨

## 🧩 功能模块

### 1. ☕ 咖啡冲煮指南（Coffee Brew Guide）
- 模式一：**手动搭配** → 自选咖啡豆种、冲煮器具、风味增强，自动生成详细配方和步骤。
- 模式二：**随机抽卡** → 点击抽卡获取今日灵感搭配 + B 站教程链接。

### 2. 🍵 茶艺对照（Tea Pairing Helper）
- 模式一：**茶叶风味对照** → 按风味喜好筛选对应茶类（如焙火乌龙、花草茶等），获得泡茶参数。
- 模式二：**时节推荐** → 根据节气自动推荐当季茶。

### 3. 🏋️‍♂️ 定位训练（Targeted Fitness）
- 模式一：**按部位搭配训练** → 选择目标肌群（腿部、手臂、核心等）+ 可用器械，获得针对性训练建议。
- 模式二：**随便练练卡牌** → 一键抽取今日随机练习计划，轻松动起来。

---

## 🛠 技术栈

- 前端：Vue / React / Tailwind CSS
- 数据来源：自定义 JSON 配方数据库（已包含 300+ 咖啡搭配 / 茶艺规则 / 健身训练逻辑）
- 教程跳转：集成 Bilibili 视频链接
- 页面展示参考：https://cook.yunyoujun.cn/

---

## 📦 快速体验

```bash
git clone https://github.com/yourname/life-guide-assistant.git
cd life-guide-assistant
npm install
npm run dev
