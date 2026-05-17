import { X } from 'lucide-react';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';





import { useTranslation } from 'react-i18next';

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  cancelText,
  confirmText,
  isLoading = false,
  variant = "danger" // "danger" or "primary"
}) {
  const { t } = useTranslation();

  // Set default values using translations
  const finalTitle = title || t('common.confirm');
  const finalDescription = description || t('common.confirm');
  const finalCancelText = cancelText || t('common.cancel');
  const finalConfirmText = confirmText || t('common.confirm');
  // Prevent scrolling when dialog is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const confirmButtonClass = variant === "danger"
    ? "bg-red-600 hover:bg-red-700 text-white"
    : "bg-slate-900 hover:bg-slate-800 text-white";

  return createPortal(
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
        onClick={!isLoading ? onClose : undefined}
      />

      {/* Dialog Container */}
      <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none">
        <div className="relative w-full max-w-md bg-white rounded-3xl p-8 shadow-2xl border border-slate-100 animate-in fade-in zoom-in duration-300 pointer-events-auto">

          <div className="flex flex-col space-y-2 text-center sm:text-left">
            <h2 className="text-lg font-semibold leading-none tracking-tight">{finalTitle}</h2>
            <p className="text-sm text-slate-500">{finalDescription}</p>
          </div>

          <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-4">
            <button
              type="button"
              className="mt-2 sm:mt-0 inline-flex items-center justify-center rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-medium hover:bg-slate-100 hover:text-slate-900 transition-colors disabled:opacity-50 cursor-pointer"
              onClick={onClose}
              disabled={isLoading}
            >
              {finalCancelText}
            </button>
            <button
              type="button"
              className={`inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors disabled:opacity-50 cursor-pointer ${confirmButtonClass}`}
              onClick={onConfirm}
              disabled={isLoading}
            >
              {isLoading ? t('common.processing') : finalConfirmText}
            </button>
          </div>

          {!isLoading && (
            <button
              className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 cursor-pointer"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </button>
          )}
        </div>
      </div>
    </>,
    document.body
  );
}
