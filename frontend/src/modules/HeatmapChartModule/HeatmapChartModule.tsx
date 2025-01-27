import { FC, memo, useRef, useEffect, useState } from 'react'
import { HeatmapData } from '@/models/Heatmap'
import {
  getColorScale,
  HEATMAP_COLORS,
  DEFAULT_CONFIG,
  calculateDimensions,
} from './HeatmapChartConfig'
import {
  ContainerBody,
  ContainerComponent,
} from '@/components/ContainerComponent/ContainerComponent'

interface PDHeatmapProps {
  data: HeatmapData
  title?: string
}

const HeatmapChartModule: FC<PDHeatmapProps> = ({
  data,
  title = 'Тепловая карта',
}) => {
  const { categories, periods, values } = data
  const containerRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [cellWidth, setCellWidth] = useState(70)
  const [wrapperWidth, setWrapperWidth] = useState(0)

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current && wrapperRef.current) {
        const wrapperWidth = wrapperRef.current.offsetWidth
        setWrapperWidth(wrapperWidth)

        const newCellWidth = calculateDimensions(
          wrapperWidth - 80, // Учитываем padding (40px с каждой стороны)
          periods.length,
          DEFAULT_CONFIG
        )
        setCellWidth(newCellWidth)
      }
    }

    // Используем ResizeObserver для отслеживания изменений размера контейнера
    const resizeObserver = new ResizeObserver(updateDimensions)
    if (wrapperRef.current) {
      resizeObserver.observe(wrapperRef.current)
    }

    return () => {
      resizeObserver.disconnect()
    }
  }, [periods.length])

  const totalHeight =
    DEFAULT_CONFIG.topMargin +
    categories.length * DEFAULT_CONFIG.cellHeight +
    DEFAULT_CONFIG.bottomAxisHeight

  const minWidth =
    DEFAULT_CONFIG.leftAxisWidth +
    periods.length * DEFAULT_CONFIG.minCellWidth +
    DEFAULT_CONFIG.rightLegendWidth

  const contentWidth = Math.max(
    minWidth,
    wrapperWidth - 80 // Учитываем padding
  )

  return (
    <ContainerComponent withBg={true} title={title}>
      <ContainerBody isScrolling={true} orientation="horizontal">
        <div ref={wrapperRef} className="w-full">
          <div className="px-10 py-5">
            <div
              ref={containerRef}
              className="relative mx-auto"
              style={{
                height: totalHeight,
                width: contentWidth,
              }}
            >
              {/* Category labels */}
              <div
                className="absolute left-0"
                style={{
                  top: DEFAULT_CONFIG.topMargin,
                  width: DEFAULT_CONFIG.leftAxisWidth,
                }}
              >
                {categories.map((category, index) => (
                  <div
                    key={`category-${index}`}
                    className="flex items-center pr-2.5 text-sm"
                    style={{ height: DEFAULT_CONFIG.cellHeight }}
                  >
                    {category}
                  </div>
                ))}
              </div>

              {/* Heatmap cells */}
              <div
                className="absolute"
                style={{
                  left: DEFAULT_CONFIG.leftAxisWidth,
                  top: DEFAULT_CONFIG.topMargin,
                }}
              >
                {categories.map((category, i) =>
                  periods.map((period, j) => (
                    <div
                      key={`cell-${i}-${j}`}
                      className="absolute flex items-center justify-center border border-white text-sm"
                      style={{
                        left: j * cellWidth,
                        top: i * DEFAULT_CONFIG.cellHeight,
                        width: cellWidth,
                        height: DEFAULT_CONFIG.cellHeight,
                        backgroundColor: getColorScale(values[i][j]),
                        color: values[i][j] > 50 ? 'white' : 'black',
                      }}
                      title={`${category} - ${period}: ${values[i][j]}%`}
                    >
                      {values[i][j].toFixed(1)}%
                    </div>
                  ))
                )}
              </div>

              {/* Period labels */}
              <div
                className="absolute flex"
                style={{
                  left: DEFAULT_CONFIG.leftAxisWidth,
                  top:
                    DEFAULT_CONFIG.topMargin +
                    categories.length * DEFAULT_CONFIG.cellHeight,
                }}
              >
                {periods.map((period, index) => (
                  <div
                    key={`period-${index}`}
                    className="flex items-start justify-center p-2.5 text-center text-sm"
                    style={{
                      width: cellWidth,
                      height: DEFAULT_CONFIG.bottomAxisHeight,
                    }}
                  >
                    {period}
                  </div>
                ))}
              </div>

              {/* Color scale legend */}
              <div
                className="absolute right-0"
                style={{
                  top: DEFAULT_CONFIG.topMargin,
                  width: DEFAULT_CONFIG.rightLegendWidth,
                  height: categories.length * DEFAULT_CONFIG.cellHeight,
                }}
              >
                <div
                  className="relative ml-5"
                  style={{
                    width: 20,
                    height: '100%',
                    background: `linear-gradient(to bottom, ${HEATMAP_COLORS.max}, ${HEATMAP_COLORS.mid}, ${HEATMAP_COLORS.min})`,
                  }}
                >
                  {DEFAULT_CONFIG.legendValues.map((value, index) => (
                    <div
                      key={`legend-${index}`}
                      className="absolute text-xs"
                      style={{
                        right: -30,
                        bottom: `${value * 100}%`,
                        transform: 'translateY(50%)',
                      }}
                    >
                      {value.toFixed(1)}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </ContainerBody>
    </ContainerComponent>
  )
}

export default memo(HeatmapChartModule)
