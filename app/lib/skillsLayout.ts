/**
 * Utilitarios para calcular posiciones automáticas de nodos en el gráfico de skills
 */

import { NodePosition } from '../types';

interface SkillNodeData {
  id: string;
  title: string;
  children?: SkillNodeData[];
}

interface CalculatedNode {
  id: string;
  title: string;
  position: NodePosition;
  children: CalculatedNode[];
}

interface LayoutConfig {
  containerWidth: number;
  containerHeight: number;
  nodeSize: number;
  minSpacing: number;
  heartPosition: NodePosition;
  baseRadius?: number;
}

const DEFAULT_CONFIG: LayoutConfig = {
  containerWidth: 800, // Más compacto
  containerHeight: 500, // Más compacto
  nodeSize: 75,
  minSpacing: 120, // Aumentar spacing para evitar solapamientos
  heartPosition: { x: 400, y: 250 } // Centro del contenedor más pequeño
};

/**
 * Calcula las posiciones automáticamente para todos los nodos
 */
export function calculateNodePositions(
  parentNodes: SkillNodeData[],
  config: Partial<LayoutConfig> = {}
): CalculatedNode[] {
  const layoutConfig = { ...DEFAULT_CONFIG, ...config };
  
  // Calcular posiciones de nodos padre distribuidos alrededor del corazón
  const parentPositions = calculateParentPositionsAroundHeart(
    parentNodes.length, 
    layoutConfig
  );
  
  // Array para mantener todas las posiciones ocupadas (padres + hijos ya colocados)
  const allOccupiedPositions: NodePosition[] = [...parentPositions];
  // También incluir la posición del corazón
  allOccupiedPositions.push(layoutConfig.heartPosition);
  
  return parentNodes.map((parentNode, index) => {
    const parentPosition = parentPositions[index];
    
    // Calcular posiciones de nodos hijo para este padre, considerando todas las posiciones ocupadas
    const childPositions = calculateChildPositionsAroundParent(
      parentNode.children || [],
      parentPosition,
      layoutConfig,
      allOccupiedPositions // Pasar todas las posiciones ocupadas hasta ahora
    );
    
    // Agregar las nuevas posiciones de hijos al array de posiciones ocupadas
    allOccupiedPositions.push(...childPositions);
    
    return {
      id: parentNode.id,
      title: parentNode.title,
      position: parentPosition,
      children: (parentNode.children || []).map((child, childIndex) => ({
        id: child.id,
        title: child.title,
        position: childPositions[childIndex] || { x: 0, y: 0 }, // Fallback position
        children: []
      }))
    };
  });
}

/**
 * Calcula posiciones de nodos padre distribuidos alrededor del corazón
 */
function calculateParentPositionsAroundHeart(
  parentCount: number,
  config: LayoutConfig
): NodePosition[] {
  const positions: NodePosition[] = [];
  const radius = 180; // Radio más pequeño para nodos más cercanos
  
  if (parentCount === 1) {
    // Un solo nodo: a la derecha del corazón
    positions.push({
      x: config.heartPosition.x + radius,
      y: config.heartPosition.y
    });
  } else if (parentCount === 2) {
    // Dos nodos: derecha e izquierda
    positions.push(
      { x: config.heartPosition.x + radius, y: config.heartPosition.y },
      { x: config.heartPosition.x - radius, y: config.heartPosition.y }
    );
  } else if (parentCount === 3) {
    // Tres nodos: distribución uniforme en círculo
    const angles = [0, (2 * Math.PI) / 3, (4 * Math.PI) / 3]; // 0°, 120°, 240°
    angles.forEach(angle => {
      positions.push({
        x: config.heartPosition.x + Math.cos(angle) * radius,
        y: config.heartPosition.y + Math.sin(angle) * radius
      });
    });
  } else {
    // 4+ nodos: distribuir en círculo evitando la parte superior
    const startAngle = -Math.PI / 4; // -45 grados
    const endAngle = Math.PI + Math.PI / 4; // 225 grados
    const angleRange = endAngle - startAngle;
    
    for (let i = 0; i < parentCount; i++) {
      const angle = startAngle + (i * angleRange) / (parentCount - 1);
      const x = config.heartPosition.x + Math.cos(angle) * radius;
      const y = config.heartPosition.y + Math.sin(angle) * radius;
      positions.push({ x, y });
    }
  }
  
  return positions;
}

/**
 * Calcula posiciones de nodos hijo en 360 grados evitando el corazón y otros nodos
 */
function calculateChildPositionsAroundParent(
  children: SkillNodeData[],
  parentPosition: NodePosition,
  config: LayoutConfig,
  allOccupiedPositions: NodePosition[] = []
): NodePosition[] {
  const positions: NodePosition[] = [];
  
  if (children.length === 0) {
    return positions;
  }
  
  const heartPosition = config.heartPosition;
  const childRadius = 160; // Radio más pequeño para nodos hijo más cercanos
  const nodeSize = 75; // Tamaño de cada nodo
  const minDistance = nodeSize + 30; // Distancia mínima entre nodos (con más margen)
  
  // Calcular el ángulo hacia el corazón desde el padre
  const angleToHeart = Math.atan2(
    heartPosition.y - parentPosition.y,
    heartPosition.x - parentPosition.x
  );
  
  // Zona prohibida más amplia alrededor del corazón (±90 grados)
  const forbiddenZone = Math.PI / 2; // 90 grados en radianes
  
  // Calcular ángulos prohibidos por otros nodos (padres, corazón y otros hijos)
  const forbiddenAngles: { start: number; end: number }[] = [];
  
  // Agregar zona prohibida del corazón
  forbiddenAngles.push({
    start: angleToHeart - forbiddenZone / 2,
    end: angleToHeart + forbiddenZone / 2
  });
  
  // Agregar zonas prohibidas por TODOS los nodos ocupados (padres y otros hijos)
  allOccupiedPositions.forEach((occupiedPosition) => {
    if (occupiedPosition.x === parentPosition.x && occupiedPosition.y === parentPosition.y) return;
    
    const angleToOccupied = Math.atan2(
      occupiedPosition.y - parentPosition.y,
      occupiedPosition.x - parentPosition.x
    );
    
    // Zona prohibida de ±45 grados alrededor de cada nodo ocupado
    const occupiedForbiddenZone = Math.PI / 4; // 45 grados
    forbiddenAngles.push({
      start: angleToOccupied - occupiedForbiddenZone / 2,
      end: angleToOccupied + occupiedForbiddenZone / 2
    });
  });
  
  // Función para verificar si un ángulo está en zona prohibida
  const isAngleForbidden = (angle: number): boolean => {
    const normalizedAngle = ((angle % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
    
    return forbiddenAngles.some((forbidden) => {
      let start = ((forbidden.start % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
      let end = ((forbidden.end % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
      
      if (start <= end) {
        return normalizedAngle >= start && normalizedAngle <= end;
      } else {
        // La zona cruza el punto 0/2π
        return normalizedAngle >= start || normalizedAngle <= end;
      }
    });
  };
  
  // Función para verificar distancia a otros nodos
  const checkDistanceToOtherNodes = (testX: number, testY: number): number => {
    let minDistanceToOthers = Infinity;
    
    // Verificar distancia a todos los nodos ocupados
    allOccupiedPositions.forEach((occupiedPosition) => {
      const distance = Math.sqrt((testX - occupiedPosition.x) ** 2 + (testY - occupiedPosition.y) ** 2);
      minDistanceToOthers = Math.min(minDistanceToOthers, distance);
    });
    
    // Verificar distancia a nodos hijo ya colocados de este padre
    positions.forEach((existingChildPos) => {
      const distance = Math.sqrt((testX - existingChildPos.x) ** 2 + (testY - existingChildPos.y) ** 2);
      minDistanceToOthers = Math.min(minDistanceToOthers, distance);
    });
    
    return minDistanceToOthers;
  };
  
  // Generar posiciones para los nodos hijo
  const selectedAngles: number[] = [];
  const maxAttempts = 200; // Más intentos para encontrar mejores posiciones
  let attempts = 0;
  
  for (let i = 0; i < children.length && attempts < maxAttempts; i++) {
    let bestAngle = 0;
    let bestDistance = 0;
    
    // Probar múltiples ángulos para encontrar el mejor
    for (let testAngle = 0; testAngle < 2 * Math.PI; testAngle += Math.PI / 72) { // Cada 2.5 grados, más precisión
      if (isAngleForbidden(testAngle)) continue;
      
      // Calcular posición de prueba
      const testX = parentPosition.x + Math.cos(testAngle) * childRadius;
      const testY = parentPosition.y + Math.sin(testAngle) * childRadius;
      
      // Calcular la distancia mínima a otros nodos
      const minDistanceToOthers = checkDistanceToOtherNodes(testX, testY);
      
      // Preferir ángulos con mayor distancia a otros nodos
      if (minDistanceToOthers > bestDistance) {
        bestDistance = minDistanceToOthers;
        bestAngle = testAngle;
      }
    }
    
    // Si encontramos un ángulo válido, usarlo
    if (bestDistance >= minDistance || selectedAngles.length === 0) {
      selectedAngles.push(bestAngle);
    } else {
      // Si no podemos mantener la distancia mínima, usar el mejor disponible
      selectedAngles.push(bestAngle);
    }
    
    // Calcular y agregar la posición inmediatamente para que influya en los siguientes cálculos
    const x = parentPosition.x + Math.cos(bestAngle) * childRadius;
    const y = parentPosition.y + Math.sin(bestAngle) * childRadius;
    positions.push({ x, y });
    
    attempts++;
  }
  
  return positions;
}

/**
 * Calcula el tamaño óptimo del contenedor basado en las posiciones de los nodos
 */
export function calculateContainerSize(
  calculatedNodes: CalculatedNode[],
  config: Partial<LayoutConfig> = {}
): { width: number; height: number } {
  const layoutConfig = { ...DEFAULT_CONFIG, ...config };
  
  // Encontrar los límites de todos los nodos
  let maxX = layoutConfig.heartPosition.x + layoutConfig.nodeSize;
  let maxY = layoutConfig.heartPosition.y + layoutConfig.nodeSize;
  let minX = layoutConfig.heartPosition.x;
  let minY = layoutConfig.heartPosition.y;
  
  calculatedNodes.forEach(parent => {
    maxX = Math.max(maxX, parent.position.x + layoutConfig.nodeSize);
    maxY = Math.max(maxY, parent.position.y + layoutConfig.nodeSize);
    minX = Math.min(minX, parent.position.x);
    minY = Math.min(minY, parent.position.y);
    
    parent.children.forEach(child => {
      maxX = Math.max(maxX, child.position.x + layoutConfig.nodeSize);
      maxY = Math.max(maxY, child.position.y + layoutConfig.nodeSize);
      minX = Math.min(minX, child.position.x);
      minY = Math.min(minY, child.position.y);
    });
  });
  
  // Asegurar que no haya coordenadas negativas ajustando el offset
  const offsetX = Math.max(0, -minX + 100); // 100px de padding
  const offsetY = Math.max(0, -minY + 100); // 100px de padding
  
  // Aplicar offset a todas las posiciones si es necesario
  if (offsetX > 0 || offsetY > 0) {
    calculatedNodes.forEach(parent => {
      parent.position.x += offsetX;
      parent.position.y += offsetY;
      
      parent.children.forEach(child => {
        child.position.x += offsetX;
        child.position.y += offsetY;
      });
    });
    
    // También ajustar la posición del corazón
    layoutConfig.heartPosition.x += offsetX;
    layoutConfig.heartPosition.y += offsetY;
  }
  
  // Recalcular límites después del offset
  maxX += offsetX;
  maxY += offsetY;
  minX += offsetX;
  minY += offsetY;
  
  // Agregar padding final
  const padding = 100;
  return {
    width: maxX - minX + padding * 2,
    height: maxY - minY + padding * 2
  };
}