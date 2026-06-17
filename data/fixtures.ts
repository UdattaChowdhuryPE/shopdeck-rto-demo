export interface Order {
  id: string;
  seller_id: string;
  seller_name: string;
  product_name: string;
  product_category: 'fashion' | 'home_decor' | 'jewelry';
  price: number;
  quantity: number;
  buyer_pin_code: string;
  buyer_tier: 'metro' | 'tier2' | 'tier3';
  payment_method: 'cod' | 'prepaid';
  seller_nps: number;
  created_at_timestamp: number;
  return_risk_score: number;
  risk_factors: {
    category_baseline: number;
    geography_adjustment: number;
    payment_method_adjustment: number;
    price_adjustment: number;
  };
  recommended_intervention: Intervention;
  status: 'pending' | 'applied' | 'dismissed';
}

export interface Intervention {
  id: string;
  type: 'switch_shipping' | 'flag_qc' | 'pause_sku' | 'monitor_seller';
  description: string;
  reason: string;
  impact: {
    rto_reduction_percent: number;
    margin_recovery_rupees: number;
  };
  success_rate: number;
}

export interface Rule {
  id: string;
  name: string;
  trigger: string;
  threshold: number;
  lookback_days: number;
  action: string;
  enabled: boolean;
  applied_count: number;
}

const interventions: { [key: string]: Intervention } = {
  'switch_shipping': {
    id: 'int-1',
    type: 'switch_shipping',
    description: 'Switch to prepaid shipping',
    reason: 'Reduces reverse logistics cost by ₹420',
    impact: { rto_reduction_percent: 10, margin_recovery_rupees: 420 },
    success_rate: 0.52,
  },
  'flag_qc': {
    id: 'int-2',
    type: 'flag_qc',
    description: 'Flag SKU for QC check',
    reason: 'Catches product quality issues before shipment',
    impact: { rto_reduction_percent: 8, margin_recovery_rupees: 280 },
    success_rate: 0.68,
  },
  'pause_sku': {
    id: 'int-3',
    type: 'pause_sku',
    description: 'Pause SKU temporarily',
    reason: 'Removes high-return item, prevents future RTOs',
    impact: { rto_reduction_percent: 15, margin_recovery_rupees: 650 },
    success_rate: 0.61,
  },
  'monitor_seller': {
    id: 'int-4',
    type: 'monitor_seller',
    description: 'Monitor seller performance',
    reason: 'Track seller behavior and RTO patterns',
    impact: { rto_reduction_percent: 5, margin_recovery_rupees: 150 },
    success_rate: 0.45,
  },
};

const sellers = [
  { id: 'SELLER-5429', name: 'FashionHub Tier-2', nps: 7 },
  { id: 'SELLER-5430', name: 'HomeDecor Express', nps: 8 },
  { id: 'SELLER-5431', name: 'Jewelry Artisans', nps: 6 },
  { id: 'SELLER-5432', name: 'Ethnic Boutique', nps: 9 },
  { id: 'SELLER-5433', name: 'Modern Living', nps: 5 },
];

const products = [
  { category: 'fashion', names: ['Ethnic Kurta', 'Casual Dress', 'Designer Saree', 'T-Shirt', 'Lehenga'] },
  { category: 'home_decor', names: ['Wall Art', 'Table Lamp', 'Cushion Set', 'Door Mat', 'Wall Shelf'] },
  { category: 'jewelry', names: ['Gold Earrings', 'Silver Ring', 'Beaded Necklace', 'Bracelet Set', 'Pendant'] },
];

const tierPins = {
  metro: ['560001', '400001', '110001', '700001', '411001'],
  tier2: ['560001', '700001', '411001', '500001', '380001'],
  tier3: ['560002', '700002', '411002', '500002', '380002'],
};

function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export function generateMockOrders(): Order[] {
  const orders: Order[] = [];
  const baseTime = 1718611200000; // Fixed: June 17, 2024
  
  for (let i = 0; i < 500; i++) {
    const seed = i * 12345;
    const productCat = ['fashion', 'home_decor', 'jewelry'][Math.floor(seededRandom(seed) * 3)] as 'fashion' | 'home_decor' | 'jewelry';
    const buyer_tier = ['metro', 'tier2', 'tier3'][Math.floor(seededRandom(seed + 1) * 3)] as 'metro' | 'tier2' | 'tier3';
    const productList = products.find(p => p.category === productCat)!;
    const seller = sellers[Math.floor(seededRandom(seed + 2) * sellers.length)];
    
    const order: Order = {
      id: `ORD-2026-${String(i + 1).padStart(6, '0')}`,
      seller_id: seller.id,
      seller_name: seller.name,
      product_name: productList.names[Math.floor(seededRandom(seed + 3) * productList.names.length)],
      product_category: productCat,
      price: Math.floor(seededRandom(seed + 4) * 4500) + 500,
      quantity: 1,
      buyer_pin_code: tierPins[buyer_tier][Math.floor(seededRandom(seed + 5) * tierPins[buyer_tier].length)],
      buyer_tier,
      payment_method: seededRandom(seed + 6) > 0.4 ? 'cod' : 'prepaid',
      seller_nps: Math.floor(seededRandom(seed + 7) * 10) + 1,
      created_at_timestamp: baseTime - Math.floor(seededRandom(seed + 8) * 7 * 24 * 60 * 60 * 1000),
      return_risk_score: 0,
      risk_factors: {
        category_baseline: 0,
        geography_adjustment: 0,
        payment_method_adjustment: 0,
        price_adjustment: 0,
      },
      recommended_intervention: interventions['switch_shipping'],
      status: 'pending',
    };
    
    // Calculate risk score
    const catBase = productCat === 'fashion' ? 25 : productCat === 'jewelry' ? 22 : 18;
    const geoAdj = buyer_tier === 'metro' ? 0 : buyer_tier === 'tier2' ? 20 : 35;
    const pmtAdj = order.payment_method === 'cod' ? 20 : -10;
    const priceAdj = order.price > 3000 ? 14 : 5;
    
    order.risk_factors = {
      category_baseline: catBase,
      geography_adjustment: geoAdj,
      payment_method_adjustment: pmtAdj,
      price_adjustment: priceAdj,
    };
    
    order.return_risk_score = Math.min(100, Math.max(0, catBase + geoAdj + pmtAdj + priceAdj));
    
    if (order.return_risk_score > 70) {
      order.recommended_intervention = interventions['switch_shipping'];
    } else if (order.return_risk_score > 50) {
      order.recommended_intervention = interventions['flag_qc'];
    } else if (order.return_risk_score > 30) {
      order.recommended_intervention = interventions['monitor_seller'];
    } else {
      order.recommended_intervention = interventions['flag_qc'];
    }
    
    orders.push(order);
  }
  
  return orders;
}

export function getMockRules(): Rule[] {
  return [
    {
      id: 'rule-1',
      name: 'Pause SKU if RTO spike detected',
      trigger: 'rto_spike',
      threshold: 40,
      lookback_days: 7,
      action: 'pause_sku',
      enabled: true,
      applied_count: 36,
    },
    {
      id: 'rule-2',
      name: 'Flag for QC if price >₹4000 AND tier-3 location',
      trigger: 'high_price_and_tier3',
      threshold: 4000,
      lookback_days: 0,
      action: 'flag_qc',
      enabled: true,
      applied_count: 84,
    },
    {
      id: 'rule-3',
      name: 'Switch to prepaid if risk score >70',
      trigger: 'high_risk_score',
      threshold: 70,
      lookback_days: 0,
      action: 'switch_shipping',
      enabled: true,
      applied_count: 127,
    },
    {
      id: 'rule-4',
      name: 'Monitor seller if NPS <5',
      trigger: 'low_nps',
      threshold: 5,
      lookback_days: 30,
      action: 'monitor_seller',
      enabled: false,
      applied_count: 0,
    },
  ];
}

export function getMockAnalytics() {
  return {
    period: 'Last 8 weeks',
    orders_with_interventions: 247,
    rto_rate_intervened: 0.142,
    rto_rate_non_intervened: 0.281,
    rto_reduction_points: 14,
    total_margin_recovered: 47300,
    seller_retention_intervened: 0.94,
    seller_retention_non_intervened: 0.71,
    interventions_by_type: {
      switch_shipping: { count: 127, success_rate: 0.52 },
      flag_qc: { count: 84, success_rate: 0.68 },
      pause_sku: { count: 36, success_rate: 0.61 },
    },
    weekly_rto_trend: [
      { week: 'Week 1', intervened: 28, non_intervened: 28 },
      { week: 'Week 2', intervened: 26, non_intervened: 28 },
      { week: 'Week 3', intervened: 24, non_intervened: 27 },
      { week: 'Week 4', intervened: 22, non_intervened: 27 },
      { week: 'Week 5', intervened: 19, non_intervened: 28 },
      { week: 'Week 6', intervened: 17, non_intervened: 28 },
      { week: 'Week 7', intervened: 15, non_intervened: 28 },
      { week: 'Week 8', intervened: 14.2, non_intervened: 28.1 },
    ],
  };
}
