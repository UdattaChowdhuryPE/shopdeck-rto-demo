'use client'

import { useMemo } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts'
import { getMockAnalytics } from '@/data/fixtures'

export default function AnalyticsPage() {
  const analytics = useMemo(() => getMockAnalytics(), [])

  const interventionData = [
    { name: 'Switch Shipping', count: analytics.interventions_by_type.switch_shipping.count, success: analytics.interventions_by_type.switch_shipping.success_rate * 100 },
    { name: 'Flag for QC', count: analytics.interventions_by_type.flag_qc.count, success: analytics.interventions_by_type.flag_qc.success_rate * 100 },
    { name: 'Pause SKU', count: analytics.interventions_by_type.pause_sku.count, success: analytics.interventions_by_type.pause_sku.success_rate * 100 },
  ]

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-3xl font-bold text-sd-cyan mb-6">Impact Analytics</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-sd-secondary rounded-lg p-6 hover:shadow-[0_8px_24px_rgba(6,182,212,0.15)] transition-shadow duration-200 focus-within:outline focus-within:outline-2 focus-within:outline-sd-blue focus-within:outline-offset-2">
          <div className="flex items-center gap-3 mb-2">
            <span className="inline-flex items-center justify-center w-2 h-2 rounded-full bg-sd-blue"></span>
            <div className="text-sm font-medium text-[#f1f5f9]">Interventions Applied</div>
          </div>
          <div className="text-3xl font-bold text-white">{analytics.orders_with_interventions}</div>
          <div className="text-xs text-[#cbd5e1] mt-2">Last 8 weeks</div>
        </div>
        <div className="bg-sd-secondary rounded-lg p-6 hover:shadow-[0_8px_24px_rgba(6,182,212,0.15)] transition-shadow duration-200 focus-within:outline focus-within:outline-2 focus-within:outline-sd-blue focus-within:outline-offset-2 border-t-4 border-risk-green">
          <div className="flex items-center gap-3 mb-2">
            <span className="inline-flex items-center justify-center w-2 h-2 rounded-full bg-risk-green"></span>
            <div className="text-sm font-medium text-[#f1f5f9]">RTO with Interventions</div>
          </div>
          <div className="text-3xl font-bold text-risk-green">{(analytics.rto_rate_intervened * 100).toFixed(1)}%</div>
          <div className="text-xs text-[#cbd5e1] mt-2">Down from 28%</div>
        </div>
        <div className="bg-sd-secondary rounded-lg p-6 hover:shadow-[0_8px_24px_rgba(6,182,212,0.15)] transition-shadow duration-200 focus-within:outline focus-within:outline-2 focus-within:outline-sd-blue focus-within:outline-offset-2">
          <div className="flex items-center gap-3 mb-2">
            <span className="inline-flex items-center justify-center w-2 h-2 rounded-full bg-risk-red"></span>
            <div className="text-sm font-medium text-[#f1f5f9]">RTO without Interventions</div>
          </div>
          <div className="text-3xl font-bold text-risk-red">{(analytics.rto_rate_non_intervened * 100).toFixed(1)}%</div>
          <div className="text-xs text-[#cbd5e1] mt-2">Baseline</div>
        </div>
        <div className="bg-sd-secondary rounded-lg p-6 hover:shadow-[0_8px_24px_rgba(6,182,212,0.15)] transition-shadow duration-200 focus-within:outline focus-within:outline-2 focus-within:outline-sd-blue focus-within:outline-offset-2">
          <div className="flex items-center gap-3 mb-2">
            <span className="inline-flex items-center justify-center w-2 h-2 rounded-full bg-sd-purple"></span>
            <div className="text-sm font-medium text-[#f1f5f9]">Total Margin Recovered</div>
          </div>
          <div className="text-3xl font-bold text-sd-purple">Rs {(analytics.total_margin_recovered / 1000).toFixed(1)}K</div>
          <div className="text-xs text-[#cbd5e1] mt-2">This period</div>
        </div>
      </div>

      <div className="bg-sd-secondary rounded-lg p-6 mb-8 hover:shadow-[0_8px_24px_rgba(6,182,212,0.15)] transition-shadow duration-200">
        <h2 className="text-lg font-semibold text-white mb-4">RTO Improvement Trend</h2>
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-sd-secondary rounded-lg p-6 hover:shadow-[0_8px_24px_rgba(6,182,212,0.15)] transition-shadow duration-200">
          <h2 className="text-lg font-semibold text-white mb-4">Intervention Effectiveness</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={interventionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="name" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155' }} />
              <Legend />
              <Bar dataKey="success" fill="#3b82f6" name="Success Rate (%)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-sd-secondary rounded-lg p-6 hover:shadow-[0_8px_24px_rgba(6,182,212,0.15)] transition-shadow duration-200">
          <h2 className="text-lg font-semibold text-white mb-4">Seller Retention by Group</h2>
          <p className="text-xs text-[#cbd5e1] mb-4">Retention rates for each seller cohort</p>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <div className="text-sm font-medium text-[#f1f5f9]">Using Interventions</div>
                <div className="text-lg font-bold text-risk-green">{(analytics.seller_retention_intervened * 100).toFixed(0)}%</div>
              </div>
              <div className="w-full bg-sd-darker rounded-full h-4">
                <div
                  className="bg-risk-green h-4 rounded-full"
                  style={{ width: `${analytics.seller_retention_intervened * 100}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <div className="text-sm font-medium text-[#f1f5f9]">Not Using Interventions</div>
                <div className="text-lg font-bold text-risk-red">{(analytics.seller_retention_non_intervened * 100).toFixed(0)}%</div>
              </div>
              <div className="w-full bg-sd-darker rounded-full h-4">
                <div
                  className="bg-risk-red h-4 rounded-full"
                  style={{ width: `${analytics.seller_retention_non_intervened * 100}%` }}
                />
              </div>
            </div>
            <div className="text-sm text-white pt-4 border-t border-sd-tertiary">
              <div className="font-semibold text-sd-cyan">
                Retention Lift: +{((analytics.seller_retention_intervened - analytics.seller_retention_non_intervened) * 100).toFixed(0)} percentage points
              </div>
              <div className="text-[#cbd5e1] mt-1 text-xs">Sellers with interventions are {Math.round((analytics.seller_retention_intervened / analytics.seller_retention_non_intervened - 1) * 100)}% more likely to stay</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-sd-secondary rounded-lg p-8 hover:shadow-[0_8px_24px_rgba(6,182,212,0.15)] transition-shadow duration-200 border-t-4 border-sd-cyan">
        <h2 className="text-2xl font-bold text-sd-cyan mb-4">ROI Estimate</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div>
            <div className="text-sm text-[#cbd5e1] mb-2">Current Scale</div>
            <div className="text-3xl font-bold text-white">342</div>
            <div className="text-sm text-[#cbd5e1]">orders per week</div>
          </div>
          <div>
            <div className="text-sm text-[#cbd5e1] mb-2">Margin Recovery per Week</div>
            <div className="text-3xl font-bold text-white">Rs 23.65K</div>
            <div className="text-sm text-[#cbd5e1]">at 14% RTO reduction</div>
          </div>
          <div>
            <div className="text-sm text-[#cbd5e1] mb-2">Monthly Impact</div>
            <div className="text-3xl font-bold text-white">Rs 94.6K</div>
            <div className="text-sm text-[#cbd5e1]">at current scale</div>
          </div>
        </div>
        <p className="text-sm text-[#cbd5e1] mt-6">
          Forecast: At 10% monthly scale growth and 50% reduction in COD return rates through predictive interventions, ShopDeck can expect Rs 235K+ monthly margin recovery within 6 months.
        </p>
      </div>
    </div>
  )
}
