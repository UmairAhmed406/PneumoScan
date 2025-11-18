import { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, AlertCircle, CheckCircle2, XCircle, Info } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { predictPneumonia, type PredictionResponse } from '@/lib/api'
import { formatConfidence, getConfidenceColor, cn } from '@/lib/utils'

const AnalyzePage = () => {
  const [preview, setPreview] = useState<string | null>(null)
  const [result, setResult] = useState<PredictionResponse | null>(null)
  const [imageInfo, setImageInfo] = useState<{ width: number; height: number; size: number } | null>(null)

  const mutation = useMutation({
    mutationFn: predictPneumonia,
    onSuccess: (data) => {
      setResult(data)
      toast.success('Analysis complete!')
    },
    onError: (error: any) => {
      const detail = error.response?.data?.detail

      // Handle validation errors with custom formatting
      if (detail?.error === 'Invalid Image Type') {
        toast.error(
          <div className="space-y-2">
            <p className="font-semibold">{detail.error}</p>
            <p className="text-sm">{detail.message}</p>
            {detail.suggestion && (
              <p className="text-xs italic">{detail.suggestion}</p>
            )}
          </div>,
          { duration: 6000 }
        )
      } else {
        // Generic error message
        const errorMessage = detail?.message ||
                            error.response?.data?.message ||
                            'Analysis failed. Please ensure you uploaded a valid chest X-ray image.'
        toast.error(errorMessage)
      }

      setResult(null)
    },
  })

  const validateImage = (file: File): Promise<boolean> => {
    return new Promise((resolve) => {
      const img = new Image()
      const reader = new FileReader()

      reader.onload = (e) => {
        img.onload = () => {
          const width = img.width
          const height = img.height
          const size = file.size

          setImageInfo({ width, height, size })

          // Check file size (max 16MB)
          if (size > 16 * 1024 * 1024) {
            toast.error('File too large! Maximum size is 16MB.')
            resolve(false)
            return
          }

          // Check minimum dimensions (chest X-rays are typically larger)
          if (width < 100 || height < 100) {
            toast.error('Image too small. Please upload a clear chest X-ray image.')
            resolve(false)
            return
          }

          // Check if image is too small file size (might be corrupted or low quality)
          if (size < 10 * 1024) {
            toast.error('Image file size too small. Please upload a clear, high-quality chest X-ray.')
            resolve(false)
            return
          }

          // Warning for unusual aspect ratios (chest X-rays are usually portrait or square)
          const aspectRatio = width / height
          if (aspectRatio > 2 || aspectRatio < 0.5) {
            toast.custom((t) => (
              <div className={cn(
                "bg-yellow-50 border border-yellow-200 rounded-lg p-4 shadow-lg",
                t.visible ? 'animate-enter' : 'animate-leave'
              )}>
                <div className="flex items-start gap-3">
                  <Info className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-yellow-800 text-sm">Unusual Image Format</p>
                    <p className="text-yellow-700 text-xs mt-1">
                      This doesn't look like a typical chest X-ray. Please ensure you uploaded the correct image.
                    </p>
                  </div>
                </div>
              </div>
            ), { duration: 4000 })
          }

          resolve(true)
        }

        img.onerror = () => {
          toast.error('Failed to load image. Please upload a valid image file.')
          resolve(false)
        }

        img.src = e.target?.result as string
      }

      reader.onerror = () => {
        toast.error('Failed to read file. Please try again.')
        resolve(false)
      }

      reader.readAsDataURL(file)
    })
  }

  const onDrop = async (acceptedFiles: File[], rejectedFiles: any[]) => {
    // Handle rejected files
    if (rejectedFiles.length > 0) {
      const error = rejectedFiles[0].errors[0]
      if (error.code === 'file-invalid-type') {
        toast.error('Invalid file type! Please upload PNG, JPG, or JPEG images only.')
      } else if (error.code === 'too-many-files') {
        toast.error('Please upload only one image at a time.')
      }
      return
    }

    const file = acceptedFiles[0]
    if (!file) return

    // Reset previous results
    setResult(null)
    setPreview(null)
    setImageInfo(null)

    // Validate image
    const isValid = await validateImage(file)
    if (!isValid) return

    // Create preview
    const reader = new FileReader()
    reader.onload = () => {
      setPreview(reader.result as string)
    }
    reader.readAsDataURL(file)

    // Start analysis
    try {
      mutation.mutate(file)
    } catch (error) {
      toast.error('Failed to start analysis. Please try again.')
    }
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
          <div className="mt-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Analysis Results</h2>
              <button
                onClick={() => {
                  setPreview(null)
                  setResult(null)
                  setImageInfo(null)
                }}
                className="px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors flex items-center gap-2"
              >
                <XCircle className="h-4 w-4" />
                Analyze New Image
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Image Preview */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Uploaded Image</h3>
                <img
                  src={preview}
                  alt="X-ray preview"
                  className="w-full rounded-lg border shadow-md"
                />
                {imageInfo && (
                  <div className="mt-4 p-4 bg-muted rounded-lg">
                    <p className="text-xs font-semibold mb-2">Image Information</p>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <p>Dimensions: {imageInfo.width} × {imageInfo.height} pixels</p>
                      <p>File Size: {(imageInfo.size / 1024).toFixed(2)} KB</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Results */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Prediction Details</h3>
                <div className="space-y-4">
                  {/* Validation Warning */}
                  {result.validation_warning && (
                    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <p className="text-xs font-semibold text-yellow-800 mb-1">Validation Notice</p>
                      <p className="text-xs text-yellow-700">{result.validation_warning}</p>
                      {result.validation_confidence && (
                        <p className="text-xs text-yellow-600 mt-2">
                          Validation Confidence: {result.validation_confidence}%
                        </p>
                      )}
                    </div>
                  )}

                  {/* Prediction */}
                  <div className="p-6 border rounded-lg bg-card shadow-sm">
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
                  <div className="p-6 border rounded-lg bg-card shadow-sm">
                    <div className="text-sm text-muted-foreground mb-2">Confidence Score</div>
                    <div className={cn('text-3xl font-bold', getConfidenceColor(result.confidence))}>
                      {formatConfidence(result.confidence)}
                    </div>
                    <div className="mt-4 bg-muted rounded-full h-2 overflow-hidden">
                      <div
                        className={cn(
                          "h-full transition-all",
                          result.confidence >= 0.9 ? "bg-green-600" :
                          result.confidence >= 0.7 ? "bg-yellow-600" :
                          "bg-red-600"
                        )}
                        style={{ width: `${result.confidence * 100}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      {result.confidence >= 0.9 ? "High confidence" :
                       result.confidence >= 0.7 ? "Moderate confidence" :
                       "Low confidence - please consult a professional"}
                    </p>
                  </div>

                  {/* Disclaimer */}
                  <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                    <p className="text-xs font-semibold text-destructive mb-1">Important Notice</p>
                    <p className="text-xs text-muted-foreground">{result.disclaimer}</p>
                  </div>

                  {/* What's Next */}
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-xs font-semibold text-blue-800 mb-2">Next Steps</p>
                    <ul className="text-xs text-blue-700 space-y-1 list-disc list-inside">
                      <li>Always consult a qualified healthcare professional</li>
                      <li>Do not use this for self-diagnosis</li>
                      <li>This is for educational purposes only</li>
                      {result.prediction === 'Pneumonia' && (
                        <li className="font-semibold">Seek immediate medical attention</li>
                      )}
                    </ul>
                  </div>
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
