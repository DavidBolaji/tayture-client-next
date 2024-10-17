import { NextApiRequest, NextApiResponse } from 'next'
import { HuggingFaceInference } from '@langchain/community/llms/hf'
import { PromptTemplate } from '@langchain/core/prompts'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { jobTitle } = req.body

  const model = new HuggingFaceInference({
    model: 'gpt2-large', // Using a larger model for better results
    temperature: 0.2, // Lowering temperature for more focused outputs
    topP: 0.9,
    topK: 40,
    apiKey: process.env.NEXT_PUBLIC_HUGGINGFACEHUB_API_KEY,
    maxRetries: 2,
    maxTokens: 50, // Limiting token count for more concise responses
  })

  // Improved prompt template for generating more specific and relevant resume suggestions
  const template = `Generate a list of 3 specific and impressive responsibilities for the job title: {jobTitle}. 
  Each responsibility should be detailed, action-oriented, and showcase leadership or technical skills. 
  Format the output as a numbered list, with each item separated by '|||'.`

  const prompt = PromptTemplate.fromTemplate(template)
  
  const chain = prompt.pipe(model)

  try {
    const result = await chain.invoke({ jobTitle })
    
    // Process the result to extract and format suggestions
    const suggestions = result.split('|||')
      .map(s => s.trim())
      .filter(s => s.length > 0 && s.match(/^\d+\./)) // Ensure each suggestion starts with a number
      .map(s => s.replace(/^\d+\.\s*/, '')) // Remove the numbering

    // If we don't have enough valid suggestions, add some generic ones
    while (suggestions.length < 3) {
      suggestions.push(`Implemented key features for ${jobTitle} role, improving overall system performance`)
    }

    console.log('[SUGGESTIONS]', { suggestions })
    res.status(200).json({ suggestions })
  } catch (error) {
    console.error('Error generating suggestions:', error)
    res.status(500).json({ message: 'Error generating suggestions' })
  }
}
