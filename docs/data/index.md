---
layout: doc
title: 数据资源
---

# 📊 数据资源中心

以下数据集均基于「潮玩星球」电商公司的商业场景设计，与课程讲义内容配套。所有数据为模拟生成，可直接下载用于课程练习。

::: tip 💡 使用提示
- 点击文件名可下载完整 CSV 文件
- CSV 使用 UTF-8 BOM 编码，Excel 直接打开不会乱码
- 推荐将数据导入 Kimi/ChatGPT 进行 AI 辅助分析
- 字段名均为英文，便于导入数据分析工具
:::

---

## 1. 客户主数据

**适用周次：** W1-W3（数据觉醒、数据清洗、客户画像与RFM分析）

**说明：** 1000位客户的基本信息、消费概况和会员等级

**字段：**

| 字段名 | 说明 | 示例 |
|---|---|---|
| customer_id | 客户ID | C0001 |
| register_date | 注册日期 | 2025-06-01 |
| gender | 性别 | 男/女 |
| age | 年龄 | 18-45 |
| city | 城市 | 上海/北京/广州... |
| membership_level | 会员等级 | 普通/银卡/金卡/黑卡 |
| total_orders | 累计订单数 | 5-200 |
| total_amount | 累计消费金额 | 250-100000 |
| last_purchase_date | 最近购买日期 | 2025-10-08 |
| avg_monthly_visits | 月均访问次数 | 0-50 |

**规模：** 1000 行 × 10 列

**下载：** [customer_data.csv](./customer_data.csv)

**数据预览（前5行）：**

| customer_id | register_date | gender | age | city | membership_level | total_orders | total_amount | last_purchase_date | avg_monthly_visits |
|---|---|---|---|---|---|---|---|---|---|
| C0001 | 2023-07-14 | 女 | 28 | 北京 | 金卡 | 42 | 8432.7 | 2025-10-15 | 15 |
| C0002 | 2022-11-26 | 女 | 22 | 上海 | 黑卡 | 97 | 28541.0 | 2025-07-01 | 33 |
| C0003 | 2024-09-06 | 男 | 19 | 广州 | 银卡 | 24 | 2400.6 | 2025-10-12 | 8 |
| C0004 | 2025-01-09 | 女 | 27 | 深圳 | 普通 | 12 | 1200.0 | 2025-10-15 | 5 |
| C0005 | 2024-12-28 | 女 | 34 | 成都 | 普通 | 14 | 1400.0 | 2025-10-15 | 6 |

---

## 2. 订单商品明细数据（核心数据集）

**适用周次：** W2-W4（数据清洗、客户画像、数据可视化）

**说明：** 真实电商订单结构，一个订单可包含多件商品，共约800个订单、2000条明细行

**字段：**

| 字段名 | 说明 | 示例 |
|---|---|---|
| order_id | 订单ID | ORD0001 |
| customer_id | 客户ID | C0001 |
| order_date | 订单日期 | 2025-07-16 |
| product_category | 商品品类 | 盲盒/手办/周边/服饰/配件 |
| product_name | 商品名称 | 星际探索盲盒系列 |
| quantity | 购买数量 | 1-5 |
| unit_price | 单价（元） | 29-599 |
| line_total | 该行小计 | quantity × unit_price |
| payment_method | 支付方式 | 微信支付/支付宝/银行卡 |
| is_discount_used | 是否使用优惠券 | 是/否 |
| channel | 购买渠道 | APP/小程序/线下 |

**规模：** 约2000行 × 11列（约800个真实订单）

**下载：** [transaction_data.csv](./transaction_data.csv)

**数据预览（展示一个订单的多件商品）：**

| order_id | customer_id | order_date | product_category | product_name | quantity | unit_price | line_total | payment_method | is_discount_used | channel |
|---|---|---|---|---|---|---|---|---|---|---|
| ORD0001 | C0001 | 2025-07-16 | 服饰 | 动漫图案围巾 | 2 | 154 | 308 | 银行卡 | 否 | APP |
| ORD0001 | C0001 | 2025-07-16 | 盲盒 | 星际探索盲盒系列 | 3 | 59 | 177 | 银行卡 | 否 | APP |
| ORD0001 | C0001 | 2025-07-16 | 周边 | 主题限定钥匙扣 | 2 | 39 | 78 | 银行卡 | 否 | APP |
| ORD0002 | C0002 | 2025-08-06 | 手办 | 机甲战士手办 | 5 | 336 | 1680 | 微信支付 | 否 | APP |
| ORD0002 | C0002 | 2025-08-06 | 周边 | 联名限定鼠标垫 | 1 | 89 | 89 | 微信支付 | 否 | APP |

---

## 3. 客户行为数据

**适用周次：** W7-W9（流失预警、精准营销与个性化推荐）

**说明：** 1000位客户的浏览、加购、投诉等行为指标

**字段：**

| 字段名 | 说明 | 示例 |
|---|---|---|
| customer_id | 客户ID | C0001 |
| avg_browse_duration_min | 平均浏览时长（分钟） | 0-60 |
| monthly_page_views | 月均页面浏览量 | 5-500 |
| search_keywords_count | 月均搜索次数 | 0-50 |
| cart_add_count | 月均加购次数 | 0-30 |
| cart_abandon_rate | 购物车放弃率 | 0.0-0.9 |
| click_through_rate | 广告点击率 | 0.0-0.3 |
| email_open_rate | 邮件打开率 | 0.0-0.6 |
| complaint_count | 投诉次数 | 0-5 |
| has_complaint_last_month | 上月是否有投诉 | 是/否 |

**规模：** 1000 行 × 10 列

**下载：** [customer_behavior.csv](./customer_behavior.csv)

---

## 4. 流失预警评分数据

**适用周次：** W7（客户流失预警）

**说明：** 1000位客户的多维度流失风险评分和风险等级

**字段：**

| 字段名 | 说明 | 权重 |
|---|---|---|
| customer_id | 客户ID | - |
| purchase_frequency_change | 购买频率变化分 | 30% |
| recency_score | 最近购买时间分 | 25% |
| spending_trend | 消费趋势分 | 20% |
| engagement_score | 互动活跃度分 | 15% |
| complaint_score | 投诉评分 | 10% |
| churn_risk_score | 综合流失风险分（加权求和） | 100% |
| risk_level | 风险等级 | <40低风险/40-60持续观察/60-80重点关注/>80紧急干预 |

**规模：** 1000 行 × 8 列

**下载：** [churn_risk_data.csv](./churn_risk_data.csv)

**数据预览（前5行）：**

| customer_id | purchase_frequency_change | recency_score | spending_trend | engagement_score | complaint_score | churn_risk_score | risk_level |
|---|---|---|---|---|---|---|---|
| C0001 | 26 | 36 | 21 | 17 | 46 | 77.2 | 紧急干预 |
| C0002 | 47 | 14 | 15 | 46 | 0 | 73.4 | 重点关注 |
| C0003 | 32 | 16 | 41 | 12 | 33 | 76.8 | 紧急干预 |
| C0004 | 40 | 38 | 66 | 58 | 25 | 54.7 | 持续观察 |
| C0005 | 38 | 14 | 51 | 37 | 0 | 68.0 | 重点关注 |

---

## 5. 营销活动数据

**适用周次：** W8-W9（A/B测试、精准营销）

**说明：** 50条营销活动记录，含预算、触达、转化率、ROI等，覆盖全年各节点

**字段：**

| 字段名 | 说明 | 示例 |
|---|---|---|
| campaign_id | 活动ID | M001 |
| campaign_name | 活动名称 | 春节年货大促 |
| start_date | 开始日期 | 2025-01-26 |
| end_date | 结束日期 | 2025-02-01 |
| campaign_type | 活动类型 | 秒杀/满减/限时折扣/新品推荐/会员专属/买赠 |
| target_segment | 目标人群 | 全部/新客/活跃/沉睡/高价值/特定品类偏好 |
| budget | 预算（元） | 10000-100000 |
| actual_spend | 实际花费 | - |
| reach | 触达人数 | 1000-100000 |
| conversion_rate | 转化率 | 0.005-0.20 |
| roi | 投资回报率 | 0.3-8.0 |
| channel | 投放渠道 | APP推送/短信/邮件/抖音广告/朋友圈广告 |

**规模：** 50 行 × 12 列

**下载：** [marketing_campaign.csv](./marketing_campaign.csv)

**数据预览（前5行）：**

| campaign_id | campaign_name | start_date | end_date | campaign_type | target_segment | budget | actual_spend | reach | conversion_rate | roi | channel |
|---|---|---|---|---|---|---|---|---|---|---|---|
| M006 | 春节年货大促 | 2024-01-26 | 2024-02-01 | 秒杀 | 全部 | 16345 | 14230 | 25211 | 0.1409 | 3.85 | 邮件 |
| M023 | 第二件半价 | 2024-02-20 | 2024-02-24 | 限时折扣 | 新客 | 98340 | 90648 | 34186 | 0.0264 | 6.13 | 短信 |
| M036 | 老会员回馈 | 2024-03-08 | 2024-03-18 | 秒杀 | 新客 | 82493 | 71557 | 13612 | 0.0955 | 1.99 | 朋友圈广告 |
| M011 | 黑卡会员尊享 | 2024-04-04 | 2024-04-07 | 限时折扣 | 特定品类偏好 | 48923 | 43977 | 27150 | 0.1946 | 1.71 | 朋友圈广告 |
| M047 | 开学焕新季 | 2024-07-22 | 2024-07-30 | 秒杀 | 特定品类偏好 | 88292 | 78817 | 68385 | 0.1464 | 7.98 | 抖音广告 |

---

## 6. A/B测试结果数据

**适用周次：** W8（A/B测试）

**说明：** 优惠券方案对比测试的完整结果

**字段：**

| 字段名 | 说明 |
|---|---|
| test_id | 测试ID |
| test_name | 测试名称 |
| variant_a | A方案 |
| variant_b | B方案 |
| traffic_split | 流量分配 |
| start_date | 开始日期 |
| end_date | 结束日期 |
| a_sample_size | A组样本量 |
| b_sample_size | B组样本量 |
| a_conversion_rate | A组转化率 |
| b_conversion_rate | B组转化率 |
| a_avg_order_value | A组平均客单价 |
| b_avg_order_value | B组平均客单价 |
| a_roi | A组ROI |
| b_roi | B组ROI |
| winner | 胜出方案 |

**规模：** 1 行 × 16 列

**下载：** [ab_test_data.csv](./ab_test_data.csv)

---

## 7. 会员数据

**适用周次：** W11（会员体系与忠诚度）

**说明：** 1000位会员的积分、等级、消费、推荐等数据

**字段：**

| 字段名 | 说明 | 示例 |
|---|---|---|
| customer_id | 客户ID | C0001 |
| membership_level | 会员等级 | 普通/银卡/金卡/黑卡 |
| join_date | 入会日期 | 2023-07-14 |
| points_balance | 当前积分余额 | 0-100000 |
| points_earned_total | 累计获得积分 | 100-500000 |
| points_redeemed | 已兑换积分 | 0-累计获得 |
| membership_years | 会员年限 | 0.5-5 |
| annual_spend | 年消费额 | 500-50000 |
| referral_count | 推荐新客数 | 0-20 |
| last_activity_date | 最近活跃日期 | 2025-10-15 |

**规模：** 1000 行 × 10 列

**下载：** [member_data.csv](./member_data.csv)

---

## 8. 全渠道月度数据

**适用周次：** W10（全渠道客户体验）

**说明：** 12个月的APP、小程序、线下门店三渠道收入和客户数据

**字段：**

| 字段名 | 说明 |
|---|---|
| month | 月份 |
| app_revenue | APP渠道收入 |
| mini_program_revenue | 小程序收入 |
| offline_revenue | 线下门店收入 |
| app_orders | APP订单数 |
| mini_program_orders | 小程序订单数 |
| offline_orders | 线下订单数 |
| app_customers | APP活跃客户数 |
| mini_program_customers | 小程序活跃客户数 |
| offline_customers | 线下客户数 |

**规模：** 12 行 × 10 列

**下载：** [channel_data.csv](./channel_data.csv)

---

## 数据集总览

| 文件名 | 适用周次 | 行数 | 列数 | 主要用途 |
|---|---|---|---|---|
| [customer_data.csv](./customer_data.csv) | W1-W3 | 1000 | 10 | 数据觉醒、清洗、客户画像 |
| [transaction_data.csv](./transaction_data.csv) | W2-W4 | ~2000 | 11 | 数据清洗、可视化（多品订单） |
| [customer_behavior.csv](./customer_behavior.csv) | W7-W9 | 1000 | 10 | 流失预警、个性化推荐 |
| [churn_risk_data.csv](./churn_risk_data.csv) | W7 | 1000 | 8 | 流失预警方案 |
| [marketing_campaign.csv](./marketing_campaign.csv) | W8-W9 | 50 | 12 | A/B测试、精准营销 |
| [ab_test_data.csv](./ab_test_data.csv) | W8 | 1 | 16 | A/B测试分析 |
| [member_data.csv](./member_data.csv) | W11 | 1000 | 10 | 会员体系设计 |
| [channel_data.csv](./channel_data.csv) | W10 | 12 | 10 | 全渠道分析 |
