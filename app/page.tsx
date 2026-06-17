'use client'

import { useState, useMemo } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { generateMockOrders, getMockAnalytics } from '@/data/fixtures'

export default function Dashboard() {
  const orders = useMemo(() => generateMockOrders(), [])
  const analytics = useMemo(() => getMockAnalytics(), [])
  
  const riskStats = useMemo(() => {
    const green = orders.filter(o => o.return_risk_score < 30).length
    const yellow = orders.filter(o => o.return_risk_score >= 30 && o.return_risk_score < 70).length
    const red = orders.filter(o => o.return_risk_score >= 70).length
    return [green, yellow, red]
  }, [orders])

  return (
    <div className="p-4 md:p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-sd-cyan">RTO Dashboard</h1>
        <p className="text-[#f1f5f9] mt-2">Predictive Return Management System</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-sd-secondary rounded-lg p-6 hover:shadow-[0_8px_24px_rgba(6,182,212,0.15)] transition-shadow duration-200 focus-within:outline focus-within:outline-2 focus-within:outline-sd-blue focus-within:outline-offset-2">
          <div className="flex items-center gap-3 mb-2">
            <span className="inline-flex items-center justify-center w-2 h-2 rounded-full bg-risk-red"></span>
            <div className="text-sm font-medium text-[#f1f5f9]">Current RTO Rate</div>
          </div>
          <div className="text-3xl font-bold text-white">28%</div>
          <div className="text-xs text-[#cbd5e1] mt-2">Baseline rate</div>
        </div>
        <div className="bg-sd-secondary rounded-lg p-6 hover:shadow-[0_8px_24px_rgba(6,182,212,0.15)] transition-shadow duration-200 focus-within:outline focus-within:outline-2 focus-within:outline-sd-blue focus-within:outline-offset-2">
          <div className="flex items-center gap-3 mb-2">
            <span className="inline-flex items-center justify-center w-2 h-2 rounded-full bg-risk-green"></span>
            <div className="text-sm font-medium text-[#f1f5f9]">Target RTO</div>
          </div>
          <div className="text-3xl font-bold text-white">12%</div>
          <div className="text-xs text-[#cbd5e1] mt-2">Achievable with interventions</div>
        </div>
        <div className="bg-sd-secondary rounded-lg p-6 hover:shadow-[0_8px_24px_rgba(6,182,212,0.15)] transition-shadow duration-200 focus-within:outline focus-within:outline-2 focus-within:outline-sd-blue focus-within:outline-offset-2">
          <div className="flex items-center gap-3 mb-2">
            <span className="inline-flex items-center justify-center w-2 h-2 rounded-full bg-sd-blue"></span>
            <div className="text-sm font-medium text-[#f1f5f9]">Orders This Week</div>
          </div>
          <div className="text-3xl font-bold text-white">342</div>
          <div className="text-xs text-[#cbd5e1] mt-2">Incoming</div>
        </div>
        <div className="bg-sd-secondary rounded-lg p-6 hover:shadow-[0_8px_24px_rgba(6,182,212,0.15)] transition-shadow duration-200 focus-within:outline focus-within:outline-2 focus-within:outline-sd-blue focus-within:outline-offset-2">
          <div className="flex items-center gap-3 mb-2">
            <span className="inline-flex items-center justify-center w-2 h-2 rounded-full bg-sd-purple"></span>
            <div className="text-sm font-medium text-[#f1f5f9]">Margin Recovered</div>
          </div>
          <div className="text-3xl font-bold text-white">23.4K</div>
          <div className="text-xs text-[#cbd5e1] mt-2">This week</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-sd-secondary rounded-lg p-6 hover:shadow-[0_8px_24px_rgba(6,182,212,0.15)] transition-shadow duration-200">
          <h2 className="text-lg font-semibold text-white mb-4">RTO Trend (Last 8 weeks)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={analytics.weekly_rto_trend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="week" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155' }} />
              <Legend />
              <Line type="monotone" dataKey="intervened" stroke="#10b981" name="With Interventions" strokeWidth={2} />
              <Line type="monotone" dataKey="non_intervened" stroke="#ef4444" name="Without Interventions" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-sd-secondary rounded-lg p-6 hover:shadow-[0_8px_24px_rgba(6,182,212,0.15)] transition-shadow duration-200">
          <h2 className="text-lg font-semibold text-white mb-4">Risk Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={[
                  { name: 'Low Risk', value: riskStats[0], fill: '#10b981' },
                  { name: 'Medium Risk', value: riskStats[1], fill: '#f59e0b' },
                  { name: 'High Risk', value: riskStats[2], fill: '#ef4444' },
                ]}
                dataKey="value"
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={100}
              >
                <Cell fill="#10b981" />
                <Cell fill="#f59e0b" />
                <Cell fill="#ef4444" />
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-8 bg-sd-secondary rounded-lg p-6 hover:shadow-[0_8px_24px_rgba(6,182,212,0.15)] transition-shadow duration-200">
        <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <a href="/orders?filter=red" className="px-6 py-3 bg-risk-red text-white rounded-lg hover:bg-[#dc2626] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sd-blue font-medium transition-colors duration-200">
            View High-Risk Orders ({riskStats[2]})
          </a>
          <a href="/rules" className="px-6 py-3 bg-sd-blue text-white rounded-lg hover:bg-[#2563eb] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sd-cyan font-medium transition-colors duration-200">
            Edit Rules
          </a>
        </div>
      </div>
    </div>
  )
}
