import React, { useState, useEffect } from 'react'

// The component now accepts an 'isExpanded' prop from its parent
const VennDiagram = ({ isExpanded, onCircleClick }) => {
  // We keep the internal state for hover effects
  const [isHovered, setIsHovered] = useState(false)
  const [hoveredCircle, setHoveredCircle] = useState(null)
  // New state to control image visibility with a delay
  const [showImages, setShowImages] = useState(false)

  // Define the transition duration to use in the timeout
  const transitionDurationMs = 500 // Matches the circle's transition duration

  // Use useEffect to add a delay to the image visibility
  useEffect(() => {
    let timeoutId

    if (isExpanded || isHovered) {
      // Set a timeout to show images after the circle transition completes
      timeoutId = setTimeout(() => {
        setShowImages(true)
      }, transitionDurationMs)
    } else {
      // Immediately hide images when the diagram collapses
      setShowImages(false)
    }

    // Cleanup the timeout if the state changes before it fires
    return () => clearTimeout(timeoutId)
  }, [isExpanded, isHovered])

  // Check if expansion is active (hover or prop-based)
  const isExpansionActive = isHovered || isExpanded

  // Circle definitions - positions now depend on expansion state (increased distances)
  const circles = {
    A: {
      cx: isExpansionActive ? 120 : 260,
      cy: isExpansionActive ? 100 : 200,
      r: 60,
      image: '/images/A.jpg',
    },
    B: {
      cx: isExpansionActive ? 480 : 360,
      cy: isExpansionActive ? 100 : 200,
      r: 60,
      image: 'images/B.jpg',
    },
    C: {
      cx: isExpansionActive ? 300 : 310,
      cy: isExpansionActive ? 400 : 280,
      r: 60,
      image: 'images/C.jpg',
    },
  }

  // Calculate center position based on the triangle formed by A, B, C
  const centerX = isExpansionActive ? (120 + 480 + 300) / 3 : 300 // = 300 when expanded
  const centerY = isExpansionActive ? (100 + 100 + 400) / 3 : 190 // ≈ 190 when expanded

  // Add center circle
  circles.Center = {
    cx: centerX,
    cy: centerY,
    r: 40,
    image: '/images/Center.jpg',
  }

  // Arrow definitions - now includes double-headed arrows to center
  const arrows = [
    { from: 'A', to: 'B' },
    { from: 'C', to: 'B' },
    { from: 'A', to: 'C' },
    // Double-headed arrows between center and each outer circle
    { from: 'Center', to: 'A', doubleHeaded: true },
    { from: 'Center', to: 'B', doubleHeaded: true },
    { from: 'Center', to: 'C', doubleHeaded: true },
  ]

  // Function to calculate arrow coordinates
  const calculateArrow = (fromCircle, toCircle) => {
    const dx = toCircle.cx - fromCircle.cx
    const dy = toCircle.cy - fromCircle.cy
    const distance = Math.sqrt(dx * dx + dy * dy)

    if (distance === 0) return null

    const unitX = dx / distance
    const unitY = dy / distance

    const startX = fromCircle.cx + unitX * fromCircle.r
    const startY = fromCircle.cy + unitY * fromCircle.r
    const endX = toCircle.cx - unitX * toCircle.r
    const endY = toCircle.cy - unitY * toCircle.r

    return { startX, startY, endX, endY }
  }

  // Updated Arrow component with new text logic
  const Arrow = ({ from, to, doubleHeaded = false }) => {
    const fromCircle = circles[from]
    const toCircle = circles[to]
    const coords = calculateArrow(fromCircle, toCircle)

    if (!coords) return null

    // For arrows involving the center circle, only show when expanded or hovered
    const isCenterArrow = from === 'Center' || to === 'Center'
    const shouldShow = isExpansionActive

    // Calculate properties for text positioning
    const midX = (coords.startX + coords.endX) / 2
    const midY = (coords.startY + coords.endY) / 2
    const dx = coords.endX - coords.startX
    const dy = coords.endY - coords.startY
    const length = Math.sqrt(dx * dx + dy * dy)

    if (length === 0) return null

    const unitX = dx / length
    const unitY = dy / length
    // Calculate angle for text rotation (in degrees)
    let angle = Math.atan2(dy, dx) * (180 / Math.PI)

    // Adjust angle to prevent upside-down text
    if (angle > 90 || angle < -90) {
      angle = angle + 180
    }

    // Perpendicular vector for text offset
    const perpX = -unitY * 15
    const perpY = unitX * 15

    // Define text content for different arrow types
    const getArrowText = () => {
      // Text for arrows between A, B, C (outer circles)
      if (!isCenterArrow) {
        if ((from === 'A' && to === 'B') || (from === 'B' && to === 'A')) {
          return { top: null, bottom: 'Experimental Psychology' }
        }
        if ((from === 'A' && to === 'C') || (from === 'C' && to === 'A')) {
          return { top: 'Traditional Neuroscience', bottom: null }
        }
        if ((from === 'B' && to === 'C') || (from === 'C' && to === 'B')) {
          return { top: 'Traditional Neuroscience', bottom: null }
        }
      }

      // Text for arrows from A & B to center (only on top, aligned with arrow)
      if (
        (from === 'A' && to === 'Center') ||
        (from === 'Center' && to === 'A')
      ) {
        return { top: 'Mathematical', bottom: 'Psychology' }
      }
      if (
        (from === 'B' && to === 'Center') ||
        (from === 'Center' && to === 'B')
      ) {
        return { top: 'Psychology', bottom: 'Mathematical' }
      }

      // No text for arrows between center and C
      if (
        (from === 'C' && to === 'Center') ||
        (from === 'Center' && to === 'C')
      ) {
        return { top: null, bottom: null }
      }

      return { top: null, bottom: null }
    }

    const textContent = getArrowText()

    return (
      <g
        className="transition-all duration-900 ease-in-out"
        style={{ opacity: shouldShow ? 1 : 0 }}
      >
        <line
          x1={coords.startX}
          y1={coords.startY}
          x2={coords.endX}
          y2={coords.endY}
          stroke="black"
          strokeWidth="2"
          strokeDasharray="8,4"
          markerEnd="url(#arrowhead)"
          markerStart={doubleHeaded ? 'url(#arrowhead-start)' : ''}
        />

        {/* Top text */}
        {textContent.top && (
          <text
            x={midX + perpX}
            y={midY + perpY}
            fontSize="12"
            fill="black"
            textAnchor="middle"
            dominantBaseline="middle"
            className="font-semibold"
            transform={`rotate(${angle}, ${midX + perpX}, ${midY + perpY})`}
          >
            {textContent.top}
          </text>
        )}

        {/* Bottom text */}
        {textContent.bottom && (
          <text
            x={midX - perpX}
            y={midY - perpY}
            fontSize="12"
            fill="black"
            textAnchor="middle"
            dominantBaseline="middle"
            className="font-semibold"
            transform={`rotate(${angle}, ${midX - perpX}, ${midY - perpY})`}
          >
            {textContent.bottom}
          </text>
        )}

        {/* Center-aligned text for center arrows - positioned above the arrow */}
        {textContent.center && (
          <text
            x={midX}
            y={midY + perpY}
            fontSize="12"
            fill="black"
            textAnchor="middle"
            dominantBaseline="middle"
            className="font-semibold"
            transform={`rotate(${angle}, ${midX}, ${midY + perpY})`}
          >
            {textContent.center}
          </text>
        )}
      </g>
    )
  }

  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 600 600"
      // Keep hover handlers on the SVG to control hover-based expansion
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        setHoveredCircle(null)
      }}
    >
      <defs>
        {/* Regular arrowhead - smaller size */}
        <marker
          id="arrowhead"
          markerWidth="8"
          markerHeight="6"
          refX="7"
          refY="3"
          orient="auto"
        >
          <polygon points="0 0, 8 3, 0 6" fill="black" />
        </marker>

        {/* Arrowhead for the start of double-headed arrows - smaller size */}
        <marker
          id="arrowhead-start"
          markerWidth="8"
          markerHeight="6"
          refX="1"
          refY="3"
          orient="auto"
        >
          <polygon points="8 0, 0 3, 8 6" fill="black" />
        </marker>

        {/* Define a clipPath for each circle to crop the images */}
        <clipPath id="clipA">
          <circle cx={circles.A.cx} cy={circles.A.cy} r={circles.A.r} />
        </clipPath>
        <clipPath id="clipB">
          <circle cx={circles.B.cx} cy={circles.B.cy} r={circles.B.r} />
        </clipPath>
        <clipPath id="clipC">
          <circle cx={circles.C.cx} cy={circles.C.cy} r={circles.C.r} />
        </clipPath>
        <clipPath id="clipCenter">
          <circle
            cx={circles.Center.cx}
            cy={circles.Center.cy}
            r={circles.Center.r}
          />
        </clipPath>
      </defs>

      {/* Background */}
      <rect
        width="600"
        height="500"
        fill="white"
        rx="10"
        className="transition-all duration-300 ease-in-out"
      />

      {/* Render all arrows */}
      {arrows.map((arrow, index) => (
        <Arrow
          key={index}
          from={arrow.from}
          to={arrow.to}
          doubleHeaded={arrow.doubleHeaded}
        />
      ))}

      {/* Images for original circles A, B, C */}
      <image
        href={circles.A.image}
        x={circles.A.cx - circles.A.r}
        y={circles.A.cy - circles.A.r}
        height={circles.A.r * 2}
        width={circles.A.r * 2}
        className="transition-all duration-900 ease-in-out"
        style={{
          opacity: showImages ? 1 : 0,
        }}
        clipPath="url(#clipA)"
      />
      <image
        href={circles.B.image}
        x={circles.B.cx - circles.B.r}
        y={circles.B.cy - circles.B.r}
        height={circles.B.r * 2}
        width={circles.B.r * 2}
        className="transition-all duration-900 ease-in-out"
        style={{
          opacity: showImages ? 1 : 0,
        }}
        clipPath="url(#clipB)"
      />
      <image
        href={circles.C.image}
        x={circles.C.cx - circles.C.r}
        y={circles.C.cy - circles.C.r}
        height={circles.C.r * 2}
        width={circles.C.r * 2}
        className="transition-all duration-900 ease-in-out"
        style={{
          opacity: showImages ? 1 : 0,
        }}
        clipPath="url(#clipC)"
      />

      {/* Image for center circle - only shows when expanded or hovered */}
      <image
        href={circles.Center.image}
        x={circles.Center.cx - circles.Center.r}
        y={circles.Center.cy - circles.Center.r}
        height={circles.Center.r * 2}
        width={circles.Center.r * 2}
        className="transition-all duration-900 ease-in-out"
        style={{
          opacity: showImages && isExpansionActive ? 1 : 0,
        }}
        clipPath="url(#clipCenter)"
      />

      {/* Original circles A, B, C */}
      {['A', 'B', 'C'].map((circleId) => (
        <circle
          key={circleId}
          cx={circles[circleId].cx}
          cy={circles[circleId].cy}
          r="60"
          fill="transparent"
          stroke="black"
          strokeWidth="2"
          className="transition-all duration-700 ease-in-out cursor-pointer"
          onMouseEnter={() => setHoveredCircle(circleId)}
          onMouseLeave={() => setHoveredCircle(null)}
          onClick={(e) => {
            e.stopPropagation()
            onCircleClick && onCircleClick(circleId)
          }}
          style={{ pointerEvents: isExpansionActive ? 'auto' : 'none' }}
        />
      ))}

      {/* Center circle - only visible when expanded or hovered */}
      <circle
        cx={circles.Center.cx}
        cy={circles.Center.cy}
        r={circles.Center.r}
        fill="rgba(255, 255, 255, 0.1)"
        stroke="black"
        strokeWidth="0.1"
        className="transition-all duration-700 ease-in-out cursor-pointer"
        onMouseEnter={() => setHoveredCircle('Center')}
        onMouseLeave={() => setHoveredCircle(null)}
        onClick={(e) => {
          e.stopPropagation()
          onCircleClick && onCircleClick('Center')
        }}
        style={{
          opacity: isExpansionActive ? 1 : 0,
          pointerEvents: isExpansionActive ? 'auto' : 'none',
        }}
      />
    </svg>
  )
}

export default VennDiagram
