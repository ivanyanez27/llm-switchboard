import { Loader2 } from 'lucide-react';
import { useComparisonStore } from '../store/comparison';

export function ResponseGrid() {
  const { responses, selectedProviders } = useComparisonStore();

  if (!responses.length) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {selectedProviders.map((provider) => {
        const response = responses.find((r) => r.provider === provider);
        
        return (
          <div
            key={provider}
            className="bg-white rounded-lg shadow-sm border p-4"
          >
            <h3 className="text-lg font-semibold capitalize mb-3">
              {provider}
            </h3>
            
            {response?.loading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="animate-spin" />
              </div>
            ) : response?.error ? (
              <p className="text-red-500">{response.error}</p>
            ) : (
              <p className="whitespace-pre-wrap">{response?.response}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}