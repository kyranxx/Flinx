export default {
    meta: {
        title: 'Flinx - 网站速度优化 & Google PageSpeed (100分)',
        description: '专业网站速度优化服务，让您的网站加载速度飞快。提升 Google PageSpeed 分数、改善 Core Web Vitals，并获得更好的 SEO 表现。',
        keywords: '网站速度优化, 网页加速, PageSpeed Insights',
    },
    nav: {
        features: '功能',
        testimonials: '客户评价',
        faq: '常见问题',
        contact: '联系我们',
    },
    process: {
        title: '工作流程',
        subtitle: '从开始到交付，流程简单透明',
        steps: [
            {
                title: '提交表单',
                description: '发送您的网址和优化需求',
            },
            {
                title: '获取报价',
                description: '我们分析网站并评估价格与时间',
            },
            {
                title: '确认方案',
                description: '查看并接受我们的优化建议',
            },
            {
                title: '达到100分',
                description: '冲刺理想的 PageSpeed Insights 分数',
            },
        ],
    },
    hero: {
        badge: '不要再因为加载缓慢而失去客户',
        title: '让您的网站',
        titleGradient: '快得不公平',
        description: '专业 PageSpeed 优化服务。减少加载时间，改善用户体验，并提升转化机会。',
        cta: '获取速度提升',
    },
    scoreComparison: {
        before: {
            label: '优化前',
            title: '当前网站',
            subtitle: '加载缓慢，每天流失客户',
        },
        after: {
            label: '优化后',
            title: '使用 Flinx 后',
            subtitle: '高分表现，更高转化',
        },
        categories: {
            performance: '性能',
            accessibility: '可访问性',
            bestPractices: '最佳实践',
            seo: 'SEO',
        },
    },
    services: {
        title: '为什么选择 Flinx？',
        subtitle: '我们不只是安装插件。我们深入代码、资源和服务器配置，找到真正的速度瓶颈。',
        items: [
            {
                title: 'Core Web Vitals 优化',
                description: '优化 LCP、INP 和 CLS，让网站通过 Google 的核心网页指标评估。',
            },
            {
                title: '关键 CSS 提取',
                description: '优先加载首屏所需样式，减少阻塞渲染的资源。',
            },
            {
                title: '下一代图片格式',
                description: '压缩图片并转换为 WebP/AVIF，同时保持清晰的视觉质量。',
            },
            {
                title: 'JavaScript 优化',
                description: '拆分代码、移除无用脚本，并延迟加载非关键资源。',
            },
            {
                title: '资源提示与预加载',
                description: '合理使用 dns-prefetch、preconnect 和 preload，加快关键资源加载。',
            },
            {
                title: '服务器响应时间',
                description: '优化缓存、数据库查询和 CDN 设置，降低 TTFB。',
            },
            {
                title: '移动端优先性能',
                description: '针对移动网络和设备进行调优，减少页面负载。',
            },
            {
                title: '第三方脚本控制',
                description: '控制分析、广告和追踪脚本，减少它们对速度分数的影响。',
            },
        ],
    },
    testimonials: {
        title: '客户评价',
        subtitle: '真实企业的真实结果',
        items: [
            {
                name: 'Sarah Johnson',
                role: '电商店主',
                text: 'Flinx 优化我的商店后，转化率提升了 35%。非常值得。',
            },
            {
                name: 'Michael Chen',
                role: 'SaaS 创始人',
                text: 'PageSpeed 从 40 提升到 100。我们的跳出率明显下降。',
            },
            {
                name: 'Emma Davis',
                role: '市场总监',
                text: 'SEO 排名明显提升。核心关键词现在进入了第一页。',
            },
            {
                name: 'David Martinez',
                role: '科技创业公司 CEO',
                text: '页面加载时间从 8 秒降到不到 2 秒，用户体验好太多了。',
            },
            {
                name: 'Lisa Anderson',
                role: '博客主',
                text: '优化后自然流量明显增长，移动端表现尤其稳定。',
            },
            {
                name: 'James Wilson',
                role: '网店经理',
                text: '移动端性能终于达标，移动设备订单增长很明显。',
            },
        ],
    },
    faq: {
        title: '常见问题',
        items: [
            {
                question: '优化需要多长时间？',
                answer: '大多数网站可在 3-5 个工作日内完成，具体取决于网站复杂度。',
            },
            {
                question: '网站外观会改变吗？',
                answer: '不会。我们主要在后台优化性能，保留现有设计。',
            },
            {
                question: '如果我不满意怎么办？',
                answer: '如果我们无法明显改善您的 PageSpeed 分数，可按约定退款。',
            },
            {
                question: '支持哪些平台？',
                answer: 'WordPress、Shopify、自定义网站、React、Vue、Next.js 等都可以处理。',
            },
            {
                question: '优化会影响 SEO 吗？',
                answer: '会。更快的网站通常有更好的用户体验，也更容易通过 Core Web Vitals 评估。',
            },
            {
                question: '是否提供持续维护？',
                answer: '可以。我们可以提供维护服务，让网站在新增内容后仍保持快速。',
            },
        ],
    },
    contact: {
        title: '准备起飞？',
        subtitle: '填写下面的表单。我们会分析您的网站并发送定制报价。',
        form: {
            name: '姓名',
            namePlaceholder: '张三',
            website: '网站 URL',
            websitePlaceholder: 'https://example.cn',
            email: '邮箱',
            emailPlaceholder: 'zhang@example.cn',
            message: '留言（可选）',
            messagePlaceholder: '告诉我们您当前遇到的速度问题...',
            verify: '我是人类（点击验证）',
            verified: '已验证',
            submit: '获取报价',
            sending: '发送中...',
        },
        success: {
            title: '消息已收到！',
            subtitle: '我们会尽快联系您，并发送网站速度分析。',
        },
        protectedByRecaptcha: '受 Google reCAPTCHA 保护',
    },
    footer: {
        tagline: '让互联网更快，一次优化一个网站。',
        madeWith: '为速度而生。',
        rights: '版权所有。',
    },
};
