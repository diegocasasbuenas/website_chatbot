"use client";

import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionLayout, SectionTitleWrapper } from '../layout';
import { HeartNode } from '../ui/HeartNode';
import { SkillNode } from '../ui/SkillNode';
import { GlassCard } from '../ui/GlassCard';
import { skillsData } from '../../constants/content';
import { calculateNodePositions, calculateContainerSize } from '../../lib/skillsLayout';
import { useWindowSize } from '@/hooks/useWindowSize';

export function SkillsSection() {
  // Estado para el nodo seleccionado
  const [selectedNode, setSelectedNode] = React.useState<null | {
    id: string;
    title: string;
    description?: string;
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
  const { width: viewportWidth, height: viewportHeight } = useWindowSize();

  const graphMetrics = useMemo(() => {
    const mobileLayout = viewportWidth > 0 ? viewportWidth < 768 : false;
    const stackedLayout = !mobileLayout && viewportWidth > 0 && viewportWidth < 1300;

    const baseWidth = viewportWidth >= 1300 ? 940 : 860;
    const baseHeight = viewportWidth >= 1300 ? 650 : 600;
    const baseNodeSize = viewportWidth >= 1300 ? 84 : 78;

    const horizontalAllowance = viewportWidth >= 1300
      ? (stackedLayout ? Math.max(520, viewportWidth * 0.32) : 260)
      : viewportWidth >= 768
        ? 220
        : 90;

    const verticalAllowance = mobileLayout ? 260 : 210;

    const reservedWidth = viewportWidth > 0
      ? Math.max(viewportWidth - horizontalAllowance, baseWidth * 0.7)
      : baseWidth;

    const reservedHeight = viewportHeight > 0
      ? Math.max(viewportHeight - verticalAllowance, baseHeight * 0.7)
      : baseHeight;

    const widthFactor = reservedWidth / baseWidth;
    const heightFactor = reservedHeight / baseHeight;
    let scale = Math.max(0.7, Math.min(Math.min(widthFactor, heightFactor), viewportWidth >= 1600 ? 1.35 : 1.25));

    let nodeSize = baseNodeSize * scale;
    let childNodeSize = nodeSize * 0.78;
    let containerWidth = baseWidth * scale;
    let containerHeight = baseHeight * scale;
    let parentRadius = (viewportWidth >= 1300 ? 245 : 220) * scale;
    let childRadius = (viewportWidth >= 1300 ? 198 : 180) * scale;

    const config = {
      containerWidth,
      containerHeight,
      nodeSize,
      minSpacing: 110 * scale,
      heartPosition: { x: (containerWidth - nodeSize) / 2, y: (containerHeight - nodeSize) / 2 },
      parentRadius,
      childRadius,
    };

    const nodes = calculateNodePositions(skillsData.parentNodes, config);
    const containerSize = calculateContainerSize(nodes, config);

    const availableWidth = Math.max(reservedWidth, stackedLayout ? 520 : 420);
    const availableHeight = Math.max(reservedHeight, 420);

    let adjustment = 1;
    if (containerSize.width > availableWidth) {
      adjustment = Math.min(adjustment, availableWidth / containerSize.width);
    }
    if (containerSize.height > availableHeight) {
      adjustment = Math.min(adjustment, availableHeight / containerSize.height);
    }

    let adjustedNodes = nodes;
    let adjustedContainer = containerSize;
    let adjustedHeart = {
      x: (containerSize.width - nodeSize) / 2,
      y: (containerSize.height - nodeSize) / 2,
    };

    if (adjustment < 1) {
      const scalePositions = (value: number) => value * adjustment;
      adjustedNodes = nodes.map((parent) => ({
        ...parent,
        position: {
          x: scalePositions(parent.position.x),
          y: scalePositions(parent.position.y),
        },
        children: parent.children.map((child) => ({
          ...child,
          position: {
            x: scalePositions(child.position.x),
            y: scalePositions(child.position.y),
          },
        })),
      }));

      adjustedContainer = {
        width: containerSize.width * adjustment,
        height: containerSize.height * adjustment,
      };

      nodeSize *= adjustment;
      childNodeSize *= adjustment;
      parentRadius *= adjustment;
      childRadius *= adjustment;
      scale *= adjustment;

      adjustedHeart = {
        x: (adjustedContainer.width - nodeSize) / 2,
        y: (adjustedContainer.height - nodeSize) / 2,
      };
    } else {
      adjustedHeart = {
        x: (containerSize.width - nodeSize) / 2,
        y: (containerSize.height - nodeSize) / 2,
      };
    }

    return {
      nodes: adjustedNodes,
      containerSize: adjustedContainer,
      heartPosition: adjustedHeart,
      nodeSize,
      childNodeSize,
      scale,
      isStackedLayout: stackedLayout,
      isMobile: mobileLayout,
    };
  }, [viewportWidth, viewportHeight]);

  const { isMobile, isStackedLayout } = graphMetrics;

  const calculatedNodes = graphMetrics.nodes;
  const containerSize = graphMetrics.containerSize;
  const heartPosition = graphMetrics.heartPosition;
  const parentNodeSize = graphMetrics.nodeSize;
  const childNodeSize = graphMetrics.childNodeSize;
  const connectionStroke = Math.max(1.5 * graphMetrics.scale, 1);

  const layoutWrapperClass = [
    'flex-1 flex flex-col items-center justify-center gap-12 px-4 md:px-8',
    !isStackedLayout ? 'xl:flex-row xl:items-center' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const contentWrapperClass = [
    'flex flex-col items-center justify-center w-full gap-10',
    !isStackedLayout ? 'xl:flex-row xl:items-center xl:justify-center' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const infoPanelClass = [
    'flex flex-col items-start justify-center w-full min-w-[200px] max-w-[400px] mb-6 select-none text-left self-center',
    !isStackedLayout ? 'xl:w-[340px] xl:mr-4 xl:mb-0' : '',
  ]
    .filter(Boolean)
    .join(' ');

  if (isMobile) {
    return (
      <SectionLayout
        id="skills"
        sectionName="Skills"
        className="bg-background/50 relative"
      >
        <div className="flex-1 flex flex-col gap-6 px-4 py-8">
          <GlassCard padding="lg" hover={false} className="space-y-4">
            <h2 className="font-satoshi text-white text-2xl font-semibold leading-tight">
              Explore Diego’s Skills
            </h2>
            <p className="font-general text-white/80 text-base leading-relaxed">
              Discover the expertise behind Diego’s AI work. Tap each area to explore focus topics and the tools behind them.
            </p>
          </GlassCard>

          {skillsData.parentNodes.map((parentNode) => (
            <GlassCard key={parentNode.id} padding="lg" className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-satoshi text-white text-xl font-semibold leading-tight">
                  {parentNode.title}
                </h3>
                {parentNode.description && (
                  <p className="font-general text-white/80 text-sm leading-relaxed">
                    {parentNode.description}
                  </p>
                )}
              </div>

              {parentNode.tools && parentNode.tools.length > 0 && (
                <div className="space-y-2">
                  <p className="font-general text-white/70 text-xs uppercase tracking-wide">
                    Tools & Stack
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {parentNode.tools.map((tool) => (
                      <span
                        key={tool}
                        className="bg-white/15 text-white/90 px-2 py-1 rounded-full text-xs font-medium"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {parentNode.children && parentNode.children.length > 0 && (
                <div className="space-y-2">
                  <p className="font-general text-white/70 text-xs uppercase tracking-wide">
                    Specialties
                  </p>
                  <div className="space-y-3">
                    {parentNode.children.map((childNode) => (
                      <div
                        key={childNode.id}
                        className="rounded-xl bg-white/10 border border-white/20 p-3"
                      >
                        <h4 className="font-satoshi text-white text-base font-semibold">
                          {childNode.title}
                        </h4>
                        {childNode.description && (
                          <p className="font-general text-white/80 text-sm leading-relaxed mt-1">
                            {childNode.description}
                          </p>
                        )}
                        {childNode.tools && childNode.tools.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {childNode.tools.map((tool) => (
                              <span
                                key={tool}
                                className="bg-white/15 text-white/85 px-2 py-0.5 rounded-full text-xs"
                              >
                                {tool}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </GlassCard>
          ))}
        </div>

        <SectionTitleWrapper>Skills</SectionTitleWrapper>
      </SectionLayout>
    );
  }


  // Función para generar todas las líneas de conexión (estáticas)
  const renderConnections = () => {
    const connections: React.ReactElement[] = [];
    const nodeRadius = parentNodeSize / 2;
    const connectionOffset = nodeRadius * 0.6;
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
              strokeWidth={connectionStroke}
              strokeLinecap="round"
            />
          );
      }
      parentNode.children.forEach((childNode) => {
        const childRadius = childNodeSize / 2;
        const childCenter = { x: childNode.position.x + childRadius, y: childNode.position.y + childRadius };
        const childDx = childCenter.x - parentCenter.x;
        const childDy = childCenter.y - parentCenter.y;
        const childDistance = Math.sqrt(childDx * childDx + childDy * childDy);
        if (childDistance > 0) {
          const parentToChildEdgeX = parentCenter.x + (childDx / childDistance) * connectionOffset;
          const parentToChildEdgeY = parentCenter.y + (childDy / childDistance) * connectionOffset;
          const childConnectionOffset = childRadius * 0.55;
          const childFromParentEdgeX = childCenter.x - (childDx / childDistance) * childConnectionOffset;
          const childFromParentEdgeY = childCenter.y - (childDy / childDistance) * childConnectionOffset;
          connections.push(
            <line
              key={`${parentNode.id}-to-${childNode.id}`}
              x1={parentToChildEdgeX}
              y1={parentToChildEdgeY}
              x2={childFromParentEdgeX}
              y2={childFromParentEdgeY}
              stroke="rgba(255, 255, 255, 0.6)"
              strokeWidth={connectionStroke * 0.9}
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
  <div className={layoutWrapperClass}>
        {/* Wrapper centrado vertical y horizontal */}
        <div className={contentWrapperClass}>
          {/* Texto informativo a la izquierda */}
          {/* Si hay nodo seleccionado, mostrar el glass info. Si no, mostrar el texto Explore */}
          <AnimatePresence>
            {selectedNode && (
              <motion.div
                className={infoPanelClass}
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
            <div className={infoPanelClass}>
              <h2
                className="font-satoshi text-white font-bold text-[24px] leading-normal mb-3"
              >
                Explore Diego’s Skills
              </h2>
              <p
                className="font-general text-white/75 text-[16px] font-normal leading-normal"
              >
                Click on each node to discover detailed explanations and the tools behind them.
              </p>
            </div>
          )}
          {/* Gráfico de skills */}
          <div 
            className="relative flex items-center justify-center shrink-0 self-center"
            style={{
              width: containerSize.width,
              height: containerSize.height,
              maxWidth: '100%',
              overflow: 'visible'
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
              size={parentNodeSize * 1.05}
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
                size={parentNodeSize}
                style={{
                  position: 'absolute',
                  left: parentNode.position.x,
                  top: parentNode.position.y
                }}
                onClick={() => setSelectedNode({
                  id: parentNode.id,
                  title: parentNode.title,
                  description: parentNode.description,
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
                  size={childNodeSize}
                  style={{
                    position: 'absolute',
                    left: childNode.position.x,
                    top: childNode.position.y
                  }}
                  onClick={() => setSelectedNode({
                    id: childNode.id,
                    title: childNode.title,
                    description: childNode.description,
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
