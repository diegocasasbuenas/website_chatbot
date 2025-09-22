"use client";

import React, { useMemo } from 'react';
import { SectionLayout, SectionTitleWrapper } from '../layout';
import { HeartNode } from '../ui/HeartNode';
import { SkillNode } from '../ui/SkillNode';
import { skillsData } from '../../constants/content';
import { calculateNodePositions, calculateContainerSize } from '../../lib/skillsLayout';

export function SkillsSection() {
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
      <div className="flex-1 flex items-center justify-center">
        <div 
          className="relative mx-auto"
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
              />
            ))
          )}
        </div>
      </div>

      {/* Título en la esquina inferior izquierda */}
      <SectionTitleWrapper>Skills</SectionTitleWrapper>
    </SectionLayout>
  );
}