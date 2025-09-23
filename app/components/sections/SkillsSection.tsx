"use client";

import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionLayout, SectionTitleWrapper } from '../layout';
import { HeartNode } from '../ui/HeartNode';
import { SkillNode } from '../ui/SkillNode';
import { skillsData } from '../../constants/content';
import { calculateNodePositions, calculateContainerSize } from '../../lib/skillsLayout';

export function SkillsSection() {
  // Estado para el nodo seleccionado
  const [selectedNode, setSelectedNode] = React.useState<null | {
    id: string;
    title: string;
    description?: string;
    projects?: { title: string; description: string }[];
    tools?: string[];
  }>(null);
  // Estado para controlar el render del texto Explore
  const [showExploreText, setShowExploreText] = React.useState(true);

  // Cuando se selecciona un nodo, ocultar el texto Explore
  React.useEffect(() => {
    if (selectedNode) {
      setShowExploreText(false);
    } else {
      // Esperar la duración de la animación antes de mostrar el texto
      const timeout = setTimeout(() => setShowExploreText(true), 350);
      return () => clearTimeout(timeout);
    }
  }, [selectedNode]);
  // Calcular posiciones automáticamente con configuración fija
  const calculatedData = useMemo(() => {
    const config = {
      containerWidth: 800,
      containerHeight: 500,
      nodeSize: 75,
      minSpacing: 120,
      heartPosition: { x: 400, y: 250 }
    };
    const nodes = calculateNodePositions(skillsData.parentNodes, config);
    const containerSize = calculateContainerSize(nodes, config);
    return {
      nodes,
      containerSize,
      heartPosition: config.heartPosition
    };
  }, []);

  const calculatedNodes = calculatedData.nodes;
  const containerSize = calculatedData.containerSize;
  const heartPosition = calculatedData.heartPosition;


  // Función para generar todas las líneas de conexión (estáticas)
  const renderConnections = () => {
    const connections: React.ReactElement[] = [];
    const nodeRadius = 37.5;
    const connectionOffset = 25;
    calculatedNodes.forEach((parentNode) => {
      const heartCenter = { x: heartPosition.x + nodeRadius, y: heartPosition.y + nodeRadius };
      const parentCenter = { x: parentNode.position.x + nodeRadius, y: parentNode.position.y + nodeRadius };
      const dx = parentCenter.x - heartCenter.x;
      const dy = parentCenter.y - heartCenter.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance > 0) {
        const heartEdgeX = heartCenter.x + (dx / distance) * connectionOffset;
        const heartEdgeY = heartCenter.y + (dy / distance) * connectionOffset;
        const parentEdgeX = parentCenter.x - (dx / distance) * connectionOffset;
        const parentEdgeY = parentCenter.y - (dy / distance) * connectionOffset;
        connections.push(
          <line
            key={`heart-to-${parentNode.id}`}
            x1={heartEdgeX}
            y1={heartEdgeY}
            x2={parentEdgeX}
            y2={parentEdgeY}
            stroke="rgba(255, 255, 255, 0.6)"
            strokeWidth="2"
            strokeLinecap="round"
          />
        );
      }
      parentNode.children.forEach((childNode) => {
        const childCenter = { x: childNode.position.x + nodeRadius, y: childNode.position.y + nodeRadius };
        const childDx = childCenter.x - parentCenter.x;
        const childDy = childCenter.y - parentCenter.y;
        const childDistance = Math.sqrt(childDx * childDx + childDy * childDy);
        if (childDistance > 0) {
          const parentToChildEdgeX = parentCenter.x + (childDx / childDistance) * connectionOffset;
          const parentToChildEdgeY = parentCenter.y + (childDy / childDistance) * connectionOffset;
          const childFromParentEdgeX = childCenter.x - (childDx / childDistance) * connectionOffset;
          const childFromParentEdgeY = childCenter.y - (childDy / childDistance) * connectionOffset;
          connections.push(
            <line
              key={`${parentNode.id}-to-${childNode.id}`}
              x1={parentToChildEdgeX}
              y1={parentToChildEdgeY}
              x2={childFromParentEdgeX}
              y2={childFromParentEdgeY}
              stroke="rgba(255, 255, 255, 0.6)"
              strokeWidth="2"
              strokeLinecap="round"
            />
          );
        }
      });
    });
    return connections;
  };

  return (
    <SectionLayout
      id="skills"
      sectionName="Skills"
      className="bg-background/50 relative"
    >
      {/* Contenido principal */}
  <div className="flex-1 flex flex-col md:flex-row items-center justify-center gap-12 px-4 md:px-8">
        {/* Wrapper centrado vertical y horizontal */}
        <div className="flex flex-col md:flex-row items-center justify-center w-full">
          {/* Texto informativo a la izquierda */}
          {/* Si hay nodo seleccionado, mostrar el glass info. Si no, mostrar el texto Explore */}
          <AnimatePresence>
            {selectedNode && (
              <motion.div
                className="w-full md:w-[340px] min-w-[200px] max-w-[400px] md:mr-2 mb-6 md:mb-0 select-none"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                // No actualiza showExploreText aquí, lo gestiona el useEffect
              >
                <div className="rounded-2xl bg-white/10 border border-white/20 shadow-lg backdrop-blur-lg p-6 flex flex-col gap-4">
                  <h2 className="font-satoshi text-white font-bold text-[22px] leading-normal mb-1">{selectedNode.title}</h2>
                  {selectedNode.description && (
                    <p className="font-general text-white/80 text-[16px] font-normal leading-relaxed">{selectedNode.description}</p>
                  )}
                  {selectedNode.projects && selectedNode.projects.length > 0 && (
                    <div>
                      <div className="font-bold text-white text-[15px] mb-1 flex items-center gap-2"><span>🚀</span> Related Projects</div>
                      <ul className="list-disc ml-5">
                        {selectedNode.projects.map((proj, idx) => (
                          <li key={idx} className="text-white/80 text-[16px] mb-1 leading-relaxed"><span className="font-semibold">{proj.title}</span> – {proj.description}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {selectedNode.tools && selectedNode.tools.length > 0 && (
                    <div>
                      <div className="font-bold text-white text-[15px] mb-1 flex items-center gap-2"><span>🛠</span> Tools & Stack</div>
                      <div className="flex flex-wrap gap-2">
                        {selectedNode.tools.map((tool, idx) => (
                          <span key={idx} className="bg-white/20 text-white/90 px-2 py-1 rounded text-[14px] font-medium">{tool}</span>
                        ))}
                      </div>
                    </div>
                  )}
                  <button
                    className="mt-2 text-white/70 text-xs underline hover:text-white transition self-end cursor-pointer"
                    onClick={() => {
                      setShowExploreText(false);
                      setSelectedNode(null);
                    }}
                  >Back to Explore</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          {showExploreText && !selectedNode && (
            <div className="flex flex-col items-start justify-center w-full md:w-[340px] min-w-[200px] max-w-[400px] md:mr-2 mb-6 md:mb-0 select-none text-left">
              <h2
                className="font-satoshi text-white font-bold text-[24px] leading-normal mb-3"
              >
                Explore Diego’s Skills
              </h2>
              <p
                className="font-general text-white/75 text-[16px] font-normal leading-normal"
              >
                Click on each node to discover detailed explanations, related projects, and the tools behind them.
              </p>
            </div>
          )}
          {/* Gráfico de skills */}
          <div 
            className="relative flex items-center justify-center"
            style={{
              width: containerSize.width,
              height: containerSize.height
            }}
          >
            {/* Líneas de conexión */}
            <svg 
              className="absolute inset-0 pointer-events-none"
              width={containerSize.width}
              height={containerSize.height}
            >
              {renderConnections()}
            </svg>

            {/* Nodo central (corazón) */}
            <HeartNode 
              text={skillsData.centerNode}
              style={{
                position: 'absolute',
                left: heartPosition.x,
                top: heartPosition.y
              }}
            />
            {/* Nodos padre estáticos */}
            {calculatedNodes.map((parentNode) => (
              <SkillNode
                key={parentNode.id}
                title={parentNode.title}
                style={{
                  position: 'absolute',
                  left: parentNode.position.x,
                  top: parentNode.position.y
                }}
                onClick={() => setSelectedNode({
                  id: parentNode.id,
                  title: parentNode.title,
                  description: parentNode.description,
                  projects: parentNode.projects,
                  tools: parentNode.tools
                })}
              />
            ))}
            {/* Nodos hijo estáticos */}
            {calculatedNodes.map((parentNode) =>
              parentNode.children.map((childNode) => (
                <SkillNode
                  key={childNode.id}
                  title={childNode.title}
                  style={{
                    position: 'absolute',
                    left: childNode.position.x,
                    top: childNode.position.y
                  }}
                  onClick={() => setSelectedNode({
                    id: childNode.id,
                    title: childNode.title,
                    description: childNode.description,
                    projects: childNode.projects,
                    tools: childNode.tools
                  })}
                />
              ))
            )}
          </div>
        </div>
      </div>

      {/* Título en la esquina inferior izquierda */}
      <SectionTitleWrapper>Skills</SectionTitleWrapper>
    </SectionLayout>
  );
}