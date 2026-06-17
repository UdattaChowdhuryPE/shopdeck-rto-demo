'use client'

import { useState, useMemo } from 'react'
import { getMockRules } from '@/data/fixtures'

export default function RulesPage() {
  const mockRules = useMemo(() => getMockRules(), [])
  const [rules, setRules] = useState(mockRules)
  const [editingRule, setEditingRule] = useState(null)
  const [editThreshold, setEditThreshold] = useState(0)

  const toggleRule = (ruleId) => {
    setRules(rules.map(r => r.id === ruleId ? { ...r, enabled: !r.enabled } : r))
  }

  const startEdit = (ruleId, currentThreshold) => {
    setEditingRule(ruleId)
    setEditThreshold(currentThreshold)
  }

  const saveEdit = (ruleId) => {
    setRules(rules.map(r => r.id === ruleId ? { ...r, threshold: editThreshold } : r))
    setEditingRule(null)
  }

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-3xl font-bold text-sd-cyan mb-6">Intervention Rules</h1>

      <div className="space-y-4">
        {rules.map((rule) => (
          <div key={rule.id} className="bg-sd-secondary rounded-lg p-6 hover:shadow-[0_8px_24px_rgba(6,182,212,0.15)] transition-shadow duration-200 border-t-4 border-sd-blue focus-within:outline focus-within:outline-2 focus-within:outline-sd-blue focus-within:outline-offset-2">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <input
                  type="checkbox"
                  checked={rule.enabled}
                  onChange={() => toggleRule(rule.id)}
                  className="w-5 h-5 rounded border-sd-tertiary accent-sd-cyan focus-visible:outline focus-visible:outline-2 focus-visible:outline-sd-blue focus-visible:outline-offset-2"
                  aria-label={`Toggle ${rule.name}`}
                />
                <div>
                  <h3 className="text-lg font-semibold text-white">{rule.name}</h3>
                  <p className="text-sm text-[#cbd5e1] mt-1">Trigger: {rule.trigger}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-sd-cyan">{rule.applied_count}</div>
                <div className="text-sm text-[#cbd5e1]">orders matched</div>
              </div>
            </div>

            <div className="bg-sd-darker rounded-lg p-4 mb-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <div className="text-sm text-gray-400">Threshold</div>
                  {editingRule === rule.id ? (
                    <input
                      type="number"
                      value={editThreshold}
                      onChange={(e) => setEditThreshold(Number(e.target.value))}
                      className="border border-sd-tertiary rounded px-2 py-1 w-full mt-1 bg-sd-dark text-white"
                    />
                  ) : (
                    <div className="text-lg font-medium text-white">{rule.threshold}</div>
                  )}
                </div>
                <div>
                  <div className="text-sm text-gray-400">Action</div>
                  <div className="text-lg font-medium text-white capitalize">{rule.action.replace(/_/g, ' ')}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Status</div>
                  <div className={rule.enabled ? 'text-lg font-medium text-risk-green' : 'text-lg font-medium text-gray-500'}>
                    {rule.enabled ? 'Active' : 'Inactive'}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              {editingRule === rule.id ? (
                <>
                  <button
                    onClick={() => saveEdit(rule.id)}
                    className="px-4 py-2 bg-risk-green text-white rounded-lg hover:bg-[#059669] focus-visible:outline focus-visible:outline-2 focus-visible:outline-sd-blue focus-visible:outline-offset-2 transition-colors"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingRule(null)}
                    className="px-4 py-2 border border-sd-tertiary text-[#cbd5e1] rounded-lg hover:bg-sd-darker hover:text-[#f1f5f9] focus-visible:outline focus-visible:outline-2 focus-visible:outline-sd-blue focus-visible:outline-offset-2 transition-colors"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={() => startEdit(rule.id, rule.threshold)}
                  className="px-4 py-2 text-sd-cyan hover:text-sd-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sd-blue font-medium transition-colors"
                >
                  Edit Threshold
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-sd-secondary rounded-lg p-6 hover:shadow-[0_8px_24px_rgba(6,182,212,0.15)] transition-shadow duration-200">
        <h2 className="text-lg font-semibold text-white mb-4">Create New Rule</h2>
        <p className="text-[#cbd5e1] text-sm">Feature coming soon: Add custom intervention rules based on your business logic.</p>
      </div>
    </div>
  )
}
