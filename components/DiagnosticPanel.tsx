'use client';

import { useEffect, useState } from 'react';
import { getMissingFiles, clearMissingFiles, type MissingFileError } from '@/lib/diagnostics';

export default function DiagnosticPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [missingFiles, setMissingFiles] = useState<MissingFileError[]>([]);

  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return;

    const interval = setInterval(() => {
      setMissingFiles(getMissingFiles());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return;

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'D') {
        setIsOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  if (process.env.NODE_ENV !== 'development') return null;

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 z-[9999] bg-red-600 text-white px-3 py-2 rounded-lg shadow-lg text-xs font-mono hover:bg-red-700 transition-colors"
        title="Ctrl+Shift+D to toggle"
      >
        🔍 Diagnostics {missingFiles.length > 0 && `(${missingFiles.length})`}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[10000] bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                Missing Files Diagnostic
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    clearMissingFiles();
                    setMissingFiles([]);
                  }}
                  className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                >
                  Clear
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-3 py-1 bg-gray-600 text-white rounded text-sm hover:bg-gray-700"
                >
                  Close
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-auto p-4">
              {missingFiles.length === 0 ? (
                <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                  ✅ No missing files detected
                </div>
              ) : (
                <div className="space-y-4">
                  {missingFiles.map((file, index) => (
                    <div
                      key={index}
                      className="border border-red-200 dark:border-red-900 rounded-lg p-4 bg-red-50 dark:bg-red-950"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="px-2 py-0.5 bg-red-600 text-white text-xs rounded font-mono">
                              {file.type}
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {new Date(file.timestamp).toLocaleTimeString()}
                            </span>
                          </div>
                          <div className="font-mono text-sm text-gray-900 dark:text-white break-all">
                            {file.path}
                          </div>
                          {file.context && (
                            <div className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                              Context: {file.context}
                            </div>
                          )}
                        </div>
                      </div>

                      {file.stackTrace && (
                        <details className="mt-2">
                          <summary className="text-xs text-gray-600 dark:text-gray-400 cursor-pointer hover:text-gray-900 dark:hover:text-white">
                            Stack Trace
                          </summary>
                          <pre className="mt-2 text-xs bg-gray-100 dark:bg-gray-800 p-2 rounded overflow-x-auto">
                            {file.stackTrace}
                          </pre>
                        </details>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="p-4 border-t border-gray-200 dark:border-gray-700 text-xs text-gray-600 dark:text-gray-400">
              <p>
                <strong>Tip:</strong> Press <kbd className="px-1 py-0.5 bg-gray-200 dark:bg-gray-700 rounded">Ctrl</kbd> +{' '}
                <kbd className="px-1 py-0.5 bg-gray-200 dark:bg-gray-700 rounded">Shift</kbd> +{' '}
                <kbd className="px-1 py-0.5 bg-gray-200 dark:bg-gray-700 rounded">D</kbd> to toggle this panel
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
