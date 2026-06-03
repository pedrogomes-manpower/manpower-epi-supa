import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

// ─── CONFIGURAÇÃO DO SUPABASE ────────────────────────────────────────────────
const SUPABASE_URL = "https://ddgusvxkzjoshugskoav.supabase.co"; 
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRkZ3Vzdnhrempvc2h1Z3Nrb2F2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk5NzQ5MjcsImV4cCI6MjA5NTU1MDkyN30.6lPaGxzhK49MJTv9uq9mQiM9f-5x4XORv-mTPUljagw";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ─── Tabela de Configuração de Stocks Mínimos (Imagem Fornecida) ──────────────
const MINIMUM_STOCKS = {
  // Sapatos Gama Alta
  "pr1_35": 0, "pr1_36": 2, "pr1_37": 4, "pr1_38": 4, "pr1_39": 4, "pr1_40": 4, "pr1_41": 4, "pr1_42": 4, "pr1_43": 4, "pr1_44": 3, "pr1_45": 2, "pr1_46": 1,
  // Sapatos Gama Baixa
  "pr2_35": 0, "pr2_36": 1, "pr2_37": 2, "pr2_38": 2, "pr2_39": 2, "pr2_40": 2, "pr2_41": 2, "pr2_42": 2, "pr2_43": 2, "pr2_44": 2, "pr2_45": 1, "pr2_46": 1,
  // T-shirt Preta
  "pr3_XS": 0, "pr3_S": 10, "pr3_M": 10, "pr3_L": 10, "pr3_XL": 10, "pr3_XXL": 0,
  // Luva Nylon
  "pr4_5": 0, "pr4_6": 0, "pr4_7": 10, "pr4_8": 10, "pr4_9": 10, "pr4_10": 0,
  // Colete Refletor
  "pr5_XS": 0, "pr5_S": 5, "pr5_M": 5, "pr5_L": 5, "pr5_XL": 5, "pr5_XXL": 5,
  // Casaco Polar
  "pr6_S": 4, "pr6_M": 4, "pr6_L": 4, "pr6_XL": 4, "pr6_XXL": 2,
  // Polo Alta Visibilidade
  "pr7_S": 10, "pr7_M": 10, "pr7_L": 10, "pr7_XL": 10, "pr7_XXL": 10,
  // Sweat Preta
  "pr8_XS": 10, "pr8_S": 15, "pr8_M": 30, "pr8_L": 10, "pr8_XL": 10, "pr8_XXL": 0,
  // Kispo Preto
  "pr9_XS": 0, "pr9_S": 3, "pr9_M": 3, "pr9_L": 3, "pr9_XL": 3, "pr9_XXL": 3,
  // Kispo Refletor
  "pr10_XS": 0, "pr10_S": 0, "pr10_M": 0, "pr10_L": 0, "pr10_XL": 0, "pr10_XXL": 0,
  // Calças
  "pr11_S": 5, "pr11_M": 5, "pr11_L": 5, "pr11_XL": 5, "pr11_XXL": 5,
  // Colete Preto
  "pr12_S": 0, "pr12_M": 0, "pr12_L": 0, "pr12_XL": 0, "pr12_XXL": 0,
  // Colete Eletricista
  "pr13_S": 0, "pr13_M": 0, "pr13_L": 0, "pr13_XL": 0, "pr13_XXL": 0,
};

// ─── Dados Estáticos ──────────────────────────────────────────────────────────
const defaultData = {
  products: [
    { id: "pr1", name: "Sapatos Gama Alta", category: "Calçado", sizes: ["35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46"] },
    { id: "pr2", name: "Sapatos Gama Baixa", category: "Calçado", sizes: ["35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46"] },
    { id: "pr3", name: "T-shirt Preta", category: "Fardamento", sizes: ["XS", "S", "M", "L", "XL", "XXL"] },
    { id: "pr4", name: "Luva Nylon", category: "Luvas", sizes: ["5", "6", "7", "8", "9", "10"] },
    { id: "pr5", name: "Colete Refletor", category: "Fardamento", sizes: ["XS", "S", "M", "L", "XL", "XXL"] },
    { id: "pr6", name: "Casaco Polar", category: "Fardamento", sizes: ["S", "M", "L", "XL", "XXL"] },
    { id: "pr7", name: "Polo Alta Visibilidade", category: "Fardamento", sizes: ["S", "M", "L", "XL", "XXL"] },
    { id: "pr8", name: "Sweat Preta", category: "Fardamento", sizes: ["XS", "S", "M", "L", "XL", "XXL"] },
    { id: "pr9", name: "Kispo Preto", category: "Fardamento", sizes: ["XS", "S", "M", "L", "XL", "XXL"] },
    { id: "pr10", name: "Kispo Refletor", category: "Fardamento", sizes: ["XS", "S", "M", "L", "XL", "XXL"] },
    { id: "pr11", name: "Calças", category: "Fardamento", sizes: ["S", "M", "L", "XL", "XXL"] },
    { id: "pr12", name: "Colete Preto", category: "Fardamento", sizes: ["S", "M", "L", "XL", "XXL"] },
    { id: "pr13", name: "Colete Eletricista", category: "Fardamento", sizes: ["S", "M", "L", "XL", "XXL"] },
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
    download: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v4M7 10l5 5 5-5M12 15V3",
    chevronDown: "M6 9l6 6 6-6",
    chevronUp: "M18 15l-6-6-6 6",
    alert: "M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4M12 17h.01"
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d={icons[name]} />
    </svg>
  );
};

const ManpowerLogoHeader = () => (
	<svg width="150" height="42" viewBox="0 0 540 150" style={{ flexShrink: 0 }}>
	  {/* 1. BARRAS COLORIDAS (Dimensionadas e alinhadas com o texto) */}
	  <g id="manpower-symbol" transform="translate(15, 6) scale(1.15)">
		<rect x="10" y="52" width="16" height="56" rx="8" transform="rotate(15 18 80)" fill="#1c75bc" />
		<rect x="36" y="52" width="16" height="56" rx="8" transform="rotate(15 44 80)" fill="#5091cd" />
		<rect x="62" y="52" width="16" height="56" rx="8" transform="rotate(15 70 80)" fill="#508571" />
		<rect x="87" y="42" width="16" height="68" rx="8" transform="rotate(15 95 76)" fill="#b63644" />
		<rect x="111" y="43" width="16" height="48" rx="8" transform="rotate(15 119 67)" fill="#e57e25" />
	  </g>
  
	  {/* 2. BLOCO DE TEXTO */}
	  <g id="manpower-text">
		{/* Palavra Manpower principal */}
		<text x="185" y="80" fontFamily="Inter, 'Segoe UI', Helvetica, Arial, sans-serif" fontSize="60" fontWeight="400" fill="#005fa9" letterSpacing="-1">
		  Manpower
		</text>
		{/* Símbolo de Marca Registada colado ao final do texto */}
		<text x="460" y="45" fontFamily="Inter, 'Segoe UI', Helvetica, Arial, sans-serif" fontSize="18" fontWeight="bold" fill="#005fa9">
		  ®
		</text>
		{/* Subtexto TBO a Cinzento, alinhado por baixo da palavra principal */}
		<text x="190" y="132" fontFamily="Inter, 'Segoe UI', Helvetica, Arial, sans-serif" fontSize="46" fontWeight="400" fill="#71797E" letterSpacing="1">
		  TBO
		</text>
	  </g>
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
  const [confirmModal, setConfirmModal] = useState(null);

  const [expandedProducts, setExpandedProducts] = useState({});

  // Estado do Carrinho
  const [cartType, setCartType] = useState("exit"); 
  const [cartClient, setCartClient] = useState("");
  const [cartItems, setCartItems] = useState([]); 
  const [tempItem, setTempItem] = useState({ productId: "", size: "", qty: 1 });

  useEffect(() => {
    fetchCloudData();
  }, []);

  const fetchCloudData = async () => {
    setLoading(true);
    try {
      const { data: cloudMovements, error: mError } = await supabase
        .from("historico")
        .select("*")
        .order("data", { ascending: false });

      if (mError) throw mError;

      const { data: cloudEquipamentos, error: eError } = await supabase
        .from("equipamentos")
        .select("*");

      if (eError) throw eError;

      const stockObj = {};
      cloudEquipamentos.forEach((item) => {
        stockObj[item.categoria] = item.quantidade_disponivel;
      });

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

  const toggleExpand = (productId) => {
    setExpandedProducts(prev => ({
      ...prev,
      [productId]: !prev[productId]
    }));
  };

  const addToCart = () => {
    if (!tempItem.productId || !tempItem.size || tempItem.qty < 1) {
      showToast("Preencha todos os campos do item", false);
      return;
    }

    const mQty = Number(tempItem.qty);

    if (cartType === "exit") {
      const key = stockKey(tempItem.productId, tempItem.size);
      const currentQty = Number(stock[key] || 0);

      if (mQty > currentQty) {
        setConfirmModal({
          title: "Stock Insuficiente Detetado",
          message: `Não existe stock suficiente para adicionar ${mQty} un. de ${getProduct(tempItem.productId).name} (${tempItem.size}). Atualmente existem apenas ${currentQty} un. Pretende continuar com saldo negativo?`
        });
        return; 
      }
    }

    executeAddToCart(tempItem, mQty);
  };

  const executeAddToCart = (item, quantity) => {
    setCartItems([...cartItems, { ...item, qty: quantity, id: uid() }]);
    setTempItem({ productId: "", size: "", qty: 1 });
    setConfirmModal(null);
  };

  const removeFromCart = (id) => setCartItems(cartItems.filter(i => i.id !== id));

  const processBatch = async () => {
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
        const currentQty = Number(stock[key] || 0);
        const finalQty = cartType === "entry" ? currentQty + Number(item.qty) : currentQty - Number(item.qty);

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

      showToast(`Submetido com sucesso!`);
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
      if (qty !== 0) {
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

  // ─── Processar Inventário Agrupado e Ordenado Alfabeticamente ─────────────────
  const sortedProductsWithStock = defaultData.products
    .map(product => {
      const sizeStock = product.sizes.map(size => {
        const key = stockKey(product.id, size);
        const currentQty = Number(stock[key] || 0);
        const minStock = MINIMUM_STOCKS[key] !== undefined ? MINIMUM_STOCKS[key] : 0;
        return { size, qty: currentQty, minStock, isBelowMin: currentQty < minStock };
      });
      const totalQty = sizeStock.reduce((acc, curr) => acc + curr.qty, 0);
      const hasAnySizeBelowMin = sizeStock.some(s => s.isBelowMin);
      return { ...product, sizeStock, totalQty, hasAnySizeBelowMin };
    })
    .sort((a, b) => a.name.localeCompare(b.name, "pt", { sensitivity: "base" }));

  // ─── Filtrar Apenas Itens com Rutura ou Abaixo de Stock Mínimo ─────────────────
  const lowStockItems = [];
  sortedProductsWithStock.forEach(p => {
    p.sizeStock.forEach(s => {
      if (s.isBelowMin) {
        lowStockItems.push({
          productId: p.id,
          name: p.name,
          category: p.category,
          size: s.size,
          currentQty: s.qty,
          minQty: s.minStock
        });
      }
    });
  });

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", color: "#334155", fontFamily: "system-ui, -apple-system, sans-serif" }}>
      <style>{`
        input, select { background: #ffffff; border: 1px solid #cbd5e1; color: #1e293b; padding: 12px; border-radius: 8px; width: 100%; margin-top: 4px; font-size: 15px; box-sizing: border-box; }
        input:focus, select:focus { border-color: #3882b4; outline: none; box-shadow: 0 0 0 3px rgba(56,130,180,0.1); }
        button { cursor: pointer; transition: 0.2s; -webkit-tap-highlight-color: transparent; }
        button:disabled { opacity: 0.4; cursor: not-allowed; }
        .mobile-card { background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; box-shadow: 0 2px 4px rgba(0,0,0,0.02); display: flex; flex-direction: column; gap: 8px; }
        .inventory-row { display: flex; justify-content: space-between; align-items: center; padding: 10px 12px; border-radius: 8px; background: #f8fafc; border: 1px solid #edf2f7; font-size: 14px; }
        .toast { position: fixed; bottom: 20px; left: 16px; right: 16px; padding: 14px 20px; border-radius: 10px; color: white; z-index: 1000; font-weight: bold; text-align: center; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.15); font-size: 14px; }
      `}</style>

      {toast && <div className="toast" style={{ background: toast.ok ? "#77a28f" : "#cf4551" }}>{toast.msg}</div>}

      {confirmModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(15, 23, 42, 0.75)", backdropFilter: "blur(4px)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
          <div style={{ background: "#ffffff", borderRadius: 16, width: "100%", maxWidth: 400, padding: 20, boxShadow: "0 20px 25px -5px rgba(0,0,0,0.2)", display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ fontSize: 32, textAlign: "center" }}>⚠️</div>
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: "bold", color: "#1e293b", textAlign: "center" }}>{confirmModal.title}</h3>
            <p style={{ margin: 0, fontSize: 14, color: "#475569", lineHeight: "1.5", textAlign: "center" }}>{confirmModal.message}</p>
            <div style={{ display: "flex", gap: 10, marginTop: 6 }}>
              <button onClick={() => setConfirmModal(null)} style={{ flex: 1, padding: "12px", borderRadius: 8, border: "1px solid #cbd5e1", background: "#f8fafc", color: "#475569", fontWeight: "bold", fontSize: 13 }}>NÃO (Corrigir)</button>
              <button onClick={() => executeAddToCart(tempItem, Number(tempItem.qty))} style={{ flex: 1, padding: "12px", borderRadius: 8, border: "none", background: "#cf4551", color: "white", fontWeight: "bold", fontSize: 13 }}>SIM (Continuar)</button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header style={{ padding: "12px 16px", background: "#ffffff", borderBottom: "1px solid #e2e8f0", display: "flex", flexDirection: "column", gap: 12, boxShadow: "0 1px 2px rgba(0,0,0,0.02)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <ManpowerLogoHeader />
            <div style={{ borderLeft: "1px solid #cbd5e1", paddingLeft: 8 }}>
              <h1 style={{ fontSize: 12, fontWeight: "900", color: "#3882b4", letterSpacing: "-0.2px", margin: 0 }}>INDÚSTRIA E LOGÍSTICA</h1>
              <p style={{ fontSize: 10, color: "#64748b", margin: 0, fontWeight: "600" }}>Gestão EPI</p>
            </div>
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            <button onClick={fetchCloudData} disabled={loading} style={{ background: "#f1f5f9", color: "#475569", border: "none", width: 40, height: 40, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }} title="Sincronizar dados">🔄</button>
            <button onClick={exportDailyReport} style={{ background: "#f1f5f9", color: "#475569", border: "none", width: 40, height: 40, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }} title="Exportar Relatório"><Icon name="download" size={18} /></button>
          </div>
        </div>
        <button onClick={() => setModal("movement")} disabled={loading} style={{ background: "#3882b4", color: "white", border: "none", padding: "12px 16px", borderRadius: 10, fontWeight: "bold", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, boxShadow: "0 4px 6px rgba(56,130,180,0.15)" }}><Icon name="plus" size={18} /> NOVO REGISTO DE MOVIMENTO</button>
      </header>

      {/* Tabs / Menu de Páginas (Agora com 3 Abas) */}
      <nav style={{ display: "flex", background: "#ffffff", borderBottom: "1px solid #e2e8f0" }}>
        <button onClick={() => setTab("stock")} style={{ flex: 1, padding: "14px 4px", background: "none", border: "none", borderBottom: tab === "stock" ? "3px solid #3882b4" : "3px solid transparent", color: tab === "stock" ? "#3882b4" : "#64748b", fontWeight: "bold", fontSize: 11, textAlign: "center" }}>INVENTÁRIO</button>
        <button onClick={() => setTab("min_stock")} style={{ flex: 1, padding: "14px 4px", background: "none", border: "none", borderBottom: tab === "min_stock" ? "3px solid #e98315" : "3px solid transparent", color: tab === "min_stock" ? "#e98315" : "#64748b", fontWeight: "bold", fontSize: 11, display: "flex", alignItems: "center", justifyContent: "center", gap: 4 }}>
          STOCK MÍNIMO 
          {lowStockItems.length > 0 && (
            <span style={{ background: "#cf4551", color: "white", borderRadius: "10px", padding: "1px 6px", fontSize: 10 }}>{lowStockItems.length}</span>
          )}
        </button>
        <button onClick={() => setTab("movements")} style={{ flex: 1, padding: "14px 4px", background: "none", border: "none", borderBottom: tab === "movements" ? "3px solid #3882b4" : "3px solid transparent", color: tab === "movements" ? "#3882b4" : "#64748b", fontWeight: "bold", fontSize: 11, textAlign: "center" }}>HISTÓRICO ({movements.length})</button>
      </nav>

      {loading && <div style={{ background: "#e0f2fe", color: "#0369a1", fontSize: 12, padding: "6px 12px", textAlign: "center", fontWeight: "600" }}>A atualizar dados com a nuvem...</div>}

      {/* Conteúdo Principal */}
      <main style={{ padding: 14, maxWidth: 600, margin: "0 auto" }}>
        
        {/* ABA 1: INVENTÁRIO GERAL */}
        {tab === "stock" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {sortedProductsWithStock.map(p => {
              const isExpanded = !!expandedProducts[p.id];
              const borderLeftColor = p.hasAnySizeBelowMin ? "4px solid #cf4551" : "4px solid #3882b4";

              return (
                <div key={p.id} className="mobile-card" style={{ borderLeft: borderLeftColor, cursor: "pointer", padding: "14px 16px" }} onClick={() => toggleExpand(p.id)}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ fontSize: 15, fontWeight: "600", color: "#1e293b", display: "flex", alignItems: "center", gap: 6 }}>
                        {p.name}
                        {p.hasAnySizeBelowMin && <span style={{ color: "#cf4551", fontSize: 12, display: "flex", alignItems: "center" }} title="Alerta: Tamanho abaixo do mínimo!"><Icon name="alert" size={14} /></span>}
                      </div>
                      <div style={{ fontSize: 12, color: "#64748b", marginTop: 2 }}>{p.category}</div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <span style={{ fontWeight: "700", fontSize: 14, color: p.hasAnySizeBelowMin ? "#cf4551" : "#3882b4" }}>
                        {p.totalQty} un. total
                      </span>
                      <span style={{ color: "#94a3b8" }}><Icon name={isExpanded ? "chevronUp" : "chevronDown"} size={18} /></span>
                    </div>
                  </div>

                  {isExpanded && (
                    <div style={{ marginTop: 12, paddingTop: 12, borderTop: "1px dashed #e2e8f0", display: "flex", flexDirection: "column", gap: 6 }} onClick={(e) => e.stopPropagation()}>
                      {p.sizeStock.map(item => (
                        <div key={item.size} className="inventory-row" style={{ border: item.isBelowMin ? "1px solid #fecaca" : "1px solid #edf2f7", background: item.isBelowMin ? "#fff5f5" : "#f8fafc" }}>
                          <span style={{ fontWeight: "600", color: "#475569" }}>Tamanho {item.size}</span>
                          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <span style={{ fontSize: 11, color: "#64748b" }}>Mín: {item.minStock}</span>
                            <span style={{ fontWeight: "700", color: item.isBelowMin ? "#cf4551" : "#1e293b" }}>
                              {item.qty} un. {item.isBelowMin && "⚠️"}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* ABA 2: NOVA PÁGINA DE STOCK MÍNIMO */}
        {tab === "min_stock" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ background: "#fff7ed", border: "1px solid #ffedd5", padding: "12px", borderRadius: "10px", fontSize: "13px", color: "#c2410c", fontWeight: "500", display: "flex", gap: 8, alignItems: "center" }}>
              <Icon name="alert" size={18} />
              <span>Abaixo são listados todos os EPI's cujo stock atual é <b>igual ou inferior</b> ao mínimo estipulado.</span>
            </div>
            
            {lowStockItems.length === 0 ? (
              <div className="mobile-card" style={{ padding: 40, textAlign: "center", color: "#77a28f", borderLeft: "4px solid #77a28f" }}>
                🎉 Excelente! Todos os artigos encontram-se acima do stock mínimo de segurança.
              </div>
            ) : (
              lowStockItems.map((item, idx) => (
                <div key={idx} className="mobile-card" style={{ borderLeft: "4px solid #e98315", background: "#ffffff" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <div style={{ fontSize: 15, fontWeight: "600", color: "#1e293b" }}>{item.name}</div>
                      <div style={{ fontSize: 12, color: "#e98315", fontWeight: "600", marginTop: 2 }}>Tamanho: {item.size} • <span style={{ color: "#64748b", fontWeight: "normal" }}>{item.category}</span></div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: 15, fontWeight: "800", color: "#cf4551" }}>{item.currentQty} un.</div>
                      <div style={{ fontSize: 11, color: "#64748b" }}>Necessário: ≥ {item.minQty}</div>
                    </div>
                  </div>
                  <div style={{ background: "#fff5f5", borderRadius: "6px", padding: "6px 10px", fontSize: "11px", color: "#cf4551", fontWeight: "bold", textAlign: "center", marginTop: 4 }}>
                    Faltam pedir pelo menos: {item.minQty - item.currentQty} un. para atingir o limite.
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* ABA 3: HISTÓRICO DE MOVIMENTOS */}
        {tab === "movements" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {movements.map(m => (
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
                    <b style={{ color: "#475569" }}>
                      {m.clientId === "armazem" ? "Armazém Central" : (getClient(m.clientId)?.name?.split(" ")[0] || "N/A")} ...
                    </b>
                  </div>
                  <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 2 }}>{fmtDate(m.date)} • {m.type === "entry" ? "Reposição" : "Consumo"}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Modal de Movimentos */}
      {modal === "movement" && (
        <Modal title="Registar Movimento de EPI's" onClose={() => setModal(null)}>
          <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
            <button onClick={() => { setCartType("exit"); setCartItems([]); }} style={{ flex: 1, padding: 12, borderRadius: 8, border: "none", background: cartType === "exit" ? "#cf4551" : "#e2e8f0", color: cartType === "exit" ? "white" : "#475569", fontWeight: "bold", fontSize: 12 }}>SAÍDA (Consumo)</button>
            <button onClick={() => { setCartType("entry"); setCartItems([]); }} style={{ flex: 1, padding: 12, borderRadius: 8, border: "none", background: cartType === "entry" ? "#77a28f" : "#e2e8f0", color: cartType === "entry" ? "white" : "#475569", fontWeight: "bold", fontSize: 12 }}>ENTRADA (Aumento)</button>
          </div>

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
            <button onClick={addToCart} style={{ width: "100%", background: "#334155", color: "white", border: "none", padding: 12, borderRadius: 8, marginTop: 12, fontWeight: "600", fontSize: 13 }}>+ Incluir no Lote</button>
          </div>

          {cartItems.length > 0 && (
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 11, fontWeight: "700", color: "#64748b", textTransform: "uppercase" }}>Lista de Confirmação ({cartItems.length})</label>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 6 }}>
                {cartItems.map(item => (
                  <div key={item.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#ffffff", padding: "10px 12px", borderRadius: 8, border: "1px solid #cbd5e1" }}>
                    <div style={{ fontSize: 13 }}>
                      <b>{getProduct(item.productId)?.name}</b> (Tam: {item.size}) - <b>{item.qty} un.</b>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} style={{ border: "none", background: "none", color: "#cf4551" }}><Icon name="trash" size={16} /></button>
                  </div>
                ))}
              </div>
              <button onClick={processBatch} style={{ width: "100%", background: cartType === "entry" ? "#77a28f" : "#cf4551", color: "white", border: "none", padding: 14, borderRadius: 10, marginTop: 16, fontWeight: "bold", fontSize: 14, boxShadow: "0 4px 6px rgba(0,0,0,0.05)" }}>
                Submeter Movimento
              </button>
            </div>
          )}
        </Modal>
      )}
    </div>
  );
}