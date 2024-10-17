import React, { useState, useEffect, useCallback } from 'react'
import { useField } from 'formik'
import axios from 'axios'
import StyledTextarea from '../TextareaInput/StyledTextarea'

interface AIAssistedInputProps {
  name: string
  placeholder: string
  jobTitle: string
}

const AIAssistedInput: React.FC<AIAssistedInputProps> = ({
  name,
  placeholder,
  jobTitle,
  ...rest
}) => {
  const [field, meta, helpers] = useField(name)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchSuggestions = useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await axios.post('/api/ai-suggestions', {
        input: field.value,
        jobTitle,
      })
      setSuggestions(response.data.suggestions)
    } catch (error) {
      console.error('Error fetching suggestions:', error)
    }
    setIsLoading(false)
  }, [field.value, jobTitle])

  useEffect(() => {
    const debouncedFetchSuggestions = setTimeout(() => {
      if (field.value.length > 5) {
        fetchSuggestions()
      }
    }, 500)

    return () => clearTimeout(debouncedFetchSuggestions)
  }, [field.value, fetchSuggestions])

  const handleSuggestionClick = (suggestion: string) => {
    helpers.setValue(suggestion)
  }

  return (
    <div>
      <StyledTextarea {...field} placeholder={placeholder} {...rest} />
      {isLoading && <p>Loading suggestions...</p>}
      {suggestions.length > 0 && (
        <div className="mt-2">
          <p className="text-sm font-semibold">Suggestions:</p>
          <ul className="list-disc pl-5">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                className="text-sm text-blue-600 cursor-pointer hover:underline"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default AIAssistedInput
