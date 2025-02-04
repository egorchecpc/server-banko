interface ECLData {
  creditType: string
  stage1: StageData
  stage2: StageData
  stage3: StageData
  total: TotalData
}

interface StageData {
  balance: string
  reserve: string
  percent: string
}

interface TotalData {
  balance: string
  reserve: string
}

export interface ECLDiffResult {
  creditType: string
  stage1: StageDiff
  stage2: StageDiff
  stage3: StageDiff
  total: TotalDiff
}

export interface StageDiff {
  balance: number
  reserve: number
  percent: number
}

interface TotalDiff {
  balance: number
  reserve: number
}

function parseNumber(str: string): number {
  return parseFloat(str.replace(/\s/g, '').replace(',', '.'))
}

function parsePercent(str: string): number {
  return parseFloat(str.replace('%', ''))
}

export function calculateECLDiff(
  oldECL: ECLData[],
  newECL: ECLData[]
): ECLDiffResult[] {
  return newECL.map((newItem) => {
    const oldItem = oldECL.find(
      (item) => item.creditType === newItem.creditType
    )

    if (!oldItem) {
      return {
        creditType: newItem.creditType,
        stage1: {
          balance: parseNumber(newItem.stage1.balance),
          reserve: 0, // 0% изменения, если нет предыдущего значения
          percent: parsePercent(newItem.stage1.percent),
        },
        stage2: {
          balance: parseNumber(newItem.stage2.balance),
          reserve: 0,
          percent: parsePercent(newItem.stage2.percent),
        },
        stage3: {
          balance: parseNumber(newItem.stage3.balance),
          reserve: 0,
          percent: parsePercent(newItem.stage3.percent),
        },
        total: {
          balance: parseNumber(newItem.total.balance),
          reserve: 0,
        },
      }
    }

    const calculateReservePercentChange = (
      newValue: string,
      oldValue: string
    ) => {
      const newNum = parseNumber(newValue)
      const oldNum = parseNumber(oldValue)
      if (oldNum === 0) return 0
      return ((newNum - oldNum) / oldNum) * 100
    }

    return {
      creditType: newItem.creditType,
      stage1: {
        balance:
          parseNumber(newItem.stage1.balance) -
          parseNumber(oldItem.stage1.balance),
        reserve: calculateReservePercentChange(
          newItem.stage1.reserve,
          oldItem.stage1.reserve
        ),
        percent:
          parsePercent(newItem.stage1.percent) -
          parsePercent(oldItem.stage1.percent),
      },
      stage2: {
        balance:
          parseNumber(newItem.stage2.balance) -
          parseNumber(oldItem.stage2.balance),
        reserve: calculateReservePercentChange(
          newItem.stage2.reserve,
          oldItem.stage2.reserve
        ),
        percent:
          parsePercent(newItem.stage2.percent) -
          parsePercent(oldItem.stage2.percent),
      },
      stage3: {
        balance:
          parseNumber(newItem.stage3.balance) -
          parseNumber(oldItem.stage3.balance),
        reserve: calculateReservePercentChange(
          newItem.stage3.reserve,
          oldItem.stage3.reserve
        ),
        percent:
          parsePercent(newItem.stage3.percent) -
          parsePercent(oldItem.stage3.percent),
      },
      total: {
        balance:
          parseNumber(newItem.total.balance) -
          parseNumber(oldItem.total.balance),
        reserve: calculateReservePercentChange(
          newItem.total.reserve,
          oldItem.total.reserve
        ),
      },
    }
  })
}
