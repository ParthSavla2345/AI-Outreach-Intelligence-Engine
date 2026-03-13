import { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Copy, Edit3, RefreshCw } from 'lucide-react';

const personaTypes = ['Executive', 'Technical', 'Creative', 'Analytical'];
const industries = ['SaaS', 'Finance', 'Healthcare', 'E-commerce', 'Manufacturing'];
const triggerEvents = ['Job Change', 'Funding Round', 'Product Launch', 'Conference Attendance'];
const strategies = ['Value-First', 'Authority-Based', 'Trigger-Based', 'Educational'];
const tones = ['Professional', 'Casual', 'Enthusiastic', 'Consultative'];

export function ContentGenerator() {
  const [formData, setFormData] = useState({
    persona: '',
    industry: '',
    trigger: '',
    strategy: '',
    tone: '',
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setGeneratedContent(
        `Hi {Name},\n\nI noticed you recently joined ${formData.industry === 'SaaS' ? 'TechVision' : 'your new company'} as ${formData.persona || 'a leader'}. Congratulations on the move!\n\nGiven your focus on ${formData.industry || 'your industry'}, I thought you might find value in our approach to ${formData.trigger || 'solving common challenges'}.\n\nWe've helped similar companies achieve:\n• 40% increase in conversion rates\n• 60% reduction in sales cycle time\n• 3x improvement in lead quality\n\nWould you be open to a brief conversation about how we might support your goals?\n\nBest regards,\nYour Name`
      );
      setIsGenerating(false);
    }, 2000);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedContent);
  };

  return (
    <div className="min-h-screen p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-[32px] font-medium text-[#e0e1dd] mb-2">Content Generator</h1>
        <p className="text-[#778da9]" style={{ fontSize: '14px' }}>
          Generate AI-powered personalized outreach messages
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <div className="bg-[#1b263b] rounded-2xl p-8 border border-[#415a77]/20">
            <h2 className="text-[24px] font-medium text-[#e0e1dd] mb-6">Configuration</h2>

            <div className="space-y-6">
              {/* Persona Type */}
              <div>
                <label className="block text-sm font-medium text-[#e0e1dd] mb-3">
                  Persona Type
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {personaTypes.map((type) => (
                    <motion.button
                      key={type}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setFormData({ ...formData, persona: type })}
                      className={`p-3 rounded-xl border-2 transition-all text-sm ${
                        formData.persona === type
                          ? 'border-[#415a77] bg-[#415a77]/10'
                          : 'border-[#415a77]/20 hover:border-[#415a77]'
                      }`}
                    >
                      {type}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Industry */}
              <div>
                <label className="block text-sm font-medium text-[#e0e1dd] mb-3">Industry</label>
                <select
                  value={formData.industry}
                  onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                  className="w-full p-3 rounded-xl bg-[#0d1b2a] border border-[#415a77]/30 focus:outline-none focus:border-[#415a77] transition-colors text-sm"
                >
                  <option value="">Select industry...</option>
                  {industries.map((industry) => (
                    <option key={industry} value={industry}>
                      {industry}
                    </option>
                  ))}
                </select>
              </div>

              {/* Trigger Event */}
              <div>
                <label className="block text-sm font-medium text-[#e0e1dd] mb-3">
                  Trigger Event
                </label>
                <select
                  value={formData.trigger}
                  onChange={(e) => setFormData({ ...formData, trigger: e.target.value })}
                  className="w-full p-3 rounded-xl bg-[#0d1b2a] border border-[#415a77]/30 focus:outline-none focus:border-[#415a77] transition-colors text-sm"
                >
                  <option value="">Select trigger...</option>
                  {triggerEvents.map((trigger) => (
                    <option key={trigger} value={trigger}>
                      {trigger}
                    </option>
                  ))}
                </select>
              </div>

              {/* Strategy Type */}
              <div>
                <label className="block text-sm font-medium text-[#e0e1dd] mb-3">
                  Strategy Type
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {strategies.map((strategy) => (
                    <motion.button
                      key={strategy}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setFormData({ ...formData, strategy })}
                      className={`p-3 rounded-xl border-2 transition-all text-sm ${
                        formData.strategy === strategy
                          ? 'border-[#415a77] bg-[#415a77]/10'
                          : 'border-[#415a77]/20 hover:border-[#415a77]'
                      }`}
                    >
                      {strategy}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Tone Selector */}
              <div>
                <label className="block text-sm font-medium text-[#e0e1dd] mb-3">Tone</label>
                <div className="flex gap-2">
                  {tones.map((tone) => (
                    <button
                      key={tone}
                      onClick={() => setFormData({ ...formData, tone })}
                      className={`flex-1 py-2 px-3 rounded-lg text-xs transition-all ${
                        formData.tone === tone
                          ? 'bg-[#415a77] text-white'
                          : 'bg-[#0d1b2a] text-[#e0e1dd] hover:bg-[#1b263b]'
                      }`}
                    >
                      {tone}
                    </button>
                  ))}
                </div>
              </div>

              {/* Generate Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#415a77] to-[#778da9] text-white font-medium shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isGenerating ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Generate Content
                  </>
                )}
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Preview */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <div className="bg-gradient-to-br from-[#1b263b] to-[#1b263b]/30 rounded-2xl p-8 border border-[#415a77]/20">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[24px] font-medium text-[#e0e1dd]">Generated Message</h2>
              {generatedContent && (
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsEditing(!isEditing)}
                    className="p-2 rounded-lg hover:bg-[#0d1b2a] transition-colors"
                  >
                    <Edit3 className="w-4 h-4 text-[#778da9]" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleCopy}
                    className="p-2 rounded-lg hover:bg-[#0d1b2a] transition-colors"
                  >
                    <Copy className="w-4 h-4 text-[#778da9]" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleGenerate}
                    className="p-2 rounded-lg hover:bg-[#0d1b2a] transition-colors"
                  >
                    <RefreshCw className="w-4 h-4 text-[#778da9]" />
                  </motion.button>
                </div>
              )}
            </div>

            {isGenerating && (
              <div className="space-y-3">
                {[1, 2, 3, 4].map((i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0.3 }}
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                    className="h-4 bg-[#1b263b] rounded"
                    style={{ width: `${100 - i * 10}%` }}
                  />
                ))}
              </div>
            )}

            {!isGenerating && generatedContent && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {isEditing ? (
                  <textarea
                    value={generatedContent}
                    onChange={(e) => setGeneratedContent(e.target.value)}
                    className="w-full h-96 p-4 rounded-xl bg-[#1b263b] border border-[#415a77]/30 focus:outline-none focus:border-[#415a77] resize-none font-['Inter'] text-sm"
                  />
                ) : (
                  <div className="bg-[#1b263b] rounded-xl p-6 min-h-96 whitespace-pre-wrap font-['Inter'] text-sm text-[#e0e1dd] leading-relaxed">
                    {generatedContent}
                  </div>
                )}
              </motion.div>
            )}

            {!isGenerating && !generatedContent && (
              <div className="flex items-center justify-center h-96 text-[#778da9] text-sm">
                Configure your settings and click "Generate Content" to create a personalized message
              </div>
            )}
          </div>

          {generatedContent && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#1b263b] rounded-2xl p-6 border border-[#415a77]/20"
            >
              <h3 className="text-sm font-medium text-[#e0e1dd] mb-4">AI Insights</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-[#778da9]">Personalization Score</span>
                  <span className="text-[#e0e1dd] font-medium">92%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#778da9]">Estimated Read Time</span>
                  <span className="text-[#e0e1dd] font-medium">45 seconds</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#778da9]">Sentiment</span>
                  <span className="text-[#e0e1dd] font-medium">Professional & Friendly</span>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
