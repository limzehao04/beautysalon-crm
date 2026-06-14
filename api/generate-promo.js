import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({ apiKey: process.env.CLAUDE_API_KEY })

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { salonName, promotion, targetAudience } = req.body

  if (!salonName || !promotion) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  try {
    const message = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 1024,
      messages: [{
        role: 'user',
        content: `你是马来西亚美容院的WhatsApp文案专家。请用简体中文生成3个不同风格的WhatsApp促销消息。

美容院名称：${salonName}
促销内容：${promotion}
目标客群：${targetAudience}

要求：
- 每个版本风格不同（亲切温馨 / 专业精致 / 活泼有趣）
- 适合马来西亚华人阅读习惯
- 100-150字左右
- 可以加入emoji
- 结尾要有行动号召（回复预约/来电）

请以JSON格式回复：
{"options": ["版本1内容", "版本2内容", "版本3内容"]}`,
      }],
    })

    const content = message.content[0].text
    const parsed = JSON.parse(content)
    res.status(200).json(parsed)
  } catch (err) {
    console.error('Claude API error:', err)
    res.status(500).json({ error: 'Failed to generate content' })
  }
}
