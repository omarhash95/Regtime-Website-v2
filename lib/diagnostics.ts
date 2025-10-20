/**
 * Diagnostic utilities for tracking missing files and chunks during runtime
 */

export interface MissingFileError {
  type: 'chunk' | 'module' | 'asset' | 'import';
  path: string;
  timestamp: number;
  stackTrace?: string;
  context?: string;
}

const missingFiles: MissingFileError[] = [];

export function logMissingFile(
  type: MissingFileError['type'],
  path: string | undefined,
  context?: string
) {
  if (!path) {
    console.error(`[DIAGNOSTIC] Attempted to access file with undefined path`, {
      type,
      context,
      stack: new Error().stack,
    });

    missingFiles.push({
      type,
      path: 'undefined',
      timestamp: Date.now(),
      stackTrace: new Error().stack,
      context,
    });

    return;
  }

  console.error(`[DIAGNOSTIC] Missing file detected`, {
    type,
    path,
    context,
    stack: new Error().stack,
  });

  missingFiles.push({
    type,
    path,
    timestamp: Date.now(),
    stackTrace: new Error().stack,
    context,
  });
}

export function getMissingFiles(): MissingFileError[] {
  return [...missingFiles];
}

export function clearMissingFiles() {
  missingFiles.length = 0;
}

export function installGlobalErrorHandlers() {
  if (typeof window === 'undefined') return;

  const originalFetch = window.fetch;
  window.fetch = async function (...args) {
    try {
      const response = await originalFetch.apply(this, args);

      if (response.status === 404) {
        const url = typeof args[0] === 'string' ? args[0] : args[0]?.toString();

        if (url?.includes('/_next/static/') || url?.includes('.js') || url?.includes('.css')) {
          logMissingFile('asset', url, 'fetch-404');
        }
      }

      return response;
    } catch (error) {
      logMissingFile('asset', args[0]?.toString(), 'fetch-error');
      throw error;
    }
  };

  window.addEventListener('error', (event) => {
    const message = event.message || '';

    if (message.includes('Cannot find module') || message.includes('Failed to fetch')) {
      const match = message.match(/['"]([^'"]+)['"]/);
      if (match) {
        logMissingFile('module', match[1], 'window-error');
      }
    }
  });

  window.addEventListener('unhandledrejection', (event) => {
    const reason = event.reason?.message || event.reason?.toString() || '';

    if (reason.includes('Cannot find module') || reason.includes('Failed to fetch')) {
      const match = reason.match(/['"]([^'"]+)['"]/);
      if (match) {
        logMissingFile('module', match[1], 'unhandled-rejection');
      }
    }
  });
}

export function safeImport<T = any>(
  importFn: () => Promise<T>,
  fallback?: T,
  moduleName?: string
): Promise<T | undefined> {
  return importFn().catch((error) => {
    logMissingFile('import', moduleName || 'unknown', `dynamic-import-error: ${error.message}`);

    if (fallback !== undefined) {
      return fallback;
    }

    throw error;
  });
}

export function safeFileAccess(path: string | undefined, operation: string): string | null {
  if (!path || path === 'undefined' || path.trim() === '') {
    console.error(`[DIAGNOSTIC] Invalid path for operation: ${operation}`, {
      path,
      stack: new Error().stack,
    });
    return null;
  }

  return path;
}
