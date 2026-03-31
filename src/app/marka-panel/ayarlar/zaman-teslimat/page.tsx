'use client';

import { useState } from 'react';
import { Info, Lock } from 'lucide-react';
import Link from 'next/link';

/* ─── Helpers ─── */
function addDaysToToday(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toLocaleDateString('tr-TR', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

function addDaysLabel(n: number, unit: 'gün' | 'hafta'): string {
  const days = unit === 'hafta' ? n * 7 : n;
  return addDaysToToday(days);
}

/* ─── Small inline number+unit input ─── */
function NumberUnit({
  value,
  unit,
  onValue,
  onUnit,
  units,
  disabled,
}: {
  value: number;
  unit: string;
  onValue: (v: number) => void;
  onUnit: (v: string) => void;
  units: string[];
  disabled?: boolean;
}) {
  return (
    <span className="inline-flex items-center gap-1 mx-1">
      <input
        type="number"
        min={1}
        max={999}
        value={value}
        disabled={disabled}
        onChange={e => onValue(Math.max(1, Number(e.target.value)))}
        className="w-14 border border-gray-300 rounded-lg px-2 py-1 text-sm text-center focus:outline-none focus:ring-2 focus:ring-[#3c57bc]/30 disabled:bg-gray-100 disabled:text-gray-400"
      />
      <select
        value={unit}
        disabled={disabled}
        onChange={e => onUnit(e.target.value)}
        className="border border-gray-300 rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#3c57bc]/30 bg-white disabled:bg-gray-100 disabled:text-gray-400 appearance-none pr-6"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 6px center' }}
      >
        {units.map(u => <option key={u}>{u}</option>)}
      </select>
    </span>
  );
}

/* ─── Radio ─── */
function Radio({ checked, onChange, disabled }: { checked: boolean; onChange: () => void; disabled?: boolean }) {
  return (
    <button
      type="button"
      onClick={() => !disabled && onChange()}
      disabled={disabled}
      className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors mt-0.5
        ${checked ? 'border-[#3c57bc]' : 'border-gray-300'}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
    >
      {checked && <div className="w-2.5 h-2.5 rounded-full bg-[#3c57bc]" />}
    </button>
  );
}

/* ─── Checkbox ─── */
function Checkbox({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`w-5 h-5 rounded border-2 flex-shrink-0 flex items-center justify-center transition-colors mt-0.5
        ${checked ? 'bg-[#3c57bc] border-[#3c57bc]' : 'border-gray-300'}`}
    >
      {checked && (
        <svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="none">
          <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </button>
  );
}

/* ─── Divider ─── */
function Divider() {
  return <div className="border-t border-gray-200 my-0" />;
}

/* ─── Main Page ─── */
export default function ZamanTeslimatPage() {
  // Section 1 — delay
  const [delayType, setDelayType] = useState<'immediate' | 'delayed'>('delayed');
  const [delayValue, setDelayValue] = useState(1);
  const [delayUnit, setDelayUnit] = useState('hafta');

  // Section 2 — product invite timing
  const [productTiming, setProductTiming] = useState<'together' | 'separate'>('separate');
  const [productDelayValue, setProductDelayValue] = useState(5);
  const [productDelayUnit, setProductDelayUnit] = useState('günler');

  // Section 3 — preferred send time
  const [sendTimeType, setSendTimeType] = useState<'auto' | 'manual'>('auto');

  // Section 4 — frequency
  const [frequency, setFrequency] = useState<'every' | 'limited'>('every');
  const [freqValue, setFreqValue] = useState(1);
  const [freqUnit, setFreqUnit] = useState('gün');

  // Section 5 — reminder
  const [reminderEnabled, setReminderEnabled] = useState(true);
  const [reminderValue, setReminderValue] = useState(1);
  const [reminderUnit, setReminderUnit] = useState('hafta');

  const [saved, setSaved] = useState(false);

  function save() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  // Computed date labels
  const delayDays = delayUnit === 'hafta' ? delayValue * 7 : delayValue;
  const freqDays = freqUnit === 'gün' ? freqValue : freqUnit === 'hafta' ? freqValue * 7 : freqValue * 30;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex gap-6">

        {/* ─── Left: main form ─── */}
        <div className="flex-1 bg-white rounded-2xl border border-gray-200 overflow-hidden divide-y divide-gray-200">

          {/* ── Section 1: Ne zaman gönderelim ── */}
          <div className="px-6 py-6">
            <p className="text-sm font-medium text-[#1b1a1b] mb-4">
              Bir satın alma veya deneyim sonrasında ne zaman değerlendirme daveti göndermeliyiz?
            </p>
            <div className="space-y-3">

              {/* Hemen */}
              <label className="flex items-start gap-3 cursor-pointer">
                <Radio checked={delayType === 'immediate'} onChange={() => setDelayType('immediate')} />
                <span className="text-sm text-[#1b1a1b]">Hemen</span>
              </label>

              {/* Gecikmenin ardından */}
              <div>
                <label className="flex items-center gap-3 cursor-pointer flex-wrap">
                  <Radio checked={delayType === 'delayed'} onChange={() => setDelayType('delayed')} />
                  <span className="text-sm text-[#1b1a1b] flex items-center flex-wrap gap-1">
                    Gecikmenin ardından
                    <NumberUnit
                      value={delayValue}
                      unit={delayUnit}
                      onValue={setDelayValue}
                      onUnit={setDelayUnit}
                      units={['saat', 'gün', 'hafta']}
                      disabled={delayType !== 'delayed'}
                    />
                  </span>
                </label>
                {delayType === 'delayed' && (
                  <p className="text-xs text-gray-500 mt-2 ml-8">
                    Satın alma veya deneyim bugün gerçekleşmişse, değerlendirme daveti{' '}
                    <strong>{addDaysLabel(delayValue, delayUnit as 'gün' | 'hafta')}</strong> tarihinde gönderilecektir.
                  </p>
                )}
              </div>
            </div>
          </div>

          <Divider />

          {/* ── Section 2: Ürün inceleme daveti ── */}
          <div className="px-6 py-6">
            <div className="flex items-center gap-2 mb-4">
              <p className="text-sm font-medium text-[#1b1a1b]">
                Ürün inceleme davetini ne zaman göndermeliyiz?
              </p>
              <div className="relative group flex-shrink-0">
                <Info className="h-4 w-4 text-gray-400 cursor-help" />
                <div className="absolute left-6 top-0 z-10 hidden group-hover:block w-64 bg-[#1b1a1b] text-white text-xs rounded-xl px-3 py-2 leading-relaxed shadow-xl">
                  Ürün incelemeleri; belirli ürünler hakkındadır ve hizmet değerlendirmelerinden ayrı gönderilebilir.
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <label className="flex items-start gap-3 cursor-pointer">
                <Radio checked={productTiming === 'together'} onChange={() => setProductTiming('together')} />
                <span className="text-sm text-[#1b1a1b]">Hizmet değerlendirme davetiyle birlikte gönderin.</span>
              </label>

              <div>
                <label className="flex items-center gap-3 cursor-pointer flex-wrap">
                  <Radio checked={productTiming === 'separate'} onChange={() => setProductTiming('separate')} />
                  <span className="text-sm text-[#1b1a1b] flex items-center flex-wrap gap-1">
                    Ayrı bir davetiye olarak gönderin
                    <NumberUnit
                      value={productDelayValue}
                      unit={productDelayUnit}
                      onValue={setProductDelayValue}
                      onUnit={setProductDelayUnit}
                      units={['günler', 'haftalar']}
                      disabled={productTiming !== 'separate'}
                    />
                    hizmet değerlendirme davetinden sonra
                  </span>
                </label>
              </div>
            </div>

            <button className="text-sm text-[#3c57bc] hover:underline mt-3 inline-block">
              Ürün inceleme davetleri hakkında daha fazla bilgi edinin.
            </button>
          </div>

          <Divider />

          {/* ── Section 3: Ne zaman göndermek tercih edersiniz ── */}
          <div className="px-6 py-6">
            <p className="text-sm font-medium text-[#1b1a1b] mb-4">
              İnceleme davetiyelerini ne zaman göndermeyi tercih edersiniz?
            </p>

            <div className="space-y-3">
              {/* Auto */}
              <label className="flex items-start gap-3 cursor-pointer">
                <Radio checked={sendTimeType === 'auto'} onChange={() => setSendTimeType('auto')} />
                <div>
                  <p className="text-sm text-[#1b1a1b]">Zamanlamayı otomatik olarak optimize edin</p>
                  <p className="text-xs text-gray-500 mt-0.5">Superscore verilerine dayanarak en uygun zamanı otomatik olarak seçer.</p>
                </div>
              </label>

              {/* Manual — locked */}
              <div className="flex items-start gap-3">
                <Radio checked={sendTimeType === 'manual'} onChange={() => {}} disabled />
                <div className="flex-1">
                  <p className="text-sm text-gray-400">Tercih ettiğiniz zamanı seçin.</p>
                  <div className="mt-2 flex items-center gap-2 bg-[#f3f0ec] rounded-xl px-4 py-2.5">
                    <Lock className="h-3.5 w-3.5 text-gray-500 flex-shrink-0" />
                    <span className="text-sm text-gray-600">Sadece ücretli planlarda mevcuttur.</span>
                    <Link href="/marka-panel/abonelik" className="text-sm text-[#3c57bc] hover:underline ml-1">
                      Planları keşfedin
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Divider />

          {/* ── Section 4: Sıklık ── */}
          <div className="px-6 py-6">
            <p className="text-sm font-medium text-[#1b1a1b] mb-4">
              Değerlendirme davetiyeleri ne sıklıkla gönderilmelidir?
            </p>

            <div className="space-y-3">
              {/* Every purchase */}
              <label className="flex items-start gap-3 cursor-pointer">
                <Radio checked={frequency === 'every'} onChange={() => setFrequency('every')} />
                <span className="text-sm text-[#1b1a1b]">Her satın alma veya deneyimden sonra her müşteriyi davet edin.</span>
              </label>

              {/* Limited */}
              <div>
                <label className="flex items-center gap-3 cursor-pointer flex-wrap">
                  <Radio checked={frequency === 'limited'} onChange={() => setFrequency('limited')} />
                  <span className="text-sm text-[#1b1a1b] flex items-center flex-wrap gap-1">
                    Her müşteriyi en fazla bir kez davet edin.
                    <NumberUnit
                      value={freqValue}
                      unit={freqUnit}
                      onValue={setFreqValue}
                      onUnit={setFreqUnit}
                      units={['gün', 'hafta', 'ay']}
                      disabled={frequency !== 'limited'}
                    />
                  </span>
                </label>
                {frequency === 'limited' && (
                  <p className="text-xs text-gray-500 mt-2 ml-8">
                    Eğer bugün bir değerlendirme daveti gönderilirse, bir sonraki davet{' '}
                    <strong>{addDaysToToday(freqDays)}</strong> tarihine kadar gönderilmeyecektir.
                  </p>
                )}
              </div>
            </div>
          </div>

          <Divider />

          {/* ── Section 5: Hatırlatma ── */}
          <div className="px-6 py-6">
            <p className="text-sm font-medium text-[#1b1a1b] mb-4">
              İnceleme davetleri için hatırlatma göndermeli miyim?
            </p>

            <label className="flex items-start gap-3 cursor-pointer">
              <Checkbox checked={reminderEnabled} onChange={setReminderEnabled} />
              <span className="text-sm text-[#1b1a1b] flex items-center flex-wrap gap-1">
                Hatırlatma gönder
                <NumberUnit
                  value={reminderValue}
                  unit={reminderUnit}
                  onValue={setReminderValue}
                  onUnit={setReminderUnit}
                  units={['gün', 'hafta']}
                  disabled={!reminderEnabled}
                />
                İlk davetin ardından, herhangi bir yorum bırakılmazsa.
              </span>
            </label>

            {reminderEnabled && (
              <p className="text-sm text-gray-500 mt-3 ml-8 leading-relaxed">
                <button className="text-[#3c57bc] hover:underline">
                  Hatırlatma e-postasının önizlemesini görüntüleyin.
                </button>
                {' '}Tasarımı özelleştirmek için{' '}
                <Link href="/marka-panel/davetiyeler/eposta" className="text-[#3c57bc] hover:underline">
                  Yorumları Al &gt; E-posta şablonları bölümüne gidin.
                </Link>
              </p>
            )}
          </div>

          <Divider />

          {/* ── Save ── */}
          <div className="px-6 py-5">
            <button
              onClick={save}
              className="px-6 py-2.5 bg-gray-200 text-gray-500 text-sm font-medium rounded-xl transition-colors hover:bg-[#1b1a1b] hover:text-white"
            >
              {saved ? '✓ Değişiklikler kaydedildi' : 'Değişiklikleri kaydet'}
            </button>
          </div>
        </div>

        {/* ─── Right: info box ─── */}
        <div className="w-72 flex-shrink-0">
          <div className="bg-white rounded-2xl border border-gray-200 p-5">
            <div className="flex items-start gap-3 mb-3">
              {/* Paper plane icon */}
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-[#3c57bc]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                </svg>
              </div>
              <p className="text-sm font-semibold text-[#1b1a1b] leading-snug">Bilginiz olsun diye söylüyorum.</p>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed mb-3">
              Superscore, bir müşteri aynı referans numarası için daha önce yorum yazmaya davet edilmişse, daveti otomatik olarak iptal eder.
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">
              Lütfen, kısa süre içinde aynı kişiye çok sayıda davetiye gönderirseniz ayarların çalışmayacağını unutmayın.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
