import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

// ─── CONFIGURAÇÃO DO SUPABASE ────────────────────────────────────────────────
const SUPABASE_URL = "https://ddgusvxkzjoshugskoav.supabase.co"; 
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRkZ3Vzdnhrempvc2h1Z3Nrb2F2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk5NzQ5MjcsImV4cCI6MjA5NTU1MDkyN30.6lPaGxzhK49MJTv9uq9mQiM9f-5x4XORv-mTPUljagw";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ─── Dados Estáticos (Mantidos no Código) ─────────────────────────────────────
const defaultData = {
  products: [
    { id: "pr1", name: "Sapatos Gar", category: "Calçado", sizes: ["35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46"] },
    { id: "pr2", name: "T-shirt Preta", category: "Fardamento", sizes: ["XS", "S", "M", "L", "XL", "XXL"] },
    { id: "pr3", name: "Luva Nylon", category: "Luvas", sizes: ["5", "6", "7", "8", "9", "10"] },
    { id: "pr4", name: "Colete Refletor", category: "Fardamento", sizes: ["XS", "S", "M", "L", "XL", "XXL"] },
    { id: "pr5", name: "Casaco Polar", category: "Fardamento", sizes: ["S", "M", "L", "XL", "XXL"] },
    { id: "pr6", name: "Polo Alta Visibilidade", category: "Fardamento", sizes: ["S", "M", "L", "XL", "XXL"] },
    { id: "pr7", name: "Sweat Preta", category: "Fardamento", sizes: ["XS", "S", "M", "L", "XL", "XXL"] },
    { id: "pr8", name: "Kispo Preto", category: "Fardamento", sizes: ["XS", "S", "M", "L", "XL", "XXL"] },
    { id: "pr9", name: "Kispo Refletor", category: "Fardamento", sizes: ["XS", "S", "M", "L", "XL", "XXL"] },
    { id: "pr10", name: "Calças", category: "Fardamento", sizes: ["S", "M", "L", "XL", "XXL"] },
    { id: "pr11", name: "Colete Preto", category: "Fardamento", sizes: ["S", "M", "L", "XL", "XXL"] },
    { id: "pr12", name: "Colete Eletrónico", category: "Fardamento", sizes: ["S", "M", "L", "XL", "XXL"] },
  ],
  clients: [
    { id: "cl1", name: "P000542 VESTAS (PORTUGAL) SERVIÇOS DE TECNOLOGIA EÓLICA, LDA" },
    { id: "cl2", name: "P000640 JOHNSON & JOHNSON" },
    { id: "cl3", name: "P000819 CATLC OPERAÇÕES LOGÍSTICAS" },
    { id: "cl4", name: "P001072 JASEN" },
    { id: "cl5", name: "P001075 YILPORT SADOPORT SETÚBAL" },
    { id: "cl6", name: "P001240 QUINTA AND VINEYARD AND BOTTLERS" },
    { id: "cl7", name: "P001242 SILFEL II" },
    { id: "cl8", name: "P001244 GROSSÃO COMERCIO DE BEBIDAS" },
    { id: "cl9", name: "P001245 QUINTA DA BOEIRA ARTE E CULTURA LDA" },
    { id: "cl10", name: "P001258 OLICARGO SA" },
    { id: "cl11", name: "P001291 LACTOGAL PRODUTOS ALIMENTARES - MODIVAS" },
    { id: "cl12", name: "P001300 CLA CATERING LINHAS AÉREAS" },
    { id: "cl13", name: "P001329 LACTOGAL PRODUTOS ALIMENTARES - OLIVEIRA AZEMÉIS" },
    { id: "cl14", name: "P001338 COMP GERAL DA AGRIC DAS VINHAS DO ALTO DOURO" },
    { id: "cl15", name: "P001341 BIZFUTURE" },
    { id: "cl16", name: "P001344 PLURICOSMÉTICA" },
    { id: "cl17", name: "P001347 GRIFOLS" },
    { id: "cl18", name: "P001354 JP SÁ COUTO" },
    { id: "cl19", name: "P001355 NANTAPORTUGAL" },
    { id: "cl20", name: "P001357 CODOGNOTTO PORTUGAL LDA" },
    { id: "cl21", name: "P001359 FERBAR PRODUTOS ALIMENTARES" },
    { id: "cl22", name: "P001372 FIRMO GAIA" },
    { id: "cl23", name: "P001373 AUCHAN AUDITORIA & INVENTARIO" },
    { id: "cl24", name: "P001376 SALSA" },
    { id: "cl25", name: "P001380 ALIBAR" },
    { id: "cl26", name: "P001385 CARE TO BEAUTY" },
    { id: "cl27", name: "P001391 TRANSNAUTICA HÔMA" },
    { id: "cl28", name: "P001400 TRANSNAUTICA V. PINHEIRO" },
    { id: "cl29", name: "P001403 SOC NOGUEIRA RUEDA (QVB)" },
    { id: "cl30", name: "P001413 GRANVINHOS" },
    { id: "cl31", name: "P001419 DS SMITH" },
    { id: "cl32", name: "P001435 GRIFOLS" },
    { id: "cl33", name: "P001437 TRANSNAUTICA OP BCM" },
    { id: "cl34", name: "P001440 CLA II" },
    { id: "cl35", name: "P001442 TESTA & CUNHA" },
    { id: "cl36", name: "P001453 CABELTE" },
    { id: "cl37", name: "P001457 VSM" },
    { id: "cl38", name: "P001464 KORBER" },
    { id: "cl39", name: "P001477 NOVARROZ" },
    { id: "cl40", name: "P001478 HÔMA ONLINE" },
    { id: "cl41", name: "P001481 NORPRINT" },
    { id: "cl42", name: "P001487 CENTRAL CERVEJAS" },
    { id: "cl43", name: "P001492 NANTA ALVERCA" },
    { id: "cl44", name: "P001493 POLISPORT" },
    { id: "cl45", name: "P001496 TRANSNAUTICA ALVERCA" },
    { id: "cl46", name: "P001515 BSHP" },
    { id: "cl47", name: "P001516 VICENTE FARIA VINHOS" },
    { id: "cl48", name: "HOMA - LOJAS" },
    { id: "cl49", name: "P001543 CIMPOR" },
    { id: "cl50", name: "P001563 ALLIANCE HEALTHCARE" },
    { id: "cl51", name: "P001567 HAVI" },
    { id: "cl52", name: "P001588 TEKA" }
  ]
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
const uid = () => Math.random().toString(36).slice(2, 9);
const fmtDate = (iso) => {
  const d = new Date(iso);
  return `${d.toLocaleDateString("pt-PT")} ${d.toLocaleTimeString("pt-PT", { hour: "2-digit", minute: "2-digit" })}`;
};
const stockKey = (pId, size) => `${pId}_${size}`;

const Icon = ({ name, size = 16 }) => {
  const icons = {
    plus: "M12 5v14M5 12h14",
    trash: "M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",
    x: "M18 6L6 18M6 6l12 12",
    check: "M20 6L9 17l-5-5",
    download: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v4M7 10l5 5 5-5M12 15V3"
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d={icons[name]} />
    </svg>
  );
};

const ManpowerLogoHeader = () => (
  <svg width="130" height="32" viewBox="0 0 520 120" style={{ flexShrink: 0 }}>
    <g id="manpower-symbol">
      <rect x="50" y="52" width="16" height="56" rx="8" transform="rotate(-15 58 80)" fill="#418ab3" />
      <rect x="76" y="52" width="16" height="56" rx="8" transform="rotate(-15 84 80)" fill="#6faad0" />
      <rect x="102" y="52" width="16" height="56" rx="8" transform="rotate(-15 110 80)" fill="#7ca693" />
      <rect x="127" y="42" width="16" height="68" rx="8" transform="rotate(-15 135 76)" fill="#d14b59" />
      <rect x="151" y="43" width="16" height="48" rx="8" transform="rotate(-15 159 67)" fill="#e88b24" />
    </g>
    <text x="195" y="88" fontFamily="Inter, 'Segoe UI', Helvetica, Arial, sans-serif" fontSize="64" fontWeight="400" fill="#367fa9" letterSpacing="-1.5">
      Manpower
    </text>
    <text x="498" y="46" fontFamily="Inter, 'Segoe UI', Helvetica, Arial, sans-serif" fontSize="14" fontWeight="bold" fill="#367fa9">
      ®
    </text>
  </svg>
);

function Modal({ title, onClose, children }) {
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(15, 23, 42, 0.6)", backdropFilter: "blur(4px)", zIndex: 100, display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
      <div style={{ background: "#ffffff", borderTopLeftRadius: 20, borderTopRightRadius: 20, width: "100%", maxWidth: 600, maxHeight: "92vh", display: "flex", flexDirection: "column", boxShadow: "0 -10px 25px -5px rgba(0,0,0,0.1)" }}>
        <div style={{ padding: "16px 20px", borderBottom: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ color: "#1e293b", fontSize: 16, fontWeight: "bold", margin: 0 }}>{title}</h2>
          <button onClick={onClose} style={{ background: "#f1f5f9", border: "none", color: "#64748b", cursor: "pointer", padding: 8, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}><Icon name="x" size={18} /></button>
        </div>
        <div style={{ padding: "20px 16px", overflowY: "auto", background: "#f8fafc", paddingBottom: 40 }}>{children}</div>
      </div>
    </div>
  );
}

// ─── App Principal ───────────────────────────────────────────────────────────
export default function App() {
  const [stock, setStock] = useState({});
  const [movements, setMovements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("stock");
  const [modal, setModal] = useState(null);
  const [toast, setToast] = useState(null);

  // Estado do Carrinho
  const [cartType, setCartType] = useState("exit"); 
  const [cartClient, setCartClient] = useState("");
  const [cartItems, setCartItems] = useState([]); 
  const [tempItem, setTempItem] = useState({ productId: "", size: "", qty: 1 });

  // Carregar dados iniciais da Nuvem (Supabase)
  useEffect(() => {
    fetchCloudData();
  }, []);

  const fetchCloudData = async () => {
    setLoading(true);
    try {
      // 1. Ir buscar o Histórico ordenado por data mais recente
      const { data: cloudMovements, error: mError } = await supabase
        .from("historico")
        .select("*")
        .order("data", { ascending: false });

      if (mError) throw mError;

      // 2. Ir buscar o Inventário/Stock total consolidado
      const { data: cloudEquipamentos, error: eError } = await supabase
        .from("equipamentos")
        .select("*");

      if (eError) throw eError;

      // Converter array de equipamentos do Supabase para o formato de objeto { pId_size: qtd } da App
      const stockObj = {};
      cloudEquipamentos.forEach((item) => {
        stockObj[item.categoria] = item.quantidade_disponivel;
      });

      // Reconstruir dinamicamente os movimentos a partir dos registos JSON em 'operador'
      const formattedMovements = cloudMovements.map(m => {
        try {
          const meta = JSON.parse(m.operador);
          return {
            id: m.id,
            type: m.tipo_movimento,
            productId: meta.productId,
            size: meta.size,
            clientId: meta.clientId,
            qty: m.quantidade,
            date: m.data
          };
        } catch(e) {
          return {
            id: m.id,
            type: m.tipo_movimento,
            productId: "pr1",
            size: "M",
            clientId: "armazem",
            qty: m.quantidade,
            date: m.data
          };
        }
      });

      setStock(stockObj);
      setMovements(formattedMovements);
    } catch (err) {
      console.error("Erro a carregar dados do Supabase:", err);
      showToast("Erro de ligação à Base de Dados", false);
    } finally {
      setLoading(false);
    }
  };

  const showToast = (msg, ok = true) => {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 3000);
  };

  const getProduct = (id) => defaultData.products.find(p => p.id === id);
  const getClient = (id) => defaultData.clients.find(c => c.id === id);

  const addToCart = () => {
    if (!tempItem.productId || !tempItem.size || tempItem.qty < 1) {
      showToast("Preencha todos os campos do item", false);
      return;
    }
    setCartItems([...cartItems, { ...tempItem, id: uid() }]);
    setTempItem({ productId: "", size: "", qty: 1 });
  };

  const removeFromCart = (id) => setCartItems(cartItems.filter(i => i.id !== id));

  // Gravar movimentos e atualizar Stock na nuvem em tempo real
  const processBatch = async () => {
    // CORRECÇÃO: Só obriga a escolher cliente se for uma SAÍDA (Consumo)
    if (cartType === "exit" && !cartClient) { 
      showToast("Selecione o Cliente Relacionado", false); 
      return; 
    }
    if (cartItems.length === 0) { showToast("O carrinho está vazio", false); return; }

    setLoading(true);
    const timestamp = new Date().toISOString();

    try {
      for (const item of cartItems) {
        const key = stockKey(item.productId, item.size);
        const currentQty = stock[key] || 0;

        if (cartType === "exit" && item.qty > currentQty) {
          showToast(`Stock insuficiente: ${getProduct(item.productId).name} (${item.size})`, false);
          setLoading(false);
          return;
        }

        const finalQty = cartType === "entry" ? currentQty + Number(item.qty) : currentQty - Number(item.qty);

        // 1. Atualizar ou Inserir o registo de stock no Supabase
        const { data: existingStock } = await supabase
          .from("equipamentos")
          .select("id")
          .eq("categoria", key);

        if (existingStock && existingStock.length > 0) {
          await supabase
            .from("equipamentos")
            .update({ quantidade_disponivel: finalQty })
            .eq("categoria", key);
        } else {
          await supabase
            .from("equipamentos")
            .insert([{ 
              nome: getProduct(item.productId).name, 
              categoria: key, 
              quantidade_total: finalQty,
              quantidade_disponivel: finalQty 
            }]);
        }

        // 2. Registar o Movimento no Histórico do Supabase
        // CORRECÇÃO: Se for entrada, guardamos clientId como "armazem"
        const metaDados = JSON.stringify({
          productId: item.productId,
          size: item.size,
          clientId: cartType === "entry" ? "armazem" : cartClient
        });

        await supabase
          .from("historico")
          .insert([{
            operador: metaDados,
            tipo_movimento: cartType,
            quantidade: Number(item.qty),
            data: timestamp
          }]);
      }

      showToast(`Movimento sincronizado com sucesso!`);
      setModal(null);
      setCartItems([]);
      setCartClient("");
      
      await fetchCloudData();
    } catch (error) {
      console.error(error);
      showToast("Erro ao gravar dados na nuvem", false);
    } finally {
      setLoading(false);
    }
  };

  const exportDailyReport = () => {
    const todayStr = new Date().toLocaleDateString("pt-PT");
    let content = `==================================================\n`;
    content += `   MANPOWER INDÚSTRIA & LOGÍSTICA - RELATÓRIO DE EPI\n`;
    content += `   Data de Extração: ${todayStr} ${new Date().toLocaleTimeString("pt-PT")}\n`;
    content += `==================================================\n\n`;

    content += `1. INVENTÁRIO ATUAL EM ARMAZÉM CENTRAL:\n`;
    content += `--------------------------------------------------\n`;
    
    let hasStock = false;
    Object.entries(stock).forEach(([key, qty]) => {
      if (qty > 0) {
        const [pId, size] = key.split("_");
        const p = getProduct(pId);
        content += `- ${p?.name || "Desconhecido"} (Tam: ${size}): ${qty} un.\n`;
        hasStock = true;
      }
    });
    if (!hasStock) content += `Nenhum material em stock neste momento.\n`;

    content += `\n2. ÚLTIMOS MOVIMENTOS REGISTADOS DE HOJE:\n`;
    content += `--------------------------------------------------\n`;
    
    const todayMovements = movements.filter(m => {
      return new Date(m.date).toDateString() === new Date().toDateString();
    });

    if (todayMovements.length === 0) {
      content += `Nenhum movimento realizado na data de hoje.\n`;
    } else {
      todayMovements.forEach(m => {
        const p = getProduct(m.productId);
        const typeStr = m.type === "entry" ? "[ENTRADA FORNECEDOR]" : "[SAÍDA CONSUMO]";
        const destStr = m.clientId === "armazem" ? "Armazém Central" : (getClient(m.clientId)?.name || "N/A");
        content += `${fmtDate(m.date)} | ${typeStr} | ${p?.name} (${m.size}) | Qtd: ${m.qty} | Dest/Orig: ${destStr}\n`;
      });
    }

    content += `\n==================================================\n`;
    content += `Fim do Relatório Corporativo.\n`;

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Relatorio_Diario_EPI_Manpower_${new Date().toISOString().slice(0,10)}.txt`;
    link.click();
    URL.revokeObjectURL(url);
    showToast("Relatório Diário descarregado!");
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", color: "#334155", fontFamily: "system-ui, -apple-system, sans-serif" }}>
      <style>{`
        input, select { background: #ffffff; border: 1px solid #cbd5e1; color: #1e293b; padding: 12px; border-radius: 8px; width: 100%; margin-top: 4px; font-size: 15px; box-sizing: border-box; }
        input:focus, select:focus { border-color: #3882b4; outline: none; box-shadow: 0 0 0 3px rgba(56,130,180,0.1); }
        button { cursor: pointer; transition: 0.2s; -webkit-tap-highlight-color: transparent; }
        button:disabled { opacity: 0.4; cursor: not-allowed; }
        .mobile-card { background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; box-shadow: 0 2px 4px rgba(0,0,0,0.02); display: flex; flex-direction: column; gap: 8px; }
        .toast { position: fixed; bottom: 20px; left: 16px; right: 16px; padding: 14px 20px; border-radius: 10px; color: white; z-index: 1000; font-weight: bold; text-align: center; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.15); font-size: 14px; }
      `}</style>

      {toast && <div className="toast" style={{ background: toast.ok ? "#77a28f" : "#cf4551" }}>{toast.msg}</div>}

      {/* Header Mobile-First */}
      <header style={{ padding: "12px 16px", background: "#ffffff", borderBottom: "1px solid #e2e8f0", display: "flex", flexDirection: "column", gap: 12, boxShadow: "0 1px 2px rgba(0,0,0,0.02)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <ManpowerLogoHeader />
            <div style={{ borderLeft: "1px solid #cbd5e1", paddingLeft: 8 }}>
              <h1 style={{ fontSize: 12, fontWeight: "900", color: "#3882b4", letterSpacing: "-0.2px", margin: 0 }}>INDÚSTRIA</h1>
              <p style={{ fontSize: 10, color: "#64748b", margin: 0, fontWeight: "600" }}>Gestão Nuvem EPI</p>
            </div>
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            <button 
              onClick={fetchCloudData}
              disabled={loading}
              style={{ background: "#f1f5f9", color: "#475569", border: "none", width: 40, height: 40, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}
              title="Sincronizar dados"
            >
              🔄
            </button>
            <button 
              onClick={exportDailyReport}
              style={{ background: "#f1f5f9", color: "#475569", border: "none", width: 40, height: 40, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}
              title="Exportar Relatório"
            >
              <Icon name="download" size={18} />
            </button>
          </div>
        </div>

        <button 
          onClick={() => setModal("movement")}
          disabled={loading}
          style={{ background: "#3882b4", color: "white", border: "none", padding: "12px 16px", borderRadius: 10, fontWeight: "bold", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, boxShadow: "0 4px 6px rgba(56,130,180,0.15)" }}
        >
          <Icon name="plus" size={18} /> NOVO REGISTO DE MOVIMENTO
        </button>
      </header>

      {/* Tabs */}
      <nav style={{ display: "flex", background: "#ffffff", borderBottom: "1px solid #e2e8f0" }}>
        <button onClick={() => setTab("stock")} style={{ flex: 1, padding: "14px 8px", background: "none", border: "none", borderBottom: tab === "stock" ? "3px solid #3882b4" : "3px solid transparent", color: tab === "stock" ? "#3882b4" : "#64748b", fontWeight: "bold", fontSize: 12, textAlign: "center" }}>INVENTÁRIO</button>
        <button onClick={() => setTab("movements")} style={{ flex: 1, padding: "14px 8px", background: "none", border: "none", borderBottom: tab === "movements" ? "3px solid #3882b4" : "3px solid transparent", color: tab === "movements" ? "#3882b4" : "#64748b", fontWeight: "bold", fontSize: 12, textAlign: "center" }}>HISTÓRICO ({movements.length})</button>
      </nav>

      {/* Indicador de Loading Cloud */}
      {loading && <div style={{ background: "#e0f2fe", color: "#0369a1", fontSize: 12, padding: "6px 12px", textAlign: "center", fontWeight: "600" }}>A atualizar dados com a nuvem...</div>}

      {/* Conteúdo Principal */}
      <main style={{ padding: 14, maxWidth: 600, margin: "0 auto" }}>
        {tab === "stock" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {Object.entries(stock).filter(([_, qty]) => qty > 0).length === 0 ? (
              <div className="mobile-card" style={{ padding: 32, textAlign: "center", color: "#94a3b8", justifyContent: "center" }}>
                Nenhum EPI em armazém atualmente. Carregue em "Novo Registo" para dar entrada.
              </div>
            ) : (
              Object.entries(stock).map(([key, qty]) => {
                if (qty === 0) return null;
                const [pId, size] = key.split("_");
                const p = getProduct(pId);
                return (
                  <div key={key} className="mobile-card" style={{ borderLeft: qty < 5 ? "4px solid #e98315" : "4px solid #3882b4" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <span style={{ fontSize: 15, fontWeight: "600", color: "#1e293b", maxWidth: "75%", wordBreak: "break-word" }}>{p?.name}</span>
                      <span style={{ background: "#e2e8f0", color: "#334155", padding: "4px 10px", borderRadius: 20, fontSize: 12, fontWeight: "bold" }}>{size}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 4 }}>
                      <span style={{ fontSize: 12, color: "#64748b" }}>{p?.category || "Geral"}</span>
                      <span style={{ fontWeight: "700", fontSize: 15, color: qty < 5 ? "#e98315" : "#3882b4" }}>{qty} un. disponíveis</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {tab === "movements" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {movements.length === 0 ? (
              <div className="mobile-card" style={{ padding: 32, textAlign: "center", color: "#94a3b8" }}>Nenhum movimento registado na nuvem.</div>
            ) : (
              movements.map(m => (
                <div key={m.id} className="mobile-card" style={{ borderLeft: m.type === "entry" ? "4px solid #77a28f" : "4px solid #cf4551" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ fontWeight: "600", fontSize: 14, color: "#1e293b" }}>
                      {getProduct(m.productId)?.name} <span style={{ color: "#64748b", fontWeight: "normal" }}>(Tam: {m.size})</span>
                    </div>
                    <div style={{ fontWeight: "bold", fontSize: 16, color: m.type === "entry" ? "#77a28f" : "#cf4551" }}>
                      {m.type === "entry" ? "+" : "-"}{m.qty}
                    </div>
                  </div>
                  <div style={{ fontSize: 12, color: "#64748b", display: "flex", flexDirection: "column", gap: 2 }}>
                    <div>
                      {m.type === "exit" ? "Destino: " : "Origem: "}
                      {/* CORRECÇÃO: Apresenta Armazém Central nas Entradas */}
                      <b style={{ color: "#475569" }}>
                        {m.clientId === "armazem" ? "Armazém Central" : (getClient(m.clientId)?.name?.split(" ")[0] || "N/A")} ...
                      </b>
                    </div>
                    <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 2 }}>{fmtDate(m.date)} • {m.type === "entry" ? "Reposição" : "Consumo"}</div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </main>

      {/* Modal de Movimentos */}
      {modal === "movement" && (
        <Modal title="Registar Movimento de EPI's" onClose={() => setModal(null)}>
          <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
            <button 
              onClick={() => { setCartType("exit"); setCartItems([]); }}
              style={{ flex: 1, padding: 12, borderRadius: 8, border: "none", background: cartType === "exit" ? "#cf4551" : "#e2e8f0", color: cartType === "exit" ? "white" : "#475569", fontWeight: "bold", fontSize: 12 }}
            >SAÍDA (Consumo)</button>
            <button 
              onClick={() => { setCartType("entry"); setCartItems([]); }}
              style={{ flex: 1, padding: 12, borderRadius: 8, border: "none", background: cartType === "entry" ? "#77a28f" : "#e2e8f0", color: cartType === "entry" ? "white" : "#475569", fontWeight: "bold", fontSize: 12 }}
            >ENTRADA (Aumento)</button>
          </div>

          {/* CORRECÇÃO: O campo do Cliente agora só aparece se for uma SAÍDA */}
          {cartType === "exit" && (
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 11, fontWeight: "700", color: "#64748b", textTransform: "uppercase" }}>Cliente / Contrato Destinatário</label>
              <select value={cartClient} onChange={e => setCartClient(e.target.value)}>
                <option value="">Selecione a operação...</option>
                {defaultData.clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
          )}

          <div style={{ background: "#ffffff", padding: 14, borderRadius: 10, border: "1px solid #cbd5e1", marginBottom: 16 }}>
            <h4 style={{ fontSize: 12, fontWeight: "700", marginBottom: 10, color: "#3882b4", textTransform: "uppercase", margin: 0 }}>Adicionar ao Lote</h4>
            
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 6 }}>
              <div>
                <label style={{ fontSize: 11, color: "#64748b" }}>Produto</label>
                <select value={tempItem.productId} onChange={e => setTempItem({ ...tempItem, productId: e.target.value, size: "" })}>
                  <option value="">Selecionar...</option>
                  {defaultData.products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
              </div>
              
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <div>
                  <label style={{ fontSize: 11, color: "#64748b" }}>Tamanho</label>
                  <select value={tempItem.size} onChange={e => setTempItem({ ...tempItem, size: e.target.value })} disabled={!tempItem.productId}>
                    <option value="">...</option>
                    {getProduct(tempItem.productId)?.sizes.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: 11, color: "#64748b" }}>Quantidade</label>
                  <input type="number" min="1" value={tempItem.qty} onChange={e => setTempItem({ ...tempItem, qty: e.target.value })} />
                </div>
              </div>
            </div>

            <button onClick={addToCart} style={{ width: "100%", background: "#334155", color: "white", border: "none", padding: 12, borderRadius: 8, marginTop: 12, fontWeight: "600", fontSize: 13 }}>
              + Incluir no Lote
            </button>
          </div>

          {cartItems.length > 0 && (
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 11, fontWeight: "700", color: "#64748b", textTransform: "uppercase" }}>Lista de Confirmação ({cartItems.length})</label>
              <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 6, maxHeight: "160px", overflowY: "auto" }}>
                {cartItems.map(item => (
                  <div key={item.id} style={{ background: "#f1f5f9", padding: "10px 12px", borderRadius: 8, display: "flex", justifyContent: "space-between", alignItems: "center", border: "1px solid #e2e8f0" }}>
                    <span style={{ fontSize: 13, color: "#1e293b" }}>
                      {getProduct(item.productId)?.name} — <b>{item.size}</b> (x{item.qty})
                    </span>
                    <button onClick={() => removeFromCart(item.id)} style={{ background: "none", border: "none", color: "#cf4551", padding: 6 }}><Icon name="trash" size={16} /></button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CORRECÇÃO: O botão já não bloqueia por falta de cliente se o tipo for "entry" */}
          <button 
            onClick={processBatch}
            disabled={cartItems.length === 0 || (cartType === "exit" && !cartClient) || loading}
            style={{ width: "100%", padding: 14, borderRadius: 10, border: "none", background: cartType === "entry" ? "#77a28f" : "#3882b4", color: "white", fontWeight: "bold", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)" }}
          >
            <Icon name="check" size={18} /> {loading ? "A SINCRONIZAR..." : "SUBMETER MOVIMENTO"}
          </button>
        </Modal>
      )}
    </div>
  );
}
