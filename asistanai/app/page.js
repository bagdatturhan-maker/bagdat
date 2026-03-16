"use client";
import { useState, useEffect, useRef } from "react";

const PLANS = [
  { id: "starter", name: "Başlangıç", price: "₺499", period: "/ay", color: "#10B981", features: ["1 WhatsApp Hattı", "500 mesaj/ay", "AI Asistan 7/24", "Sektörel hazır şablon", "E-posta desteği"], popular: false },
  { id: "professional", name: "Profesyonel", price: "₺1.299", period: "/ay", color: "#F59E0B", features: ["1 WhatsApp Hattı", "2.000 mesaj/ay", "AI Asistan 7/24", "Özel prompt ayarlama", "Google Takvim", "CRM entegrasyonu", "Öncelikli destek"], popular: true },
  { id: "enterprise", name: "Kurumsal", price: "₺2.999", period: "/ay", color: "#8B5CF6", features: ["3 WhatsApp Hattı", "Sınırsız mesaj", "Özel AI eğitimi", "Google Takvim + CRM", "API erişimi", "Dedicated yönetici", "SLA garantisi"], popular: false },
];

const SECTORS = [
  { id: "emlak", name: "Emlak", icon: "🏠", desc: "Lead takibi, portföy önerisi, görüntüleme randevusu" },
  { id: "saglik", name: "Diş/Sağlık", icon: "🏥", desc: "Randevu alma, tedavi bilgisi, fiyat sorgulama" },
  { id: "guzellik", name: "Güzellik", icon: "💇", desc: "Randevu, hizmet bilgisi, fiyat listesi" },
  { id: "fitness", name: "Fitness", icon: "🏋️", desc: "Üyelik, PT randevusu, ders programı" },
  { id: "restoran", name: "Restoran", icon: "🍽️", desc: "Rezervasyon, menü, sipariş takibi" },
  { id: "eticaret", name: "E-Ticaret", icon: "🛒", desc: "Sipariş takibi, ürün bilgisi, iade" },
];

const REVIEWS = [
  { id: 1, name: "Ahmet Yılmaz", company: "ABC Emlak", avatar: "AY", color: "#F59E0B", rating: 5, date: "Mart 2026", text: "Botu devreye aldıktan sonra hafta sonu müşteri kaybetmiyoruz. Aylık 40-50 yeni lead geliyor.", highlight: "Aylık 40-50 lead" },
  { id: 2, name: "Zeynep Kara", company: "Sağlık Merkezi Plus", avatar: "ZK", color: "#10B981", rating: 5, date: "Şubat 2026", text: "Randevu hatırlatmaları otomatik gidiyor, hasta memnuniyetimiz ciddi arttı.", highlight: "Memnuniyet arttı" },
  { id: 3, name: "Mehmet Demir", company: "TechEdu Akademi", avatar: "MD", color: "#8B5CF6", rating: 5, date: "Şubat 2026", text: "Kurs sorularını bot hallediyor. Dönüşüm oranımız 3 katına çıktı.", highlight: "Dönüşüm 3x arttı" },
  { id: 4, name: "Buse Çelik", company: "Moda Shop", avatar: "BÇ", color: "#EC4899", rating: 5, date: "Mart 2026", text: "Müşteri hizmetleri yükümüz %70 azaldı. ₺499'a bu hizmet inanılmaz değer.", highlight: "Yük %70 azaldı" },
];

const FAQS = [
  { id: 1, q: "Teknik bilgiye ihtiyaç var mı?", a: "Hayır. Kurulum sihirbazımız sayesinde işletme bilgilerinizi girerek botunuzu kendiniz oluşturabilirsiniz. Ortalama kurulum süresi 2 dakikadır." },
  { id: 2, q: "Ücretsiz deneme var mı?", a: "Evet, 7 günlük ücretsiz deneme sunuyoruz. Kredi kartı gerekmez." },
  { id: 3, q: "İstediğim zaman iptal edebilir miyim?", a: "Evet, herhangi bir taahhüt yoktur. İstediğiniz zaman panelinizden iptal edebilirsiniz." },
  { id: 4, q: "Bot Türkçe yanıt veriyor mu?", a: "Evet, Türkçe'yi ana dil olarak destekler. Yazım hatası, emoji — bot anlar ve doğal Türkçe yanıt verir." },
  { id: 5, q: "Mevcut WhatsApp numaramı kullanabilir miyim?", a: "Evet, mevcut işletme numaranızı sisteme bağlayabilirsiniz." },
  { id: 6, q: "Verilerim güvende mi?", a: "KVKK uyumlu altyapımızla tüm veriler şifreli saklanır. 3. taraflarla kesinlikle paylaşılmaz." },
];

const DAYS = ["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi", "Pazar"];
const HOURS = Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, "0")}:00`);

function Counter({ end, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        let s = 0;
        const step = end / 120;
        const t = setInterval(() => {
          s += step;
          if (s >= end) { setCount(end); clearInterval(t); }
          else setCount(Math.floor(s));
        }, 16);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);
  return <span ref={ref}>{count.toLocaleString("tr-TR")}{suffix}</span>;
}

function ChatBubble({ text, isBot, delay }) {
  const [v, setV] = useState(false);
  useEffect(() => { const t = setTimeout(() => setV(true), delay); return () => clearTimeout(t); }, [delay]);
  return (
    <div style={{ display: "flex", justifyContent: isBot ? "flex-start" : "flex-end", marginBottom: 10, opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(16px)", transition: "all 0.5s cubic-bezier(0.34,1.56,0.64,1)" }}>
      <div style={{ background: isBot ? "linear-gradient(135deg,#1a1a2e,#16213e)" : "linear-gradient(135deg,#F59E0B,#D97706)", color: "#fff", padding: "10px 16px", borderRadius: isBot ? "4px 16px 16px 16px" : "16px 4px 16px 16px", maxWidth: "82%", fontSize: 13, lineHeight: 1.5 }}>
        {isBot && <div style={{ fontSize: 9, opacity: 0.6, marginBottom: 3, letterSpacing: 1 }}>🤖 AI ASİSTAN</div>}
        {text}
      </div>
    </div>
  );
}

function Stars({ n }) {
  return <div style={{ display: "flex", gap: 2 }}>{[1,2,3,4,5].map(i => <span key={i} style={{ color: i <= n ? "#F59E0B" : "rgba(255,255,255,0.15)", fontSize: 13 }}>★</span>)}</div>;
}

const inp = { width: "100%", padding: "11px 14px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, color: "#fff", fontSize: 14, outline: "none", boxSizing: "border-box" };
const lbl = { display: "block", color: "rgba(255,255,255,0.45)", fontSize: 11, marginBottom: 5, letterSpacing: 0.5 };

function Wizard({ plan, onClose }) {
  const [step, setStep] = useState(1);
  const [sector, setSector] = useState("");
  const [form, setForm] = useState({ businessName: "", phone: "", redirectPhone: "", greeting: "", faq1q: "", faq1a: "", faq2q: "", faq2a: "", tone: "professional" });
  const [workDays, setWorkDays] = useState(["Pazartesi","Salı","Çarşamba","Perşembe","Cuma"]);
  const [workStart, setWorkStart] = useState("09:00");
  const [workEnd, setWorkEnd] = useState("18:00");
  const [offMsg, setOffMsg] = useState("Şu an çevrimdışıyız, en kısa sürede dönüş yapacağız.");
  const [qrStatus, setQrStatus] = useState("waiting");
  const [qrDone, setQrDone] = useState(false);
  const [deploying, setDeploying] = useState(false);
  const [deployed, setDeployed] = useState(false);

  const toggleDay = d => setWorkDays(p => p.includes(d) ? p.filter(x => x !== d) : [...p, d]);
  const upd = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const scanQR = () => {
    setQrStatus("scanning");
    setTimeout(() => { setQrStatus("connected"); setTimeout(() => setQrDone(true), 800); }, 2500);
  };

  const deploy = () => {
    setDeploying(true);
    setTimeout(() => { setDeploying(false); setDeployed(true); }, 3000);
  };

  const LABELS = ["Sektör", "Bilgiler", "Saatler", "WhatsApp", "Yayına Al"];

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.88)", backdropFilter: "blur(12px)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div style={{ background: "#0d0d1a", borderRadius: 24, width: "100%", maxWidth: 640, maxHeight: "92vh", overflowY: "auto", border: "1px solid rgba(245,158,11,0.2)" }}>
        <div style={{ padding: "20px 26px", borderBottom: "1px solid rgba(255,255,255,0.07)", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, background: "#0d0d1a", zIndex: 2, borderRadius: "24px 24px 0 0" }}>
          <div>
            <h3 style={{ margin: 0, color: "#F59E0B", fontSize: 19, fontWeight: 700 }}>Bot Kurulum Sihirbazı</h3>
            <p style={{ margin: "3px 0 0", color: "rgba(255,255,255,0.4)", fontSize: 12 }}>{plan?.name} Paket</p>
          </div>
          <button onClick={onClose} style={{ background: "rgba(255,255,255,0.07)", border: "none", color: "#fff", width: 32, height: 32, borderRadius: 9, cursor: "pointer", fontSize: 15 }}>✕</button>
        </div>

        <div style={{ padding: "14px 26px", borderBottom: "1px solid rgba(255,255,255,0.05)", display: "flex", alignItems: "center", gap: 4 }}>
          {LABELS.map((l, i) => (
            <div key={l} style={{ display: "flex", alignItems: "center", gap: 4, flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <div style={{ width: 24, height: 24, borderRadius: 7, background: step > i+1 ? "#10B981" : step === i+1 ? "#F59E0B" : "rgba(255,255,255,0.07)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: step >= i+1 ? "#000" : "rgba(255,255,255,0.3)", flexShrink: 0 }}>
                  {step > i+1 ? "✓" : i+1}
                </div>
                <span style={{ fontSize: 10, color: step === i+1 ? "#F59E0B" : step > i+1 ? "#10B981" : "rgba(255,255,255,0.25)", fontWeight: step === i+1 ? 700 : 400, whiteSpace: "nowrap" }}>{l}</span>
              </div>
              {i < 4 && <div style={{ flex: 1, height: 1, background: step > i+1 ? "#10B981" : "rgba(255,255,255,0.06)", marginLeft: 4 }} />}
            </div>
          ))}
        </div>

        <div style={{ padding: 26 }}>
          {step === 1 && (
            <div>
              <h4 style={{ color: "#fff", fontSize: 16, marginBottom: 18 }}>Sektörünüzü Seçin</h4>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginBottom: 22 }}>
                {SECTORS.map(s => (
                  <button key={s.id} onClick={() => setSector(s.id)} style={{ background: sector === s.id ? "rgba(245,158,11,0.15)" : "rgba(255,255,255,0.02)", border: sector === s.id ? "2px solid #F59E0B" : "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: "16px 10px", cursor: "pointer", textAlign: "center" }}>
                    <div style={{ fontSize: 26, marginBottom: 5 }}>{s.icon}</div>
                    <div style={{ color: "#fff", fontSize: 12, fontWeight: 600, marginBottom: 2 }}>{s.name}</div>
                    <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 10 }}>{s.desc}</div>
                  </button>
                ))}
              </div>
              <button onClick={() => sector && setStep(2)} disabled={!sector} style={{ width: "100%", padding: "13px 0", background: sector ? "linear-gradient(135deg,#F59E0B,#D97706)" : "rgba(255,255,255,0.05)", color: sector ? "#000" : "rgba(255,255,255,0.3)", border: "none", borderRadius: 12, fontWeight: 700, fontSize: 14, cursor: sector ? "pointer" : "not-allowed" }}>Devam Et →</button>
            </div>
          )}

          {step === 2 && (
            <div>
              <h4 style={{ color: "#fff", fontSize: 16, marginBottom: 18 }}>İşletme Bilgileri</h4>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 14px" }}>
                {[["businessName","İŞLETME ADI","ABC Emlak"],["phone","WHATSAPP NUMARASI","+90 5XX XXX XX XX"]].map(([k,l,p]) => (
                  <div key={k} style={{ marginBottom: 13 }}>
                    <label style={lbl}>{l}</label>
                    <input placeholder={p} value={form[k]} onChange={e => upd(k, e.target.value)} style={inp} />
                  </div>
                ))}
              </div>
              <div style={{ marginBottom: 13 }}>
                <label style={lbl}>YÖNLENDİRME NUMARASI <span style={{ color: "#F59E0B" }}>*</span></label>
                <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 11, margin: "0 0 5px" }}>Bot yetersiz kalırsa müşteriyi bu numaraya yönlendirir.</p>
                <input placeholder="+90 5XX XXX XX XX" value={form.redirectPhone} onChange={e => upd("redirectPhone", e.target.value)} style={inp} />
              </div>
              <div style={{ marginBottom: 13 }}>
                <label style={lbl}>KARŞILAMA MESAJI</label>
                <input placeholder="Merhaba! Size nasıl yardımcı olabilirim?" value={form.greeting} onChange={e => upd("greeting", e.target.value)} style={inp} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 14px" }}>
                {[["faq1q","SIK SORULAN SORU 1","Fiyatlarınız nedir?"],["faq1a","CEVAP 1","3M-15M TL arası..."],["faq2q","SIK SORULAN SORU 2","Randevu alabilir miyim?"],["faq2a","CEVAP 2","Evet, gününüzü yazın."]].map(([k,l,p]) => (
                  <div key={k} style={{ marginBottom: 13 }}>
                    <label style={lbl}>{l}</label>
                    <input placeholder={p} value={form[k]} onChange={e => upd(k, e.target.value)} style={inp} />
                  </div>
                ))}
              </div>
              <div style={{ marginBottom: 18 }}>
                <label style={lbl}>BOT ÜSLUBU</label>
                <div style={{ display: "flex", gap: 8 }}>
                  {[["professional","Profesyonel"],["friendly","Samimi"],["formal","Resmi"]].map(([v,l]) => (
                    <button key={v} onClick={() => upd("tone", v)} style={{ flex: 1, padding: "9px 0", background: form.tone === v ? "rgba(245,158,11,0.15)" : "rgba(255,255,255,0.03)", border: form.tone === v ? "1px solid #F59E0B" : "1px solid rgba(255,255,255,0.07)", borderRadius: 9, color: form.tone === v ? "#F59E0B" : "rgba(255,255,255,0.5)", fontSize: 12, cursor: "pointer" }}>{l}</button>
                  ))}
                </div>
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <button onClick={() => setStep(1)} style={{ flex: 1, padding: "12px 0", background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.5)", border: "none", borderRadius: 12, fontWeight: 600, cursor: "pointer" }}>← Geri</button>
                <button onClick={() => setStep(3)} style={{ flex: 2, padding: "12px 0", background: "linear-gradient(135deg,#F59E0B,#D97706)", color: "#000", border: "none", borderRadius: 12, fontWeight: 700, fontSize: 14, cursor: "pointer" }}>Devam Et →</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h4 style={{ color: "#fff", fontSize: 16, marginBottom: 6 }}>Çalışma Saatleri</h4>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, marginBottom: 18 }}>Mesai dışında bot otomatik bildirim gönderir.</p>
              <div style={{ marginBottom: 18 }}>
                <label style={lbl}>ÇALIŞMA GÜNLERİ</label>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {DAYS.map(d => (
                    <button key={d} onClick={() => toggleDay(d)} style={{ padding: "7px 11px", borderRadius: 8, border: workDays.includes(d) ? "1px solid rgba(245,158,11,0.4)" : "1px solid rgba(255,255,255,0.07)", background: workDays.includes(d) ? "rgba(245,158,11,0.15)" : "rgba(255,255,255,0.03)", color: workDays.includes(d) ? "#F59E0B" : "rgba(255,255,255,0.4)", fontSize: 12, fontWeight: workDays.includes(d) ? 700 : 400, cursor: "pointer" }}>{d.slice(0,3)}</button>
                  ))}
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
                <div>
                  <label style={lbl}>AÇILIŞ SAATİ</label>
                  <select value={workStart} onChange={e => setWorkStart(e.target.value)} style={{ ...inp, background: "#1a1a2e" }}>
                    {HOURS.map(h => <option key={h}>{h}</option>)}
                  </select>
                </div>
                <div>
                  <label style={lbl}>KAPANIŞ SAATİ</label>
                  <select value={workEnd} onChange={e => setWorkEnd(e.target.value)} style={{ ...inp, background: "#1a1a2e" }}>
                    {HOURS.map(h => <option key={h}>{h}</option>)}
                  </select>
                </div>
              </div>
              <div style={{ marginBottom: 18 }}>
                <label style={lbl}>MESAİ DIŞI MESAJI</label>
                <input value={offMsg} onChange={e => setOffMsg(e.target.value)} style={inp} />
              </div>
              <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: 14, marginBottom: 20 }}>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", marginBottom: 8, letterSpacing: 0.5 }}>ÖNİZLEME</div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 6 }}>{workDays.map(d => <span key={d} style={{ fontSize: 10, padding: "2px 7px", background: "rgba(245,158,11,0.1)", color: "#F59E0B", borderRadius: 5 }}>{d}</span>)}</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>⏰ {workStart} - {workEnd} arası aktif</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", marginTop: 4 }}>💬 "{offMsg}"</div>
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <button onClick={() => setStep(2)} style={{ flex: 1, padding: "12px 0", background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.5)", border: "none", borderRadius: 12, fontWeight: 600, cursor: "pointer" }}>← Geri</button>
                <button onClick={() => setStep(4)} style={{ flex: 2, padding: "12px 0", background: "linear-gradient(135deg,#F59E0B,#D97706)", color: "#000", border: "none", borderRadius: 12, fontWeight: 700, fontSize: 14, cursor: "pointer" }}>Devam Et →</button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div style={{ textAlign: "center" }}>
              <h4 style={{ color: "#fff", fontSize: 16, marginBottom: 6 }}>WhatsApp Hattını Bağla</h4>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, marginBottom: 22 }}>
                <strong style={{ color: "#F59E0B" }}>{form.phone || "+90 5XX XXX XX XX"}</strong> numaralı hattı bağlamak için QR kodu okutun.
              </p>
              <div style={{ width: 160, height: 160, margin: "0 auto 18px", background: "#fff", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
                {qrStatus === "connected" ? <div style={{ fontSize: 52 }}>✅</div> : (
                  <>
                    <svg width="130" height="130" viewBox="0 0 130 130">
                      {[0,1,2,3,4,5,6].map(r => [0,1,2,3,4,5,6].map(c => {
                        const corner = (r<2&&c<2)||(r<2&&c>4)||(r>4&&c<2);
                        const fill = Math.sin(r*3.7+c*2.1) > 0;
                        return fill||corner ? <rect key={`${r}-${c}`} x={c*18} y={r*18} width={16} height={16} rx={2} fill={corner?"#F59E0B":"#000"} /> : null;
                      }))}
                    </svg>
                    {qrStatus === "scanning" && (
                      <div style={{ position: "absolute", inset: 0, background: "rgba(245,158,11,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <div style={{ width: 36, height: 36, border: "3px solid rgba(245,158,11,0.3)", borderTopColor: "#F59E0B", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
                        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
                      </div>
                    )}
                  </>
                )}
              </div>
              {qrStatus === "waiting" && (
                <>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", marginBottom: 18 }}>WhatsApp → Bağlı Cihazlar → Cihaz Ekle → QR Tara</div>
                  <button onClick={scanQR} style={{ padding: "12px 28px", background: "linear-gradient(135deg,#25D366,#128C7E)", color: "#fff", border: "none", borderRadius: 12, fontWeight: 700, cursor: "pointer", fontSize: 14 }}>QR Kodu Okuttum ✓</button>
                </>
              )}
              {qrStatus === "scanning" && <p style={{ color: "#F59E0B", fontSize: 14 }}>Bağlanıyor...</p>}
              {qrStatus === "connected" && <p style={{ color: "#10B981", fontSize: 15, fontWeight: 700, marginBottom: 16 }}>✓ Hat başarıyla bağlandı!</p>}
              {qrDone && (
                <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
                  <button onClick={() => setStep(3)} style={{ flex: 1, padding: "12px 0", background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.5)", border: "none", borderRadius: 12, fontWeight: 600, cursor: "pointer" }}>← Geri</button>
                  <button onClick={() => setStep(5)} style={{ flex: 2, padding: "12px 0", background: "linear-gradient(135deg,#10B981,#059669)", color: "#fff", border: "none", borderRadius: 12, fontWeight: 700, fontSize: 14, cursor: "pointer" }}>Son Adım →</button>
                </div>
              )}
              {!qrDone && <button onClick={() => setStep(3)} style={{ marginTop: 14, padding: "10px 20px", background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.4)", border: "none", borderRadius: 10, cursor: "pointer", fontSize: 13 }}>← Geri</button>}
            </div>
          )}

          {step === 5 && !deployed && (
            <div>
              <h4 style={{ color: "#fff", fontSize: 16, marginBottom: 18 }}>Kurulum Özeti</h4>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 22 }}>
                {[["İşletme",form.businessName||"—"],["Sektör",SECTORS.find(s=>s.id===sector)?.name||"—"],["WhatsApp",form.phone||"—"],["Yönlendirme",form.redirectPhone||"—"],["Saatler",`${workStart}-${workEnd}`],["Günler",`${workDays.length} gün`],["Üslup",form.tone==="professional"?"Profesyonel":form.tone==="friendly"?"Samimi":"Resmi"],["Paket",plan?.name]].map(([l,v]) => (
                  <div key={l} style={{ background: "rgba(255,255,255,0.03)", borderRadius: 10, padding: "11px 13px" }}>
                    <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", marginBottom: 3, letterSpacing: 0.5 }}>{l.toUpperCase()}</div>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{v}</div>
                  </div>
                ))}
              </div>
              {deploying ? (
                <div style={{ textAlign: "center", padding: "16px 0" }}>
                  <div style={{ width: 40, height: 40, border: "3px solid rgba(245,158,11,0.2)", borderTopColor: "#F59E0B", borderRadius: "50%", margin: "0 auto 12px", animation: "spin 0.8s linear infinite" }} />
                  <p style={{ color: "#F59E0B", fontSize: 14 }}>Bot akışı oluşturuluyor...</p>
                </div>
              ) : (
                <div style={{ display: "flex", gap: 10 }}>
                  <button onClick={() => setStep(4)} style={{ flex: 1, padding: "12px 0", background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.5)", border: "none", borderRadius: 12, fontWeight: 600, cursor: "pointer" }}>← Geri</button>
                  <button onClick={deploy} style={{ flex: 2, padding: "12px 0", background: "linear-gradient(135deg,#10B981,#059669)", color: "#fff", border: "none", borderRadius: 12, fontWeight: 700, fontSize: 14, cursor: "pointer" }}>🚀 Canlıya Al</button>
                </div>
              )}
            </div>
          )}

          {deployed && (
            <div style={{ textAlign: "center", padding: "20px 0" }}>
              <div style={{ width: 68, height: 68, background: "linear-gradient(135deg,#10B981,#059669)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 18px", fontSize: 30 }}>✓</div>
              <h4 style={{ color: "#10B981", fontSize: 22, marginBottom: 8 }}>Tebrikler!</h4>
              <p style={{ color: "rgba(255,255,255,0.5)", marginBottom: 20, lineHeight: 1.7 }}>
                <strong style={{ color: "#fff" }}>{form.businessName}</strong> için botunuz aktif!
              </p>
              {[["✅",`Hat bağlandı: ${form.phone}`],["⏰",`Çalışma: ${workStart}-${workEnd}`],["🔀",`Yönlendirme: ${form.redirectPhone||"—"}`],["📊","Panelden takip edebilirsiniz"]].map(([ic,tx]) => (
                <div key={tx} style={{ display: "flex", alignItems: "center", gap: 10, background: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.15)", borderRadius: 10, padding: "10px 14px", fontSize: 13, color: "rgba(255,255,255,0.65)", textAlign: "left", marginBottom: 8 }}>
                  <span>{ic}</span>{tx}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [page, setPage] = useState("home");
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);
  const [reviewModal, setReviewModal] = useState(false);
  const [reviewSent, setReviewSent] = useState(false);
  const [rf, setRf] = useState({ name: "", company: "", text: "", rating: 5 });
  const [cookieConsent, setCookieConsent] = useState(null);

  // Auth states
  const [authMode, setAuthMode] = useState("login");
  const [authEmail, setAuthEmail] = useState("");
  const [authPass, setAuthPass] = useState("");
  const [authName, setAuthName] = useState("");
  const [authPhone, setAuthPhone] = useState("");
  const [authUser, setAuthUser] = useState(null);
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [dashData, setDashData] = useState({ totalMessages: 0, todayMessages: 0, appointments: 0, recentMessages: [] });

  const SUPABASE_URL = "https://xijrzpeexmucibivqsnt.supabase.co";
  const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhpanJ6cGVleG11Y2liaXZxc250Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMzOTU2OTEsImV4cCI6MjA4ODk3MTY5MX0.4FxdyTEsSME2VAho-ZrSQQaFXemSM8Mbn2rhE6hljd0";

  const supaFetch = async (path, options = {}) => {
    const res = await fetch(`${SUPABASE_URL}${path}`, {
      ...options,
      headers: { "apikey": SUPABASE_KEY, "Content-Type": "application/json", "Authorization": `Bearer ${options.token || SUPABASE_KEY}`, ...options.headers },
    });
    return res.json();
  };

  const handleAuth = async () => {
    if (!authEmail || !authPass) { setAuthError("E-posta ve şifre zorunludur"); return; }
    if (authMode === "register" && authPass.length < 6) { setAuthError("Şifre en az 6 karakter olmalıdır"); return; }
    setAuthLoading(true);
    setAuthError("");
    try {
      if (authMode === "login") {
        const res = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
          method: "POST",
          headers: { "apikey": SUPABASE_KEY, "Content-Type": "application/json" },
          body: JSON.stringify({ email: authEmail, password: authPass }),
        });
        const data = await res.json();
        if (!res.ok || data.error) {
          const msg = data.error_description || data.error?.message || data.msg || "Giriş başarısız";
          setAuthError(msg === "Invalid login credentials" ? "E-posta veya şifre yanlış" : msg === "Email not confirmed" ? "E-posta doğrulanmamış" : msg);
          setAuthLoading(false);
          return;
        }
        setAuthUser(data.user);
        loadDashboard(data.access_token);
        setPage("dashboard");
      } else {
        if (!authName) { setAuthError("Ad soyad zorunludur"); setAuthLoading(false); return; }
        const res = await fetch(`${SUPABASE_URL}/auth/v1/signup`, {
          method: "POST",
          headers: { "apikey": SUPABASE_KEY, "Content-Type": "application/json" },
          body: JSON.stringify({ email: authEmail, password: authPass, data: { name: authName, phone: authPhone } }),
        });
        const data = await res.json();
        if (!res.ok || data.error) {
          const msg = data.error?.message || data.msg || "Kayıt başarısız";
          setAuthError(msg === "User already registered" ? "Bu e-posta zaten kayıtlı" : msg);
          setAuthLoading(false);
          return;
        }
        setAuthUser(data.user);
        loadDashboard(data.access_token);
        setPage("dashboard");
      }
    } catch (e) { setAuthError("Bağlantı hatası. Lütfen tekrar deneyin."); }
    setAuthLoading(false);
  };

  const loadDashboard = async (token) => {
    try {
      const msgs = await supaFetch("/rest/v1/messages?select=*&order=created_at.desc&limit=10", { token });
      const today = new Date().toISOString().split("T")[0];
      const todayMsgs = Array.isArray(msgs) ? msgs.filter(m => m.created_at?.startsWith(today)) : [];
      setDashData({
        totalMessages: Array.isArray(msgs) ? msgs.length : 0,
        todayMessages: todayMsgs.length,
        appointments: 0,
        recentMessages: Array.isArray(msgs) ? msgs.slice(0, 5) : [],
      });
    } catch (e) {}
  };

  useEffect(() => {
    try { const saved = window.sessionStorage?.getItem?.("cookie_consent"); if (saved) setCookieConsent(saved); } catch(e) {}
  }, []);

  const acceptCookies = (type) => {
    setCookieConsent(type);
    try { window.sessionStorage?.setItem?.("cookie_consent", type); } catch(e) {}
  };

  const NAV = [{ id: "home", label: "Ana Sayfa" }, { id: "demo", label: "Canlı Demo" }, { id: "reviews", label: "Referanslar" }, { id: "blog", label: "Blog" }, { id: "faq", label: "SSS" }, { id: "contact", label: "İletişim" }];

  return (
    <div style={{ minHeight: "100vh", background: "#060610", color: "#fff", fontFamily: "system-ui,sans-serif" }}>
      <div style={{ position: "fixed", inset: 0, background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(245,158,11,0.07) 0%, transparent 60%)", pointerEvents: "none", zIndex: 0 }} />

      <nav style={{ position: "sticky", top: 0, zIndex: 100, padding: "0 28px", height: 60, display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(6,6,16,0.88)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <button onClick={() => setPage("home")} style={{ display: "flex", alignItems: "center", gap: 9, background: "none", border: "none", cursor: "pointer" }}>
          <div style={{ width: 34, height: 34, background: "linear-gradient(135deg,#F59E0B,#EF4444)", borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 16, color: "#fff" }}>A</div>
          <span style={{ fontSize: 18, fontWeight: 700, color: "#fff" }}>Asistan<span style={{ color: "#F59E0B" }}>AI</span></span>
        </button>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          {NAV.map(n => (
            <button key={n.id} onClick={() => setPage(n.id)} style={{ padding: "7px 14px", borderRadius: 8, border: "none", background: page === n.id ? "rgba(245,158,11,0.12)" : "transparent", color: page === n.id ? "#F59E0B" : "rgba(255,255,255,0.55)", cursor: "pointer", fontSize: 13, fontWeight: page === n.id ? 700 : 400 }}>{n.label}</button>
          ))}
          <button onClick={() => setPage("login")} style={{ marginLeft: 8, background: "linear-gradient(135deg,#F59E0B,#D97706)", color: "#000", border: "none", padding: "9px 18px", borderRadius: 9, fontWeight: 700, fontSize: 13, cursor: "pointer" }}>Giriş Yap</button>
        </div>
      </nav>

      {page === "home" && (
        <div style={{ position: "relative", zIndex: 1 }}>
          <section style={{ padding: "80px 24px 60px", maxWidth: 1080, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 52, alignItems: "center" }}>
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.2)", borderRadius: 100, padding: "5px 14px", marginBottom: 22 }}>
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#10B981" }} />
                <span style={{ fontSize: 11, color: "#F59E0B", fontWeight: 600 }}>IA WhatsApp Destekli</span>
              </div>
              <h1 style={{ fontSize: 46, fontWeight: 800, lineHeight: 1.1, marginBottom: 18, letterSpacing: -1 }}>
                Dakikalar İçinde<br />
                <span style={{ background: "linear-gradient(135deg,#F59E0B,#EF4444)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>AI WhatsApp</span><br />
                Asistanınız Hazır
              </h1>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 16, lineHeight: 1.7, marginBottom: 32 }}>
                İşletmeniz için sektöre özel yapay zeka asistanı kurun. Bilgilerinizi girin, paketinizi seçin — gerisini biz halledelim.
              </p>
              <div style={{ display: "flex", gap: 12 }}>
                <button onClick={() => window.open("https://wa.me/905327834244?text=Merhaba%2C%20%C3%BCcretsiz%20demo%20istiyorum", "_blank")} style={{ background: "linear-gradient(135deg,#F59E0B,#D97706)", color: "#000", padding: "14px 28px", borderRadius: 11, fontWeight: 700, fontSize: 14, border: "none", cursor: "pointer" }}>Ücretsiz Dene →</button>
                <button onClick={() => setPage("faq")} style={{ background: "rgba(255,255,255,0.05)", color: "#fff", padding: "14px 22px", borderRadius: 11, fontWeight: 600, fontSize: 14, border: "1px solid rgba(255,255,255,0.1)", cursor: "pointer" }}>Nasıl Çalışır?</button>
              </div>
              <div style={{ display: "flex", gap: 36, marginTop: 40, paddingTop: 28, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                {[{n:1200,s:"+",l:"Aktif Bot"},{n:98,s:"%",l:"Memnuniyet"},{n:50,s:"ms",l:"Yanıt Süresi"}].map(st => (
                  <div key={st.l}>
                    <div style={{ fontSize: 26, fontWeight: 700, color: "#F59E0B" }}><Counter end={st.n} suffix={st.s} /></div>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 3 }}>{st.l}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background: "rgba(255,255,255,0.02)", borderRadius: 22, padding: 22, border: "1px solid rgba(255,255,255,0.06)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18, paddingBottom: 14, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ width: 38, height: 38, borderRadius: 11, background: "linear-gradient(135deg,#25D366,#128C7E)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>💬</div>
                <div><div style={{ fontWeight: 600, fontSize: 13 }}>ABC Emlak AI Asistan</div><div style={{ fontSize: 10, color: "#10B981" }}>● Çevrimiçi</div></div>
              </div>
              <ChatBubble text="Merhaba, Kadıköy'de 3+1 daire arıyorum." isBot={false} delay={500} />
              <ChatBubble text="Merhaba! Kadıköy'de 12 adet 3+1 dairemiz var. Bütçe aralığınız nedir?" isBot={true} delay={1500} />
              <ChatBubble text="5-8 milyon arası, Caferağa olursa güzel olur." isBot={false} delay={3000} />
              <ChatBubble text="Caferağa'da 3 uygun dairemiz var! 📋 Görüntüleme için uygun gününüzü yazabilirsiniz." isBot={true} delay={4500} />
            </div>
          </section>

          {/* NASIL ÇALIŞIR */}
          <section style={{ padding: "70px 24px", maxWidth: 1080, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <h2 style={{ fontSize: 36, fontWeight: 700, marginBottom: 10 }}>Nasıl <span style={{ color: "#F59E0B" }}>Çalışır?</span></h2>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 15 }}>3 basit adımda WhatsApp AI asistanınız hazır.</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
              {[
                { step: "01", icon: "📋", title: "Bilgilerinizi Girin", desc: "İşletme adı, hizmetler, çalışma saatleri ve sektörünüzü seçin. 2 dakikada tamamlayın." },
                { step: "02", icon: "📱", title: "WhatsApp'ı Bağlayın", desc: "QR kodu telefonunuzdan okutun. İşletme WhatsApp numaranız anında aktif olsun." },
                { step: "03", icon: "🚀", title: "Canlıya Alın", desc: "AI asistanınız 7/24 müşterilerinize cevap vermeye başlasın. Siz uyurken bile." },
              ].map(s => (
                <div key={s.step} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 20, padding: 28, textAlign: "center", position: "relative" }}>
                  <div style={{ position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)", background: "linear-gradient(135deg,#F59E0B,#D97706)", color: "#000", width: 28, height: 28, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800 }}>{s.step}</div>
                  <div style={{ fontSize: 36, marginBottom: 14, marginTop: 8 }}>{s.icon}</div>
                  <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{s.title}</h3>
                  <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 13, lineHeight: 1.7 }}>{s.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* KULLANIM SENARYOLARI */}
          <section style={{ padding: "70px 24px", maxWidth: 1080, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <h2 style={{ fontSize: 36, fontWeight: 700, marginBottom: 10 }}>Kullanım <span style={{ color: "#F59E0B" }}>Senaryoları</span></h2>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 15 }}>Her sektörde gerçek sonuçlar üreten AI asistan.</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 16 }}>
              {[
                { icon: "🏠", sector: "Emlak", scenario: "Müşteri: \"Kadıköy'de 3+1 arıyorum\"\nAI: Bütçe ve mahalle sorar, portföyden eşleştirir, görüntüleme randevusu oluşturur.", result: "Aylık 40+ yeni lead" },
                { icon: "🏥", sector: "Diş Kliniği", scenario: "Hasta: \"Diş beyazlatma fiyatı ne?\"\nAI: Fiyat aralığı verir, muayene önerir, randevu oluşturur.", result: "Randevularda %35 artış" },
                { icon: "💇", sector: "Güzellik Merkezi", scenario: "Müşteri: \"Yarın saç boyama için müsait misiniz?\"\nAI: Uygun saatleri gösterir, personel tercihi sorar, randevu alır.", result: "Boş randevu %60 azaldı" },
                { icon: "🏋️", sector: "Fitness", scenario: "Müşteri: \"Üyelik fiyatları nedir?\"\nAI: Hedef sorar, uygun paket önerir, deneme dersi teklif eder.", result: "Üyelik dönüşümü 2x arttı" },
              ].map(s => (
                <div key={s.sector} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 18, padding: 24 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                    <span style={{ fontSize: 28 }}>{s.icon}</span>
                    <h3 style={{ fontSize: 16, fontWeight: 700, margin: 0 }}>{s.sector}</h3>
                  </div>
                  <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 13, lineHeight: 1.7, marginBottom: 14, whiteSpace: "pre-line" }}>{s.scenario}</p>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 5, background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)", borderRadius: 8, padding: "5px 12px" }}>
                    <span style={{ fontSize: 11, color: "#10B981", fontWeight: 700 }}>📈 {s.result}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ENTEGRASYONLAR */}
          <section style={{ padding: "70px 24px", maxWidth: 1080, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <h2 style={{ fontSize: 36, fontWeight: 700, marginBottom: 10 }}>Güçlü <span style={{ color: "#F59E0B" }}>Entegrasyonlar</span></h2>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 15 }}>En iyi teknolojilerle sorunsuz çalışır.</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
              {[
                { name: "WhatsApp", icon: "💬", desc: "WhatsApp Business Web entegrasyonu (QR bağlantı)", color: "#25D366" },
                { name: "OpenAI GPT", icon: "🧠", desc: "En gelişmiş yapay zeka modeli", color: "#10B981" },
                { name: "CRM", icon: "📊", desc: "HubSpot, Salesforce, Zoho bağlantısı", color: "#F59E0B" },
                { name: "Otomasyon", icon: "⚡", desc: "500+ uygulama ile otomasyon", color: "#8B5CF6" },
              ].map(i => (
                <div key={i.name} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: 22, textAlign: "center" }}>
                  <div style={{ fontSize: 32, marginBottom: 10 }}>{i.icon}</div>
                  <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 4, color: i.color }}>{i.name}</h4>
                  <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, lineHeight: 1.6 }}>{i.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CANLI DEMO CTA */}
          <section style={{ padding: "60px 24px", maxWidth: 800, margin: "0 auto" }}>
            <div style={{ background: "linear-gradient(135deg,rgba(37,211,102,0.1),rgba(18,140,126,0.05))", border: "1px solid rgba(37,211,102,0.2)", borderRadius: 24, padding: "40px 32px", textAlign: "center" }}>
              <div style={{ fontSize: 42, marginBottom: 16 }}>📱</div>
              <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 10 }}>Hemen Deneyin!</h2>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 15, marginBottom: 24, lineHeight: 1.7 }}>WhatsApp'tan mesaj gönderin, AI asistanımızın gücünü bizzat deneyimleyin.</p>
              <button onClick={() => window.open("https://wa.me/905327834244?text=Merhaba%2C%20demo%20g%C3%B6rmek%20istiyorum", "_blank")} style={{ background: "linear-gradient(135deg,#25D366,#128C7E)", color: "#fff", border: "none", padding: "16px 36px", borderRadius: 14, fontWeight: 700, fontSize: 16, cursor: "pointer", boxShadow: "0 4px 20px rgba(37,211,102,0.3)" }}>💬 WhatsApp'ta Dene →</button>
            </div>
          </section>

          <section style={{ padding: "70px 24px", maxWidth: 1080, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <h2 style={{ fontSize: 36, fontWeight: 700, marginBottom: 10 }}><span style={{ color: "#F59E0B" }}>Fiyatlandırma</span></h2>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 15 }}>İşletmenize uygun paketi seçin, 7 gün ücretsiz deneyin.</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
              {PLANS.map(plan => (
                <div key={plan.id} style={{ background: plan.popular ? "linear-gradient(180deg,rgba(245,158,11,0.08),rgba(6,6,16,1) 50%)" : "rgba(255,255,255,0.02)", border: plan.popular ? "1px solid rgba(245,158,11,0.3)" : "1px solid rgba(255,255,255,0.06)", borderRadius: 22, padding: 28, position: "relative", display: "flex", flexDirection: "column" }}>
                  {plan.popular && <div style={{ position: "absolute", top: -1, left: "50%", transform: "translateX(-50%)", background: "linear-gradient(135deg,#F59E0B,#D97706)", color: "#000", padding: "5px 18px", borderRadius: "0 0 10px 10px", fontSize: 10, fontWeight: 700 }}>EN POPÜLER</div>}
                  <h3 style={{ fontSize: 17, fontWeight: 600, marginBottom: 4, color: plan.color }}>{plan.name}</h3>
                  <div style={{ marginBottom: 22 }}>
                    <span style={{ fontSize: 36, fontWeight: 800 }}>{plan.price}</span>
                    <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 13 }}>{plan.period}</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    {plan.features.map(f => (
                      <div key={f} style={{ display: "flex", alignItems: "center", gap: 9, padding: "7px 0", borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
                        <span style={{ color: plan.color }}>✓</span>
                        <span style={{ color: "rgba(255,255,255,0.65)", fontSize: 13 }}>{f}</span>
                      </div>
                    ))}
                  </div>
                  <button onClick={() => setSelectedPlan(plan)} style={{ marginTop: 22, width: "100%", padding: "13px 0", background: plan.popular ? "linear-gradient(135deg,#F59E0B,#D97706)" : "rgba(255,255,255,0.05)", color: plan.popular ? "#000" : "#fff", border: plan.popular ? "none" : "1px solid rgba(255,255,255,0.1)", borderRadius: 11, fontWeight: 700, fontSize: 14, cursor: "pointer" }}>
                    {plan.popular ? "Hemen Başla" : plan.id === "starter" ? "Başla" : "İletişime Geç"}
                  </button>
                </div>
              ))}
            </div>
          </section>

          <section style={{ padding: "70px 24px", maxWidth: 1080, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <h2 style={{ fontSize: 36, fontWeight: 700, marginBottom: 10 }}>Sektörünüze Özel <span style={{ color: "#F59E0B" }}>Hazır AI Şablonlar</span></h2>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 15 }}>Her sektör için optimize edilmiş yapay zeka asistanı. Bilgilerinizi girin, anında çalışsın.</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
              {SECTORS.map(s => (
                <div key={s.id} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 18, padding: 24, textAlign: "center", cursor: "pointer", transition: "all 0.3s ease" }} onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(245,158,11,0.3)"; e.currentTarget.style.background = "rgba(245,158,11,0.05)"; }} onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.background = "rgba(255,255,255,0.02)"; }}>
                  <div style={{ fontSize: 36, marginBottom: 12 }}>{s.icon}</div>
                  <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 6 }}>{s.name}</h3>
                  <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 13, lineHeight: 1.6, marginBottom: 16 }}>{s.desc}</p>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 5, background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)", borderRadius: 100, padding: "4px 12px" }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#10B981" }} />
                    <span style={{ fontSize: 11, color: "#10B981", fontWeight: 600 }}>Şablon Hazır</span>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 32 }}>
              <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 13, marginBottom: 16 }}>Sektörünüzü göremiyorsanız bize yazın, özel şablon hazırlayalım.</p>
              <button onClick={() => window.open("https://wa.me/905327834244?text=Merhaba%2C%20sekt%C3%B6r%C3%BCme%20%C3%B6zel%20%C5%9Fablon%20istiyorum", "_blank")} style={{ background: "linear-gradient(135deg,#25D366,#128C7E)", color: "#fff", border: "none", padding: "12px 24px", borderRadius: 11, fontWeight: 700, fontSize: 13, cursor: "pointer" }}>💬 Özel Şablon Talep Et</button>
            </div>
          </section>

          <section style={{ padding: "60px 24px", maxWidth: 1080, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 36 }}>
              <h2 style={{ fontSize: 32, fontWeight: 700, marginBottom: 10 }}>Müşterilerimiz <span style={{ color: "#F59E0B" }}>Ne Diyor?</span></h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 16, marginBottom: 24 }}>
              {REVIEWS.map(r => (
                <div key={r.id} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 18, padding: 22 }}>
                  <div style={{ display: "inline-flex", background: `${r.color}15`, border: `1px solid ${r.color}30`, borderRadius: 7, padding: "3px 10px", fontSize: 10, color: r.color, fontWeight: 700, marginBottom: 12 }}>✦ {r.highlight}</div>
                  <p style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", lineHeight: 1.7, marginBottom: 14 }}>"{r.text}"</p>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ display: "flex", gap: 9, alignItems: "center" }}>
                      <div style={{ width: 36, height: 36, borderRadius: 10, background: `${r.color}22`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: r.color }}>{r.avatar}</div>
                      <div><div style={{ fontSize: 12, fontWeight: 700 }}>{r.name}</div><div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)" }}>{r.company}</div></div>
                    </div>
                    <Stars n={r.rating} />
                  </div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center" }}>
              <button onClick={() => setPage("reviews")} style={{ background: "rgba(255,255,255,0.05)", color: "#fff", border: "1px solid rgba(255,255,255,0.1)", padding: "11px 24px", borderRadius: 10, fontWeight: 600, fontSize: 13, cursor: "pointer" }}>Tüm Referansları Gör →</button>
            </div>
          </section>

          <section style={{ padding: "60px 24px", maxWidth: 700, margin: "0 auto 60px" }}>
            <div style={{ background: "linear-gradient(135deg,rgba(245,158,11,0.1),rgba(239,68,68,0.05))", border: "1px solid rgba(245,158,11,0.2)", borderRadius: 24, padding: "48px 36px", textAlign: "center" }}>
              <h2 style={{ fontSize: 30, fontWeight: 700, marginBottom: 10 }}>Hemen Başlayın</h2>
              <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 15, marginBottom: 26 }}>₺499/ay'dan başlayan paketler. 7 gün ücretsiz deneme.</p>
              <button onClick={() => setSelectedPlan(PLANS[1])} style={{ background: "linear-gradient(135deg,#F59E0B,#D97706)", color: "#000", border: "none", padding: "14px 32px", borderRadius: 12, fontWeight: 700, fontSize: 15, cursor: "pointer" }}>Ücretsiz Dene →</button>
            </div>
          </section>
        </div>
      )}

      {page === "reviews" && (
        <div style={{ maxWidth: 1080, margin: "0 auto", padding: "52px 24px", position: "relative", zIndex: 1 }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h1 style={{ fontSize: 42, fontWeight: 800, marginBottom: 12 }}>Müşterilerimiz <span style={{ background: "linear-gradient(135deg,#F59E0B,#EF4444)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Ne Diyor?</span></h1>
            <div style={{ display: "flex", gap: 32, justifyContent: "center", marginTop: 24 }}>
              {[{v:"1.200+",l:"Aktif İşletme"},{v:"4.9/5",l:"Ortalama Puan"},{v:"%96",l:"Memnuniyet"}].map(s => (
                <div key={s.l} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 24, fontWeight: 800, color: "#F59E0B" }}>{s.v}</div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 18, marginBottom: 40 }}>
            {REVIEWS.map(r => (
              <div key={r.id} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 20, padding: 24 }}>
                <div style={{ display: "inline-flex", background: `${r.color}15`, border: `1px solid ${r.color}30`, borderRadius: 7, padding: "3px 10px", fontSize: 10, color: r.color, fontWeight: 700, marginBottom: 14 }}>✦ {r.highlight}</div>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.68)", lineHeight: 1.75, marginBottom: 18 }}>"{r.text}"</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 14, borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                  <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                    <div style={{ width: 40, height: 40, borderRadius: 11, background: `${r.color}22`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: r.color }}>{r.avatar}</div>
                    <div><div style={{ fontSize: 13, fontWeight: 700 }}>{r.name}</div><div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)" }}>{r.company} · {r.date}</div></div>
                  </div>
                  <Stars n={r.rating} />
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center" }}>
            <button onClick={() => setReviewModal(true)} style={{ background: "linear-gradient(135deg,#F59E0B,#D97706)", color: "#000", border: "none", padding: "13px 28px", borderRadius: 12, fontWeight: 700, fontSize: 14, cursor: "pointer" }}>✍️ Yorum Yaz</button>
          </div>
          {reviewModal && (
            <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", backdropFilter: "blur(10px)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
              <div style={{ background: "#0f0f1a", border: "1px solid rgba(245,158,11,0.2)", borderRadius: 22, width: "100%", maxWidth: 440, padding: 30 }}>
                {!reviewSent ? (
                  <>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 22 }}>
                      <h3 style={{ margin: 0, color: "#F59E0B", fontSize: 18 }}>Deneyiminizi Paylaşın</h3>
                      <button onClick={() => setReviewModal(false)} style={{ background: "rgba(255,255,255,0.07)", border: "none", color: "#fff", width: 30, height: 30, borderRadius: 8, cursor: "pointer" }}>✕</button>
                    </div>
                    <div style={{ marginBottom: 14 }}>
                      <label style={lbl}>PUANINIZ</label>
                      <div style={{ display: "flex", gap: 5 }}>{[1,2,3,4,5].map(i => <span key={i} onClick={() => setRf(p=>({...p,rating:i}))} style={{ fontSize: 26, cursor: "pointer", color: i<=rf.rating?"#F59E0B":"rgba(255,255,255,0.15)" }}>★</span>)}</div>
                    </div>
                    {[["name","AD SOYAD","Ahmet Yılmaz"],["company","ŞİRKET","ABC Emlak"]].map(([k,l,p]) => (
                      <div key={k} style={{ marginBottom: 12 }}>
                        <label style={lbl}>{l}</label>
                        <input placeholder={p} value={rf[k]} onChange={e => setRf(p=>({...p,[k]:e.target.value}))} style={inp} />
                      </div>
                    ))}
                    <div style={{ marginBottom: 18 }}>
                      <label style={lbl}>DENEYİMİNİZ</label>
                      <textarea placeholder="Deneyiminizi anlatın..." value={rf.text} onChange={e => setRf(p=>({...p,text:e.target.value}))} rows={3} style={{ ...inp, resize: "vertical", lineHeight: 1.6, fontFamily: "inherit" }} />
                    </div>
                    <button onClick={() => { if(rf.name&&rf.company&&rf.text){setReviewSent(true);setTimeout(()=>{setReviewModal(false);setReviewSent(false);setRf({name:"",company:"",text:"",rating:5});},2500);}}} style={{ width: "100%", padding: "13px 0", background: "linear-gradient(135deg,#F59E0B,#D97706)", color: "#000", border: "none", borderRadius: 11, fontWeight: 700, fontSize: 14, cursor: "pointer" }}>Gönder</button>
                  </>
                ) : (
                  <div style={{ textAlign: "center", padding: "20px 0" }}>
                    <div style={{ width: 56, height: 56, background: "rgba(16,185,129,0.15)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", fontSize: 24 }}>✓</div>
                    <h4 style={{ color: "#10B981", fontSize: 18, marginBottom: 6 }}>Teşekkürler!</h4>
                    <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 13 }}>Yorumunuz incelendikten sonra yayınlanacak.</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {page === "faq" && (
        <div style={{ maxWidth: 720, margin: "0 auto", padding: "52px 24px", position: "relative", zIndex: 1 }}>
          <div style={{ textAlign: "center", marginBottom: 44 }}>
            <h1 style={{ fontSize: 42, fontWeight: 800, marginBottom: 12 }}>Sık Sorulan <span style={{ background: "linear-gradient(135deg,#F59E0B,#EF4444)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Sorular</span></h1>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 48 }}>
            {FAQS.map(f => (
              <div key={f.id} onClick={() => setOpenFaq(openFaq === f.id ? null : f.id)} style={{ background: openFaq === f.id ? "rgba(245,158,11,0.05)" : "rgba(255,255,255,0.02)", border: openFaq === f.id ? "1px solid rgba(245,158,11,0.25)" : "1px solid rgba(255,255,255,0.06)", borderRadius: 14, cursor: "pointer", overflow: "hidden" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 22px", gap: 12 }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: openFaq === f.id ? "#F59E0B" : "#fff" }}>{f.q}</span>
                  <span style={{ color: openFaq === f.id ? "#F59E0B" : "rgba(255,255,255,0.3)", fontSize: 20, display: "inline-block", transform: openFaq === f.id ? "rotate(45deg)" : "none", flexShrink: 0 }}>+</span>
                </div>
                {openFaq === f.id && <p style={{ margin: 0, padding: "0 22px 18px", paddingTop: 14, fontSize: 14, color: "rgba(255,255,255,0.55)", lineHeight: 1.8, borderTop: "1px solid rgba(255,255,255,0.05)" }}>{f.a}</p>}
              </div>
            ))}
          </div>
          <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 20, padding: "36px 28px", textAlign: "center" }}>
            <div style={{ fontSize: 34, marginBottom: 14 }}>🤔</div>
            <h3 style={{ fontSize: 22, marginBottom: 8 }}>Cevap bulamadınız mı?</h3>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14, marginBottom: 22 }}>Ekibimiz yardımcı olmaktan memnuniyet duyar.</p>
            <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
              <button onClick={() => window.open("https://wa.me/905327834244?text=Merhaba%2C%20bir%20sorum%20var", "_blank")} style={{ padding: "11px 22px", background: "linear-gradient(135deg,#25D366,#128C7E)", color: "#fff", border: "none", borderRadius: 11, fontWeight: 700, fontSize: 13, cursor: "pointer" }}>💬 WhatsApp'tan Yaz</button>
              <button style={{ padding: "11px 20px", background: "rgba(255,255,255,0.05)", color: "#fff", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 11, fontWeight: 600, fontSize: 13, cursor: "pointer" }}>✉️ E-posta Gönder</button>
            </div>
          </div>
        </div>
      )}

      {page === "demo" && (
        <div style={{ maxWidth: 700, margin: "0 auto", padding: "60px 24px", position: "relative", zIndex: 1, textAlign: "center" }}>
          <div style={{ fontSize: 52, marginBottom: 20 }}>📱</div>
          <h1 style={{ fontSize: 42, fontWeight: 800, marginBottom: 12 }}>Canlı <span style={{ background: "linear-gradient(135deg,#25D366,#128C7E)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Demo</span></h1>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 16, lineHeight: 1.7, marginBottom: 36 }}>AI asistanımızı şimdi test edin. WhatsApp'tan mesaj gönderin, yapay zekanın gücünü deneyimleyin. Ücretsiz, kayıt gerektirmez.</p>
          <button onClick={() => window.open("https://wa.me/905327834244?text=Merhaba%2C%20demo%20g%C3%B6rmek%20istiyorum", "_blank")} style={{ background: "linear-gradient(135deg,#25D366,#128C7E)", color: "#fff", border: "none", padding: "18px 42px", borderRadius: 14, fontWeight: 700, fontSize: 17, cursor: "pointer", boxShadow: "0 4px 24px rgba(37,211,102,0.35)", marginBottom: 48 }}>💬 WhatsApp'ta Deneyin →</button>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginTop: 20 }}>
            {[
              { icon: "⚡", title: "Anında Yanıt", desc: "Mesajınıza saniyeler içinde cevap alın" },
              { icon: "🧠", title: "Akıllı Diyalog", desc: "Sorularınızı anlayan gerçek AI" },
              { icon: "🔒", title: "Güvenli", desc: "Verileriniz korunur, KVKK uyumlu" },
            ].map(f => (
              <div key={f.title} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: 22 }}>
                <div style={{ fontSize: 28, marginBottom: 10 }}>{f.icon}</div>
                <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>{f.title}</h4>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 12 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {page === "contact" && (
        <div style={{ maxWidth: 700, margin: "0 auto", padding: "52px 24px", position: "relative", zIndex: 1 }}>
          <div style={{ textAlign: "center", marginBottom: 44 }}>
            <h1 style={{ fontSize: 42, fontWeight: 800, marginBottom: 12 }}>Bize <span style={{ background: "linear-gradient(135deg,#F59E0B,#EF4444)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Ulaşın</span></h1>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 15 }}>Sorularınız için bize her kanaldan ulaşabilirsiniz.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 16, marginBottom: 32 }}>
            {[
              { icon: "💬", title: "WhatsApp", desc: "En hızlı iletişim kanalı", action: "Mesaj Gönder", link: "https://wa.me/905327834244?text=Merhaba%2C%20bilgi%20almak%20istiyorum", color: "#25D366" },
              { icon: "✉️", title: "E-posta", desc: "info@asistania.com", action: "Mail Gönder", link: "mailto:info@asistania.com", color: "#F59E0B" },
            ].map(c => (
              <div key={c.title} onClick={() => window.open(c.link, "_blank")} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 18, padding: 28, textAlign: "center", cursor: "pointer", transition: "all 0.3s" }} onMouseEnter={e => e.currentTarget.style.borderColor = `${c.color}50`} onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>{c.icon}</div>
                <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 4, color: c.color }}>{c.title}</h3>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, marginBottom: 16 }}>{c.desc}</p>
                <span style={{ background: `${c.color}15`, border: `1px solid ${c.color}30`, color: c.color, padding: "8px 18px", borderRadius: 10, fontSize: 13, fontWeight: 700 }}>{c.action}</span>
              </div>
            ))}
          </div>
          <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 20, padding: 28, textAlign: "center" }}>
            <h3 style={{ fontSize: 18, marginBottom: 6 }}>Çalışma Saatleri</h3>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 14, lineHeight: 1.8 }}>Pazartesi - Cuma: 09:00 - 18:00<br/>AI Asistanımız: 7/24 aktif</p>
          </div>
        </div>
      )}

      {page === "blog" && (
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "52px 24px", position: "relative", zIndex: 1 }}>
          <div style={{ textAlign: "center", marginBottom: 44 }}>
            <h1 style={{ fontSize: 42, fontWeight: 800, marginBottom: 12 }}><span style={{ background: "linear-gradient(135deg,#F59E0B,#EF4444)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Blog</span></h1>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 15 }}>WhatsApp otomasyon ve AI dünyasından güncel içerikler.</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[
              { title: "WhatsApp Chatbot ile Müşteri Memnuniyetini %40 Artırmanın Yolları", date: "12 Mart 2026", tag: "Rehber", color: "#F59E0B" },
              { title: "KOBİ'ler için WhatsApp Otomasyon Rehberi 2026", date: "10 Mart 2026", tag: "Strateji", color: "#10B981" },
              { title: "Restoran Sahipleri için Sipariş Otomasyonu", date: "8 Mart 2026", tag: "Sektörel", color: "#8B5CF6" },
              { title: "AI Asistan vs Manuel Müşteri Hizmetleri: Maliyet Karşılaştırması", date: "5 Mart 2026", tag: "Analiz", color: "#EC4899" },
            ].map(b => (
              <div key={b.title} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: 24, cursor: "pointer", transition: "all 0.3s" }} onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(245,158,11,0.3)"} onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"}>
                <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 10 }}>
                  <span style={{ background: `${b.color}15`, border: `1px solid ${b.color}30`, color: b.color, padding: "3px 10px", borderRadius: 6, fontSize: 11, fontWeight: 700 }}>{b.tag}</span>
                  <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 12 }}>{b.date}</span>
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 700, lineHeight: 1.5 }}>{b.title}</h3>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 32 }}>
            <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 13 }}>Daha fazla içerik yakında...</p>
          </div>
        </div>
      )}

      {page === "login" && !authUser && (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "calc(100vh - 60px)", padding: 24, position: "relative", zIndex: 1 }}>
          <div style={{ width: "100%", maxWidth: 400 }}>
            <div style={{ textAlign: "center", marginBottom: 36 }}>
              <div style={{ width: 52, height: 52, background: "linear-gradient(135deg,#F59E0B,#EF4444)", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, fontWeight: 800, color: "#fff", margin: "0 auto 14px" }}>A</div>
              <h2 style={{ fontSize: 24, margin: "0 0 6px" }}>{authMode === "login" ? "Giriş Yap" : "Kayıt Ol"}</h2>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, margin: 0 }}>{authMode === "login" ? "Botunuzu yönetmek için giriş yapın" : "Yeni hesap oluşturun"}</p>
            </div>
            {authError && <p style={{ color: "#EF4444", fontSize: 13, textAlign: "center", marginBottom: 14, background: "rgba(239,68,68,0.1)", padding: "10px 14px", borderRadius: 10, border: "1px solid rgba(239,68,68,0.2)" }}>{authError}</p>}
            {authMode === "register" && (
              <div style={{ marginBottom: 14 }}>
                <label style={lbl}>AD SOYAD</label>
                <input placeholder="Turhan Bağdat" value={authName} onChange={e => setAuthName(e.target.value)} style={inp} />
              </div>
            )}
            <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: 28 }}>
              <div style={{ marginBottom: 14 }}>
                <label style={lbl}>E-POSTA</label>
                <input type="email" placeholder="ornek@sirket.com" value={authEmail} onChange={e => setAuthEmail(e.target.value)} style={inp} />
              </div>
              <div style={{ marginBottom: 14 }}>
                <label style={lbl}>ŞİFRE</label>
                <input type="password" placeholder="••••••••" value={authPass} onChange={e => setAuthPass(e.target.value)} style={inp} />
              </div>
              {authMode === "register" && (
                <div style={{ marginBottom: 14 }}>
                  <label style={lbl}>TELEFON</label>
                  <input type="tel" placeholder="05XX XXX XX XX" value={authPhone} onChange={e => setAuthPhone(e.target.value)} style={inp} />
                </div>
              )}
              <button onClick={handleAuth} disabled={authLoading} style={{ width: "100%", padding: "13px 0", background: authLoading ? "rgba(245,158,11,0.5)" : "linear-gradient(135deg,#F59E0B,#D97706)", color: "#000", border: "none", borderRadius: 11, fontWeight: 700, fontSize: 14, cursor: authLoading ? "wait" : "pointer", marginBottom: 14 }}>{authLoading ? "Yükleniyor..." : (authMode === "login" ? "Giriş Yap" : "Kayıt Ol")}</button>
              <p style={{ textAlign: "center", color: "rgba(255,255,255,0.4)", fontSize: 13 }}>
                {authMode === "login" ? "Hesabınız yok mu? " : "Zaten hesabınız var mı? "}
                <button onClick={() => { setAuthMode(authMode === "login" ? "register" : "login"); setAuthError(""); }} style={{ background: "none", border: "none", color: "#F59E0B", cursor: "pointer", fontSize: 13, fontWeight: 700 }}>{authMode === "login" ? "Kayıt Ol" : "Giriş Yap"}</button>
              </p>
            </div>
          </div>
        </div>
      )}

      {(page === "login" || page === "dashboard") && authUser && (
        <div style={{ maxWidth: 1000, margin: "0 auto", padding: "40px 24px", position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
            <div>
              <h1 style={{ fontSize: 28, fontWeight: 800, margin: "0 0 4px" }}>Hoş geldiniz! 👋</h1>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14, margin: 0 }}>{authUser.email}</p>
            </div>
            <button onClick={() => { setAuthUser(null); setPage("home"); }} style={{ padding: "9px 18px", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 10, color: "#EF4444", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Çıkış Yap</button>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 32 }}>
            {[
              { label: "Toplam Mesaj", value: dashData.totalMessages, icon: "💬", color: "#F59E0B" },
              { label: "Bugün", value: dashData.todayMessages, icon: "📅", color: "#10B981" },
              { label: "Randevular", value: dashData.appointments, icon: "📋", color: "#8B5CF6" },
              { label: "Durum", value: "Aktif", icon: "✅", color: "#25D366" },
            ].map(s => (
              <div key={s.label} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: 20, textAlign: "center" }}>
                <div style={{ fontSize: 24, marginBottom: 8 }}>{s.icon}</div>
                <div style={{ fontSize: 22, fontWeight: 800, color: s.color }}>{s.value}</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>

          <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 20, padding: 24, marginBottom: 24 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, color: "#F59E0B" }}>Son Mesajlar</h3>
            {dashData.recentMessages.length === 0 ? (
              <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 13 }}>Henüz mesaj yok</p>
            ) : (
              dashData.recentMessages.map((m, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: i < dashData.recentMessages.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 600, margin: "0 0 4px" }}>{m.from_number}</p>
                    <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", margin: 0 }}>{m.body}</p>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <p style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", margin: "0 0 4px" }}>{new Date(m.created_at).toLocaleString("tr-TR")}</p>
                    <p style={{ fontSize: 12, color: "#10B981", margin: 0 }}>AI: {m.ai_response?.substring(0, 40)}...</p>
                  </div>
                </div>
              ))
            )}
          </div>

          <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 20, padding: 24 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, color: "#F59E0B" }}>Hesap Bilgileri</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div><span style={{ color: "rgba(255,255,255,0.35)", fontSize: 12 }}>E-posta</span><p style={{ fontSize: 14, margin: "4px 0 0" }}>{authUser.email}</p></div>
              <div><span style={{ color: "rgba(255,255,255,0.35)", fontSize: 12 }}>Plan</span><p style={{ fontSize: 14, margin: "4px 0 0", color: "#F59E0B" }}>Başlangıç (₺499/ay)</p></div>
              <div><span style={{ color: "rgba(255,255,255,0.35)", fontSize: 12 }}>Kayıt Tarihi</span><p style={{ fontSize: 14, margin: "4px 0 0" }}>{new Date(authUser.created_at).toLocaleDateString("tr-TR")}</p></div>
              <div><span style={{ color: "rgba(255,255,255,0.35)", fontSize: 12 }}>Durum</span><p style={{ fontSize: 14, margin: "4px 0 0", color: "#10B981" }}>Aktif</p></div>
            </div>
          </div>
        </div>
      )}

      {page === "privacy" && (
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "52px 24px", position: "relative", zIndex: 1 }}>
          <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 24 }}>{"KVKK Aydınlatma Metni & "}<span style={{ color: "#F59E0B" }}>{"Gizlilik Politikası"}</span></h1>
          <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 13, marginBottom: 32 }}>{"Son güncelleme: 14 Mart 2026"}</p>
          {[
            { title: "Veri Sorumlusu", content: "Asistania\nE-posta: info@asistania.com\nWeb: asistania.com" },
            { title: "Toplanan Kişisel Veriler", content: "• WhatsApp üzerinden: Telefon numarası, profil adı, mesaj içerikleri, mesaj zaman damgaları\n• Web sitesi üzerinden: IP adresi, tarayıcı bilgisi, çerez verileri\n• Kayıt/ödeme için: Ad-soyad, e-posta, telefon (ödeme bilgileri ödeme sağlayıcı tarafından işlenir, Asistania tarafından saklanmaz)" },
            { title: "Verilerin İşlenme Amacı", content: "• WhatsApp üzerinden AI destekli otomatik yanıt üretmek\n• CRM kaydı ve müşteri takibi\n• Randevu yönetimi\n• Hizmet kalitesi analitiği\n• Abonelik ve ödeme işlemlerini yürütmek" },
            { title: "Veri Aktarımı (3. Taraf Hizmetler)", content: "• OpenAI Inc. (ABD) — Mesaj içerikleri AI yanıt üretmek için işlenir. OpenAI, API verilerini model eğitiminde kullanmaz.\n• Hetzner Online GmbH (Almanya) — Sunucu altyapısı, GDPR uyumlu\n• Supabase Inc. (ABD) — CRM veritabanı ve kimlik doğrulama\n• Cloudflare Inc. (ABD) — DNS ve güvenlik hizmetleri\n• Vercel Inc. (ABD) — Web sitesi barındırma\n\n⚠️ Mesaj içerikleriniz ABD'deki sunuculara aktarılmaktadır. Hizmetimizi kullanarak bu yurt dışı veri aktarımına açık rıza göstermiş sayılırsınız." },
            { title: "Veri Saklama ve Silinme", content: "• Mesaj verileri: Abonelik süresi boyunca + iptal sonrası 30 gün içinde silinir\n• Hesap bilgileri: Hesap silinene kadar\n• Ödeme kayıtları: 5 yıl (yasal zorunluluk)\n• Çerez verileri: Maksimum 12 ay" },
            { title: "Veri Güvenliği", content: "• Tüm iletişim SSL/TLS (HTTPS) ile şifrelenir\n• Sunucular Almanya'da (Hetzner), GDPR uyumlu\n• Firewall ve rate limiting aktif\n• API anahtarları güçlü şifreleme ile korunur\n• Düzenli yedekleme yapılır" },
            { title: "Haklarınız (KVKK Madde 11)", content: "• Kişisel verilerinizin işlenip işlenmediğini öğrenme\n• İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme\n• Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme\n• Eksik veya yanlış işlenmişse düzeltilmesini isteme\n• Silinmesini veya yok edilmesini isteme\n• Otomatik analiz sonucu aleyhinize bir sonuç çıkmasına itiraz etme\n\nBaşvurular: info@asistania.com" },
            { title: "Çerez Politikası", content: "• Zorunlu çerezler: Sitenin çalışması için gerekli (onam gerekmez)\n• Analitik çerezler: Ziyaretçi istatistikleri (onayınıza bağlı)\n• Reklam çerezleri: Meta Pixel, TikTok Pixel (onayınıza bağlı)\n\nAnalitik ve reklam çerezleri, ancak onayınız alındıktan sonra çalıştırılır. Çerez tercihlerinizi istediğiniz zaman sayfanın altındaki 'Çerez Tercihleri' linkinden değiştirebilirsiniz." },
            { title: "Çocukların Gizliliği", content: "Hizmetimiz 18 yaşının altındaki bireylere yönelik değildir." },
          ].map(s => (
            <div key={s.title} style={{ marginBottom: 28 }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: "#F59E0B", marginBottom: 10 }}>{s.title}</h3>
              <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 14, lineHeight: 1.8, whiteSpace: "pre-line" }}>{s.content}</p>
            </div>
          ))}
        </div>
      )}

      {page === "terms" && (
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "52px 24px", position: "relative", zIndex: 1 }}>
          <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 24 }}>{"Kullanım "}<span style={{ color: "#F59E0B" }}>{"Koşulları"}</span></h1>
          <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 13, marginBottom: 32 }}>{"Son güncelleme: 14 Mart 2026"}</p>
          {[
            { title: "1. Hizmetin Niteliği", content: "Hizmet, ticari/mesleki amaçlarla işletmelere sunulan bir yazılım hizmetidir (SaaS). Kullanıcı, Hizmeti kendi ticari faaliyetleri kapsamında kullandığını kabul eder." },
            { title: "2. Abonelik Modeli ve Otomatik Yenileme", content: "Hizmet, aylık abonelik modeliyle sunulur. Abonelik, Kullanıcı tarafından iptal edilmediği sürece her fatura döneminde otomatik olarak yenilenir. Ücretler, ilgili fatura döneminin başında tahsil edilir." },
            { title: "3. Paketler, Mesaj Limitleri ve Kota Aşımı", content: "Paketler, fatura dönemi başına belirlenen mesaj limitleri ile sunulur. 'Mesaj', Hizmetin WhatsApp üzerinden Kullanıcı adına ürettiği ve gönderdiği her bir yanıttır.\n\nLimit aşılırsa Hizmet dönem sonuna kadar durdurulur veya kısıtlanır. Yeni fatura döneminde limitler yenilenir. Kullanıcı, aynı dönem içinde üst pakete geçerek Hizmeti yeniden aktif edebilir." },
            { title: "4. İptal, Dönem Sonu Geçerlilik ve İade", content: "Kullanıcı aboneliğini dilediği zaman iptal edebilir. İptal, içinde bulunulan fatura döneminin sonunda hüküm doğurur. Kısmi dönem iadesi yapılmaz; kullanılmayan süreler için ücret iadesi veya mahsup uygulanmaz.\n\nİptal sonrası verileriniz 30 gün içinde silinir." },
            { title: "5. Kullanıcı Sorumlulukları", content: "• WhatsApp hizmet koşullarına uymak\n• Spam, toplu mesaj veya istenmeyen ileti göndermemek\n• Yasadışı, müstehcen veya tehdit içeren içerik paylaşmamak\n• Asistanı yasadışı amaçlarla kullanmamak\n• Hesap bilgilerini üçüncü kişilerle paylaşmamak" },
            { title: "6. WhatsApp Bağlantısı (QR) ve Sorumluluklar", content: "Kullanıcı, Hizmete bağladığı WhatsApp/WhatsApp Business hesabı ve numarası üzerinde yetkili olduğunu kabul eder. QR ile eşleştirme, hesap güvenliği ve WhatsApp hesabının kullanımından doğan sorumluluk Kullanıcıya aittir.\n\nWhatsApp/Meta kaynaklı kesintiler, limitler, politika değişiklikleri veya yaptırımlar nedeniyle yaşanabilecek hizmet kısıtları Şirketin kontrolü dışındadır.\n\nÖnemli: Hizmetimiz WhatsApp Web QR bağlantısı kullanır. Resmi WhatsApp Business API (Meta Cloud API) kullanmamaktadır." },
            { title: "7. 3. Taraf Hizmetler ve AI Çıktıları", content: "Hizmet kapsamında yapay zeka, barındırma ve entegrasyon sağlayıcıları (OpenAI, Supabase, CRM servisleri) kullanılabilir; veriler yalnızca hizmetin sağlanması amacıyla işlenir/aktarılır.\n\nYapay zeka tarafından üretilen yanıtlar otomatik içeriktir; doğruluk/uygunluk garanti edilmez. Tıbbi, hukuki veya mali konularda profesyonel danışmanlık yerine geçmez. Kullanıcı, müşterilerine gönderilen içeriklerin nihai kontrol ve sorumluluğunun kendisine ait olduğunu kabul eder." },
            { title: "8. Sorumluluk Sınırı ve Dolaylı Zararlar", content: "Hizmet 'olduğu gibi' sunulur. Şirket; kesintisiz, hatasız veya belirli bir amaca tamamen uygun çalışma taahhüdünde bulunmaz.\n\nŞirket, hiçbir durumda dolaylı zararlardan (kar kaybı, itibar kaybı, iş kaybı, veri kaybı, beklenen tasarrufun gerçekleşmemesi, üçüncü kişi talepleri vb.) sorumlu tutulamaz.\n\nŞirketin toplam sorumluluğu, sorumluluğa konu olayın meydana geldiği tarihten önceki 1 (bir) aylık abonelik bedeli ile sınırlıdır." },
            { title: "9. SLA (Hizmet Seviyesi) — Yalnızca Kurumsal Paket", content: "SLA taahhüdü yalnızca Kurumsal paket için geçerlidir. SLA kapsamı; erişilebilirlik hedefi, ölçüm yöntemi, planlı bakım pencereleri, istisnalar ve telafi koşulları ayrı SLA dokümanında düzenlenir.\n\nSLA dışı durumlar: Planlı bakım, WhatsApp/Meta kaynaklı kesintiler, mücbir sebepler, Kullanıcı kaynaklı hatalar." },
            { title: "10. Uygulanacak Hukuk", content: "Bu koşullar Türkiye Cumhuriyeti kanunlarına tabidir. Uyuşmazlıklarda İstanbul Mahkemeleri ve İcra Daireleri yetkilidir." },
          ].map(s => (
            <div key={s.title} style={{ marginBottom: 28 }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: "#F59E0B", marginBottom: 10 }}>{s.title}</h3>
              <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 14, lineHeight: 1.8, whiteSpace: "pre-line" }}>{s.content}</p>
            </div>
          ))}
        </div>
      )}

      <footer style={{ padding: "32px 24px", borderTop: "1px solid rgba(255,255,255,0.04)", textAlign: "center", position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", justifyContent: "center", gap: 20, marginBottom: 14 }}>
          {NAV.map(n => <button key={n.id} onClick={() => setPage(n.id)} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.35)", fontSize: 13, cursor: "pointer" }}>{n.label}</button>)}
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap", marginBottom: 14 }}>
          <button onClick={() => setPage("privacy")} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.25)", fontSize: 12, cursor: "pointer" }}>{"KVKK & Gizlilik"}</button>
          <span style={{ color: "rgba(255,255,255,0.15)" }}>|</span>
          <button onClick={() => setPage("terms")} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.25)", fontSize: 12, cursor: "pointer" }}>{"Kullanım Koşulları"}</button>
          <span style={{ color: "rgba(255,255,255,0.15)" }}>|</span>
          <button onClick={() => { setCookieConsent(null); }} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.25)", fontSize: 12, cursor: "pointer" }}>{"Çerez Tercihleri"}</button>
          <span style={{ color: "rgba(255,255,255,0.15)" }}>|</span>
          <button onClick={() => setPage("contact")} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.25)", fontSize: 12, cursor: "pointer" }}>{"İletişim"}</button>
        </div>
        <p style={{ color: "rgba(255,255,255,0.2)", fontSize: 12, margin: 0 }}>{"© 2026 Asistania — WhatsApp AI Asistan | B2B SaaS Hizmeti"}</p>
      </footer>

      {selectedPlan && <Wizard plan={selectedPlan} onClose={() => setSelectedPlan(null)} />}

      {/* Cookie Consent Banner */}
      {!cookieConsent && (
        <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: "rgba(6,6,16,0.97)", backdropFilter: "blur(20px)", borderTop: "1px solid rgba(245,158,11,0.2)", padding: "20px 24px", zIndex: 1000, display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
          <div style={{ flex: 1, minWidth: 280 }}>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", margin: "0 0 6px", fontWeight: 600 }}>🍪 Çerez Bildirimi</p>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", margin: 0, lineHeight: 1.6 }}>
              Web sitemizde deneyiminizi iyileştirmek için çerezler kullanıyoruz. Zorunlu çerezler sitenin çalışması için gereklidir. Analitik ve reklam çerezleri ise tercihlerinize bağlıdır.{" "}
              <button onClick={() => setPage("privacy")} style={{ background: "none", border: "none", color: "#F59E0B", fontSize: 12, cursor: "pointer", padding: 0, textDecoration: "underline" }}>Gizlilik Politikası</button>
            </p>
          </div>
          <div style={{ display: "flex", gap: 10, flexShrink: 0 }}>
            <button onClick={() => acceptCookies("essential")} style={{ padding: "10px 18px", background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.7)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Sadece Zorunlu</button>
            <button onClick={() => acceptCookies("all")} style={{ padding: "10px 22px", background: "linear-gradient(135deg,#F59E0B,#D97706)", color: "#000", border: "none", borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Tümünü Kabul Et</button>
          </div>
        </div>
      )}

      {/* WhatsApp Floating Button */}
      <a href="https://wa.me/905327834244?text=Merhaba%2C%20bilgi%20almak%20istiyorum" target="_blank" rel="noopener noreferrer" style={{ position: "fixed", bottom: cookieConsent ? 24 : 100, right: 24, width: 60, height: 60, background: "linear-gradient(135deg,#25D366,#128C7E)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, color: "#fff", textDecoration: "none", boxShadow: "0 4px 20px rgba(37,211,102,0.4)", zIndex: 999, transition: "all 0.3s ease" }} onMouseEnter={e => e.currentTarget.style.transform = "scale(1.1)"} onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>💬</a>
    </div>
  );
}
