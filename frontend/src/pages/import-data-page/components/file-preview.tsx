export const FilePreview: React.FC<{ filePreview: string }> = ({
  filePreview,
}) => {
  return (
    <div className="mt-6 space-y-2">
      <h3 className="text-lg font-medium">Pré-visualização do Arquivo</h3>
      <div className="p-4 bg-muted rounded-md">
        <pre className="text-xs overflow-auto max-h-40 text-left whitespace-pre-wrap">
          {filePreview}
        </pre>
      </div>
    </div>
  );
};
