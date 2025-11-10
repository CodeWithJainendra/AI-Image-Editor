
import React, { useState, useCallback } from 'react';
import { editImageWithPrompt } from '../services/geminiService';
import { fileToBase64 } from '../utils/fileUtils';
import { UploadIcon } from './icons/UploadIcon';
import { SparklesIcon } from './icons/SparklesIcon';

const ImageEditor: React.FC = () => {
  const [originalImageFile, setOriginalImageFile] = useState<File | null>(null);
  const [originalImagePreview, setOriginalImagePreview] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setOriginalImageFile(file);
      setOriginalImagePreview(URL.createObjectURL(file));
      setGeneratedImage(null);
      setError(null);
    }
  };

  const handleGenerate = useCallback(async () => {
    if (!originalImageFile || !prompt) {
      setError('Please upload an image and enter a prompt.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const base64Data = await fileToBase64(originalImageFile);
      const result = await editImageWithPrompt(base64Data, originalImageFile.type, prompt);
      setGeneratedImage(result);
    } catch (e: any) {
      console.error(e);
      setError('Failed to generate image. Please check the console for details.');
    } finally {
      setIsLoading(false);
    }
  }, [originalImageFile, prompt]);

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-[#0f4a8a]">Describe Your Edit</h2>
        <p className="text-lg text-gray-600 mt-2">Upload an image, tell our AI what to change, and watch the magic happen.</p>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-200">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Column */}
          <div className="flex flex-col space-y-6">
            <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-[#0f4a8a] hover:bg-blue-50 transition-colors duration-300">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="flex flex-col items-center justify-center space-y-2 cursor-pointer">
                <UploadIcon className="w-10 h-10 text-gray-400" />
                <span className="font-medium text-gray-600">
                  {originalImageFile ? 'Change image' : 'Click to upload'}
                </span>
                <span className="text-xs text-gray-500">PNG, JPG, WEBP up to 10MB</span>
              </label>
            </div>

            {originalImagePreview && (
              <div className="p-2 border rounded-lg shadow-sm">
                <img src={originalImagePreview} alt="Original preview" className="w-full h-auto rounded-md object-contain max-h-72" />
              </div>
            )}

            <div className="flex flex-col">
              <label htmlFor="prompt" className="mb-2 font-semibold text-gray-700">Edit Instruction</label>
              <textarea
                id="prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g., Add a retro filter, make it black and white, remove the person in the background..."
                rows={4}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0f4a8a] focus:border-[#0f4a8a] transition"
                disabled={isLoading}
              />
            </div>
            
            <button
              onClick={handleGenerate}
              disabled={!originalImageFile || !prompt || isLoading}
              className="w-full flex items-center justify-center bg-[#0f4a8a] text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating...
                </>
              ) : (
                <>
                  <SparklesIcon className="w-5 h-5 mr-2" />
                  Generate Image
                </>
              )}
            </button>
          </div>

          {/* Output Column */}
          <div className="flex items-center justify-center bg-gray-100 rounded-lg border border-gray-200 min-h-[300px] lg:min-h-full p-4">
            {isLoading && (
              <div className="text-center text-gray-600">
                <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-[#0f4a8a] mx-auto"></div>
                <p className="mt-4 font-semibold">AI is creating...</p>
                <p className="text-sm">This may take a moment.</p>
              </div>
            )}
            {error && !isLoading && <p className="text-red-600 bg-red-100 p-4 rounded-lg">{error}</p>}
            {!isLoading && !generatedImage && !error && (
              <div className="text-center text-gray-500">
                <p className="font-semibold">Your edited image will appear here</p>
              </div>
            )}
            {generatedImage && !isLoading && (
              <img src={generatedImage} alt="Generated" className="w-full h-auto rounded-lg object-contain max-h-[500px]" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageEditor;
