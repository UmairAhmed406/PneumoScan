import { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, AlertCircle, CheckCircle2 } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { predictPneumonia, type PredictionResponse } from '@/lib/api'
import { formatConfidence, getConfidenceColor, cn } from '@/lib/utils'

const AnalyzePage = () => {
  const [preview, setPreview] = useState<string | null>(null)
  const [result, setResult] = useState<PredictionResponse | null>(null)

  const mutation = useMutation({
    mutationFn: predictPneumonia,
    onSuccess: (data) => {
      setResult(data)
      toast.success('Analysis complete!')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Analysis failed. Please try again.')
    },
  })

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (!file) return

    // Create preview
    const reader = new FileReader()
    reader.onload = () => {
      setPreview(reader.result as string)
    }
    reader.readAsDataURL(file)

    // Reset previous result
    setResult(null)

    // Start analysis
    mutation.mutate(file)
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg'],
    },
    maxFiles: 1,
    multiple: false,
  })

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Analyze Chest X-Ray</h1>
        <p className="text-muted-foreground mb-8">
          Upload a chest X-ray image for pneumonia detection analysis.
        </p>

        {/* Medical Disclaimer */}
        <div className="mb-8 p-4 bg-destructive/10 border border-destructive rounded-lg">
          <p className="text-sm font-semibold text-destructive mb-2">
            ⚠️ MEDICAL DISCLAIMER
          </p>
          <p className="text-xs text-muted-foreground">
            This is an educational tool only. NOT for medical diagnosis. Always consult healthcare professionals.
          </p>
        </div>

        {/* Upload Area */}
        <div
          {...getRootProps()}
          className={cn(
            'border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors',
            isDragActive ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50',
            mutation.isPending && 'opacity-50 pointer-events-none'
          )}
        >
          <input {...getInputProps()} />
          <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          {isDragActive ? (
            <p className="text-lg">Drop the X-ray image here...</p>
          ) : (
            <>
              <p className="text-lg mb-2">Drag & drop an X-ray image here</p>
              <p className="text-sm text-muted-foreground">or click to browse</p>
              <p className="text-xs text-muted-foreground mt-2">Supports: PNG, JPG, JPEG</p>
            </>
          )}
        </div>

        {/* Loading State */}
        {mutation.isPending && (
          <div className="mt-8 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <p className="mt-4 text-muted-foreground">Analyzing X-ray...</p>
          </div>
        )}

        {/* Results */}
        {preview && result && (
          <div className="mt-8 grid md:grid-cols-2 gap-8">
            {/* Image Preview */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Uploaded Image</h3>
              <img
                src={preview}
                alt="X-ray preview"
                className="w-full rounded-lg border"
              />
            </div>

            {/* Results */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Analysis Results</h3>
              <div className="space-y-4">
                {/* Prediction */}
                <div className="p-6 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Prediction</span>
                    {result.prediction === 'Normal' ? (
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-destructive" />
                    )}
                  </div>
                  <div
                    className={cn(
                      'text-3xl font-bold',
                      result.prediction === 'Normal' ? 'text-green-600' : 'text-destructive'
                    )}
                  >
                    {result.prediction}
                  </div>
                </div>

                {/* Confidence */}
                <div className="p-6 border rounded-lg">
                  <div className="text-sm text-muted-foreground mb-2">Confidence</div>
                  <div className={cn('text-3xl font-bold', getConfidenceColor(result.confidence))}>
                    {formatConfidence(result.confidence)}
                  </div>
                  <div className="mt-4 bg-muted rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-primary h-full transition-all"
                      style={{ width: `${result.confidence * 100}%` }}
                    />
                  </div>
                </div>

                {/* Disclaimer */}
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-xs text-muted-foreground">{result.disclaimer}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AnalyzePage
