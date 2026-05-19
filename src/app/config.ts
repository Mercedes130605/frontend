export interface AppConfig {
  apiUrl: string;
}

export let config: AppConfig = {
  apiUrl: 'https://cine-backend-i21f.onrender.com/api'
};

export function loadConfig(): Promise<void> {
  return new Promise((resolve) => {
    // Para desarrollo local
    if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
      config.apiUrl = 'http://localhost:3030';
    }
    console.log('🔧 API URL:', config.apiUrl);
    resolve();
  });
}