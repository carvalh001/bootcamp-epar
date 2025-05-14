// src/hooks/useCalculatorData.ts
import { useState } from 'react'
import { CalculatorInput, CalculationResult, calculatePortfolioValue } from '@/utils/calculateValue'
import { ContactInfo } from '@/types/calculator'
import { defaultInputs } from '@/constants/calculatorDefaults'
import { useIpAddress } from './useIpAddress'
import { saveCalculatorSubmission } from '@/utils/calculatorStorage'
import { useCalculatorValidation } from './useCalculatorValidation'
import { submitContactForm } from '@/utils/submitContactForm'
import { v4 as uuidv4 } from 'uuid'
import { useCalculatorSession } from '@/contexts/CalculatorSessionContext'

const useCalculatorData = () => {
  const { sessionId, setSessionId } = useCalculatorSession()

  const [inputs, setInputs] = useState<CalculatorInput>(defaultInputs)
  const [results, setResults] = useState<CalculationResult | null>(null)
  const [showResults, setShowResults] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [isCalculating, setIsCalculating] = useState(false)

  const ipAddress = useIpAddress()
  const { validateInputs } = useCalculatorValidation()

  const handleInputChange = (key: keyof CalculatorInput, value: number | string) => {
    if (key === 'city') {
      const cityStr = String(value)
      const stateMapping: Record<string, string> = {
        'São Paulo': 'SP',
        'Rio de Janeiro': 'RJ',
        'Belo Horizonte': 'MG',
        'Salvador': 'BA',
        'Brasília': 'DF',
        'Curitiba': 'PR',
        'Fortaleza': 'CE',
        'Recife': 'PE',
        'Porto Alegre': 'RS',
        'Manaus': 'AM',
        'Belém': 'PA',
        'Goiânia': 'GO',
        'Guarulhos': 'SP',
        'Campinas': 'SP',
        'Vitória': 'ES',
        'Florianópolis': 'SC',
        'Natal': 'RN',
        'João Pessoa': 'PB',
      }
      const stateValue = stateMapping[cityStr] ?? ''
      setInputs(prev => ({ ...prev, city: cityStr, state: stateValue }))
    } else if (key === 'residentialPercentage') {
      const v = Number(value)
      setInputs(prev => ({
        ...prev,
        residentialPercentage: v,
        commercialPercentage: 100 - v,
      }))
    } else if (key === 'commercialPercentage') {
      const v = Number(value)
      setInputs(prev => ({
        ...prev,
        commercialPercentage: v,
        residentialPercentage: 100 - v,
      }))
    } else {
      setInputs(prev => ({ ...prev, [key]: value }))
    }

    if (showResults) {
      setShowResults(false)
    }
  }

  const calculateResults = async () => {
    if (!validateInputs(inputs)) {
      return null
    }

    setIsCalculating(true)

    setTimeout(async () => {
      const calculationResults = calculatePortfolioValue(inputs)
      setResults(calculationResults)
      setShowResults(true)
      setIsCalculating(false)

      // salva submissão e atualiza o sessionId caso o backend retorne outro
      const savedId = await saveCalculatorSubmission(
        sessionId,
        inputs,
        calculationResults,
        ipAddress
      )
      if (savedId) {
        setSessionId(savedId)
      }
    }, 3000)

    return null
  }

  const saveContactForm = async (contactInfo: ContactInfo): Promise<boolean> => {
    const success = await submitContactForm(contactInfo, sessionId)
    if (success) {
      setFormSubmitted(true)
      return true
    }
    return false
  }

  const resetCalculator = () => {
    setInputs(defaultInputs)
    setResults(null)
    setShowResults(false)
    setFormSubmitted(false)
    const newId = uuidv4()
    setSessionId(newId)
  }

  return {
    inputs,
    results: results!,
    showResults,
    formSubmitted,
    isCalculating,
    handleInputChange,
    calculateResults,
    resetCalculator,
    saveContactForm,
    setFormSubmitted,
    lastSubmissionId: sessionId,
  }
}

export default useCalculatorData
