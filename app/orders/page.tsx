'use client'

import { useState, useMemo } from 'react'
import { generateMockOrders } from '@/data/fixtures'
import Link from 'next/link'

export default function OrdersPage() {
  const allOrders = useMemo(() => generateMockOrders(), [])
  const [filter, setFilter] = useState('all')
  const [sortBy, setSortBy] = useState('risk-desc')
  const [page, setPage] = useState(1)
  const itemsPerPage = 20

  const filteredOrders = useMemo(() => {
    let filtered = allOrders
    if (filter === 'green') {
      filtered = filtered.filter(o => o.return_risk_score < 30)
    } else if (filter === 'yellow') {
      filtered = filtered.filter(o => o.return_risk_score >= 30 && o.return_risk_score < 70)
    } else if (filter === 'red') {
      filtered = filtered.filter(o => o.return_risk_score >= 70)
    }
    return filtered
  }, [allOrders, filter])

  const sortedOrders = useMemo(() => {
    let sorted = [...filteredOrders]
    if (sortBy === 'risk-desc') {
      sorted.sort((a, b) => b.return_risk_score - a.return_risk_score)
    } else if (sortBy === 'risk-asc') {
      sorted.sort((a, b) => a.return_risk_score - b.return_risk_score)
    } else if (sortBy === 'price-desc') {
      sorted.sort((a, b) => b.price - a.price)
    } else if (sortBy === 'price-asc') {
      sorted.sort((a, b) => a.price - b.price)
    }
    return sorted
  }, [filteredOrders, sortBy])

  const paginatedOrders = useMemo(() => {
    const start = (page - 1) * itemsPerPage
    return sortedOrders.slice(start, start + itemsPerPage)
  }, [sortedOrders, page])

  const maxPages = Math.ceil(sortedOrders.length / itemsPerPage)

  // Color swatches are now inline in the map for better token usage

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-3xl font-bold text-sd-cyan mb-6">Order Risk Assessment</h1>

      <div className="bg-sd-secondary rounded-lg p-6 mb-6 hover:shadow-[0_8px_24px_rgba(6,182,212,0.15)] transition-shadow duration-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="risk-filter" className="block text-sm font-medium text-[#f1f5f9] mb-2">Filter by Risk Level</label>
            <select
              id="risk-filter"
              value={filter}
              onChange={(e) => { setFilter(e.target.value); setPage(1) }}
              className="w-full px-3 py-2 border border-sd-tertiary rounded-lg bg-sd-dark text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-sd-blue focus-visible:outline-offset-2 transition-colors"
            >
              <option value="all">All Orders</option>
              <option value="green">Low Risk (less than 30)</option>
              <option value="yellow">Medium Risk (30-70)</option>
              <option value="red">High Risk (greater than 70)</option>
            </select>
          </div>
          <div>
            <label htmlFor="sort-by" className="block text-sm font-medium text-[#f1f5f9] mb-2">Sort By</label>
            <select
              id="sort-by"
              value={sortBy}
              onChange={(e) => { setSortBy(e.target.value); setPage(1) }}
              className="w-full px-3 py-2 border border-sd-tertiary rounded-lg bg-sd-dark text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-sd-blue focus-visible:outline-offset-2 transition-colors"
            >
              <option value="risk-desc">Risk Score (High to Low)</option>
              <option value="risk-asc">Risk Score (Low to High)</option>
              <option value="price-desc">Price (High to Low)</option>
              <option value="price-asc">Price (Low to High)</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-sd-secondary rounded-lg overflow-x-auto">
        <table className="w-full">
          <thead className="bg-sd-darker border-b border-sd-tertiary">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-[#f1f5f9]">Order ID</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-[#f1f5f9]">Seller</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-[#f1f5f9]">Product</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-[#f1f5f9]">Price</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-[#f1f5f9]">Risk Score</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-[#f1f5f9]">Intervention</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-[#f1f5f9]">Status</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-[#f1f5f9]">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedOrders.map((order) => (
              <tr key={order.id} className="border-b border-sd-tertiary hover:bg-sd-darker hover:shadow-[0_8px_24px_rgba(6,182,212,0.15)] transition-all">
                <td className="px-6 py-3 text-sm text-[#f1f5f9] font-mono">{order.id}</td>
                <td className="px-6 py-3 text-sm text-[#cbd5e1]">{order.seller_name}</td>
                <td className="px-6 py-3 text-sm text-[#cbd5e1]">{order.product_name}</td>
                <td className="px-6 py-3 text-sm text-[#f1f5f9]">Rs {order.price.toLocaleString()}</td>
                <td className="px-6 py-3 text-sm">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    order.return_risk_score < 30 
                      ? 'bg-[#065f46] text-risk-green' 
                      : order.return_risk_score < 70 
                      ? 'bg-[#78350f] text-risk-yellow'
                      : 'bg-[#7f1d1d] text-risk-red'
                  }`}>
                    {order.return_risk_score}/100
                  </span>
                </td>
                <td className="px-6 py-3 text-sm text-[#cbd5e1]">{order.recommended_intervention.description}</td>
                <td className="px-6 py-3 text-sm">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-sd-blue text-white">
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-3 text-sm">
                  <Link href={`/orders/${order.id}`} className="text-sd-cyan hover:text-sd-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sd-blue font-medium transition-colors rounded px-1">
                    Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm text-[#cbd5e1]">
          Showing {(page - 1) * itemsPerPage + 1} to {Math.min(page * itemsPerPage, sortedOrders.length)} of {sortedOrders.length}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setPage(Math.max(1, page - 1))}
            disabled={page === 1}
            className="px-4 py-2 border border-sd-tertiary rounded-lg text-sm text-[#cbd5e1] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-sd-darker hover:text-[#f1f5f9] focus-visible:outline focus-visible:outline-2 focus-visible:outline-sd-blue focus-visible:outline-offset-2 transition-colors"
          >
            Previous
          </button>
          <button
            onClick={() => setPage(Math.min(maxPages, page + 1))}
            disabled={page === maxPages}
            className="px-4 py-2 border border-sd-tertiary rounded-lg text-sm text-[#cbd5e1] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-sd-darker hover:text-[#f1f5f9] focus-visible:outline focus-visible:outline-2 focus-visible:outline-sd-blue focus-visible:outline-offset-2 transition-colors"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}
