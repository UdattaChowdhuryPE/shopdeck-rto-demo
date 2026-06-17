'use client'

import { useState, useMemo } from 'react'
import { generateMockOrders } from '@/data/fixtures'
import Link from 'next/link'

export default function OrderDetail({ params }: { params: { id: string } }) {
  const allOrders = useMemo(() => generateMockOrders(), [])
  const order = allOrders.find(o => o.id === params.id)
  const [actionApplied, setActionApplied] = useState(false)
  const [showBulkDialog, setShowBulkDialog] = useState(false)

  if (!order) {
    return (
      <main className="p-4 md:p-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#f1f5f9]">Order not found</h1>
          <Link href="/orders" className="text-sd-cyan hover:text-sd-blue mt-4 inline-block transition-colors">
            Back to Orders
          </Link>
        </div>
      </main>
    )
  }

  const getRiskColor = (score: number) => {
    if (score < 30) return { circle: 'bg-risk-green', text: 'text-risk-green', bg: 'bg-[#065f46]' }
    if (score < 70) return { circle: 'bg-risk-yellow', text: 'text-risk-yellow', bg: 'bg-[#78350f]' }
    return { circle: 'bg-risk-red', text: 'text-risk-red', bg: 'bg-[#7f1d1d]' }
  }

  const getRiskLabel = (score: number) => {
    if (score < 30) return 'LOW RISK'
    if (score < 70) return 'MEDIUM RISK'
    return 'HIGH RISK'
  }

  const riskColor = getRiskColor(order.return_risk_score)

  return (
    <main className="p-4 md:p-8">
      <Link href="/orders" className="text-sd-cyan hover:text-sd-blue mb-6 inline-block transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sd-blue rounded px-2 py-1">
        ← Back to Orders
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Order Header */}
          <div className="bg-sd-secondary rounded-lg p-6 mb-6 hover:shadow-[0_8px_24px_rgba(6,182,212,0.15)] transition-shadow duration-200">
            <h1 className="text-2xl font-bold text-[#f1f5f9] mb-4">{order.id}</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-[#cbd5e1]">Seller</div>
                <div className="text-lg font-medium text-white">{order.seller_name}</div>
              </div>
              <div>
                <div className="text-sm text-[#cbd5e1]">Product</div>
                <div className="text-lg font-medium text-white">{order.product_name}</div>
              </div>
              <div>
                <div className="text-sm text-[#cbd5e1]">Price</div>
                <div className="text-lg font-medium text-white">₹{order.price.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-sm text-[#cbd5e1]">Payment Method</div>
                <div className="text-lg font-medium text-white">{order.payment_method.toUpperCase()}</div>
              </div>
            </div>
          </div>

          {/* Risk Score */}
          <div className="bg-sd-secondary rounded-lg p-6 mb-6 hover:shadow-[0_8px_24px_rgba(6,182,212,0.15)] transition-shadow duration-200">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
              <h2 className="text-xl font-semibold text-[#f1f5f9]">Risk Assessment</h2>
              <div className={`text-4xl font-bold px-6 py-3 rounded-lg ${riskColor.bg} ${riskColor.text}`}>
                {order.return_risk_score}/100
              </div>
            </div>
            <div className={`text-lg font-semibold mb-6 px-4 py-2 rounded-lg ${riskColor.bg} ${riskColor.text} inline-flex items-center gap-2`}>
              <span className={`inline-flex items-center justify-center w-2 h-2 rounded-full ${riskColor.circle}`}></span>
              {getRiskLabel(order.return_risk_score)}
            </div>

            {/* Risk Breakdown */}
            <div className="mt-6">
              <h3 className="font-semibold text-[#f1f5f9] mb-4">Risk Factors</h3>
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                  <span className="text-[#cbd5e1]">Product Category ({order.product_category})</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-sd-darker rounded-full h-2">
                      <div
                        className="bg-sd-cyan h-2 rounded-full"
                        style={{ width: `${(order.risk_factors.category_baseline / 50) * 100}%` }}
                      />
                    </div>
                    <span className="font-medium text-[#f1f5f9]">+{order.risk_factors.category_baseline}</span>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                  <span className="text-[#cbd5e1]">Geography (Tier: {order.buyer_tier})</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-sd-darker rounded-full h-2">
                      <div
                        className="bg-sd-purple h-2 rounded-full"
                        style={{ width: `${(order.risk_factors.geography_adjustment / 50) * 100}%` }}
                      />
                    </div>
                    <span className="font-medium text-[#f1f5f9]">+{order.risk_factors.geography_adjustment}</span>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                  <span className="text-[#cbd5e1]">Payment Method ({order.payment_method.toUpperCase()})</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-sd-darker rounded-full h-2">
                      <div
                        className="bg-risk-red h-2 rounded-full"
                        style={{ width: `${Math.max(0, order.risk_factors.payment_method_adjustment / 50) * 100}%` }}
                      />
                    </div>
                    <span className="font-medium text-[#f1f5f9]">{order.risk_factors.payment_method_adjustment > 0 ? '+' : ''}{order.risk_factors.payment_method_adjustment}</span>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                  <span className="text-[#cbd5e1]">Price Point (₹{order.price.toLocaleString()})</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-sd-darker rounded-full h-2">
                      <div
                        className="bg-sd-blue h-2 rounded-full"
                        style={{ width: `${(order.risk_factors.price_adjustment / 50) * 100}%` }}
                      />
                    </div>
                    <span className="font-medium text-[#f1f5f9]">+{order.risk_factors.price_adjustment}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recommended Intervention */}
          <div className={`border-t-4 border-risk-green rounded-lg p-6 bg-sd-secondary hover:shadow-[0_8px_24px_rgba(6,182,212,0.15)] transition-shadow duration-200`}>
            <h2 className="text-lg font-semibold text-[#f1f5f9] mb-4">Recommended Intervention</h2>
            <div className="space-y-4">
              <div>
                <div className="text-sm font-medium text-[#cbd5e1]">Action</div>
                <div className="text-lg font-semibold text-white">{order.recommended_intervention.description}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-[#cbd5e1]">Reason</div>
                <div className="text-[#cbd5e1]">{order.recommended_intervention.reason}</div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <div className="bg-sd-darker p-3 rounded-lg border border-sd-tertiary">
                  <div className="text-sm text-[#cbd5e1]">RTO Reduction</div>
                  <div className="text-2xl font-bold text-risk-green">{order.recommended_intervention.impact.rto_reduction_percent}%</div>
                </div>
                <div className="bg-sd-darker p-3 rounded-lg border border-sd-tertiary">
                  <div className="text-sm text-[#cbd5e1]">Margin Recovery</div>
                  <div className="text-2xl font-bold text-risk-green">₹{order.recommended_intervention.impact.margin_recovery_rupees}</div>
                </div>
              </div>
              <div className="pt-4 border-t border-sd-tertiary">
                <div className="text-sm text-[#cbd5e1]">Success Rate: <span className="font-semibold text-[#f1f5f9]">{Math.round(order.recommended_intervention.success_rate * 100)}%</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Actions */}
        <div>
          <div className="bg-sd-secondary rounded-lg p-6 hover:shadow-[0_8px_24px_rgba(6,182,212,0.15)] transition-shadow duration-200 lg:sticky lg:top-8">
            <h3 className="text-lg font-semibold text-[#f1f5f9] mb-4">Actions</h3>
            <div className="space-y-3">
              <button
                onClick={() => setActionApplied(true)}
                className="w-full px-4 py-2 bg-risk-green text-white rounded-lg hover:bg-[#059669] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sd-blue font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                disabled={actionApplied}
              >
                {actionApplied ? '✓ Applied' : 'Apply Intervention'}
              </button>
              <button
                onClick={() => setShowBulkDialog(true)}
                className="w-full px-4 py-2 bg-sd-blue text-white rounded-lg hover:bg-[#2563eb] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sd-cyan font-medium transition-colors"
              >
                Apply to Similar Orders
              </button>
              <button className="w-full px-4 py-2 border border-sd-tertiary text-[#cbd5e1] rounded-lg hover:bg-sd-darker hover:text-[#f1f5f9] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sd-blue font-medium transition-colors">
                Dismiss
              </button>
            </div>

            {actionApplied && (
              <div className="mt-4 p-4 bg-[#065f46] border border-risk-green rounded-lg">
                <div className="text-sm font-medium text-risk-green">✓ Intervention applied successfully</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bulk Action Dialog */}
      {showBulkDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-sd-secondary rounded-lg shadow-lg p-6 max-w-md">
            <h2 className="text-lg font-semibold text-[#f1f5f9] mb-4">Apply to Similar Orders</h2>
            <p className="text-[#cbd5e1] mb-4">Found 23 other Fashion orders from tier-2 cities with COD payment. Apply this intervention to all?</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setShowBulkDialog(false)}
                className="flex-1 px-4 py-2 border border-sd-tertiary text-[#cbd5e1] rounded-lg hover:bg-sd-darker hover:text-[#f1f5f9] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sd-blue transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setActionApplied(true)
                  setShowBulkDialog(false)
                }}
                className="flex-1 px-4 py-2 bg-risk-green text-white rounded-lg hover:bg-[#059669] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sd-blue transition-colors"
              >
                Apply to 23 Orders
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
