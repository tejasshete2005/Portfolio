import { useState } from 'react'
import { motion } from 'motion/react'
import { ArrowDown, ArrowLeft, ArrowRight, RotateCcw, Search, SortAsc } from 'lucide-react'

const sortingPreset = [12, 5, 8, 2, 10, 6, 14]
const searchPreset = [2, 4, 7, 9, 13, 16, 21]

const makeStep = (values, message, options = {}) => ({
  values: [...values],
  message,
  activeIndices: [],
  sortedIndices: [],
  foundIndices: [],
  ...options
})

const makeBubbleSortSteps = (values) => {
  const array = [...values]
  const steps = [makeStep(array, 'Ready to sort. Step through each adjacent comparison.')]

  for (let end = array.length - 1; end > 0; end -= 1) {
    for (let index = 0; index < end; index += 1) {
      const left = array[index]
      const right = array[index + 1]
      const swapped = left > right

      if (swapped) {
        array[index] = right
        array[index + 1] = left
      }

      const sortedIndices = Array.from(
        { length: values.length - end },
        (_, offset) => values.length - 1 - offset
      )

      steps.push(makeStep(
        array,
        swapped
          ? `${left} is greater than ${right}, so swap the adjacent values.`
          : `${left} is not greater than ${right}, so keep them in place.`,
        { activeIndices: [index, index + 1], sortedIndices }
      ))
    }
  }

  steps.push(makeStep(
    array,
    'Complete. The values are sorted in ascending order.',
    { sortedIndices: array.map((_, index) => index) }
  ))

  return steps
}

const makeBinarySearchSteps = (values, target) => {
  const steps = [makeStep(values, `Ready to find ${target} in the sorted array.`)]
  let low = 0
  let high = values.length - 1

  while (low <= high) {
    const middle = Math.floor((low + high) / 2)
    const value = values[middle]

    if (value === target) {
      steps.push(makeStep(
        values,
        `Found ${target} at index ${middle}.`,
        { activeIndices: [middle], foundIndices: [middle] }
      ))
      return steps
    }

    steps.push(makeStep(
      values,
      `Check the middle value ${value} at index ${middle}.`,
      { activeIndices: [middle], low, high }
    ))

    if (value < target) {
      low = middle + 1
      steps.push(makeStep(
        values,
        `${value} is less than ${target}; discard the left half.`,
        { low, high }
      ))
    } else {
      high = middle - 1
      steps.push(makeStep(
        values,
        `${value} is greater than ${target}; discard the right half.`,
        { low, high }
      ))
    }
  }

  steps.push(makeStep(values, `${target} is not in this array.`))
  return steps
}

const parseArray = (input) => {
  const parts = input.split(',').map((part) => part.trim())
  if (!parts.length || parts.some((part) => part === '')) return null

  const values = parts.map(Number)
  if (values.some((value) => !Number.isInteger(value) || Math.abs(value) > 999)) return null
  if (values.length < 2 || values.length > 12) return null

  return values
}

const DsaVisualizer = () => {
  const [algorithm, setAlgorithm] = useState('bubble')
  const [arrayInput, setArrayInput] = useState(sortingPreset.join(', '))
  const [targetInput, setTargetInput] = useState('13')
  const [error, setError] = useState('')
  const [steps, setSteps] = useState([
    makeStep(sortingPreset, 'Ready to sort. Step through each adjacent comparison.')
  ])
  const [stepIndex, setStepIndex] = useState(0)
  const currentStep = steps[stepIndex]
  const maxMagnitude = Math.max(1, ...currentStep.values.map(Math.abs))

  const handleAlgorithmChange = (event) => {
    const nextAlgorithm = event.target.value
    setAlgorithm(nextAlgorithm)
    setArrayInput((nextAlgorithm === 'binary' ? searchPreset : sortingPreset).join(', '))
    setTargetInput('13')
    setError('')
    setStepIndex(0)
    setSteps([makeStep(
      nextAlgorithm === 'binary' ? searchPreset : sortingPreset,
      nextAlgorithm === 'binary'
        ? 'Ready to find 13 in the sorted array.'
        : 'Ready to sort. Step through each adjacent comparison.'
    )])
  }

  const handleRun = (event) => {
    event.preventDefault()
    const values = parseArray(arrayInput)

    if (!values) {
      setError('Enter 2–12 whole numbers between -999 and 999, separated by commas.')
      return
    }

    if (algorithm === 'binary') {
      if (values.some((value, index) => index > 0 && values[index - 1] > value)) {
        setError('Binary search needs values sorted in ascending order.')
        return
      }

      const target = Number(targetInput)
      if (targetInput.trim() === '' || !Number.isInteger(target) || Math.abs(target) > 999) {
        setError('Enter a whole-number target between -999 and 999.')
        return
      }

      setSteps(makeBinarySearchSteps(values, target))
    } else {
      setSteps(makeBubbleSortSteps(values))
    }

    setStepIndex(0)
    setError('')
  }

  const reset = () => {
    setStepIndex(0)
    setError('')
  }

  return (
    <section className="dsa-visualizer" aria-labelledby="visualizer-title">
      <div className="visualizer-heading">
        <div>
          <p className="section-eyebrow">INTERACTIVE PLAYGROUND</p>
          <h3 id="visualizer-title">See the algorithm <span className="gradient-text">think.</span></h3>
          <p className="section-description">
            Choose an algorithm, adjust the input, then step through each decision.
          </p>
        </div>
        <span className="visualizer-code-icon"><SortAsc size={22} /></span>
      </div>

      <form className={`visualizer-controls ${algorithm === 'binary' ? 'has-target' : ''}`} onSubmit={handleRun}>
        <label className="visualizer-field">
          <span>Algorithm</span>
          <select value={algorithm} onChange={handleAlgorithmChange}>
            <option value="bubble">Bubble sort</option>
            <option value="binary">Binary search</option>
          </select>
        </label>
        <label className="visualizer-field visualizer-array-field">
          <span>Array values (comma-separated)</span>
          <input
            value={arrayInput}
            onChange={(event) => setArrayInput(event.target.value)}
            aria-describedby={error ? 'visualizer-error' : 'visualizer-input-help'}
          />
        </label>
        {algorithm === 'binary' && (
          <label className="visualizer-field visualizer-target-field">
            <span>Target</span>
            <input
              type="number"
              min="-999"
              max="999"
              step="1"
              value={targetInput}
              onChange={(event) => setTargetInput(event.target.value)}
            />
          </label>
        )}
        <button className="primary-btn visualizer-run" type="submit">
          {algorithm === 'binary' ? <Search size={16} /> : <SortAsc size={17} />}
          Run
        </button>
      </form>

      <p className="visualizer-help" id="visualizer-input-help">
        Use 2–12 whole numbers. Binary search requires ascending order.
      </p>
      {error && <p className="visualizer-error" id="visualizer-error" role="alert">{error}</p>}

      <div className="visualizer-chart" role="img" aria-label={`Array visualization: ${currentStep.values.join(', ')}`}>
        {currentStep.values.map((value, index) => {
          const isFound = currentStep.foundIndices.includes(index)
          const isActive = currentStep.activeIndices.includes(index)
          const isSorted = currentStep.sortedIndices.includes(index)
          const outsideRange = algorithm === 'binary'
            && currentStep.low !== undefined
            && (index < currentStep.low || index > currentStep.high)

          return (
            <div className="visualizer-bar-wrap" key={index}>
              <motion.div
                className={[
                  'visualizer-bar',
                  isFound && 'is-found',
                  isActive && 'is-active',
                  isSorted && 'is-sorted',
                  outsideRange && 'is-outside-range'
                ].filter(Boolean).join(' ')}
                animate={{ height: `${34 + (Math.abs(value) / maxMagnitude) * 126}px` }}
                transition={{ type: 'spring', stiffness: 220, damping: 22 }}
              >
                <span>{value}</span>
              </motion.div>
              <span className="visualizer-index">{index}</span>
            </div>
          )
        })}
      </div>

      <div className="visualizer-step-row">
        <p className="visualizer-message" role="status" aria-live="polite">
          {algorithm === 'binary' && currentStep.activeIndices.length > 0 && !currentStep.foundIndices.length
            && <ArrowDown size={15} aria-hidden="true" />}
          {currentStep.message}
        </p>
        <div className="visualizer-step-controls">
          <button type="button" className="visualizer-icon-button" onClick={reset} disabled={stepIndex === 0} aria-label="Reset to first step">
            <RotateCcw size={15} />
          </button>
          <button type="button" className="visualizer-step-button" onClick={() => setStepIndex((index) => Math.max(0, index - 1))} disabled={stepIndex === 0}>
            <ArrowLeft size={15} /> Previous
          </button>
          <span className="visualizer-step-count">Step {stepIndex + 1} / {steps.length}</span>
          <button type="button" className="visualizer-step-button" onClick={() => setStepIndex((index) => Math.min(steps.length - 1, index + 1))} disabled={stepIndex === steps.length - 1}>
            Next <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </section>
  )
}

export default DsaVisualizer
