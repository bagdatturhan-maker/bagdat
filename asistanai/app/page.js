"use client";
import { useState, useEffect, useRef } from "react";

const PLANS = [
  { id: "starter", name: "Başlangıç", price: "₺499", period: "/ay", color: "#10B981", features: ["1 WhatsApp Bot", "500 mesaj/ay", "Hazır şablonlar", "E-posta desteği", "Temel analitik"], popular: false },
  { id: "professional", name: "Profesyonel", price: "₺1.299", period: "/ay", color: "#F59E0B", features: ["3 WhatsApp Bot", "5.000 mesaj/ay", "Özel senaryo", "CRM entegrasyonu", "Gelişmiş analitik", "Öncelikli destek"], popular: true },
  { id: "enterprise", name: "Kurumsal", price: "₺2.999", period: "/ay", color: "#8B5CF6", features: ["Sınırsız Bot", "Sınırsız mesaj", "Özel AI eğitimi", "API erişimi", "Dedicated yönetici", "SLA garantisi"], popular: false },
];

const SECTORS = [
  { id: "emlak", name: "Emlak", icon: "🏠", desc: "Lead takibi, randevu, portföy" },
  { id: "saglik", name: "Sağlık", icon: "🏥", desc: "Randevu, hatırlatma, bilgi" },
  { id: "egitim", name: "Eğitim", icon: "📚", desc: "Kayıt, program, bilgilendirme" },
  { id: "eticaret", name: "E-Ticaret", icon: "🛒", desc: "Sipariş takibi, ürün bilgisi" },
  { id: "restoran", name: "Restoran", icon: "🍽️", desc: "Rezervasyon, menü, sipariş" },
  { id: "otel", name: "Otel", icon: "🏨", desc: "Rezervasyon, concierge" },
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

  const NAV = [{ id: "home", label: "Ana Sayfa" }, { id: "reviews", label: "Referanslar" }, { id: "faq", label: "SSS" }];

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

      {page === "login" && (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "calc(100vh - 60px)", padding: 24, position: "relative", zIndex: 1 }}>
          <div style={{ width: "100%", maxWidth: 400 }}>
            <div style={{ textAlign: "center", marginBottom: 36 }}>
              <div style={{ width: 52, height: 52, background: "linear-gradient(135deg,#F59E0B,#EF4444)", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, fontWeight: 800, color: "#fff", margin: "0 auto 14px" }}>A</div>
              <h2 style={{ fontSize: 24, margin: "0 0 6px" }}>Müşteri Paneli</h2>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, margin: 0 }}>Botunuzu yönetmek için giriş yapın</p>
            </div>
            <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: 28 }}>
              {[["E-POSTA","email","ornek@sirket.com"],["ŞİFRE","password","••••••••"]].map(([l,t,p]) => (
                <div key={l} style={{ marginBottom: 14 }}>
                  <label style={lbl}>{l}</label>
                  <input type={t} placeholder={p} style={inp} />
                </div>
              ))}
              <div style={{ textAlign: "right", marginBottom: 22 }}>
                <a href="#" style={{ color: "#F59E0B", fontSize: 12, textDecoration: "none" }}>Şifremi unuttum</a>
              </div>
              <button style={{ width: "100%", padding: "13px 0", background: "linear-gradient(135deg,#F59E0B,#D97706)", color: "#000", border: "none", borderRadius: 11, fontWeight: 700, fontSize: 14, cursor: "pointer" }}>Giriş Yap</button>
            </div>
          </div>
        </div>
      )}

      <footer style={{ padding: "32px 24px", borderTop: "1px solid rgba(255,255,255,0.04)", textAlign: "center", position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", justifyContent: "center", gap: 20, marginBottom: 14 }}>
          {NAV.map(n => <button key={n.id} onClick={() => setPage(n.id)} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.35)", fontSize: 13, cursor: "pointer" }}>{n.label}</button>)}
        </div>
        <p style={{ color: "rgba(255,255,255,0.2)", fontSize: 12, margin: 0 }}>© 2026 AsistanAI — IA WhatsApp ile güçlendirilmiştir</p>
      </footer>

      {selectedPlan && <Wizard plan={selectedPlan} onClose={() => setSelectedPlan(null)} />}

      {/* WhatsApp Floating Button */}
      <a href="https://wa.me/905327834244?text=Merhaba%2C%20bilgi%20almak%20istiyorum" target="_blank" rel="noopener noreferrer" style={{ position: "fixed", bottom: 24, right: 24, width: 60, height: 60, background: "linear-gradient(135deg,#25D366,#128C7E)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, color: "#fff", textDecoration: "none", boxShadow: "0 4px 20px rgba(37,211,102,0.4)", zIndex: 999, transition: "transform 0.3s ease" }} onMouseEnter={e => e.currentTarget.style.transform = "scale(1.1)"} onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>💬</a>
    </div>
  );
}
