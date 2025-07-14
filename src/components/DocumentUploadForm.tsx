import React, { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';
import { User, Building, Upload, FileText, Check, X, AlertCircle, Info, CheckCircle } from 'lucide-react';

// Interfaces for component props and state
interface DocumentUploadData {
  pitchDeck: File | null;
  otherDocuments: File[];
}

interface DocumentUploadFormProps {
  onNext: (data: DocumentUploadData) => void;
  onBack: () => void;
}

interface UploadedFile {
  file: File;
  id: string;
}

interface ToastState {
    message: string | null;
    type: 'success' | 'error' | null;
}

/**
 * A form component for uploading a pitch deck and other supporting documents.
 * It includes drag-and-drop functionality, file validation, and user feedback.
 */
const DocumentUploadForm: React.FC<DocumentUploadFormProps> = ({ onNext, onBack }) => {
  // State management for file uploads, errors, and toast notifications
  const [pitchDeck, setPitchDeck] = useState<UploadedFile | null>(null);
  const [otherDocuments, setOtherDocuments] = useState<UploadedFile[]>([]);
  const [errors, setErrors] = useState<{ pitchDeck?: string; otherDocuments?: string }>({});
  const [toast, setToast] = useState<ToastState>({ message: null, type: null });

  const { handleSubmit } = useForm<DocumentUploadData>();

  // Configuration for accepted file types and max file size
  const acceptedFileTypes = {
    'application/pdf': ['.pdf'],
    'image/jpeg': ['.jpg', '.jpeg'],
    'image/png': ['.png'],
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
  };
  const maxFileSize = 10 * 1024 * 1024; // 10MB

  /**
   * Displays a toast notification for a short duration.
   * @param message The message to display.
   * @param type The type of toast ('success' or 'error').
   */
  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: null, type: null }), 4000);
  };

  /**
   * Generates a unique ID for a file.
   * @returns A random string ID.
   */
  const generateFileId = () => Math.random().toString(36).substr(2, 9);

  /**
   * A unified handler for file drop events from both dropzones.
   * @param acceptedFiles - Array of files that were accepted.
   * @param rejectedFiles - Array of files that were rejected.
   * @param isPitchDeck - Flag to distinguish between the two dropzones.
   */
  const handleFileDrop = useCallback((acceptedFiles: File[], rejectedFiles: any[], isPitchDeck: boolean) => {
    const fieldName = isPitchDeck ? 'pitchDeck' : 'otherDocuments';

    // Handle rejected files
    if (rejectedFiles.length > 0) {
        const firstError = rejectedFiles[0].errors[0];
        let errorMessage = 'File rejected.';
        if (firstError.code === 'file-too-large') {
            errorMessage = 'File size exceeds 10MB limit.';
        } else if (firstError.code === 'file-invalid-type') {
            errorMessage = 'Invalid file type. Please upload PDF, JPG, PNG, or DOCX.';
        }
      setErrors(prev => ({ ...prev, [fieldName]: errorMessage }));
      showToast(errorMessage, 'error');
      return;
    }

    // Handle accepted files
    if (acceptedFiles.length > 0) {
        if (isPitchDeck) {
            const file = acceptedFiles[0];
            setPitchDeck({ file, id: generateFileId() });
            setErrors(prev => ({ ...prev, pitchDeck: undefined }));
            showToast('Pitch deck uploaded successfully!', 'success');
        } else {
            const newFiles = acceptedFiles.map(file => ({ file, id: generateFileId() }));
            setOtherDocuments(prev => [...prev, ...newFiles]);
            setErrors(prev => ({ ...prev, otherDocuments: undefined }));
            showToast(`${newFiles.length} document(s) uploaded successfully!`, 'success');
        }
    }
  }, []);


  // Setup for the pitch deck dropzone
  const pitchDeckDropzone = useDropzone({
    onDrop: (accepted, rejected) => handleFileDrop(accepted, rejected, true),
    accept: acceptedFileTypes,
    maxSize: maxFileSize,
    multiple: false,
  });

  // Setup for the other documents dropzone
  const otherDocumentsDropzone = useDropzone({
    onDrop: (accepted, rejected) => handleFileDrop(accepted, rejected, false),
    accept: acceptedFileTypes,
    maxSize: maxFileSize,
    multiple: true,
  });

  // Functions to remove uploaded files
  const removePitchDeck = () => setPitchDeck(null);
  const removeOtherDocument = (id: string) => {
    setOtherDocuments(prev => prev.filter(doc => doc.id !== id));
  };

  /**
   * Formats file size from bytes to a readable string.
   * @param bytes - The file size in bytes.
   * @returns A formatted file size string (e.g., "1.23 MB").
   */
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  /**
   * Handles form submission, validates required fields, and calls the onNext prop.
   */
  const onSubmit = () => {
    const newErrors: { pitchDeck?: string } = {};
    if (!pitchDeck) {
      newErrors.pitchDeck = 'Pitch deck is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      showToast('Please upload all required documents', 'error');
      return;
    }

    const formData: DocumentUploadData = {
      pitchDeck: pitchDeck?.file || null,
      otherDocuments: otherDocuments.map(doc => doc.file),
    };
    onNext(formData);
  };

  // Sidebar navigation steps configuration
  const sidebarSteps = [
    { id: 1, title: 'Basic Info', icon: User, active: false, completed: true },
    { id: 2, title: 'Startup Profile', icon: Building, active: false, completed: true },
    { id: 3, title: 'Upload Documents', icon: Upload, active: true, completed: false },
    { id: 4, title: 'Add your Team', icon: User, active: false, completed: false },
    { id: 5, title: 'Psychological Assessment', icon: User, active: false, completed: false },
  ];

  /**
   * A component to render toast notifications.
   */
  const ToastComponent = () => {
    if (!toast.message) return null;
    const isSuccess = toast.type === 'success';
    const bgColor = isSuccess ? 'bg-green-600' : 'bg-red-600';
    const Icon = isSuccess ? CheckCircle : AlertCircle;

    return (
        <div className={`fixed top-4 right-4 z-50 text-white px-6 py-3 rounded-lg shadow-lg flex items-center ${bgColor}`}>
            <Icon className="w-5 h-5 mr-2" />
            <span>{toast.message}</span>
            <button
                onClick={() => setToast({ message: null, type: null })}
                className="ml-4 text-white hover:text-gray-200"
            >
                <X className="w-4 h-4" />
            </button>
        </div>
    );
  };

  return (
    <div className="min-h-screen bg-black flex font-sans">
      <ToastComponent />

      {/* Sidebar */}
      <aside className="w-[528px] h-auto bg-gray-800/5 rounded-xl p-5 m-10 mr-0">
        <div className="flex items-center mb-12">
          <img src="/image.png" alt="Power Nest Logo" className="w-10 h-10 mr-4 rounded-md" />
          <h1 className="text-2xl font-bold text-white">Power Nest</h1>
        </div>
        <nav className="space-y-4">
          {sidebarSteps.map((step) => (
            <div
              key={step.id}
              className={`flex items-center p-4 rounded-lg transition-colors ${
                step.active
                  ? 'bg-blue-600/20 border border-blue-500/30'
                  : step.completed
                  ? 'bg-green-600/20 border border-green-500/30'
                  : 'text-gray-500'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 ${
                  step.active ? 'bg-blue-600' : step.completed ? 'bg-green-600' : 'bg-gray-700'
                }`}
              >
                {step.completed ? <Check className="w-4 h-4 text-white" /> : <step.icon className={`w-4 h-4 ${step.active ? 'text-white' : 'text-gray-400'}`} />}
              </div>
              <span className={`font-medium ${step.active ? 'text-white' : step.completed ? 'text-green-400' : 'text-gray-400'}`}>
                {step.title}
              </span>
            </div>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-800/5 rounded-xl p-10 m-10 ml-0">
        <div className="max-w-[898px]">
          <header className="mb-12">
            <h2 className="text-4xl font-bold text-white mb-2">Upload Documents</h2>
            <p className="text-gray-400">
              Upload your pitch deck and any supporting documents to help investors understand your business.
            </p>
          </header>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Pitch Deck Upload Section */}
            <section>
                <div className="flex items-center mb-2">
                    <label className="block text-lg font-medium text-white mr-2">Pitch Deck</label>
                    <span className="text-sm text-gray-400">(Required)</span>
                </div>
                <div
                    {...pitchDeckDropzone.getRootProps()}
                    className={`w-full h-[120px] bg-gray-900 rounded-xl border-2 border-dashed transition-all cursor-pointer hover:border-gray-600 hover:bg-gray-800/50 flex items-center justify-center ${
                    pitchDeckDropzone.isDragActive ? 'border-blue-500 bg-blue-500/10' : errors.pitchDeck ? 'border-red-500' : 'border-gray-700'
                    }`}
                >
                    <input {...pitchDeckDropzone.getInputProps()} />
                    {pitchDeck ? (
                    <div className="flex items-center justify-between w-full px-6">
                        <div className="flex items-center overflow-hidden">
                            <FileText className="w-8 h-8 text-blue-400 mr-3 flex-shrink-0" />
                            <div className="overflow-hidden">
                                <p className="text-white font-medium truncate">{pitchDeck.file.name}</p>
                                <p className="text-gray-400 text-sm">{formatFileSize(pitchDeck.file.size)}</p>
                            </div>
                        </div>
                        <button type="button" onClick={(e) => { e.stopPropagation(); removePitchDeck(); }} className="text-red-400 hover:text-red-300 transition-colors ml-4">
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                    ) : (
                    <div className="text-center">
                        <Upload className="w-8 h-8 text-gray-500 mx-auto mb-2" />
                        <p className="text-gray-300 text-sm mb-1">{pitchDeckDropzone.isDragActive ? 'Drop your pitch deck here' : 'Drag and drop or browse'}</p>
                        <p className="text-gray-500 text-xs">PDF, JPG, PNG, or DOCX</p>
                    </div>
                    )}
                </div>
                {errors.pitchDeck && <p className="mt-2 text-sm text-red-500 flex items-center"><AlertCircle className="w-4 h-4 mr-1" />{errors.pitchDeck}</p>}
                <div className="mt-3 flex items-start text-sm text-gray-400">
                    <Info className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                    <p>Recommended: Include a pitch deck that clearly outlines your business model, market opportunity, and team.</p>
                </div>
            </section>

            {/* Other Documents Upload Section */}
            <section>
              <div className="flex items-center mb-2">
                <label className="block text-lg font-medium text-white mr-2">Other documents</label>
                <span className="text-sm text-gray-400">(Optional)</span>
              </div>
              <div
                {...otherDocumentsDropzone.getRootProps()}
                className={`w-full min-h-[120px] bg-gray-900 rounded-xl border-2 border-dashed transition-all cursor-pointer hover:border-gray-600 hover:bg-gray-800/50 flex flex-col items-center justify-center p-4 ${
                  otherDocumentsDropzone.isDragActive ? 'border-blue-500 bg-blue-500/10' : errors.otherDocuments ? 'border-red-500' : 'border-gray-700'
                }`}
              >
                <input {...otherDocumentsDropzone.getInputProps()} />
                <div className="text-center mb-4">
                  <Upload className="w-8 h-8 text-gray-500 mx-auto mb-2" />
                  <p className="text-gray-300 text-sm mb-1">{otherDocumentsDropzone.isDragActive ? 'Drop your documents here' : 'Drag and drop or browse'}</p>
                  <p className="text-gray-500 text-xs">PDF, JPG, PNG, or DOCX (max 10MB)</p>
                </div>
              </div>
              {errors.otherDocuments && <p className="mt-2 text-sm text-red-500 flex items-center"><AlertCircle className="w-4 h-4 mr-1" />{errors.otherDocuments}</p>}
              
              {/* Display uploaded "Other Documents" */}
              {otherDocuments.length > 0 && (
                <div className="mt-4 space-y-2">
                  <h3 className="text-md font-medium text-gray-300">Uploaded Documents:</h3>
                  {otherDocuments.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between bg-gray-800 rounded-lg p-3">
                      <div className="flex items-center overflow-hidden">
                        <FileText className="w-5 h-5 text-blue-400 mr-3 flex-shrink-0" />
                        <div className="overflow-hidden">
                          <p className="text-white text-sm font-medium truncate">{doc.file.name}</p>
                          <p className="text-gray-400 text-xs">{formatFileSize(doc.file.size)}</p>
                        </div>
                      </div>
                      <button type="button" onClick={() => removeOtherDocument(doc.id)} className="text-red-400 hover:text-red-300 transition-colors ml-4">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <div className="mt-3 text-sm text-gray-400">
                <p>E.g., Valuation reports, incorporation certificates, cap table, previous term sheets, proof of funds, etc.</p>
              </div>
            </section>

            {/* Navigation Buttons */}
            <footer className="flex justify-between pt-8">
              <button type="button" onClick={onBack} className="w-[180px] h-[52px] bg-transparent border border-gray-600 text-white rounded-xl font-medium hover:border-gray-500 hover:bg-gray-900/50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500">
                Back
              </button>
              <button type="submit" className="w-[180px] h-[52px] bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black">
                Next
              </button>
            </footer>
          </form>
        </div>
      </main>
    </div>
  );
};

export default DocumentUploadForm;
