/// <reference types="vite/client" />

interface IconMap {
  [key: string]: string;
}

// Cache para evitar cargar el mismo módulo múltiples veces
let iconListCache: IconMap | null = null;

/**
 * Carga los iconos de forma lazy (bajo demanda)
 * Esto reduce el tamaño del bundle inicial en ~62KB
 */
export async function getCustomIcon(name: string): Promise<string | null> {
  // Si ya tenemos los iconos en cache, usarlos
  if (iconListCache) {
    return iconListCache[name] || iconListCache['error-icon'] || null;
  }

  try {
    // Importación dinámica - Vite automáticamente creará un chunk separado
    const { iconList } = await import('./IconSvgList.js');
    iconListCache = iconList;
    return iconList[name] || iconList['error-icon'] || null;
  } catch (error) {
    console.error('Error loading custom icons:', error);
    return null;
  }
}
