export default function HelpPage() {
  return (
    <div className="min-h-screen bg-[#f9f8f5]">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="font-superscore-bold text-3xl text-[#1b1a1b] mb-4">Yardım Merkezi</h1>
          <p className="text-gray-600 mb-8">Superscore hakkında sorularınız mı var? Size yardımcı olmak için buradayız.</p>
          <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center">
            <p className="text-gray-500">Bu sayfa yakında güncellenecektir.</p>
            <p className="text-sm text-gray-400 mt-2">Destek için: destek@superscore.com.tr</p>
          </div>
        </div>
      </div>
    </div>
  );
}
