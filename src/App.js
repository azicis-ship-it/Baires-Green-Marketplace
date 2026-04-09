import { useState } from "react";

const ZONES = [
  { id: "gba-norte", name: "GBA Norte", areas: "San Isidro · Tigre · Pilar · Escobar", truckCapacity: 100, filled: 73, nextDepart: "Vie 12 Abr", color: "#3d7a1c" },
  { id: "gba-sur", name: "GBA Sur", areas: "Lomas · Quilmes · La Plata · Berazategui", truckCapacity: 100, filled: 41, nextDepart: "Sáb 13 Abr", color: "#3b82f6" },
  { id: "gba-oeste", name: "GBA Oeste", areas: "Morón · Ituzaingó · Moreno · Luján", truckCapacity: 100, filled: 88, nextDepart: "Jue 11 Abr", color: "#f59e0b" },
  { id: "caba", name: "CABA", areas: "Palermo · Belgrano · Núñez · Recoleta", truckCapacity: 60, filled: 52, nextDepart: "Mié 10 Abr", color: "#8b5cf6" },
  { id: "zona-norte-prem", name: "Nordelta & Countries", areas: "Nordelta · Villanueva · San Sebastián", truckCapacity: 100, filled: 95, nextDepart: "Mié 10 Abr", color: "#ef4444" },
];

const CATEGORIES = [
  { id: "plantas", name: "Plantas", icon: "🌱", count: 48 },
  { id: "tierra", name: "Tierra & Sustratos", icon: "🪴", count: 32 },
  { id: "grama", name: "Grama & Césped", icon: "🌿", count: 21 },
  { id: "riego", name: "Sistemas de Riego", icon: "💧", count: 27 },
  { id: "herramientas", name: "Herramientas", icon: "⚙️", count: 19 },
  { id: "iluminacion", name: "Iluminación", icon: "💡", count: 14 },
  { id: "piedras", name: "Piedras & Áridos", icon: "🪨", count: 16 },
  { id: "macetas", name: "Macetas", icon: "🏺", count: 22 },
];

const PRODUCTS = [
  { id: 1, name: "Grama Bahiana Premium", cat: "grama", seller: "Vivero San Martín", price: 850, unit: "m²", rating: 4.8, reviews: 142, badge: "🌿", commission: 8, hot: true, desc: "Grama bahiana de primera calidad, ideal para jardines residenciales. Entrega en panes de 40x40cm.", weight: 2, bulkPrice: 720, bulkMin: 50 },
  { id: 2, name: "Grama Bermuda Híbrida", cat: "grama", seller: "CéspedPro", price: 1100, unit: "m²", rating: 4.7, reviews: 98, badge: "🌿", commission: 8, hot: true, desc: "Alta resistencia al tránsito y sequía. Perfecta para espacios deportivos.", weight: 2, bulkPrice: 930, bulkMin: 40 },
  { id: 3, name: "Grama Kikuyo", cat: "grama", seller: "Vivero San Martín", price: 750, unit: "m²", rating: 4.5, reviews: 76, badge: "🌿", commission: 7, hot: false, desc: "Césped rústico de rápida propagación, ideal para taludes.", weight: 2, bulkPrice: 620, bulkMin: 60 },
  { id: 4, name: "Semillas Ryegrass 25kg", cat: "grama", seller: "SemillasVerdes", price: 18500, unit: "bolsa", rating: 4.6, reviews: 54, badge: "🌱", commission: 6, hot: false, desc: "Ryegrass perenne para resiembra invernal. Cobertura en 15 días.", weight: 25, bulkPrice: 16200, bulkMin: 5 },
  { id: 5, name: "Tierra Negra Orgánica", cat: "tierra", seller: "TierraViva", price: 3200, unit: "m³", rating: 4.6, reviews: 189, badge: "🪴", commission: 7, hot: false, desc: "Tierra negra 100% orgánica. Ideal para canteros y relleno.", weight: 80, bulkPrice: 2700, bulkMin: 5 },
  { id: 6, name: "Sustrato Premium 50L", cat: "tierra", seller: "TierraViva", price: 2800, unit: "bolsa", rating: 4.4, reviews: 278, badge: "🧱", commission: 7, hot: false, desc: "Mezcla profesional de turba, perlita y compost.", weight: 18, bulkPrice: 2350, bulkMin: 10 },
  { id: 7, name: "Mantillo de Hojas 50L", cat: "tierra", seller: "CompostBA", price: 1800, unit: "bolsa", rating: 4.3, reviews: 134, badge: "🍂", commission: 6, hot: false, desc: "Mantillo orgánico de hojas compostadas.", weight: 15, bulkPrice: 1500, bulkMin: 10 },
  { id: 8, name: "Humus de Lombriz 30L", cat: "tierra", seller: "LombriVida", price: 2200, unit: "bolsa", rating: 4.8, reviews: 201, badge: "🌱", commission: 8, hot: true, desc: "Humus puro de lombriz californiana.", weight: 12, bulkPrice: 1850, bulkMin: 10 },
  { id: 9, name: "Perlita Agrícola 100L", cat: "tierra", seller: "TierraViva", price: 4500, unit: "bolsa", rating: 4.5, reviews: 67, badge: "⚪", commission: 6, hot: false, desc: "Perlita expandida para mejorar drenaje.", weight: 8, bulkPrice: 3900, bulkMin: 8 },
  { id: 10, name: "Jazmín del País (x10)", cat: "plantas", seller: "Vivero Los Aromos", price: 4500, unit: "lote", rating: 4.9, reviews: 303, badge: "🌸", commission: 10, hot: true, desc: "Jazmín trepador aromático. Plantines de 30cm.", weight: 5, bulkPrice: 3800, bulkMin: 5 },
  { id: 11, name: "Palmera Pindó 2m", cat: "plantas", seller: "Vivero San Martín", price: 18500, unit: "unidad", rating: 4.7, reviews: 154, badge: "🌴", commission: 9, hot: true, desc: "Palmera Pindó de 2m de altura. Rústica y decorativa.", weight: 40, bulkPrice: 15800, bulkMin: 3 },
  { id: 12, name: "Lavanda Francesa (x20)", cat: "plantas", seller: "Vivero Los Aromos", price: 6200, unit: "lote", rating: 4.8, reviews: 191, badge: "💜", commission: 10, hot: true, desc: "Lavanda angustifolia en maceta de 12cm.", weight: 6, bulkPrice: 5200, bulkMin: 4 },
  { id: 13, name: "Buxus Sempervirens (x10)", cat: "plantas", seller: "TopiaryBA", price: 8900, unit: "lote", rating: 4.6, reviews: 88, badge: "🌳", commission: 9, hot: false, desc: "Boj para cercos y topiaria. Plantas de 25cm.", weight: 8, bulkPrice: 7500, bulkMin: 4 },
  { id: 14, name: "Agapanthus Azul (x15)", cat: "plantas", seller: "Vivero Los Aromos", price: 5400, unit: "lote", rating: 4.7, reviews: 127, badge: "💙", commission: 9, hot: false, desc: "Agapanto de flor azul intensa.", weight: 7, bulkPrice: 4500, bulkMin: 5 },
  { id: 15, name: "Olivo Arbequina 1.5m", cat: "plantas", seller: "OlivarSur", price: 22000, unit: "unidad", rating: 4.9, reviews: 72, badge: "🫒", commission: 10, hot: true, desc: "Olivo productivo y ornamental.", weight: 30, bulkPrice: 18500, bulkMin: 3 },
  { id: 16, name: "Photinia Red Robin (x10)", cat: "plantas", seller: "TopiaryBA", price: 7800, unit: "lote", rating: 4.5, reviews: 96, badge: "🔴", commission: 8, hot: false, desc: "Arbusto perenne con brotes rojos.", weight: 10, bulkPrice: 6600, bulkMin: 4 },
  { id: 17, name: "Helecho Serrucho", cat: "plantas", seller: "Vivero Los Aromos", price: 1200, unit: "unidad", rating: 4.4, reviews: 145, badge: "🌿", commission: 8, hot: false, desc: "Helecho nativo para canteros sombreados.", weight: 2, bulkPrice: 980, bulkMin: 15 },
  { id: 18, name: "Cica Revoluta 80cm", cat: "plantas", seller: "Vivero San Martín", price: 28000, unit: "unidad", rating: 4.8, reviews: 63, badge: "🌴", commission: 9, hot: true, desc: "Cica de 80cm, espécimen selecto.", weight: 25, bulkPrice: 24000, bulkMin: 2 },
  { id: 19, name: "Strelitzia Nicolai 1.5m", cat: "plantas", seller: "TropicalBA", price: 15000, unit: "unidad", rating: 4.7, reviews: 88, badge: "🪻", commission: 9, hot: false, desc: "Ave del paraíso gigante. Efecto tropical.", weight: 20, bulkPrice: 12800, bulkMin: 3 },
  { id: 20, name: "Kit Riego por Goteo 50m", cat: "riego", seller: "AguaVerde", price: 12800, unit: "kit", rating: 4.5, reviews: 167, badge: "💧", commission: 6, hot: false, desc: "Kit completo con goteros y filtro.", weight: 5, bulkPrice: 10800, bulkMin: 5 },
  { id: 21, name: "Programador Riego WiFi", cat: "riego", seller: "SmartGarden", price: 28500, unit: "unidad", rating: 4.8, reviews: 89, badge: "📱", commission: 7, hot: true, desc: "Controlador 6 zonas con app.", weight: 1, bulkPrice: 24500, bulkMin: 3 },
  { id: 22, name: "Aspersores Hunter PGP (x4)", cat: "riego", seller: "AguaVerde", price: 9600, unit: "pack", rating: 4.7, reviews: 213, badge: "🌊", commission: 6, hot: false, desc: "Aspersores turbina profesionales.", weight: 3, bulkPrice: 8200, bulkMin: 5 },
  { id: 23, name: "Electroválvula 1\" Rain Bird", cat: "riego", seller: "AguaVerde", price: 6800, unit: "unidad", rating: 4.6, reviews: 78, badge: "🔧", commission: 5, hot: false, desc: "Válvula solenoide profesional.", weight: 1, bulkPrice: 5800, bulkMin: 6 },
  { id: 24, name: "Cortadora Honda HRX 217", cat: "herramientas", seller: "ToolGarden", price: 485000, unit: "unidad", rating: 4.9, reviews: 42, badge: "⚙️", commission: 4, hot: false, desc: "Cortadora profesional autopropulsada.", weight: 35, bulkPrice: 460000, bulkMin: 1 },
  { id: 25, name: "Tijera Poda Felco 2", cat: "herramientas", seller: "ToolGarden", price: 45000, unit: "unidad", rating: 4.9, reviews: 234, badge: "✂️", commission: 5, hot: true, desc: "La tijera de poda estándar mundial.", weight: 0.5, bulkPrice: 39000, bulkMin: 3 },
  { id: 26, name: "Sopladora STIHL BR 450", cat: "herramientas", seller: "ToolGarden", price: 580000, unit: "unidad", rating: 4.7, reviews: 38, badge: "🌬️", commission: 4, hot: false, desc: "Sopladora mochila profesional.", weight: 10, bulkPrice: 550000, bulkMin: 1 },
  { id: 27, name: "Farola Solar LED (x6)", cat: "iluminacion", seller: "LuzVerde", price: 14500, unit: "pack", rating: 4.3, reviews: 189, badge: "☀️", commission: 7, hot: false, desc: "Balizas solares acero inox.", weight: 4, bulkPrice: 12200, bulkMin: 5 },
  { id: 28, name: "Spot Empotrable IP68 (x4)", cat: "iluminacion", seller: "LuzVerde", price: 22000, unit: "pack", rating: 4.6, reviews: 76, badge: "💡", commission: 7, hot: true, desc: "Spots empotrables LED 5W.", weight: 3, bulkPrice: 18500, bulkMin: 4 },
  { id: 29, name: "Tira LED RGB Exterior 10m", cat: "iluminacion", seller: "SmartGarden", price: 18900, unit: "kit", rating: 4.5, reviews: 112, badge: "🌈", commission: 6, hot: false, desc: "Tira LED IP65 WiFi.", weight: 1, bulkPrice: 16200, bulkMin: 5 },
  { id: 30, name: "Piedra Mar del Plata 1tn", cat: "piedras", seller: "ÁridosBA", price: 28000, unit: "tn", rating: 4.5, reviews: 98, badge: "⬜", commission: 6, hot: false, desc: "Piedra partida blanca 10-30mm.", weight: 100, bulkPrice: 24000, bulkMin: 2 },
  { id: 31, name: "Canto Rodado 500kg", cat: "piedras", seller: "ÁridosBA", price: 18500, unit: "½tn", rating: 4.6, reviews: 67, badge: "🟤", commission: 6, hot: false, desc: "Canto rodado natural 30-60mm.", weight: 50, bulkPrice: 15800, bulkMin: 2 },
  { id: 32, name: "Corteza de Pino 80L", cat: "piedras", seller: "CompostBA", price: 3200, unit: "bolsa", rating: 4.7, reviews: 156, badge: "🪵", commission: 7, hot: true, desc: "Chips de corteza para mulching.", weight: 12, bulkPrice: 2700, bulkMin: 8 },
  { id: 33, name: "Lajas Neuquén (x1m²)", cat: "piedras", seller: "ÁridosBA", price: 8500, unit: "m²", rating: 4.4, reviews: 84, badge: "🧱", commission: 5, hot: false, desc: "Lajas irregulares color ocre.", weight: 35, bulkPrice: 7200, bulkMin: 5 },
  { id: 34, name: "Macetón Fibrocemento 60cm", cat: "macetas", seller: "ContenedoresBA", price: 12500, unit: "unidad", rating: 4.6, reviews: 93, badge: "🏺", commission: 8, hot: false, desc: "Macetón rectangular 60x25x25cm.", weight: 15, bulkPrice: 10500, bulkMin: 4 },
  { id: 35, name: "Maceta Cerámica Artesanal", cat: "macetas", seller: "AlfareriaVerde", price: 8900, unit: "unidad", rating: 4.8, reviews: 145, badge: "🎨", commission: 9, hot: true, desc: "Maceta artesanal esmaltada 35cm.", weight: 5, bulkPrice: 7500, bulkMin: 6 },
  { id: 36, name: "Jardinera Madera Tratada 1m", cat: "macetas", seller: "MaderasJardín", price: 6500, unit: "unidad", rating: 4.5, reviews: 118, badge: "🪵", commission: 7, hot: false, desc: "Jardinera pino CCA 100x30x30cm.", weight: 8, bulkPrice: 5500, bulkMin: 6 },
];

const PAISAJISTAS = [
  { id: 1, name: "María Soledad Ruiz", specialty: "Jardines nativos & sustentables", rating: 4.9, jobs: 187, zone: "CABA / GBA Norte", avatar: "👩‍🌾", verified: true },
  { id: 2, name: "Carlos Méndez", specialty: "Diseño contemporáneo", rating: 4.7, jobs: 124, zone: "GBA Oeste / Sur", avatar: "👨‍🌾", verified: true },
  { id: 3, name: "Ana Luz Torres", specialty: "Terrazas, balcones & rooftops", rating: 4.8, jobs: 212, zone: "CABA", avatar: "👩‍🎨", verified: true },
  { id: 4, name: "Javier Domínguez", specialty: "Parquización comercial", rating: 4.6, jobs: 98, zone: "GBA Norte / Pilar", avatar: "👷", verified: true },
  { id: 5, name: "Luciana Ferrero", specialty: "Huertas & jardines comestibles", rating: 4.9, jobs: 156, zone: "CABA / Zona Sur", avatar: "👩‍🔬", verified: true },
];

const MONTHS = ["Ene", "Feb", "Mar", "Abr", "May", "Jun"];
const CHART_DATA = [148200, 187500, 224100, 268400, 312600, 342800];

export default function BairesGreenMarket() {
  const [tab, setTab] = useState("home");
  const [selectedCat, setSelectedCat] = useState(null);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showProduct, setShowProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [selectedZone, setSelectedZone] = useState(null);
  const [showZonePicker, setShowZonePicker] = useState(false);
  const [joinedGroups, setJoinedGroups] = useState([]);

  const filteredProducts = PRODUCTS.filter((p) => {
    const matchCat = selectedCat ? p.cat === selectedCat : true;
    const matchSearch = searchQuery
      ? p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.seller.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.desc.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    return matchCat && matchSearch;
  });

  const addToCart = (product, qty = 1) => {
    setCart((prev) => {
      const exists = prev.find((i) => i.id === product.id);
      if (exists) return prev.map((i) => (i.id === product.id ? { ...i, qty: i.qty + qty } : i));
      return [...prev, { ...product, qty }];
    });
  };

  const removeFromCart = (id) => setCart((prev) => prev.filter((i) => i.id !== id));
  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const cartCommission = cart.reduce((s, i) => s + (i.price * i.qty * i.commission) / 100, 0);
  const cartWeight = cart.reduce((s, i) => s + i.weight * i.qty, 0);
  const maxChart = Math.max(...CHART_DATA);
  const toggleGroup = (id) => setJoinedGroups(prev => prev.includes(id) ? prev.filter(g => g !== id) : [...prev, id]);

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#fafaf7", minHeight: "100vh", maxWidth: 480, margin: "0 auto", position: "relative" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Fraunces:wght@700;800;900&display=swap" rel="stylesheet" />
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { display: none; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        @keyframes slideR { from { opacity:0; transform:translateX(24px); } to { opacity:1; transform:translateX(0); } }
        @keyframes scaleIn { from { opacity:0; transform:scale(0.92); } to { opacity:1; transform:scale(1); } }
        @keyframes growBar { from { width: 0%; } }
        @keyframes pulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.04)} }
        @keyframes shimmer { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
        @keyframes truckMove { 0%{transform:translateX(-4px)} 50%{transform:translateX(4px)} 100%{transform:translateX(-4px)} }
        .fu { animation: fadeUp .5s ease both; }
        .sr { animation: slideR .4s ease both; }
        .si { animation: scaleIn .35s ease both; }
        .hov { transition: transform .15s ease, box-shadow .15s ease; }
        .hov:active { transform: scale(0.97); }
        .gb { animation: growBar 1s ease both; }
        .truck-anim { animation: truckMove 2s ease-in-out infinite; }
        .badge-shimmer { background:linear-gradient(90deg,#ff6b35 0%,#ffb347 50%,#ff6b35 100%); background-size:200% 100%; animation:shimmer 2s infinite; }
        .pulse { animation: pulse 2s ease-in-out infinite; }
        input::placeholder { color: #b0a89a; }
      `}</style>

      {/* HEADER */}
      <div style={{ background: "linear-gradient(145deg, #1a3a0a 0%, #2d5a14 40%, #3d7a1c 100%)", padding: "18px 20px 14px", position: "relative", overflow: "hidden" }}>
        <div style={{ position:"absolute", top:-40, right:-30, width:200, height:200, borderRadius:"50%", background:"radial-gradient(circle, rgba(196,232,110,0.08) 0%, transparent 70%)" }}/>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <div>
            <h1 style={{ fontFamily:"'Fraunces',serif", color:"#fff", fontSize:23, fontWeight:900, letterSpacing:-1, display:"flex", alignItems:"center", gap:5 }}>
              Baires<span style={{color:"#b8e054"}}>Green</span> Market
            </h1>
            <p style={{ color:"rgba(255,255,255,0.5)", fontSize:10, fontWeight:500, marginTop:2 }}>Marketplace profesional · Buenos Aires</p>
          </div>
          <div style={{ display:"flex", gap:8 }}>
            <button onClick={() => setShowSearch(!showSearch)} style={{ background:"rgba(255,255,255,0.1)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:12, width:38, height:38, fontSize:16, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>🔍</button>
            <button onClick={() => setShowCart(true)} style={{ background:"rgba(255,255,255,0.1)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:12, width:38, height:38, fontSize:16, cursor:"pointer", position:"relative", display:"flex", alignItems:"center", justifyContent:"center" }}>
              🛒
              {cart.length > 0 && <span className="badge-shimmer" style={{ position:"absolute", top:-5, right:-5, width:20, height:20, borderRadius:10, fontSize:10, fontWeight:800, display:"flex", alignItems:"center", justifyContent:"center", color:"#fff" }}>{cart.reduce((s,i)=>s+i.qty,0)}</span>}
            </button>
          </div>
        </div>
        <button onClick={() => setShowZonePicker(true)} style={{ marginTop:10, display:"flex", alignItems:"center", gap:8, background:"rgba(255,255,255,0.08)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:10, padding:"8px 14px", cursor:"pointer", width:"100%" }}>
          <span style={{ fontSize:16 }}>📍</span>
          <div style={{ flex:1, textAlign:"left" }}>
            <div style={{ color:"rgba(255,255,255,0.5)", fontSize:9, fontWeight:600, letterSpacing:0.5 }}>ZONA DE ENTREGA</div>
            <div style={{ color:"#fff", fontSize:12, fontWeight:700 }}>{selectedZone ? ZONES.find(z=>z.id===selectedZone)?.name + " — " + ZONES.find(z=>z.id===selectedZone)?.areas : "Seleccionar zona →"}</div>
          </div>
          {selectedZone && (() => { const z = ZONES.find(zo=>zo.id===selectedZone); return (<div style={{ textAlign:"right" }}><div style={{ fontSize:9, color:"rgba(255,255,255,0.4)" }}>Próximo envío</div><div style={{ fontSize:11, color:"#b8e054", fontWeight:700 }}>{z.nextDepart}</div></div>);})()}
        </button>
        {showSearch && <div className="fu" style={{ marginTop:10 }}><input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Buscar productos, proveedores..." autoFocus style={{ width:"100%", padding:"11px 16px", background:"rgba(255,255,255,0.1)", border:"1px solid rgba(255,255,255,0.12)", borderRadius:12, color:"#fff", fontSize:14, fontFamily:"'DM Sans',sans-serif", outline:"none" }}/></div>}
      </div>

      <div style={{ padding:"0 0 100px", overflowY:"auto" }}>
        {/* HOME */}
        {tab === "home" && (
          <div className="fu">
            <div style={{ padding:"14px 0 6px" }}>
              <div style={{ padding:"0 20px", display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
                <h2 style={{ fontSize:14, fontWeight:800, color:"#1a2e0a" }}>Categorías</h2>
                {selectedCat && <span onClick={() => {setSelectedCat(null);setSearchQuery("");}} style={{ fontSize:11, color:"#3d7a1c", fontWeight:700, cursor:"pointer", textDecoration:"underline", textUnderlineOffset:2 }}>Limpiar</span>}
              </div>
              <div style={{ display:"flex", gap:7, overflowX:"auto", padding:"0 20px 8px" }}>
                {CATEGORIES.map(cat => (
                  <div key={cat.id} onClick={() => setSelectedCat(selectedCat===cat.id?null:cat.id)} className="hov" style={{ minWidth:74, background:selectedCat===cat.id?"linear-gradient(145deg,#2d5a14,#4a8a28)":"#fff", borderRadius:13, padding:"11px 8px", textAlign:"center", cursor:"pointer", border:selectedCat===cat.id?"none":"1px solid #ece8e0", boxShadow:selectedCat===cat.id?"0 4px 16px rgba(45,90,20,0.25)":"none" }}>
                    <div style={{ fontSize:22, marginBottom:3 }}>{cat.icon}</div>
                    <div style={{ fontSize:9, fontWeight:700, color:selectedCat===cat.id?"#fff":"#1a2e0a", lineHeight:1.2 }}>{cat.name}</div>
                  </div>
                ))}
              </div>
            </div>

            {selectedZone && (() => { const z = ZONES.find(zo => zo.id === selectedZone); const almostFull = z.filled >= 80; return (
              <div style={{ padding:"2px 20px 8px" }}>
                <div className={almostFull?"pulse":""} style={{ background:almostFull?"linear-gradient(135deg,#ff6b35,#ff8f5e)":"linear-gradient(135deg,#1a3a0a,#2d5a14)", borderRadius:16, padding:"14px 18px", position:"relative", overflow:"hidden" }}>
                  <div style={{ position:"absolute", right:12, top:8, fontSize:36, opacity:0.15 }} className="truck-anim">🚛</div>
                  <div style={{ color:almostFull?"#fff":"#b8e054", fontWeight:800, fontSize:12, marginBottom:4 }}>{almostFull ? "⚡ ¡CAMIÓN CASI COMPLETO!" : "🚛 Camión " + z.name}</div>
                  <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:6 }}>
                    <div style={{ flex:1, background:"rgba(255,255,255,0.15)", borderRadius:4, height:8, width:160, overflow:"hidden" }}><div style={{ width:`${z.filled}%`, height:"100%", background:almostFull?"#fff":"#b8e054", borderRadius:4 }}/></div>
                    <span style={{ color:"#fff", fontSize:12, fontWeight:800 }}>{z.filled}%</span>
                  </div>
                  <div style={{ color:"rgba(255,255,255,0.7)", fontSize:10 }}>Sale <strong style={{color:"#fff"}}>{z.nextDepart}</strong> · {almostFull?"¡Últimos lugares!":"Sumá tu pedido y ahorrá en flete"}</div>
                </div>
              </div>
            );})()}

            {!selectedCat && !searchQuery && (
              <div style={{ padding:"2px 20px 8px" }}>
                <div style={{ background:"linear-gradient(135deg,#0c2461,#1e3c72)", borderRadius:16, padding:"14px 18px", position:"relative", overflow:"hidden" }}>
                  <div style={{ position:"absolute", right:-5, bottom:-5, fontSize:60, opacity:0.08 }}>👥</div>
                  <div style={{ color:"#74b9ff", fontWeight:800, fontSize:12, marginBottom:2 }}>🤝 COMPRA GRUPAL ACTIVA</div>
                  <div style={{ color:"rgba(255,255,255,0.8)", fontSize:11, lineHeight:1.4 }}>Juntate con otros paisajistas, completá un camión y obtené <strong style={{color:"#fff"}}>precio mayorista</strong></div>
                </div>
              </div>
            )}

            <div style={{ padding:"6px 20px 6px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <h2 style={{ fontSize:14, fontWeight:800, color:"#1a2e0a" }}>{selectedCat ? CATEGORIES.find(c=>c.id===selectedCat)?.name : searchQuery ? "Resultados" : "Catálogo"}</h2>
              <span style={{ fontSize:11, color:"#b0a89a", fontWeight:600 }}>{filteredProducts.length} productos</span>
            </div>

            <div style={{ padding:"0 20px", display:"flex", flexDirection:"column", gap:10 }}>
              {filteredProducts.map((p, i) => (
                <div key={p.id} onClick={() => setShowProduct(p)} className="hov sr" style={{ background:"#fff", borderRadius:16, padding:13, display:"flex", gap:12, cursor:"pointer", border:"1px solid #ece8e0", animationDelay:`${i*0.03}s`, position:"relative" }}>
                  {p.hot && <div style={{ position:"absolute", top:9, right:9, background:"linear-gradient(135deg,#ff6b35,#ff8f5e)", color:"#fff", fontSize:8, fontWeight:800, padding:"2px 7px", borderRadius:6 }}>POPULAR</div>}
                  {p.bulkPrice < p.price && <div style={{ position:"absolute", top:9, right:p.hot?65:9, background:"linear-gradient(135deg,#0c2461,#1e3c72)", color:"#74b9ff", fontSize:8, fontWeight:800, padding:"2px 7px", borderRadius:6 }}>GRUPAL</div>}
                  <div style={{ width:64, height:64, borderRadius:13, background:"linear-gradient(145deg,#f0eeea,#e8e4dc)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:30, flexShrink:0 }}>{p.badge}</div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:13, fontWeight:700, color:"#1a2e0a", marginBottom:2, lineHeight:1.3 }}>{p.name}</div>
                    <div style={{ fontSize:10, color:"#b0a89a", marginBottom:5, fontWeight:500 }}>{p.seller} · {p.weight}kg</div>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end" }}>
                      <div>
                        <span style={{ fontSize:16, fontWeight:800, color:"#1a3a0a" }}>${p.price.toLocaleString()}</span>
                        <span style={{ fontSize:10, color:"#b0a89a", marginLeft:3 }}>/{p.unit}</span>
                        {p.bulkPrice < p.price && <div style={{ fontSize:10, color:"#3b82f6", fontWeight:700 }}>Grupal: ${p.bulkPrice.toLocaleString()}</div>}
                      </div>
                      <div style={{ display:"flex", alignItems:"center", gap:5 }}>
                        <span style={{ fontSize:9, color:"#3d7a1c", fontWeight:700, background:"rgba(61,122,28,0.08)", padding:"2px 5px", borderRadius:4 }}>{p.commission}%</span>
                        <span style={{ fontSize:10, color:"#c4a23a", fontWeight:600 }}>★ {p.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {filteredProducts.length === 0 && <div style={{ textAlign:"center", padding:"40px 0", color:"#b0a89a" }}><div style={{ fontSize:48, marginBottom:12 }}>🔍</div><div style={{ fontSize:14, fontWeight:600 }}>No se encontraron productos</div></div>}
            </div>
          </div>
        )}

        {/* LOGISTICS */}
        {tab === "logistics" && (
          <div className="fu" style={{ padding:"16px 20px" }}>
            <h2 style={{ fontSize:18, fontWeight:800, color:"#1a2e0a" }}>Camiones & Zonas</h2>
            <p style={{ fontSize:12, color:"#b0a89a", marginTop:2, marginBottom:14 }}>Consolidá pedidos, compartí flete y ahorrá hasta 40%</p>
            <div style={{ background:"#fff", borderRadius:16, padding:16, border:"1px solid #ece8e0", marginBottom:14 }}>
              <div style={{ fontSize:13, fontWeight:800, color:"#1a2e0a", marginBottom:12 }}>¿Cómo funciona?</div>
              {[{ s:"1", icon:"📦", t:"Sumá tu pedido", d:"Elegí productos y zona de entrega" },{ s:"2", icon:"👥", t:"Se consolida", d:"Se suma al de otros paisajistas" },{ s:"3", icon:"🚛", t:"Camión completo", d:"Sale el envío con flete compartido" },{ s:"4", icon:"💰", t:"Ahorrás en todo", d:"Mayorista + flete dividido" }].map(s => (
                <div key={s.s} style={{ display:"flex", gap:12, alignItems:"center", marginBottom:10 }}>
                  <div style={{ width:40, height:40, borderRadius:12, background:"linear-gradient(145deg,#f0eeea,#e8e4dc)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, flexShrink:0 }}>{s.icon}</div>
                  <div><div style={{ fontSize:12, fontWeight:700, color:"#1a2e0a" }}>{s.t}</div><div style={{ fontSize:11, color:"#b0a89a" }}>{s.d}</div></div>
                </div>
              ))}
            </div>
            <div style={{ fontSize:13, fontWeight:800, color:"#1a2e0a", marginBottom:10 }}>Camiones activos</div>
            {ZONES.map((z, i) => { const af = z.filled >= 80; const joined = joinedGroups.includes(z.id); return (
              <div key={z.id} className="sr" style={{ background:"#fff", borderRadius:16, padding:16, border:af?`2px solid ${z.color}`:"1px solid #ece8e0", animationDelay:`${i*0.06}s`, position:"relative", overflow:"hidden", marginBottom:10 }}>
                {af && <div style={{ position:"absolute", top:0, right:0, background:z.color, color:"#fff", fontSize:8, fontWeight:800, padding:"3px 10px", borderRadius:"0 0 0 10px" }}>CASI LLENO</div>}
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:10 }}>
                  <div><div style={{ fontSize:15, fontWeight:800, color:"#1a2e0a" }}>🚛 {z.name}</div><div style={{ fontSize:11, color:"#b0a89a", marginTop:2 }}>{z.areas}</div></div>
                  <div style={{ textAlign:"right" }}><div style={{ fontSize:10, color:"#b0a89a" }}>Salida</div><div style={{ fontSize:13, fontWeight:800, color:z.color }}>{z.nextDepart}</div></div>
                </div>
                <div style={{ marginBottom:10 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}><span style={{ fontSize:11, color:"#888", fontWeight:600 }}>Capacidad</span><span style={{ fontSize:12, fontWeight:800, color:z.color }}>{z.filled}%</span></div>
                  <div style={{ background:"#f5f3ee", borderRadius:5, height:8, overflow:"hidden" }}><div className="gb" style={{ width:`${z.filled}%`, height:"100%", background:z.color, borderRadius:5, animationDelay:`${i*0.1}s` }}/></div>
                </div>
                <div style={{ display:"flex", gap:8 }}>
                  <button onClick={() => { setSelectedZone(z.id); setTab("home"); }} className="hov" style={{ flex:1, padding:10, background:"linear-gradient(145deg,#2d5a14,#3d7a1c)", color:"#fff", border:"none", borderRadius:10, fontSize:12, fontWeight:700, cursor:"pointer" }}>Sumar pedido</button>
                  <button onClick={() => toggleGroup(z.id)} className="hov" style={{ flex:1, padding:10, background:joined?"rgba(61,122,28,0.1)":"#fafaf7", color:joined?"#3d7a1c":"#888", border:joined?"2px solid #3d7a1c":"1px solid #ece8e0", borderRadius:10, fontSize:12, fontWeight:700, cursor:"pointer" }}>{joined?"✓ Unido":"Unirme al grupo"}</button>
                </div>
              </div>
            );})}
            <div style={{ background:"linear-gradient(145deg,#1a3a0a,#2d5a14)", borderRadius:18, padding:18, marginTop:4 }}>
              <div style={{ color:"#b8e054", fontWeight:800, fontSize:13, marginBottom:10 }}>💡 Ejemplo de ahorro</div>
              <div style={{ display:"flex", gap:8 }}>
                {[{ l:"Individual", v:"$185.000", s:"Flete: $28.000", c:"rgba(255,255,255,0.5)" },{ l:"Consolidado", v:"$152.400", s:"Flete: $4.200", c:"#b8e054" }].map(s => (
                  <div key={s.l} style={{ flex:1, background:"rgba(255,255,255,0.06)", borderRadius:12, padding:12, textAlign:"center" }}>
                    <div style={{ fontSize:9, color:"rgba(255,255,255,0.4)", fontWeight:600, marginBottom:4 }}>{s.l}</div>
                    <div style={{ fontSize:18, fontWeight:900, color:s.c }}>{s.v}</div>
                    <div style={{ fontSize:10, color:"rgba(255,255,255,0.3)", marginTop:2 }}>{s.s}</div>
                  </div>
                ))}
              </div>
              <div style={{ textAlign:"center", marginTop:10, color:"#b8e054", fontSize:13, fontWeight:800 }}>Ahorro: $56.400 (−30%) 🎉</div>
            </div>
          </div>
        )}

        {/* PROS */}
        {tab === "pros" && (
          <div className="fu" style={{ padding:"16px 20px" }}>
            <h2 style={{ fontSize:18, fontWeight:800, color:"#1a2e0a" }}>Red de Profesionales</h2>
            <p style={{ fontSize:12, color:"#b0a89a", marginTop:2, marginBottom:16 }}>Referí clientes, ganá comisión por proyecto</p>
            {PAISAJISTAS.map((p, i) => (
              <div key={p.id} className="hov sr" style={{ background:"#fff", borderRadius:18, padding:16, border:"1px solid #ece8e0", animationDelay:`${i*0.07}s`, marginBottom:12 }}>
                <div style={{ display:"flex", gap:12, alignItems:"center", marginBottom:12 }}>
                  <div style={{ width:48, height:48, borderRadius:14, background:"linear-gradient(145deg,#e8f0d8,#d4e4b8)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:24, position:"relative" }}>
                    {p.avatar}
                    {p.verified && <div style={{ position:"absolute", bottom:-2, right:-2, background:"#3d7a1c", borderRadius:7, width:15, height:15, display:"flex", alignItems:"center", justifyContent:"center", fontSize:8, border:"2px solid #fff", color:"#fff" }}>✓</div>}
                  </div>
                  <div style={{ flex:1 }}><div style={{ fontSize:14, fontWeight:700, color:"#1a2e0a" }}>{p.name}</div><div style={{ fontSize:11, color:"#3d7a1c", fontWeight:600 }}>{p.specialty}</div></div>
                </div>
                <div style={{ display:"flex", gap:6 }}>
                  {[{l:"Rating",v:`★ ${p.rating}`},{l:"Proyectos",v:p.jobs},{l:"Zona",v:p.zone}].map(s => (
                    <div key={s.l} style={{ background:"#fafaf7", borderRadius:9, padding:"7px 8px", flex:1, textAlign:"center", border:"1px solid #f0ece4" }}><div style={{ fontSize:8, color:"#b0a89a", fontWeight:600, marginBottom:2 }}>{s.l}</div><div style={{ fontSize:10, fontWeight:700, color:"#1a2e0a" }}>{s.v}</div></div>
                  ))}
                </div>
                <button className="hov" style={{ width:"100%", marginTop:10, padding:10, background:"linear-gradient(145deg,#2d5a14,#3d7a1c)", color:"#fff", border:"none", borderRadius:11, fontSize:12, fontWeight:700, cursor:"pointer" }}>Referir Cliente → 12% comisión</button>
              </div>
            ))}
          </div>
        )}

        {/* STATS */}
        {tab === "stats" && (
          <div className="fu" style={{ padding:"16px 20px" }}>
            <h2 style={{ fontSize:18, fontWeight:800, color:"#1a2e0a" }}>Dashboard</h2>
            <p style={{ fontSize:12, color:"#b0a89a", marginTop:2, marginBottom:14 }}>Comisiones y métricas</p>
            <div style={{ background:"linear-gradient(145deg,#1a3a0a,#2d5a14,#3d7a1c)", borderRadius:20, padding:"20px 22px", marginBottom:14, position:"relative", overflow:"hidden" }}>
              <div style={{ position:"absolute", top:-30, right:-20, width:160, height:160, borderRadius:"50%", background:"radial-gradient(circle,rgba(184,224,84,0.1) 0%,transparent 70%)" }}/>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                <div>
                  <div style={{ color:"rgba(255,255,255,0.5)", fontSize:10, fontWeight:600, letterSpacing:0.5, marginBottom:3 }}>COMISIONES MES</div>
                  <div style={{ fontFamily:"'Fraunces',serif", color:"#b8e054", fontSize:36, fontWeight:900, letterSpacing:-1 }}>$342.800</div>
                  <div style={{ display:"inline-flex", alignItems:"center", gap:4, marginTop:5, background:"rgba(184,224,84,0.15)", padding:"3px 9px", borderRadius:7 }}>
                    <span style={{ color:"#b8e054", fontSize:11, fontWeight:700 }}>↑ 23.4%</span>
                  </div>
                </div>
                <div style={{ textAlign:"right" }}><div style={{ color:"rgba(255,255,255,0.4)", fontSize:9 }}>ACUMULADO</div><div style={{ color:"#fff", fontSize:17, fontWeight:800, marginTop:2 }}>$1.483.600</div></div>
              </div>
              <div style={{ display:"flex", alignItems:"flex-end", gap:5, marginTop:16, height:45 }}>
                {CHART_DATA.map((v, i) => (<div key={i} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:3 }}><div className="gb" style={{ width:"100%", borderRadius:3, height:`${(v/maxChart)*45}px`, background:i===CHART_DATA.length-1?"#b8e054":"rgba(184,224,84,0.25)", animationDelay:`${i*0.1}s` }}/><span style={{ fontSize:7, color:"rgba(255,255,255,0.35)", fontWeight:600 }}>{MONTHS[i]}</span></div>))}
              </div>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:9, marginBottom:14 }}>
              {[{l:"Ventas referidas",v:"1.247",i:"📦",t:"+12%"},{l:"Proveedores",v:"48",i:"🏪",t:"+5"},{l:"Camiones enviados",v:"23",i:"🚛",t:"+8"},{l:"Ahorro fletes",v:"$412k",i:"💸",t:"-34%"}].map((s,i) => (
                <div key={s.l} className="si" style={{ background:"#fff", borderRadius:14, padding:14, border:"1px solid #ece8e0", animationDelay:`${i*0.08}s` }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:6 }}><span style={{ fontSize:20 }}>{s.i}</span><span style={{ fontSize:9, color:"#3d7a1c", fontWeight:700, background:"rgba(61,122,28,0.08)", padding:"2px 6px", borderRadius:5 }}>{s.t}</span></div>
                  <div style={{ fontSize:20, fontWeight:800, color:"#1a2e0a" }}>{s.v}</div>
                  <div style={{ fontSize:10, color:"#b0a89a", fontWeight:600, marginTop:2 }}>{s.l}</div>
                </div>
              ))}
            </div>
            <div style={{ background:"#fff", borderRadius:16, padding:16, border:"1px solid #ece8e0" }}>
              <div style={{ fontSize:13, fontWeight:800, color:"#1a2e0a", marginBottom:12 }}>Últimas comisiones</div>
              {[{p:"Grama Bahiana x120m²",b:"Nordelta",c:8160,t:"2hs",tp:"📦"},{p:"Camión GBA Norte",b:"Flete x8 paisajistas",c:12400,t:"1 día",tp:"🚛"},{p:"Palmera Pindó x3",b:"Barrio Privado",c:4995,t:"1 día",tp:"📦"},{p:"Referido → A.L. Torres",b:"Terraza Recoleta",c:24000,t:"2 días",tp:"🤝"},{p:"Compra grupal Tierra",b:"12 paisajistas · 45m³",c:18900,t:"3 días",tp:"👥"}].map((t,i) => (
                <div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"9px 0", borderBottom:i<4?"1px solid #f5f3ee":"none" }}>
                  <div style={{ display:"flex", gap:8, alignItems:"center" }}><span style={{ fontSize:16 }}>{t.tp}</span><div><div style={{ fontSize:12, fontWeight:600, color:"#1a2e0a" }}>{t.p}</div><div style={{ fontSize:10, color:"#b0a89a" }}>{t.b} · {t.t}</div></div></div>
                  <div style={{ fontSize:13, fontWeight:800, color:"#3d7a1c" }}>+${t.c.toLocaleString()}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* PRODUCT MODAL */}
      {showProduct && (
        <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.5)", zIndex:100, display:"flex", alignItems:"flex-end", justifyContent:"center", backdropFilter:"blur(4px)" }} onClick={() => setShowProduct(null)}>
          <div onClick={e => e.stopPropagation()} className="fu" style={{ background:"#fff", borderRadius:"26px 26px 0 0", padding:22, width:"100%", maxWidth:480, maxHeight:"85vh", overflowY:"auto" }}>
            <div style={{ width:40, height:4, background:"#e0dcd4", borderRadius:2, margin:"0 auto 16px" }}/>
            <div style={{ textAlign:"center", marginBottom:14 }}>
              <div style={{ width:72, height:72, borderRadius:20, margin:"0 auto 12px", background:"linear-gradient(145deg,#f0eeea,#e8e4dc)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:38 }}>{showProduct.badge}</div>
              <h3 style={{ fontSize:19, fontWeight:800, color:"#1a2e0a" }}>{showProduct.name}</h3>
              <p style={{ fontSize:12, color:"#b0a89a", marginTop:3 }}>{showProduct.seller} · {showProduct.weight}kg/{showProduct.unit}</p>
            </div>
            <p style={{ fontSize:12, color:"#666", lineHeight:1.6, textAlign:"center", marginBottom:16, padding:"0 8px" }}>{showProduct.desc}</p>
            <div style={{ display:"flex", gap:6, marginBottom:14 }}>
              {[{l:"Precio unit.",v:`$${showProduct.price.toLocaleString()}`,s:`/${showProduct.unit}`,c:"#1a3a0a"},{l:"Precio grupal",v:`$${showProduct.bulkPrice.toLocaleString()}`,s:`mín. ${showProduct.bulkMin}`,c:"#3b82f6"},{l:"Tu comisión",v:`${showProduct.commission}%`,s:`$${Math.round(showProduct.price*showProduct.commission/100).toLocaleString()}`,c:"#ff6b35"}].map(s => (
                <div key={s.l} style={{ flex:1, background:"#fafaf7", borderRadius:13, padding:"10px 8px", textAlign:"center", border:"1px solid #ece8e0" }}>
                  <div style={{ fontSize:8, color:"#b0a89a", fontWeight:600, marginBottom:2 }}>{s.l}</div>
                  <div style={{ fontSize:16, fontWeight:800, color:s.c }}>{s.v}</div>
                  <div style={{ fontSize:9, color:"#b0a89a", marginTop:1 }}>{s.s}</div>
                </div>
              ))}
            </div>
            {showProduct.bulkPrice < showProduct.price && (
              <div style={{ background:"#eef6ff", border:"1px solid #bdd9f7", borderRadius:12, padding:"10px 14px", marginBottom:14, display:"flex", alignItems:"center", gap:10 }}>
                <span style={{ fontSize:22 }}>👥</span>
                <div><div style={{ fontSize:11, fontWeight:700, color:"#1e3c72" }}>Grupal: ahorrás <span style={{ fontSize:14, fontWeight:900 }}>${(showProduct.price - showProduct.bulkPrice).toLocaleString()}</span>/{showProduct.unit}</div><div style={{ fontSize:10, color:"#5b8abf", marginTop:1 }}>Mín. {showProduct.bulkMin} {showProduct.unit} · Se suma al camión</div></div>
              </div>
            )}
            <div style={{ background:"#fff8ed", border:"1px solid #ffe0b2", borderRadius:12, padding:"10px 14px", marginBottom:16, display:"flex", alignItems:"center", gap:10 }}>
              <span style={{ fontSize:22 }}>💰</span>
              <div><div style={{ fontSize:11, fontWeight:700, color:"#b36b00" }}>Ganás <span style={{ fontSize:15, fontWeight:900 }}>${Math.round(showProduct.price*showProduct.commission/100).toLocaleString()}</span> por venta</div><div style={{ fontSize:10, color:"#c88a30", marginTop:1 }}>Comisión al confirmar entrega</div></div>
            </div>
            <div style={{ display:"flex", gap:8 }}>
              <button onClick={() => { addToCart(showProduct); setShowProduct(null); }} className="hov" style={{ flex:1, padding:14, background:"linear-gradient(145deg,#2d5a14,#3d7a1c)", color:"#fff", border:"none", borderRadius:13, fontSize:14, fontWeight:700, cursor:"pointer" }}>Agregar</button>
              <button onClick={() => { addToCart(showProduct, showProduct.bulkMin); setShowProduct(null); }} className="hov" style={{ flex:1, padding:14, background:"linear-gradient(145deg,#0c2461,#1e3c72)", color:"#74b9ff", border:"none", borderRadius:13, fontSize:13, fontWeight:700, cursor:"pointer" }}>Grupal x{showProduct.bulkMin}</button>
            </div>
          </div>
        </div>
      )}

      {/* CART MODAL */}
      {showCart && (
        <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.5)", zIndex:100, display:"flex", alignItems:"flex-end", justifyContent:"center", backdropFilter:"blur(4px)" }} onClick={() => setShowCart(false)}>
          <div onClick={e=>e.stopPropagation()} className="fu" style={{ background:"#fff", borderRadius:"26px 26px 0 0", padding:22, width:"100%", maxWidth:480, maxHeight:"80vh", overflowY:"auto" }}>
            <div style={{ width:40, height:4, background:"#e0dcd4", borderRadius:2, margin:"0 auto 16px" }}/>
            <h3 style={{ fontSize:17, fontWeight:800, color:"#1a2e0a", marginBottom:14 }}>Pedido actual</h3>
            {cart.length === 0 ? (
              <div style={{ textAlign:"center", padding:"30px 0" }}><div style={{ fontSize:48, marginBottom:12 }}>🛒</div><div style={{ fontSize:14, fontWeight:600, color:"#b0a89a" }}>Carrito vacío</div></div>
            ) : (<>
              {selectedZone ? (
                <div style={{ background:"rgba(61,122,28,0.06)", border:"1px solid rgba(61,122,28,0.15)", borderRadius:12, padding:"10px 14px", marginBottom:14, display:"flex", alignItems:"center", gap:8 }}>
                  <span style={{ fontSize:18 }}>🚛</span>
                  <div><div style={{ fontSize:11, fontWeight:700, color:"#3d7a1c" }}>Envío a {ZONES.find(z=>z.id===selectedZone)?.name}</div><div style={{ fontSize:10, color:"#888" }}>Salida: {ZONES.find(z=>z.id===selectedZone)?.nextDepart} · {cartWeight}kg</div></div>
                </div>
              ) : (
                <div onClick={() => { setShowCart(false); setShowZonePicker(true); }} style={{ background:"#fff8ed", border:"1px solid #ffe0b2", borderRadius:12, padding:"10px 14px", marginBottom:14, cursor:"pointer", display:"flex", alignItems:"center", gap:8 }}>
                  <span style={{ fontSize:18 }}>⚠️</span><div style={{ fontSize:11, fontWeight:700, color:"#b36b00" }}>Seleccioná zona para consolidar envío →</div>
                </div>
              )}
              {cart.map(item => (
                <div key={item.id} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"10px 0", borderBottom:"1px solid #f5f3ee" }}>
                  <div style={{ display:"flex", gap:8, alignItems:"center" }}><span style={{ fontSize:20 }}>{item.badge}</span><div><div style={{ fontSize:12, fontWeight:700, color:"#1a2e0a" }}>{item.name}</div><div style={{ fontSize:10, color:"#b0a89a" }}>x{item.qty} · {item.weight*item.qty}kg</div></div></div>
                  <div style={{ textAlign:"right", display:"flex", alignItems:"center", gap:6 }}>
                    <div><div style={{ fontSize:13, fontWeight:800, color:"#1a3a0a" }}>${(item.price*item.qty).toLocaleString()}</div><div style={{ fontSize:9, color:"#ff6b35", fontWeight:600 }}>+${Math.round(item.price*item.qty*item.commission/100).toLocaleString()}</div></div>
                    <button onClick={() => removeFromCart(item.id)} style={{ background:"none", border:"none", fontSize:14, cursor:"pointer", opacity:0.3, padding:4 }}>✕</button>
                  </div>
                </div>
              ))}
              <div style={{ marginTop:14, background:"#fafaf7", borderRadius:14, padding:14, border:"1px solid #ece8e0" }}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}><span style={{ fontSize:12, color:"#888" }}>Subtotal</span><span style={{ fontSize:15, fontWeight:800, color:"#1a2e0a" }}>${cartTotal.toLocaleString()}</span></div>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}><span style={{ fontSize:12, color:"#888" }}>Peso</span><span style={{ fontSize:13, fontWeight:700, color:"#1a2e0a" }}>{cartWeight}kg</span></div>
                <div style={{ display:"flex", justifyContent:"space-between", paddingTop:6, borderTop:"1px dashed #e0dcd4" }}><span style={{ fontSize:12, color:"#ff6b35", fontWeight:700 }}>Tu comisión</span><span style={{ fontSize:17, fontWeight:900, color:"#ff6b35" }}>${Math.round(cartCommission).toLocaleString()}</span></div>
              </div>
              <button className="hov" style={{ width:"100%", marginTop:12, padding:14, background:"linear-gradient(145deg,#2d5a14,#3d7a1c)", color:"#fff", border:"none", borderRadius:13, fontSize:14, fontWeight:700, cursor:"pointer" }}>{selectedZone ? `Confirmar → Camión ${ZONES.find(z=>z.id===selectedZone)?.name}` : "Confirmar pedido"}</button>
            </>)}
          </div>
        </div>
      )}

      {/* ZONE PICKER */}
      {showZonePicker && (
        <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.5)", zIndex:100, display:"flex", alignItems:"flex-end", justifyContent:"center", backdropFilter:"blur(4px)" }} onClick={() => setShowZonePicker(false)}>
          <div onClick={e=>e.stopPropagation()} className="fu" style={{ background:"#fff", borderRadius:"26px 26px 0 0", padding:22, width:"100%", maxWidth:480 }}>
            <div style={{ width:40, height:4, background:"#e0dcd4", borderRadius:2, margin:"0 auto 16px" }}/>
            <h3 style={{ fontSize:17, fontWeight:800, color:"#1a2e0a", marginBottom:4 }}>Zona de entrega</h3>
            <p style={{ fontSize:11, color:"#b0a89a", marginBottom:14 }}>Tu pedido se suma al camión de la zona</p>
            {ZONES.map(z => (
              <button key={z.id} onClick={() => { setSelectedZone(z.id); setShowZonePicker(false); }} className="hov" style={{ display:"flex", justifyContent:"space-between", alignItems:"center", background:selectedZone===z.id?"rgba(61,122,28,0.06)":"#fafaf7", border:selectedZone===z.id?"2px solid #3d7a1c":"1px solid #ece8e0", borderRadius:14, padding:"12px 16px", cursor:"pointer", textAlign:"left", width:"100%", marginBottom:8 }}>
                <div><div style={{ fontSize:14, fontWeight:700, color:"#1a2e0a" }}>📍 {z.name}</div><div style={{ fontSize:11, color:"#b0a89a" }}>{z.areas}</div></div>
                <div style={{ textAlign:"right" }}><div style={{ fontSize:12, fontWeight:800, color:z.color }}>{z.filled}%</div><div style={{ fontSize:10, color:"#b0a89a" }}>{z.nextDepart}</div></div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* BOTTOM NAV */}
      <div style={{ position:"fixed", bottom:0, left:"50%", transform:"translateX(-50%)", width:"100%", maxWidth:480, background:"rgba(255,255,255,0.96)", backdropFilter:"blur(20px)", borderTop:"1px solid #ece8e0", display:"flex", justifyContent:"space-around", padding:"6px 0 20px", zIndex:50 }}>
        {[{id:"home",icon:"🏠",label:"Catálogo"},{id:"logistics",icon:"🚛",label:"Camiones"},{id:"pros",icon:"👷‍♂️",label:"Profesionales"},{id:"stats",icon:"📊",label:"Dashboard"}].map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{ background:"none", border:"none", display:"flex", flexDirection:"column", alignItems:"center", gap:2, cursor:"pointer", padding:"4px 12px", position:"relative" }}>
            <span style={{ fontSize:18, filter:tab===t.id?"none":"grayscale(1)", opacity:tab===t.id?1:0.4, transition:"all .2s" }}>{t.icon}</span>
            <span style={{ fontSize:9, fontWeight:700, color:tab===t.id?"#2d5a14":"#b0a89a" }}>{t.label}</span>
            {t.id==="logistics" && ZONES.some(z=>z.filled>=80) && tab!=="logistics" && <div style={{ position:"absolute", top:0, right:8, width:7, height:7, borderRadius:4, background:"#ff6b35" }}/>}
            {tab===t.id && <div style={{ position:"absolute", top:-1, width:20, height:3, background:"#3d7a1c", borderRadius:2 }}/>}
          </button>
        ))}
      </div>
    </div>
  );
}
