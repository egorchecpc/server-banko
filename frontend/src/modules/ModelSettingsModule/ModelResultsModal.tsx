import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import ResidualTable from '@/modules/ModelSettingsModule/ResidualTable'
import AutocorrelationChart from './AutocorrelationChart'
import TimeSeriesPlot from './TimeSeriesPlot'

interface ModelResultsModalProps {
  isOpen: boolean
  onClose: () => void
}

interface DialogProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
}

const ModelResultsModal: React.FC<ModelResultsModalProps> = ({
  isOpen,
  onClose,
}) => {
  // Sample data for the regression output
  const modelOutput = {
    dependentVar: 'LOG(PD_TTC)',
    method: 'Least Squares',
    date: new Date().toLocaleDateString('en-US'),
    time: new Date().toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    }),
    sampleRange: '1 36',
    observations: 36,
    variables: [
      {
        name: 'C',
        coefficient: 15.76307,
        stdError: 2.66783,
        tStatistic: 5.908575,
        prob: 0.0,
      },
      {
        name: 'LOG(X_1)',
        coefficient: 0.190891,
        stdError: 0.096297,
        tStatistic: 1.982316,
        prob: 0.0561,
      },
      {
        name: 'LOG(X_5)',
        coefficient: -5.349542,
        stdError: 0.465006,
        tStatistic: -11.50424,
        prob: 0.0,
      },
      {
        name: 'LOG(X_6)',
        coefficient: 0.74243,
        stdError: 0.124228,
        tStatistic: 5.976329,
        prob: 0.0,
      },
    ],
    statistics: [
      {
        name: 'R-squared',
        value: 0.881162,
        paired: 'Mean dependent var',
        pairedValue: -3.008756,
      },
      {
        name: 'Adjusted R-squared',
        value: 0.870021,
        paired: 'S.D. dependent var',
        pairedValue: 0.199291,
      },
      {
        name: 'S.E. of regression',
        value: 0.071849,
        paired: 'Akaike info criterion',
        pairedValue: -2.324048,
      },
      {
        name: 'Sum squared resid',
        value: 0.165195,
        paired: 'Schwarz criterion',
        pairedValue: -2.148101,
      },
      {
        name: 'Log likelihood',
        value: 45.83286,
        paired: 'Hannan-Quinn criter.',
        pairedValue: -2.262638,
      },
      {
        name: 'F-statistic',
        value: 79.09161,
        paired: 'Durbin-Watson stat',
        pairedValue: 0.724795,
      },
      { name: 'Prob(F-statistic)', value: 0.0, paired: '', pairedValue: null },
    ],
  }

  // Function to render the regression output table - EViews style
  const renderRegressionTable = () => {
    return (
      <div className="overflow-x-auto font-mono text-xs">
        <table className="w-full">
          <tbody>
            <tr>
              <td colSpan={4}>
                Dependent Variable: {modelOutput.dependentVar}
              </td>
            </tr>
            <tr>
              <td colSpan={4}>Method: {modelOutput.method}</td>
            </tr>
            <tr>
              <td colSpan={4}>
                Date: {modelOutput.date} Time: {modelOutput.time}
              </td>
            </tr>
            <tr>
              <td colSpan={4}>Sample (adjusted): {modelOutput.sampleRange}</td>
            </tr>
            <tr>
              <td colSpan={4}>
                Included observations: {modelOutput.observations} after
                adjustments
              </td>
            </tr>
            <tr>
              <td colSpan={4}>&nbsp;</td>
            </tr>
            <tr className="border-b">
              <td className="px-4 py-2 text-left">Variable</td>
              <td className="px-4 py-2 text-left">Coefficient</td>
              <td className="px-4 py-2 text-left">Std. Error</td>
              <td className="px-4 py-2 text-left">t-Statistic</td>
              <td className="px-4 py-2 text-left">Prob.</td>
            </tr>
            {modelOutput.variables.map((variable, index) => (
              <tr key={index} className="border-b">
                <td className="px-4 py-2">{variable.name}</td>
                <td className="px-4 py-2">{variable.coefficient.toFixed(6)}</td>
                <td className="px-4 py-2">{variable.stdError.toFixed(6)}</td>
                <td className="px-4 py-2">{variable.tStatistic.toFixed(6)}</td>
                <td className="px-4 py-2">{variable.prob.toFixed(4)}</td>
              </tr>
            ))}
            <tr>
              <td colSpan={5}>&nbsp;</td>
            </tr>
            {modelOutput.statistics.map((stat, index) => (
              <tr
                key={index}
                className={
                  index === modelOutput.statistics.length - 1 ? '' : 'border-b'
                }
              >
                <td className="px-4 py-1">{stat.name}</td>
                <td className="px-4 py-1">{stat.value.toFixed(6)}</td>
                <td className="px-4 py-1 text-right">{stat.paired}</td>
                <td className="px-4 py-1">
                  {stat.pairedValue !== null ? stat.pairedValue.toFixed(6) : ''}
                </td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  // Generic dialog component for all chart views
  const CustomDialog: React.FC<DialogProps> = ({
    isOpen,
    onClose,
    title,
    children,
  }) => {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
          <div className="mt-4 max-h-[70vh] overflow-y-auto overflow-x-hidden px-1">
            {children}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={onClose}>
              Закрыть
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }

  const [showResidualDialog, setShowResidualDialog] = useState(false)
  const [showAutocorrelationDialog, setShowAutocorrelationDialog] =
    useState(false)
  const [showTimeSeriesDialog, setShowTimeSeriesDialog] = useState(false)

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <DropdownMenuItem
                      onClick={() => setShowResidualDialog(true)}
                    >
                      Actual, Fitted, Residual Table
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setShowAutocorrelationDialog(true)}
                    >
                      Correlogram of Residuals
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setShowTimeSeriesDialog(true)}
                    >
                      Time Series Plot
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <DialogTitle className="ml-4">Результат модели</DialogTitle>
              </div>
            </div>
          </DialogHeader>

          <div className="mt-4 max-h-[70vh] overflow-y-auto overflow-x-hidden px-1">
            {renderRegressionTable()}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={onClose}>
              Закрыть
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Separate dialogs for different views */}
      <CustomDialog
        isOpen={showResidualDialog}
        onClose={() => setShowResidualDialog(false)}
        title="Actual, Fitted, Residual"
      >
        <ResidualTable />
      </CustomDialog>

      <CustomDialog
        isOpen={showAutocorrelationDialog}
        onClose={() => setShowAutocorrelationDialog(false)}
        title="Correlogram of Residuals"
      >
        <AutocorrelationChart />
      </CustomDialog>

      <CustomDialog
        isOpen={showTimeSeriesDialog}
        onClose={() => setShowTimeSeriesDialog(false)}
        title="Time Series Plot"
      >
        <TimeSeriesPlot />
      </CustomDialog>
    </>
  )
}

export default ModelResultsModal
