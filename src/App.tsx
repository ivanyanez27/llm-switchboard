import { MessageSquareCode } from 'lucide-react';
import { ProviderSelector } from './components/ProviderSelector';
import { PromptInput } from './components/PromptInput';
import { ResponseGrid } from './components/ResponseGrid';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-3">
          <MessageSquareCode size={32} className="text-blue-500" />
          <h1 className="text-xl font-semibold">LLM Comparison Tool</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        <section>
          <h2 className="text-lg font-medium mb-4">Select Providers</h2>
          <ProviderSelector />
        </section>

        <section>
          <h2 className="text-lg font-medium mb-4">Enter Prompt</h2>
          <PromptInput />
        </section>

        <section>
          <ResponseGrid />
        </section>
      </main>
    </div>
  );
}

export default App;