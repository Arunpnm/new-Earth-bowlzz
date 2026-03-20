import { Routes, Route } from 'react-router-dom';
import SuperAdmin from './superadmin';
import { useState, useEffect, useRef } from 'react';

// ════════════════════════════════════════════════
// 📝 EDIT YOUR BRAND DETAILS HERE
// ════════════════════════════════════════════════
const BRAND = {
  name: 'Earth Bowlzz',
  tagline: 'Health · Wellness · Nourishment',
  address: 'Earth Bowlzz, Chennai, City – 600048',
  phone: '+91 7411628282',
  whatsapp: '7411628282',
  email: 'hello@earthbowlzz.com',
  upiId: 'earthbowlzz@upi',
  upiName: 'Earth Bowlzz',
  instagram: 'https://instagram.com/earthbowlzz',
  facebook: 'https://facebook.com/earthbowlzz',
  youtube: 'https://youtube.com/@earthbowlzz',
  twitter: 'https://twitter.com/earthbowlzz',
  dispatchTime: '8:00 AM',
  offDay: 'Sunday',
};

const PACKS = [
  {
    id: 'glow',
    name: 'Glow Pack',
    goal: 'Weight Loss',
    emoji: '💚',
    color: '#4ade80',
    dark: '#052e16',
    tagline: 'Burn clean. Glow naturally.',
    desc: 'High-fibre, low-oil meals designed for steady, sustainable fat loss without starving.',
    macros: { cal: '~1,200', protein: '~60g', carbs: '~155g', fat: '~32g' },
    perKg: '28–30 cal/kg body weight',
    highlights: [
      'Low-oil cooking',
      'High fibre & satiety',
      'Zero refined sugar',
      'Portion-controlled',
    ],
    meals: [
      'Oats porridge + fruits',
      'Lemon quinoa bowl',
      'Ragi dosa + sambar',
      'Dal soup + chapati',
    ],
    prices: {
      'veg-indian': { '7d-1': 999, '7d-2': 1699, '28d-1': 3499, '28d-2': 5999 },
      'veg-fusion': {
        '7d-1': 1099,
        '7d-2': 1899,
        '28d-1': 3799,
        '28d-2': 6499,
      },
      'nonveg-indian': {
        '7d-1': 1199,
        '7d-2': 1999,
        '28d-1': 4199,
        '28d-2': 6999,
      },
      'nonveg-fusion': {
        '7d-1': 1299,
        '7d-2': 2199,
        '28d-1': 4499,
        '28d-2': 7499,
      },
    },
  },
  {
    id: 'balance',
    name: 'Balance Pack',
    goal: 'Balanced / Maintain',
    emoji: '💛',
    color: '#fbbf24',
    dark: '#422006',
    tagline: 'Steady energy. Every single day.',
    desc: 'Perfectly calibrated macros for people who want to maintain weight, feel great and stay consistent.',
    macros: { cal: '~1,650', protein: '~78g', carbs: '~207g', fat: '~41g' },
    perKg: '33–35 cal/kg body weight',
    highlights: [
      'Balanced macros',
      'Energising meals',
      'Indian + Fusion variety',
      'Seasonal ingredients',
    ],
    meals: [
      'Buddha bowl + curd',
      'Jeera rice + rajma',
      'Grilled paneer wrap',
      'Quinoa upma + salad',
    ],
    prices: {
      'veg-indian': {
        '7d-1': 1099,
        '7d-2': 1899,
        '28d-1': 3999,
        '28d-2': 6999,
      },
      'veg-fusion': {
        '7d-1': 1199,
        '7d-2': 1999,
        '28d-1': 4299,
        '28d-2': 7499,
      },
      'nonveg-indian': {
        '7d-1': 1299,
        '7d-2': 2199,
        '28d-1': 4499,
        '28d-2': 7999,
      },
      'nonveg-fusion': {
        '7d-1': 1399,
        '7d-2': 2399,
        '28d-1': 4799,
        '28d-2': 8499,
      },
    },
  },
  {
    id: 'power',
    name: 'Power Pack',
    goal: 'Muscle Build / Gain',
    emoji: '❤️',
    color: '#f87171',
    dark: '#450a0a',
    tagline: 'Fuel the muscle. Feed the grind.',
    desc: 'High-calorie, high-protein meals with complex carbs — designed for active individuals building strength.',
    macros: { cal: '~2,400', protein: '~108g', carbs: '~290g', fat: '~80g' },
    perKg: '38–40 cal/kg body weight',
    highlights: [
      '~40 cal/kg body weight',
      '2× protein per meal',
      'Complex carb loading',
      'Post-workout friendly',
    ],
    meals: [
      'Egg dosa + milkshake',
      'Chicken biryani + raita',
      'Paneer butter masala + rice',
      'Mutton stew + brown rice',
    ],
    prices: {
      'veg-indian': {
        '7d-1': 1299,
        '7d-2': 2199,
        '28d-1': 4499,
        '28d-2': 7999,
      },
      'veg-fusion': {
        '7d-1': 1399,
        '7d-2': 2399,
        '28d-1': 4799,
        '28d-2': 8499,
      },
      'nonveg-indian': {
        '7d-1': 1499,
        '7d-2': 2599,
        '28d-1': 5499,
        '28d-2': 9999,
      },
      'nonveg-fusion': {
        '7d-1': 1599,
        '7d-2': 2799,
        '28d-1': 5999,
        '28d-2': 10999,
      },
    },
  },
];

const DURATIONS = [
  {
    id: '7d',
    label: '7-Day Plan',
    sub: 'Weekly',
    days: 7,
    pauses: 0,
    swaps: 2,
  },
  {
    id: '28d',
    label: '28-Day Plan',
    sub: 'Monthly',
    days: 28,
    pauses: 6,
    swaps: 4,
  },
];

const MEAL_COUNTS = [
  { id: '1', label: '1 Bowl / Day', desc: 'Lunch or Dinner — your call' },
  { id: '2', label: '2 Bowls / Day', desc: 'Lunch + Dinner, both covered' },
];

const DIETS = [
  'Veg · Indian',
  'Veg · Fusion',
  'Non-Veg · Indian',
  'Non-Veg · Fusion',
];
const MEDICAL = [
  'None',
  'Diabetes',
  'Thyroid',
  'PCOS / PCOD',
  'High Blood Pressure',
  'Other',
];

const NAV = ['Home', 'Packs', 'How It Works', 'Menu', 'Reviews', 'Find Us'];

const SEVEN_BOWLS = [
  {
    day: 'Mon',
    name: 'The Morning Glow Bowl',
    vibe: 'Refresh & Reset',
    emoji: '🌅',
    color: '#e8a020',
    ingredients: 'Oats, chia, apple, cinnamon, yogurt drizzle',
    tagline: 'Start the week light and bright.',
    price: 189,
  },
  {
    day: 'Tue',
    name: 'Protein Power Bowl',
    vibe: 'Focus & Fuel',
    emoji: '💪',
    color: '#4ade80',
    ingredients: 'Grilled chicken/tofu, quinoa, sprouts, mint',
    tagline: 'Strong bites for strong minds.',
    price: 229,
  },
  {
    day: 'Wed',
    name: 'The Green Goddess Bowl',
    vibe: 'Calm & Cleanse',
    emoji: '🌿',
    color: '#3a8a5f',
    ingredients: 'Spinach, kale, cucumber, lime, olive oil',
    tagline: 'Midweek detox, EarthBowlzz style.',
    price: 199,
  },
  {
    day: 'Thu',
    name: 'Roots & Grains Bowl',
    vibe: 'Ground & Grateful',
    emoji: '🌾',
    color: '#8a6840',
    ingredients: 'Brown rice, beetroot, sweet potato, herbs',
    tagline: 'Get rooted before the weekend rush.',
    price: 209,
  },
  {
    day: 'Fri',
    name: 'Fusion Fiesta Bowl',
    vibe: 'Chill & Cheer',
    emoji: '🎉',
    color: '#d05828',
    ingredients: 'Paneer/chicken tikka, couscous, bell peppers',
    tagline: 'Global taste, Indian heart.',
    price: 249,
  },
  {
    day: 'Sat',
    name: 'Colorburst Bowl',
    vibe: 'Energize & Enjoy',
    emoji: '🌈',
    color: '#b83878',
    ingredients: 'Seasonal fruits, nuts, mint dressing',
    tagline: 'Eat your colors. Feel your power.',
    price: 219,
  },
  {
    day: 'Sun',
    name: 'The Soul Bowl',
    vibe: 'Rest & Restore',
    emoji: '🧡',
    color: '#b85828',
    ingredients: 'Warm lentil stew, turmeric rice, ghee',
    tagline: 'Comfort that hugs from the inside.',
    price: 239,
  },
];

const REVIEWS = [
  {
    name: 'Sneha R.',
    stars: 5,
    text: "Lost 6 kg in 28 days on the Glow Pack! The food is actually delicious — I didn't feel like I was dieting at all.",
    pack: 'Glow Pack',
    city: 'Chennai',
  },
  {
    name: 'Arjun M.',
    stars: 5,
    text: 'Power Pack is exactly what I needed post-gym. High protein, great taste, and the 8 AM delivery fits perfectly into my morning.',
    pack: 'Power Pack',
    city: 'Bangalore',
  },
  {
    name: 'Priya K.',
    stars: 5,
    text: "The Balance Pack is just perfect for busy weekdays. I don't have to think about food — it just shows up, fresh and hot.",
    pack: 'Balance Pack',
    city: 'Mumbai',
  },
  {
    name: 'Rohan D.',
    stars: 5,
    text: 'Being able to pause for 6 days during my trip was a game changer. Came back and continued the plan without wasting a single meal!',
    pack: 'Power Pack',
    city: 'Hyderabad',
  },
];

const fmt = (n: number) => `₹${Number(n).toLocaleString('en-IN')}`;
const qr = (data: string) =>
  `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
    data
  )}`;
const upiLink = (amt: number, note: string) =>
  `upi://pay?pa=${encodeURIComponent(BRAND.upiId)}&pn=${encodeURIComponent(
    BRAND.upiName
  )}&am=${amt}&cu=INR&tn=${encodeURIComponent(note)}`;
const waLink = (msg: string) =>
  `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(msg)}`;

function EarthBowlzzApp() {
  const [activeNav, setActiveNav] = useState('Home');
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeBowl, setActiveBowl] = useState(0);
  const [selectedPack, setSelectedPack] = useState<string | null>(null);
  const [selectedDur, setSelectedDur] = useState('28d');
  const [selectedMeals, setSelectedMeals] = useState('1');
  const [selectedDiet, setSelectedDiet] = useState('Veg · Indian');
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState(1);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    address: '',
    medical: 'None',
    note: '',
    startDate: '',
  });
  const [aiResult, setAiResult] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const refs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const fn = () => {
      setScrolled(window.scrollY > 60);
      const hit = NAV.map((n) => {
        const el = refs.current[n];
        return el ? { n, top: el.getBoundingClientRect().top } : null;
      })
        .filter(Boolean)
        .filter((o: any) => o.top <= 130)
        .pop() as any;
      if (hit) setActiveNav(hit.n);
    };
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const scrollTo = (n: string) => {
    refs.current[n]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMobileOpen(false);
  };

  const pack = PACKS.find((p) => p.id === selectedPack);
  const dietKey = selectedDiet.toLowerCase().includes('non-veg')
    ? selectedDiet.toLowerCase().includes('fusion')
      ? 'nonveg-fusion'
      : 'nonveg-indian'
    : selectedDiet.toLowerCase().includes('fusion')
    ? 'veg-fusion'
    : 'veg-indian';
  const priceKey = `${selectedDur}-${selectedMeals}` as
    | '7d-1'
    | '7d-2'
    | '28d-1'
    | '28d-2';
  const totalPrice = pack ? pack.prices[dietKey]?.[priceKey] ?? 0 : 0;
  const dur = DURATIONS.find((d) => d.id === selectedDur);
  const meals = MEAL_COUNTS.find((m) => m.id === selectedMeals);

  const openCheckout = (packId: string) => {
    setSelectedPack(packId);
    setCheckoutOpen(true);
    setCheckoutStep(1);
  };

  const goToUPI = () => {
    if (!form.name.trim() || !form.phone.trim() || !form.address.trim()) return;
    setCheckoutStep(2);
  };

  const confirmPayment = () => {
    const msg = `🌿 *New Earth Bowlzz Order*\n\n*Pack:* ${pack?.name} (${
      pack?.goal
    })\n*Duration:* ${dur?.label}\n*Meals/Day:* ${
      meals?.label
    }\n*Diet:* ${selectedDiet}\n*Start Date:* ${
      form.startDate || 'ASAP'
    }\n\n*Customer:* ${form.name}\n*Phone:* ${form.phone}\n*Address:* ${
      form.address
    }\n*Medical:* ${form.medical}\n${
      form.note ? `*Note:* ${form.note}` : ''
    }\n\n*Total Paid:* ${fmt(
      totalPrice
    )} (UPI)\n\n_Sent from EarthBowlzz website_`;
    window.open(waLink(msg), '_blank');
    setCheckoutStep(3);
  };

  const getAiTip = async () => {
    if (!pack || aiLoading) return;
    setAiLoading(true);
    setAiResult('');
    const prompt = `You are a nutritionist for Earth Bowlzz, an Indian health food brand.
A customer just subscribed to the "${pack.name}" (${pack.goal}) plan — ${dur?.label}, ${meals?.label}, preference: ${selectedDiet}.
Macros: ${pack.macros.cal} cal/day, ${pack.macros.protein} protein.
Write a short, warm, motivating welcome message (5–7 lines) with:
1. A congratulations line
2. One key nutrition tip for their specific goal
3. What to expect in Week 1
4. One motivational line to close
Use emojis. Keep it personal and warm. Sign off as "— Earth Bowlzz Team 🌿"`;
    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 400,
          messages: [{ role: 'user', content: prompt }],
        }),
      });
      const data = await res.json();
      setAiResult(data.content?.map((b: any) => b.text || '').join('') || '');
    } catch {
      setAiResult('Welcome to Earth Bowlzz! 🌿 Your journey starts now.');
    } finally {
      setAiLoading(false);
    }
  };

  const upiPayUrl = upiLink(
    totalPrice,
    `EarthBowlzz ${pack?.name} ${dur?.label}`
  );

  return (
    <div
      style={{
        fontFamily: "'Nunito',sans-serif",
        background: '#F4EDE2',
        color: '#1a2a1a',
        overflowX: 'hidden',
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,400;1,600&family=Nunito:wght@300;400;600;700;800&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth}
        :root{
          --beige:#F4EDE2;--warm:#ede3d4;--card:#fff9f2;
          --forest:#1e3c24;--green:#4ade80;--gold:#fbbf24;
          --terra:#c45030;--muted:#7a8a6a;--dark:#0c1a0e;
          --border:rgba(30,60,36,.12);
        }
        ::selection{background:#4ade80;color:#0c1a0e}
        .nav{position:fixed;top:0;width:100%;z-index:1000;transition:all .4s;padding:16px 0}
        .nav.up{background:rgba(12,26,14,.97);backdrop-filter:blur(16px);padding:10px 0;box-shadow:0 2px 28px rgba(0,0,0,.25)}
        .nw{max-width:1280px;margin:0 auto;padding:0 40px;display:flex;align-items:center;justify-content:space-between}
        .logo{font-family:'Cormorant Garamond',serif;font-size:1.8rem;color:#F4EDE2;cursor:pointer;line-height:1}
        .logo b{color:var(--gold)}
        .logo small{display:block;font-size:.46rem;letter-spacing:4px;text-transform:uppercase;color:rgba(244,237,226,.45);font-family:'Nunito',sans-serif;margin-top:3px}
        .nl{display:flex;gap:28px;list-style:none}
        .nl button{background:none;border:none;color:rgba(244,237,226,.7);font-family:'Nunito',sans-serif;font-size:.83rem;font-weight:700;cursor:pointer;transition:color .2s;padding:4px 0;border-bottom:2px solid transparent}
        .nl button.on,.nl button:hover{color:var(--gold);border-bottom-color:var(--gold)}
        .cta-nav{background:var(--terra);color:#fff;border:none;padding:9px 22px;border-radius:50px;font-family:'Nunito',sans-serif;font-size:.82rem;font-weight:800;cursor:pointer;transition:all .25s}
        .cta-nav:hover{background:#a83a20;transform:scale(1.04)}
        .ham{display:none;background:none;border:none;cursor:pointer;flex-direction:column;gap:5px;padding:4px}
        .ham span{display:block;width:22px;height:2px;background:var(--beige);border-radius:2px}
        .mnav{display:none;position:fixed;inset:0;background:var(--dark);z-index:999;flex-direction:column;align-items:center;justify-content:center;gap:28px}
        .mnav.show{display:flex}
        .mnav button{background:none;border:none;color:var(--beige);font-family:'Cormorant Garamond',serif;font-size:2rem;cursor:pointer}
        .mnav button:hover{color:var(--gold)}
        .mclose{position:absolute;top:26px;right:30px;background:none;border:none;color:var(--beige);font-size:1.9rem;cursor:pointer}
        .hero{min-height:100vh;background:var(--dark);display:flex;align-items:center;position:relative;overflow:hidden}
        .hbg{position:absolute;inset:0;background:radial-gradient(ellipse 70% 80% at 80% 50%,rgba(74,222,128,.18) 0%,transparent 70%),radial-gradient(ellipse at 20% 80%,rgba(212,160,32,.12) 0%,transparent 50%)}
        .leaf{position:absolute;opacity:.05;animation:drift 12s ease-in-out infinite}
        .l1{top:8%;right:6%;font-size:6rem;animation-delay:0s}
        .l2{top:55%;right:12%;font-size:9rem;animation-delay:3s}
        .l3{top:20%;right:32%;font-size:3.5rem;animation-delay:6s}
        @keyframes drift{0%,100%{transform:translateY(0) rotate(0deg)}33%{transform:translateY(-22px) rotate(5deg)}66%{transform:translateY(12px) rotate(-3deg)}}
        .hi{position:relative;max-width:1280px;margin:0 auto;padding:140px 40px 100px;width:100%;display:grid;grid-template-columns:1.1fr 1fr;gap:60px;align-items:center}
        .htag{display:inline-flex;align-items:center;gap:8px;background:rgba(74,222,128,.15);border:1px solid rgba(74,222,128,.3);color:#4ade80;padding:6px 16px;border-radius:50px;font-size:.72rem;font-weight:800;letter-spacing:2.5px;text-transform:uppercase;margin-bottom:24px;opacity:0;animation:up .7s .2s forwards}
        .hh1{font-family:'Cormorant Garamond',serif;font-size:clamp(3.6rem,6vw,6rem);color:var(--beige);line-height:1.02;margin-bottom:22px;opacity:0;animation:up .7s .4s forwards;font-weight:700}
        .hh1 em{color:var(--gold);font-style:italic}
        .hh1 span{color:#4ade80}
        .hsub{color:rgba(244,237,226,.6);font-size:1.02rem;max-width:430px;line-height:1.8;margin-bottom:36px;opacity:0;animation:up .7s .6s forwards}
        .hbtns{display:flex;gap:13px;flex-wrap:wrap;opacity:0;animation:up .7s .8s forwards}
        .btng{background:#4ade80;color:#0c1a0e;padding:14px 32px;border-radius:50px;border:none;font-family:'Nunito',sans-serif;font-size:.92rem;font-weight:800;cursor:pointer;transition:all .3s}
        .btng:hover{background:#22c55e;transform:translateY(-2px);box-shadow:0 8px 24px rgba(74,222,128,.35)}
        .btno{background:transparent;color:var(--beige);padding:14px 32px;border-radius:50px;border:1.5px solid rgba(244,237,226,.3);font-family:'Nunito',sans-serif;font-size:.92rem;font-weight:700;cursor:pointer;transition:all .3s}
        .btno:hover{border-color:var(--beige);background:rgba(244,237,226,.06)}
        .hpanel{display:flex;flex-direction:column;gap:11px;opacity:0;animation:up .7s .6s forwards}
        .hpcard{background:rgba(244,237,226,.05);border:1px solid rgba(244,237,226,.09);border-radius:15px;padding:14px 18px;display:flex;align-items:center;gap:13px;transition:all .3s}
        .hpcard:hover{background:rgba(244,237,226,.09);transform:translateX(5px)}
        .hpico{width:40px;height:40px;border-radius:11px;display:flex;align-items:center;justify-content:center;font-size:1.2rem;flex-shrink:0}
        .hpinfo b{display:block;font-size:.96rem;font-weight:800}
        .hpinfo span{font-size:.73rem;color:rgba(244,237,226,.5)}
        .hquote{margin-top:14px;background:rgba(212,160,32,.09);border-left:3px solid var(--gold);border-radius:0 12px 12px 0;padding:13px 17px;color:rgba(244,237,226,.7);font-style:italic;font-family:'Cormorant Garamond',serif;font-size:.98rem;line-height:1.6}
        .dispatch-bar{background:rgba(74,222,128,.08);border:1px solid rgba(74,222,128,.2);border-radius:12px;padding:12px 18px;display:flex;align-items:center;gap:10px;font-size:.82rem;color:rgba(244,237,226,.75);margin-top:24px;font-weight:600}
        @keyframes up{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
        .sec{padding:100px 40px}
        .si{max-width:1280px;margin:0 auto}
        .ey{font-size:.7rem;font-weight:800;letter-spacing:3.5px;text-transform:uppercase;margin-bottom:12px}
        .h2{font-family:'Cormorant Garamond',serif;font-size:clamp(2.3rem,4.5vw,3.5rem);line-height:1.1;margin-bottom:16px;font-weight:700}
        .h2 em{font-style:italic}
        .sp{color:var(--muted);font-size:.96rem;line-height:1.75;max-width:540px}
        .packs-bg{background:var(--dark)}
        .packs-hd{text-align:center;margin-bottom:52px}
        .packs-hd .ey{color:#4ade80}
        .packs-hd .h2{color:var(--beige)}
        .packs-hd .h2 em{color:var(--gold)}
        .packs-hd .sp{color:rgba(244,237,226,.55);margin:0 auto}
        .packs-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
        .pack-card{border-radius:22px;overflow:hidden;position:relative;transition:all .35s;cursor:pointer;border:2px solid transparent}
        .pack-card:hover{transform:translateY(-6px)}
        .pack-card.selected{border-color:var(--pc)}
        .pack-top{padding:32px 28px 24px;position:relative}
        .pack-emoji{font-size:3.2rem;margin-bottom:14px;display:block}
        .pack-name{font-family:'Cormorant Garamond',serif;font-size:1.9rem;color:var(--beige);font-weight:700;margin-bottom:4px}
        .pack-goal{font-size:.72rem;font-weight:800;letter-spacing:2px;text-transform:uppercase;margin-bottom:14px}
        .pack-tagline{font-family:'Cormorant Garamond',serif;font-style:italic;font-size:1.05rem;color:rgba(244,237,226,.7);margin-bottom:14px;line-height:1.5}
        .pack-desc{font-size:.85rem;color:rgba(244,237,226,.6);line-height:1.65;margin-bottom:18px}
        .macro-row{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:18px}
        .macro-chip{background:rgba(244,237,226,.07);border:1px solid rgba(244,237,226,.1);border-radius:8px;padding:6px 11px;text-align:center}
        .macro-chip b{display:block;font-size:.95rem;color:var(--beige);font-weight:800}
        .macro-chip span{font-size:.62rem;color:rgba(244,237,226,.45);letter-spacing:1px;text-transform:uppercase}
        .pack-highlights{list-style:none;display:flex;flex-direction:column;gap:6px;margin-bottom:22px}
        .pack-highlights li{font-size:.82rem;color:rgba(244,237,226,.75);display:flex;align-items:center;gap:8px}
        .pack-highlights li::before{content:'✓';color:var(--pc);font-weight:900;font-size:.85rem}
        .pack-price-row{display:flex;align-items:baseline;gap:6px;margin-bottom:18px}
        .pack-price{font-family:'Cormorant Garamond',serif;font-size:2.2rem;color:var(--beige);font-weight:700}
        .pack-price-sub{font-size:.8rem;color:rgba(244,237,226,.5)}
        .pack-cta{width:100%;border:none;padding:14px;border-radius:13px;font-family:'Nunito',sans-serif;font-size:.95rem;font-weight:800;cursor:pointer;transition:all .3s;letter-spacing:.3px}
        .pack-cta:hover{transform:translateY(-2px)}
        .best-badge{position:absolute;top:16px;right:16px;background:var(--gold);color:#0c1a0e;font-size:.65rem;font-weight:900;padding:4px 11px;border-radius:50px;letter-spacing:1px;text-transform:uppercase}
        .hiw-bg{background:var(--beige)}
        .steps-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:0;margin-top:52px;position:relative}
        .steps-grid::before{content:'';position:absolute;top:28px;left:10%;right:10%;height:2px;background:linear-gradient(90deg,#4ade80,var(--gold),var(--terra));z-index:0;border-radius:2px}
        .step{text-align:center;position:relative;z-index:1;padding:0 12px}
        .step-num{width:56px;height:56px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1.4rem;margin:0 auto 16px;box-shadow:0 4px 18px rgba(0,0,0,.12);border:3px solid var(--beige)}
        .step-title{font-weight:800;font-size:.88rem;color:var(--forest);margin-bottom:6px}
        .step-text{font-size:.78rem;color:var(--muted);line-height:1.55}
        .rules-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:48px}
        .rule-card{background:var(--card);border-radius:16px;padding:20px;border-left:3px solid var(--forest);display:flex;gap:14px;align-items:flex-start}
        .rule-icon{font-size:1.5rem;flex-shrink:0;margin-top:2px}
        .rule-title{font-weight:800;font-size:.88rem;color:var(--forest);margin-bottom:4px}
        .rule-text{font-size:.82rem;color:var(--muted);line-height:1.55}
        .menu-bg{background:var(--warm)}
        .bowls-row{display:flex;gap:10px;margin-top:40px;overflow-x:auto;padding-bottom:8px}
        .bowl-pill{border-radius:12px;padding:12px 10px;text-align:center;cursor:pointer;transition:all .3s;background:var(--card);border:2px solid transparent;min-width:110px;flex-shrink:0}
        .bowl-pill.on{border-color:var(--bc);transform:translateY(-4px);box-shadow:0 8px 22px rgba(0,0,0,.1)}
        .bowl-em{font-size:2rem;display:block;margin-bottom:7px}
        .bowl-day{font-size:.62rem;font-weight:800;letter-spacing:2px;text-transform:uppercase;color:var(--muted);margin-bottom:4px}
        .bowl-nm{font-family:'Cormorant Garamond',serif;font-size:.8rem;font-weight:600;color:var(--forest);line-height:1.3}
        .bowl-detail{margin-top:24px;background:var(--card);border-radius:20px;padding:32px;display:grid;grid-template-columns:auto 1fr;gap:24px;align-items:center;box-shadow:0 4px 24px rgba(0,0,0,.07)}
        .bvibe{display:inline-block;font-size:.68rem;font-weight:800;letter-spacing:2px;text-transform:uppercase;padding:4px 12px;border-radius:50px;color:#fff;margin-bottom:10px}
        .bname{font-family:'Cormorant Garamond',serif;font-size:2rem;color:var(--forest);margin-bottom:8px;font-weight:700}
        .bing{color:var(--muted);font-size:.9rem;margin-bottom:14px}
        .btag{font-family:'Cormorant Garamond',serif;font-style:italic;font-size:1.2rem;color:var(--forest);border-left:3px solid;padding-left:14px}
        .rev-bg{background:var(--dark)}
        .rev-hd{text-align:center;margin-bottom:44px}
        .rev-hd .ey{color:#4ade80}
        .rev-hd .h2{color:var(--beige)}
        .rev-hd .h2 em{color:var(--gold)}
        .rev-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}
        .rev-card{background:rgba(244,237,226,.05);border:1px solid rgba(244,237,226,.09);border-radius:18px;padding:22px;transition:all .3s}
        .rev-card:hover{background:rgba(244,237,226,.08);transform:translateY(-4px)}
        .rev-stars{color:var(--gold);font-size:1rem;margin-bottom:12px;letter-spacing:2px}
        .rev-text{font-size:.97rem;color:rgba(244,237,226,.75);line-height:1.7;margin-bottom:14px;font-style:italic;font-family:'Cormorant Garamond',serif}
        .rev-name{font-weight:800;font-size:.82rem;color:var(--beige)}
        .rev-pack{font-size:.72rem;color:rgba(244,237,226,.4)}
        .findus-bg{background:var(--beige)}
        .findus-grid{display:grid;grid-template-columns:1fr 1fr;gap:56px;align-items:start}
        .ci{display:flex;gap:14px;align-items:flex-start;margin-bottom:20px}
        .cico{width:44px;height:44px;background:var(--forest);color:#fff;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:1.2rem;flex-shrink:0}
        .clbl{font-size:.66rem;font-weight:800;letter-spacing:2px;text-transform:uppercase;color:var(--muted);margin-bottom:3px}
        .cval{color:var(--forest);font-size:.9rem;font-weight:600;white-space:pre-line}
        .soc-row{display:flex;gap:9px;flex-wrap:wrap;margin-top:24px}
        .soc-a{display:flex;align-items:center;gap:7px;padding:8px 16px;border-radius:50px;border:1.5px solid rgba(30,60,36,.15);background:var(--card);color:var(--forest);font-family:'Nunito',sans-serif;font-size:.79rem;font-weight:700;cursor:pointer;transition:all .25s;text-decoration:none}
        .soc-a:hover{background:var(--forest);color:var(--beige)}
        .mapviz{background:linear-gradient(145deg,#2a6a38 0%,var(--dark) 100%);border-radius:26px;padding:44px 36px;display:flex;flex-direction:column;align-items:center;gap:16px;position:relative;overflow:hidden;min-height:380px;justify-content:center}
        .mapviz::before{content:'';position:absolute;inset:0;background-image:radial-gradient(circle,rgba(255,255,255,.06) 1px,transparent 1px);background-size:36px 36px}
        .mpin{font-size:3.6rem;animation:boun 2s ease-in-out infinite;position:relative}
        @keyframes boun{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
        .madr{font-family:'Cormorant Garamond',serif;font-size:1.35rem;color:var(--beige);text-align:center;position:relative;font-weight:600}
        .mhrs{display:grid;grid-template-columns:1fr 1fr;gap:7px;width:100%;max-width:270px;position:relative}
        .mh{background:rgba(244,237,226,.09);border-radius:9px;padding:9px 13px}
        .mhd{font-size:.68rem;font-weight:800;color:rgba(244,237,226,.75)}
        .mht{font-size:.76rem;color:var(--gold);font-weight:700;margin-top:1px}
        .dirbtn{background:var(--terra);color:#fff;border:none;padding:11px 26px;border-radius:50px;font-family:'Nunito',sans-serif;font-size:.86rem;font-weight:800;cursor:pointer;position:relative;transition:all .3s}
        .dirbtn:hover{background:#a83a20;transform:translateY(-2px)}
        .ov{position:fixed;inset:0;background:rgba(0,0,0,.7);z-index:1100;opacity:0;pointer-events:none;transition:opacity .3s}
        .ov.s{opacity:1;pointer-events:all}
        .drw{position:fixed;right:0;top:0;bottom:0;width:500px;max-width:100vw;background:var(--card);z-index:1101;transform:translateX(100%);transition:transform .4s cubic-bezier(.4,0,.2,1);display:flex;flex-direction:column;overflow:hidden}
        .drw.s{transform:translateX(0)}
        .dh{padding:22px 28px;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;flex-shrink:0}
        .dhtitle{font-family:'Cormorant Garamond',serif;font-size:1.4rem;color:var(--forest);font-weight:700}
        .dhclose{background:none;border:none;font-size:1.3rem;cursor:pointer;color:var(--muted)}
        .dbody{flex:1;overflow-y:auto;padding:22px 28px}
        .dfoot{padding:16px 28px;border-top:1px solid var(--border);flex-shrink:0}
        .pk-summary{background:linear-gradient(135deg,var(--dark) 0%,#1a3020 100%);border-radius:16px;padding:20px;margin-bottom:20px;display:flex;gap:14px;align-items:center}
        .pk-sum-em{font-size:2.5rem;flex-shrink:0}
        .pk-sum-name{font-family:'Cormorant Garamond',serif;font-size:1.2rem;color:var(--beige);font-weight:700}
        .pk-sum-sub{font-size:.78rem;color:rgba(244,237,226,.5);margin-top:2px}
        .pk-sum-price{font-family:'Cormorant Garamond',serif;font-size:1.6rem;color:#4ade80;font-weight:700;margin-left:auto;flex-shrink:0}
        .cfg-row{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:20px}
        .cfg-opt{border:1.5px solid var(--border);background:var(--beige);border-radius:10px;padding:8px 14px;font-family:'Nunito',sans-serif;font-size:.8rem;font-weight:700;cursor:pointer;transition:all .2s;color:var(--forest)}
        .cfg-opt.on{background:var(--forest);color:#fff;border-color:var(--forest)}
        .fg{margin-bottom:14px}
        .fg label{display:block;font-size:.67rem;font-weight:800;letter-spacing:2px;text-transform:uppercase;color:var(--muted);margin-bottom:6px}
        .fg input,.fg select,.fg textarea{width:100%;background:var(--beige);border:1.5px solid var(--border);border-radius:10px;font-family:'Nunito',sans-serif;font-size:.88rem;color:var(--forest);padding:10px 13px;outline:none;transition:border-color .2s}
        .fg input:focus,.fg select:focus,.fg textarea:focus{border-color:#4ade80}
        .fg input::placeholder{color:#bbb}
        .frow{display:grid;grid-template-columns:1fr 1fr;gap:10px}
        .policy-box{background:#f0faf0;border:1px solid rgba(74,222,128,.25);border-radius:12px;padding:14px 16px;margin-bottom:16px;font-size:.78rem;color:var(--muted);line-height:1.65}
        .policy-box strong{color:var(--forest)}
        .btn-full{width:100%;border:none;padding:14px;border-radius:13px;font-family:'Nunito',sans-serif;font-size:.96rem;font-weight:800;cursor:pointer;transition:all .3s}
        .btn-full.g{background:var(--forest);color:#fff}
        .btn-full.g:hover{background:#0c1a0e}
        .btn-back{background:none;border:none;color:var(--muted);font-family:'Nunito',sans-serif;font-size:.8rem;font-weight:700;cursor:pointer;margin-bottom:12px;display:flex;align-items:center;gap:4px}
        .upi-box{background:var(--warm);border-radius:16px;padding:22px;text-align:center;margin-bottom:16px}
        .upi-amt{font-family:'Cormorant Garamond',serif;font-size:2.2rem;color:var(--forest);font-weight:700;margin-bottom:3px}
        .upi-id{font-size:.8rem;color:var(--muted);margin-bottom:14px}
        .upi-qr{border-radius:12px;overflow:hidden;display:inline-block;box-shadow:0 4px 16px rgba(0,0,0,.1)}
        .upi-apps{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:14px 0}
        .upi-app{background:var(--card);border:1.5px solid var(--border);border-radius:10px;padding:9px 13px;font-family:'Nunito',sans-serif;font-size:.79rem;font-weight:700;color:var(--forest);cursor:pointer;transition:all .25s}
        .upi-app:hover{border-color:#4ade80;background:#f0faf0}
        .confirm-btn{width:100%;background:#4ade80;color:#0c1a0e;border:none;padding:14px;border-radius:13px;font-family:'Nunito',sans-serif;font-size:.96rem;font-weight:800;cursor:pointer;transition:all .3s;margin-top:6px}
        .confirm-btn:hover{background:#22c55e}
        .ai-tip-box{background:linear-gradient(135deg,#f0faf0,var(--card));border:1px solid rgba(74,222,128,.2);border-radius:14px;padding:18px;margin-top:14px;font-size:.85rem;color:var(--forest);line-height:1.75;white-space:pre-wrap}
        .ai-tip-btn{background:none;border:1.5px solid rgba(74,222,128,.3);color:#2a6a38;font-family:'Nunito',sans-serif;font-size:.78rem;font-weight:800;padding:8px 16px;border-radius:50px;cursor:pointer;transition:all .2s;margin-top:10px}
        .ai-tip-btn:hover{background:#f0faf0}
        .sbox{text-align:center;padding:20px 0}
        .sbig{font-size:3.5rem;margin-bottom:14px}
        .sh{font-family:'Cormorant Garamond',serif;font-size:1.8rem;color:var(--forest);margin-bottom:8px;font-weight:700}
        .wa-btn{display:inline-flex;align-items:center;gap:8px;background:#25d366;color:#fff;border:none;padding:12px 24px;border-radius:50px;font-family:'Nunito',sans-serif;font-size:.9rem;font-weight:800;cursor:pointer;margin-top:18px;transition:all .3s;text-decoration:none}
        .wa-btn:hover{background:#128c7e}
        .footer{background:var(--dark);padding:60px 40px 28px}
        .fg2{max-width:1280px;margin:0 auto;display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:44px;margin-bottom:36px}
        .ftag{color:rgba(244,237,226,.38);font-size:.83rem;line-height:1.72;margin-top:12px}
        .fh{color:var(--gold);font-size:.66rem;font-weight:800;letter-spacing:3px;text-transform:uppercase;margin-bottom:15px}
        .flinks{list-style:none;display:flex;flex-direction:column;gap:9px}
        .flinks button{background:none;border:none;color:rgba(244,237,226,.48);font-family:'Nunito',sans-serif;font-size:.82rem;cursor:pointer;text-align:left;transition:color .2s;padding:0}
        .flinks button:hover{color:var(--beige)}
        .fbot{max-width:1280px;margin:0 auto;border-top:1px solid rgba(244,237,226,.07);padding-top:20px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px}
        .fcopy{color:rgba(244,237,226,.25);font-size:.76rem}
        @media(max-width:1024px){
          .packs-grid{grid-template-columns:1fr 1fr}
          .rev-grid{grid-template-columns:1fr 1fr}
          .steps-grid{grid-template-columns:repeat(3,1fr);gap:24px}
          .steps-grid::before{display:none}
          .rules-grid{grid-template-columns:1fr 1fr}
        }
        @media(max-width:768px){
          .hi,.findus-grid{grid-template-columns:1fr;gap:36px}
          .hpanel{display:none}
          .nl,.cta-nav{display:none}
          .ham{display:flex}
          .sec{padding:80px 24px}
          .nw{padding:0 24px}
          .hi{padding:120px 24px 80px}
          .packs-grid{grid-template-columns:1fr}
          .rev-grid{grid-template-columns:1fr}
          .steps-grid{grid-template-columns:1fr 1fr;gap:20px}
          .rules-grid{grid-template-columns:1fr}
          .bowl-detail{grid-template-columns:1fr;text-align:center}
          .drw{width:100vw}
          .frow{grid-template-columns:1fr}
          .hbtns{flex-direction:column}
          .fg2{grid-template-columns:1fr 1fr;gap:28px}
        }
      `}</style>

      {/* NAV */}
      <nav className={`nav ${scrolled ? 'up' : ''}`}>
        <div className="nw">
          <div className="logo" onClick={() => scrollTo('Home')}>
            Earth <b>Bowlzz</b>
            <small>{BRAND.tagline}</small>
          </div>
          <ul className="nl">
            {NAV.map((n) => (
              <li key={n}>
                <button
                  className={activeNav === n ? 'on' : ''}
                  onClick={() => scrollTo(n)}
                >
                  {n}
                </button>
              </li>
            ))}
          </ul>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <button className="cta-nav" onClick={() => scrollTo('Packs')}>
              View Packs 🌿
            </button>
            <button className="ham" onClick={() => setMobileOpen(true)}>
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </nav>
      <div className={`mnav ${mobileOpen ? 'show' : ''}`}>
        <button className="mclose" onClick={() => setMobileOpen(false)}>
          ✕
        </button>
        {NAV.map((n) => (
          <button key={n} onClick={() => scrollTo(n)}>
            {n}
          </button>
        ))}
      </div>

      {/* HERO */}
      <section ref={(el: any) => (refs.current['Home'] = el)} className="hero">
        <div className="hbg" />
        <span className="leaf l1">🌿</span>
        <span className="leaf l2">🍃</span>
        <span className="leaf l3">🌱</span>
        <div className="hi">
          <div>
            <div className="htag">🌍 Fresh Bowl Plans · Est. 2021</div>
            <h1 className="hh1">
              Your Goal.
              <br />
              Your Bowl.
              <br />
              <span>Delivered</span> <em>Fresh.</em>
            </h1>
            <p className="hsub">
              Choose your pack, pick your plan duration, and get freshly made
              bowls delivered to your door every morning — no prep, no
              guesswork, just real nourishment.
            </p>
            <div className="hbtns">
              <button className="btng" onClick={() => scrollTo('Packs')}>
                Choose Your Pack
              </button>
              <button className="btno" onClick={() => scrollTo('How It Works')}>
                How It Works
              </button>
            </div>
            <div className="dispatch-bar">
              🚚 Fresh bowls dispatched at{' '}
              <strong style={{ color: '#4ade80', marginLeft: 4 }}>
                {BRAND.dispatchTime} daily
              </strong>
              &nbsp;·&nbsp; Mon–Sat &nbsp;·&nbsp; {BRAND.offDay} off
            </div>
          </div>
          <div className="hpanel">
            {[
              {
                bg: 'rgba(74,222,128,.13)',
                ico: '💚',
                color: '#4ade80',
                val: 'Glow Pack',
                sub: 'Weight Loss · from ₹999/week',
              },
              {
                bg: 'rgba(251,191,36,.12)',
                ico: '💛',
                color: '#fbbf24',
                val: 'Balance Pack',
                sub: 'Maintain · from ₹1,099/week',
              },
              {
                bg: 'rgba(248,113,113,.12)',
                ico: '❤️',
                color: '#f87171',
                val: 'Power Pack',
                sub: 'Muscle Build · from ₹1,299/week',
              },
              {
                bg: 'rgba(74,222,128,.07)',
                ico: '🔁',
                color: '#4ade80',
                val: 'Pause up to 6 days',
                sub: 'On the 28-day plan',
              },
            ].map((s) => (
              <div className="hpcard" key={s.sub}>
                <div className="hpico" style={{ background: s.bg }}>
                  {s.ico}
                </div>
                <div className="hpinfo">
                  <b style={{ color: s.color }}>{s.val}</b>
                  <span>{s.sub}</span>
                </div>
              </div>
            ))}
            <div className="hquote">
              "Every bowl tells a story — of balance, energy, and care. You
              don't just eat. You <em>evolve.</em>"
            </div>
          </div>
        </div>
      </section>

      {/* PACKS */}
      <section
        ref={(el: any) => (refs.current['Packs'] = el)}
        className="sec packs-bg"
      >
        <div className="si">
          <div className="packs-hd">
            <p className="ey">Choose Your Plan</p>
            <h2 className="h2">
              Three Packs. <em>One Earth.</em> Infinite Nourishment.
            </h2>
            <p className="sp">
              Each pack is calibrated for your goal — macros, ingredients,
              portion size. All freshly cooked, no preservatives, delivered hot
              every morning.
            </p>
          </div>
          <div className="packs-grid">
            {PACKS.map((p, i) => (
              <div
                key={p.id}
                className={`pack-card ${
                  selectedPack === p.id ? 'selected' : ''
                }`}
                style={
                  {
                    background: `linear-gradient(160deg,${p.dark} 0%,#0c1a0e 100%)`,
                    '--pc': p.color,
                  } as any
                }
                onClick={() => setSelectedPack(p.id)}
              >
                {i === 2 && <div className="best-badge">Most Popular</div>}
                {i === 1 && (
                  <div className="best-badge" style={{ background: '#4ade80' }}>
                    Best Value
                  </div>
                )}
                <div className="pack-top">
                  <span className="pack-emoji">{p.emoji}</span>
                  <div className="pack-name">{p.name}</div>
                  <div className="pack-goal" style={{ color: p.color }}>
                    {p.goal}
                  </div>
                  <div className="pack-tagline">"{p.tagline}"</div>
                  <div className="pack-desc">{p.desc}</div>
                  <div className="macro-row">
                    {[
                      ['⚡', p.macros.cal, 'Cal'],
                      ['💪', p.macros.protein, 'Protein'],
                      ['🌾', p.macros.carbs, 'Carbs'],
                      ['🫒', p.macros.fat, 'Fat'],
                    ].map(([ic, v, l]) => (
                      <div className="macro-chip" key={l}>
                        <b>
                          {ic} {v}
                        </b>
                        <span>{l}</span>
                      </div>
                    ))}
                  </div>
                  <ul className="pack-highlights">
                    {p.highlights.map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>
                  <div
                    style={{
                      fontSize: '.75rem',
                      color: `${p.color}90`,
                      marginBottom: 16,
                      fontWeight: 700,
                    }}
                  >
                    📊 {p.perKg}
                  </div>
                  <div className="pack-price-row">
                    <div className="pack-price" style={{ color: p.color }}>
                      from {fmt(p.prices['veg-indian']['7d-1'])}
                    </div>
                    <div className="pack-price-sub">/ 7-day plan</div>
                  </div>
                  <div
                    style={{
                      fontSize: '.75rem',
                      color: 'rgba(244,237,226,.4)',
                      marginBottom: 16,
                    }}
                  >
                    Sample: {p.meals.slice(0, 2).join(' · ')}
                  </div>
                  <button
                    className="pack-cta"
                    style={{ background: p.color, color: '#0c1a0e' }}
                    onClick={(e) => {
                      e.stopPropagation();
                      openCheckout(p.id);
                    }}
                  >
                    Subscribe to {p.name} →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section
        ref={(el: any) => (refs.current['How It Works'] = el)}
        className="sec hiw-bg"
      >
        <div className="si">
          <p className="ey" style={{ color: 'var(--terra)' }}>
            Simple Process
          </p>
          <h2 className="h2" style={{ color: 'var(--forest)' }}>
            From Click to <em>Bowl</em> in 5 Steps
          </h2>
          <div className="steps-grid">
            {[
              {
                ico: '🎯',
                bg: '#f0faf0',
                title: 'Pick Your Pack',
                text: 'Choose Glow, Balance or Power based on your goal.',
              },
              {
                ico: '📅',
                bg: '#fffbeb',
                title: 'Choose Duration',
                text: '7-day weekly or 28-day monthly plan. Save more monthly.',
              },
              {
                ico: '🥦',
                bg: '#f0faf0',
                title: 'Veg or Non-Veg',
                text: 'Indian or Fusion. We personalise to your palate.',
              },
              {
                ico: '💳',
                bg: '#fffbeb',
                title: 'Pay via UPI',
                text: 'One-tap payment — GPay, PhonePe, Paytm, BHIM.',
              },
              {
                ico: '🚚',
                bg: '#fef2f2',
                title: 'Bowl at Your Door',
                text: `Fresh, hot delivery at ${BRAND.dispatchTime} every morning Mon–Sat.`,
              },
            ].map((s) => (
              <div className="step" key={s.title}>
                <div className="step-num" style={{ background: s.bg }}>
                  {s.ico}
                </div>
                <div className="step-title">{s.title}</div>
                <div className="step-text">{s.text}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 52 }}>
            <p
              className="ey"
              style={{ color: 'var(--forest)', marginBottom: 20 }}
            >
              Plan Policies
            </p>
            <div className="rules-grid">
              {[
                {
                  ico: '⏸️',
                  title: 'Pause up to 6 days',
                  text: "On the 28-day plan, pause your subscription for up to 6 days if you're travelling. Resume anytime.",
                },
                {
                  ico: '🔁',
                  title: 'Meal Swaps Allowed',
                  text: 'Swap up to 4 meals on the 28-day plan, 2 on the 7-day plan. Notify us 24hrs before dispatch via WhatsApp.',
                },
                {
                  ico: '🕗',
                  title: `${BRAND.dispatchTime} Daily Dispatch`,
                  text: 'All meals are freshly cooked and dispatched every morning, Mon–Sat. Sunday is our off day.',
                },
                {
                  ico: '🏥',
                  title: 'Medical Conditions',
                  text: "Inform us of any health conditions — diabetes, thyroid, PCOS, BP. We'll reach out before your plan begins.",
                },
                {
                  ico: '💬',
                  title: 'WhatsApp First',
                  text: 'All swaps, pauses, and queries handled via WhatsApp to your dedicated POC. No app needed.',
                },
                {
                  ico: '❌',
                  title: 'No Refunds Policy',
                  text: "All meals are freshly cooked to order. We do not offer refunds, but we'll always work with you on swaps and pauses.",
                },
              ].map((r) => (
                <div className="rule-card" key={r.title}>
                  <div className="rule-icon">{r.ico}</div>
                  <div>
                    <div className="rule-title">{r.title}</div>
                    <div className="rule-text">{r.text}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MENU */}
      <section
        ref={(el: any) => (refs.current['Menu'] = el)}
        className="sec menu-bg"
      >
        <div className="si">
          <p className="ey" style={{ color: 'var(--terra)' }}>
            Signature Series
          </p>
          <h2 className="h2" style={{ color: 'var(--forest)' }}>
            7 Bowls. 7 Moods. <em>One Earth.</em>
          </h2>
          <p className="sp">
            Each day gets its own bowl, its own vibe, its own story — rotating
            seasonally so it never gets boring.
          </p>
          <div className="bowls-row">
            {SEVEN_BOWLS.map((b, i) => (
              <div
                key={b.day}
                className={`bowl-pill ${activeBowl === i ? 'on' : ''}`}
                style={{ '--bc': b.color } as any}
                onClick={() => setActiveBowl(i)}
              >
                <span className="bowl-em">{b.emoji}</span>
                <div className="bowl-day">{b.day}</div>
                <div className="bowl-nm">{b.name.replace('The ', '')}</div>
              </div>
            ))}
          </div>
          {(() => {
            const b = SEVEN_BOWLS[activeBowl];
            return (
              <div className="bowl-detail">
                <div style={{ fontSize: '5rem', lineHeight: 1 }}>{b.emoji}</div>
                <div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      flexWrap: 'wrap',
                      marginBottom: 10,
                    }}
                  >
                    <span className="bvibe" style={{ background: b.color }}>
                      {b.vibe}
                    </span>
                    <span
                      style={{
                        background: 'rgba(30,60,36,.08)',
                        padding: '4px 12px',
                        borderRadius: 50,
                        fontSize: '.8rem',
                        fontWeight: 800,
                        color: b.color,
                      }}
                    >
                      ₹{b.price}
                    </span>
                  </div>
                  <div className="bname">{b.name}</div>
                  <p className="bing">🥗 {b.ingredients}</p>
                  <div className="btag" style={{ borderColor: b.color }}>
                    "{b.tagline}"
                  </div>
                  <button
                    className="btng"
                    style={{
                      marginTop: 18,
                      background: b.color,
                      color: '#0c1a0e',
                    }}
                    onClick={() => scrollTo('Packs')}
                  >
                    Get This in Your Pack →
                  </button>
                </div>
              </div>
            );
          })()}
        </div>
      </section>

      {/* REVIEWS */}
      <section
        ref={(el: any) => (refs.current['Reviews'] = el)}
        className="sec rev-bg"
      >
        <div className="si">
          <div className="rev-hd">
            <p className="ey">Real Stories</p>
            <h2 className="h2">
              Our Customers <em>Say It Best</em>
            </h2>
            <p
              className="sp"
              style={{ color: 'rgba(244,237,226,.55)', margin: '0 auto' }}
            >
              Real results from real people who made the switch to Earth Bowlzz.
            </p>
          </div>
          <div className="rev-grid">
            {REVIEWS.map((r) => (
              <div className="rev-card" key={r.name}>
                <div className="rev-stars">{'★'.repeat(r.stars)}</div>
                <div className="rev-text">"{r.text}"</div>
                <div className="rev-name">
                  {r.name} · {r.city}
                </div>
                <div className="rev-pack">{r.pack}</div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <button
              className="btng"
              style={{ background: '#4ade80', color: '#0c1a0e' }}
              onClick={() => scrollTo('Packs')}
            >
              Start Your Journey Today 🌿
            </button>
          </div>
        </div>
      </section>

      {/* FIND US */}
      <section
        ref={(el: any) => (refs.current['Find Us'] = el)}
        className="sec findus-bg"
      >
        <div className="si">
          <div className="findus-grid">
            <div>
              <p className="ey" style={{ color: '#2a6a38' }}>
                Get In Touch
              </p>
              <h2 className="h2" style={{ color: 'var(--forest)' }}>
                Come <em>Say Hello</em>
              </h2>
              {[
                { ico: '📍', lbl: 'Location', val: BRAND.address },
                { ico: '📞', lbl: 'Phone', val: BRAND.phone },
                { ico: '📧', lbl: 'Email', val: BRAND.email },
                {
                  ico: '💬',
                  lbl: 'WhatsApp Orders',
                  val: `+${BRAND.whatsapp}`,
                },
                {
                  ico: '🕐',
                  lbl: 'Hours',
                  val: `Mon–Sat: 7:00 AM – 8:00 PM\n${BRAND.offDay}: Closed`,
                },
              ].map((c) => (
                <div className="ci" key={c.lbl}>
                  <div className="cico">{c.ico}</div>
                  <div>
                    <div className="clbl">{c.lbl}</div>
                    <div className="cval">{c.val}</div>
                  </div>
                </div>
              ))}
              <div className="soc-row">
                {[
                  ['📸 Instagram', BRAND.instagram],
                  ['👥 Facebook', BRAND.facebook],
                  ['▶️ YouTube', BRAND.youtube],
                  ['🐦 Twitter', BRAND.twitter],
                  ['💬 WhatsApp', `https://wa.me/${BRAND.whatsapp}`],
                ].map(([l, h]) => (
                  <a
                    key={l}
                    className="soc-a"
                    href={h}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {l}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <div className="mapviz">
                <div className="mpin">📍</div>
                <div className="madr">{BRAND.address}</div>
                <div
                  style={{
                    color: 'rgba(244,237,226,.55)',
                    fontSize: '.83rem',
                    textAlign: 'center',
                    position: 'relative',
                  }}
                >
                  Free delivery to nearby pincodes
                </div>
                <div className="mhrs">
                  {[
                    ['Mon–Sat', '7am – 8pm'],
                    [BRAND.offDay, 'Closed'],
                  ].map(([d, t]) => (
                    <div className="mh" key={d}>
                      <div className="mhd">{d}</div>
                      <div className="mht">{t}</div>
                    </div>
                  ))}
                </div>
                <a
                  className="wa-btn"
                  href={waLink(
                    "Hi! I'd like to know more about Earth Bowlzz meal plans 🌿"
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  💬 Chat on WhatsApp
                </a>
                <button
                  className="dirbtn"
                  onClick={() =>
                    window.open('https://maps.google.com', '_blank')
                  }
                  style={{ marginTop: 4 }}
                >
                  Get Directions →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="fg2">
          <div>
            <div className="logo" style={{ display: 'inline-block' }}>
              Earth <b>Bowlzz</b>
              <small>{BRAND.tagline}</small>
            </div>
            <p className="ftag">
              Handcrafted wellness bowls rooted in nature. Fresh daily. No
              preservatives. No shortcuts. Just real food that works.
            </p>
            <div
              style={{
                display: 'flex',
                gap: 8,
                marginTop: 16,
                flexWrap: 'wrap',
              }}
            >
              {[
                ['📸', BRAND.instagram],
                ['👥', BRAND.facebook],
                ['▶️', BRAND.youtube],
                ['🐦', BRAND.twitter],
                ['💬', `https://wa.me/${BRAND.whatsapp}`],
              ].map(([ic, h]) => (
                <a
                  key={ic}
                  href={h}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: 33,
                    height: 33,
                    borderRadius: '50%',
                    background: 'rgba(244,237,226,.07)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '.9rem',
                    color: 'rgba(244,237,226,.5)',
                    transition: 'all .2s',
                    textDecoration: 'none',
                  }}
                >
                  {ic}
                </a>
              ))}
            </div>
          </div>
          {[
            {
              h: 'Packs',
              links: [
                'Glow Pack',
                'Balance Pack',
                'Power Pack',
                'Compare Plans',
              ],
            },
            {
              h: 'Company',
              links: [
                'About Us',
                'How It Works',
                'Sustainability',
                'Careers',
                '#MyEarthBowlzz',
              ],
            },
            {
              h: 'Support',
              links: [
                'WhatsApp Us',
                'Email Us',
                'Swap Policy',
                'Pause Policy',
                'FAQ',
              ],
            },
          ].map((col) => (
            <div key={col.h}>
              <div className="fh">{col.h}</div>
              <ul className="flinks">
                {col.links.map((l) => (
                  <li key={l}>
                    <button
                      onClick={() => (refs.current as any)[l] && scrollTo(l)}
                    >
                      {l}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="fbot">
          <span className="fcopy">
            © 2025 Earth Bowlzz · Eat clean. Feel strong. · All rights reserved.
          </span>
          <span className="fcopy">
            ❌ No refunds · 🔁 Swaps allowed · ⏸️ Pause up to 6 days
          </span>
        </div>
      </footer>

      {/* CHECKOUT DRAWER */}
      <div
        className={`ov ${checkoutOpen ? 's' : ''}`}
        onClick={() => {
          if (checkoutStep < 3) setCheckoutOpen(false);
        }}
      />
      <div className={`drw ${checkoutOpen ? 's' : ''}`}>
        <div className="dh">
          <div className="dhtitle">
            {checkoutStep === 1 && '🌿 Subscribe to Pack'}
            {checkoutStep === 2 && '💳 Pay via UPI'}
            {checkoutStep === 3 && "✅ You're In!"}
          </div>
          <button className="dhclose" onClick={() => setCheckoutOpen(false)}>
            ✕
          </button>
        </div>
        <div className="dbody">
          {checkoutStep === 1 && pack && (
            <>
              <div className="pk-summary">
                <div className="pk-sum-em">{pack.emoji}</div>
                <div>
                  <div className="pk-sum-name">{pack.name}</div>
                  <div className="pk-sum-sub">{pack.goal}</div>
                </div>
                <div className="pk-sum-price">{fmt(totalPrice)}</div>
              </div>
              <div
                style={{
                  fontSize: '.67rem',
                  fontWeight: 800,
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  color: 'var(--muted)',
                  marginBottom: 8,
                }}
              >
                Duration
              </div>
              <div className="cfg-row" style={{ marginBottom: 18 }}>
                {DURATIONS.map((d) => (
                  <button
                    key={d.id}
                    className={`cfg-opt ${selectedDur === d.id ? 'on' : ''}`}
                    onClick={() => setSelectedDur(d.id)}
                  >
                    {d.label}
                    {d.id === '28d' && (
                      <span
                        style={{
                          display: 'block',
                          fontSize: '.6rem',
                          color:
                            selectedDur === '28d'
                              ? 'var(--gold)'
                              : 'var(--muted)',
                        }}
                      >
                        Best Value · Pause up to 6d
                      </span>
                    )}
                  </button>
                ))}
              </div>
              <div
                style={{
                  fontSize: '.67rem',
                  fontWeight: 800,
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  color: 'var(--muted)',
                  marginBottom: 8,
                }}
              >
                Bowls Per Day
              </div>
              <div className="cfg-row" style={{ marginBottom: 18 }}>
                {MEAL_COUNTS.map((m) => (
                  <button
                    key={m.id}
                    className={`cfg-opt ${selectedMeals === m.id ? 'on' : ''}`}
                    onClick={() => setSelectedMeals(m.id)}
                  >
                    {m.label}
                    <span
                      style={{
                        display: 'block',
                        fontSize: '.6rem',
                        color:
                          selectedMeals === m.id ? '#86efac' : 'var(--muted)',
                      }}
                    >
                      {m.desc}
                    </span>
                  </button>
                ))}
              </div>
              <div
                style={{
                  fontSize: '.67rem',
                  fontWeight: 800,
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  color: 'var(--muted)',
                  marginBottom: 8,
                }}
              >
                Diet Preference
              </div>
              <div className="cfg-row" style={{ marginBottom: 20 }}>
                {DIETS.map((d) => (
                  <button
                    key={d}
                    className={`cfg-opt ${selectedDiet === d ? 'on' : ''}`}
                    onClick={() => setSelectedDiet(d)}
                  >
                    {d}
                  </button>
                ))}
              </div>
              <div
                style={{
                  background: 'var(--warm)',
                  borderRadius: 12,
                  padding: '14px 16px',
                  marginBottom: 18,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: '.8rem',
                      fontWeight: 700,
                      color: 'var(--forest)',
                    }}
                  >
                    {pack.name} · {dur?.label} · {meals?.label}
                  </div>
                  <div
                    style={{
                      fontSize: '.72rem',
                      color: 'var(--muted)',
                      marginTop: 2,
                    }}
                  >
                    {selectedDiet} · {dur?.days} days × {selectedMeals} bowl
                    {selectedMeals === '2' ? 's' : ''}/day
                  </div>
                </div>
                <div
                  style={{
                    fontFamily: "'Cormorant Garamond',serif",
                    fontSize: '1.7rem',
                    color: 'var(--forest)',
                    fontWeight: 700,
                  }}
                >
                  {fmt(totalPrice)}
                </div>
              </div>
              <div
                style={{
                  fontFamily: "'Cormorant Garamond',serif",
                  fontSize: '1.1rem',
                  color: 'var(--forest)',
                  fontWeight: 700,
                  marginBottom: 14,
                }}
              >
                Your Details
              </div>
              <div className="frow">
                <div className="fg">
                  <label>Full Name</label>
                  <input
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, name: e.target.value }))
                    }
                  />
                </div>
                <div className="fg">
                  <label>Phone / WhatsApp</label>
                  <input
                    placeholder="+91 XXXXX XXXXX"
                    value={form.phone}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, phone: e.target.value }))
                    }
                  />
                </div>
              </div>
              <div className="fg">
                <label>Delivery Address</label>
                <textarea
                  placeholder="Full address with pincode…"
                  value={form.address}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, address: e.target.value }))
                  }
                  style={{ resize: 'vertical', minHeight: 65 }}
                />
              </div>
              <div className="frow">
                <div className="fg">
                  <label>Start Date</label>
                  <input
                    type="date"
                    value={form.startDate}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, startDate: e.target.value }))
                    }
                  />
                </div>
                <div className="fg">
                  <label>Medical Condition</label>
                  <select
                    value={form.medical}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, medical: e.target.value }))
                    }
                  >
                    {MEDICAL.map((m) => (
                      <option key={m}>{m}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="fg">
                <label>Special Note / Allergies</label>
                <input
                  placeholder="e.g. no onions, less spice…"
                  value={form.note}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, note: e.target.value }))
                  }
                />
              </div>
              <div className="policy-box">
                <strong>📋 Subscription Policy</strong>
                <br />❌ No refunds · 🔁 Up to {dur?.swaps} meal swaps ·{' '}
                {(dur?.pauses ?? 0) > 0
                  ? `⏸️ Pause up to ${dur?.pauses} days`
                  : '⏩ 7-day plan, no pauses'}{' '}
                · 🕗 Dispatch at {BRAND.dispatchTime} daily · 💬 All changes via
                WhatsApp 24hrs before dispatch.
              </div>
            </>
          )}
          {checkoutStep === 2 && pack && (
            <>
              <button className="btn-back" onClick={() => setCheckoutStep(1)}>
                ← Back
              </button>
              <div
                style={{
                  fontFamily: "'Cormorant Garamond',serif",
                  fontSize: '1.1rem',
                  color: 'var(--forest)',
                  fontWeight: 700,
                  marginBottom: 16,
                }}
              >
                Complete Your Payment
              </div>
              <div className="upi-box">
                <div className="upi-amt">{fmt(totalPrice)}</div>
                <div className="upi-id">UPI ID: {BRAND.upiId}</div>
                <div className="upi-qr">
                  <img
                    src={qr(upiPayUrl)}
                    alt="UPI QR"
                    width="180"
                    height="180"
                    style={{ display: 'block' }}
                  />
                </div>
                <p
                  style={{
                    fontSize: '.74rem',
                    color: 'var(--muted)',
                    marginTop: 8,
                  }}
                >
                  Scan with any UPI app to pay
                </p>
              </div>
              <div
                style={{
                  fontSize: '.68rem',
                  fontWeight: 800,
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  color: 'var(--muted)',
                  marginBottom: 9,
                }}
              >
                Or tap to open your app
              </div>
              <div className="upi-apps">
                {[
                  ['📱 GPay', 'googlepay'],
                  ['📲 PhonePe', 'phonepe'],
                  ['💳 Paytm', 'paytm'],
                  ['🏦 BHIM', 'bhim'],
                ].map(([l, a]) => (
                  <button
                    key={a}
                    className="upi-app"
                    onClick={() => window.open(upiPayUrl, '_blank')}
                  >
                    {l}
                  </button>
                ))}
              </div>
              <p
                style={{
                  fontSize: '.76rem',
                  color: 'var(--muted)',
                  textAlign: 'center',
                  marginBottom: 6,
                  lineHeight: 1.6,
                }}
              >
                After paying, tap <strong>"I've Paid"</strong> below.
              </p>
            </>
          )}
          {checkoutStep === 3 && pack && (
            <div className="sbox">
              <div className="sbig">🌿</div>
              <div className="sh">Welcome to Earth Bowlzz!</div>
              <p
                style={{
                  color: 'var(--muted)',
                  fontSize: '.88rem',
                  lineHeight: 1.65,
                }}
              >
                <strong>{form.name || 'Friend'}</strong>, you've subscribed to
                the <strong>{pack.name}</strong>.<br />
                Your <strong>{dur?.label}</strong> begins on{' '}
                <strong>{form.startDate || 'your chosen date'}</strong>.<br />
                <br />
                First bowl dispatches at <strong>{BRAND.dispatchTime}</strong>.
                Expect a WhatsApp message from us before your first delivery.
              </p>
              {aiLoading && (
                <div
                  style={{
                    color: 'var(--muted)',
                    fontSize: '.85rem',
                    marginTop: 18,
                  }}
                >
                  ✨ Generating your welcome message…
                </div>
              )}
              {aiResult && <div className="ai-tip-box">{aiResult}</div>}
              {!aiResult && !aiLoading && (
                <button className="ai-tip-btn" onClick={getAiTip}>
                  ✨ Get your personalised welcome message
                </button>
              )}
              <br />
              <a
                className="wa-btn"
                href={waLink(
                  `🌿 Hi Earth Bowlzz! I just subscribed to the ${
                    pack?.name
                  } (${dur?.label}, ${
                    meals?.label
                  }, ${selectedDiet}). My name is ${form.name}, phone: ${
                    form.phone
                  }. Start date: ${form.startDate || 'ASAP'}. Address: ${
                    form.address
                  }. Payment done ✅`
                )}
                target="_blank"
                rel="noopener noreferrer"
              >
                💬 Confirm on WhatsApp
              </a>
              <p
                style={{
                  fontSize: '.72rem',
                  color: 'var(--muted)',
                  marginTop: 12,
                  lineHeight: 1.55,
                }}
              >
                Tag your first bowl 📸 <strong>#MyEarthBowlzz</strong> on
                Instagram!
              </p>
            </div>
          )}
        </div>
        <div className="dfoot">
          {checkoutStep === 1 && (
            <button
              className="btn-full g"
              onClick={goToUPI}
              style={{
                opacity: form.name && form.phone && form.address ? 1 : 0.5,
              }}
            >
              {form.name && form.phone && form.address
                ? `Proceed to Pay ${fmt(totalPrice)} →`
                : 'Fill name, phone & address to continue'}
            </button>
          )}
          {checkoutStep === 2 && (
            <button className="confirm-btn" onClick={confirmPayment}>
              ✅ I've Paid — Confirm Subscription
            </button>
          )}
          {checkoutStep === 3 && (
            <button
              className="btn-full g"
              onClick={() => setCheckoutOpen(false)}
            >
              Close
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/admin" element={<SuperAdmin />} />
      <Route path="/*" element={<EarthBowlzzApp />} />
    </Routes>
  );
}
