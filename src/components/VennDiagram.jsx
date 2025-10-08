import React, { useState, useEffect } from 'react'

const VennDiagram = ({ isExpanded, onCircleClick }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [hoveredCircle, setHoveredCircle] = useState(null)
  const [showImages, setShowImages] = useState(false)

  const transitionDurationMs = 500

  useEffect(() => {
    let timeoutId

    if (isExpanded || isHovered) {
      timeoutId = setTimeout(() => {
        setShowImages(true)
      }, transitionDurationMs)
    } else {
      setShowImages(false)
    }

    return () => clearTimeout(timeoutId)
  }, [isExpanded, isHovered])

  const isExpansionActive = isHovered || isExpanded

  // Adjusted circle positions for better centering and proper overlap in collapsed state
  const circles = {
    A: {
      cx: isExpansionActive ? 150 : 255,
      cy: isExpansionActive ? 120 : 220,
      r: 60,
      image: '/images/A.jpg',
    },
    B: {
      cx: isExpansionActive ? 450 : 345,
      cy: isExpansionActive ? 120 : 220,
      r: 60,
      image: 'images/B.jpg',
    },
    C: {
      cx: isExpansionActive ? 300 : 300,
      cy: isExpansionActive ? 400 : 300,
      r: 60,
      image: 'images/C.jpg',
    },
  }

  const centerX = isExpansionActive ? (150 + 450 + 300) / 3 : 300
  const centerY = isExpansionActive ? (120 + 120 + 400) / 3 : 240

  circles.Center = {
    cx: centerX,
    cy: centerY,
    r: 40,
    image: '/images/Center.jpg',
  }

  const arrows = [
    { from: 'A', to: 'B' },
    { from: 'C', to: 'B' },
    { from: 'A', to: 'C' },
    { from: 'Center', to: 'A', doubleHeaded: true },
    { from: 'Center', to: 'B', doubleHeaded: true },
    { from: 'Center', to: 'C', doubleHeaded: true },
  ]

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

  const Arrow = ({ from, to, doubleHeaded = false }) => {
    const fromCircle = circles[from]
    const toCircle = circles[to]
    const coords = calculateArrow(fromCircle, toCircle)

    if (!coords) return null

    const isCenterArrow = from === 'Center' || to === 'Center'
    const shouldShow = isExpansionActive

    const midX = (coords.startX + coords.endX) / 2
    const midY = (coords.startY + coords.endY) / 2
    const dx = coords.endX - coords.startX
    const dy = coords.endY - coords.startY
    const length = Math.sqrt(dx * dx + dy * dy)

    if (length === 0) return null

    const unitX = dx / length
    const unitY = dy / length
    let angle = Math.atan2(dy, dx) * (180 / Math.PI)

    if (angle > 90 || angle < -90) {
      angle = angle + 180
    }

    const perpX = -unitY * 15
    const perpY = unitX * 15

    const getArrowText = () => {
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
      viewBox="0 0 600 500"
      preserveAspectRatio="xMidYMid meet"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        setHoveredCircle(null)
      }}
      className="max-w-full h-auto"
    >
      <defs>
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

      <rect
        width="100%"
        height="100%"
        fill="white"
        rx="10"
        className="transition-all duration-300 ease-in-out"
      />

      {arrows.map((arrow, index) => (
        <Arrow
          key={index}
          from={arrow.from}
          to={arrow.to}
          doubleHeaded={arrow.doubleHeaded}
        />
      ))}

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
